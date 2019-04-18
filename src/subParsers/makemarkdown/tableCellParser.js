import nodeParser from './nodeParser.js';

export default function tableCellParser (node, globals) {
  'use strict';

  var txt = '';
  if (!node.hasChildNodes()) {
    return '';
  }
  var children = node.childNodes,
      childrenLength = children.length;

  for (var i = 0; i < childrenLength; ++i) {
    txt += nodeParser(children[i], globals, true);
  }
  return txt.trim();
}
