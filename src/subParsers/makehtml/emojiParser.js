import * as helpers from '../../helpers.js';

/**
 * Turn emoji codes into emojis
 *
 * List of supported emojis: https://github.com/showdownjs/showdown/wiki/Emojis
 */
export default function emoji (text, options, globals) {
  'use strict';

  if (!options.emoji) {
    return text;
  }

  text = globals.converter._dispatch('makehtml.emoji.before', text, options, globals).getText();

  var emojiRgx = /:([\S]+?):/g;

  text = text.replace(emojiRgx, function (wm, emojiCode) {
    if (helpers.emojis.hasOwnProperty(emojiCode)) {
      return helpers.emojis[emojiCode];
    }
    return wm;
  });

  text = globals.converter._dispatch('makehtml.emoji.after', text, options, globals).getText();

  return text;
}
