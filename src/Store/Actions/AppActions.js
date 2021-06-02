import * as actionTypes from "./actionTypes";

export const setFirstNotes = () => {
  return {
    type: actionTypes.SET_FIRST_NOTES,
  };
};

export const initNotesArray = (difficulty) => {
  return {
    type: actionTypes.INIT_NOTES,
    difficulty: difficulty,
  };
};

export const changeSymbols = () => {
  return {
    type: actionTypes.CHANGE_SYMBOLS,
  };
};

export const pauseGame = () => {
  return {
    type: actionTypes.PAUSE_GAME,
  };
};

export const resumeGame = () => {
  return {
    type: actionTypes.RESUME_GAME,
  };
};

export const nextCard = () => {
  return {
    type: actionTypes.NEXT_CARD,
  };
};

export const flagWrongAnswer = (answer) => {
  return {
    type: actionTypes.FLAG_WRONG_ANSWER,
    answer: answer,
  };
};

export const flagRightAnswer = (answer) => {
  return {
    type: actionTypes.FLAG_RIGHT_ANSWER,
    answer: answer,
  };
};

export const tick = () => {
  // console.log(`tick`);
  return {
    type: actionTypes.TICK,
  };
};
