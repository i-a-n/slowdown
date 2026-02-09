slowdown.subParser('makeMarkdown.paragraph', function (node, options, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += slowdown.subParser('makeMarkdown.node')(children[i], options, globals);
    }
  }

  // some text normalization
  txt = txt.trim();

  return txt;
});
