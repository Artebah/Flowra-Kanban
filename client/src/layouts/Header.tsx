import { Link } from "react-router";
import AuthActions from "../components/AuthActions";
import { routes } from "../constants/routes";

function Header() {
  return (
    <header className="px-7 h-20 flex justify-between items-center bg-gray-night backdrop-blur-sm">
      <Link to={routes.home} className="text-2xl font-bold">
        Flowra kanban
      </Link>
      <AuthActions />
    </header>
  );
}

export default Header;
