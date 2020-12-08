<script lang="ts">
  import { onMount } from 'svelte';
  import Main from './Main.svelte';

  let micFailed = false;
  let analyser: AnalyserNode = null;

  onMount(async () => {
    try {
      const audioContext = new AudioContext();
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const micStream = audioContext.createMediaStreamSource(mediaStream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      micStream.connect(analyser);
    } catch (err) {
      micFailed = true;
    }
  });
</script>

{#if micFailed}
  <section>Could not access microphone!</section>
{:else if analyser === null}
  <section>Waiting for access to microphone...</section>
{:else}
  <Main analyser="{analyser}" />
{/if}
