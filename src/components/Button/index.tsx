import { useState } from "react";
import "./Button.css";
interface IButtonProps {
  mix: any;
  boxesOrLine: any;
  incrementColorIndex: any;
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
