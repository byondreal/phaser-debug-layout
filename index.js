var Phaser = window.Phaser;
if (!Phaser) {
  throw new Error('Phaser is a required dependency');
}

function logCommon(obj, fields) {
  (fields || []).forEach(function (field) {
    if (!getters[field] && obj[field] === undefined) {
      return;
    }
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
  } else {
    console.groupCollapsed(
      (
        obj.name ||
        (obj.childName && '.' + obj.childName) ||
        (obj.frameName && ':' + obj.frameName) ||
        obj.key ||
        obj.text ||
        '-'
      ) +
      (
        obj instanceof Phaser.Group ?
          '' :
          (
            ' ' +
            '(' +
            Object.keys(Phaser).find(function(key) {
              return typeof Phaser[key] === 'function' &&
                obj instanceof Phaser[key]
            }) +
            ')'
          )
      )
    );
    logCommon(obj, opts.fields);
    if (obj.children) {
      debugLayout.call(this, obj.children, opts);
    }
    console.groupEnd();
  }
}

debugLayout.create = function(game) {
  return function (obj, opts) {
    opts = opts || {};
    opts.fields = opts.fields || ['bounds', 'visible', 'alpha', 'text'];
    debugLayout(obj || (game && game.world), opts);
  };
};

module.exports = debugLayout;

