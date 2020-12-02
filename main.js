window.onload = async () => {
  console.log("hey");
  const audioContext = new AudioContext();

  console.log("Waiting for access to microphone...");
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    console.log("Success!", mediaStream);

    const micStream = audioContext.createMediaStreamSource(mediaStream);

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    const freqData = new Uint8Array(analyser.frequencyBinCount);

    micStream.connect(analyser);

    console.log(window.sampleButton);
    window.sampleButton.addEventListener(
      "click",
      analyseSound(analyser, freqData)
    );

    //setInterval(analyseSound(analyser, freqData), 1000);
  } catch (err) {
    console.error("Failure!", err);
  }
};

/**
 * @param {AnalyserNode} analyser
 * @param {Uint8Array} freqData
 */
const analyseSound = (analyser, freqData) => () => {
  console.log("IN EVENT!");
  analyser.getByteFrequencyData(freqData);

  const dataString = upToFirstNonLeadingZero(freqData).join(",");

  const pre = document.createElement("pre");
  pre.innerText = dataString;
  document.body.appendChild(pre);
};

/**
 * [0, 1, 2, 3, 0, 4, 5, 0] => [0, 1, 2, 3]
 * @param {Uint8Array} freqData
 * @returns {Uint8Array}
 */
const upToFirstNonLeadingZero = (freqData) => {
  let foundNonZero = false;

  const index = freqData.findIndex((val) => {
    if (val !== 0) {
      foundNonZero = true;
    }
    return foundNonZero && val === 0;
  });

  return freqData.slice(0, index === -1 ? freqData.length : index);
};

/**
 * [0, 1, 2, 3, 0, 4, 5, 0] => [0, 1, 2, 3, 0, 4, 5]
 * @param {Uint8Array} freqData
 * @returns {number[]}
 */
const stripTrailingZeroes = (freqData) => {
  let indexOfLastNonZero;

  for (let i = freqData.length - 1; i !== 0; i--) {
    if (freqData[i] !== 0) {
      indexOfLastNonZero = i;
      break;
    }
  }

  return freqData.slice(0, indexOfLastNonZero + 1);
};
