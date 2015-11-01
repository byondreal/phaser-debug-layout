var Phaser = window.Phaser;
if (!Phaser) {
  throw new Error('Phaser is a required dependency');
}

function logBounds(obj) {
  console.log(obj.x, obj.y, obj.width, obj.height);
}

function debugLayout(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(debugLayout);
  } else if (obj instanceof Phaser.Group) {
    console.groupCollapsed(obj.name);
    logBounds(obj);
    debugLayout(obj.children);
    console.groupEnd();
  } else if (obj instanceof Phaser.Sprite) {
    console.groupCollapsed(obj.key);
    console.log(obj.frameName);
    logBounds(obj);
    console.groupEnd();
  } else if (obj instanceof Phaser.Text) {
    console.groupCollapsed('Text');
    console.log(obj.text);
    logBounds(obj);
    console.groupEnd();
  } else if (obj instanceof Phaser.Button) {
    console.groupCollapsed(obj.key);
    if (obj.betlineButton) {
      console.log(obj.key, obj.betlineButton.name);
    } else {
      console.log(obj.key, obj.frameName);
    }
    logBounds(obj);
    console.groupEnd();
  } else if (obj instanceof Phaser.Graphics) {
    console.log('Graphic');
  } else if (obj instanceof Phaser.Game) {
    debugLayout(obj.world);
  } else {
    throw new Error('Please provide valid game/view object');
  }
}

module.exports = debugLayout;

