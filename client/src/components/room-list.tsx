import React, { useState } from 'react';
import { useGeneralStore } from '../store/general.store.ts';
import { useUserStore } from '../store/user-store.ts';
import { useMutation, useQuery } from '@apollo/client';
import { GetChatroomsForUserQuery } from '../gql/graphql.ts';
import { GET_CHATROOMS_FOR_USER } from '../graphql/queries/get-chatrooms-for-user.ts';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { DELETE_CHATROOM } from '../graphql/mutations/delete-chatroom.ts';
import { Button, Card, Flex, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const RoomList = () => {
  const toggleCreateRoomModal = useGeneralStore(
    (state) => state.toggleCreateRoomModal
  );
  const userId = useUserStore((state) => state.id);
  const { data, error, loading } = useQuery<GetChatroomsForUserQuery>(
    GET_CHATROOMS_FOR_USER,
    {
      variables: {
        userId,
      },
    }
  );
  const isSmallDevice = useMediaQuery('(max-width: 768px)');
  const defaultTextStyles: React.CSSProperties = {
    textOverflow: isSmallDevice ? 'unset' : 'ellipsis',
    whiteSpace: isSmallDevice ? 'unset' : 'nowrap',
    overflow: isSmallDevice ? 'unset' : 'hidden',
  };
  const defaultFlexStyles: React.CSSProperties = {
    maxWidth: isSmallDevice ? 'unset' : '200px',
  };

  const { id } = useParams<{ id: string }>();
  const [activeRoomId, setActiveRoomId] = useState<string | null>(id || null);
  const navigate = useNavigate();
  const [deleteChatRoom] = useMutation(DELETE_CHATROOM, {
    variables: {
      chatRoomId: activeRoomId,
    },
    refetchQueries: [
      {
        query: GET_CHATROOMS_FOR_USER,
        variables: {
          userId,
        },
      },
    ],
    onCompleted: (data) => {
      console.log(data);
      navigate('/');
    },
  });
  return (
    <Flex
      direction="row"
      w={isSmallDevice ? 'calc(100% - 100px)' : '550px'}
      h="100vh"
      ml="100px"
    >
      <Card shadow="md" w="100%" p={0}>
        <Flex direction="column" align="start" w="100%">
          <Group position="apart" w={'100%'} mb="md" mt="md">
            <Button
              onClick={toggleCreateRoomModal}
              variant="light"
              leftIcon={<IconPlus />}
            >
              Create a room
            </Button>
          </Group>
        </Flex>
      </Card>
    </Flex>
  );
};

export default RoomList;
