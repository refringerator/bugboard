import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import router from 'src/navigation/router';
import { store } from 'src/redux/store';
import './index.css';

(window as Window & typeof globalThis & { instanceId: string }).instanceId =
  Math.random().toString(36).substring(2, 14);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
