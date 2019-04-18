import blockQuotesParser from './blockQuotesParser.js';
import codeBlocksParser from './codeBlocksParser.js';
import hashHTMLBlocksParser from './hashHTMLBlocksParser.js';
import headersParser from './headersParser.js';
import horizontalRuleParser from './horizontalRuleParser.js';
import listsParser from './listsParser.js';
import paragraphsParser from './paragraphsParser.js';
import tablesParser from './tablesParser.js';

/**
 * These are all the transformations that form block-level
 * tags like paragraphs, headers, and list items.
 */
export default function blockGamut (text, options, globals) {
  'use strict';

  text = globals.converter._dispatch('makehtml.blockGamut.before', text, options, globals).getText();

  // we parse blockquotes first so that we can have headings and hrs
  // inside blockquotes
  text = blockQuotesParser(text, options, globals);
  text = headersParser(text, options, globals);

  // Do Horizontal Rules:
  text = horizontalRuleParser(text, options, globals);

  text = listsParser(text, options, globals);
  text = codeBlocksParser(text, options, globals);
  text = tablesParser(text, options, globals);

  // We already ran _HashHTMLBlocks() before, in Markdown(), but that
  // was to escape raw HTML in the original Markdown source. This time,
  // we're escaping the markup we've just created, so that we don't wrap
  // <p> tags around block-level tags.
  text = hashHTMLBlocksParser(text, options, globals);
  text = paragraphsParser(text, options, globals);

  text = globals.converter._dispatch('makehtml.blockGamut.after', text, options, globals).getText();

  return text;
}
