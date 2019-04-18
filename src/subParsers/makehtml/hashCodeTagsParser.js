import encodeCodeParser from './encodeCodeParser.js';

import * as helpers from '../../helpers.js';

/**
 * Hash and escape <code> elements that should not be parsed as markdown
 */
export default function hashCodeTags (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('makehtml.hashCodeTags.before', text, options, globals).getText();

  var repFunc = function (wholeMatch, match, left, right) {
    var codeblock = left + encodeCodeParser(match, options, globals) + right;
    return '¨C' + (globals.gHtmlSpans.push(codeblock) - 1) + 'C';
  };

  // Hash naked <code>
  text = helpers.replaceRecursiveRegExp(text, repFunc, '<code\\b[^>]*>', '</code>', 'gim');

  text = globals.converter._dispatch('makehtml.hashCodeTags.after', text, options, globals).getText();
  return text;
}
