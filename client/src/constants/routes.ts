export const routes = {
  login: "/login",
  signup: "/signup",
  boardById: (id: string = ":id") => `/boards/${id}`,
  home: "/",
};

export const PRIVATE_ROUTES = [routes.home, "/boards"];
export const AUTH_ROUTES = [routes.login, routes.signup];

export const isPrivate = PRIVATE_ROUTES.some((path) =>
  location.pathname.startsWith(path)
);
