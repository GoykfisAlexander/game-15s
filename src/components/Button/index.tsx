import { useState } from "react";
import "./index.css";
interface IButtonProps {
  mix: () => void;
  boxesOrLine: () => void;
  incrementColorIndex: () => void;
}
export const Button: React.FC<IButtonProps> = ({
  mix,
  boxesOrLine,
  incrementColorIndex,
}) => {
  const [buttonMove, setButtonMove] = useState(true);
  return (
    <>
      <button className="button" onClick={mix}>
        Mix
      </button>
      <button className="button" onClick={incrementColorIndex}>
        Color
      </button>
      <button
        className="button"
        onClick={() => {
          setButtonMove(!buttonMove);
          boxesOrLine();
        }}
      >
        Move {buttonMove ? "line" : "box"}
      </button>
    </>
  );
};
