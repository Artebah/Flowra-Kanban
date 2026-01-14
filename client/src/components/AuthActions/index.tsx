//import { UserIcon } from "lucide-react";
import Button from "../Button";
import { useUser } from "../../store/auth/selectors";

function AuthActions() {
  const user = useUser();

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
        <Button>Sign up</Button>
        <Button variant="outline">Login</Button>
      </div>
    );
  }
}

export default AuthActions;
