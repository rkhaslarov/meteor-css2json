rkhaslarov:css2json
=================

This package provides a css2json conventer.
CSS2JSON object provides two methods parse and stringify (like JSON in JS).
This package is specific and can be needed when application stores CSS rules as JSON in database.

# Usage
CSS2JSON.parse method (CSS to JSON).

Argument passed to this method must be a css string which contains css rules (selector {rule; rule;}).
For example, p.main {padding: 1px;margin:1px;}
You can use special "this" selector for inline style.
For example, this { padding: 1px; margin: 1px; }

```js
let json = CSS2JSON.parse("this {margin:1px;} tag.class{padding: 20px;margin:20px;}")
console.log(json);
//returns {'margin':'1px', 'tag.class': { padding: '20px', margin: '20px' }}
```
CSS2JSON.stringify method (JSON to CSS).

Argument passed to this method must be an object which you get as result of parse method.
This method returns only inline styles string (for style attr), but internal css (with selectors) will be reactively loaded at once.
If inline styles is empty and internal css isn't then returns true.
```js
let css = CSS2JSON.stringify({ padding: '20px',margin: '1px','img': { opacity: '0.3 !important' }  });
console.log(css);
//returns only padding:20px;margin:1px;
```
