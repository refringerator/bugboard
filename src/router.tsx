import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

import App from "./screens/App/App.tsx";
import ErrorPage from "./error-page.tsx";
import OAuthCallback from "./routes/OAuthCallback.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
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
  ])
);
