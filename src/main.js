/*
  (C) 2020 David Lettier
  lettier.com
*/

import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    emojis: [
      '🏀',
      '👽',
      '🍭',
      '🤖',
      '👍',
      '🎩',
      '👢',
      '🐨',
      '💀',
      '🐬',
      '👣',
      '🌴',
      '🌚',
      '🔥',
      '🍅',
      '🍕',
      '🐒',
      '🚀',
      '🎉',
      '🎮',
      '🍄',
      '👏',
      '🐧',
      '🐶',
      '🐸',
      '🌈',
      '⭐️',
      '🍎',
      '💣',
      '💥'
    ]
  }
});

export default app;
