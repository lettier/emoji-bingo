<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  import Board    from './Board.svelte';
  import Selector from './Selector.svelte';

  export let emojis = [];

  let showMessage   = false;
  let showSelector  = false;
  let showBoard     = false;

  let message = '';

  function playSound(name, volume) {
    let sound = new Audio(name + ".ogg");
    sound.volume = volume;
    sound.play();
  }

  function setAnimation(on) {
    let el = document.getElementById("board");
    if (el) {
      if (on) {
        el.classList.add("logo-border-animation");
      } else {
        el.classList.remove("logo-border-animation");
      }
    }
  }

  function displayMessage(text) {
    message = `${text}<br>Click to restart.`;
    showMessage = true;
  }

  playSound("theme", 0.1);
</script>

<style>
  .message {
    position: absolute;
    cursor: pointer;
    top: 0px;
    left: 0px;
    z-index: 4000;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgba(100, 100, 100, 0.4);
    font-size: 6vmax;
    text-align: center;
  }
  .message-text {
    width: 80%;
  }
  .column-center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin: 1%;
    background-color: transparent;
    padding: 5%;
    border-radius: 2px;
    width: 20vmax;
    border: 20px bisque dotted;
    text-align: center;
    box-shadow: inset 0 0 0 20px white;
  }
  .logo-text {
    color: coral;
    font-family: 'Monofett';
    line-height: 0.6;
    font-size: 8vmax;
    text-shadow: 5px 5px 0px white;
  }
  .buttons {
    position: fixed;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    top: 75%;
    z-index: 100;
  }
  .github {
    background-color: bisque;
    color: lightcoral;
  }
  .github:hover {
    background-color: bisque;
    color: lightcoral;
  }
</style>

{#if showMessage}
  <div on:click="{ () => location.reload() }" class="message">
    <div class="message-text">{@html message}</div>
  </div>
{/if}
<div class="column-center">
  {#if !showBoard && !showSelector}
    <div class="logo logo-border-animation">
      <div class="logo-text">
        Emoji Bingo
      </div>
    </div>
    <div class="buttons">
      <div>
        <button on:click="{ () => showSelector = true }"><span>Call<span></button>
        <button on:click="{ () => showBoard    = true }"><span>Play<span></button>
      </div>
      <div>
        <button class="github"
                on:click="{ () => { window.open('https://github.com/lettier/emoji-bingo'); } }"><span>GitHub<span></button>
      </div>
    </div>
  {:else}
    {#if showBoard}
      <Board {emojis} on:bingo="{ () => { displayMessage('BINGO!'); playSound("cheer", 0.1); } }"
            on:playSound="{ e => playSound(e.detail.name, e.detail.volume) }"/>
    {:else}
      {#if showSelector}
        <Selector {emojis} on:spin="{ () => playSound("spin", 0.3) }"
                           on:done="{ () => { displayMessage('All done!'); playSound("cheer", 0.1); } }"/>
      {/if}
    {/if}
  {/if}
</div>
