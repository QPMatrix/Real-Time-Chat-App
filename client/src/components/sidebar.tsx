import {
  Center,
  createStyles,
  Navbar,
  rem,
  Stack,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { NavbarLinkProps } from '../types';
import {
  IconBrandMessenger,
  IconBrandWechat,
  IconLogin,
  IconLogout,
  IconUser,
} from '@tabler/icons-react';
import { useGeneralStore } from '../store/general.store.ts';
import { useState } from 'react';
import { useUserStore } from '../store/user-store.ts';
import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../graphql/mutations/logout.ts';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },
  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).color,
    },
  },
}));

const NavbarLinks = ({
  icon: Icon,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip
      label={label}
      position="top-start"
      offset={30}
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};

const mockData = [{ icon: IconBrandWechat, label: 'Chat' }];

const Sidebar = () => {
  const toggleProfileModal = useGeneralStore(
    (state) => state.toggleProfileSettings
  );
  const toggleLoginModal = useGeneralStore((state) => state.toggleLoginModal);
  const [active, setActive] = useState(0);
  const links = mockData.map((link, index) => (
    <NavbarLinks
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  const userId = useUserStore((state) => state.id);
  const user = useUserStore((state) => state);
  const setUserData = useUserStore((state) => state.setUserData);
  const [logoutUser, { loading, error }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      toggleLoginModal();
    },
  });
  const handleLogout = async () => {
    await logoutUser();
    setUserData({
      id: '',
      fullName: '',
      email: '',
      avatarUrl: null,
    });
  };
  return (
    <Navbar fixed zIndex={100} w={rem(100)} p="md">
      <Center>
        <IconBrandMessenger type="mark" size={30} color="black" />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {userId && links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          {userId && (
            <NavbarLinks
              icon={IconUser}
              label={`Profile ${user.fullName}`}
              onClick={toggleProfileModal}
            />
          )}
          {userId ? (
            <NavbarLinks
              icon={IconLogout}
              label="Logout"
              onClick={handleLogout}
            />
          ) : (
            <NavbarLinks
              icon={IconLogin}
              label="Login"
              onClick={toggleLoginModal}
            />
          )}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
