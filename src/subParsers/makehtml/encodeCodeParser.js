import * as helpers from '../../helpers.js';

/**
 * Encode/escape certain characters inside Markdown code runs.
 * The point is that in code, these characters are literals,
 * and lose their special Markdown meanings.
 */
export default function encodeCode (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('makehtml.encodeCode.before', text, options, globals).getText();

  // Encode all ampersands; HTML entities are not
  // entities within a Markdown code span.
  text = text
    .replace(/&/g, '&amp;')
  // Do the angle bracket song and dance:
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  // Now, escape characters that are magic in Markdown:
    .replace(/([*_{}\[\]\\=~-])/g, helpers.escapeCharactersCallback);

  text = globals.converter._dispatch('makehtml.encodeCode.after', text, options, globals).getText();
  return text;
}
