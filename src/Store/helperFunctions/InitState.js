const letterArray = [`A`, `B`, `C`, `D`, `E`, `F`, `G`];
const symbolArray = [`La`, `Si`, `Do`, `Re`, `Mi`, `Fa`, `Sol`];

export const createNoteList = () => {
  const notesArrayF = [];

  let accum = 6;

  for (let i = 0; i < 23; i++) {
    notesArrayF.push({
      fileName: `F${i + 1}`,
      value: 1 - Math.abs(11 - i) / 11,
      noteName: letterArray[accum % 7],
      noteSymbol: symbolArray[accum % 7],
      noteNumber: Math.floor((accum + 7) / 7),
      clef: `F`,
      valuesArray: [1 - Math.abs(11 - i) / 11],
    });
    accum++;
  }

  const notesArrayG = [];

  accum = 4;

  for (let i = 0; i < 23; i++) {
    notesArrayG.push({
      fileName: `G${i + 1}`,
      value: 1 - Math.abs(11 - i) / 11,
      noteName: letterArray[accum % 7],
      noteSymbol: symbolArray[accum % 7],
      noteNumber: Math.floor((accum + 21) / 7),
      clef: `G`,
      valuesArray: [1 - Math.abs(11 - i) / 11],
    });
    accum++;
  }

  return {
    F: notesArrayF,
    G: notesArrayG,
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
