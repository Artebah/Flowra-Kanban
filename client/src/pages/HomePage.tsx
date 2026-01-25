import BoardsList from "../components/BoardsList";

function HomePage() {
  return (
    <>
      <h1 className="text-lg text-creamy-latte font-bold uppercase">
        your boards
      </h1>
      <div>
        <BoardsList />
      </div>
    </>
  );
}

export default HomePage;
