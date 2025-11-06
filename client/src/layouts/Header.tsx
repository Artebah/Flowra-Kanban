import AuthActions from "../components/AuthActions";

function Header() {
  return (
    <header className="px-7 h-20 flex justify-between items-center bg-gray-night backdrop-blur-sm">
      <h1 className="text-2xl font-bold">Flowra kanban</h1>
      <AuthActions />
    </header>
  );
}

export default Header;
