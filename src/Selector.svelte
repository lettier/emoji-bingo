<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let emojis = [];

  let selection  = '';
  let selections = [];

  let spinDisabled = false;

  function spin() {
    if (emojis.length <= 0) {
      dispatch('done', true);
      return;
    }

    dispatch('spin', true);

    spinDisabled = true;

    let then  = Date.now();

    function animate() {
      let index = Math.round(Math.random() * (emojis.length - 1));
      selection = emojis[index];
      if (Date.now() - then > 500 || emojis.length <= 1) {
        selections.push(selection);
        selections = selections;
        emojis.splice(index, 1);
        emojis = emojis;

        spinDisabled = false;
      } else {
        window.requestAnimationFrame(animate);
      }
    }

    window.requestAnimationFrame(animate);
  }
</script>

<style>
  .board {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    align-content: stretch;
    background-color: transparent;
    border-radius: 20px;
    border: 20px dotted bisque;
    padding: 20px;
  }
  .emoji-container {
    width: 20vmax;
    height: 20vmax;
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    text-align: center;
  }
  .emoji {
    z-index: 1;
    cursor: pointer;
    border: 0px solid bisque;
    width: 20vmax;
    height: 20vmax;
    font-size: 20vmax;
    margin: 0px;
    line-height: 1.1;
    margin-bottom: 20px;
  }
  .selections {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    width: 90%;
    margin-top: 20px;
  }
  .emoji-selection-container {
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
    text-align: center;
  }
  .emoji-selection {
    z-index: 1;
    cursor: pointer;
    border: 5px solid bisque;
    font-size: 5vmax;
    width: 5vmax;
    height: 5vmax;
    min-width: 5vmax;
    min-height: 5vmax;
    margin: 0px;
  }
  .blank {
    border: 5px solid transparent;
    font-size: inherit;
  }
  .spin-button {
    z-index: 200;
  }
</style>

<div id="board" class="board">
    <div class="emoji-container">
      {#if selection !== ''}
        <p class="emoji">{selection}</p>
      {:else}
        <div class="emoji">&nbsp;</div>
      {/if}
    </div>
  <button class="spin-button" on:click={spin} disabled={ spinDisabled ? 'true' : '' }><span>Spin</span></button>
</div>
<div class="selections">
  {#each selections as selected}
    <div class="emoji-selection-container">
      <p class="emoji-selection">{selected}</p>
    </div>
  {:else}
    <div class="emoji-selection-container">
      <div class="emoji-selection blank">&nbsp;</div>
    </div>
  {/each}
</div>
