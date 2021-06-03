// import { setAnswersStorage } from "../../Firebase/Firebase";

export const pushAnswer = (answersArray, answer, time, tries) => {
  const newAnswersArray = [
    {
      id: answersArray.length + 1,
      clef: answer.clef,
      name: answer.noteName,
      number: answer.noteNumber,
      symbol: answer.noteSymbol,
      time: time - 1,
      try: tries,
    },
    ...answersArray,
  ];

  return newAnswersArray;
};

export const calcAvarageTime = (answersArray) => {
  if (answersArray.length === 0) return null;

  const timesArray = answersArray.map((answer) => answer.time);
  const reducer = (accum, current) => accum + (current > 14 ? 14 : current);

  const sumOfTimes = timesArray.reduce(reducer, 0);
  const avarage = sumOfTimes / answersArray.length;

  return avarage;
};
