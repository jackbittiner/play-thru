export const changeCamelotNumber = (number, isClockwise) => {
  if (isClockwise) {
    return number === 12 ? 1 : number + 1;
  } else {
    return number === 1 ? 12 : number - 1;
  }
};
