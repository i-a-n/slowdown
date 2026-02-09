# Slowdown

A focused HTML-to-Markdown converter with critical bug fixes.

## What is Slowdown?

Slowdown is a streamlined fork of [Showdown](https://github.com/showdownjs/showdown), specialized exclusively for **HTML → Markdown conversion**.

The original Showdown library is no longer actively maintained and contains several critical bugs in its HTML-to-Markdown functionality. Slowdown fixes these issues and removes all Markdown→HTML code to focus solely on HTML→Markdown conversion.

## Why Slowdown?

### Fixed Bugs

1. **Tables without `<thead>` are converted properly**
   - Original bug: Tables missing thead elements would fail or produce incorrect output
   - Fixed: Column count is now correctly determined from table structure

2. **HTML content in `<pre>` tags no longer crashes**
   - Original bug: `.toLowerCase()` called on text nodes caused crashes
   - Fixed: Uses `firstElementChild` instead of `firstChild` to avoid text node errors

3. **Consecutive `<pre>` tags are preserved**
   - Original bug: Whitespace cleaning removed structural nodes between consecutive pre tags
   - Fixed: Clean operation runs before pre tag substitution

## Installation

### npm
```bash
npm install slowdown
```

### From GitHub
```bash
npm install github:i-a-n/slowdown
```

### Local Development
```bash
git clone git@github.com:i-a-n/slowdown.git
cd slowdown
npm install
npm test
```

## Usage

### Node.js

```javascript
const slowdown = require('slowdown');
const converter = new slowdown.Converter();

const html = '<h1>Hello World</h1><p>This is <strong>HTML</strong>.</p>';
const markdown = converter.makeMarkdown(html);

console.log(markdown);
// # Hello World
//
// This is **HTML**.
```

### Tables

```javascript
const html = `
<table>
  <tbody>
    <tr><td>Name</td><td>Age</td></tr>
    <tr><td>Alice</td><td>30</td></tr>
    <tr><td>Bob</td><td>25</td></tr>
  </tbody>
</table>
`;

const markdown = converter.makeMarkdown(html);
// | Name  | Age |
// | ----- | --- |
// | Alice | 30  |
// | Bob   | 25  |
```

### Pre-formatted Code

```javascript
const html = '<pre>function hello() {\n  console.log("world");\n}</pre>';
const markdown = converter.makeMarkdown(html);
```

## API

### `new slowdown.Converter([options])`

Creates a new converter instance.

**Parameters:**
- `options` (Object, optional): Converter options (inherited from Showdown, most MD→HTML options removed)

**Returns:** Converter instance

### `converter.makeMarkdown(html)`

Converts an HTML string to Markdown.

**Parameters:**
- `html` (String): HTML string to convert

**Returns:** Markdown string

## Building

Slowdown uses Grunt for building distribution files:

```bash
# Install dependencies
npm install

# Build distribution files
npx grunt build-without-test

# Run tests
npm test
```

**Note:** We plan to modernize the build system in a future release (replace Grunt with esbuild or similar).

## Testing

```bash
# Run all tests
npm test

# Run only functional tests
npx grunt test-functional

# Run only unit tests
npx grunt test-unit
```

## What's Removed from Showdown?

- ❌ Markdown → HTML conversion (`makeHtml()` method)
- ❌ All MD→HTML subparsers (~30 files)
- ❌ Extensive documentation for unused features
- ❌ Browser-based testing (Karma)
- ❌ mkdocs documentation system
- ❌ Bower support
- ❌ GitHub workflow configurations

## Project Status

Slowdown is actively maintained for HTML→Markdown conversion. This is a focused tool, not a general-purpose Markdown library.

**Version:** 2.0.0 (major rewrite)

## License

MIT License - maintained from the original Showdown project.

Copyright (c) 2018-2021 ShowdownJS  
Copyright (c) 2026 Slowdown (fork)

See [LICENSE](LICENSE) for full details.

## Credits

Slowdown is a fork of [Showdown](https://github.com/showdownjs/showdown) by Estevão Santos, which itself was based on the original Markdown converter by John Gruber.

## Contributing

This is a focused fork with a specific purpose. Major feature additions are generally not accepted, but bug fixes and performance improvements are welcome.

To report bugs:
1. Check if it's reproducible with the latest version
2. Create a minimal test case
3. Open an issue on GitHub with reproduction steps

## Links

- **GitHub:** https://github.com/i-a-n/slowdown
- **npm:** (package not yet published)
- **Original Showdown:** https://github.com/showdownjs/showdown
