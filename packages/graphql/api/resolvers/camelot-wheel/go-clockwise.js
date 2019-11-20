export const goClockwise = (startPosition, endPosition) => {
  if (startPosition <= endPosition) {
    return startPosition + 6 >= endPosition;
  }

  if (startPosition >= endPosition) {
    return startPosition - 6 >= endPosition;
  }
};
