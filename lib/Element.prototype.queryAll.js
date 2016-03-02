/* Elements */

window.Elements = function Elements() {};

Elements.prototype = new Array;

Elements.prototype.query = function query(selector) {
	var result;

	this.some(function (element) {
		return (result = element.query(selector));
	});

	return result;
};

Elements.prototype.queryAll = function queryAll(selector) {
	var elements = new Elements;

	splice.apply(
		elements,
		[0, 0].concat(
			this.reduce(function (array, element) {
				return array.concat(
					getQueryArray(element, selector)
				);
			}, []).sort(function(elementA, elementB) {
				return elementA.compareDocumentPosition(elementB) & 2 ? 1 : -1;
			}).filter(function (element, index, array) {
				return element !== array[index + 1];
			})
		)
	);

	return elements;
};

/* Element */

HTMLDocument.prototype.query = HTMLDocument.prototype.querySelector;

HTMLDocument.prototype.queryAll = function queryAll(selector) {
	var elements = new Elements;

	splice.apply(
		elements,
		[0, 0].concat(
			slice.call(
				this.querySelectorAll(selector)
			)
		)
	);

	return elements;
};

/* Element */

HTMLElement.prototype.query = function query(selector) {
	var attr = 'x' + (Math.floor(Math.random() * 90000) + 10000);

	this.setAttribute(attr, '');

	var element = this.querySelector(
		'[' + attr + '] ' + split(selector).join(',[' + attr + '] ')
	);

	this.removeAttribute(attr);

	return element;
};

HTMLElement.prototype.queryAll = function queryAll(selector) {
	var elements = new Elements;

	splice.apply(
		elements,
		[0, 0].concat(
			getQueryArray(this, selector)
		)
	);

	return elements;
};

var getQueryArray = function (element, selector) {
	var attr = 'x' + (Math.floor(Math.random() * 90000) + 10000);

	element.setAttribute(attr, '');

	var array = slice.call(
		element.querySelectorAll(
			'[' + attr + '] ' + split(selector).join(',[' + attr + '] ')
		)
	);

	element.removeAttribute(attr);

	return array;
}

var slice = Elements.prototype.slice;

var splice = Elements.prototype.splice;

var split = function (string) {
	var inset = 0;
	var chars = string.split('');
	var quote = false;
	var buffer = '';
	var balanced = [];

	while (chars.length) {
		var char = chars.shift();

		if (char === '\\') {
			char += chars.shift();
		} else if (char === '"') {
			quote = !quote;
		} else if (!quote && char === '(') {
			++inset;
		} else if (!quote && char === ')') {
			--inset;
		}

		if (quote || inset || char !== ',') {
			buffer += char;
		} else if (char === ',') {
			balanced.push(buffer);

			buffer = '';
		}
	}

	return balanced.concat(buffer);
};
