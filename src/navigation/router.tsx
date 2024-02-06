/* eslint-disable react/jsx-key */
import {
  createRoutesFromElements,
  Route,
  createHashRouter,
} from 'react-router-dom';

import { MainScreen, Background, Auth } from 'src/windows';
import OAuthCallback from 'src/routes/OAuthCallback';
import ErrorPage from 'src/navigation/error-page';

const router = createHashRouter(
  createRoutesFromElements([
    <Route path="/" element={<MainScreen />} errorElement={<ErrorPage />}>
      <Route index element={<Background color="#7d8a96" />} />
      <Route path="auth" element={<Auth />} />
      <Route
        path="oauth-callback"
        element={<OAuthCallback />}
        loader={OAuthCallback.loader}
      />
    </Route>,
  ])
  // нужно для BrowserRouter
  // { basename: import.meta.env.BASE_URL }
);

export default router;
