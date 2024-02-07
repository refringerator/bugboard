/* eslint-disable react/jsx-key */
import {
  createRoutesFromElements,
  Route,
  createHashRouter,
} from 'react-router-dom';

import {
  MainScreen,
  Auth,
  WindowOpener,
  SettingsWindowContent,
} from 'src/windows';

import OAuthCallback from 'src/routes/OAuthCallback';
import ErrorPage from 'src/navigation/error-page';

const router = createHashRouter(
  createRoutesFromElements([
    <Route path="/" element={<MainScreen />} errorElement={<ErrorPage />}>
      <Route path="auth" element={<Auth />} />
      <Route
        path="test"
        element={<WindowOpener window={SettingsWindowContent} />}
      />
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
