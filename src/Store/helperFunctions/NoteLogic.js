// import { CLEAR_ERRORS } from "../Actions/actionTypes";

export const pickRandomNumber = (number) =>
  Math.floor(Math.random() * number) + 1;

export const replaceNextNote = (allNotes, currentNote) => {
  const allNotesArray = [...allNotes[`F`].slice(), ...allNotes[`G`].slice()];

  const onlyUnlockedNotes = allNotesArray.filter((note) => !note.locked);

  // console.log(onlyUnlockedNotes);

  const notesWithoutLastNote = onlyUnlockedNotes
    .filter((note) => note.fileName !== currentNote.fileName)
    .sort((a, b) => b.sincePlayed - a.sincePlayed);

  const q1 = pickRandomNumber(6);
  const q2 = pickRandomNumber(6);

  const diceRoll = q1 + q2;

  const nextNote = notesWithoutLastNote[Math.abs(7 - diceRoll)];

  return nextNote;
};

export const updateNotes = (
  allNotes,
  rightAnswer,
  time,
  tries,
  avarageTime
) => {
  // CREATE COPY OF SPREAD-OUT ARRAY //

  const allNotesArray = [...allNotes[`F`].slice(), ...allNotes[`G`].slice()];

  // SETTING UP FACTORS FOR CALCULATION //

  const triesFactor = tries < 4 ? tries ** 2 : 16;
  const timeBase = avarageTime ? avarageTime : 12;
  const timeFactor = ((time - 1 < 20 ? time - 1 : 20) / timeBase) * 5;

  // CALCULATING NEW VALUE BEFORE AVARAGE CALC //

  const newValue = (23 - triesFactor - timeFactor) / 23;

  // console.log(newValue);

  // CHOOSING ALL UNLOCKED NOTES //
  const unlockedNotes = allNotesArray.filter((note) => !note.locked);

  unlockedNotes.forEach((note) => {
    if (!note.valuesArray) note.valuesArray = [];

    if (note.fileName === rightAnswer.fileName) {
      const valuesArray = [...note.valuesArray, newValue >= 0 ? newValue : 0];

      // SETTING UP ACCUMULATOR AND CALCULATIONG AVARAGE //
      const reducer = (accum, current) => accum + current;
      const avarageValue = valuesArray.reduce(reducer, 0) / valuesArray.length;

      note.value = avarageValue;
      note.valuesArray = valuesArray;
      note.sincePlayed = 0;
    }
  });

  // console.log(unlockedNotes);

  const numberOfUnlocked = unlockedNotes.length;

  // CHECK IF ANY NOTE NEEDS TO BE LOCKED OR UNLOCKED //
  let conditionalAddition = 1;

  unlockedNotes.forEach((note) => {
    const locked =
      note.valuesArray?.length >= 3 &&
      note.value < 0.4 &&
      numberOfUnlocked >= 7;
    // console.log(locked, `locked`);
    // CHANGE TO 5 AFTER TESTING //
    const wellKnown = note.valuesArray?.length >= 2 && note.value > 0.6;
    // console.log(wellKnown, `wellknown`);

    if (!wellKnown) conditionalAddition = 0;

    note.locked = locked;
    note.sincePlayed++;
  });

  // console.log(unlockedNotes, `unlocked`);
  const filteredUnlockedNotes = unlockedNotes.filter((note) => !note.locked);

  // CHOOSING ALL LOCKED NOTES //

  const lockedNotes = allNotesArray.filter((note) => note.locked);

  lockedNotes.forEach((note, index) => {
    if (!note.valuesArray) note.valuesArray = [];

    if (index < conditionalAddition) {
      // console.log(`unlocking`, index);
      note.locked = false;
    }
  });

  // console.log(lockedNotes);

  const newAllNotes = [...lockedNotes, ...filteredUnlockedNotes].sort(
    (a, b) => b.value - a.value
  );

  const notesArray = {
    F: newAllNotes.filter((note) => note.clef === `F`),
    G: newAllNotes.filter((note) => note.clef === `G`),
  };

  // console.log(notesArray);

  return notesArray;
};
