import detabParser from './detabParser.js';
import encodeCodeParser from './encodeCodeParser.js';
import hashBlockParser from './hashBlockParser.js';
import outdentParser from './outdentParser.js';

/**
 * Process Markdown `<pre><code>` blocks.
 */
export default function codeBlocks (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('makehtml.codeBlocks.before', text, options, globals).getText();

  // sentinel workarounds for lack of \A and \Z, safari\khtml bug
  text += '¨0';

  var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
  text = text.replace(pattern, function (wholeMatch, m1, m2) {
    var codeblock = m1,
        nextChar = m2,
        end = '\n';

    codeblock = outdentParser(codeblock, options, globals);
    codeblock = encodeCodeParser(codeblock, options, globals);
    codeblock = detabParser(codeblock, options, globals);
    codeblock = codeblock.replace(/^\n+/g, ''); // trim leading newlines
    codeblock = codeblock.replace(/\n+$/g, ''); // trim trailing newlines

    if (options.omitExtraWLInCodeBlocks) {
      end = '';
    }

    codeblock = '<pre><code>' + codeblock + end + '</code></pre>';

    return hashBlockParser(codeblock, options, globals) + nextChar;
  });

  // strip sentinel
  text = text.replace(/¨0/, '');

  text = globals.converter._dispatch('makehtml.codeBlocks.after', text, options, globals).getText();
  return text;
}
