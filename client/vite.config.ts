import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react({
      plugins: [
        ['@graphql-codegen/client-preset-swc-plugin', { artifactDirectory: './src/graphql', gqlTagName: 'graphql' }]
      ]
    })
  ],
  server: {
    port: 3000
  }
});
