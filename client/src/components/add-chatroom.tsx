import React, { useState } from 'react';
import { useGeneralStore } from '../store/general.store.ts';
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Stepper,
  TextInput,
} from '@mantine/core';
import { useMutation, useQuery } from '@apollo/client';
import {
  AddUsersToChatRoomMutation,
  Chatroom,
  CreateChatRoomMutation,
  SearchUsersQuery,
} from '../gql/graphql.ts';
import { CREATE_CHATROOM } from '../graphql/mutations/create-chatroom.ts';
import { useForm } from '@mantine/form';
import { SEARCH_USERS } from '../graphql/queries/search-users.ts';
import { ADD_USERS_TO_CHATROOM } from '../graphql/mutations/add-users-to-chatroom.ts';
import { IconPlus } from '@tabler/icons-react';

const AddChatroom = () => {
  const [active, setActive] = useState(1);
  const [highestStepVisited, setHighestStepVisited] = useState(1);
  const isCreatedRoomModalOpen = useGeneralStore(
    (state) => state.isCreateRoomModalOpen
  );
  const toggleCreateRoomModal = useGeneralStore(
    (state) => state.toggleCreateRoomModal
  );
  const handleStepChange = (step: number) => {
    const isOutOfBounds = step > 2 || step < 0;
    if (isOutOfBounds) return;
    setActive(step);
    setHighestStepVisited((hsc) => Math.max(hsc, step));
  };
  const [createChatRoom, { loading }] =
    useMutation<CreateChatRoomMutation>(CREATE_CHATROOM);
  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value: string) =>
        value.trim().length > 3
          ? null
          : 'Name must be at least 3 characters long',
    },
  });
  const [newlyCreatedRoom, setNewlyCreatedRoom] = useState<Chatroom | null>();
  const handleCreateRoom = async () => {
    await createChatRoom({
      variables: {
        name: form.values.name,
      },
      onCompleted: (data) => {
        console.log(data);
        setNewlyCreatedRoom(data.createChatRoom);
        handleStepChange(1);
        setSelectedUsers([]);
        setNewlyCreatedRoom(null);
        form.reset();
      },
      onError: (err) => {
        form.setErrors({
          name: err.graphQLErrors[0].extensions?.name as string,
        });
      },
      refetchQueries: ['GetChatroomsForUser'],
    });
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Ensure fullName is always provided (even if it's an empty string initially)
  const { data, refetch } = useQuery<SearchUsersQuery>(SEARCH_USERS, {
    variables: { fullName: searchTerm || '' },
  });

  const [addUserToChatRoom, { loading: loadingAddUsers }] =
    useMutation<AddUsersToChatRoomMutation>(ADD_USERS_TO_CHATROOM, {
      refetchQueries: ['GetChatroomsForUser'],
    });

  const handleAddUsersToChatroom = async () => {
    await addUserToChatRoom({
      variables: {
        chatRoomId: newlyCreatedRoom?.id,
        userIds: selectedUsers,
      },
      onCompleted: () => {
        handleStepChange(active + 1);
        toggleCreateRoomModal();
      },
      onError: (err) => {
        form.setErrors({
          name: err.graphQLErrors[0].extensions?.name as string,
        });
      },
    });
  };

  let debounce: NodeJS.Timeout;
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      refetch();
    }, 300);
  };

  type SelectItem = {
    label: string;
    value: string;
  };

  const selectItems: SelectItem[] =
    (data?.searchUsers.map((user) => ({
      label: user.fullName,
      value: user.id,
    })) as SelectItem[]) || [];

  return (
    <Modal opened={isCreatedRoomModalOpen} onClose={toggleCreateRoomModal}>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First Step" description="Create a Chatroom">
          <div>Create a Chatroom</div>
        </Stepper.Step>
        <Stepper.Step label="Second Step" description="Add members">
          <form onSubmit={form.onSubmit(() => handleCreateRoom())}>
            <TextInput
              label="Chatroom Name"
              placeholder="Enter chatroom name"
              error={form.errors.name}
              {...form.getInputProps('name')}
            />
            <Button mt="md" type="submit">
              Create room
            </Button>
          </form>
        </Stepper.Step>
        <Stepper.Completed>
          <MultiSelect
            onSearchChange={handleSearch}
            nothingFound="No users found"
            searchable
            pb="xl"
            data={selectItems}
            label="Choose the members you want to add"
            placeholder="Pick all the users you want to add to this chatroom"
            onChange={(values) => setSelectedUsers(values)}
          />
        </Stepper.Completed>
      </Stepper>
      <Group mt="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
        {selectedUsers.length > 0 && (
          <Button
            onClick={() => handleAddUsersToChatroom()}
            color="blue"
            leftIcon={<IconPlus />}
            loading={loading}
          >
            Add Users
          </Button>
        )}
      </Group>
    </Modal>
  );
};

export default AddChatroom;
