import nodeParser from './nodeParser.js';

export default function strongParser (node, globals) {
  'use strict';

  var txt = '';
  if (node.hasChildNodes()) {
    txt += '**';
    var children = node.childNodes,
        childrenLength = children.length;
    for (var i = 0; i < childrenLength; ++i) {
      txt += nodeParser(children[i], globals);
    }
    txt += '**';
  }
  return txt;
}
