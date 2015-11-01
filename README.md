# phaser-debug-layout
Debug world layout in Phaser. Works for any view element.

## Usage

```js
var debugLayout = require('phaser-debug-layout');

var game = new Phaser.Game(800, 600);
// preload some game assets and create game layout/view hierarchy
// in Phaser
debugLayout(game.world);
// logs all elements inside world in a hierarchy

var group = game.add.group(undefined, 'groupname');
var sprite = group.create(0, 0, 'spritekey');
debugLayout(group);
// logs all elements inside `group` in a hierarchy
```

