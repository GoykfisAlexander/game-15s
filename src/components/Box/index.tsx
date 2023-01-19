import "./Box.css";

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
  onBoxClick: (boxValue: number, boxIndex: number) => void;
  colorIndex: number;
}
export const Box: React.FC<IBoxProps> = ({
  value,
  index,
  onBoxClick,
  colorIndex,
}) => {
  const newColorIndex =
    value === 16 ? 15 : colorIndex === 15 ? value - 1 : colorIndex;
  const backgroundColor = colors[newColorIndex];
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
      }}
      className={value < 16 ? "box" : "empty"}
      onClick={() => onBoxClick(value, index)}
    >
      {value < 16 ? value : null}
    </div>
  );
};
