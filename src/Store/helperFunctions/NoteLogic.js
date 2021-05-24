export const pickRandomNumber = (number) =>
  Math.floor(Math.random() * number) + 1;

export const replaceNextNote = (allNotes, currentNote, answers) => {
  const clef = currentNote.clef === `F` ? `G` : `F`;

  const notesWithDifferentClef = allNotes[clef]
    .slice()
    .sort((a, b) => b.value - a.value);

  const cycleOfGames = answers.length % 3;

  const nextNote =
    notesWithDifferentClef[9 * cycleOfGames - 1 + pickRandomNumber(5)];

  return nextNote;
};

export const updateNotes = (
  allNotes,
  rightAnswer,
  time,
  tries,
  avarageTime
) => {
  const notesWithSameClef = allNotes[rightAnswer.clef].slice();

  const notesWithoutRightAnswer = notesWithSameClef.filter(
    (note) => note.fileName !== rightAnswer.fileName
  );

  const trueRightAnswer = notesWithSameClef.find(
    (note) => note.fileName === rightAnswer.fileName
  );

  const triesFactor = tries < 4 ? tries ** 2 : 16;
  const timeBase = avarageTime ? avarageTime : 5;
  const timeFactor = ((time < 20 ? time : 20) / timeBase) * 5;
  const newValue = (23 - triesFactor - timeFactor) / 23;

  const valuesArray = [
    ...trueRightAnswer.valuesArray,
    newValue >= 0 ? newValue : 0,
  ];

  const reducer = (accum, current) => accum + current;

  const avarageValue = valuesArray.reduce(reducer, 0) / valuesArray.length;

  const newRightAnswer = {
    ...trueRightAnswer,
    value: avarageValue,
    valuesArray: valuesArray,
  };

  notesWithoutRightAnswer.push(newRightAnswer);

  const notesArray = {
    ...allNotes,
    [rightAnswer.clef]: notesWithoutRightAnswer,
  };

  return notesArray;
};
