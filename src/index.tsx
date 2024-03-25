import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import GuessWord from './components/GuessWord/GuessWord';

import '@fontsource/roboto/400.css';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
  },
  {
    path: "/guess",
    element:  <GuessWord />,
  }
  ], {
    basename: import.meta.env.DEV ? '/' : '/hangman/'
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  </RecoilRoot>
);
