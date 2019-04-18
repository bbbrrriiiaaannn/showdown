/**
 * Unhash HTML spans
 */
export default function unhashHTMLSpans (text, options, globals) {
  'use strict';
  text = globals.converter._dispatch('makehtml.unhashHTMLSpans.before', text, options, globals).getText();

  for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
    var repText = globals.gHtmlSpans[i],
        // limiter to prevent infinite loop (assume 10 as limit for recurse)
        limit = 0;

    while (/¨C(\d+)C/.test(repText)) {
      var num = RegExp.$1;
      repText = repText.replace('¨C' + num + 'C', globals.gHtmlSpans[num]);
      if (limit === 10) {
        console.error('maximum nesting of 10 spans reached!!!');
        break;
      }
      ++limit;
    }
    text = text.replace('¨C' + i + 'C', repText);
  }

  text = globals.converter._dispatch('makehtml.unhashHTMLSpans.after', text, options, globals).getText();
  return text;
}
