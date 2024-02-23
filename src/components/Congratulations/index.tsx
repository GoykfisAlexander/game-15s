import { useState, useEffect, useRef } from "react";
import "./index.css";
interface ICongratulationsProps {
  textCong: string[];
  setTextCong: (value: string[]) => void;
}
export const Congratulations: React.FC<ICongratulationsProps> = ({
  textCong,
  setTextCong,
}) => {
  const count = useRef(0);
  const [text, setText] = useState(textCong[count.current]);
  const [outputText, setOutputText] = useState("");
  useEffect(() => {
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        setOutputText((p) => p + text[i]);
      }, i * 80 + 100);
    }
  }, [text]);

  if (outputText.length === text.length && count.current < 7) {
    setTimeout(() => {
      setOutputText("");
      count.current++;
      setText(textCong[count.current]);
    }, 1500);
  }
  return (
    <div
      className="Congratulations"
      onClick={() => {
        setTextCong([]);
      }}
    >
      {outputText}
    </div>
  );
};
