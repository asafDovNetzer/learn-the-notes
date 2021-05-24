export const disableWrongOption = (options, wrongAnswer) => {
  const newOptions = options.slice();
  const optionsModified = newOptions.map((option) => {
    if (option.name === wrongAnswer) {
      return {
        ...option,
        isDisabled: true,
      };
    } else {
      return option;
    }
  });
  return optionsModified;
};

export const enableOptions = (options) => {
  const newOptions = [...options];
  newOptions.forEach((option) => (option.isDisabled = false));
  return newOptions;
};

export const disableOptions = (options) => {
  const newOptions = [...options];
  newOptions.forEach((option) => (option.isDisabled = true));
  return newOptions;
};
