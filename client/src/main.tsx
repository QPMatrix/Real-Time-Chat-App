import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <ApolloProvider client={client}>
    <App />
      </ApolloProvider>
    </MantineProvider>

  </StrictMode>,
)
