type NavigateFn = (path: string) => void;

let _navigate: NavigateFn | null = null;

export const setNavigate = (fn: NavigateFn) => {
  _navigate = fn;
};

export const navigateTo = (path: string) => {
  _navigate?.(path);
};
