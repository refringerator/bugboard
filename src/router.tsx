/* eslint-disable react/jsx-key */
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';

import App from './screens/App/App';
import ErrorPage from './error-page';
import OAuthCallback from './routes/OAuthCallback';
import MainScreen from './screens/MainScreen/MainScreen';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={<MainScreen />}
      // loader={OAuthCallback.loader}
      // action={editAction}
    />,
    <Route
      path="/app"
      element={<App />}
      // loader={rootLoader}
      // action={rootAction}
      errorElement={<ErrorPage />}
    >
      {/* <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path="contacts/:contactId/destroy" action={destroyAction} />
      </Route> */}
    </Route>,
    <Route
      path="oauth-callback"
      element={<OAuthCallback />}
      loader={OAuthCallback.loader}
      // action={editAction}
    />,
  ]),
  { basename: import.meta.env.BASE_URL }
);

export default router;
