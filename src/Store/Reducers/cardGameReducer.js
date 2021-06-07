import * as actionTypes from "../Actions/actionTypes";
import * as init from "../helperFunctions/InitState";
import * as noteLogic from "../helperFunctions/NoteLogic";
import * as optionLogic from "../helperFunctions/OptionLogic";
import * as dataLogic from "../helperFunctions/DataLogic";

const initialState = {
  notesArray: null,
  options: init.createOptions(),
  currentNote: null,
  nextNote: null,
  stopwatch: 0,
  answers: [],
  isRunning: false,
  tries: 1,
  symbolType: false,
  avarageTime: null,
  user: null,
  difficulty: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FIRST_NOTES:
      return {
        ...state,
        currentNote: state.notesArray.G[0],
        nextNote: state.notesArray.G[1],
      };
    case actionTypes.INIT_NOTES:
      return {
        ...state,
        notesArray: init.createNoteList(action.difficulty),
        difficulty: action.difficulty,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        notesArray: null,
        answers: [],
        symbolType: false,
        difficulty: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.GET_STORAGE:
      return {
        ...state,
        notesArray: action.notesArray ? action.notesArray : state.notesArray,
        answers: action.answers ? action.answers : state.answers,
        symbolType: action.symbolType,
        avarageTime: dataLogic.calcAvarageTime(action.answers),
        currentNote: action.notesArray
          ? action.notesArray.G[0]
          : state.currentNote,
        nextNote: action.notesArray ? action.notesArray.G[1] : state.nextNote,
        difficulty: true,
      };
    case actionTypes.DELETE_STORAGE:
      return {
        ...state,
        notesArray: null,
        answers: [],
        symbolType: false,
        difficulty: null,
      };
    case actionTypes.NEXT_CARD:
      return {
        ...state,
        isRunning: true,
        currentNote: state.nextNote,
        nextNote: noteLogic.replaceNextNote(
          state.notesArray,
          state.nextNote,
          state.answers
        ),
        options: optionLogic.enableOptions(state.options),
        tries: 1,
        avarageTime: dataLogic.calcAvarageTime(state.answers),
        stopwatch: 0,
      };
    case actionTypes.PAUSE_GAME:
      return {
        ...state,
        isRunning: false,
        options: optionLogic.disableOptions(state.options),
        stopwatch: 0,
      };
    case actionTypes.RESUME_GAME:
      return {
        ...state,
        isRunning: true,
        options: optionLogic.enableOptions(state.options),
        stopwatch: 0,
      };
    case actionTypes.FLAG_RIGHT_ANSWER:
      return {
        ...state,
        notesArray: noteLogic.updateNotes(
          state.notesArray,
          action.answer,
          state.stopwatch,
          state.tries,
          state.avarageTime
        ),
        answers: dataLogic.pushAnswer(
          state.answers,
          action.answer,
          state.stopwatch,
          state.tries
        ),
      };
    case actionTypes.FLAG_WRONG_ANSWER:
      return {
        ...state,
        options: optionLogic.disableWrongOption(state.options, action.answer),
        tries: state.tries + 1,
      };
    case actionTypes.TICK:
      return {
        ...state,
        stopwatch: Math.round(state.stopwatch + 1),
      };
    case actionTypes.CHANGE_SYMBOLS:
      return {
        ...state,
        symbolType: !state.symbolType,
      };
    default:
      return state;
  }
};

export default reducer;
