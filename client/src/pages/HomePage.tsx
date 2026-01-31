import BoardsList from "../components/BoardsList";
import CreateBoardButton from "../components/CreateBoard";

function HomePage() {
  return (
    <>
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-lg text-creamy-latte font-bold uppercase mb-8">
          your boards
        </h1>
        <CreateBoardButton />
      </div>
      <div>
        <BoardsList />
      </div>
    </>
  );
}

export default HomePage;
