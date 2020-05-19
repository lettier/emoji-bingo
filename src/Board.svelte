<!--
  (C) 2020 David Lettier
  lettier.com
-->

<script>
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let emojis = [];

  let count  = 0;
  let matrix = [];

	onMount(() => {
    let selection = [...emojis];

    for (let i = 0; i < 5; ++i) {
      let row = [];
      for (let j = 0; j < 5; ++j) {
        if (i === 2 && j === 2) {
          row.push({ emoji: '󠀠', selected: true });
          continue;
        }
        let index = Math.round(Math.random() * (selection.length - 1));
        let emoji = selection[index];
        selection.splice(index, 1);
        row.push({ emoji: emoji, selected: false });
      }
      matrix.push(row);
    }
    matrix = matrix;
	});

  function selectEmoji(i, j) {
    let row = matrix[i];
    let selection = row[j];
    selection.selected = !selection.selected;
    row[j] = selection;
    matrix[i] = row;
    count += 1;

    if (count >= 4) {
      let bingo = findBingo();
      if (bingo) {
        dispatch(
          'bingo',
          true
        )
      }
    }

    let element = document.getElementById(i + "-" + j);

    let name   = "ding";
    let volume = 0.1;

    if (!selection.selected) {
      name = "buzzer";
      volume = 0.03;

      element.classList.remove('emoji-spin');
    } else {
      element.classList.add('emoji-spin');
    }

    dispatch(
      "playSound",
      { name: name, volume: volume }
    )
  }

  function findBingo() {
    let selected = 0;

    for (let i = 0; i < 5; ++i) {
      selected = 0;
      for (let j = 0; j < 5; ++j) {
        let element = matrix[i][j];
        if (element.selected) { selected += 1 }
      }
      if (selected == 5) { return true; }
    }

    for (let i = 0; i < 5; ++i) {
      selected = 0;
      for (let j = 0; j < 5; ++j) {
        let element = matrix[j][i];
        if (element.selected) { selected += 1 }
      }
      if (selected == 5) { return true; }
    }

    selected = 0;
    for (let j = 0; j < 5; ++j) {
      let element = matrix[j][j];
      if (element.selected) { selected += 1 }
    }
    if (selected == 5) { return true; }

    selected = 0;
    for (let j = 0; j < 5; ++j) {
      let element = matrix[j][4 - j];
      if (element.selected) { selected += 1 }
    }
    if (selected == 5) { return true; }

    return false;
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
  }
  .row {
    display: flex;
    width: 100%;
    height: auto;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: stretch;
  }
  .emoji-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    text-align: center;
    width: 3vmax;
    height: 3vmax;
    margin: 2vmax;
  }
  .emoji {
    z-index: 1;
    cursor: pointer;
    border: 5px solid bisque;
    margin: 0px;
    line-height: 1.1;
    width: 5vmax;
    height: 5vmax;
    min-width: 5vmax;
    min-height: 5vmax;
    font-size: 5vmax;
  }
  .dot {
    position: absolute;
    z-index: 2000;
    border-radius: 100%;
    background-color: bisque;
    border: 5px solid blue;
    opacity: 0.5;
    width: 5vmax;
    height: 5vmax;
  }
</style>

<div id="board" class="board">
  {#each matrix as row, ii}
    <div class="row">
      {#each row as item, jj}
        <div class="emoji-container" on:click="{ e => { selectEmoji(ii, jj); } }">
          <p id="{ii}-{jj}" class="emoji">{item.emoji}</p>
          {#if item.selected}
            <div class="dot">&nbsp;</div>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>
