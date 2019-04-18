import blockquoteParser from './blockquoteParser.js';
import codeBlockParser from './codeBlockParser.js';
import codeSpanParser from './codeSpanParser.js';
import emphasisParser from './emphasisParser.js';
import headerParser from './headerParser.js';
import hrParser from './hrParser.js';
import imageParser from './imageParser.js';
import linksParser from './linksParser.js';
import listParser from './listParser.js';
import paragraphParser from './paragraphParser.js';
import preParser from './preParser.js';
import strikethroughParser from './strikethroughParser.js';
import strongParser from './strongParser.js';
import tableParser from './tableParser.js';
import txtParser from './txtParser.js';

export default function nodeParser (node, globals, spansOnly) {
  'use strict';

  spansOnly = spansOnly || false;

  var txt = '';

  // edge case of text without wrapper paragraph
  if (node.nodeType === 3) {
    return txtParser(node, globals);
  }

  // HTML comment
  if (node.nodeType === 8) {
    return '<!--' + node.data + '-->\n\n';
  }

  // process only node elements
  if (node.nodeType !== 1) {
    return '';
  }

  var tagName = node.tagName.toLowerCase();

  switch (tagName) {

    //
    // BLOCKS
    //
    case 'h1':
      if (!spansOnly) { txt = headerParser(node, globals, 1) + '\n\n'; }
      break;
    case 'h2':
      if (!spansOnly) { txt = headerParser(node, globals, 2) + '\n\n'; }
      break;
    case 'h3':
      if (!spansOnly) { txt = headerParser(node, globals, 3) + '\n\n'; }
      break;
    case 'h4':
      if (!spansOnly) { txt = headerParser(node, globals, 4) + '\n\n'; }
      break;
    case 'h5':
      if (!spansOnly) { txt = headerParser(node, globals, 5) + '\n\n'; }
      break;
    case 'h6':
      if (!spansOnly) { txt = headerParser(node, globals, 6) + '\n\n'; }
      break;

    case 'p':
      if (!spansOnly) { txt = paragraphParser(node, globals) + '\n\n'; }
      break;

    case 'blockquote':
      if (!spansOnly) { txt = blockquoteParser(node, globals) + '\n\n'; }
      break;

    case 'hr':
      if (!spansOnly) { txt = hrParser(node, globals) + '\n\n'; }
      break;

    case 'ol':
      if (!spansOnly) { txt = listParser(node, globals, 'ol') + '\n\n'; }
      break;

    case 'ul':
      if (!spansOnly) { txt = listParser(node, globals, 'ul') + '\n\n'; }
      break;

    case 'precode':
      if (!spansOnly) { txt = codeBlockParser(node, globals) + '\n\n'; }
      break;

    case 'pre':
      if (!spansOnly) { txt = preParser(node, globals) + '\n\n'; }
      break;

    case 'table':
      if (!spansOnly) { txt = tableParser(node, globals) + '\n\n'; }
      break;

    //
    // SPANS
    //
    case 'code':
      txt = codeSpanParser(node, globals);
      break;

    case 'em':
    case 'i':
      txt = emphasisParser(node, globals);
      break;

    case 'strong':
    case 'b':
      txt = strongParser(node, globals);
      break;

    case 'del':
      txt = strikethroughParser(node, globals);
      break;

    case 'a':
      txt = linksParser(node, globals);
      break;

    case 'img':
      txt = imageParser(node, globals);
      break;

    default:
      txt = node.outerHTML + '\n\n';
  }

  // common normalization
  // TODO eventually

  return txt;
}
