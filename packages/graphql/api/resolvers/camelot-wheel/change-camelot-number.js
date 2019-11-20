export const incrementCamelotNumber = number => {
  return number === 12 ? 1 : number + 1;
};

export const reduceCamelotNumber = number => {
  return number === 1 ? 12 : number - 1;
};
