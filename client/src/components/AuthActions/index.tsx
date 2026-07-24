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
          <div className="flex gap-3 items-center">
            <span>{user.username}</span>
            <div className="size-10">
              <img
                className="size-full object-cover rounded-full"
                src={user.avatar}
              />
            </div>
          </div>
        }
      >
        <DropdownMenuItem onClick={clearAuthAndRedirect} className="hover:text-red-400!">
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
