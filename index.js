var Phaser = window.Phaser;
if (!Phaser) {
  throw new Error('Phaser is a required dependency');
}

function logCommon(obj, fields) {
  (fields || []).forEach(function (field) {
    var logFunc = getters[field] || function (obj) {
      return obj[field];
    };
    console.log.apply(console, [field].concat(logFunc(obj)));
  });
}

var getters = {
  bounds: function(obj) {
    return [obj.x, obj.y, obj.width, obj.height];
  }
};

function debugLayout(obj, opts) {
  opts = opts || {};

  if (Array.isArray(obj)) {
    obj.forEach(function (child) {
      debugLayout.call(this, child, opts);
    }.bind(this));
  } else if (obj instanceof Phaser.Group) {
    console.groupCollapsed(obj.name);
    logCommon(obj, opts.fields);
    debugLayout.call(this, obj.children, opts);
    console.groupEnd();
  } else if (obj instanceof Phaser.Sprite) {
    console.groupCollapsed(obj.key);
    console.log(obj.frameName);
    logCommon(obj, opts.fields);
    console.groupEnd();
  } else if (obj instanceof Phaser.Text) {
    console.groupCollapsed('Text');
    console.log(obj.text);
    logCommon(obj, opts.fields);
    console.groupEnd();
  } else if (obj instanceof Phaser.Button) {
    console.groupCollapsed(obj.key);
    if (obj.betlineButton) {
      console.log(obj.key, obj.betlineButton.name);
    } else {
      console.log(obj.key, obj.frameName);
    }
    logCommon(obj, opts.fields);
    console.groupEnd();
  } else if (obj instanceof Phaser.Graphics) {
    console.log('Graphic');
    logCommon(obj, opts.fields);
  } else if (obj instanceof Phaser.Game) {
    debugLayout.call(this, obj.world, opts);
  } else {
    throw new Error('Please provide valid game/view object');
  }
}

module.exports = debugLayout;

