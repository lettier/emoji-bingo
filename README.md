![Emoji Bingo](https://i.imgur.com/wTLNrkk.gif)

# Emoji Bingo

A game of chance, clicks, and emoji.
Made with [Svelte](https://github.com/sveltejs/svelte).
Click [here](https://lettier.github.io/emoji-bingo/) to play.

# Gameplay

Before playing,
have everyone load the game on their own device.
With the game loaded on everyone's device,
select a host.
The host will click the call button.
The rest of the group will click the play button.

The host is responsible for
generating and calling out the randomly chosen emoji
as well as verifying each bingo.
On the call page,
click the spin button to generate the next randomly chosen emoji.
Each randomly chosen emoji will show up at the bottom of the call page.
This will help with verifying each bingo.

The rest of the group will use the play page.
On the play page is the bingo card.
Each bingo card is generated randomly.
When the host calls out an emoji,
find that particular emoji on your card.
If your card contains the given emoji,
click it.
If it doesn't contain the given emoji,
wait for the host to give the next emoji.
If you accidentally click an emoji,
you can click it again to deselect it.

As you select more and more emoji,
the game will let you know when you have a bingo.
When you get a bingo,
let the host know so they can verify it.

# Customize

The emoji are located in [main.js](src/main.js).

# Build

```bash
git clone https://github.com/lettier/emoji-bingo.git
cd emoji-bingo
# Install Node Version Manager.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm use
npm install
npm run build
```

# Run

```bash
npm run dev &> /dev/null &
python -mwebbrowser http://localhost:55555
```

## Copyright

(C) 2020 David Lettier
<br>
[lettier.com](https://www.lettier.com)
