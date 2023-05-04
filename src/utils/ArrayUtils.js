const getRandomElementsFromArray = (arr, num) => {
  if (!Array.isArray(arr)) {
    throw new TypeError("The first argument must be an array.");
  }
  if (
    typeof num !== "number" ||
    !Number.isInteger(num) ||
    num < 0 ||
    num > arr.length
  ) {
    throw new RangeError(
      "The second argument must be a non-negative integer and be less than or equal to the array length."
    );
  }
  const copyOfArr = arr.slice();
  while (copyOfArr.length > num) {
    const randomIndex = Math.floor(Math.random() * copyOfArr.length);
    copyOfArr.splice(randomIndex, 1);
  }
  return copyOfArr;
};

export { getRandomElementsFromArray };
