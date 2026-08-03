import Button from "../Button";
import { useUser } from "../../store/auth/selectors";
import { routes } from "@/constants/routes";
import { useNavigate } from "react-router";
import Dropdown from "../Dropdown";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { clearAuthAndRedirect } from "@/utils/clearAuthAndRedirect";

function AuthActions() {
  const user = useUser();
  const navigate = useNavigate();

  if (user) {
    return (
      <Dropdown
        triggerRender={
          <button className="flex gap-3 items-center cursor-pointer px-4 transition-colors py-2 rounded-md hover:bg-black/15">
            <span>{user.username}</span>
            <div className="size-10">
              <img
                className="size-full object-cover rounded-full"
                src={user.avatar}
              />
            </div>
          </button>
        }
      >
        <DropdownMenuItem
          onClick={clearAuthAndRedirect}
          className="hover:text-red-400!"
        >
          Logout
        </DropdownMenuItem>
      </Dropdown>
    );
  } else {
    return (
      <div className="flex gap-3">
        <Button onClick={() => navigate(routes.signup)}>Sign up</Button>
        <Button onClick={() => navigate(routes.login)} variant="outline">
          Login
        </Button>
      </div>
    );
  }
}

export default AuthActions;
