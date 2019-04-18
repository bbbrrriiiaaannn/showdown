import codeSpansParser from './codeSpansParser.js';
import ellipsisParser from './ellipsisParser.js';
import emojiParser from './emojiParser.js';
import encodeAmpsAndAnglesParser from './encodeAmpsAndAnglesParser.js';
import encodeBackslashEscapesParser from './encodeBackslashEscapesParser.js';
import escapeSpecialCharsWithinTagAttributesParser from './escapeSpecialCharsWithinTagAttributesParser.js';
import hashHTMLSpansParser from './hashHTMLSpansParser.js';
import imagesParser from './imagesParser.js';
import italicsAndBoldParser from './italicsAndBoldParser.js';
import linksParser from './linksParser.js';
import strikethroughParser from './strikethroughParser.js';
import underlineParser from './underlineParser.js';

/**
 * These are all the transformations that occur *within* block-level
 * tags like paragraphs, headers, and list items.
 */
export default function spanGamut (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('makehtml.span.before', text, options, globals).getText();

  text = codeSpansParser(text, options, globals);
  text = escapeSpecialCharsWithinTagAttributesParser(text, options, globals);
  text = encodeBackslashEscapesParser(text, options, globals);

  // Process link and image tags. Images must come first,
  // because ![foo][f] looks like a link.
  text = imagesParser(text, options, globals);

  text = globals.converter._dispatch('smakehtml.links.before', text, options, globals).getText();
  text = linksParser(text, options, globals);
  text = globals.converter._dispatch('smakehtml.links.after', text, options, globals).getText();

  //text = autoLinksParser(text, options, globals);
  //text = simplifiedAutoLinksParser(text, options, globals);
  text = emojiParser(text, options, globals);
  text = underlineParser(text, options, globals);
  text = italicsAndBoldParser(text, options, globals);
  text = strikethroughParser(text, options, globals);
  text = ellipsisParser(text, options, globals);

  // we need to hash HTML tags inside spans
  text = hashHTMLSpansParser(text, options, globals);

  // now we encode amps and angles
  text = encodeAmpsAndAnglesParser(text, options, globals);

  // Do hard breaks
  if (options.simpleLineBreaks) {
    // GFM style hard breaks
    // only add line breaks if the text does not contain a block (special case for lists)
    if (!/\n\n¨K/.test(text)) {
      text = text.replace(/\n+/g, '<br />\n');
    }
  } else {
    // Vanilla hard breaks
    text = text.replace(/  +\n/g, '<br />\n');
  }

  text = globals.converter._dispatch('makehtml.spanGamut.after', text, options, globals).getText();
  return text;
}
