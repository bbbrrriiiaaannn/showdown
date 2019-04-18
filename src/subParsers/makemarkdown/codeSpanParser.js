export default function codeSpanParser (node) {
  'use strict';

  return '`' + node.innerHTML + '`';
}
