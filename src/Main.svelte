<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import Graph from './Graph.svelte';
  import { maxIndex, upToFirstNonLeadingZero } from './processing';

  export let analyser: AnalyserNode;
  $: sampleBuffer = new Uint8Array(analyser.frequencyBinCount);

  let currentSample: Uint8Array = null;
  $: peakFrequencyIndex = maxIndex(currentSample);
  $: peakFrequencyValue = currentSample?.[peakFrequencyIndex];

  let interval: number = null;
  const startSampling = () => {
    if (interval === null) {
      interval = setInterval(sample, 10);
    }
  };
  const stopSampling = () => {
    clearInterval(interval);
    interval = null;
  };
  onMount(startSampling);
  onDestroy(stopSampling);

  const sample = () => {
    analyser.getByteFrequencyData(sampleBuffer);

    currentSample = upToFirstNonLeadingZero(sampleBuffer);
  };
</script>

<main>
  <button on:click="{startSampling}" id="startButton">Start!</button>
  <button on:click="{stopSampling}">Stop!</button>

  <section>{peakFrequencyIndex} ({peakFrequencyValue})</section>
  <Graph sample="{currentSample}" peakIndex="{peakFrequencyIndex}" />
</main>
