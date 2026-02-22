import BoardsList from "../components/BoardsList";
import CreateBoardButton from "../components/CreateBoard";

function HomePage() {
  return (
    <div className="max-w-[1440px] mx-auto mt-7 pb-4 px-7">
      <div className="flex justify-between items-center gap-4 mb-8">
        <h1 className="text-lg text-creamy-latte font-bold uppercase">
          your boards
        </h1>
        <CreateBoardButton />
      </div>
      <div>
        <BoardsList />
      </div>
    </div>
  );
}

export default HomePage;
