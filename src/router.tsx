/* eslint-disable react/jsx-key */
import {
  createRoutesFromElements,
  Route,
  createHashRouter,
} from 'react-router-dom';

import { MainScreen, Background } from 'src/windows';
import App from './windows/App/App';
import ErrorPage from './error-page';
import OAuthCallback from './routes/OAuthCallback';

const router = createHashRouter(
  createRoutesFromElements([
    <Route path="/" element={<MainScreen />}>
      <Route index element={<Background color="#7d8a96" />} />
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
