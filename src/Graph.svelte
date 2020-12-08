<script lang="ts">
  export let sample: Uint8Array;
  export let peakIndex: number;
</script>

<style>
  figure {
    height: 255px;
  }
  div {
    width: 1px;
  }
</style>

<figure style="height: 255px" class="flex items-end border border-blue-800">
  {#each sample ?? [] as frequencyStrength, index}
    <div
      class="{`inline-block border ${index === peakIndex ? 'border-red-600' : 'border-black'}`}"
      style="height: {frequencyStrength}px"></div>
  {/each}
</figure>
