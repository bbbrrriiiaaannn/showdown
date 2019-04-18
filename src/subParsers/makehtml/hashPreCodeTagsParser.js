import encodeCodeParser from './encodeCodeParser.js';

import * as helpers from '../../helpers.js';

/**
 * Hash and escape <pre><code> elements that should not be parsed as markdown
 */
export default function hashPreCodeTags (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('makehtml.hashPreCodeTags.before', text, options, globals).getText();

  var repFunc = function (wholeMatch, match, left, right) {
    // encode html entities
    var codeblock = left + encodeCodeParser(match, options, globals) + right;
    return '\n\n¨G' + (globals.ghCodeBlocks.push({text: wholeMatch, codeblock: codeblock}) - 1) + 'G\n\n';
  };

  // Hash <pre><code>
  text = helpers.replaceRecursiveRegExp(text, repFunc, '^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>', '^ {0,3}</code>\\s*</pre>', 'gim');

  text = globals.converter._dispatch('makehtml.hashPreCodeTags.after', text, options, globals).getText();
  return text;
}
