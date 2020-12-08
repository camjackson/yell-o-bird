//[0, 1, 2, 3, 0, 4, 5, 0] => [0, 1, 2, 3]
export const maxIndex = (freqData: Uint8Array): number => {
  if (!freqData) return null;

  let result = -1;
  let maxSoFar = null;
  freqData.forEach((num, i) => {
    if (num > maxSoFar) {
      result = i;
      maxSoFar = num;
    }
  });
  return result;
};

// [0, 1, 2, 3, 0, 4, 5, 0] => [0, 1, 2, 3]
export const upToFirstNonLeadingZero = (freqData: Uint8Array): Uint8Array => {
  let foundNonZero = false;

  const index = freqData.findIndex((val) => {
    if (val !== 0) {
      foundNonZero = true;
    }
    return foundNonZero && val === 0;
  });

  return freqData.slice(0, index === -1 ? 0 : index);
};

// [0, 1, 2, 3, 0, 4, 5, 0] => [0, 1, 2, 3, 0, 4, 5]
export const stripTrailingZeroes = (freqData: Uint8Array): Uint8Array => {
  let indexOfLastNonZero: number;

  for (let i = freqData.length - 1; i !== 0; i--) {
    if (freqData[i] !== 0) {
      indexOfLastNonZero = i;
      break;
    }
  }

  return freqData.slice(0, indexOfLastNonZero + 1);
};
