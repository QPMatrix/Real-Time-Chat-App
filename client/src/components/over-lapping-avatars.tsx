import React from 'react';
import { User } from '../gql/graphql.ts';
import { Avatar, Tooltip } from '@mantine/core';

const OverlappingAvatars = ({ users }: { users: User[] }) => {
  const remainingUsers = users.length - 3 ? users.slice(3) : [];
  const remainingName = remainingUsers.map((user) => user.fullName).join(', ');
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="ms">
        <>
          {users.slice(0, 3).map((user) => {
            return (
              <Tooltip label={user.fullName} key={user.id}>
                <Avatar
                  src={user.avatarUrl || null}
                  radius="xl"
                  alt={user.fullName}
                  size="lg"
                />
              </Tooltip>
            );
          })}
          {users.length > 3 && (
            <Tooltip label={remainingName}>
              <Avatar size="lg" radius="xl" children={`${users.length - 3}`} />
            </Tooltip>
          )}
        </>
      </Avatar.Group>
    </Tooltip.Group>
  );
};

export default OverlappingAvatars;
