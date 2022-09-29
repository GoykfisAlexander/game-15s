export const textCongratulations: string[] = [];
export const startField = [...Array(16)].map((_, i) => i + 1);
export const emptyValue = 16;
export const flagAndCounters = {
  congratulationsActive: false,
  counterMove: 0,
  counterTimer: 0,
};
const coordinateLine = { x: false, y: false };

export const boxesInLine = (i1: number, i2: number) => {
  coordinateLine.x = Math.floor(i1 / 4) === Math.floor(i2 / 4);
  coordinateLine.y = i1 % 4 === i2 % 4;

  return coordinateLine.x || coordinateLine.y;
};
export const moveLine = (
  boxIndex: number,
  emptyIndex: number,
  field: number[]
) => {
  const newField = [...field];
  newField[boxIndex] = emptyValue;
  if (coordinateLine.x) {
    if (boxIndex < emptyIndex) {
      for (let i = boxIndex; i < emptyIndex; i++) {
        newField[i + 1] = field[i];
      }
    } else {
      for (let i = boxIndex; i > emptyIndex; i--) {
        newField[i - 1] = field[i];
      }
    }
  } else {
    if (boxIndex < emptyIndex) {
      for (let i = boxIndex; i < emptyIndex; i += 4) {
        newField[i + 4] = field[i];
      }
    } else {
      for (let i = boxIndex; i > emptyIndex; i -= 4) {
        newField[i - 4] = field[i];
      }
    }
  }
  return newField;
};
export const areBoxesNearby = (i1: number, i2: number) => {
  const areBoxesNearby = [i2 - 1, i2 + 1, i2 - 4, i2 + 4];
  return areBoxesNearby.includes(i1);
};
export const mixedField = () => {
  const mixField: number[] = [];
  while (mixField.length !== 16) {
    let randomValue = Math.floor(Math.random() * 16 + 1);
    if (!mixField.includes(randomValue)) {
      mixField.push(randomValue);
    }
  }
  return mixField;
};
export const examinationMix = (mixField: number[], newEmptyIndex: number) => {
  const value = mixField.map((e, id) => {
    if (e === emptyValue) {
      return 0;
    }
    let result = 0;
    for (let i = id + 1; i < 16; i++) {
      if (mixField[i] !== emptyValue) {
        if (mixField[i] < e) {
          result++;
        }
      }
    }
    return result;
  });
  return (
    (value.reduce((t, v) => t + v) + Math.floor(newEmptyIndex / 4 + 1)) % 2 ===
    0
  );
};
export const setTextCongratulations = () => {
  const lastDigitMove = +("" + flagAndCounters.counterMove).slice(-1);
  const lastDigitTime = +("" + flagAndCounters.counterTimer).slice(-1);
  const theEndingMove =
    lastDigitMove === 1
      ? ""
      : lastDigitMove > 1 && lastDigitMove < 5
      ? "а"
      : "ов";
  const theEndingTime = lastDigitTime > 0 && lastDigitTime < 5 ? "ы" : "";
  textCongratulations.push(
    "О Многоликий, Великий полубог ветров и морей, герой молодых людей!",
    `Тебе хватило ${flagAndCounters.counterTimer} секунд${theEndingTime} и ${flagAndCounters.counterMove} ход${theEndingMove}!`,
    "О мудрейший из мудрых, о умудренный мудростью мудрых, о над мудрыми мудрый!",
    " О средоточие вселенной и убежище мира, внемли устами моим, сама истина говорит сегодня ими!",
    " Сею книгу нашёл я в джунглях словесности и пустыне душевного тепла!",
    " О, не допустим Вселенную осиротеть! Наполним же кувшин раздумий твоих!",
    " Пусть же эта книга факелом своей мудрости освещает извилистые и опасные тропы твоей жизни!",
    " И да сохранит твоё сердце живой родник добра!"
  );
};
export const setCounterTimer = (on: boolean) => {
  if (on) {
    flagAndCounters.counterTimer = new Date().getTime();
  } else {
    flagAndCounters.counterTimer = Math.floor(
      (new Date().getTime() - flagAndCounters.counterTimer) / 1000
    );
  }
};
export const extraClick = () => {
  if (flagAndCounters.counterMove === 0) {
    setCounterTimer(true);
    textCongratulations.length = 0;
  }
  flagAndCounters.counterMove++;
};
