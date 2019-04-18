import {getDefaultOpts, allOptionsOn} from './options.js';

let globalProps = {
  parsers: {},
  extensions: {},
  globalOptions: getDefaultOpts(true),
  setFlavor: 'vanilla',
  flavor: {
    github: {
      omitExtraWLInCodeBlocks:              true,
      simplifiedAutoLink:                   true,
      literalMidWordUnderscores:            true,
      strikethrough:                        true,
      tables:                               true,
      tablesHeaderId:                       true,
      ghCodeBlocks:                         true,
      tasklists:                            true,
      disableForced4SpacesIndentedSublists: true,
      simpleLineBreaks:                     true,
      requireSpaceBeforeHeadingText:        true,
      ghCompatibleHeaderId:                 true,
      ghMentions:                           true,
      backslashEscapesHTMLTags:             true,
      emoji:                                true,
      splitAdjacentBlockquotes:             true
    },
    original: {
      noHeaderId:                           true,
      ghCodeBlocks:                         false
    },
    ghost: {
      omitExtraWLInCodeBlocks:              true,
      parseImgDimensions:                   true,
      simplifiedAutoLink:                   true,
      literalMidWordUnderscores:            true,
      strikethrough:                        true,
      tables:                               true,
      tablesHeaderId:                       true,
      ghCodeBlocks:                         true,
      tasklists:                            true,
      smoothLivePreview:                    true,
      simpleLineBreaks:                     true,
      requireSpaceBeforeHeadingText:        true,
      ghMentions:                           false,
      encodeEmails:                         true
    },
    vanilla: getDefaultOpts(true),
    allOn: allOptionsOn()
  }
};

export default globalProps;
