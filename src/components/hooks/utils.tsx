import { useEffect, useRef, useState } from "react";

import {
  startField,
  boxesInLine,
  areBoxesNearby,
  moveLine,
  mixedField,
  examinationMix,
  extraClick,
  textCongratulations,
  emptyValue,
  flagAndCounters,
  setTextCongratulations,
  setCounterTimer,
} from "../../utils";
export function useUtils() {
  const [field, setField] = useState(startField);
  const [colorIndex, setColorIndex] = useState(15);
  const [textCong, setTextCong] = useState([...textCongratulations]);
  const boxesOrLines = useRef(true);
  const emptyIndex = useRef(15);
  const boxesOrLine = () => {
    boxesOrLines.current = !boxesOrLines.current;
  };
  useEffect(() => {
    if (
      flagAndCounters.congratulationsActive &&
      "" + field === "" + startField
    ) {
      setCounterTimer(false);
      setTextCongratulations();
      flagAndCounters.congratulationsActive = false;
      setTextCong([...textCongratulations]);
    }
  }, [field]);
  function boxMove(boxValue: number, boxIndex: number) {
    if (!boxesInLine(boxIndex, emptyIndex.current)) {
      return;
    }
    if (boxesOrLines.current) {
      const newField = moveLine(boxIndex, emptyIndex.current, field);
      setField(newField);
      extraClick();
      emptyIndex.current = boxIndex;
      return;
    }
    if (!areBoxesNearby(boxIndex, emptyIndex.current)) {
      return;
    }
    const newField = [...field];
    newField[boxIndex] = emptyValue;
    newField[emptyIndex.current] = boxValue;
    setField(newField);
    extraClick();
    emptyIndex.current = boxIndex;
  }
  function swipe(boxValue: number, boxIndex: number, swipeDirection: string) {
    let emptyBoxPosition = "";
    if (emptyIndex.current > boxIndex) {
      if (emptyIndex.current % 4 === boxIndex % 4) {
        emptyBoxPosition = "down";
      }
      if (Math.floor(emptyIndex.current / 4) === Math.floor(boxIndex / 4)) {
        emptyBoxPosition = "right";
      }
    } else {
      if (emptyIndex.current % 4 === boxIndex % 4) {
        emptyBoxPosition = "up";
      }
      if (Math.floor(emptyIndex.current / 4) === Math.floor(boxIndex / 4)) {
        emptyBoxPosition = "left";
      }
    }
    if (emptyBoxPosition === swipeDirection) {
      boxMove(boxValue, boxIndex);
    }
  }

  function mix() {
    const mixField = mixedField();
    emptyIndex.current = mixField.indexOf(emptyValue);
    if (!examinationMix(mixField, emptyIndex.current)) {
      mix();
      return;
    }
    setField(mixField);
    flagAndCounters.counterMove = 0;
    flagAndCounters.congratulationsActive = true;
  }
  const incrementColorIndex = () => {
    setColorIndex(colorIndex + 1);
    if (colorIndex === 15) {
      setColorIndex(0);
    }
  };
  return {
    textCong,
    setTextCong,
    mix,
    boxesOrLine,
    incrementColorIndex,
    field,
    boxMove,
    swipe,
    colorIndex,
  };
}
