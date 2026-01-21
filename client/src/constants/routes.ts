export const routes = {
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
};

export const PRIVATE_ROUTES = [routes.dashboard];
export const AUTH_ROUTES = [routes.login, routes.signup];
