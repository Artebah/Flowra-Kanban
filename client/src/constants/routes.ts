export const routes = {
  login: "/login",
  signup: "/signup",
  boardById: (id: string = ":boardId") => `/boards/${id}`,
  home: "/",
  completeProfile: "/complete-profile",
};

export const PRIVATE_ROUTES = [routes.home, "/boards"];
export const AUTH_ROUTES = [routes.login, routes.signup];

export const isPrivate = PRIVATE_ROUTES.some((path) =>
  location.pathname.startsWith(path)
);
