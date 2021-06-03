const letterArray = [`A`, `B`, `C`, `D`, `E`, `F`, `G`];
const symbolArray = [`La`, `Si`, `Do`, `Re`, `Mi`, `Fa`, `Sol`];

export const createNoteList = (threshold = 0.4) => {
  const notesArrayF = [];

  let accum = 6;

  for (let i = 0; i < 23; i++) {
    const value = (1 - Math.sqrt(Math.abs(11 - i)) / Math.sqrt(11)) * 0.6;
    notesArrayF.push({
      fileName: `F${i + 1}`,
      value: value,
      noteName: letterArray[accum % 7],
      noteSymbol: symbolArray[accum % 7],
      noteNumber: Math.floor((accum + 7) / 7),
      clef: `F`,
      valuesArray: [],
      locked: value <= threshold + 0.5 * threshold,
      sincePlayed: 1,
    });
    accum++;
  }

  const notesArrayG = [];

  accum = 4;

  for (let i = 0; i < 23; i++) {
    const value = 1 - Math.sqrt(Math.abs(11 - i)) / Math.sqrt(11);
    notesArrayG.push({
      fileName: `G${i + 1}`,
      value: value,
      noteName: letterArray[accum % 7],
      noteSymbol: symbolArray[accum % 7],
      noteNumber: Math.floor((accum + 21) / 7),
      clef: `G`,
      valuesArray: [],
      locked: value < threshold,
      sincePlayed: 1,
    });
    accum++;
  }

  // console.log(notesArrayF, notesArrayG);

  return {
    F: notesArrayF.sort((a, b) => b.value - a.value),
    G: notesArrayG.sort((a, b) => b.value - a.value),
  };
};

export const createOptions = () => {
  const optionsArray = [];
  for (let i = 0; i < 7; i++) {
    optionsArray.push({
      name: letterArray[i],
      symbol: symbolArray[i],
      isDisabled: true,
    });
  }
  return optionsArray;
};
