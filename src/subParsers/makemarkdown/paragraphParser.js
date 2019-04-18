import nodeParser from './nodeParser.js';

export default function paragraphParser (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += nodeParser(children[i], globals);
    }
  }

  // some text normalization
  txt = txt.trim();

  return txt;
}
