import React, { useRef, useState } from 'react';
import { useGeneralStore } from '../store/general.store.ts';
import { useUserStore } from '../store/user-store.ts';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_PROFILE_MUTATION } from '../graphql/mutations/upadte-user-profile.ts';
import {
  Avatar,
  Button,
  FileInput,
  Flex,
  Group,
  Modal,
  TextInput,
} from '@mantine/core';
import { IconEditCircle } from '@tabler/icons-react';

const ProfileSettings = () => {
  const isProfileModalOpen = useGeneralStore(
    (state) => state.isProfileSettingsOpen
  );
  const toggleProfileModal = useGeneralStore(
    (state) => state.toggleProfileSettings
  );
  const profileImage = useUserStore((state) => state.avatarUrl);
  const updateProfileImage = useUserStore((state) => state.updateProfileImage);
  const username = useUserStore((state) => state.fullName);
  const updateUsername = useUserStore((state) => state.updateProfile);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imagePreview = imageFile
    ? URL.createObjectURL(imageFile)
    : profileImage;
  const fileInputRef = useRef<HTMLButtonElement>(null);
  const form = useForm({
    initialValues: {
      username,
      profileImage,
    },
    validate: {
      username: (value) =>
        value.length < 3 ? 'Username must be at least 3 characters long' : null,
    },
  });
  const [updatedProfile] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
    variables: {
      fullName: form.values.username,
      file: imageFile,
    },
    onCompleted: (data) => {
      updateUsername(data.updateProfile.fullName);
      updateProfileImage(data.updateProfile.avatarUrl);
    },
  });
  const handleSave = async () => {
    if (form.validate().hasErrors) return;
    await updatedProfile().then(() => {
      toggleProfileModal();
    });
  };
  return (
    <Modal
      opened={isProfileModalOpen}
      onClose={toggleProfileModal}
      title="Profile Settings"
    >
      <form onSubmit={form.onSubmit(() => updatedProfile())}>
        <Group
          pos="relative"
          w={100}
          h={100}
          style={{ cursor: 'pointer' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar
            src={imagePreview || profileImage || null}
            alt="Profile"
            h={100}
            w={100}
            radius={100}
          />
          <IconEditCircle
            color="black"
            size={20}
            style={{
              position: 'absolute',
              top: 50,
              right: -10,
              background: 'white',
              border: '1px solid black',
              padding: 5,
              borderRadius: 100,
            }}
          />
          <FileInput
            ref={fileInputRef}
            style={{ display: 'none' }}
            pos="absolute"
            accept="image/*"
            onChange={(file) => setImageFile(file)}
          />
        </Group>
        <TextInput
          mt={20}
          label="Full Name"
          {...form.getInputProps('username')}
          value={form.values.username}
          onChange={(e) => {
            form.setFieldValue('username', e.currentTarget.value);
          }}
          error={form.errors.username}
        />
      </form>
      <Flex gap="md" mt="sm">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={toggleProfileModal} variant="link">
          Cancel
        </Button>
      </Flex>
    </Modal>
  );
};

export default ProfileSettings;
