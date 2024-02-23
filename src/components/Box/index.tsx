import { useState } from "react";
import "./index.css";

const colors = [
  "IndianRed",
  "Green",
  "Pink",
  "Aqua",
  "Orange",
  "Purple",
  "MidnightBlue",
  "Gray",
  "Wheat",
  "yellow",
  "DarkSlateGray",
  "blue",
  "RosyBrown",
  "Olive",
  "red",
  "none",
];
interface IBoxProps {
  value: number;
  index: number;
  boxMove: (boxValue: number, boxIndex: number) => void;
  swipe: (boxValue: number, boxIndex: number, swipeDirection: string) => void;
  colorIndex: number;
}
export const Box: React.FC<IBoxProps> = ({
  value,
  index,
  boxMove,
  swipe,
  colorIndex,
}) => {
  const [startCoords, setStartCoords] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    const { clientX, clientY } = event.touches[0];
    setStartCoords({ x: clientX, y: clientY });
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>): void => {
    const { clientX, clientY } = event.changedTouches[0];
    const dx: number = clientX - (startCoords.x || 0);
    const dy: number = clientY - (startCoords.y || 0);
    let swipeDirection = "";
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        swipeDirection = "right";
      } else {
        swipeDirection = "left";
      }
    } else {
      if (dy > 0) {
        swipeDirection = "down";
      } else {
        swipeDirection = "up";
      }
    }
    swipe(value, index, swipeDirection);
  };
  const newColorIndex =
    value === 16 ? 15 : colorIndex === 15 ? value - 1 : colorIndex;
  const backgroundColor = colors[newColorIndex];
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor,
      }}
      className={value < 16 ? "box" : "empty"}
      onClick={() => boxMove(value, index)}
    >
      {value < 16 ? value : null}
    </div>
  );
};
