import Button from "../Button";
import { useUser } from "../../store/auth/selectors";
import { routes } from "@/constants/routes";
import { useNavigate } from "react-router";

function AuthActions() {
  const user = useUser();
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex gap-3 items-center">
        <span>{user.email}</span>
        <div className="size-10 flex justify-center items-center rounded-full bg-white">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img className="size-full object-cover" src="/avatar_1.jpg" />
            </div>
          </div>
        </div>
      </div>
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
