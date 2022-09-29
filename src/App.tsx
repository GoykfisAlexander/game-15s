import { Box } from "./components/Box";
import { Button } from "./components/Button";
import { Congratulations } from "./components/Congratulations";
import { useUtils } from "./components/hooks/utils";

function App() {
  const {
    textCong,
    setTextCong,
    mix,
    boxesOrLine,
    incrementColorIndex,
    field,
    onBoxClick,
    colorIndex,
  } = useUtils();
  return (
    <>
      {textCong.length !== 0 && (
        <Congratulations textCong={textCong} setTextCong={setTextCong} />
      )}
      <Button
        mix={mix}
        boxesOrLine={boxesOrLine}
        incrementColorIndex={incrementColorIndex}
      />
      <div className="field">
        {field.map((value, i) => (
          <Box
            value={value}
            index={i}
            key={value}
            onBoxClick={onBoxClick}
            colorIndex={colorIndex}
          />
        ))}
      </div>
    </>
  );
}

export default App;
