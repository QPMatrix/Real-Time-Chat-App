import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </MantineProvider>
  </StrictMode>
);
