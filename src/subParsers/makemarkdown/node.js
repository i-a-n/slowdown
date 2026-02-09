

slowdown.subParser('makeMarkdown.node', function (node, options, globals, spansOnly) {
  'use strict';

  spansOnly = spansOnly || false;

  var txt = '';

  // edge case of text without wrapper paragraph
  if (node.nodeType === 3) {
    return slowdown.subParser('makeMarkdown.txt')(node, options, globals);
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
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.header')(node, options, globals, 1) + '\n\n'; }
      break;
    case 'h2':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.header')(node, options, globals, 2) + '\n\n'; }
      break;
    case 'h3':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.header')(node, options, globals, 3) + '\n\n'; }
      break;
    case 'h4':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.header')(node, options, globals, 4) + '\n\n'; }
      break;
    case 'h5':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.header')(node, options, globals, 5) + '\n\n'; }
      break;
    case 'h6':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.header')(node, options, globals, 6) + '\n\n'; }
      break;

    case 'p':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.paragraph')(node, options, globals) + '\n\n'; }
      break;

    case 'blockquote':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.blockquote')(node, options, globals) + '\n\n'; }
      break;

    case 'hr':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.hr')(node, options, globals) + '\n\n'; }
      break;

    case 'ol':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.list')(node, options, globals, 'ol') + '\n\n'; }
      break;

    case 'ul':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.list')(node, options, globals, 'ul') + '\n\n'; }
      break;

    case 'precode':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.codeBlock')(node, options, globals) + '\n\n'; }
      break;

    case 'pre':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.pre')(node, options, globals) + '\n\n'; }
      break;

    case 'table':
      if (!spansOnly) { txt = slowdown.subParser('makeMarkdown.table')(node, options, globals) + '\n\n'; }
      break;

    //
    // SPANS
    //
    case 'code':
      txt = slowdown.subParser('makeMarkdown.codeSpan')(node, options, globals);
      break;

    case 'em':
    case 'i':
      txt = slowdown.subParser('makeMarkdown.emphasis')(node, options, globals);
      break;

    case 'strong':
    case 'b':
      txt = slowdown.subParser('makeMarkdown.strong')(node, options, globals);
      break;

    case 'del':
      txt = slowdown.subParser('makeMarkdown.strikethrough')(node, options, globals);
      break;

    case 'a':
      txt = slowdown.subParser('makeMarkdown.links')(node, options, globals);
      break;

    case 'img':
      txt = slowdown.subParser('makeMarkdown.image')(node, options, globals);
      break;

    case 'br':
      txt = slowdown.subParser('makeMarkdown.break')(node, options, globals);
      break;

    case 'input':
      txt = slowdown.subParser('makeMarkdown.input')(node, options, globals);
      break;

    default:
      txt = node.outerHTML + '\n\n';
  }

  // common normalization
  // TODO eventually

  return txt;
});
