import Button from "../Button";
import { useCreateBoard } from "../../hooks/api/boards/useCreateBoard";

function CreateBoardButton() {
  const { mutate } = useCreateBoard();

  const onClickCreateButton = () => {
    mutate({ title: "Board " + new Date().toLocaleTimeString() });
  };

  return (
    <Button variant="primary" onClick={onClickCreateButton}>
      Create new board
    </Button>
  );
}

export default CreateBoardButton;
