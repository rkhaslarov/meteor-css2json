/*!
 * CSS2JSON - converts styles into json, and json into styles which used at once.
 *
 * Copyright Rufat Khaslarov.
 * Released under the MIT license
 *
 * Date: 2016-12-20T13:51Z
 */

CSS2JSON = {

	validation: {
		json: {
			class 		: /^([_a-zA-Z]+[_a-zA-Z0-9-]*\s*?)+$/g,
			selector	:  /(\w+)?(\s*>\s*)?(#\w+)?\s*(\.\w+)?\s*/,
		},
		css: {
			selector	:  /(\w+)?(\s*>\s*)?(#\w+)?\s*(\.\w+)?\s*{/gm,
			this		:  /this\s*{/gm,
		}
	},

	parse: function(styleStr) {

		let json = {};

		if (_.isString(styleStr) && !_.isEmpty(styleStr)) { 

			let selectors = styleStr.match(this.validation.css.selector);

			_.each(selectors, (selector, index) => {

				let selectorPos = styleStr.indexOf(selector);
				let css = styleStr.slice(selectorPos + selector.length, styleStr.indexOf("}", selectorPos));
				let styles = css.split(';').filter(v => !_.isEmpty(v));

				if (!css.includes(styles)) {

					_.each(styles, (style, index) => {

						if (!_.isEmpty(style)) {

							style = style.split(':');

							let name = style.shift().trim();
							let value = style.shift().trim();

							if(selector.match(this.validation.css.this)){
								json[name] = value;
							} else {
								selector = selector.replace('{','').trim();
								json[selector] = json[selector] || {};
								json[selector][name] = value;
							}
						}

					});

				} else {
					throw new Error('CSS2JSON SyntaxError: Unexpected token ;');
				}

			});
		}

		return !_.isEmpty(json) ? json : false;
	},

	stringify: function(json) {

		let inlineStyle = "";
		let isExternal = false;
		let isInline = false;

		if (_.isObject(json) && !_.isEmpty(json)) {

			let sheet = (() => {
				let style = document.createElement("style");

				style.appendChild(document.createTextNode(""));
				document.head.appendChild(style);

				return style.sheet;
			})();

			for (let css in json) {

				let current = json[css];

				if (!_.isEmpty(current)) {

					if(_.isString(current)) {

						isInline = true;
						inlineStyle += css + ":" + json[css] + ";";

					} else if (_.isObject(current) && this.validation.json.selector.test(css)) {

						let elStyle = "";
						isExternal = true;

						for(property in json[css]) elStyle += property + ":" + json[css][property] + ";";
						
						sheet.insertRule(css + "{" + elStyle + "}", 0);
					}
				}
			}

			return isExternal && !isInline ? true : inlineStyle;
		} 
			
		return false;
	}
}