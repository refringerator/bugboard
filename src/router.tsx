/* eslint-disable react/jsx-key */
import {
  createRoutesFromElements,
  Route,
  createHashRouter,
} from 'react-router-dom';

import App from './windows/App/App';
import ErrorPage from './error-page';
import OAuthCallback from './routes/OAuthCallback';
import MainScreen from './windows/MainScreen/MainScreen';

const router = createHashRouter(
  createRoutesFromElements([
    <Route path="/" element={<MainScreen />}>
      <Route path="app" element={<App />} errorElement={<ErrorPage />} />
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
