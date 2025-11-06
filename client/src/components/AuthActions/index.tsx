import { UserIcon } from "lucide-react";
import Button from "../Button";

function AuthActions() {
  return (
    <div className="flex gap-3">
      <Button>Sign up</Button>
      <Button variant="outline">Login</Button>
    </div>
  );
  return (
    <div className="size-10 flex justify-center items-center rounded-full bg-white">
      <UserIcon className="size-7 text-black" />
    </div>
  );
}

export default AuthActions;
