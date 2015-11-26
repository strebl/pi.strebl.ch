(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],2:[function(require,module,exports){
//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = getParsingFlags(from);
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function Locale() {
    }

    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && typeof module !== 'undefined' &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (typeof values === 'undefined') {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, values) {
        if (values !== null) {
            values.abbr = name;
            locales[name] = locales[name] || new Locale();
            locales[name].set(values);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function get_set__set (mom, unit, value) {
        return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

    var regexes = {};

    function isFunction (sth) {
        // https://github.com/moment/moment/issues/2325
        return typeof sth === 'function' &&
            Object.prototype.toString.call(sth) === '[object Function]';
    }


    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  matchWord);
    addRegexToken('MMMM', matchWord);

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m) {
        return this._months[m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m) {
        return this._monthsShort[m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (firstTime) {
                warn(msg + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    var from_string__isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
        ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
        ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d{2}/],
        ['YYYY-DDD', /\d{4}-\d{3}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
        ['HH:mm', /(T| )\d\d:\d\d/],
        ['HH', /(T| )\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = from_string__isoRegex.exec(string);

        if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    config._f = isoDates[i][0];
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    // match[6] should be 'T' or space
                    config._f += (match[6] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (string.match(matchOffset)) {
                config._f += 'Z';
            }
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = local__createLocal(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var week1Jan = 6 + firstDayOfWeek - firstDayOfWeekOfYear, janX = createUTCDate(year, 0, 1 + week1Jan), d = janX.getUTCDay(), dayOfYear;
        if (d < firstDayOfWeek) {
            d += 7;
        }

        weekday = weekday != null ? 1 * weekday : firstDayOfWeek;

        dayOfYear = 1 + week1Jan + 7 * (week - 1) - d + weekday;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()];
        }
        return [now.getFullYear(), now.getMonth(), now.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = [i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond];

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             return other < this ? this : other;
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            return other > this ? this : other;
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchOffset);
    addRegexToken('ZZ', matchOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(string) {
        var matches = ((string || '').match(matchOffset) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(input);
            }
            if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (typeof this._isDSTShifted !== 'undefined') {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return !this._isUTC;
    }

    function isUtcOffset () {
        return this._isUTC;
    }

    function isUtc () {
        return this._isUTC && this._offset === 0;
    }

    var aspNetRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    var create__isoRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = create__isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                d : parseIso(match[4], sign),
                h : parseIso(match[5], sign),
                m : parseIso(match[6], sign),
                s : parseIso(match[7], sign),
                w : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
        return this.format(formats && formats[format] || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this > +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return inputMs < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var inputMs;
        units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this < +input;
        } else {
            inputMs = isMoment(input) ? +input : +local__createLocal(input);
            return +this.clone().endOf(units) < inputMs;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var inputMs;
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            input = isMoment(input) ? input : local__createLocal(input);
            return +this === +input;
        } else {
            inputMs = +local__createLocal(input);
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function diff (input, units, asFloat) {
        var that = cloneWithOffset(input, this),
            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4,
            delta, output;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if ('function' === typeof Date.prototype.toISOString) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }
        return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // HELPERS

    function weeksInYear(year, dow, doy) {
        return weekOfYear(local__createLocal([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    // MOMENTS

    function getSetWeekYear (input) {
        var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getSetISOWeekYear (input) {
        var year = weekOfYear(this, 1, 4).year;
        return input == null ? year : this.add((input - year), 'y');
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    addFormatToken('Q', 0, 0, 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config) {
        var weekday = config._locale.weekdaysParse(input);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m) {
        return this._weekdays[m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName) {
        var i, mom, regex;

        this._weekdaysParse = this._weekdaysParse || [];

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            if (!this._weekdaysParse[i]) {
                mom = local__createLocal([2000, 1]).day(i);
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, function () {
        return this.hours() % 12 || 12;
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add          = add_subtract__add;
    momentPrototype__proto.calendar     = moment_calendar__calendar;
    momentPrototype__proto.clone        = clone;
    momentPrototype__proto.diff         = diff;
    momentPrototype__proto.endOf        = endOf;
    momentPrototype__proto.format       = format;
    momentPrototype__proto.from         = from;
    momentPrototype__proto.fromNow      = fromNow;
    momentPrototype__proto.to           = to;
    momentPrototype__proto.toNow        = toNow;
    momentPrototype__proto.get          = getSet;
    momentPrototype__proto.invalidAt    = invalidAt;
    momentPrototype__proto.isAfter      = isAfter;
    momentPrototype__proto.isBefore     = isBefore;
    momentPrototype__proto.isBetween    = isBetween;
    momentPrototype__proto.isSame       = isSame;
    momentPrototype__proto.isValid      = moment_valid__isValid;
    momentPrototype__proto.lang         = lang;
    momentPrototype__proto.locale       = locale;
    momentPrototype__proto.localeData   = localeData;
    momentPrototype__proto.max          = prototypeMax;
    momentPrototype__proto.min          = prototypeMin;
    momentPrototype__proto.parsingFlags = parsingFlags;
    momentPrototype__proto.set          = getSet;
    momentPrototype__proto.startOf      = startOf;
    momentPrototype__proto.subtract     = add_subtract__subtract;
    momentPrototype__proto.toArray      = toArray;
    momentPrototype__proto.toObject     = toObject;
    momentPrototype__proto.toDate       = toDate;
    momentPrototype__proto.toISOString  = moment_format__toISOString;
    momentPrototype__proto.toJSON       = moment_format__toISOString;
    momentPrototype__proto.toString     = toString;
    momentPrototype__proto.unix         = unix;
    momentPrototype__proto.valueOf      = to_type__valueOf;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return typeof output === 'function' ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (typeof output === 'function') ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (typeof prop === 'function') {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months       =        localeMonths;
    prototype__proto._months      = defaultLocaleMonths;
    prototype__proto.monthsShort  =        localeMonthsShort;
    prototype__proto._monthsShort = defaultLocaleMonthsShort;
    prototype__proto.monthsParse  =        localeMonthsParse;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes === 1          && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   === 1          && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    === 1          && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  === 1          && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   === 1          && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.10.6';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],3:[function(require,module,exports){
(function(Prism) {
	var insideString = {
		variable: [
			// Arithmetic Environment
			{
				pattern: /\$?\(\([\w\W]+?\)\)/,
				inside: {
					// If there is a $ sign at the beginning highlight $(( and )) as variable
					variable: [{
							pattern: /(^\$\(\([\w\W]+)\)\)/,
							lookbehind: true
						},
						/^\$\(\(/,
					],
					number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
					// Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
					operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
					// If there is no $ sign at the beginning highlight (( and )) as punctuation
					punctuation: /\(\(?|\)\)?|,|;/
				}
			},
			// Command Substitution
			{
				pattern: /\$\([^)]+\)|`[^`]+`/,
				inside: {
					variable: /^\$\(|^`|\)$|`$/
				}
			},
			/\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i
		],
	};

	Prism.languages.bash = {
		'shebang': {
			pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
			alias: 'important'
		},
		'comment': {
			pattern: /(^|[^"{\\])#.*/,
			lookbehind: true
		},
		'string': [
			//Support for Here-Documents https://en.wikipedia.org/wiki/Here_document
			{
				pattern: /((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
				lookbehind: true,
				inside: insideString
			},
			{
				pattern: /("|')(?:\\?[\s\S])*?\1/g,
				inside: insideString
			}
		],
		'variable': insideString.variable,
		// Originally based on http://ss64.com/bash/
		'function': {
			pattern: /(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
			lookbehind: true
		},
		'keyword': {
			pattern: /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
			lookbehind: true
		},
		'boolean': {
			pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,
			lookbehind: true
		},
		'operator': /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
		'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
	};

	var inside = insideString.variable[1].inside;
	inside['function'] = Prism.languages.bash['function'];
	inside.keyword = Prism.languages.bash.keyword;
	inside.boolean = Prism.languages.bash.boolean;
	inside.operator = Prism.languages.bash.operator;
	inside.punctuation = Prism.languages.bash.punctuation;
})(Prism);
},{}],4:[function(require,module,exports){
Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};

},{}],5:[function(require,module,exports){
Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true
	}
});

Prism.languages.insertBefore('javascript', 'class-name', {
	'template-string': {
		pattern: /`(?:\\`|\\?[^`])*`/,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;
},{}],6:[function(require,module,exports){
Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

},{}],7:[function(require,module,exports){
(function (global){

/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

var _ = _self.Prism = {
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					// Check for existence for IE8
					return o.map && o.map(function(v) { return _.util.clone(v); });
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];
			
			if (arguments.length == 2) {
				insert = arguments[1];
				
				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}
				
				return grammar;
			}
			
			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}
			
			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type) {
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object') {
						_.languages.DFS(o[i], callback);
					}
					else if (_.util.type(o[i]) === 'Array') {
						_.languages.DFS(o[i], callback, i);
					}
				}
			}
		}
	},
	plugins: {},
	
	highlightAll: function(async, callback) {
		var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1];
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		parent = element.parentNode;

		if (/pre/i.test(parent.nodeName)) {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		if (!code || !grammar) {
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	tokenize: function(text, grammar, language) {
		var Token = _.Token;

		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		tokenloop: for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					lookbehindLength = 0,
					alias = pattern.alias;

				pattern = pattern.pattern || pattern;

				for (var i=0; i<strarr.length; i++) { // Don’t cache length as it changes during the loop

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						break tokenloop;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str);

					if (match) {
						if(lookbehind) {
							lookbehindLength = match[1].length;
						}

						var from = match.index - 1 + lookbehindLength,
							match = match[0].slice(lookbehindLength),
							len = match.length,
							to = from + len,
							before = str.slice(0, from + 1),
							after = str.slice(to + 1);

						var args = [i, 1];

						if (before) {
							args.push(before);
						}

						var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);
					}
				}
			}
		}

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias) {
	this.type = type;
	this.content = content;
	this.alias = alias;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (env.type == 'comment') {
		env.attributes['spellcheck'] = 'true';
	}

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = '';

	for (var name in env.attributes) {
		attributes += (attributes ? ' ' : '') + name + '="' + (env.attributes[name] || '') + '"';
	}

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}
 	// In worker
	_self.addEventListener('message', function(evt) {
		var message = JSON.parse(evt.data),
		    lang = message.language,
		    code = message.code,
		    immediateClose = message.immediateClose;

		_self.postMessage(_.highlight(code, _.languages[lang], lang));
		if (immediateClose) {
			_self.close();
		}
	}, false);

	return _self.Prism;
}

// Get current script and highlight
var script = document.getElementsByTagName('script');

script = script[script.length - 1];

if (script) {
	_.filename = script.src;

	if (document.addEventListener && !script.hasAttribute('data-manual')) {
		document.addEventListener('DOMContentLoaded', _.highlightAll);
	}
}

return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\w\W]*?-->/,
	'prolog': /<\?[\w\W]+?\?>/,
	'doctype': /<!DOCTYPE[\w\W]+?>/,
	'cdata': /<!\[CDATA\[[\w\W]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;


/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});
	
	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true
	}
});

Prism.languages.insertBefore('javascript', 'class-name', {
	'template-string': {
		pattern: /`(?:\\`|\\?[^`])*`/,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;

/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function() {

		var Extensions = {
			'js': 'javascript',
			'html': 'markup',
			'svg': 'markup',
			'xml': 'markup',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell'
		};

		if(Array.prototype.forEach) { // Check to prevent error in IE8
			Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
				var src = pre.getAttribute('data-src');

				var language, parent = pre;
				var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
				while (parent && !lang.test(parent.className)) {
					parent = parent.parentNode;
				}

				if (parent) {
					language = (pre.className.match(lang) || [, ''])[1];
				}

				if (!language) {
					var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
					language = Extensions[extension] || extension;
				}

				var code = document.createElement('code');
				code.className = 'language-' + language;

				pre.textContent = '';

				code.textContent = 'Loading…';

				pre.appendChild(code);

				var xhr = new XMLHttpRequest();

				xhr.open('GET', src, true);

				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {

						if (xhr.status < 400 && xhr.responseText) {
							code.textContent = xhr.responseText;

							Prism.highlightElement(code);
						}
						else if (xhr.status >= 400) {
							code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
						}
						else {
							code.textContent = '✖ Error: File does not exist or is empty';
						}
					}
				};

				xhr.send(null);
			});
		}

	};

	self.Prism.fileHighlight();

})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
/*!
 * Pusher JavaScript Library v3.0.0
 * http://pusher.com/
 *
 * Copyright 2014, Pusher
 * Released under the MIT licence.
 */

// Uses Node, AMD or browser globals to create a module. This example creates
// a global even when AMD is used. This is useful if you have some scripts
// that are loaded by an AMD loader, but they still want access to globals.
// If you do not need to export a global for the AMD case,
// see returnExports.js.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrictGlobal.js

// Defines a module "Pusher".

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      return (root.Pusher = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.Pusher = factory();
  }
}(this, function () {

;(function() {
  function Pusher(app_key, options) {
    checkAppKey(app_key);
    options = options || {};

    var self = this;

    this.key = app_key;
    this.config = Pusher.Util.extend(
      Pusher.getGlobalConfig(),
      options.cluster ? Pusher.getClusterConfig(options.cluster) : {},
      options
    );

    this.channels = new Pusher.Channels();
    this.global_emitter = new Pusher.EventsDispatcher();
    this.sessionID = Math.floor(Math.random() * 1000000000);

    this.timeline = new Pusher.Timeline(this.key, this.sessionID, {
      cluster: this.config.cluster,
      features: Pusher.Util.getClientFeatures(),
      params: this.config.timelineParams || {},
      limit: 50,
      level: Pusher.Timeline.INFO,
      version: Pusher.VERSION
    });
    if (!this.config.disableStats) {
      this.timelineSender = new Pusher.TimelineSender(this.timeline, {
        host: this.config.statsHost,
        path: "/timeline/v2/jsonp"
      });
    }

    var getStrategy = function(options) {
      var config = Pusher.Util.extend({}, self.config, options);
      return Pusher.StrategyBuilder.build(
        Pusher.getDefaultStrategy(config), config
      );
    };

    this.connection = new Pusher.ConnectionManager(
      this.key,
      Pusher.Util.extend(
        { getStrategy: getStrategy,
          timeline: this.timeline,
          activityTimeout: this.config.activity_timeout,
          pongTimeout: this.config.pong_timeout,
          unavailableTimeout: this.config.unavailable_timeout
        },
        this.config,
        { encrypted: this.isEncrypted() }
      )
    );

    this.connection.bind('connected', function() {
      self.subscribeAll();
      if (self.timelineSender) {
        self.timelineSender.send(self.connection.isEncrypted());
      }
    });
    this.connection.bind('message', function(params) {
      var internal = (params.event.indexOf('pusher_internal:') === 0);
      if (params.channel) {
        var channel = self.channel(params.channel);
        if (channel) {
          channel.handleEvent(params.event, params.data);
        }
      }
      // Emit globally [deprecated]
      if (!internal) {
        self.global_emitter.emit(params.event, params.data);
      }
    });
    this.connection.bind('disconnected', function() {
      self.channels.disconnect();
    });
    this.connection.bind('error', function(err) {
      Pusher.warn('Error', err);
    });

    Pusher.instances.push(this);
    this.timeline.info({ instances: Pusher.instances.length });

    if (Pusher.isReady) {
      self.connect();
    }
  }
  var prototype = Pusher.prototype;

  Pusher.instances = [];
  Pusher.isReady = false;

  // To receive log output provide a Pusher.log function, for example
  // Pusher.log = function(m){console.log(m)}
  Pusher.debug = function() {
    if (!Pusher.log) {
      return;
    }
    Pusher.log(Pusher.Util.stringify.apply(this, arguments));
  };

  Pusher.warn = function() {
    var message = Pusher.Util.stringify.apply(this, arguments);
    if (window.console) {
      if (window.console.warn) {
        window.console.warn(message);
      } else if (window.console.log) {
        window.console.log(message);
      }
    }
    if (Pusher.log) {
      Pusher.log(message);
    }
  };

  Pusher.ready = function() {
    Pusher.isReady = true;
    for (var i = 0, l = Pusher.instances.length; i < l; i++) {
      Pusher.instances[i].connect();
    }
  };

  prototype.channel = function(name) {
    return this.channels.find(name);
  };

  prototype.allChannels = function() {
    return this.channels.all();
  };

  prototype.connect = function() {
    this.connection.connect();

    if (this.timelineSender) {
      if (!this.timelineSenderTimer) {
        var encrypted = this.connection.isEncrypted();
        var timelineSender = this.timelineSender;
        this.timelineSenderTimer = new Pusher.PeriodicTimer(60000, function() {
          timelineSender.send(encrypted);
        });
      }
    }
  };

  prototype.disconnect = function() {
    this.connection.disconnect();

    if (this.timelineSenderTimer) {
      this.timelineSenderTimer.ensureAborted();
      this.timelineSenderTimer = null;
    }
  };

  prototype.bind = function(event_name, callback) {
    this.global_emitter.bind(event_name, callback);
    return this;
  };

  prototype.bind_all = function(callback) {
    this.global_emitter.bind_all(callback);
    return this;
  };

  prototype.subscribeAll = function() {
    var channelName;
    for (channelName in this.channels.channels) {
      if (this.channels.channels.hasOwnProperty(channelName)) {
        this.subscribe(channelName);
      }
    }
  };

  prototype.subscribe = function(channel_name) {
    var channel = this.channels.add(channel_name, this);
    if (this.connection.state === 'connected') {
      channel.subscribe();
    }
    return channel;
  };

  prototype.unsubscribe = function(channel_name) {
    var channel = this.channels.remove(channel_name);
    if (channel && this.connection.state === 'connected') {
      channel.unsubscribe();
    }
  };

  prototype.send_event = function(event_name, data, channel) {
    return this.connection.send_event(event_name, data, channel);
  };

  prototype.isEncrypted = function() {
    if (Pusher.Util.getDocument().location.protocol === "https:") {
      return true;
    } else {
      return Boolean(this.config.encrypted);
    }
  };

  function checkAppKey(key) {
    if (key === null || key === undefined) {
      Pusher.warn(
        'Warning', 'You must pass your app key when you instantiate Pusher.'
      );
    }
  }

  Pusher.HTTP = {};

  this.Pusher = Pusher;
}).call(this);

;(function() {
  // We need to bind clear functions this way to avoid exceptions on IE8
  function clearTimeout(timer) {
    window.clearTimeout(timer);
  }
  function clearInterval(timer) {
    window.clearInterval(timer);
  }

  function GenericTimer(set, clear, delay, callback) {
    var self = this;

    this.clear = clear;
    this.timer = set(function() {
      if (self.timer !== null) {
        self.timer = callback(self.timer);
      }
    }, delay);
  }
  var prototype = GenericTimer.prototype;

  /** Returns whether the timer is still running.
   *
   * @return {Boolean}
   */
  prototype.isRunning = function() {
    return this.timer !== null;
  };

  /** Aborts a timer when it's running. */
  prototype.ensureAborted = function() {
    if (this.timer) {
      // Clear function is already bound
      this.clear(this.timer);
      this.timer = null;
    }
  };

  /** Cross-browser compatible one-off timer abstraction.
   *
   * @param {Number} delay
   * @param {Function} callback
   */
  Pusher.Timer = function(delay, callback) {
    return new GenericTimer(setTimeout, clearTimeout, delay, function(timer) {
      callback();
      return null;
    });
  };
  /** Cross-browser compatible periodic timer abstraction.
   *
   * @param {Number} delay
   * @param {Function} callback
   */
  Pusher.PeriodicTimer = function(delay, callback) {
    return new GenericTimer(setInterval, clearInterval, delay, function(timer) {
      callback();
      return timer;
    });
  };
}).call(this);

;(function() {
  Pusher.Util = {
    now: function() {
      if (Date.now) {
        return Date.now();
      } else {
        return new Date().valueOf();
      }
    },

    defer: function(callback) {
      return new Pusher.Timer(0, callback);
    },

    /** Merges multiple objects into the target argument.
     *
     * For properties that are plain Objects, performs a deep-merge. For the
     * rest it just copies the value of the property.
     *
     * To extend prototypes use it as following:
     *   Pusher.Util.extend(Target.prototype, Base.prototype)
     *
     * You can also use it to merge objects without altering them:
     *   Pusher.Util.extend({}, object1, object2)
     *
     * @param  {Object} target
     * @return {Object} the target argument
     */
    extend: function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var extensions = arguments[i];
        for (var property in extensions) {
          if (extensions[property] && extensions[property].constructor &&
              extensions[property].constructor === Object) {
            target[property] = Pusher.Util.extend(
              target[property] || {}, extensions[property]
            );
          } else {
            target[property] = extensions[property];
          }
        }
      }
      return target;
    },

    stringify: function() {
      var m = ["Pusher"];
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === "string") {
          m.push(arguments[i]);
        } else {
          if (window.JSON === undefined) {
            m.push(arguments[i].toString());
          } else {
            m.push(JSON.stringify(arguments[i]));
          }
        }
      }
      return m.join(" : ");
    },

    arrayIndexOf: function(array, item) { // MSIE doesn't have array.indexOf
      var nativeIndexOf = Array.prototype.indexOf;
      if (array === null) {
        return -1;
      }
      if (nativeIndexOf && array.indexOf === nativeIndexOf) {
        return array.indexOf(item);
      }
      for (var i = 0, l = array.length; i < l; i++) {
        if (array[i] === item) {
          return i;
        }
      }
      return -1;
    },

    /** Applies a function f to all properties of an object.
     *
     * Function f gets 3 arguments passed:
     * - element from the object
     * - key of the element
     * - reference to the object
     *
     * @param {Object} object
     * @param {Function} f
     */
    objectApply: function(object, f) {
      for (var key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          f(object[key], key, object);
        }
      }
    },

    /** Return a list of object's own property keys
     *
     * @param {Object} object
     * @returns {Array}
     */
    keys: function(object) {
      var keys = [];
      Pusher.Util.objectApply(object, function(_, key) {
        keys.push(key);
      });
      return keys;
    },

    /** Return a list of object's own property values
     *
     * @param {Object} object
     * @returns {Array}
     */
    values: function(object) {
      var values = [];
      Pusher.Util.objectApply(object, function(value) {
        values.push(value);
      });
      return values;
    },

    /** Applies a function f to all elements of an array.
     *
     * Function f gets 3 arguments passed:
     * - element from the array
     * - index of the element
     * - reference to the array
     *
     * @param {Array} array
     * @param {Function} f
     */
    apply: function(array, f, context) {
      for (var i = 0; i < array.length; i++) {
        f.call(context || window, array[i], i, array);
      }
    },

    /** Maps all elements of the array and returns the result.
     *
     * Function f gets 4 arguments passed:
     * - element from the array
     * - index of the element
     * - reference to the source array
     * - reference to the destination array
     *
     * @param {Array} array
     * @param {Function} f
     */
    map: function(array, f) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        result.push(f(array[i], i, array, result));
      }
      return result;
    },

    /** Maps all elements of the object and returns the result.
     *
     * Function f gets 4 arguments passed:
     * - element from the object
     * - key of the element
     * - reference to the source object
     * - reference to the destination object
     *
     * @param {Object} object
     * @param {Function} f
     */
    mapObject: function(object, f) {
      var result = {};
      Pusher.Util.objectApply(object, function(value, key) {
        result[key] = f(value);
      });
      return result;
    },

    /** Filters elements of the array using a test function.
     *
     * Function test gets 4 arguments passed:
     * - element from the array
     * - index of the element
     * - reference to the source array
     * - reference to the destination array
     *
     * @param {Array} array
     * @param {Function} f
     */
    filter: function(array, test) {
      test = test || function(value) { return !!value; };

      var result = [];
      for (var i = 0; i < array.length; i++) {
        if (test(array[i], i, array, result)) {
          result.push(array[i]);
        }
      }
      return result;
    },

    /** Filters properties of the object using a test function.
     *
     * Function test gets 4 arguments passed:
     * - element from the object
     * - key of the element
     * - reference to the source object
     * - reference to the destination object
     *
     * @param {Object} object
     * @param {Function} f
     */
    filterObject: function(object, test) {
      var result = {};
      Pusher.Util.objectApply(object, function(value, key) {
        if ((test && test(value, key, object, result)) || Boolean(value)) {
          result[key] = value;
        }
      });
      return result;
    },

    /** Flattens an object into a two-dimensional array.
     *
     * @param  {Object} object
     * @return {Array} resulting array of [key, value] pairs
     */
    flatten: function(object) {
      var result = [];
      Pusher.Util.objectApply(object, function(value, key) {
        result.push([key, value]);
      });
      return result;
    },

    /** Checks whether any element of the array passes the test.
     *
     * Function test gets 3 arguments passed:
     * - element from the array
     * - index of the element
     * - reference to the source array
     *
     * @param {Array} array
     * @param {Function} f
     */
    any: function(array, test) {
      for (var i = 0; i < array.length; i++) {
        if (test(array[i], i, array)) {
          return true;
        }
      }
      return false;
    },

    /** Checks whether all elements of the array pass the test.
     *
     * Function test gets 3 arguments passed:
     * - element from the array
     * - index of the element
     * - reference to the source array
     *
     * @param {Array} array
     * @param {Function} f
     */
    all: function(array, test) {
      for (var i = 0; i < array.length; i++) {
        if (!test(array[i], i, array)) {
          return false;
        }
      }
      return true;
    },

    /** Builds a function that will proxy a method call to its first argument.
     *
     * Allows partial application of arguments, so additional arguments are
     * prepended to the argument list.
     *
     * @param  {String} name method name
     * @return {Function} proxy function
     */
    method: function(name) {
      var boundArguments = Array.prototype.slice.call(arguments, 1);
      return function(object) {
        return object[name].apply(object, boundArguments.concat(arguments));
      };
    },

    getWindow: function() {
      return window;
    },

    getDocument: function() {
      return document;
    },

    getLocalStorage: function() {
      try {
        return window.localStorage;
      } catch (e) {
        return undefined;
      }
    },

    getClientFeatures: function() {
      return Pusher.Util.keys(
        Pusher.Util.filterObject(
          { "ws": Pusher.WSTransport },
          function (t) { return t.isSupported({}); }
        )
      );
    },

    addWindowListener: function(event, listener) {
      var _window = Pusher.Util.getWindow();
      if (_window.addEventListener !== undefined) {
        _window.addEventListener(event, listener, false);
      } else {
        _window.attachEvent("on" + event, listener);
      }
    },

    removeWindowListener: function(event, listener) {
      var _window = Pusher.Util.getWindow();
      if (_window.addEventListener !== undefined) {
        _window.removeEventListener(event, listener, false);
      } else {
        _window.detachEvent("on" + event, listener);
      }
    },

    isXHRSupported: function() {
      var XHR = window.XMLHttpRequest;
      return Boolean(XHR) && (new XHR()).withCredentials !== undefined;
    },

    isXDRSupported: function(encrypted) {
      var protocol = encrypted ? "https:" : "http:";
      var documentProtocol = Pusher.Util.getDocument().location.protocol;
      return Boolean(window.XDomainRequest) && documentProtocol === protocol;
    }
  };
}).call(this);

;(function() {
  Pusher.VERSION = '3.0.0';
  Pusher.PROTOCOL = 7;

  // DEPRECATED: WS connection parameters
  Pusher.host = 'ws.pusherapp.com';
  Pusher.ws_port = 80;
  Pusher.wss_port = 443;
  // DEPRECATED: SockJS fallback parameters
  Pusher.sockjs_host = 'sockjs.pusher.com';
  Pusher.sockjs_http_port = 80;
  Pusher.sockjs_https_port = 443;
  Pusher.sockjs_path = "/pusher";
  // DEPRECATED: Stats
  Pusher.stats_host = 'stats.pusher.com';
  // DEPRECATED: Other settings
  Pusher.channel_auth_endpoint = '/pusher/auth';
  Pusher.channel_auth_transport = 'ajax';
  Pusher.activity_timeout = 120000;
  Pusher.pong_timeout = 30000;
  Pusher.unavailable_timeout = 10000;
  // CDN configuration
  Pusher.cdn_http = 'http://js.pusher.com/';
  Pusher.cdn_https = 'https://js.pusher.com/';
  Pusher.dependency_suffix = '';

  Pusher.getDefaultStrategy = function(config) {
    var wsStrategy;
    if (config.encrypted) {
      wsStrategy = [
        ":best_connected_ever",
        ":ws_loop",
        [":delayed", 2000, [":http_fallback_loop"]]
      ];
    } else {
      wsStrategy = [
        ":best_connected_ever",
        ":ws_loop",
        [":delayed", 2000, [":wss_loop"]],
        [":delayed", 5000, [":http_fallback_loop"]]
      ];
    }

    return [
      [":def", "ws_options", {
        hostUnencrypted: config.wsHost + ":" + config.wsPort,
        hostEncrypted: config.wsHost + ":" + config.wssPort
      }],
      [":def", "wss_options", [":extend", ":ws_options", {
        encrypted: true
      }]],
      [":def", "sockjs_options", {
        hostUnencrypted: config.httpHost + ":" + config.httpPort,
        hostEncrypted: config.httpHost + ":" + config.httpsPort,
        httpPath: config.httpPath
      }],
      [":def", "timeouts", {
        loop: true,
        timeout: 15000,
        timeoutLimit: 60000
      }],

      [":def", "ws_manager", [":transport_manager", {
        lives: 2,
        minPingDelay: 10000,
        maxPingDelay: config.activity_timeout
      }]],
      [":def", "streaming_manager", [":transport_manager", {
        lives: 2,
        minPingDelay: 10000,
        maxPingDelay: config.activity_timeout
      }]],

      [":def_transport", "ws", "ws", 3, ":ws_options", ":ws_manager"],
      [":def_transport", "wss", "ws", 3, ":wss_options", ":ws_manager"],
      [":def_transport", "sockjs", "sockjs", 1, ":sockjs_options"],
      [":def_transport", "xhr_streaming", "xhr_streaming", 1, ":sockjs_options", ":streaming_manager"],
      [":def_transport", "xdr_streaming", "xdr_streaming", 1, ":sockjs_options", ":streaming_manager"],
      [":def_transport", "xhr_polling", "xhr_polling", 1, ":sockjs_options"],
      [":def_transport", "xdr_polling", "xdr_polling", 1, ":sockjs_options"],

      [":def", "ws_loop", [":sequential", ":timeouts", ":ws"]],
      [":def", "wss_loop", [":sequential", ":timeouts", ":wss"]],
      [":def", "sockjs_loop", [":sequential", ":timeouts", ":sockjs"]],

      [":def", "streaming_loop", [":sequential", ":timeouts",
        [":if", [":is_supported", ":xhr_streaming"],
          ":xhr_streaming",
          ":xdr_streaming"
        ]
      ]],
      [":def", "polling_loop", [":sequential", ":timeouts",
        [":if", [":is_supported", ":xhr_polling"],
          ":xhr_polling",
          ":xdr_polling"
        ]
      ]],

      [":def", "http_loop", [":if", [":is_supported", ":streaming_loop"], [
        ":best_connected_ever",
          ":streaming_loop",
          [":delayed", 4000, [":polling_loop"]]
      ], [
        ":polling_loop"
      ]]],

      [":def", "http_fallback_loop",
        [":if", [":is_supported", ":http_loop"], [
          ":http_loop"
        ], [
          ":sockjs_loop"
        ]]
      ],

      [":def", "strategy",
        [":cached", 1800000,
          [":first_connected",
            [":if", [":is_supported", ":ws"],
              wsStrategy,
              ":http_fallback_loop"
            ]
          ]
        ]
      ]
    ];
  };
}).call(this);

;(function() {
  Pusher.getGlobalConfig = function() {
    return {
      wsHost: Pusher.host,
      wsPort: Pusher.ws_port,
      wssPort: Pusher.wss_port,
      httpHost: Pusher.sockjs_host,
      httpPort: Pusher.sockjs_http_port,
      httpsPort: Pusher.sockjs_https_port,
      httpPath: Pusher.sockjs_path,
      statsHost: Pusher.stats_host,
      authEndpoint: Pusher.channel_auth_endpoint,
      authTransport: Pusher.channel_auth_transport,
      // TODO make this consistent with other options in next major version
      activity_timeout: Pusher.activity_timeout,
      pong_timeout: Pusher.pong_timeout,
      unavailable_timeout: Pusher.unavailable_timeout
    };
  };

  Pusher.getClusterConfig = function(clusterName) {
    return {
      wsHost: "ws-" + clusterName + ".pusher.com",
      httpHost: "sockjs-" + clusterName + ".pusher.com"
    };
  };
}).call(this);

;(function() {
  function buildExceptionClass(name) {
    var constructor = function(message) {
      Error.call(this, message);
      this.name = name;
    };
    Pusher.Util.extend(constructor.prototype, Error.prototype);

    return constructor;
  }

  /** Error classes used throughout pusher-js library. */
  Pusher.Errors = {
    BadEventName: buildExceptionClass("BadEventName"),
    RequestTimedOut: buildExceptionClass("RequestTimedOut"),
    TransportPriorityTooLow: buildExceptionClass("TransportPriorityTooLow"),
    TransportClosed: buildExceptionClass("TransportClosed"),
    UnsupportedTransport: buildExceptionClass("UnsupportedTransport"),
    UnsupportedStrategy: buildExceptionClass("UnsupportedStrategy")
  };
}).call(this);

;(function() {
  /** Manages callback bindings and event emitting.
   *
   * @param Function failThrough called when no listeners are bound to an event
   */
  function EventsDispatcher(failThrough) {
    this.callbacks = new CallbackRegistry();
    this.global_callbacks = [];
    this.failThrough = failThrough;
  }
  var prototype = EventsDispatcher.prototype;

  prototype.bind = function(eventName, callback, context) {
    this.callbacks.add(eventName, callback, context);
    return this;
  };

  prototype.bind_all = function(callback) {
    this.global_callbacks.push(callback);
    return this;
  };

  prototype.unbind = function(eventName, callback, context) {
    this.callbacks.remove(eventName, callback, context);
    return this;
  };

  prototype.unbind_all = function(eventName, callback) {
    this.callbacks.remove(eventName, callback);
    return this;
  };

  prototype.emit = function(eventName, data) {
    var i;

    for (i = 0; i < this.global_callbacks.length; i++) {
      this.global_callbacks[i](eventName, data);
    }

    var callbacks = this.callbacks.get(eventName);
    if (callbacks && callbacks.length > 0) {
      for (i = 0; i < callbacks.length; i++) {
        callbacks[i].fn.call(callbacks[i].context || window, data);
      }
    } else if (this.failThrough) {
      this.failThrough(eventName, data);
    }

    return this;
  };

  /** Callback registry helper. */

  function CallbackRegistry() {
    this._callbacks = {};
  }

  CallbackRegistry.prototype.get = function(name) {
    return this._callbacks[prefix(name)];
  };

  CallbackRegistry.prototype.add = function(name, callback, context) {
    var prefixedEventName = prefix(name);
    this._callbacks[prefixedEventName] = this._callbacks[prefixedEventName] || [];
    this._callbacks[prefixedEventName].push({
      fn: callback,
      context: context
    });
  };

  CallbackRegistry.prototype.remove = function(name, callback, context) {
    if (!name && !callback && !context) {
      this._callbacks = {};
      return;
    }

    var names = name ? [prefix(name)] : Pusher.Util.keys(this._callbacks);

    if (callback || context) {
      Pusher.Util.apply(names, function(name) {
        this._callbacks[name] = Pusher.Util.filter(
          this._callbacks[name] || [],
          function(binding) {
            return (callback && callback !== binding.fn) ||
                   (context && context !== binding.context);
          }
        );
        if (this._callbacks[name].length === 0) {
          delete this._callbacks[name];
        }
      }, this);
    } else {
      Pusher.Util.apply(names, function(name) {
        delete this._callbacks[name];
      }, this);
    }
  };

  function prefix(name) {
    return "_" + name;
  }

  Pusher.EventsDispatcher = EventsDispatcher;
}).call(this);

(function() {
  /** Builds receivers for JSONP and Script requests.
   *
   * Each receiver is an object with following fields:
   * - number - unique (for the factory instance), numerical id of the receiver
   * - id - a string ID that can be used in DOM attributes
   * - name - name of the function triggering the receiver
   * - callback - callback function
   *
   * Receivers are triggered only once, on the first callback call.
   *
   * Receivers can be called by their name or by accessing factory object
   * by the number key.
   *
   * @param {String} prefix the prefix used in ids
   * @param {String} name the name of the object
   */
  function ScriptReceiverFactory(prefix, name) {
    this.lastId = 0;
    this.prefix = prefix;
    this.name = name;
  }
  var prototype = ScriptReceiverFactory.prototype;

  /** Creates a script receiver.
   *
   * @param {Function} callback
   * @return {ScriptReceiver}
   */
  prototype.create = function(callback) {
    this.lastId++;

    var number = this.lastId;
    var id = this.prefix + number;
    var name = this.name + "[" + number + "]";

    var called = false;
    var callbackWrapper = function() {
      if (!called) {
        callback.apply(null, arguments);
        called = true;
      }
    };

    this[number] = callbackWrapper;
    return { number: number, id: id, name: name, callback: callbackWrapper };
  };

  /** Removes the script receiver from the list.
   *
   * @param {ScriptReceiver} receiver
   */
  prototype.remove = function(receiver) {
    delete this[receiver.number];
  };

  Pusher.ScriptReceiverFactory = ScriptReceiverFactory;
  Pusher.ScriptReceivers = new ScriptReceiverFactory(
    "_pusher_script_", "Pusher.ScriptReceivers"
  );
}).call(this);

(function() {
  /** Sends a generic HTTP GET request using a script tag.
   *
   * By constructing URL in a specific way, it can be used for loading
   * JavaScript resources or JSONP requests. It can notify about errors, but
   * only in certain environments. Please take care of monitoring the state of
   * the request yourself.
   *
   * @param {String} src
   */
  function ScriptRequest(src) {
    this.src = src;
  }
  var prototype = ScriptRequest.prototype;

  /** Sends the actual script request.
   *
   * @param {ScriptReceiver} receiver
   */
  prototype.send = function(receiver) {
    var self = this;
    var errorString = "Error loading " + self.src;

    self.script = document.createElement("script");
    self.script.id = receiver.id;
    self.script.src = self.src;
    self.script.type = "text/javascript";
    self.script.charset = "UTF-8";

    if (self.script.addEventListener) {
      self.script.onerror = function() {
        receiver.callback(errorString);
      };
      self.script.onload = function() {
        receiver.callback(null);
      };
    } else {
      self.script.onreadystatechange = function() {
        if (self.script.readyState === 'loaded' ||
            self.script.readyState === 'complete') {
          receiver.callback(null);
        }
      };
    }

    // Opera<11.6 hack for missing onerror callback
    if (self.script.async === undefined && document.attachEvent &&
        /opera/i.test(navigator.userAgent)) {
      self.errorScript = document.createElement("script");
      self.errorScript.id = receiver.id + "_error";
      self.errorScript.text = receiver.name + "('" + errorString + "');";
      self.script.async = self.errorScript.async = false;
    } else {
      self.script.async = true;
    }

    var head = document.getElementsByTagName('head')[0];
    head.insertBefore(self.script, head.firstChild);
    if (self.errorScript) {
      head.insertBefore(self.errorScript, self.script.nextSibling);
    }
  };

  /** Cleans up the DOM remains of the script request. */
  prototype.cleanup = function() {
    if (this.script) {
      this.script.onload = this.script.onerror = null;
      this.script.onreadystatechange = null;
    }
    if (this.script && this.script.parentNode) {
      this.script.parentNode.removeChild(this.script);
    }
    if (this.errorScript && this.errorScript.parentNode) {
      this.errorScript.parentNode.removeChild(this.errorScript);
    }
    this.script = null;
    this.errorScript = null;
  };

  Pusher.ScriptRequest = ScriptRequest;
}).call(this);

;(function() {
  /** Handles loading dependency files.
   *
   * Dependency loaders don't remember whether a resource has been loaded or
   * not. It is caller's responsibility to make sure the resource is not loaded
   * twice. This is because it's impossible to detect resource loading status
   * without knowing its content.
   *
   * Options:
   * - cdn_http - url to HTTP CND
   * - cdn_https - url to HTTPS CDN
   * - version - version of pusher-js
   * - suffix - suffix appended to all names of dependency files
   *
   * @param {Object} options
   */
  function DependencyLoader(options) {
    this.options = options;
    this.receivers = options.receivers || Pusher.ScriptReceivers;
    this.loading = {};
  }
  var prototype = DependencyLoader.prototype;

  /** Loads the dependency from CDN.
   *
   * @param  {String} name
   * @param  {Function} callback
   */
  prototype.load = function(name, options, callback) {
    var self = this;

    if (self.loading[name] && self.loading[name].length > 0) {
      self.loading[name].push(callback);
    } else {
      self.loading[name] = [callback];

      var request = new Pusher.ScriptRequest(self.getPath(name, options));
      var receiver = self.receivers.create(function(error) {
        self.receivers.remove(receiver);

        if (self.loading[name]) {
          var callbacks = self.loading[name];
          delete self.loading[name];

          var successCallback = function(wasSuccessful) {
            if (!wasSuccessful) {
              request.cleanup();
            }
          };
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](error, successCallback);
          }
        }
      });
      request.send(receiver);
    }
  };

  /** Returns a root URL for pusher-js CDN.
   *
   * @returns {String}
   */
  prototype.getRoot = function(options) {
    var cdn;
    var protocol = Pusher.Util.getDocument().location.protocol;
    if ((options && options.encrypted) || protocol === "https:") {
      cdn = this.options.cdn_https;
    } else {
      cdn = this.options.cdn_http;
    }
    // make sure there are no double slashes
    return cdn.replace(/\/*$/, "") + "/" + this.options.version;
  };

  /** Returns a full path to a dependency file.
   *
   * @param {String} name
   * @returns {String}
   */
  prototype.getPath = function(name, options) {
    return this.getRoot(options) + '/' + name + this.options.suffix + '.js';
  };

  Pusher.DependencyLoader = DependencyLoader;
}).call(this);

;(function() {
  Pusher.DependenciesReceivers = new Pusher.ScriptReceiverFactory(
    "_pusher_dependencies", "Pusher.DependenciesReceivers"
  );
  Pusher.Dependencies = new Pusher.DependencyLoader({
    cdn_http: Pusher.cdn_http,
    cdn_https: Pusher.cdn_https,
    version: Pusher.VERSION,
    suffix: Pusher.dependency_suffix,
    receivers: Pusher.DependenciesReceivers
  });

  function initialize() {
    Pusher.ready();
  }

  // Allows calling a function when the document body is available
   function onDocumentBody(callback) {
    if (document.body) {
      callback();
    } else {
      setTimeout(function() {
        onDocumentBody(callback);
      }, 0);
    }
  }

  function initializeOnDocumentBody() {
    onDocumentBody(initialize);
  }

  if (!window.JSON) {
    Pusher.Dependencies.load("json2", {}, initializeOnDocumentBody);
  } else {
    initializeOnDocumentBody();
  }
})();

(function() {

  var Base64 = {
    encode: function (s) {
      return btoa(utob(s));
    }
  };

  var fromCharCode = String.fromCharCode;

  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var b64tab = {};

  for (var i = 0, l = b64chars.length; i < l; i++) {
    b64tab[b64chars.charAt(i)] = i;
  }

  var cb_utob = function(c) {
    var cc = c.charCodeAt(0);
    return cc < 0x80 ? c
        : cc < 0x800 ? fromCharCode(0xc0 | (cc >>> 6)) +
                       fromCharCode(0x80 | (cc & 0x3f))
        : fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) +
          fromCharCode(0x80 | ((cc >>>  6) & 0x3f)) +
          fromCharCode(0x80 | ( cc         & 0x3f));
  };

  var utob = function(u) {
    return u.replace(/[^\x00-\x7F]/g, cb_utob);
  };

  var cb_encode = function(ccc) {
    var padlen = [0, 2, 1][ccc.length % 3];
    var ord = ccc.charCodeAt(0) << 16
      | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
      | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0));
    var chars = [
      b64chars.charAt( ord >>> 18),
      b64chars.charAt((ord >>> 12) & 63),
      padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
      padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
    ];
    return chars.join('');
  };

  var btoa = window.btoa || function(b) {
    return b.replace(/[\s\S]{1,3}/g, cb_encode);
  };

  Pusher.Base64 = Base64;

}).call(this);

(function() {
  /** Sends data via JSONP.
   *
   * Data is a key-value map. Its values are JSON-encoded and then passed
   * through base64. Finally, keys and encoded values are appended to the query
   * string.
   *
   * The class itself does not guarantee raising errors on failures, as it's not
   * possible to support such feature on all browsers. Instead, JSONP endpoint
   * should call back in a way that's easy to distinguish from browser calls,
   * for example by passing a second argument to the receiver.
   *
   * @param {String} url
   * @param {Object} data key-value map of data to be submitted
   */
  function JSONPRequest(url, data) {
    this.url = url;
    this.data = data;
  }
  var prototype = JSONPRequest.prototype;

  /** Sends the actual JSONP request.
   *
   * @param {ScriptReceiver} receiver
   */
  prototype.send = function(receiver) {
    if (this.request) {
      return;
    }

    var params = Pusher.Util.filterObject(this.data, function(value) {
      return value !== undefined;
    });
    var query = Pusher.Util.map(
      Pusher.Util.flatten(encodeParamsObject(params)),
      Pusher.Util.method("join", "=")
    ).join("&");
    var url = this.url + "/" + receiver.number + "?" + query;

    this.request = new Pusher.ScriptRequest(url);
    this.request.send(receiver);
  };

  /** Cleans up the DOM remains of the JSONP request. */
  prototype.cleanup = function() {
    if (this.request) {
      this.request.cleanup();
    }
  };

  function encodeParamsObject(data) {
    return Pusher.Util.mapObject(data, function(value) {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      return encodeURIComponent(Pusher.Base64.encode(value.toString()));
    });
  }

  Pusher.JSONPRequest = JSONPRequest;
}).call(this);

(function() {
  function Timeline(key, session, options) {
    this.key = key;
    this.session = session;
    this.events = [];
    this.options = options || {};
    this.sent = 0;
    this.uniqueID = 0;
  }
  var prototype = Timeline.prototype;

  // Log levels
  Timeline.ERROR = 3;
  Timeline.INFO = 6;
  Timeline.DEBUG = 7;

  prototype.log = function(level, event) {
    if (level <= this.options.level) {
      this.events.push(
        Pusher.Util.extend({}, event, { timestamp: Pusher.Util.now() })
      );
      if (this.options.limit && this.events.length > this.options.limit) {
        this.events.shift();
      }
    }
  };

  prototype.error = function(event) {
    this.log(Timeline.ERROR, event);
  };

  prototype.info = function(event) {
    this.log(Timeline.INFO, event);
  };

  prototype.debug = function(event) {
    this.log(Timeline.DEBUG, event);
  };

  prototype.isEmpty = function() {
    return this.events.length === 0;
  };

  prototype.send = function(sendJSONP, callback) {
    var self = this;

    var data = Pusher.Util.extend({
      session: self.session,
      bundle: self.sent + 1,
      key: self.key,
      lib: "js",
      version: self.options.version,
      cluster: self.options.cluster,
      features: self.options.features,
      timeline: self.events
    }, self.options.params);

    self.events = [];
    sendJSONP(data, function(error, result) {
      if (!error) {
        self.sent++;
      }
      if (callback) {
        callback(error, result);
      }
    });

    return true;
  };

  prototype.generateUniqueID = function() {
    this.uniqueID++;
    return this.uniqueID;
  };

  Pusher.Timeline = Timeline;
}).call(this);

(function() {
  function TimelineSender(timeline, options) {
    this.timeline = timeline;
    this.options = options || {};
  }
  var prototype = TimelineSender.prototype;

  prototype.send = function(encrypted, callback) {
    var self = this;

    if (self.timeline.isEmpty()) {
      return;
    }

    var sendJSONP = function(data, callback) {
      var scheme = "http" + (encrypted ? "s" : "") + "://";
      var url = scheme + (self.host || self.options.host) + self.options.path;
      var request = new Pusher.JSONPRequest(url, data);

      var receiver = Pusher.ScriptReceivers.create(function(error, result) {
        Pusher.ScriptReceivers.remove(receiver);
        request.cleanup();

        if (result && result.host) {
          self.host = result.host;
        }
        if (callback) {
          callback(error, result);
        }
      });
      request.send(receiver);
    };
    self.timeline.send(sendJSONP, callback);
  };

  Pusher.TimelineSender = TimelineSender;
}).call(this);

;(function() {
  /** Launches all substrategies and emits prioritized connected transports.
   *
   * @param {Array} strategies
   */
  function BestConnectedEverStrategy(strategies) {
    this.strategies = strategies;
  }
  var prototype = BestConnectedEverStrategy.prototype;

  prototype.isSupported = function() {
    return Pusher.Util.any(this.strategies, Pusher.Util.method("isSupported"));
  };

  prototype.connect = function(minPriority, callback) {
    return connect(this.strategies, minPriority, function(i, runners) {
      return function(error, handshake) {
        runners[i].error = error;
        if (error) {
          if (allRunnersFailed(runners)) {
            callback(true);
          }
          return;
        }
        Pusher.Util.apply(runners, function(runner) {
          runner.forceMinPriority(handshake.transport.priority);
        });
        callback(null, handshake);
      };
    });
  };

  /** Connects to all strategies in parallel.
   *
   * Callback builder should be a function that takes two arguments: index
   * and a list of runners. It should return another function that will be
   * passed to the substrategy with given index. Runners can be aborted using
   * abortRunner(s) functions from this class.
   *
   * @param  {Array} strategies
   * @param  {Function} callbackBuilder
   * @return {Object} strategy runner
   */
  function connect(strategies, minPriority, callbackBuilder) {
    var runners = Pusher.Util.map(strategies, function(strategy, i, _, rs) {
      return strategy.connect(minPriority, callbackBuilder(i, rs));
    });
    return {
      abort: function() {
        Pusher.Util.apply(runners, abortRunner);
      },
      forceMinPriority: function(p) {
        Pusher.Util.apply(runners, function(runner) {
          runner.forceMinPriority(p);
        });
      }
    };
  }

  function allRunnersFailed(runners) {
    return Pusher.Util.all(runners, function(runner) {
      return Boolean(runner.error);
    });
  }

  function abortRunner(runner) {
    if (!runner.error && !runner.aborted) {
      runner.abort();
      runner.aborted = true;
    }
  }

  Pusher.BestConnectedEverStrategy = BestConnectedEverStrategy;
}).call(this);

;(function() {
  /** Caches last successful transport and uses it for following attempts.
   *
   * @param {Strategy} strategy
   * @param {Object} transports
   * @param {Object} options
   */
  function CachedStrategy(strategy, transports, options) {
    this.strategy = strategy;
    this.transports = transports;
    this.ttl = options.ttl || 1800*1000;
    this.encrypted = options.encrypted;
    this.timeline = options.timeline;
  }
  var prototype = CachedStrategy.prototype;

  prototype.isSupported = function() {
    return this.strategy.isSupported();
  };

  prototype.connect = function(minPriority, callback) {
    var encrypted = this.encrypted;
    var info = fetchTransportCache(encrypted);

    var strategies = [this.strategy];
    if (info && info.timestamp + this.ttl >= Pusher.Util.now()) {
      var transport = this.transports[info.transport];
      if (transport) {
        this.timeline.info({
          cached: true,
          transport: info.transport,
          latency: info.latency
        });
        strategies.push(new Pusher.SequentialStrategy([transport], {
          timeout: info.latency * 2 + 1000,
          failFast: true
        }));
      }
    }

    var startTimestamp = Pusher.Util.now();
    var runner = strategies.pop().connect(
      minPriority,
      function cb(error, handshake) {
        if (error) {
          flushTransportCache(encrypted);
          if (strategies.length > 0) {
            startTimestamp = Pusher.Util.now();
            runner = strategies.pop().connect(minPriority, cb);
          } else {
            callback(error);
          }
        } else {
          storeTransportCache(
            encrypted,
            handshake.transport.name,
            Pusher.Util.now() - startTimestamp
          );
          callback(null, handshake);
        }
      }
    );

    return {
      abort: function() {
        runner.abort();
      },
      forceMinPriority: function(p) {
        minPriority = p;
        if (runner) {
          runner.forceMinPriority(p);
        }
      }
    };
  };

  function getTransportCacheKey(encrypted) {
    return "pusherTransport" + (encrypted ? "Encrypted" : "Unencrypted");
  }

  function fetchTransportCache(encrypted) {
    var storage = Pusher.Util.getLocalStorage();
    if (storage) {
      try {
        var serializedCache = storage[getTransportCacheKey(encrypted)];
        if (serializedCache) {
          return JSON.parse(serializedCache);
        }
      } catch (e) {
        flushTransportCache(encrypted);
      }
    }
    return null;
  }

  function storeTransportCache(encrypted, transport, latency) {
    var storage = Pusher.Util.getLocalStorage();
    if (storage) {
      try {
        storage[getTransportCacheKey(encrypted)] = JSON.stringify({
          timestamp: Pusher.Util.now(),
          transport: transport,
          latency: latency
        });
      } catch (e) {
        // catch over quota exceptions raised by localStorage
      }
    }
  }

  function flushTransportCache(encrypted) {
    var storage = Pusher.Util.getLocalStorage();
    if (storage) {
      try {
        delete storage[getTransportCacheKey(encrypted)];
      } catch (e) {
        // catch exceptions raised by localStorage
      }
    }
  }

  Pusher.CachedStrategy = CachedStrategy;
}).call(this);

;(function() {
  /** Runs substrategy after specified delay.
   *
   * Options:
   * - delay - time in miliseconds to delay the substrategy attempt
   *
   * @param {Strategy} strategy
   * @param {Object} options
   */
  function DelayedStrategy(strategy, options) {
    this.strategy = strategy;
    this.options = { delay: options.delay };
  }
  var prototype = DelayedStrategy.prototype;

  prototype.isSupported = function() {
    return this.strategy.isSupported();
  };

  prototype.connect = function(minPriority, callback) {
    var strategy = this.strategy;
    var runner;
    var timer = new Pusher.Timer(this.options.delay, function() {
      runner = strategy.connect(minPriority, callback);
    });

    return {
      abort: function() {
        timer.ensureAborted();
        if (runner) {
          runner.abort();
        }
      },
      forceMinPriority: function(p) {
        minPriority = p;
        if (runner) {
          runner.forceMinPriority(p);
        }
      }
    };
  };

  Pusher.DelayedStrategy = DelayedStrategy;
}).call(this);

;(function() {
  /** Launches the substrategy and terminates on the first open connection.
   *
   * @param {Strategy} strategy
   */
  function FirstConnectedStrategy(strategy) {
    this.strategy = strategy;
  }
  var prototype = FirstConnectedStrategy.prototype;

  prototype.isSupported = function() {
    return this.strategy.isSupported();
  };

  prototype.connect = function(minPriority, callback) {
    var runner = this.strategy.connect(
      minPriority,
      function(error, handshake) {
        if (handshake) {
          runner.abort();
        }
        callback(error, handshake);
      }
    );
    return runner;
  };

  Pusher.FirstConnectedStrategy = FirstConnectedStrategy;
}).call(this);

;(function() {
  /** Proxies method calls to one of substrategies basing on the test function.
   *
   * @param {Function} test
   * @param {Strategy} trueBranch strategy used when test returns true
   * @param {Strategy} falseBranch strategy used when test returns false
   */
  function IfStrategy(test, trueBranch, falseBranch) {
    this.test = test;
    this.trueBranch = trueBranch;
    this.falseBranch = falseBranch;
  }
  var prototype = IfStrategy.prototype;

  prototype.isSupported = function() {
    var branch = this.test() ? this.trueBranch : this.falseBranch;
    return branch.isSupported();
  };

  prototype.connect = function(minPriority, callback) {
    var branch = this.test() ? this.trueBranch : this.falseBranch;
    return branch.connect(minPriority, callback);
  };

  Pusher.IfStrategy = IfStrategy;
}).call(this);

;(function() {
  /** Loops through strategies with optional timeouts.
   *
   * Options:
   * - loop - whether it should loop through the substrategy list
   * - timeout - initial timeout for a single substrategy
   * - timeoutLimit - maximum timeout
   *
   * @param {Strategy[]} strategies
   * @param {Object} options
   */
  function SequentialStrategy(strategies, options) {
    this.strategies = strategies;
    this.loop = Boolean(options.loop);
    this.failFast = Boolean(options.failFast);
    this.timeout = options.timeout;
    this.timeoutLimit = options.timeoutLimit;
  }
  var prototype = SequentialStrategy.prototype;

  prototype.isSupported = function() {
    return Pusher.Util.any(this.strategies, Pusher.Util.method("isSupported"));
  };

  prototype.connect = function(minPriority, callback) {
    var self = this;

    var strategies = this.strategies;
    var current = 0;
    var timeout = this.timeout;
    var runner = null;

    var tryNextStrategy = function(error, handshake) {
      if (handshake) {
        callback(null, handshake);
      } else {
        current = current + 1;
        if (self.loop) {
          current = current % strategies.length;
        }

        if (current < strategies.length) {
          if (timeout) {
            timeout = timeout * 2;
            if (self.timeoutLimit) {
              timeout = Math.min(timeout, self.timeoutLimit);
            }
          }
          runner = self.tryStrategy(
            strategies[current],
            minPriority,
            { timeout: timeout, failFast: self.failFast },
            tryNextStrategy
          );
        } else {
          callback(true);
        }
      }
    };

    runner = this.tryStrategy(
      strategies[current],
      minPriority,
      { timeout: timeout, failFast: this.failFast },
      tryNextStrategy
    );

    return {
      abort: function() {
        runner.abort();
      },
      forceMinPriority: function(p) {
        minPriority = p;
        if (runner) {
          runner.forceMinPriority(p);
        }
      }
    };
  };

  /** @private */
  prototype.tryStrategy = function(strategy, minPriority, options, callback) {
    var timer = null;
    var runner = null;

    if (options.timeout > 0) {
      timer = new Pusher.Timer(options.timeout, function() {
        runner.abort();
        callback(true);
      });
    }

    runner = strategy.connect(minPriority, function(error, handshake) {
      if (error && timer && timer.isRunning() && !options.failFast) {
        // advance to the next strategy after the timeout
        return;
      }
      if (timer) {
        timer.ensureAborted();
      }
      callback(error, handshake);
    });

    return {
      abort: function() {
        if (timer) {
          timer.ensureAborted();
        }
        runner.abort();
      },
      forceMinPriority: function(p) {
        runner.forceMinPriority(p);
      }
    };
  };

  Pusher.SequentialStrategy = SequentialStrategy;
}).call(this);

;(function() {
  /** Provides a strategy interface for transports.
   *
   * @param {String} name
   * @param {Number} priority
   * @param {Class} transport
   * @param {Object} options
   */
  function TransportStrategy(name, priority, transport, options) {
    this.name = name;
    this.priority = priority;
    this.transport = transport;
    this.options = options || {};
  }
  var prototype = TransportStrategy.prototype;

  /** Returns whether the transport is supported in the browser.
   *
   * @returns {Boolean}
   */
  prototype.isSupported = function() {
    return this.transport.isSupported({
      encrypted: this.options.encrypted
    });
  };

  /** Launches a connection attempt and returns a strategy runner.
   *
   * @param  {Function} callback
   * @return {Object} strategy runner
   */
  prototype.connect = function(minPriority, callback) {
    if (!this.isSupported()) {
      return failAttempt(new Pusher.Errors.UnsupportedStrategy(), callback);
    } else if (this.priority < minPriority) {
      return failAttempt(new Pusher.Errors.TransportPriorityTooLow(), callback);
    }

    var self = this;
    var connected = false;

    var transport = this.transport.createConnection(
      this.name, this.priority, this.options.key, this.options
    );
    var handshake = null;

    var onInitialized = function() {
      transport.unbind("initialized", onInitialized);
      transport.connect();
    };
    var onOpen = function() {
      handshake = new Pusher.Handshake(transport, function(result) {
        connected = true;
        unbindListeners();
        callback(null, result);
      });
    };
    var onError = function(error) {
      unbindListeners();
      callback(error);
    };
    var onClosed = function() {
      unbindListeners();
      callback(new Pusher.Errors.TransportClosed(transport));
    };

    var unbindListeners = function() {
      transport.unbind("initialized", onInitialized);
      transport.unbind("open", onOpen);
      transport.unbind("error", onError);
      transport.unbind("closed", onClosed);
    };

    transport.bind("initialized", onInitialized);
    transport.bind("open", onOpen);
    transport.bind("error", onError);
    transport.bind("closed", onClosed);

    // connect will be called automatically after initialization
    transport.initialize();

    return {
      abort: function() {
        if (connected) {
          return;
        }
        unbindListeners();
        if (handshake) {
          handshake.close();
        } else {
          transport.close();
        }
      },
      forceMinPriority: function(p) {
        if (connected) {
          return;
        }
        if (self.priority < p) {
          if (handshake) {
            handshake.close();
          } else {
            transport.close();
          }
        }
      }
    };
  };

  function failAttempt(error, callback) {
    Pusher.Util.defer(function() {
      callback(error);
    });
    return {
      abort: function() {},
      forceMinPriority: function() {}
    };
  }

  Pusher.TransportStrategy = TransportStrategy;
}).call(this);

(function() {
  function getGenericURL(baseScheme, params, path) {
    var scheme = baseScheme + (params.encrypted ? "s" : "");
    var host = params.encrypted ? params.hostEncrypted : params.hostUnencrypted;
    return scheme + "://" + host + path;
  }

  function getGenericPath(key, queryString) {
    var path = "/app/" + key;
    var query =
      "?protocol=" + Pusher.PROTOCOL +
      "&client=js" +
      "&version=" + Pusher.VERSION +
      (queryString ? ("&" + queryString) : "");
    return path + query;
  }

  /** URL schemes for different transport types. */
  Pusher.URLSchemes = {
    /** Standard WebSocket URL scheme. */
    ws: {
      getInitial: function(key, params) {
        return getGenericURL("ws", params, getGenericPath(key, "flash=false"));
      }
    },
    /** SockJS URL scheme. Supplies the path separately from the initial URL. */
    sockjs: {
      getInitial: function(key, params) {
        return getGenericURL("http", params, params.httpPath || "/pusher", "");
      },
      getPath: function(key, params) {
        return getGenericPath(key);
      }
    },
    /** URL scheme for HTTP transports. Basically, WS scheme with a prefix. */
    http: {
      getInitial: function(key, params) {
        var path = (params.httpPath || "/pusher") + getGenericPath(key);
        return getGenericURL("http", params, path);
      }
    }
  };
}).call(this);

(function() {
  /** Provides universal API for transport connections.
   *
   * Transport connection is a low-level object that wraps a connection method
   * and exposes a simple evented interface for the connection state and
   * messaging. It does not implement Pusher-specific WebSocket protocol.
   *
   * Additionally, it fetches resources needed for transport to work and exposes
   * an interface for querying transport features.
   *
   * States:
   * - new - initial state after constructing the object
   * - initializing - during initialization phase, usually fetching resources
   * - intialized - ready to establish a connection
   * - connection - when connection is being established
   * - open - when connection ready to be used
   * - closed - after connection was closed be either side
   *
   * Emits:
   * - error - after the connection raised an error
   *
   * Options:
   * - encrypted - whether connection should use ssl
   * - hostEncrypted - host to connect to when connection is encrypted
   * - hostUnencrypted - host to connect to when connection is not encrypted
   *
   * @param {String} key application key
   * @param {Object} options
   */
  function TransportConnection(hooks, name, priority, key, options) {
    Pusher.EventsDispatcher.call(this);

    this.hooks = hooks;
    this.name = name;
    this.priority = priority;
    this.key = key;
    this.options = options;

    this.state = "new";
    this.timeline = options.timeline;
    this.activityTimeout = options.activityTimeout;
    this.id = this.timeline.generateUniqueID();
  }
  var prototype = TransportConnection.prototype;
  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

  /** Checks whether the transport handles activity checks by itself.
   *
   * @return {Boolean}
   */
  prototype.handlesActivityChecks = function() {
    return Boolean(this.hooks.handlesActivityChecks);
  };

  /** Checks whether the transport supports the ping/pong API.
   *
   * @return {Boolean}
   */
  prototype.supportsPing = function() {
    return Boolean(this.hooks.supportsPing);
  };

  /** Initializes the transport.
   *
   * Fetches resources if needed and then transitions to initialized.
   */
  prototype.initialize = function() {
    var self = this;

    self.timeline.info(self.buildTimelineMessage({
      transport: self.name + (self.options.encrypted ? "s" : "")
    }));

    if (self.hooks.isInitialized()) {
      self.changeState("initialized");
    } else if (self.hooks.file) {
      self.changeState("initializing");
      Pusher.Dependencies.load(
        self.hooks.file,
        { encrypted: self.options.encrypted },
        function(error, callback) {
          if (self.hooks.isInitialized()) {
            self.changeState("initialized");
            callback(true);
          } else {
            if (error) {
              self.onError(error);
            }
            self.onClose();
            callback(false);
          }
        }
      );
    } else {
      self.onClose();
    }
  };

  /** Tries to establish a connection.
   *
   * @returns {Boolean} false if transport is in invalid state
   */
  prototype.connect = function() {
    var self = this;

    if (self.socket || self.state !== "initialized") {
      return false;
    }

    var url = self.hooks.urls.getInitial(self.key, self.options);
    try {
      self.socket = self.hooks.getSocket(url, self.options);
    } catch (e) {
      Pusher.Util.defer(function() {
        self.onError(e);
        self.changeState("closed");
      });
      return false;
    }

    self.bindListeners();

    Pusher.debug("Connecting", { transport: self.name, url: url });
    self.changeState("connecting");
    return true;
  };

  /** Closes the connection.
   *
   * @return {Boolean} true if there was a connection to close
   */
  prototype.close = function() {
    if (this.socket) {
      this.socket.close();
      return true;
    } else {
      return false;
    }
  };

  /** Sends data over the open connection.
   *
   * @param {String} data
   * @return {Boolean} true only when in the "open" state
   */
  prototype.send = function(data) {
    var self = this;

    if (self.state === "open") {
      // Workaround for MobileSafari bug (see https://gist.github.com/2052006)
      Pusher.Util.defer(function() {
        if (self.socket) {
          self.socket.send(data);
        }
      });
      return true;
    } else {
      return false;
    }
  };

  /** Sends a ping if the connection is open and transport supports it. */
  prototype.ping = function() {
    if (this.state === "open" && this.supportsPing()) {
      this.socket.ping();
    }
  };

  /** @private */
  prototype.onOpen = function() {
    if (this.hooks.beforeOpen) {
      this.hooks.beforeOpen(
        this.socket, this.hooks.urls.getPath(this.key, this.options)
      );
    }
    this.changeState("open");
    this.socket.onopen = undefined;
  };

  /** @private */
  prototype.onError = function(error) {
    this.emit("error", { type: 'WebSocketError', error: error });
    this.timeline.error(this.buildTimelineMessage({ error: error.toString() }));
  };

  /** @private */
  prototype.onClose = function(closeEvent) {
    if (closeEvent) {
      this.changeState("closed", {
        code: closeEvent.code,
        reason: closeEvent.reason,
        wasClean: closeEvent.wasClean
      });
    } else {
      this.changeState("closed");
    }
    this.unbindListeners();
    this.socket = undefined;
  };

  /** @private */
  prototype.onMessage = function(message) {
    this.emit("message", message);
  };

  /** @private */
  prototype.onActivity = function() {
    this.emit("activity");
  };

  /** @private */
  prototype.bindListeners = function() {
    var self = this;

    self.socket.onopen = function() {
      self.onOpen();
    };
    self.socket.onerror = function(error) {
      self.onError(error);
    };
    self.socket.onclose = function(closeEvent) {
      self.onClose(closeEvent);
    };
    self.socket.onmessage = function(message) {
      self.onMessage(message);
    };

    if (self.supportsPing()) {
      self.socket.onactivity = function() { self.onActivity(); };
    }
  };

  /** @private */
  prototype.unbindListeners = function() {
    if (this.socket) {
      this.socket.onopen = undefined;
      this.socket.onerror = undefined;
      this.socket.onclose = undefined;
      this.socket.onmessage = undefined;
      if (this.supportsPing()) {
        this.socket.onactivity = undefined;
      }
    }
  };

  /** @private */
  prototype.changeState = function(state, params) {
    this.state = state;
    this.timeline.info(this.buildTimelineMessage({
      state: state,
      params: params
    }));
    this.emit(state, params);
  };

  /** @private */
  prototype.buildTimelineMessage = function(message) {
    return Pusher.Util.extend({ cid: this.id }, message);
  };

  Pusher.TransportConnection = TransportConnection;
}).call(this);

(function() {
  /** Provides interface for transport connection instantiation.
   *
   * Takes transport-specific hooks as the only argument, which allow checking
   * for transport support and creating its connections.
   *
   * Supported hooks:
   * - file - the name of the file to be fetched during initialization
   * - urls - URL scheme to be used by transport
   * - handlesActivityCheck - true when the transport handles activity checks
   * - supportsPing - true when the transport has a ping/activity API
   * - isSupported - tells whether the transport is supported in the environment
   * - getSocket - creates a WebSocket-compatible transport socket
   *
   * See transports.js for specific implementations.
   *
   * @param {Object} hooks object containing all needed transport hooks
   */
  function Transport(hooks) {
    this.hooks = hooks;
  }
  var prototype = Transport.prototype;

  /** Returns whether the transport is supported in the environment.
   *
   * @param {Object} environment the environment details (encryption, settings)
   * @returns {Boolean} true when the transport is supported
   */
  prototype.isSupported = function(environment) {
    return this.hooks.isSupported(environment);
  };

  /** Creates a transport connection.
   *
   * @param {String} name
   * @param {Number} priority
   * @param {String} key the application key
   * @param {Object} options
   * @returns {TransportConnection}
   */
  prototype.createConnection = function(name, priority, key, options) {
    return new Pusher.TransportConnection(
      this.hooks, name, priority, key, options
    );
  };

  Pusher.Transport = Transport;
}).call(this);

(function() {
  /** WebSocket transport.
   *
   * Uses native WebSocket implementation, including MozWebSocket supported by
   * earlier Firefox versions.
   */
  Pusher.WSTransport = new Pusher.Transport({
    urls: Pusher.URLSchemes.ws,
    handlesActivityChecks: false,
    supportsPing: false,

    isInitialized: function() {
      return Boolean(window.WebSocket || window.MozWebSocket);
    },
    isSupported: function() {
      return Boolean(window.WebSocket || window.MozWebSocket);
    },
    getSocket: function(url) {
      var Constructor = window.WebSocket || window.MozWebSocket;
      return new Constructor(url);
    }
  });

  /** SockJS transport. */
  Pusher.SockJSTransport = new Pusher.Transport({
    file: "sockjs",
    urls: Pusher.URLSchemes.sockjs,
    handlesActivityChecks: true,
    supportsPing: false,

    isSupported: function() {
      return true;
    },
    isInitialized: function() {
      return window.SockJS !== undefined;
    },
    getSocket: function(url, options) {
      return new SockJS(url, null, {
        js_path: Pusher.Dependencies.getPath("sockjs", {
          encrypted: options.encrypted
        }),
        ignore_null_origin: options.ignoreNullOrigin
      });
    },
    beforeOpen: function(socket, path) {
      socket.send(JSON.stringify({
        path: path
      }));
    }
  });

  var httpConfiguration = {
    urls: Pusher.URLSchemes.http,
    handlesActivityChecks: false,
    supportsPing: true,
    isInitialized: function() {
      return Boolean(Pusher.HTTP.Socket);
    }
  };

  var streamingConfiguration = Pusher.Util.extend(
    { getSocket: function(url) {
        return Pusher.HTTP.getStreamingSocket(url);
      }
    },
    httpConfiguration
  );
  var pollingConfiguration = Pusher.Util.extend(
    { getSocket: function(url) {
        return Pusher.HTTP.getPollingSocket(url);
      }
    },
    httpConfiguration
  );

  var xhrConfiguration = {
    file: "xhr",
    isSupported: Pusher.Util.isXHRSupported
  };
  var xdrConfiguration = {
    file: "xdr",
    isSupported: function(environment) {
      return Pusher.Util.isXDRSupported(environment.encrypted);
    }
  };

  /** HTTP streaming transport using CORS-enabled XMLHttpRequest. */
  Pusher.XHRStreamingTransport = new Pusher.Transport(
    Pusher.Util.extend({}, streamingConfiguration, xhrConfiguration)
  );
  /** HTTP streaming transport using XDomainRequest (IE 8,9). */
  Pusher.XDRStreamingTransport = new Pusher.Transport(
    Pusher.Util.extend({}, streamingConfiguration, xdrConfiguration)
  );
  /** HTTP long-polling transport using CORS-enabled XMLHttpRequest. */
  Pusher.XHRPollingTransport = new Pusher.Transport(
    Pusher.Util.extend({}, pollingConfiguration, xhrConfiguration)
  );
  /** HTTP long-polling transport using XDomainRequest (IE 8,9). */
  Pusher.XDRPollingTransport = new Pusher.Transport(
    Pusher.Util.extend({}, pollingConfiguration, xdrConfiguration)
  );
}).call(this);

;(function() {
  /** Creates transport connections monitored by a transport manager.
   *
   * When a transport is closed, it might mean the environment does not support
   * it. It's possible that messages get stuck in an intermediate buffer or
   * proxies terminate inactive connections. To combat these problems,
   * assistants monitor the connection lifetime, report unclean exits and
   * adjust ping timeouts to keep the connection active. The decision to disable
   * a transport is the manager's responsibility.
   *
   * @param {TransportManager} manager
   * @param {TransportConnection} transport
   * @param {Object} options
   */
  function AssistantToTheTransportManager(manager, transport, options) {
    this.manager = manager;
    this.transport = transport;
    this.minPingDelay = options.minPingDelay;
    this.maxPingDelay = options.maxPingDelay;
    this.pingDelay = undefined;
  }
  var prototype = AssistantToTheTransportManager.prototype;

  /** Creates a transport connection.
   *
   * This function has the same API as Transport#createConnection.
   *
   * @param {String} name
   * @param {Number} priority
   * @param {String} key the application key
   * @param {Object} options
   * @returns {TransportConnection}
   */
  prototype.createConnection = function(name, priority, key, options) {
    var self = this;

    options = Pusher.Util.extend({}, options, {
      activityTimeout: self.pingDelay
    });
    var connection = self.transport.createConnection(
      name, priority, key, options
    );

    var openTimestamp = null;

    var onOpen = function() {
      connection.unbind("open", onOpen);
      connection.bind("closed", onClosed);
      openTimestamp = Pusher.Util.now();
    };
    var onClosed = function(closeEvent) {
      connection.unbind("closed", onClosed);

      if (closeEvent.code === 1002 || closeEvent.code === 1003) {
        // we don't want to use transports not obeying the protocol
        self.manager.reportDeath();
      } else if (!closeEvent.wasClean && openTimestamp) {
        // report deaths only for short-living transport
        var lifespan = Pusher.Util.now() - openTimestamp;
        if (lifespan < 2 * self.maxPingDelay) {
          self.manager.reportDeath();
          self.pingDelay = Math.max(lifespan / 2, self.minPingDelay);
        }
      }
    };

    connection.bind("open", onOpen);
    return connection;
  };

  /** Returns whether the transport is supported in the environment.
   *
   * This function has the same API as Transport#isSupported. Might return false
   * when the manager decides to kill the transport.
   *
   * @param {Object} environment the environment details (encryption, settings)
   * @returns {Boolean} true when the transport is supported
   */
  prototype.isSupported = function(environment) {
    return this.manager.isAlive() && this.transport.isSupported(environment);
  };

  Pusher.AssistantToTheTransportManager = AssistantToTheTransportManager;
}).call(this);

;(function() {
  /** Keeps track of the number of lives left for a transport.
   *
   * In the beginning of a session, transports may be assigned a number of
   * lives. When an AssistantToTheTransportManager instance reports a transport
   * connection closed uncleanly, the transport loses a life. When the number
   * of lives drops to zero, the transport gets disabled by its manager.
   *
   * @param {Object} options
   */
  function TransportManager(options) {
    this.options = options || {};
    this.livesLeft = this.options.lives || Infinity;
  }
  var prototype = TransportManager.prototype;

  /** Creates a assistant for the transport.
   *
   * @param {Transport} transport
   * @returns {AssistantToTheTransportManager}
   */
  prototype.getAssistant = function(transport) {
    return new Pusher.AssistantToTheTransportManager(this, transport, {
      minPingDelay: this.options.minPingDelay,
      maxPingDelay: this.options.maxPingDelay
    });
  };

  /** Returns whether the transport has any lives left.
   *
   * @returns {Boolean}
   */
  prototype.isAlive = function() {
    return this.livesLeft > 0;
  };

  /** Takes one life from the transport. */
  prototype.reportDeath = function() {
    this.livesLeft -= 1;
  };

  Pusher.TransportManager = TransportManager;
}).call(this);

;(function() {
  var StrategyBuilder = {
    /** Transforms a JSON scheme to a strategy tree.
     *
     * @param {Array} scheme JSON strategy scheme
     * @param {Object} options a hash of symbols to be included in the scheme
     * @returns {Strategy} strategy tree that's represented by the scheme
     */
    build: function(scheme, options) {
      var context = Pusher.Util.extend({}, globalContext, options);
      return evaluate(scheme, context)[1].strategy;
    }
  };

  var transports = {
    ws: Pusher.WSTransport,
    sockjs: Pusher.SockJSTransport,
    xhr_streaming: Pusher.XHRStreamingTransport,
    xdr_streaming: Pusher.XDRStreamingTransport,
    xhr_polling: Pusher.XHRPollingTransport,
    xdr_polling: Pusher.XDRPollingTransport
  };

  var UnsupportedStrategy = {
    isSupported: function() {
      return false;
    },
    connect: function(_, callback) {
      var deferred = Pusher.Util.defer(function() {
        callback(new Pusher.Errors.UnsupportedStrategy());
      });
      return {
        abort: function() {
          deferred.ensureAborted();
        },
        forceMinPriority: function() {}
      };
    }
  };

  // DSL bindings

  function returnWithOriginalContext(f) {
    return function(context) {
      return [f.apply(this, arguments), context];
    };
  }

  var globalContext = {
    extend: function(context, first, second) {
      return [Pusher.Util.extend({}, first, second), context];
    },

    def: function(context, name, value) {
      if (context[name] !== undefined) {
        throw "Redefining symbol " + name;
      }
      context[name] = value;
      return [undefined, context];
    },

    def_transport: function(context, name, type, priority, options, manager) {
      var transportClass = transports[type];
      if (!transportClass) {
        throw new Pusher.Errors.UnsupportedTransport(type);
      }

      var enabled =
        (!context.enabledTransports ||
          Pusher.Util.arrayIndexOf(context.enabledTransports, name) !== -1) &&
        (!context.disabledTransports ||
          Pusher.Util.arrayIndexOf(context.disabledTransports, name) === -1);

      var transport;
      if (enabled) {
        transport = new Pusher.TransportStrategy(
          name,
          priority,
          manager ? manager.getAssistant(transportClass) : transportClass,
          Pusher.Util.extend({
            key: context.key,
            encrypted: context.encrypted,
            timeline: context.timeline,
            ignoreNullOrigin: context.ignoreNullOrigin
          }, options)
        );
      } else {
        transport = UnsupportedStrategy;
      }

      var newContext = context.def(context, name, transport)[1];
      newContext.transports = context.transports || {};
      newContext.transports[name] = transport;
      return [undefined, newContext];
    },

    transport_manager: returnWithOriginalContext(function(_, options) {
      return new Pusher.TransportManager(options);
    }),

    sequential: returnWithOriginalContext(function(_, options) {
      var strategies = Array.prototype.slice.call(arguments, 2);
      return new Pusher.SequentialStrategy(strategies, options);
    }),

    cached: returnWithOriginalContext(function(context, ttl, strategy){
      return new Pusher.CachedStrategy(strategy, context.transports, {
        ttl: ttl,
        timeline: context.timeline,
        encrypted: context.encrypted
      });
    }),

    first_connected: returnWithOriginalContext(function(_, strategy) {
      return new Pusher.FirstConnectedStrategy(strategy);
    }),

    best_connected_ever: returnWithOriginalContext(function() {
      var strategies = Array.prototype.slice.call(arguments, 1);
      return new Pusher.BestConnectedEverStrategy(strategies);
    }),

    delayed: returnWithOriginalContext(function(_, delay, strategy) {
      return new Pusher.DelayedStrategy(strategy, { delay: delay });
    }),

    "if": returnWithOriginalContext(function(_, test, trueBranch, falseBranch) {
      return new Pusher.IfStrategy(test, trueBranch, falseBranch);
    }),

    is_supported: returnWithOriginalContext(function(_, strategy) {
      return function() {
        return strategy.isSupported();
      };
    })
  };

  // DSL interpreter

  function isSymbol(expression) {
    return (typeof expression === "string") && expression.charAt(0) === ":";
  }

  function getSymbolValue(expression, context) {
    return context[expression.slice(1)];
  }

  function evaluateListOfExpressions(expressions, context) {
    if (expressions.length === 0) {
      return [[], context];
    }
    var head = evaluate(expressions[0], context);
    var tail = evaluateListOfExpressions(expressions.slice(1), head[1]);
    return [[head[0]].concat(tail[0]), tail[1]];
  }

  function evaluateString(expression, context) {
    if (!isSymbol(expression)) {
      return [expression, context];
    }
    var value = getSymbolValue(expression, context);
    if (value === undefined) {
      throw "Undefined symbol " + expression;
    }
    return [value, context];
  }

  function evaluateArray(expression, context) {
    if (isSymbol(expression[0])) {
      var f = getSymbolValue(expression[0], context);
      if (expression.length > 1) {
        if (typeof f !== "function") {
          throw "Calling non-function " + expression[0];
        }
        var args = [Pusher.Util.extend({}, context)].concat(
          Pusher.Util.map(expression.slice(1), function(arg) {
            return evaluate(arg, Pusher.Util.extend({}, context))[0];
          })
        );
        return f.apply(this, args);
      } else {
        return [f, context];
      }
    } else {
      return evaluateListOfExpressions(expression, context);
    }
  }

  function evaluate(expression, context) {
    var expressionType = typeof expression;
    if (typeof expression === "string") {
      return evaluateString(expression, context);
    } else if (typeof expression === "object") {
      if (expression instanceof Array && expression.length > 0) {
        return evaluateArray(expression, context);
      }
    }
    return [expression, context];
  }

  Pusher.StrategyBuilder = StrategyBuilder;
}).call(this);

;(function() {
  /**
   * Provides functions for handling Pusher protocol-specific messages.
   */
  var Protocol = {};

  /**
   * Decodes a message in a Pusher format.
   *
   * Throws errors when messages are not parse'able.
   *
   * @param  {Object} message
   * @return {Object}
   */
  Protocol.decodeMessage = function(message) {
    try {
      var params = JSON.parse(message.data);
      if (typeof params.data === 'string') {
        try {
          params.data = JSON.parse(params.data);
        } catch (e) {
          if (!(e instanceof SyntaxError)) {
            // TODO looks like unreachable code
            // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/parse
            throw e;
          }
        }
      }
      return params;
    } catch (e) {
      throw { type: 'MessageParseError', error: e, data: message.data};
    }
  };

  /**
   * Encodes a message to be sent.
   *
   * @param  {Object} message
   * @return {String}
   */
  Protocol.encodeMessage = function(message) {
    return JSON.stringify(message);
  };

  /** Processes a handshake message and returns appropriate actions.
   *
   * Returns an object with an 'action' and other action-specific properties.
   *
   * There are three outcomes when calling this function. First is a successful
   * connection attempt, when pusher:connection_established is received, which
   * results in a 'connected' action with an 'id' property. When passed a
   * pusher:error event, it returns a result with action appropriate to the
   * close code and an error. Otherwise, it raises an exception.
   *
   * @param {String} message
   * @result Object
   */
  Protocol.processHandshake = function(message) {
    message = this.decodeMessage(message);

    if (message.event === "pusher:connection_established") {
      if (!message.data.activity_timeout) {
        throw "No activity timeout specified in handshake";
      }
      return {
        action: "connected",
        id: message.data.socket_id,
        activityTimeout: message.data.activity_timeout * 1000
      };
    } else if (message.event === "pusher:error") {
      // From protocol 6 close codes are sent only once, so this only
      // happens when connection does not support close codes
      return {
        action: this.getCloseAction(message.data),
        error: this.getCloseError(message.data)
      };
    } else {
      throw "Invalid handshake";
    }
  };

  /**
   * Dispatches the close event and returns an appropriate action name.
   *
   * See:
   * 1. https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference/CloseEvent
   * 2. http://pusher.com/docs/pusher_protocol
   *
   * @param  {CloseEvent} closeEvent
   * @return {String} close action name
   */
  Protocol.getCloseAction = function(closeEvent) {
    if (closeEvent.code < 4000) {
      // ignore 1000 CLOSE_NORMAL, 1001 CLOSE_GOING_AWAY,
      //        1005 CLOSE_NO_STATUS, 1006 CLOSE_ABNORMAL
      // ignore 1007...3999
      // handle 1002 CLOSE_PROTOCOL_ERROR, 1003 CLOSE_UNSUPPORTED,
      //        1004 CLOSE_TOO_LARGE
      if (closeEvent.code >= 1002 && closeEvent.code <= 1004) {
        return "backoff";
      } else {
        return null;
      }
    } else if (closeEvent.code === 4000) {
      return "ssl_only";
    } else if (closeEvent.code < 4100) {
      return "refused";
    } else if (closeEvent.code < 4200) {
      return "backoff";
    } else if (closeEvent.code < 4300) {
      return "retry";
    } else {
      // unknown error
      return "refused";
    }
  };

  /**
   * Returns an error or null basing on the close event.
   *
   * Null is returned when connection was closed cleanly. Otherwise, an object
   * with error details is returned.
   *
   * @param  {CloseEvent} closeEvent
   * @return {Object} error object
   */
  Protocol.getCloseError = function(closeEvent) {
    if (closeEvent.code !== 1000 && closeEvent.code !== 1001) {
      return {
        type: 'PusherError',
        data: {
          code: closeEvent.code,
          message: closeEvent.reason || closeEvent.message
        }
      };
    } else {
      return null;
    }
  };

  Pusher.Protocol = Protocol;
}).call(this);

;(function() {
  /**
   * Provides Pusher protocol interface for transports.
   *
   * Emits following events:
   * - message - on received messages
   * - ping - on ping requests
   * - pong - on pong responses
   * - error - when the transport emits an error
   * - closed - after closing the transport
   *
   * It also emits more events when connection closes with a code.
   * See Protocol.getCloseAction to get more details.
   *
   * @param {Number} id
   * @param {AbstractTransport} transport
   */
  function Connection(id, transport) {
    Pusher.EventsDispatcher.call(this);

    this.id = id;
    this.transport = transport;
    this.activityTimeout = transport.activityTimeout;
    this.bindListeners();
  }
  var prototype = Connection.prototype;
  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

  /** Returns whether used transport handles activity checks by itself
   *
   * @returns {Boolean} true if activity checks are handled by the transport
   */
  prototype.handlesActivityChecks = function() {
    return this.transport.handlesActivityChecks();
  };

  /** Sends raw data.
   *
   * @param {String} data
   */
  prototype.send = function(data) {
    return this.transport.send(data);
  };

  /** Sends an event.
   *
   * @param {String} name
   * @param {String} data
   * @param {String} [channel]
   * @returns {Boolean} whether message was sent or not
   */
  prototype.send_event = function(name, data, channel) {
    var message = { event: name, data: data };
    if (channel) {
      message.channel = channel;
    }
    Pusher.debug('Event sent', message);
    return this.send(Pusher.Protocol.encodeMessage(message));
  };

  /** Sends a ping message to the server.
   *
   * Basing on the underlying transport, it might send either transport's
   * protocol-specific ping or pusher:ping event.
   */
  prototype.ping = function() {
    if (this.transport.supportsPing()) {
      this.transport.ping();
    } else {
      this.send_event('pusher:ping', {});
    }
  };

  /** Closes the connection. */
  prototype.close = function() {
    this.transport.close();
  };

  /** @private */
  prototype.bindListeners = function() {
    var self = this;

    var listeners = {
      message: function(m) {
        var message;
        try {
          message = Pusher.Protocol.decodeMessage(m);
        } catch(e) {
          self.emit('error', {
            type: 'MessageParseError',
            error: e,
            data: m.data
          });
        }

        if (message !== undefined) {
          Pusher.debug('Event recd', message);

          switch (message.event) {
            case 'pusher:error':
              self.emit('error', { type: 'PusherError', data: message.data });
              break;
            case 'pusher:ping':
              self.emit("ping");
              break;
            case 'pusher:pong':
              self.emit("pong");
              break;
          }
          self.emit('message', message);
        }
      },
      activity: function() {
        self.emit("activity");
      },
      error: function(error) {
        self.emit("error", { type: "WebSocketError", error: error });
      },
      closed: function(closeEvent) {
        unbindListeners();

        if (closeEvent && closeEvent.code) {
          self.handleCloseEvent(closeEvent);
        }

        self.transport = null;
        self.emit("closed");
      }
    };

    var unbindListeners = function() {
      Pusher.Util.objectApply(listeners, function(listener, event) {
        self.transport.unbind(event, listener);
      });
    };

    Pusher.Util.objectApply(listeners, function(listener, event) {
      self.transport.bind(event, listener);
    });
  };

  /** @private */
  prototype.handleCloseEvent = function(closeEvent) {
    var action = Pusher.Protocol.getCloseAction(closeEvent);
    var error = Pusher.Protocol.getCloseError(closeEvent);
    if (error) {
      this.emit('error', error);
    }
    if (action) {
      this.emit(action);
    }
  };

  Pusher.Connection = Connection;
}).call(this);

;(function() {
  /**
   * Handles Pusher protocol handshakes for transports.
   *
   * Calls back with a result object after handshake is completed. Results
   * always have two fields:
   * - action - string describing action to be taken after the handshake
   * - transport - the transport object passed to the constructor
   *
   * Different actions can set different additional properties on the result.
   * In the case of 'connected' action, there will be a 'connection' property
   * containing a Connection object for the transport. Other actions should
   * carry an 'error' property.
   *
   * @param {AbstractTransport} transport
   * @param {Function} callback
   */
  function Handshake(transport, callback) {
    this.transport = transport;
    this.callback = callback;
    this.bindListeners();
  }
  var prototype = Handshake.prototype;

  prototype.close = function() {
    this.unbindListeners();
    this.transport.close();
  };

  /** @private */
  prototype.bindListeners = function() {
    var self = this;

    self.onMessage = function(m) {
      self.unbindListeners();

      try {
        var result = Pusher.Protocol.processHandshake(m);
        if (result.action === "connected") {
          self.finish("connected", {
            connection: new Pusher.Connection(result.id, self.transport),
            activityTimeout: result.activityTimeout
          });
        } else {
          self.finish(result.action, { error: result.error });
          self.transport.close();
        }
      } catch (e) {
        self.finish("error", { error: e });
        self.transport.close();
      }
    };

    self.onClosed = function(closeEvent) {
      self.unbindListeners();

      var action = Pusher.Protocol.getCloseAction(closeEvent) || "backoff";
      var error = Pusher.Protocol.getCloseError(closeEvent);
      self.finish(action, { error: error });
    };

    self.transport.bind("message", self.onMessage);
    self.transport.bind("closed", self.onClosed);
  };

  /** @private */
  prototype.unbindListeners = function() {
    this.transport.unbind("message", this.onMessage);
    this.transport.unbind("closed", this.onClosed);
  };

  /** @private */
  prototype.finish = function(action, params) {
    this.callback(
      Pusher.Util.extend({ transport: this.transport, action: action }, params)
    );
  };

  Pusher.Handshake = Handshake;
}).call(this);

;(function() {
  /** Manages connection to Pusher.
   *
   * Uses a strategy (currently only default), timers and network availability
   * info to establish a connection and export its state. In case of failures,
   * manages reconnection attempts.
   *
   * Exports state changes as following events:
   * - "state_change", { previous: p, current: state }
   * - state
   *
   * States:
   * - initialized - initial state, never transitioned to
   * - connecting - connection is being established
   * - connected - connection has been fully established
   * - disconnected - on requested disconnection
   * - unavailable - after connection timeout or when there's no network
   * - failed - when the connection strategy is not supported
   *
   * Options:
   * - unavailableTimeout - time to transition to unavailable state
   * - activityTimeout - time after which ping message should be sent
   * - pongTimeout - time for Pusher to respond with pong before reconnecting
   *
   * @param {String} key application key
   * @param {Object} options
   */
  function ConnectionManager(key, options) {
    Pusher.EventsDispatcher.call(this);

    this.key = key;
    this.options = options || {};
    this.state = "initialized";
    this.connection = null;
    this.encrypted = !!options.encrypted;
    this.timeline = this.options.timeline;

    this.connectionCallbacks = this.buildConnectionCallbacks();
    this.errorCallbacks = this.buildErrorCallbacks();
    this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);

    var self = this;

    Pusher.Network.bind("online", function() {
      self.timeline.info({ netinfo: "online" });
      if (self.state === "connecting" || self.state === "unavailable") {
        self.retryIn(0);
      }
    });
    Pusher.Network.bind("offline", function() {
      self.timeline.info({ netinfo: "offline" });
      if (self.connection) {
        self.sendActivityCheck();
      }
    });

    this.updateStrategy();
  }
  var prototype = ConnectionManager.prototype;

  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

  /** Establishes a connection to Pusher.
   *
   * Does nothing when connection is already established. See top-level doc
   * to find events emitted on connection attempts.
   */
  prototype.connect = function() {
    if (this.connection || this.runner) {
      return;
    }
    if (!this.strategy.isSupported()) {
      this.updateState("failed");
      return;
    }
    this.updateState("connecting");
    this.startConnecting();
    this.setUnavailableTimer();
  };

  /** Sends raw data.
   *
   * @param {String} data
   */
  prototype.send = function(data) {
    if (this.connection) {
      return this.connection.send(data);
    } else {
      return false;
    }
  };

  /** Sends an event.
   *
   * @param {String} name
   * @param {String} data
   * @param {String} [channel]
   * @returns {Boolean} whether message was sent or not
   */
  prototype.send_event = function(name, data, channel) {
    if (this.connection) {
      return this.connection.send_event(name, data, channel);
    } else {
      return false;
    }
  };

  /** Closes the connection. */
  prototype.disconnect = function() {
    this.disconnectInternally();
    this.updateState("disconnected");
  };

  prototype.isEncrypted = function() {
    return this.encrypted;
  };

  /** @private */
  prototype.startConnecting = function() {
    var self = this;
    var callback = function(error, handshake) {
      if (error) {
        self.runner = self.strategy.connect(0, callback);
      } else {
        if (handshake.action === "error") {
          self.emit("error", { type: "HandshakeError", error: handshake.error });
          self.timeline.error({ handshakeError: handshake.error });
        } else {
          self.abortConnecting(); // we don't support switching connections yet
          self.handshakeCallbacks[handshake.action](handshake);
        }
      }
    };
    self.runner = self.strategy.connect(0, callback);
  };

  /** @private */
  prototype.abortConnecting = function() {
    if (this.runner) {
      this.runner.abort();
      this.runner = null;
    }
  };

  /** @private */
  prototype.disconnectInternally = function() {
    this.abortConnecting();
    this.clearRetryTimer();
    this.clearUnavailableTimer();
    if (this.connection) {
      var connection = this.abandonConnection();
      connection.close();
    }
  };

  /** @private */
  prototype.updateStrategy = function() {
    this.strategy = this.options.getStrategy({
      key: this.key,
      timeline: this.timeline,
      encrypted: this.encrypted
    });
  };

  /** @private */
  prototype.retryIn = function(delay) {
    var self = this;
    self.timeline.info({ action: "retry", delay: delay });
    if (delay > 0) {
      self.emit("connecting_in", Math.round(delay / 1000));
    }
    self.retryTimer = new Pusher.Timer(delay || 0, function() {
      self.disconnectInternally();
      self.connect();
    });
  };

  /** @private */
  prototype.clearRetryTimer = function() {
    if (this.retryTimer) {
      this.retryTimer.ensureAborted();
      this.retryTimer = null;
    }
  };

  /** @private */
  prototype.setUnavailableTimer = function() {
    var self = this;
    self.unavailableTimer = new Pusher.Timer(
      self.options.unavailableTimeout,
      function() {
        self.updateState("unavailable");
      }
    );
  };

  /** @private */
  prototype.clearUnavailableTimer = function() {
    if (this.unavailableTimer) {
      this.unavailableTimer.ensureAborted();
    }
  };

  /** @private */
  prototype.sendActivityCheck = function() {
    var self = this;
    self.stopActivityCheck();
    self.connection.ping();
    // wait for pong response
    self.activityTimer = new Pusher.Timer(
      self.options.pongTimeout,
      function() {
        self.timeline.error({ pong_timed_out: self.options.pongTimeout });
        self.retryIn(0);
      }
    );
  };

  /** @private */
  prototype.resetActivityCheck = function() {
    var self = this;
    self.stopActivityCheck();
    // send ping after inactivity
    if (!self.connection.handlesActivityChecks()) {
      self.activityTimer = new Pusher.Timer(self.activityTimeout, function() {
        self.sendActivityCheck();
      });
    }
  };

  /** @private */
  prototype.stopActivityCheck = function() {
    if (this.activityTimer) {
      this.activityTimer.ensureAborted();
    }
  };

  /** @private */
  prototype.buildConnectionCallbacks = function() {
    var self = this;
    return {
      message: function(message) {
        // includes pong messages from server
        self.resetActivityCheck();
        self.emit('message', message);
      },
      ping: function() {
        self.send_event('pusher:pong', {});
      },
      activity: function() {
        self.resetActivityCheck();
      },
      error: function(error) {
        // just emit error to user - socket will already be closed by browser
        self.emit("error", { type: "WebSocketError", error: error });
      },
      closed: function() {
        self.abandonConnection();
        if (self.shouldRetry()) {
          self.retryIn(1000);
        }
      }
    };
  };

  /** @private */
  prototype.buildHandshakeCallbacks = function(errorCallbacks) {
    var self = this;
    return Pusher.Util.extend({}, errorCallbacks, {
      connected: function(handshake) {
        self.activityTimeout = Math.min(
          self.options.activityTimeout,
          handshake.activityTimeout,
          handshake.connection.activityTimeout || Infinity
        );
        self.clearUnavailableTimer();
        self.setConnection(handshake.connection);
        self.socket_id = self.connection.id;
        self.updateState("connected", { socket_id: self.socket_id });
      }
    });
  };

  /** @private */
  prototype.buildErrorCallbacks = function() {
    var self = this;

    function withErrorEmitted(callback) {
      return function(result) {
        if (result.error) {
          self.emit("error", { type: "WebSocketError", error: result.error });
        }
        callback(result);
      };
    }

    return {
      ssl_only: withErrorEmitted(function() {
        self.encrypted = true;
        self.updateStrategy();
        self.retryIn(0);
      }),
      refused: withErrorEmitted(function() {
        self.disconnect();
      }),
      backoff: withErrorEmitted(function() {
        self.retryIn(1000);
      }),
      retry: withErrorEmitted(function() {
        self.retryIn(0);
      })
    };
  };

  /** @private */
  prototype.setConnection = function(connection) {
    this.connection = connection;
    for (var event in this.connectionCallbacks) {
      this.connection.bind(event, this.connectionCallbacks[event]);
    }
    this.resetActivityCheck();
  };

  /** @private */
  prototype.abandonConnection = function() {
    if (!this.connection) {
      return;
    }
    this.stopActivityCheck();
    for (var event in this.connectionCallbacks) {
      this.connection.unbind(event, this.connectionCallbacks[event]);
    }
    var connection = this.connection;
    this.connection = null;
    return connection;
  };

  /** @private */
  prototype.updateState = function(newState, data) {
    var previousState = this.state;
    this.state = newState;
    if (previousState !== newState) {
      Pusher.debug('State changed', previousState + ' -> ' + newState);
      this.timeline.info({ state: newState, params: data });
      this.emit('state_change', { previous: previousState, current: newState });
      this.emit(newState, data);
    }
  };

  /** @private */
  prototype.shouldRetry = function() {
    return this.state === "connecting" || this.state === "connected";
  };

  Pusher.ConnectionManager = ConnectionManager;
}).call(this);

;(function() {
  /** Really basic interface providing network availability info.
   *
   * Emits:
   * - online - when browser goes online
   * - offline - when browser goes offline
   */
  function NetInfo() {
    Pusher.EventsDispatcher.call(this);

    var self = this;
    // This is okay, as IE doesn't support this stuff anyway.
    if (window.addEventListener !== undefined) {
      window.addEventListener("online", function() {
        self.emit('online');
      }, false);
      window.addEventListener("offline", function() {
        self.emit('offline');
      }, false);
    }
  }
  Pusher.Util.extend(NetInfo.prototype, Pusher.EventsDispatcher.prototype);

  var prototype = NetInfo.prototype;

  /** Returns whether browser is online or not
   *
   * Offline means definitely offline (no connection to router).
   * Inverse does NOT mean definitely online (only currently supported in Safari
   * and even there only means the device has a connection to the router).
   *
   * @return {Boolean}
   */
  prototype.isOnline = function() {
    if (window.navigator.onLine === undefined) {
      return true;
    } else {
      return window.navigator.onLine;
    }
  };

  Pusher.NetInfo = NetInfo;
  Pusher.Network = new NetInfo();
}).call(this);

;(function() {
  /** Represents a collection of members of a presence channel. */
  function Members() {
    this.reset();
  }
  var prototype = Members.prototype;

  /** Returns member's info for given id.
   *
   * Resulting object containts two fields - id and info.
   *
   * @param {Number} id
   * @return {Object} member's info or null
   */
  prototype.get = function(id) {
    if (Object.prototype.hasOwnProperty.call(this.members, id)) {
      return {
        id: id,
        info: this.members[id]
      };
    } else {
      return null;
    }
  };

  /** Calls back for each member in unspecified order.
   *
   * @param  {Function} callback
   */
  prototype.each = function(callback) {
    var self = this;
    Pusher.Util.objectApply(self.members, function(member, id) {
      callback(self.get(id));
    });
  };

  /** Updates the id for connected member. For internal use only. */
  prototype.setMyID = function(id) {
    this.myID = id;
  };

  /** Handles subscription data. For internal use only. */
  prototype.onSubscription = function(subscriptionData) {
    this.members = subscriptionData.presence.hash;
    this.count = subscriptionData.presence.count;
    this.me = this.get(this.myID);
  };

  /** Adds a new member to the collection. For internal use only. */
  prototype.addMember = function(memberData) {
    if (this.get(memberData.user_id) === null) {
      this.count++;
    }
    this.members[memberData.user_id] = memberData.user_info;
    return this.get(memberData.user_id);
  };

  /** Adds a member from the collection. For internal use only. */
  prototype.removeMember = function(memberData) {
    var member = this.get(memberData.user_id);
    if (member) {
      delete this.members[memberData.user_id];
      this.count--;
    }
    return member;
  };

  /** Resets the collection to the initial state. For internal use only. */
  prototype.reset = function() {
    this.members = {};
    this.count = 0;
    this.myID = null;
    this.me = null;
  };

  Pusher.Members = Members;
}).call(this);

;(function() {
  /** Provides base public channel interface with an event emitter.
   *
   * Emits:
   * - pusher:subscription_succeeded - after subscribing successfully
   * - other non-internal events
   *
   * @param {String} name
   * @param {Pusher} pusher
   */
  function Channel(name, pusher) {
    Pusher.EventsDispatcher.call(this, function(event, data) {
      Pusher.debug('No callbacks on ' + name + ' for ' + event);
    });

    this.name = name;
    this.pusher = pusher;
    this.subscribed = false;
  }
  var prototype = Channel.prototype;
  Pusher.Util.extend(prototype, Pusher.EventsDispatcher.prototype);

  /** Skips authorization, since public channels don't require it.
   *
   * @param {Function} callback
   */
  prototype.authorize = function(socketId, callback) {
    return callback(false, {});
  };

  /** Triggers an event */
  prototype.trigger = function(event, data) {
    if (event.indexOf("client-") !== 0) {
      throw new Pusher.Errors.BadEventName(
        "Event '" + event + "' does not start with 'client-'"
      );
    }
    return this.pusher.send_event(event, data, this.name);
  };

  /** Signals disconnection to the channel. For internal use only. */
  prototype.disconnect = function() {
    this.subscribed = false;
  };

  /** Handles an event. For internal use only.
   *
   * @param {String} event
   * @param {*} data
   */
  prototype.handleEvent = function(event, data) {
    if (event.indexOf("pusher_internal:") === 0) {
      if (event === "pusher_internal:subscription_succeeded") {
        this.subscribed = true;
        this.emit("pusher:subscription_succeeded", data);
      }
    } else {
      this.emit(event, data);
    }
  };

  /** Sends a subscription request. For internal use only. */
  prototype.subscribe = function() {
    var self = this;

    self.authorize(self.pusher.connection.socket_id, function(error, data) {
      if (error) {
        self.handleEvent('pusher:subscription_error', data);
      } else {
        self.pusher.send_event('pusher:subscribe', {
          auth: data.auth,
          channel_data: data.channel_data,
          channel: self.name
        });
      }
    });
  };

  /** Sends an unsubscription request. For internal use only. */
  prototype.unsubscribe = function() {
    this.pusher.send_event('pusher:unsubscribe', {
      channel: this.name
    });
  };

  Pusher.Channel = Channel;
}).call(this);

;(function() {
  /** Extends public channels to provide private channel interface.
   *
   * @param {String} name
   * @param {Pusher} pusher
   */
  function PrivateChannel(name, pusher) {
    Pusher.Channel.call(this, name, pusher);
  }
  var prototype = PrivateChannel.prototype;
  Pusher.Util.extend(prototype, Pusher.Channel.prototype);

  /** Authorizes the connection to use the channel.
   *
   * @param  {String} socketId
   * @param  {Function} callback
   */
  prototype.authorize = function(socketId, callback) {
    var authorizer = new Pusher.Channel.Authorizer(this, this.pusher.config);
    return authorizer.authorize(socketId, callback);
  };

  Pusher.PrivateChannel = PrivateChannel;
}).call(this);

;(function() {
  /** Adds presence channel functionality to private channels.
   *
   * @param {String} name
   * @param {Pusher} pusher
   */
  function PresenceChannel(name, pusher) {
    Pusher.PrivateChannel.call(this, name, pusher);
    this.members = new Pusher.Members();
  }
  var prototype = PresenceChannel.prototype;
  Pusher.Util.extend(prototype, Pusher.PrivateChannel.prototype);

  /** Authenticates the connection as a member of the channel.
   *
   * @param  {String} socketId
   * @param  {Function} callback
   */
  prototype.authorize = function(socketId, callback) {
    var _super = Pusher.PrivateChannel.prototype.authorize;
    var self = this;
    _super.call(self, socketId, function(error, authData) {
      if (!error) {
        if (authData.channel_data === undefined) {
          Pusher.warn(
            "Invalid auth response for channel '" +
            self.name +
            "', expected 'channel_data' field"
          );
          callback("Invalid auth response");
          return;
        }
        var channelData = JSON.parse(authData.channel_data);
        self.members.setMyID(channelData.user_id);
      }
      callback(error, authData);
    });
  };

  /** Handles presence and subscription events. For internal use only.
   *
   * @param {String} event
   * @param {*} data
   */
  prototype.handleEvent = function(event, data) {
    switch (event) {
      case "pusher_internal:subscription_succeeded":
        this.members.onSubscription(data);
        this.subscribed = true;
        this.emit("pusher:subscription_succeeded", this.members);
        break;
      case "pusher_internal:member_added":
        var addedMember = this.members.addMember(data);
        this.emit('pusher:member_added', addedMember);
        break;
      case "pusher_internal:member_removed":
        var removedMember = this.members.removeMember(data);
        if (removedMember) {
          this.emit('pusher:member_removed', removedMember);
        }
        break;
      default:
        Pusher.PrivateChannel.prototype.handleEvent.call(this, event, data);
    }
  };

  /** Resets the channel state, including members map. For internal use only. */
  prototype.disconnect = function() {
    this.members.reset();
    Pusher.PrivateChannel.prototype.disconnect.call(this);
  };

  Pusher.PresenceChannel = PresenceChannel;
}).call(this);

;(function() {
  /** Handles a channel map. */
  function Channels() {
    this.channels = {};
  }
  var prototype = Channels.prototype;

  /** Creates or retrieves an existing channel by its name.
   *
   * @param {String} name
   * @param {Pusher} pusher
   * @return {Channel}
   */
  prototype.add = function(name, pusher) {
    if (!this.channels[name]) {
      this.channels[name] = createChannel(name, pusher);
    }
    return this.channels[name];
  };

  /** Returns a list of all channels
   *
   * @return {Array}
   */
  prototype.all = function(name) {
    return Pusher.Util.values(this.channels);
  };

  /** Finds a channel by its name.
   *
   * @param {String} name
   * @return {Channel} channel or null if it doesn't exist
   */
  prototype.find = function(name) {
    return this.channels[name];
  };

  /** Removes a channel from the map.
   *
   * @param {String} name
   */
  prototype.remove = function(name) {
    var channel = this.channels[name];
    delete this.channels[name];
    return channel;
  };

  /** Proxies disconnection signal to all channels. */
  prototype.disconnect = function() {
    Pusher.Util.objectApply(this.channels, function(channel) {
      channel.disconnect();
    });
  };

  function createChannel(name, pusher) {
    if (name.indexOf('private-') === 0) {
      return new Pusher.PrivateChannel(name, pusher);
    } else if (name.indexOf('presence-') === 0) {
      return new Pusher.PresenceChannel(name, pusher);
    } else {
      return new Pusher.Channel(name, pusher);
    }
  }

  Pusher.Channels = Channels;
}).call(this);

;(function() {
  Pusher.Channel.Authorizer = function(channel, options) {
    this.channel = channel;
    this.type = options.authTransport;

    this.options = options;
    this.authOptions = (options || {}).auth || {};
  };

  Pusher.Channel.Authorizer.prototype = {
    composeQuery: function(socketId) {
      var query = 'socket_id=' + encodeURIComponent(socketId) +
        '&channel_name=' + encodeURIComponent(this.channel.name);

      for(var i in this.authOptions.params) {
        query += "&" + encodeURIComponent(i) + "=" + encodeURIComponent(this.authOptions.params[i]);
      }

      return query;
    },

    authorize: function(socketId, callback) {
      return Pusher.authorizers[this.type].call(this, socketId, callback);
    }
  };

  var nextAuthCallbackID = 1;

  Pusher.auth_callbacks = {};
  Pusher.authorizers = {
    ajax: function(socketId, callback){
      var self = this, xhr;

      if (Pusher.XHR) {
        xhr = new Pusher.XHR();
      } else {
        xhr = (window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
      }

      xhr.open("POST", self.options.authEndpoint, true);

      // add request headers
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      for(var headerName in this.authOptions.headers) {
        xhr.setRequestHeader(headerName, this.authOptions.headers[headerName]);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var data, parsed = false;

            try {
              data = JSON.parse(xhr.responseText);
              parsed = true;
            } catch (e) {
              callback(true, 'JSON returned from webapp was invalid, yet status code was 200. Data was: ' + xhr.responseText);
            }

            if (parsed) { // prevents double execution.
              callback(false, data);
            }
          } else {
            Pusher.warn("Couldn't get auth info from your webapp", xhr.status);
            callback(true, xhr.status);
          }
        }
      };

      xhr.send(this.composeQuery(socketId));
      return xhr;
    },

    jsonp: function(socketId, callback){
      if(this.authOptions.headers !== undefined) {
        Pusher.warn("Warn", "To send headers with the auth request, you must use AJAX, rather than JSONP.");
      }

      var callbackName = nextAuthCallbackID.toString();
      nextAuthCallbackID++;

      var document = Pusher.Util.getDocument();
      var script = document.createElement("script");
      // Hacked wrapper.
      Pusher.auth_callbacks[callbackName] = function(data) {
        callback(false, data);
      };

      var callback_name = "Pusher.auth_callbacks['" + callbackName + "']";
      script.src = this.options.authEndpoint +
        '?callback=' +
        encodeURIComponent(callback_name) +
        '&' +
        this.composeQuery(socketId);

      var head = document.getElementsByTagName("head")[0] || document.documentElement;
      head.insertBefore( script, head.firstChild );
    }
  };
}).call(this);

return Pusher;
}));


},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var defaultParams = {
  title: '',
  text: '',
  type: null,
  allowOutsideClick: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnConfirm: true,
  closeOnCancel: true,
  confirmButtonText: 'OK',
  confirmButtonColor: '#8CD4F5',
  cancelButtonText: 'Cancel',
  imageUrl: null,
  imageSize: null,
  timer: null,
  customClass: '',
  html: false,
  animation: true,
  allowEscapeKey: true,
  inputType: 'text',
  inputPlaceholder: '',
  inputValue: '',
  showLoaderOnConfirm: false
};

exports['default'] = defaultParams;
module.exports = exports['default'];
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _colorLuminance = require('./utils');

var _getModal = require('./handle-swal-dom');

var _hasClass$isDescendant = require('./handle-dom');

/*
 * User clicked on "Confirm"/"OK" or "Cancel"
 */
var handleButton = function handleButton(event, params, modal) {
  var e = event || window.event;
  var target = e.target || e.srcElement;

  var targetedConfirm = target.className.indexOf('confirm') !== -1;
  var targetedOverlay = target.className.indexOf('sweet-overlay') !== -1;
  var modalIsVisible = _hasClass$isDescendant.hasClass(modal, 'visible');
  var doneFunctionExists = params.doneFunction && modal.getAttribute('data-has-done-function') === 'true';

  // Since the user can change the background-color of the confirm button programmatically,
  // we must calculate what the color should be on hover/active
  var normalColor, hoverColor, activeColor;
  if (targetedConfirm && params.confirmButtonColor) {
    normalColor = params.confirmButtonColor;
    hoverColor = _colorLuminance.colorLuminance(normalColor, -0.04);
    activeColor = _colorLuminance.colorLuminance(normalColor, -0.14);
  }

  function shouldSetConfirmButtonColor(color) {
    if (targetedConfirm && params.confirmButtonColor) {
      target.style.backgroundColor = color;
    }
  }

  switch (e.type) {
    case 'mouseover':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'mouseout':
      shouldSetConfirmButtonColor(normalColor);
      break;

    case 'mousedown':
      shouldSetConfirmButtonColor(activeColor);
      break;

    case 'mouseup':
      shouldSetConfirmButtonColor(hoverColor);
      break;

    case 'focus':
      var $confirmButton = modal.querySelector('button.confirm');
      var $cancelButton = modal.querySelector('button.cancel');

      if (targetedConfirm) {
        $cancelButton.style.boxShadow = 'none';
      } else {
        $confirmButton.style.boxShadow = 'none';
      }
      break;

    case 'click':
      var clickedOnModal = modal === target;
      var clickedOnModalChild = _hasClass$isDescendant.isDescendant(modal, target);

      // Ignore click outside if allowOutsideClick is false
      if (!clickedOnModal && !clickedOnModalChild && modalIsVisible && !params.allowOutsideClick) {
        break;
      }

      if (targetedConfirm && doneFunctionExists && modalIsVisible) {
        handleConfirm(modal, params);
      } else if (doneFunctionExists && modalIsVisible || targetedOverlay) {
        handleCancel(modal, params);
      } else if (_hasClass$isDescendant.isDescendant(modal, target) && target.tagName === 'BUTTON') {
        sweetAlert.close();
      }
      break;
  }
};

/*
 *  User clicked on "Confirm"/"OK"
 */
var handleConfirm = function handleConfirm(modal, params) {
  var callbackValue = true;

  if (_hasClass$isDescendant.hasClass(modal, 'show-input')) {
    callbackValue = modal.querySelector('input').value;

    if (!callbackValue) {
      callbackValue = '';
    }
  }

  params.doneFunction(callbackValue);

  if (params.closeOnConfirm) {
    sweetAlert.close();
  }
  // Disable cancel and confirm button if the parameter is true
  if (params.showLoaderOnConfirm) {
    sweetAlert.disableButtons();
  }
};

/*
 *  User clicked on "Cancel"
 */
var handleCancel = function handleCancel(modal, params) {
  // Check if callback function expects a parameter (to track cancel actions)
  var functionAsStr = String(params.doneFunction).replace(/\s/g, '');
  var functionHandlesCancel = functionAsStr.substring(0, 9) === 'function(' && functionAsStr.substring(9, 10) !== ')';

  if (functionHandlesCancel) {
    params.doneFunction(false);
  }

  if (params.closeOnCancel) {
    sweetAlert.close();
  }
};

exports['default'] = {
  handleButton: handleButton,
  handleConfirm: handleConfirm,
  handleCancel: handleCancel
};
module.exports = exports['default'];
},{"./handle-dom":11,"./handle-swal-dom":13,"./utils":16}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var hasClass = function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
};

var addClass = function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
};

var removeClass = function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
};

var escapeHtml = function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var _show = function _show(elem) {
  elem.style.opacity = '';
  elem.style.display = 'block';
};

var show = function show(elems) {
  if (elems && !elems.length) {
    return _show(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _show(elems[i]);
  }
};

var _hide = function _hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var hide = function hide(elems) {
  if (elems && !elems.length) {
    return _hide(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _hide(elems[i]);
  }
};

var isDescendant = function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

var getTopMargin = function getTopMargin(elem) {
  elem.style.left = '-9999px';
  elem.style.display = 'block';

  var height = elem.clientHeight,
      padding;
  if (typeof getComputedStyle !== 'undefined') {
    // IE 8
    padding = parseInt(getComputedStyle(elem).getPropertyValue('padding-top'), 10);
  } else {
    padding = parseInt(elem.currentStyle.padding);
  }

  elem.style.left = '';
  elem.style.display = 'none';
  return '-' + parseInt((height + padding) / 2) + 'px';
};

var fadeIn = function fadeIn(elem, interval) {
  if (+elem.style.opacity < 1) {
    interval = interval || 16;
    elem.style.opacity = 0;
    elem.style.display = 'block';
    var last = +new Date();
    var tick = (function (_tick) {
      function tick() {
        return _tick.apply(this, arguments);
      }

      tick.toString = function () {
        return _tick.toString();
      };

      return tick;
    })(function () {
      elem.style.opacity = +elem.style.opacity + (new Date() - last) / 100;
      last = +new Date();

      if (+elem.style.opacity < 1) {
        setTimeout(tick, interval);
      }
    });
    tick();
  }
  elem.style.display = 'block'; //fallback IE8
};

var fadeOut = function fadeOut(elem, interval) {
  interval = interval || 16;
  elem.style.opacity = 1;
  var last = +new Date();
  var tick = (function (_tick2) {
    function tick() {
      return _tick2.apply(this, arguments);
    }

    tick.toString = function () {
      return _tick2.toString();
    };

    return tick;
  })(function () {
    elem.style.opacity = +elem.style.opacity - (new Date() - last) / 100;
    last = +new Date();

    if (+elem.style.opacity > 0) {
      setTimeout(tick, interval);
    } else {
      elem.style.display = 'none';
    }
  });
  tick();
};

var fireClick = function fireClick(node) {
  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
  // Then fixed for today's Chrome browser.
  if (typeof MouseEvent === 'function') {
    // Up-to-date approach
    var mevt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });
    node.dispatchEvent(mevt);
  } else if (document.createEvent) {
    // Fallback
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick');
  } else if (typeof node.onclick === 'function') {
    node.onclick();
  }
};

var stopEventPropagation = function stopEventPropagation(e) {
  // In particular, make sure the space bar doesn't scroll the main window.
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
    e.preventDefault();
  } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
    window.event.cancelBubble = true;
  }
};

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.escapeHtml = escapeHtml;
exports._show = _show;
exports.show = show;
exports._hide = _hide;
exports.hide = hide;
exports.isDescendant = isDescendant;
exports.getTopMargin = getTopMargin;
exports.fadeIn = fadeIn;
exports.fadeOut = fadeOut;
exports.fireClick = fireClick;
exports.stopEventPropagation = stopEventPropagation;
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _stopEventPropagation$fireClick = require('./handle-dom');

var _setFocusStyle = require('./handle-swal-dom');

var handleKeyDown = function handleKeyDown(event, params, modal) {
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;

  var $okButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  var $modalButtons = modal.querySelectorAll('button[tabindex]');

  if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
    // Don't do work on keys we don't care about.
    return;
  }

  var $targetElement = e.target || e.srcElement;

  var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
  for (var i = 0; i < $modalButtons.length; i++) {
    if ($targetElement === $modalButtons[i]) {
      btnIndex = i;
      break;
    }
  }

  if (keyCode === 9) {
    // TAB
    if (btnIndex === -1) {
      // No button focused. Jump to the confirm button.
      $targetElement = $okButton;
    } else {
      // Cycle to the next button
      if (btnIndex === $modalButtons.length - 1) {
        $targetElement = $modalButtons[0];
      } else {
        $targetElement = $modalButtons[btnIndex + 1];
      }
    }

    _stopEventPropagation$fireClick.stopEventPropagation(e);
    $targetElement.focus();

    if (params.confirmButtonColor) {
      _setFocusStyle.setFocusStyle($targetElement, params.confirmButtonColor);
    }
  } else {
    if (keyCode === 13) {
      if ($targetElement.tagName === 'INPUT') {
        $targetElement = $okButton;
        $okButton.focus();
      }

      if (btnIndex === -1) {
        // ENTER/SPACE clicked outside of a button.
        $targetElement = $okButton;
      } else {
        // Do nothing - let the browser handle it.
        $targetElement = undefined;
      }
    } else if (keyCode === 27 && params.allowEscapeKey === true) {
      $targetElement = $cancelButton;
      _stopEventPropagation$fireClick.fireClick($targetElement, e);
    } else {
      // Fallback - let the browser handle it.
      $targetElement = undefined;
    }
  }
};

exports['default'] = handleKeyDown;
module.exports = exports['default'];
},{"./handle-dom":11,"./handle-swal-dom":13}],13:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _hexToRgb = require('./utils');

var _removeClass$getTopMargin$fadeIn$show$addClass = require('./handle-dom');

var _defaultParams = require('./default-params');

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

/*
 * Add modal + overlay to DOM
 */

var _injectedHTML = require('./injected-html');

var _injectedHTML2 = _interopRequireWildcard(_injectedHTML);

var modalClass = '.sweet-alert';
var overlayClass = '.sweet-overlay';

var sweetAlertInitialize = function sweetAlertInitialize() {
  var sweetWrap = document.createElement('div');
  sweetWrap.innerHTML = _injectedHTML2['default'];

  // Append elements to body
  while (sweetWrap.firstChild) {
    document.body.appendChild(sweetWrap.firstChild);
  }
};

/*
 * Get DOM element of modal
 */
var getModal = (function (_getModal) {
  function getModal() {
    return _getModal.apply(this, arguments);
  }

  getModal.toString = function () {
    return _getModal.toString();
  };

  return getModal;
})(function () {
  var $modal = document.querySelector(modalClass);

  if (!$modal) {
    sweetAlertInitialize();
    $modal = getModal();
  }

  return $modal;
});

/*
 * Get DOM element of input (in modal)
 */
var getInput = function getInput() {
  var $modal = getModal();
  if ($modal) {
    return $modal.querySelector('input');
  }
};

/*
 * Get DOM element of overlay
 */
var getOverlay = function getOverlay() {
  return document.querySelector(overlayClass);
};

/*
 * Add box-shadow style to button (depending on its chosen bg-color)
 */
var setFocusStyle = function setFocusStyle($button, bgColor) {
  var rgbColor = _hexToRgb.hexToRgb(bgColor);
  $button.style.boxShadow = '0 0 2px rgba(' + rgbColor + ', 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
};

/*
 * Animation when opening modal
 */
var openModal = function openModal(callback) {
  var $modal = getModal();
  _removeClass$getTopMargin$fadeIn$show$addClass.fadeIn(getOverlay(), 10);
  _removeClass$getTopMargin$fadeIn$show$addClass.show($modal);
  _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'showSweetAlert');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'hideSweetAlert');

  window.previousActiveElement = document.activeElement;
  var $okButton = $modal.querySelector('button.confirm');
  $okButton.focus();

  setTimeout(function () {
    _removeClass$getTopMargin$fadeIn$show$addClass.addClass($modal, 'visible');
  }, 500);

  var timer = $modal.getAttribute('data-timer');

  if (timer !== 'null' && timer !== '') {
    var timerCallback = callback;
    $modal.timeout = setTimeout(function () {
      var doneFunctionExists = (timerCallback || null) && $modal.getAttribute('data-has-done-function') === 'true';
      if (doneFunctionExists) {
        timerCallback(null);
      } else {
        sweetAlert.close();
      }
    }, timer);
  }
};

/*
 * Reset the styling of the input
 * (for example if errors have been shown)
 */
var resetInput = function resetInput() {
  var $modal = getModal();
  var $input = getInput();

  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($modal, 'show-input');
  $input.value = _defaultParams2['default'].inputValue;
  $input.setAttribute('type', _defaultParams2['default'].inputType);
  $input.setAttribute('placeholder', _defaultParams2['default'].inputPlaceholder);

  resetInputError();
};

var resetInputError = function resetInputError(event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _removeClass$getTopMargin$fadeIn$show$addClass.removeClass($errorContainer, 'show');
};

/*
 * Set "margin-top"-property on modal based on its computed height
 */
var fixVerticalPosition = function fixVerticalPosition() {
  var $modal = getModal();
  $modal.style.marginTop = _removeClass$getTopMargin$fadeIn$show$addClass.getTopMargin(getModal());
};

exports.sweetAlertInitialize = sweetAlertInitialize;
exports.getModal = getModal;
exports.getOverlay = getOverlay;
exports.getInput = getInput;
exports.setFocusStyle = setFocusStyle;
exports.openModal = openModal;
exports.resetInput = resetInput;
exports.resetInputError = resetInputError;
exports.fixVerticalPosition = fixVerticalPosition;
},{"./default-params":9,"./handle-dom":11,"./injected-html":14,"./utils":16}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var injectedHTML =

// Dark overlay
"<div class=\"sweet-overlay\" tabIndex=\"-1\"></div>" +

// Modal
"<div class=\"sweet-alert\">" +

// Error icon
"<div class=\"sa-icon sa-error\">\n      <span class=\"sa-x-mark\">\n        <span class=\"sa-line sa-left\"></span>\n        <span class=\"sa-line sa-right\"></span>\n      </span>\n    </div>" +

// Warning icon
"<div class=\"sa-icon sa-warning\">\n      <span class=\"sa-body\"></span>\n      <span class=\"sa-dot\"></span>\n    </div>" +

// Info icon
"<div class=\"sa-icon sa-info\"></div>" +

// Success icon
"<div class=\"sa-icon sa-success\">\n      <span class=\"sa-line sa-tip\"></span>\n      <span class=\"sa-line sa-long\"></span>\n\n      <div class=\"sa-placeholder\"></div>\n      <div class=\"sa-fix\"></div>\n    </div>" + "<div class=\"sa-icon sa-custom\"></div>" +

// Title, text and input
"<h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type=\"text\" tabIndex=\"3\" />\n      <div class=\"sa-input-error\"></div>\n    </fieldset>" +

// Input errors
"<div class=\"sa-error-container\">\n      <div class=\"icon\">!</div>\n      <p>Not valid!</p>\n    </div>" +

// Cancel and confirm buttons
"<div class=\"sa-button-container\">\n      <button class=\"cancel\" tabIndex=\"2\">Cancel</button>\n      <div class=\"sa-confirm-button-container\">\n        <button class=\"confirm\" tabIndex=\"1\">OK</button>" +

// Loading animation
"<div class=\"la-ball-fall\">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div>" +

// End of modal
"</div>";

exports["default"] = injectedHTML;
module.exports = exports["default"];
},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _isIE8 = require('./utils');

var _getModal$getInput$setFocusStyle = require('./handle-swal-dom');

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide = require('./handle-dom');

var alertTypes = ['error', 'warning', 'info', 'success', 'input', 'prompt'];

/*
 * Set type, text and actions on modal
 */
var setParameters = function setParameters(params) {
  var modal = _getModal$getInput$setFocusStyle.getModal();

  var $title = modal.querySelector('h2');
  var $text = modal.querySelector('p');
  var $cancelBtn = modal.querySelector('button.cancel');
  var $confirmBtn = modal.querySelector('button.confirm');

  /*
   * Title
   */
  $title.innerHTML = params.html ? params.title : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.title).split('\n').join('<br>');

  /*
   * Text
   */
  $text.innerHTML = params.html ? params.text : _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.text || '').split('\n').join('<br>');
  if (params.text) _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($text);

  /*
   * Custom class
   */
  if (params.customClass) {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, params.customClass);
    modal.setAttribute('data-custom-class', params.customClass);
  } else {
    // Find previously set classes and remove them
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.removeClass(modal, customClass);
    modal.setAttribute('data-custom-class', '');
  }

  /*
   * Icon
   */
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide(modal.querySelectorAll('.sa-icon'));

  if (params.type && !_isIE8.isIE8()) {
    var _ret = (function () {

      var validType = false;

      for (var i = 0; i < alertTypes.length; i++) {
        if (params.type === alertTypes[i]) {
          validType = true;
          break;
        }
      }

      if (!validType) {
        logStr('Unknown alert type: ' + params.type);
        return {
          v: false
        };
      }

      var typesWithIcons = ['success', 'error', 'warning', 'info'];
      var $icon = undefined;

      if (typesWithIcons.indexOf(params.type) !== -1) {
        $icon = modal.querySelector('.sa-icon.' + 'sa-' + params.type);
        _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($icon);
      }

      var $input = _getModal$getInput$setFocusStyle.getInput();

      // Animate icon
      switch (params.type) {

        case 'success':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animate');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-tip'), 'animateSuccessTip');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-long'), 'animateSuccessLong');
          break;

        case 'error':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'animateErrorIcon');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-x-mark'), 'animateXMark');
          break;

        case 'warning':
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon, 'pulseWarning');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-body'), 'pulseWarningIns');
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass($icon.querySelector('.sa-dot'), 'pulseWarningIns');
          break;

        case 'input':
        case 'prompt':
          $input.setAttribute('type', params.inputType);
          $input.value = params.inputValue;
          $input.setAttribute('placeholder', params.inputPlaceholder);
          _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.addClass(modal, 'show-input');
          setTimeout(function () {
            $input.focus();
            $input.addEventListener('keyup', swal.resetInputError);
          }, 400);
          break;
      }
    })();

    if (typeof _ret === 'object') {
      return _ret.v;
    }
  }

  /*
   * Custom image
   */
  if (params.imageUrl) {
    var $customIcon = modal.querySelector('.sa-icon.sa-custom');

    $customIcon.style.backgroundImage = 'url(' + params.imageUrl + ')';
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.show($customIcon);

    var _imgWidth = 80;
    var _imgHeight = 80;

    if (params.imageSize) {
      var dimensions = params.imageSize.toString().split('x');
      var imgWidth = dimensions[0];
      var imgHeight = dimensions[1];

      if (!imgWidth || !imgHeight) {
        logStr('Parameter imageSize expects value with format WIDTHxHEIGHT, got ' + params.imageSize);
      } else {
        _imgWidth = imgWidth;
        _imgHeight = imgHeight;
      }
    }

    $customIcon.setAttribute('style', $customIcon.getAttribute('style') + 'width:' + _imgWidth + 'px; height:' + _imgHeight + 'px');
  }

  /*
   * Show cancel button?
   */
  modal.setAttribute('data-has-cancel-button', params.showCancelButton);
  if (params.showCancelButton) {
    $cancelBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($cancelBtn);
  }

  /*
   * Show confirm button?
   */
  modal.setAttribute('data-has-confirm-button', params.showConfirmButton);
  if (params.showConfirmButton) {
    $confirmBtn.style.display = 'inline-block';
  } else {
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.hide($confirmBtn);
  }

  /*
   * Custom text on cancel/confirm buttons
   */
  if (params.cancelButtonText) {
    $cancelBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.cancelButtonText);
  }
  if (params.confirmButtonText) {
    $confirmBtn.innerHTML = _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide.escapeHtml(params.confirmButtonText);
  }

  /*
   * Custom color on confirm button
   */
  if (params.confirmButtonColor) {
    // Set confirm button to selected background color
    $confirmBtn.style.backgroundColor = params.confirmButtonColor;

    // Set the confirm button color to the loading ring
    $confirmBtn.style.borderLeftColor = params.confirmLoadingButtonColor;
    $confirmBtn.style.borderRightColor = params.confirmLoadingButtonColor;

    // Set box-shadow to default focused button
    _getModal$getInput$setFocusStyle.setFocusStyle($confirmBtn, params.confirmButtonColor);
  }

  /*
   * Allow outside click
   */
  modal.setAttribute('data-allow-outside-click', params.allowOutsideClick);

  /*
   * Callback function
   */
  var hasDoneFunction = params.doneFunction ? true : false;
  modal.setAttribute('data-has-done-function', hasDoneFunction);

  /*
   * Animation
   */
  if (!params.animation) {
    modal.setAttribute('data-animation', 'none');
  } else if (typeof params.animation === 'string') {
    modal.setAttribute('data-animation', params.animation); // Custom animation
  } else {
    modal.setAttribute('data-animation', 'pop');
  }

  /*
   * Timer
   */
  modal.setAttribute('data-timer', params.timer);
};

exports['default'] = setParameters;
module.exports = exports['default'];
},{"./handle-dom":11,"./handle-swal-dom":13,"./utils":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/*
 * Allow user to pass their own params
 */
var extend = function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/*
 * Convert HEX codes to RGB values (#000000 -> rgb(0,0,0))
 */
var hexToRgb = function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
};

/*
 * Check if the user is using Internet Explorer 8 (for fallbacks)
 */
var isIE8 = function isIE8() {
  return window.attachEvent && !window.addEventListener;
};

/*
 * IE compatible logging for developers
 */
var logStr = function logStr(string) {
  if (window.console) {
    // IE...
    window.console.log('SweetAlert: ' + string);
  }
};

/*
 * Set hover, active and focus-states for buttons 
 * (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
 */
var colorLuminance = function colorLuminance(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // Convert to decimal and change luminosity
  var rgb = '#';
  var c;
  var i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
};

exports.extend = extend;
exports.hexToRgb = hexToRgb;
exports.isIE8 = isIE8;
exports.logStr = logStr;
exports.colorLuminance = colorLuminance;
},{}],17:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
// SweetAlert
// 2014-2015 (c) - Tristan Edwards
// github.com/t4t5/sweetalert

/*
 * jQuery-like functions for manipulating the DOM
 */

var _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation = require('./modules/handle-dom');

/*
 * Handy utilities
 */

var _extend$hexToRgb$isIE8$logStr$colorLuminance = require('./modules/utils');

/*
 *  Handle sweetAlert's DOM elements
 */

var _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition = require('./modules/handle-swal-dom');

// Handle button events and keyboard events

var _handleButton$handleConfirm$handleCancel = require('./modules/handle-click');

var _handleKeyDown = require('./modules/handle-key');

var _handleKeyDown2 = _interopRequireWildcard(_handleKeyDown);

// Default values

var _defaultParams = require('./modules/default-params');

var _defaultParams2 = _interopRequireWildcard(_defaultParams);

var _setParameters = require('./modules/set-params');

var _setParameters2 = _interopRequireWildcard(_setParameters);

/*
 * Remember state in cases where opening and handling a modal will fiddle with it.
 * (We also use window.previousActiveElement as a global variable)
 */
var previousWindowKeyDown;
var lastFocusedButton;

/*
 * Global sweetAlert function
 * (this is what the user calls)
 */
var sweetAlert, swal;

exports['default'] = sweetAlert = swal = function () {
  var customizations = arguments[0];

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(document.body, 'stop-scrolling');
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.resetInput();

  /*
   * Use argument if defined or default value from params object otherwise.
   * Supports the case where a default value is boolean true and should be
   * overridden by a corresponding explicit argument which is boolean false.
   */
  function argumentOrDefault(key) {
    var args = customizations;
    return args[key] === undefined ? _defaultParams2['default'][key] : args[key];
  }

  if (customizations === undefined) {
    _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert expects at least 1 attribute!');
    return false;
  }

  var params = _extend$hexToRgb$isIE8$logStr$colorLuminance.extend({}, _defaultParams2['default']);

  switch (typeof customizations) {

    // Ex: swal("Hello", "Just testing", "info");
    case 'string':
      params.title = customizations;
      params.text = arguments[1] || '';
      params.type = arguments[2] || '';
      break;

    // Ex: swal({ title:"Hello", text: "Just testing", type: "info" });
    case 'object':
      if (customizations.title === undefined) {
        _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Missing "title" argument!');
        return false;
      }

      params.title = customizations.title;

      for (var customName in _defaultParams2['default']) {
        params[customName] = argumentOrDefault(customName);
      }

      // Show "Confirm" instead of "OK" if cancel button is visible
      params.confirmButtonText = params.showCancelButton ? 'Confirm' : _defaultParams2['default'].confirmButtonText;
      params.confirmButtonText = argumentOrDefault('confirmButtonText');

      // Callback function when clicking on "OK"/"Cancel"
      params.doneFunction = arguments[1] || null;

      break;

    default:
      _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('Unexpected type of argument! Expected "string" or "object", got ' + typeof customizations);
      return false;

  }

  _setParameters2['default'](params);
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.fixVerticalPosition();
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.openModal(arguments[1]);

  // Modal interactions
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  /*
   * Make sure all modal buttons respond to all events
   */
  var $buttons = modal.querySelectorAll('button');
  var buttonEvents = ['onclick', 'onmouseover', 'onmouseout', 'onmousedown', 'onmouseup', 'onfocus'];
  var onButtonEvent = function onButtonEvent(e) {
    return _handleButton$handleConfirm$handleCancel.handleButton(e, params, modal);
  };

  for (var btnIndex = 0; btnIndex < $buttons.length; btnIndex++) {
    for (var evtIndex = 0; evtIndex < buttonEvents.length; evtIndex++) {
      var btnEvt = buttonEvents[evtIndex];
      $buttons[btnIndex][btnEvt] = onButtonEvent;
    }
  }

  // Clicking outside the modal dismisses it (if allowed by user)
  _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay().onclick = onButtonEvent;

  previousWindowKeyDown = window.onkeydown;

  var onKeyEvent = function onKeyEvent(e) {
    return _handleKeyDown2['default'](e, params, modal);
  };
  window.onkeydown = onKeyEvent;

  window.onfocus = function () {
    // When the user has focused away and focused back from the whole window.
    setTimeout(function () {
      // Put in a timeout to jump out of the event sequence.
      // Calling focus() in the event sequence confuses things.
      if (lastFocusedButton !== undefined) {
        lastFocusedButton.focus();
        lastFocusedButton = undefined;
      }
    }, 0);
  };

  // Show alert with enabled buttons always
  swal.enableButtons();
};

/*
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = swal.setDefaults = function (userParams) {
  if (!userParams) {
    throw new Error('userParams is required');
  }
  if (typeof userParams !== 'object') {
    throw new Error('userParams has to be a object');
  }

  _extend$hexToRgb$isIE8$logStr$colorLuminance.extend(_defaultParams2['default'], userParams);
};

/*
 * Animation when closing modal
 */
sweetAlert.close = swal.close = function () {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(_sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getOverlay(), 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.fadeOut(modal, 5);
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'showSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass(modal, 'hideSweetAlert');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, 'visible');

  /*
   * Reset icon animations
   */
  var $successIcon = modal.querySelector('.sa-icon.sa-success');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon, 'animate');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-tip'), 'animateSuccessTip');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($successIcon.querySelector('.sa-long'), 'animateSuccessLong');

  var $errorIcon = modal.querySelector('.sa-icon.sa-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'animateErrorIcon');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon.querySelector('.sa-x-mark'), 'animateXMark');

  var $warningIcon = modal.querySelector('.sa-icon.sa-warning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon, 'pulseWarning');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-body'), 'pulseWarningIns');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($warningIcon.querySelector('.sa-dot'), 'pulseWarningIns');

  // Reset custom class (delay so that UI changes aren't visible)
  setTimeout(function () {
    var customClass = modal.getAttribute('data-custom-class');
    _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(modal, customClass);
  }, 300);

  // Make page scrollable again
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass(document.body, 'stop-scrolling');

  // Reset the page to its previous state
  window.onkeydown = previousWindowKeyDown;
  if (window.previousActiveElement) {
    window.previousActiveElement.focus();
  }
  lastFocusedButton = undefined;
  clearTimeout(modal.timeout);

  return true;
};

/*
 * Validation of the input field is done by user
 * If something is wrong => call showInputError with errorMessage
 */
sweetAlert.showInputError = swal.showInputError = function (errorMessage) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorIcon, 'show');

  var $errorContainer = modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.addClass($errorContainer, 'show');

  $errorContainer.querySelector('p').innerHTML = errorMessage;

  setTimeout(function () {
    sweetAlert.enableButtons();
  }, 1);

  modal.querySelector('input').focus();
};

/*
 * Reset input error DOM elements
 */
sweetAlert.resetInputError = swal.resetInputError = function (event) {
  // If press enter => ignore
  if (event && event.keyCode === 13) {
    return false;
  }

  var $modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();

  var $errorIcon = $modal.querySelector('.sa-input-error');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorIcon, 'show');

  var $errorContainer = $modal.querySelector('.sa-error-container');
  _hasClass$addClass$removeClass$escapeHtml$_show$show$_hide$hide$isDescendant$getTopMargin$fadeIn$fadeOut$fireClick$stopEventPropagation.removeClass($errorContainer, 'show');
};

/*
 * Disable confirm and cancel buttons
 */
sweetAlert.disableButtons = swal.disableButtons = function (event) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = true;
  $cancelButton.disabled = true;
};

/*
 * Enable confirm and cancel buttons
 */
sweetAlert.enableButtons = swal.enableButtons = function (event) {
  var modal = _sweetAlertInitialize$getModal$getOverlay$getInput$setFocusStyle$openModal$resetInput$fixVerticalPosition.getModal();
  var $confirmButton = modal.querySelector('button.confirm');
  var $cancelButton = modal.querySelector('button.cancel');
  $confirmButton.disabled = false;
  $cancelButton.disabled = false;
};

if (typeof window !== 'undefined') {
  // The 'handle-click' module requires
  // that 'sweetAlert' was set as global.
  window.sweetAlert = window.swal = sweetAlert;
} else {
  _extend$hexToRgb$isIE8$logStr$colorLuminance.logStr('SweetAlert is a frontend module!');
}
module.exports = exports['default'];
},{"./modules/default-params":9,"./modules/handle-click":10,"./modules/handle-dom":11,"./modules/handle-key":12,"./modules/handle-swal-dom":13,"./modules/set-params":15,"./modules/utils":16}],18:[function(require,module,exports){
(function (global){
'use strict';

global.$ = require('jquery');
global.jQuery = require('jquery');
var moment = require('moment');
require('sweetalert');
require('pusher-js');
require('prismjs');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-bash');

$(document).ready(function () {

    moment.locale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }
    });

    var serverOffset = moment($('meta[name=server-time]').attr('content')).diff(new Date()) + 1000;

    var pusher = new Pusher($('meta[name=pusher-key]').attr('content'));
    var channel = pusher.subscribe($('meta[name=pusher-channel]').attr('content'));

    channel.bind('DeviceWasDeleted', function (data) {
        $('#device-' + data.device.id).remove();

        if (!$('.device-row').length) {
            $('.js-no-devices').removeClass('hidden');
            $('#device-table').addClass('hidden');
        }
    });

    channel.bind('ServerWasPoked', function (data) {
        var device = $('#device-' + data.device.id);

        if (device.length) {
            device.find('.device-name').text(data.device.name);
            device.find('.device-ip').text(data.device.ip);
            device.find('.device-updated_at').text(moment(data.device.updated_at).from(moment(data.device.server_time))).data('timestamp', data.device.updated_at);
        } else {
            var newRow = "<tr class=\"device-row\" id=\"device-" + data.device.id + "\"> \
                    <td class=\"device-name\">" + data.device.name + "</td> \
                    <td class=\"device-ip\">" + data.device.ip + "</td> \
                    <td data-timestamp=\"" + data.device.created_at + "\" class=\"device-created_at\">" + moment(data.device.created_at).subtract(serverOffset, 'milliseconds').fromNow() + "</td> \
                    <td data-timestamp=\"" + data.device.updated_at + "\" class=\"device-updated_at\">" + moment(data.device.updated_at).subtract(serverOffset, 'milliseconds').fromNow() + "</td> \
                </tr>";

            $('#device-table tr:last').after(newRow);
        }

        if ($('.device-row').length) {
            $('.js-no-devices').addClass('hidden');
            $('#device-table').removeClass('hidden');
        }
    });

    var updateTime = function updateTime() {
        $('.device-updated_at').each(function () {
            $(this).text(moment($(this).data('timestamp')).subtract(serverOffset, 'milliseconds').fromNow());
        });
    };

    setInterval(updateTime, 1000);
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"jquery":1,"moment":2,"prismjs":7,"prismjs/components/prism-bash":3,"prismjs/components/prism-clike":4,"prismjs/components/prism-javascript":5,"prismjs/components/prism-markup":6,"pusher-js":8,"sweetalert":17}]},{},[18]);

//# sourceMappingURL=app.js.map

/*!
 * Flat UI Pro v1.3.2 (http://designmodo.com/flat)
 * Copyright 2013-2014 Designmodo, Inc.
 */
/*!
 * jQuery UI Core 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if(function(a,b){function c(b,c){var e,f,g,h=b.nodeName.toLowerCase();return"area"===h?(e=b.parentNode,f=e.name,b.href&&f&&"map"===e.nodeName.toLowerCase()?(g=a("img[usemap=#"+f+"]")[0],!!g&&d(g)):!1):(/input|select|textarea|button|object/.test(h)?!b.disabled:"a"===h?b.href||c:c)&&d(b)}function d(b){return a.expr.filters.visible(b)&&!a(b).parents().addBack().filter(function(){return"hidden"===a.css(this,"visibility")}).length}var e=0,f=/^ui-id-\d+$/;a.ui=a.ui||{},a.extend(a.ui,{version:"1.10.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),a.fn.extend({focus:function(b){return function(c,d){return"number"==typeof c?this.each(function(){var b=this;setTimeout(function(){a(b).focus(),d&&d.call(b)},c)}):b.apply(this,arguments)}}(a.fn.focus),scrollParent:function(){var b;return b=a.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.css(this,"position"))&&/(auto|scroll)/.test(a.css(this,"overflow")+a.css(this,"overflow-y")+a.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(a.css(this,"overflow")+a.css(this,"overflow-y")+a.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length)for(var d,e,f=a(this[0]);f.length&&f[0]!==document;){if(d=f.css("position"),("absolute"===d||"relative"===d||"fixed"===d)&&(e=parseInt(f.css("zIndex"),10),!isNaN(e)&&0!==e))return e;f=f.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})},removeUniqueId:function(){return this.each(function(){f.test(this.id)&&a(this).removeAttr("id")})}}),a.extend(a.expr[":"],{data:a.expr.createPseudo?a.expr.createPseudo(function(b){return function(c){return!!a.data(c,b)}}):function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a("<a>").outerWidth(1).jquery||a.each(["Width","Height"],function(c,d){function e(b,c,d,e){return a.each(f,function(){c-=parseFloat(a.css(b,"padding"+this))||0,d&&(c-=parseFloat(a.css(b,"border"+this+"Width"))||0),e&&(c-=parseFloat(a.css(b,"margin"+this))||0)}),c}var f="Width"===d?["Left","Right"]:["Top","Bottom"],g=d.toLowerCase(),h={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?h["inner"+d].call(this):this.each(function(){a(this).css(g,e(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return"number"!=typeof b?h["outer"+d].call(this,b):this.each(function(){a(this).css(g,e(this,b,!0,c)+"px")})}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(a.fn.removeData=function(b){return function(c){return arguments.length?b.call(this,a.camelCase(c)):b.call(this)}}(a.fn.removeData)),a.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),a.support.selectstart="onselectstart"in document.createElement("div"),a.fn.extend({disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e,f=a.ui[b].prototype;for(e in d)f.plugins[e]=f.plugins[e]||[],f.plugins[e].push([c,d[e]])},call:function(a,b,c){var d,e=a.plugins[b];if(e&&a.element[0].parentNode&&11!==a.element[0].parentNode.nodeType)for(d=0;d<e.length;d++)a.options[e[d][0]]&&e[d][1].apply(a.element,c)}},hasScroll:function(b,c){if("hidden"===a(b).css("overflow"))return!1;var d=c&&"left"===c?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)}})}(jQuery),/*!
 * jQuery UI Widget 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
function(a,b){var c=0,d=Array.prototype.slice,e=a.cleanData;a.cleanData=function(b){for(var c,d=0;null!=(c=b[d]);d++)try{a(c).triggerHandler("remove")}catch(f){}e(b)},a.widget=function(b,c,d){var e,f,g,h,i={},j=b.split(".")[0];b=b.split(".")[1],e=j+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][e.toLowerCase()]=function(b){return!!a.data(b,e)},a[j]=a[j]||{},f=a[j][b],g=a[j][b]=function(a,b){return this._createWidget?void(arguments.length&&this._createWidget(a,b)):new g(a,b)},a.extend(g,f,{version:d.version,_proto:a.extend({},d),_childConstructors:[]}),h=new c,h.options=a.widget.extend({},h.options),a.each(d,function(b,d){return a.isFunction(d)?void(i[b]=function(){var a=function(){return c.prototype[b].apply(this,arguments)},e=function(a){return c.prototype[b].apply(this,a)};return function(){var b,c=this._super,f=this._superApply;return this._super=a,this._superApply=e,b=d.apply(this,arguments),this._super=c,this._superApply=f,b}}()):void(i[b]=d)}),g.prototype=a.widget.extend(h,{widgetEventPrefix:f?h.widgetEventPrefix||b:b},i,{constructor:g,namespace:j,widgetName:b,widgetFullName:e}),f?(a.each(f._childConstructors,function(b,c){var d=c.prototype;a.widget(d.namespace+"."+d.widgetName,g,c._proto)}),delete f._childConstructors):c._childConstructors.push(g),a.widget.bridge(b,g)},a.widget.extend=function(c){for(var e,f,g=d.call(arguments,1),h=0,i=g.length;i>h;h++)for(e in g[h])f=g[h][e],g[h].hasOwnProperty(e)&&f!==b&&(c[e]=a.isPlainObject(f)?a.isPlainObject(c[e])?a.widget.extend({},c[e],f):a.widget.extend({},f):f);return c},a.widget.bridge=function(c,e){var f=e.prototype.widgetFullName||c;a.fn[c]=function(g){var h="string"==typeof g,i=d.call(arguments,1),j=this;return g=!h&&i.length?a.widget.extend.apply(null,[g].concat(i)):g,this.each(h?function(){var d,e=a.data(this,f);return e?a.isFunction(e[g])&&"_"!==g.charAt(0)?(d=e[g].apply(e,i),d!==e&&d!==b?(j=d&&d.jquery?j.pushStack(d.get()):d,!1):void 0):a.error("no such method '"+g+"' for "+c+" widget instance"):a.error("cannot call methods on "+c+" prior to initialization; attempted to call method '"+g+"'")}:function(){var b=a.data(this,f);b?b.option(g||{})._init():a.data(this,f,new e(g,this))}),j}},a.Widget=function(){},a.Widget._childConstructors=[],a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(b,d){d=a(d||this.defaultElement||this)[0],this.element=a(d),this.uuid=c++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=a.widget.extend({},this.options,this._getCreateOptions(),b),this.bindings=a(),this.hoverable=a(),this.focusable=a(),d!==this&&(a.data(d,this.widgetFullName,this),this._on(!0,this.element,{remove:function(a){a.target===d&&this.destroy()}}),this.document=a(d.style?d.ownerDocument:d.document||d),this.window=a(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:a.noop,_getCreateEventData:a.noop,_create:a.noop,_init:a.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:a.noop,widget:function(){return this.element},option:function(c,d){var e,f,g,h=c;if(0===arguments.length)return a.widget.extend({},this.options);if("string"==typeof c)if(h={},e=c.split("."),c=e.shift(),e.length){for(f=h[c]=a.widget.extend({},this.options[c]),g=0;g<e.length-1;g++)f[e[g]]=f[e[g]]||{},f=f[e[g]];if(c=e.pop(),1===arguments.length)return f[c]===b?null:f[c];f[c]=d}else{if(1===arguments.length)return this.options[c]===b?null:this.options[c];h[c]=d}return this._setOptions(h),this},_setOptions:function(a){var b;for(b in a)this._setOption(b,a[b]);return this},_setOption:function(a,b){return this.options[a]=b,"disabled"===a&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!b).attr("aria-disabled",b),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(b,c,d){var e,f=this;"boolean"!=typeof b&&(d=c,c=b,b=!1),d?(c=e=a(c),this.bindings=this.bindings.add(c)):(d=c,c=this.element,e=this.widget()),a.each(d,function(d,g){function h(){return b||f.options.disabled!==!0&&!a(this).hasClass("ui-state-disabled")?("string"==typeof g?f[g]:g).apply(f,arguments):void 0}"string"!=typeof g&&(h.guid=g.guid=g.guid||h.guid||a.guid++);var i=d.match(/^(\w+)\s*(.*)$/),j=i[1]+f.eventNamespace,k=i[2];k?e.delegate(k,j,h):c.bind(j,h)})},_off:function(a,b){b=(b||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,a.unbind(b).undelegate(b)},_delay:function(a,b){function c(){return("string"==typeof a?d[a]:a).apply(d,arguments)}var d=this;return setTimeout(c,b||0)},_hoverable:function(b){this.hoverable=this.hoverable.add(b),this._on(b,{mouseenter:function(b){a(b.currentTarget).addClass("ui-state-hover")},mouseleave:function(b){a(b.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(b){this.focusable=this.focusable.add(b),this._on(b,{focusin:function(b){a(b.currentTarget).addClass("ui-state-focus")},focusout:function(b){a(b.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(b,c,d){var e,f,g=this.options[b];if(d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.apply(this.element[0],[c].concat(d))===!1||c.isDefaultPrevented())}},a.each({show:"fadeIn",hide:"fadeOut"},function(b,c){a.Widget.prototype["_"+b]=function(d,e,f){"string"==typeof e&&(e={effect:e});var g,h=e?e===!0||"number"==typeof e?c:e.effect||c:b;e=e||{},"number"==typeof e&&(e={duration:e}),g=!a.isEmptyObject(e),e.complete=f,e.delay&&d.delay(e.delay),g&&a.effects&&a.effects.effect[h]?d[b](e):h!==b&&d[h]?d[h](e.duration,e.easing,f):d.queue(function(c){a(this)[b](),f&&f.call(d[0]),c()})}})}(jQuery),/*!
 * jQuery UI Mouse 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 *
 * Depends:
 *	jquery.ui.widget.js
 */
function(a){var b=!1;a(document).mouseup(function(){b=!1}),a.widget("ui.mouse",{version:"1.10.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){return!0===a.data(c.target,b.widgetName+".preventClickEvent")?(a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(c){if(!b){this._mouseStarted&&this._mouseUp(c),this._mouseDownEvent=c;var d=this,e=1===c.which,f="string"==typeof this.options.cancel&&c.target.nodeName?a(c.target).closest(this.options.cancel).length:!1;return e&&!f&&this._mouseCapture(c)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(c)&&this._mouseDelayMet(c)&&(this._mouseStarted=this._mouseStart(c)!==!1,!this._mouseStarted)?(c.preventDefault(),!0):(!0===a.data(c.target,this.widgetName+".preventClickEvent")&&a.removeData(c.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),c.preventDefault(),b=!0,!0)):!0}},_mouseMove:function(b){return a.ui.ie&&(!document.documentMode||document.documentMode<9)&&!b.button?this._mouseUp(b):this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target===this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}(jQuery),/*!
 * jQuery UI Position 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
function(a,b){function c(a,b,c){return[parseFloat(a[0])*(n.test(a[0])?b/100:1),parseFloat(a[1])*(n.test(a[1])?c/100:1)]}function d(b,c){return parseInt(a.css(b,c),10)||0}function e(b){var c=b[0];return 9===c.nodeType?{width:b.width(),height:b.height(),offset:{top:0,left:0}}:a.isWindow(c)?{width:b.width(),height:b.height(),offset:{top:b.scrollTop(),left:b.scrollLeft()}}:c.preventDefault?{width:0,height:0,offset:{top:c.pageY,left:c.pageX}}:{width:b.outerWidth(),height:b.outerHeight(),offset:b.offset()}}a.ui=a.ui||{};var f,g=Math.max,h=Math.abs,i=Math.round,j=/left|center|right/,k=/top|center|bottom/,l=/[\+\-]\d+(\.[\d]+)?%?/,m=/^\w+/,n=/%$/,o=a.fn.position;a.position={scrollbarWidth:function(){if(f!==b)return f;var c,d,e=a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),g=e.children()[0];return a("body").append(e),c=g.offsetWidth,e.css("overflow","scroll"),d=g.offsetWidth,c===d&&(d=e[0].clientWidth),e.remove(),f=c-d},getScrollInfo:function(b){var c=b.isWindow||b.isDocument?"":b.element.css("overflow-x"),d=b.isWindow||b.isDocument?"":b.element.css("overflow-y"),e="scroll"===c||"auto"===c&&b.width<b.element[0].scrollWidth,f="scroll"===d||"auto"===d&&b.height<b.element[0].scrollHeight;return{width:f?a.position.scrollbarWidth():0,height:e?a.position.scrollbarWidth():0}},getWithinInfo:function(b){var c=a(b||window),d=a.isWindow(c[0]),e=!!c[0]&&9===c[0].nodeType;return{element:c,isWindow:d,isDocument:e,offset:c.offset()||{left:0,top:0},scrollLeft:c.scrollLeft(),scrollTop:c.scrollTop(),width:d?c.width():c.outerWidth(),height:d?c.height():c.outerHeight()}}},a.fn.position=function(b){if(!b||!b.of)return o.apply(this,arguments);b=a.extend({},b);var f,n,p,q,r,s,t=a(b.of),u=a.position.getWithinInfo(b.within),v=a.position.getScrollInfo(u),w=(b.collision||"flip").split(" "),x={};return s=e(t),t[0].preventDefault&&(b.at="left top"),n=s.width,p=s.height,q=s.offset,r=a.extend({},q),a.each(["my","at"],function(){var a,c,d=(b[this]||"").split(" ");1===d.length&&(d=j.test(d[0])?d.concat(["center"]):k.test(d[0])?["center"].concat(d):["center","center"]),d[0]=j.test(d[0])?d[0]:"center",d[1]=k.test(d[1])?d[1]:"center",a=l.exec(d[0]),c=l.exec(d[1]),x[this]=[a?a[0]:0,c?c[0]:0],b[this]=[m.exec(d[0])[0],m.exec(d[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===b.at[0]?r.left+=n:"center"===b.at[0]&&(r.left+=n/2),"bottom"===b.at[1]?r.top+=p:"center"===b.at[1]&&(r.top+=p/2),f=c(x.at,n,p),r.left+=f[0],r.top+=f[1],this.each(function(){var e,j,k=a(this),l=k.outerWidth(),m=k.outerHeight(),o=d(this,"marginLeft"),s=d(this,"marginTop"),y=l+o+d(this,"marginRight")+v.width,z=m+s+d(this,"marginBottom")+v.height,A=a.extend({},r),B=c(x.my,k.outerWidth(),k.outerHeight());"right"===b.my[0]?A.left-=l:"center"===b.my[0]&&(A.left-=l/2),"bottom"===b.my[1]?A.top-=m:"center"===b.my[1]&&(A.top-=m/2),A.left+=B[0],A.top+=B[1],a.support.offsetFractions||(A.left=i(A.left),A.top=i(A.top)),e={marginLeft:o,marginTop:s},a.each(["left","top"],function(c,d){a.ui.position[w[c]]&&a.ui.position[w[c]][d](A,{targetWidth:n,targetHeight:p,elemWidth:l,elemHeight:m,collisionPosition:e,collisionWidth:y,collisionHeight:z,offset:[f[0]+B[0],f[1]+B[1]],my:b.my,at:b.at,within:u,elem:k})}),b.using&&(j=function(a){var c=q.left-A.left,d=c+n-l,e=q.top-A.top,f=e+p-m,i={target:{element:t,left:q.left,top:q.top,width:n,height:p},element:{element:k,left:A.left,top:A.top,width:l,height:m},horizontal:0>d?"left":c>0?"right":"center",vertical:0>f?"top":e>0?"bottom":"middle"};l>n&&h(c+d)<n&&(i.horizontal="center"),m>p&&h(e+f)<p&&(i.vertical="middle"),i.important=g(h(c),h(d))>g(h(e),h(f))?"horizontal":"vertical",b.using.call(this,a,i)}),k.offset(a.extend(A,{using:j}))})},a.ui.position={fit:{left:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollLeft:d.offset.left,f=d.width,h=a.left-b.collisionPosition.marginLeft,i=e-h,j=h+b.collisionWidth-f-e;b.collisionWidth>f?i>0&&0>=j?(c=a.left+i+b.collisionWidth-f-e,a.left+=i-c):a.left=j>0&&0>=i?e:i>j?e+f-b.collisionWidth:e:i>0?a.left+=i:j>0?a.left-=j:a.left=g(a.left-h,a.left)},top:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollTop:d.offset.top,f=b.within.height,h=a.top-b.collisionPosition.marginTop,i=e-h,j=h+b.collisionHeight-f-e;b.collisionHeight>f?i>0&&0>=j?(c=a.top+i+b.collisionHeight-f-e,a.top+=i-c):a.top=j>0&&0>=i?e:i>j?e+f-b.collisionHeight:e:i>0?a.top+=i:j>0?a.top-=j:a.top=g(a.top-h,a.top)}},flip:{left:function(a,b){var c,d,e=b.within,f=e.offset.left+e.scrollLeft,g=e.width,i=e.isWindow?e.scrollLeft:e.offset.left,j=a.left-b.collisionPosition.marginLeft,k=j-i,l=j+b.collisionWidth-g-i,m="left"===b.my[0]?-b.elemWidth:"right"===b.my[0]?b.elemWidth:0,n="left"===b.at[0]?b.targetWidth:"right"===b.at[0]?-b.targetWidth:0,o=-2*b.offset[0];0>k?(c=a.left+m+n+o+b.collisionWidth-g-f,(0>c||c<h(k))&&(a.left+=m+n+o)):l>0&&(d=a.left-b.collisionPosition.marginLeft+m+n+o-i,(d>0||h(d)<l)&&(a.left+=m+n+o))},top:function(a,b){var c,d,e=b.within,f=e.offset.top+e.scrollTop,g=e.height,i=e.isWindow?e.scrollTop:e.offset.top,j=a.top-b.collisionPosition.marginTop,k=j-i,l=j+b.collisionHeight-g-i,m="top"===b.my[1],n=m?-b.elemHeight:"bottom"===b.my[1]?b.elemHeight:0,o="top"===b.at[1]?b.targetHeight:"bottom"===b.at[1]?-b.targetHeight:0,p=-2*b.offset[1];0>k?(d=a.top+n+o+p+b.collisionHeight-g-f,a.top+n+o+p>k&&(0>d||d<h(k))&&(a.top+=n+o+p)):l>0&&(c=a.top-b.collisionPosition.marginTop+n+o+p-i,a.top+n+o+p>l&&(c>0||h(c)<l)&&(a.top+=n+o+p))}},flipfit:{left:function(){a.ui.position.flip.left.apply(this,arguments),a.ui.position.fit.left.apply(this,arguments)},top:function(){a.ui.position.flip.top.apply(this,arguments),a.ui.position.fit.top.apply(this,arguments)}}},function(){var b,c,d,e,f,g=document.getElementsByTagName("body")[0],h=document.createElement("div");b=document.createElement(g?"div":"body"),d={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},g&&a.extend(d,{position:"absolute",left:"-1000px",top:"-1000px"});for(f in d)b.style[f]=d[f];b.appendChild(h),c=g||document.documentElement,c.insertBefore(b,c.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",e=a(h).offset().left,a.support.offsetFractions=e>10&&11>e,b.innerHTML="",c.removeChild(b)}()}(jQuery),/*!
 * jQuery UI Button 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/button/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
function(a){var b,c="ui-button ui-widget ui-state-default ui-corner-all",d="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",e=function(){var b=a(this);setTimeout(function(){b.find(":ui-button").button("refresh")},1)},f=function(b){var c=b.name,d=b.form,e=a([]);return c&&(c=c.replace(/'/g,"\\'"),e=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form})),e};a.widget("ui.button",{version:"1.10.4",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,e),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var d=this,g=this.options,h="checkbox"===this.type||"radio"===this.type,i=h?"":"ui-state-active";null===g.label&&(g.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(c).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){g.disabled||this===b&&a(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){g.disabled||a(this).removeClass(i)}).bind("click"+this.eventNamespace,function(a){g.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this._on({focus:function(){this.buttonElement.addClass("ui-state-focus")},blur:function(){this.buttonElement.removeClass("ui-state-focus")}}),h&&this.element.bind("change"+this.eventNamespace,function(){d.refresh()}),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return g.disabled?!1:void 0}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(g.disabled)return!1;a(this).addClass("ui-state-active"),d.buttonElement.attr("aria-pressed","true");var b=d.element[0];f(b).not(b).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return g.disabled?!1:(a(this).addClass("ui-state-active"),b=this,void d.document.one("mouseup",function(){b=null}))}).bind("mouseup"+this.eventNamespace,function(){return g.disabled?!1:void a(this).removeClass("ui-state-active")}).bind("keydown"+this.eventNamespace,function(b){return g.disabled?!1:void((b.keyCode===a.ui.keyCode.SPACE||b.keyCode===a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active"))}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",g.disabled),this._resetButton()},_determineButtonType:function(){var a,b,c;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(a=this.element.parents().last(),b="label[for='"+this.element.attr("id")+"']",this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible"),c=this.element.is(":checked"),c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",c)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(c+" ui-state-active "+d).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(a,b){return this._super(a,b),"disabled"===a?(this.element.prop("disabled",!!b),void(b&&this.buttonElement.removeClass("ui-state-focus"))):void this._resetButton()},refresh:function(){var b=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");b!==this.options.disabled&&this._setOption("disabled",b),"radio"===this.type?f(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return void(this.options.label&&this.element.val(this.options.label));var b=this.buttonElement.removeClass(d),c=a("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),e=this.options.icons,f=e.primary&&e.secondary,g=[];e.primary||e.secondary?(this.options.text&&g.push("ui-button-text-icon"+(f?"s":e.primary?"-primary":"-secondary")),e.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+e.primary+"'></span>"),e.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+e.secondary+"'></span>"),this.options.text||(g.push(f?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",a.trim(c)))):g.push("ui-button-text-only"),b.addClass(g.join(" "))}}),a.widget("ui.buttonset",{version:"1.10.4",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(a,b){"disabled"===a&&this.buttons.button("option",a,b),this._super(a,b)},refresh:function(){var b="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})}(jQuery),/*!
 * jQuery UI Datepicker 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 *
 * Depends:
 *	jquery.ui.core.js
 */
function(a,b){function c(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},a.extend(this._defaults,this.regional[""]),this.dpDiv=d(a("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function d(b){var c="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return b.delegate(c,"mouseout",function(){a(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&a(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&a(this).removeClass("ui-datepicker-next-hover")}).delegate(c,"mouseover",function(){a.datepicker._isDisabledDatepicker(f.inline?b.parent()[0]:f.input[0])||(a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),a(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&a(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&a(this).addClass("ui-datepicker-next-hover"))})}function e(b,c){a.extend(b,c);for(var d in c)null==c[d]&&(b[d]=c[d]);return b}a.extend(a.ui,{datepicker:{version:"1.10.4"}});var f,g="datepicker";a.extend(c.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){return e(this._defaults,a||{}),this},_attachDatepicker:function(b,c){var d,e,f;d=b.nodeName.toLowerCase(),e="div"===d||"span"===d,b.id||(this.uuid+=1,b.id="dp"+this.uuid),f=this._newInst(a(b),e),f.settings=a.extend({},c||{}),"input"===d?this._connectDatepicker(b,f):e&&this._inlineDatepicker(b,f)},_newInst:function(b,c){var e=b[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:e,input:b,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:c,dpDiv:c?d(a("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(b,c){var d=a(b);c.append=a([]),c.trigger=a([]),d.hasClass(this.markerClassName)||(this._attachments(d,c),d.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),this._autoSize(c),a.data(b,g,c),c.settings.disabled&&this._disableDatepicker(b))},_attachments:function(b,c){var d,e,f,g=this._get(c,"appendText"),h=this._get(c,"isRTL");c.append&&c.append.remove(),g&&(c.append=a("<span class='"+this._appendClass+"'>"+g+"</span>"),b[h?"before":"after"](c.append)),b.unbind("focus",this._showDatepicker),c.trigger&&c.trigger.remove(),d=this._get(c,"showOn"),("focus"===d||"both"===d)&&b.focus(this._showDatepicker),("button"===d||"both"===d)&&(e=this._get(c,"buttonText"),f=this._get(c,"buttonImage"),c.trigger=a(this._get(c,"buttonImageOnly")?a("<img/>").addClass(this._triggerClass).attr({src:f,alt:e,title:e}):a("<button type='button'></button>").addClass(this._triggerClass).html(f?a("<img/>").attr({src:f,alt:e,title:e}):e)),b[h?"before":"after"](c.trigger),c.trigger.click(function(){return a.datepicker._datepickerShowing&&a.datepicker._lastInput===b[0]?a.datepicker._hideDatepicker():a.datepicker._datepickerShowing&&a.datepicker._lastInput!==b[0]?(a.datepicker._hideDatepicker(),a.datepicker._showDatepicker(b[0])):a.datepicker._showDatepicker(b[0]),!1}))},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b,c,d,e,f=new Date(2009,11,20),g=this._get(a,"dateFormat");g.match(/[DM]/)&&(b=function(a){for(c=0,d=0,e=0;e<a.length;e++)a[e].length>c&&(c=a[e].length,d=e);return d},f.setMonth(b(this._get(a,g.match(/MM/)?"monthNames":"monthNamesShort"))),f.setDate(b(this._get(a,g.match(/DD/)?"dayNames":"dayNamesShort"))+20-f.getDay())),a.input.attr("size",this._formatDate(a,f).length)}},_inlineDatepicker:function(b,c){var d=a(b);d.hasClass(this.markerClassName)||(d.addClass(this.markerClassName).append(c.dpDiv),a.data(b,g,c),this._setDate(c,this._getDefaultDate(c),!0),this._updateDatepicker(c),this._updateAlternate(c),c.settings.disabled&&this._disableDatepicker(b),c.dpDiv.css("display","block"))},_dialogDatepicker:function(b,c,d,f,h){var i,j,k,l,m,n=this._dialogInst;return n||(this.uuid+=1,i="dp"+this.uuid,this._dialogInput=a("<input type='text' id='"+i+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.keydown(this._doKeyDown),a("body").append(this._dialogInput),n=this._dialogInst=this._newInst(this._dialogInput,!1),n.settings={},a.data(this._dialogInput[0],g,n)),e(n.settings,f||{}),c=c&&c.constructor===Date?this._formatDate(n,c):c,this._dialogInput.val(c),this._pos=h?h.length?h:[h.pageX,h.pageY]:null,this._pos||(j=document.documentElement.clientWidth,k=document.documentElement.clientHeight,l=document.documentElement.scrollLeft||document.body.scrollLeft,m=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[j/2-100+l,k/2-150+m]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),n.settings.onSelect=d,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),a.blockUI&&a.blockUI(this.dpDiv),a.data(this._dialogInput[0],g,n),this},_destroyDatepicker:function(b){var c,d=a(b),e=a.data(b,g);d.hasClass(this.markerClassName)&&(c=b.nodeName.toLowerCase(),a.removeData(b,g),"input"===c?(e.append.remove(),e.trigger.remove(),d.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):("div"===c||"span"===c)&&d.removeClass(this.markerClassName).empty())},_enableDatepicker:function(b){var c,d,e=a(b),f=a.data(b,g);e.hasClass(this.markerClassName)&&(c=b.nodeName.toLowerCase(),"input"===c?(b.disabled=!1,f.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===c||"span"===c)&&(d=e.children("."+this._inlineClass),d.children().removeClass("ui-state-disabled"),d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=a.map(this._disabledInputs,function(a){return a===b?null:a}))},_disableDatepicker:function(b){var c,d,e=a(b),f=a.data(b,g);e.hasClass(this.markerClassName)&&(c=b.nodeName.toLowerCase(),"input"===c?(b.disabled=!0,f.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===c||"span"===c)&&(d=e.children("."+this._inlineClass),d.children().addClass("ui-state-disabled"),d.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=a.map(this._disabledInputs,function(a){return a===b?null:a}),this._disabledInputs[this._disabledInputs.length]=b)},_isDisabledDatepicker:function(a){if(!a)return!1;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]===a)return!0;return!1},_getInst:function(b){try{return a.data(b,g)}catch(c){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(c,d,f){var g,h,i,j,k=this._getInst(c);return 2===arguments.length&&"string"==typeof d?"defaults"===d?a.extend({},a.datepicker._defaults):k?"all"===d?a.extend({},k.settings):this._get(k,d):null:(g=d||{},"string"==typeof d&&(g={},g[d]=f),void(k&&(this._curInst===k&&this._hideDatepicker(),h=this._getDateDatepicker(c,!0),i=this._getMinMaxDate(k,"min"),j=this._getMinMaxDate(k,"max"),e(k.settings,g),null!==i&&g.dateFormat!==b&&g.minDate===b&&(k.settings.minDate=this._formatDate(k,i)),null!==j&&g.dateFormat!==b&&g.maxDate===b&&(k.settings.maxDate=this._formatDate(k,j)),"disabled"in g&&(g.disabled?this._disableDatepicker(c):this._enableDatepicker(c)),this._attachments(a(c),k),this._autoSize(k),this._setDate(k,h),this._updateAlternate(k),this._updateDatepicker(k))))},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){var b=this._getInst(a);b&&this._updateDatepicker(b)},_setDateDatepicker:function(a,b){var c=this._getInst(a);c&&(this._setDate(c,b),this._updateDatepicker(c),this._updateAlternate(c))},_getDateDatepicker:function(a,b){var c=this._getInst(a);return c&&!c.inline&&this._setDateFromField(c,b),c?this._getDate(c):null},_doKeyDown:function(b){var c,d,e,f=a.datepicker._getInst(b.target),g=!0,h=f.dpDiv.is(".ui-datepicker-rtl");if(f._keyEvent=!0,a.datepicker._datepickerShowing)switch(b.keyCode){case 9:a.datepicker._hideDatepicker(),g=!1;break;case 13:return e=a("td."+a.datepicker._dayOverClass+":not(."+a.datepicker._currentClass+")",f.dpDiv),e[0]&&a.datepicker._selectDay(b.target,f.selectedMonth,f.selectedYear,e[0]),c=a.datepicker._get(f,"onSelect"),c?(d=a.datepicker._formatDate(f),c.apply(f.input?f.input[0]:null,[d,f])):a.datepicker._hideDatepicker(),!1;case 27:a.datepicker._hideDatepicker();break;case 33:a.datepicker._adjustDate(b.target,b.ctrlKey?-a.datepicker._get(f,"stepBigMonths"):-a.datepicker._get(f,"stepMonths"),"M");break;case 34:a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(f,"stepBigMonths"):+a.datepicker._get(f,"stepMonths"),"M");break;case 35:(b.ctrlKey||b.metaKey)&&a.datepicker._clearDate(b.target),g=b.ctrlKey||b.metaKey;break;case 36:(b.ctrlKey||b.metaKey)&&a.datepicker._gotoToday(b.target),g=b.ctrlKey||b.metaKey;break;case 37:(b.ctrlKey||b.metaKey)&&a.datepicker._adjustDate(b.target,h?1:-1,"D"),g=b.ctrlKey||b.metaKey,b.originalEvent.altKey&&a.datepicker._adjustDate(b.target,b.ctrlKey?-a.datepicker._get(f,"stepBigMonths"):-a.datepicker._get(f,"stepMonths"),"M");break;case 38:(b.ctrlKey||b.metaKey)&&a.datepicker._adjustDate(b.target,-7,"D"),g=b.ctrlKey||b.metaKey;break;case 39:(b.ctrlKey||b.metaKey)&&a.datepicker._adjustDate(b.target,h?-1:1,"D"),g=b.ctrlKey||b.metaKey,b.originalEvent.altKey&&a.datepicker._adjustDate(b.target,b.ctrlKey?+a.datepicker._get(f,"stepBigMonths"):+a.datepicker._get(f,"stepMonths"),"M");break;case 40:(b.ctrlKey||b.metaKey)&&a.datepicker._adjustDate(b.target,7,"D"),g=b.ctrlKey||b.metaKey;break;default:g=!1}else 36===b.keyCode&&b.ctrlKey?a.datepicker._showDatepicker(this):g=!1;g&&(b.preventDefault(),b.stopPropagation())},_doKeyPress:function(b){var c,d,e=a.datepicker._getInst(b.target);return a.datepicker._get(e,"constrainInput")?(c=a.datepicker._possibleChars(a.datepicker._get(e,"dateFormat")),d=String.fromCharCode(null==b.charCode?b.keyCode:b.charCode),b.ctrlKey||b.metaKey||" ">d||!c||c.indexOf(d)>-1):void 0},_doKeyUp:function(b){var c,d=a.datepicker._getInst(b.target);if(d.input.val()!==d.lastVal)try{c=a.datepicker.parseDate(a.datepicker._get(d,"dateFormat"),d.input?d.input.val():null,a.datepicker._getFormatConfig(d)),c&&(a.datepicker._setDateFromField(d),a.datepicker._updateAlternate(d),a.datepicker._updateDatepicker(d))}catch(e){}return!0},_showDatepicker:function(b){if(b=b.target||b,"input"!==b.nodeName.toLowerCase()&&(b=a("input",b.parentNode)[0]),!a.datepicker._isDisabledDatepicker(b)&&a.datepicker._lastInput!==b){var c,d,f,g,h,i,j;c=a.datepicker._getInst(b),a.datepicker._curInst&&a.datepicker._curInst!==c&&(a.datepicker._curInst.dpDiv.stop(!0,!0),c&&a.datepicker._datepickerShowing&&a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])),d=a.datepicker._get(c,"beforeShow"),f=d?d.apply(b,[b,c]):{},f!==!1&&(e(c.settings,f),c.lastVal=null,a.datepicker._lastInput=b,a.datepicker._setDateFromField(c),a.datepicker._inDialog&&(b.value=""),a.datepicker._pos||(a.datepicker._pos=a.datepicker._findPos(b),a.datepicker._pos[1]+=b.offsetHeight),g=!1,a(b).parents().each(function(){return g|="fixed"===a(this).css("position"),!g}),h={left:a.datepicker._pos[0],top:a.datepicker._pos[1]},a.datepicker._pos=null,c.dpDiv.empty(),c.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),a.datepicker._updateDatepicker(c),h=a.datepicker._checkOffset(c,h,g),c.dpDiv.css({position:a.datepicker._inDialog&&a.blockUI?"static":g?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),c.inline||(i=a.datepicker._get(c,"showAnim"),j=a.datepicker._get(c,"duration"),c.dpDiv.zIndex(a(b).zIndex()+1),a.datepicker._datepickerShowing=!0,a.effects&&a.effects.effect[i]?c.dpDiv.show(i,a.datepicker._get(c,"showOptions"),j):c.dpDiv[i||"show"](i?j:null),a.datepicker._shouldFocusInput(c)&&c.input.focus(),a.datepicker._curInst=c))}},_updateDatepicker:function(b){this.maxRows=4,f=b,b.dpDiv.empty().append(this._generateHTML(b)),this._attachHandlers(b),b.dpDiv.find("."+this._dayOverClass+" a").mouseover();var c,d=this._getNumberOfMonths(b),e=d[1],g=17;b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),e>1&&b.dpDiv.addClass("ui-datepicker-multi-"+e).css("width",g*e+"em"),b.dpDiv[(1!==d[0]||1!==d[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),b.dpDiv[(this._get(b,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),b===a.datepicker._curInst&&a.datepicker._datepickerShowing&&a.datepicker._shouldFocusInput(b)&&b.input.focus(),b.yearshtml&&(c=b.yearshtml,setTimeout(function(){c===b.yearshtml&&b.yearshtml&&b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml),c=b.yearshtml=null},0))},_shouldFocusInput:function(a){return a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&!a.input.is(":focus")},_checkOffset:function(b,c,d){var e=b.dpDiv.outerWidth(),f=b.dpDiv.outerHeight(),g=b.input?b.input.outerWidth():0,h=b.input?b.input.outerHeight():0,i=document.documentElement.clientWidth+(d?0:a(document).scrollLeft()),j=document.documentElement.clientHeight+(d?0:a(document).scrollTop());return c.left-=this._get(b,"isRTL")?e-g:0,c.left-=d&&c.left===b.input.offset().left?a(document).scrollLeft():0,c.top-=d&&c.top===b.input.offset().top+h?a(document).scrollTop():0,c.left-=Math.min(c.left,c.left+e>i&&i>e?Math.abs(c.left+e-i):0),c.top-=Math.min(c.top,c.top+f>j&&j>f?Math.abs(f+h):0),c},_findPos:function(b){for(var c,d=this._getInst(b),e=this._get(d,"isRTL");b&&("hidden"===b.type||1!==b.nodeType||a.expr.filters.hidden(b));)b=b[e?"previousSibling":"nextSibling"];return c=a(b).offset(),[c.left,c.top]},_hideDatepicker:function(b){var c,d,e,f,h=this._curInst;!h||b&&h!==a.data(b,g)||this._datepickerShowing&&(c=this._get(h,"showAnim"),d=this._get(h,"duration"),e=function(){a.datepicker._tidyDialog(h)},a.effects&&(a.effects.effect[c]||a.effects[c])?h.dpDiv.hide(c,a.datepicker._get(h,"showOptions"),d,e):h.dpDiv["slideDown"===c?"slideUp":"fadeIn"===c?"fadeOut":"hide"](c?d:null,e),c||e(),this._datepickerShowing=!1,f=this._get(h,"onClose"),f&&f.apply(h.input?h.input[0]:null,[h.input?h.input.val():"",h]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),a.blockUI&&(a.unblockUI(),a("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(b){if(a.datepicker._curInst){var c=a(b.target),d=a.datepicker._getInst(c[0]);(c[0].id!==a.datepicker._mainDivId&&0===c.parents("#"+a.datepicker._mainDivId).length&&!c.hasClass(a.datepicker.markerClassName)&&!c.closest("."+a.datepicker._triggerClass).length&&a.datepicker._datepickerShowing&&(!a.datepicker._inDialog||!a.blockUI)||c.hasClass(a.datepicker.markerClassName)&&a.datepicker._curInst!==d)&&a.datepicker._hideDatepicker()}},_adjustDate:function(b,c,d){var e=a(b),f=this._getInst(e[0]);this._isDisabledDatepicker(e[0])||(this._adjustInstDate(f,c+("M"===d?this._get(f,"showCurrentAtPos"):0),d),this._updateDatepicker(f))},_gotoToday:function(b){var c,d=a(b),e=this._getInst(d[0]);this._get(e,"gotoCurrent")&&e.currentDay?(e.selectedDay=e.currentDay,e.drawMonth=e.selectedMonth=e.currentMonth,e.drawYear=e.selectedYear=e.currentYear):(c=new Date,e.selectedDay=c.getDate(),e.drawMonth=e.selectedMonth=c.getMonth(),e.drawYear=e.selectedYear=c.getFullYear()),this._notifyChange(e),this._adjustDate(d)},_selectMonthYear:function(b,c,d){var e=a(b),f=this._getInst(e[0]);f["selected"+("M"===d?"Month":"Year")]=f["draw"+("M"===d?"Month":"Year")]=parseInt(c.options[c.selectedIndex].value,10),this._notifyChange(f),this._adjustDate(e)},_selectDay:function(b,c,d,e){var f,g=a(b);a(e).hasClass(this._unselectableClass)||this._isDisabledDatepicker(g[0])||(f=this._getInst(g[0]),f.selectedDay=f.currentDay=a("a",e).html(),f.selectedMonth=f.currentMonth=c,f.selectedYear=f.currentYear=d,this._selectDate(b,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear)))},_clearDate:function(b){var c=a(b);this._selectDate(c,"")},_selectDate:function(b,c){var d,e=a(b),f=this._getInst(e[0]);c=null!=c?c:this._formatDate(f),f.input&&f.input.val(c),this._updateAlternate(f),d=this._get(f,"onSelect"),d?d.apply(f.input?f.input[0]:null,[c,f]):f.input&&f.input.trigger("change"),f.inline?this._updateDatepicker(f):(this._hideDatepicker(),this._lastInput=f.input[0],"object"!=typeof f.input[0]&&f.input.focus(),this._lastInput=null)},_updateAlternate:function(b){var c,d,e,f=this._get(b,"altField");f&&(c=this._get(b,"altFormat")||this._get(b,"dateFormat"),d=this._getDate(b),e=this.formatDate(c,d,this._getFormatConfig(b)),a(f).each(function(){a(this).val(e)}))},noWeekends:function(a){var b=a.getDay();return[b>0&&6>b,""]},iso8601Week:function(a){var b,c=new Date(a.getTime());return c.setDate(c.getDate()+4-(c.getDay()||7)),b=c.getTime(),c.setMonth(0),c.setDate(1),Math.floor(Math.round((b-c)/864e5)/7)+1},parseDate:function(b,c,d){if(null==b||null==c)throw"Invalid arguments";if(c="object"==typeof c?c.toString():c+"",""===c)return null;var e,f,g,h,i=0,j=(d?d.shortYearCutoff:null)||this._defaults.shortYearCutoff,k="string"!=typeof j?j:(new Date).getFullYear()%100+parseInt(j,10),l=(d?d.dayNamesShort:null)||this._defaults.dayNamesShort,m=(d?d.dayNames:null)||this._defaults.dayNames,n=(d?d.monthNamesShort:null)||this._defaults.monthNamesShort,o=(d?d.monthNames:null)||this._defaults.monthNames,p=-1,q=-1,r=-1,s=-1,t=!1,u=function(a){var c=e+1<b.length&&b.charAt(e+1)===a;return c&&e++,c},v=function(a){var b=u(a),d="@"===a?14:"!"===a?20:"y"===a&&b?4:"o"===a?3:2,e=new RegExp("^\\d{1,"+d+"}"),f=c.substring(i).match(e);if(!f)throw"Missing number at position "+i;return i+=f[0].length,parseInt(f[0],10)},w=function(b,d,e){var f=-1,g=a.map(u(b)?e:d,function(a,b){return[[b,a]]}).sort(function(a,b){return-(a[1].length-b[1].length)});if(a.each(g,function(a,b){var d=b[1];return c.substr(i,d.length).toLowerCase()===d.toLowerCase()?(f=b[0],i+=d.length,!1):void 0}),-1!==f)return f+1;throw"Unknown name at position "+i},x=function(){if(c.charAt(i)!==b.charAt(e))throw"Unexpected literal at position "+i;i++};for(e=0;e<b.length;e++)if(t)"'"!==b.charAt(e)||u("'")?x():t=!1;else switch(b.charAt(e)){case"d":r=v("d");break;case"D":w("D",l,m);break;case"o":s=v("o");break;case"m":q=v("m");break;case"M":q=w("M",n,o);break;case"y":p=v("y");break;case"@":h=new Date(v("@")),p=h.getFullYear(),q=h.getMonth()+1,r=h.getDate();break;case"!":h=new Date((v("!")-this._ticksTo1970)/1e4),p=h.getFullYear(),q=h.getMonth()+1,r=h.getDate();break;case"'":u("'")?x():t=!0;break;default:x()}if(i<c.length&&(g=c.substr(i),!/^\s+/.test(g)))throw"Extra/unparsed characters found in date: "+g;if(-1===p?p=(new Date).getFullYear():100>p&&(p+=(new Date).getFullYear()-(new Date).getFullYear()%100+(k>=p?0:-100)),s>-1)for(q=1,r=s;;){if(f=this._getDaysInMonth(p,q-1),f>=r)break;q++,r-=f}if(h=this._daylightSavingAdjust(new Date(p,q-1,r)),h.getFullYear()!==p||h.getMonth()+1!==q||h.getDate()!==r)throw"Invalid date";return h},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*60*60*1e7,formatDate:function(a,b,c){if(!b)return"";var d,e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,g=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,h=(c?c.monthNames:null)||this._defaults.monthNames,i=function(b){var c=d+1<a.length&&a.charAt(d+1)===b;return c&&d++,c},j=function(a,b,c){var d=""+b;if(i(a))for(;d.length<c;)d="0"+d;return d},k=function(a,b,c,d){return i(a)?d[b]:c[b]},l="",m=!1;if(b)for(d=0;d<a.length;d++)if(m)"'"!==a.charAt(d)||i("'")?l+=a.charAt(d):m=!1;else switch(a.charAt(d)){case"d":l+=j("d",b.getDate(),2);break;case"D":l+=k("D",b.getDay(),e,f);break;case"o":l+=j("o",Math.round((new Date(b.getFullYear(),b.getMonth(),b.getDate()).getTime()-new Date(b.getFullYear(),0,0).getTime())/864e5),3);break;case"m":l+=j("m",b.getMonth()+1,2);break;case"M":l+=k("M",b.getMonth(),g,h);break;case"y":l+=i("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case"@":l+=b.getTime();break;case"!":l+=1e4*b.getTime()+this._ticksTo1970;break;case"'":i("'")?l+="'":m=!0;break;default:l+=a.charAt(d)}return l},_possibleChars:function(a){var b,c="",d=!1,e=function(c){var d=b+1<a.length&&a.charAt(b+1)===c;return d&&b++,d};for(b=0;b<a.length;b++)if(d)"'"!==a.charAt(b)||e("'")?c+=a.charAt(b):d=!1;else switch(a.charAt(b)){case"d":case"m":case"y":case"@":c+="0123456789";break;case"D":case"M":return null;case"'":e("'")?c+="'":d=!0;break;default:c+=a.charAt(b)}return c},_get:function(a,c){return a.settings[c]!==b?a.settings[c]:this._defaults[c]},_setDateFromField:function(a,b){if(a.input.val()!==a.lastVal){var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e=this._getDefaultDate(a),f=e,g=this._getFormatConfig(a);try{f=this.parseDate(c,d,g)||e}catch(h){d=b?"":d}a.selectedDay=f.getDate(),a.drawMonth=a.selectedMonth=f.getMonth(),a.drawYear=a.selectedYear=f.getFullYear(),a.currentDay=d?f.getDate():0,a.currentMonth=d?f.getMonth():0,a.currentYear=d?f.getFullYear():0,this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(b,c,d){var e=function(a){var b=new Date;return b.setDate(b.getDate()+a),b},f=function(c){try{return a.datepicker.parseDate(a.datepicker._get(b,"dateFormat"),c,a.datepicker._getFormatConfig(b))}catch(d){}for(var e=(c.toLowerCase().match(/^c/)?a.datepicker._getDate(b):null)||new Date,f=e.getFullYear(),g=e.getMonth(),h=e.getDate(),i=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,j=i.exec(c);j;){switch(j[2]||"d"){case"d":case"D":h+=parseInt(j[1],10);break;case"w":case"W":h+=7*parseInt(j[1],10);break;case"m":case"M":g+=parseInt(j[1],10),h=Math.min(h,a.datepicker._getDaysInMonth(f,g));break;case"y":case"Y":f+=parseInt(j[1],10),h=Math.min(h,a.datepicker._getDaysInMonth(f,g))}j=i.exec(c)}return new Date(f,g,h)},g=null==c||""===c?d:"string"==typeof c?f(c):"number"==typeof c?isNaN(c)?d:e(c):new Date(c.getTime());return g=g&&"Invalid Date"===g.toString()?d:g,g&&(g.setHours(0),g.setMinutes(0),g.setSeconds(0),g.setMilliseconds(0)),this._daylightSavingAdjust(g)},_daylightSavingAdjust:function(a){return a?(a.setHours(a.getHours()>12?a.getHours()+2:0),a):null},_setDate:function(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear,g=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=a.currentDay=g.getDate(),a.drawMonth=a.selectedMonth=a.currentMonth=g.getMonth(),a.drawYear=a.selectedYear=a.currentYear=g.getFullYear(),e===a.selectedMonth&&f===a.selectedYear||c||this._notifyChange(a),this._adjustInstDate(a),a.input&&a.input.val(d?"":this._formatDate(a))},_getDate:function(a){var b=!a.currentYear||a.input&&""===a.input.val()?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return b},_attachHandlers:function(b){var c=this._get(b,"stepMonths"),d="#"+b.id.replace(/\\\\/g,"\\");b.dpDiv.find("[data-handler]").map(function(){var b={prev:function(){a.datepicker._adjustDate(d,-c,"M")},next:function(){a.datepicker._adjustDate(d,+c,"M")},hide:function(){a.datepicker._hideDatepicker()},today:function(){a.datepicker._gotoToday(d)},selectDay:function(){return a.datepicker._selectDay(d,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return a.datepicker._selectMonthYear(d,this,"M"),!1},selectYear:function(){return a.datepicker._selectMonthYear(d,this,"Y"),!1}};a(this).bind(this.getAttribute("data-event"),b[this.getAttribute("data-handler")])})},_generateHTML:function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O=new Date,P=this._daylightSavingAdjust(new Date(O.getFullYear(),O.getMonth(),O.getDate())),Q=this._get(a,"isRTL"),R=this._get(a,"showButtonPanel"),S=this._get(a,"hideIfNoPrevNext"),T=this._get(a,"navigationAsDateFormat"),U=this._getNumberOfMonths(a),V=this._get(a,"showCurrentAtPos"),W=this._get(a,"stepMonths"),X=1!==U[0]||1!==U[1],Y=this._daylightSavingAdjust(a.currentDay?new Date(a.currentYear,a.currentMonth,a.currentDay):new Date(9999,9,9)),Z=this._getMinMaxDate(a,"min"),$=this._getMinMaxDate(a,"max"),_=a.drawMonth-V,ab=a.drawYear;if(0>_&&(_+=12,ab--),$)for(b=this._daylightSavingAdjust(new Date($.getFullYear(),$.getMonth()-U[0]*U[1]+1,$.getDate())),b=Z&&Z>b?Z:b;this._daylightSavingAdjust(new Date(ab,_,1))>b;)_--,0>_&&(_=11,ab--);for(a.drawMonth=_,a.drawYear=ab,c=this._get(a,"prevText"),c=T?this.formatDate(c,this._daylightSavingAdjust(new Date(ab,_-W,1)),this._getFormatConfig(a)):c,d=this._canAdjustMonth(a,-1,ab,_)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+c+"'><span class='ui-icon ui-icon-circle-triangle-"+(Q?"e":"w")+"'>"+c+"</span></a>":S?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+c+"'><span class='ui-icon ui-icon-circle-triangle-"+(Q?"e":"w")+"'>"+c+"</span></a>",e=this._get(a,"nextText"),e=T?this.formatDate(e,this._daylightSavingAdjust(new Date(ab,_+W,1)),this._getFormatConfig(a)):e,f=this._canAdjustMonth(a,1,ab,_)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+e+"'><span class='ui-icon ui-icon-circle-triangle-"+(Q?"w":"e")+"'>"+e+"</span></a>":S?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+e+"'><span class='ui-icon ui-icon-circle-triangle-"+(Q?"w":"e")+"'>"+e+"</span></a>",g=this._get(a,"currentText"),h=this._get(a,"gotoCurrent")&&a.currentDay?Y:P,g=T?this.formatDate(g,h,this._getFormatConfig(a)):g,i=a.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(a,"closeText")+"</button>",j=R?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Q?i:"")+(this._isInRange(a,h)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+g+"</button>":"")+(Q?"":i)+"</div>":"",k=parseInt(this._get(a,"firstDay"),10),k=isNaN(k)?0:k,l=this._get(a,"showWeek"),m=this._get(a,"dayNames"),n=this._get(a,"dayNamesMin"),o=this._get(a,"monthNames"),p=this._get(a,"monthNamesShort"),q=this._get(a,"beforeShowDay"),r=this._get(a,"showOtherMonths"),s=this._get(a,"selectOtherMonths"),t=this._getDefaultDate(a),u="",w=0;w<U[0];w++){for(x="",this.maxRows=4,y=0;y<U[1];y++){if(z=this._daylightSavingAdjust(new Date(ab,_,a.selectedDay)),A=" ui-corner-all",B="",X){if(B+="<div class='ui-datepicker-group",U[1]>1)switch(y){case 0:B+=" ui-datepicker-group-first",A=" ui-corner-"+(Q?"right":"left");break;case U[1]-1:B+=" ui-datepicker-group-last",A=" ui-corner-"+(Q?"left":"right");break;default:B+=" ui-datepicker-group-middle",A=""}B+="'>"}for(B+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+A+"'>"+(/all|left/.test(A)&&0===w?Q?f:d:"")+(/all|right/.test(A)&&0===w?Q?d:f:"")+this._generateMonthYearHeader(a,_,ab,Z,$,w>0||y>0,o,p)+"</div><table class='ui-datepicker-calendar'><thead><tr>",C=l?"<th class='ui-datepicker-week-col'>"+this._get(a,"weekHeader")+"</th>":"",v=0;7>v;v++)D=(v+k)%7,C+="<th"+((v+k+6)%7>=5?" class='ui-datepicker-week-end'":"")+"><span title='"+m[D]+"'>"+n[D]+"</span></th>";for(B+=C+"</tr></thead><tbody>",E=this._getDaysInMonth(ab,_),ab===a.selectedYear&&_===a.selectedMonth&&(a.selectedDay=Math.min(a.selectedDay,E)),F=(this._getFirstDayOfMonth(ab,_)-k+7)%7,G=Math.ceil((F+E)/7),H=X&&this.maxRows>G?this.maxRows:G,this.maxRows=H,I=this._daylightSavingAdjust(new Date(ab,_,1-F)),J=0;H>J;J++){for(B+="<tr>",K=l?"<td class='ui-datepicker-week-col'>"+this._get(a,"calculateWeek")(I)+"</td>":"",v=0;7>v;v++)L=q?q.apply(a.input?a.input[0]:null,[I]):[!0,""],M=I.getMonth()!==_,N=M&&!s||!L[0]||Z&&Z>I||$&&I>$,K+="<td class='"+((v+k+6)%7>=5?" ui-datepicker-week-end":"")+(M?" ui-datepicker-other-month":"")+(I.getTime()===z.getTime()&&_===a.selectedMonth&&a._keyEvent||t.getTime()===I.getTime()&&t.getTime()===z.getTime()?" "+this._dayOverClass:"")+(N?" "+this._unselectableClass+" ui-state-disabled":"")+(M&&!r?"":" "+L[1]+(I.getTime()===Y.getTime()?" "+this._currentClass:"")+(I.getTime()===P.getTime()?" ui-datepicker-today":""))+"'"+(M&&!r||!L[2]?"":" title='"+L[2].replace(/'/g,"&#39;")+"'")+(N?"":" data-handler='selectDay' data-event='click' data-month='"+I.getMonth()+"' data-year='"+I.getFullYear()+"'")+">"+(M&&!r?"&#xa0;":N?"<span class='ui-state-default'>"+I.getDate()+"</span>":"<a class='ui-state-default"+(I.getTime()===P.getTime()?" ui-state-highlight":"")+(I.getTime()===Y.getTime()?" ui-state-active":"")+(M?" ui-priority-secondary":"")+"' href='#'>"+I.getDate()+"</a>")+"</td>",I.setDate(I.getDate()+1),I=this._daylightSavingAdjust(I);B+=K+"</tr>"}_++,_>11&&(_=0,ab++),B+="</tbody></table>"+(X?"</div>"+(U[0]>0&&y===U[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=B}u+=x}return u+=j,a._keyEvent=!1,u},_generateMonthYearHeader:function(a,b,c,d,e,f,g,h){var i,j,k,l,m,n,o,p,q=this._get(a,"changeMonth"),r=this._get(a,"changeYear"),s=this._get(a,"showMonthAfterYear"),t="<div class='ui-datepicker-title'>",u="";if(f||!q)u+="<span class='ui-datepicker-month'>"+g[b]+"</span>";else{for(i=d&&d.getFullYear()===c,j=e&&e.getFullYear()===c,u+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",k=0;12>k;k++)(!i||k>=d.getMonth())&&(!j||k<=e.getMonth())&&(u+="<option value='"+k+"'"+(k===b?" selected='selected'":"")+">"+h[k]+"</option>");u+="</select>"}if(s||(t+=u+(!f&&q&&r?"":"&#xa0;")),!a.yearshtml)if(a.yearshtml="",f||!r)t+="<span class='ui-datepicker-year'>"+c+"</span>";else{for(l=this._get(a,"yearRange").split(":"),m=(new Date).getFullYear(),n=function(a){var b=a.match(/c[+\-].*/)?c+parseInt(a.substring(1),10):a.match(/[+\-].*/)?m+parseInt(a,10):parseInt(a,10);
return isNaN(b)?m:b},o=n(l[0]),p=Math.max(o,n(l[1]||"")),o=d?Math.max(o,d.getFullYear()):o,p=e?Math.min(p,e.getFullYear()):p,a.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";p>=o;o++)a.yearshtml+="<option value='"+o+"'"+(o===c?" selected='selected'":"")+">"+o+"</option>";a.yearshtml+="</select>",t+=a.yearshtml,a.yearshtml=null}return t+=this._get(a,"yearSuffix"),s&&(t+=(!f&&q&&r?"":"&#xa0;")+u),t+="</div>"},_adjustInstDate:function(a,b,c){var d=a.drawYear+("Y"===c?b:0),e=a.drawMonth+("M"===c?b:0),f=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+("D"===c?b:0),g=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,f)));a.selectedDay=g.getDate(),a.drawMonth=a.selectedMonth=g.getMonth(),a.drawYear=a.selectedYear=g.getFullYear(),("M"===c||"Y"===c)&&this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max"),e=c&&c>b?c:b;return d&&e>d?d:e},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");b&&b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){var b=this._get(a,"numberOfMonths");return null==b?[1,1]:"number"==typeof b?[1,b]:b},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return new Date(a,b,1).getDay()},_canAdjustMonth:function(a,b,c,d){var e=this._getNumberOfMonths(a),f=this._daylightSavingAdjust(new Date(c,d+(0>b?b:e[0]*e[1]),1));return 0>b&&f.setDate(this._getDaysInMonth(f.getFullYear(),f.getMonth())),this._isInRange(a,f)},_isInRange:function(a,b){var c,d,e=this._getMinMaxDate(a,"min"),f=this._getMinMaxDate(a,"max"),g=null,h=null,i=this._get(a,"yearRange");return i&&(c=i.split(":"),d=(new Date).getFullYear(),g=parseInt(c[0],10),h=parseInt(c[1],10),c[0].match(/[+\-].*/)&&(g+=d),c[1].match(/[+\-].*/)&&(h+=d)),(!e||b.getTime()>=e.getTime())&&(!f||b.getTime()<=f.getTime())&&(!g||b.getFullYear()>=g)&&(!h||b.getFullYear()<=h)},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");return b="string"!=typeof b?b:(new Date).getFullYear()%100+parseInt(b,10),{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,d){b||(a.currentDay=a.selectedDay,a.currentMonth=a.selectedMonth,a.currentYear=a.selectedYear);var e=b?"object"==typeof b?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),e,this._getFormatConfig(a))}}),a.fn.datepicker=function(b){if(!this.length)return this;a.datepicker.initialized||(a(document).mousedown(a.datepicker._checkExternalClick),a.datepicker.initialized=!0),0===a("#"+a.datepicker._mainDivId).length&&a("body").append(a.datepicker.dpDiv);var c=Array.prototype.slice.call(arguments,1);return"string"!=typeof b||"isDisabled"!==b&&"getDate"!==b&&"widget"!==b?"option"===b&&2===arguments.length&&"string"==typeof arguments[1]?a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(c)):this.each(function(){"string"==typeof b?a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this].concat(c)):a.datepicker._attachDatepicker(this,b)}):a.datepicker["_"+b+"Datepicker"].apply(a.datepicker,[this[0]].concat(c))},a.datepicker=new c,a.datepicker.initialized=!1,a.datepicker.uuid=(new Date).getTime(),a.datepicker.version="1.10.4"}(jQuery),/*!
 * jQuery UI Slider 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
function(a){var b=5;a.widget("ui.slider",a.ui.mouse,{version:"1.10.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var b,c,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=[];for(c=d.values&&d.values.length||1,e.length>c&&(e.slice(c).remove(),e=e.slice(0,c)),b=e.length;c>b;b++)g.push(f);this.handles=e.add(a(g.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(b){a(this).data("ui-slider-handle-index",b)})},_createRange:function(){var b=this.options,c="";b.range?(b.range===!0&&(b.values?b.values.length&&2!==b.values.length?b.values=[b.values[0],b.values[0]]:a.isArray(b.values)&&(b.values=b.values.slice(0)):b.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=a("<div></div>").appendTo(this.element),c="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(c+("min"===b.range||"max"===b.range?" ui-slider-range-"+b.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){var a=this.handles.add(this.range).filter("a");this._off(a),this._on(a,this._handleEvents),this._hoverable(a),this._focusable(a)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(b){var c,d,e,f,g,h,i,j,k=this,l=this.options;return l.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),c={x:b.pageX,y:b.pageY},d=this._normValueFromMouse(c),e=this._valueMax()-this._valueMin()+1,this.handles.each(function(b){var c=Math.abs(d-k.values(b));(e>c||e===c&&(b===k._lastChangedValue||k.values(b)===l.min))&&(e=c,f=a(this),g=b)}),h=this._start(b,g),h===!1?!1:(this._mouseSliding=!0,this._handleIndex=g,f.addClass("ui-state-active").focus(),i=f.offset(),j=!a(b.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=j?{left:0,top:0}:{left:b.pageX-i.left-f.width()/2,top:b.pageY-i.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,g,d),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1},_mouseStop:function(a){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;return"horizontal"===this.orientation?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),0>d&&(d=0),"vertical"===this.orientation&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};return this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),2===this.options.values.length&&this.options.range===!0&&(0===b&&c>d||1===b&&d>c)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._lastChangedValue=b,this._trigger("change",a,c)}},value:function(a){return arguments.length?(this.options.value=this._trimAlignValue(a),this._refreshValue(),void this._change(null,0)):this._value()},values:function(b,c){var d,e,f;if(arguments.length>1)return this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),void this._change(null,b);if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();for(d=this.options.values,e=arguments[0],f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()},_setOption:function(b,c){var d,e=0;switch("range"===b&&this.options.range===!0&&("min"===c?(this.options.value=this._values(0),this.options.values=null):"max"===c&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments),b){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),d=0;e>d;d+=1)this._change(null,d);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b);if(this.options.values&&this.options.values.length){for(c=this.options.values.slice(),d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c}return[]},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return 2*Math.abs(c)>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b,c,d,e,f,g=this.options.range,h=this.options,i=this,j=this._animateOff?!1:h.animate,k={};this.options.values&&this.options.values.length?this.handles.each(function(d){c=(i.values(d)-i._valueMin())/(i._valueMax()-i._valueMin())*100,k["horizontal"===i.orientation?"left":"bottom"]=c+"%",a(this).stop(1,1)[j?"animate":"css"](k,h.animate),i.options.range===!0&&("horizontal"===i.orientation?(0===d&&i.range.stop(1,1)[j?"animate":"css"]({left:c+"%"},h.animate),1===d&&i.range[j?"animate":"css"]({width:c-b+"%"},{queue:!1,duration:h.animate})):(0===d&&i.range.stop(1,1)[j?"animate":"css"]({bottom:c+"%"},h.animate),1===d&&i.range[j?"animate":"css"]({height:c-b+"%"},{queue:!1,duration:h.animate}))),b=c}):(d=this.value(),e=this._valueMin(),f=this._valueMax(),c=f!==e?(d-e)/(f-e)*100:0,k["horizontal"===this.orientation?"left":"bottom"]=c+"%",this.handle.stop(1,1)[j?"animate":"css"](k,h.animate),"min"===g&&"horizontal"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({width:c+"%"},h.animate),"max"===g&&"horizontal"===this.orientation&&this.range[j?"animate":"css"]({width:100-c+"%"},{queue:!1,duration:h.animate}),"min"===g&&"vertical"===this.orientation&&this.range.stop(1,1)[j?"animate":"css"]({height:c+"%"},h.animate),"max"===g&&"vertical"===this.orientation&&this.range[j?"animate":"css"]({height:100-c+"%"},{queue:!1,duration:h.animate}))},_handleEvents:{keydown:function(c){var d,e,f,g,h=a(c.target).data("ui-slider-handle-index");switch(c.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(c.preventDefault(),!this._keySliding&&(this._keySliding=!0,a(c.target).addClass("ui-state-active"),d=this._start(c,h),d===!1))return}switch(g=this.options.step,e=f=this.options.values&&this.options.values.length?this.values(h):this.value(),c.keyCode){case a.ui.keyCode.HOME:f=this._valueMin();break;case a.ui.keyCode.END:f=this._valueMax();break;case a.ui.keyCode.PAGE_UP:f=this._trimAlignValue(e+(this._valueMax()-this._valueMin())/b);break;case a.ui.keyCode.PAGE_DOWN:f=this._trimAlignValue(e-(this._valueMax()-this._valueMin())/b);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(e===this._valueMax())return;f=this._trimAlignValue(e+g);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(e===this._valueMin())return;f=this._trimAlignValue(e-g)}this._slide(c,h,f)},click:function(a){a.preventDefault()},keyup:function(b){var c=a(b.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(b,c),this._change(b,c),a(b.target).removeClass("ui-state-active"))}}})}(jQuery),/*!
 * jQuery UI Spinner 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/spinner/
 *
 * Depends:
 *  jquery.ui.core.js
 *  jquery.ui.widget.js
 *  jquery.ui.button.js
 */
function(a){function b(a){return function(){var b=this.element.val();a.apply(this,arguments),this._refresh(),b!==this.element.val()&&this._trigger("change")}}a.widget("ui.spinner",{version:"1.10.4",defaultElement:"<input>",widgetEventPrefix:"spin",options:{culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var b={},c=this.element;return a.each(["min","max","step"],function(a,d){var e=c.attr(d);void 0!==e&&e.length&&(b[d]=e)}),b},_events:{keydown:function(a){this._start(a)&&this._keydown(a)&&a.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(a){return this.cancelBlur?void delete this.cancelBlur:(this._stop(),this._refresh(),void(this.previous!==this.element.val()&&this._trigger("change",a)))},mousewheel:function(a,b){if(b){if(!this.spinning&&!this._start(a))return!1;this._spin((b>0?1:-1)*this.options.step,a),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(a)},100),a.preventDefault()}},"mousedown .ui-spinner-button":function(b){function c(){var a=this.element[0]===this.document[0].activeElement;a||(this.element.focus(),this.previous=d,this._delay(function(){this.previous=d}))}var d;d=this.element[0]===this.document[0].activeElement?this.previous:this.element.val(),b.preventDefault(),c.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,c.call(this)}),this._start(b)!==!1&&this._repeat(null,a(b.currentTarget).hasClass("ui-spinner-up")?1:-1,b)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(b){return a(b.currentTarget).hasClass("ui-state-active")?this._start(b)===!1?!1:void this._repeat(null,a(b.currentTarget).hasClass("ui-spinner-up")?1:-1,b):void 0},"mouseleave .ui-spinner-button":"_stop"},_draw:function(){var a=this.uiSpinner=this.element.addClass("ui-spinner-input").attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());this.element.attr("role","spinbutton"),this.buttons=a.find(".ui-spinner-button").attr("tabIndex",-1).button().removeClass("ui-corner-all"),this.buttons.height()>Math.ceil(.5*a.height())&&a.height()>0&&a.height(a.height()),this.options.disabled&&this.disable()},_keydown:function(b){var c=this.options,d=a.ui.keyCode;switch(b.keyCode){case d.UP:return this._repeat(null,1,b),!0;case d.DOWN:return this._repeat(null,-1,b),!0;case d.PAGE_UP:return this._repeat(null,c.page,b),!0;case d.PAGE_DOWN:return this._repeat(null,-c.page,b),!0}return!1},_uiSpinnerHtml:function(){return"<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"},_buttonHtml:function(){return"<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon "+this.options.icons.up+"'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon "+this.options.icons.down+"'>&#9660;</span></a>"},_start:function(a){return this.spinning||this._trigger("start",a)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(a,b,c){a=a||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,b,c)},a),this._spin(b*this.options.step,c)},_spin:function(a,b){var c=this.value()||0;this.counter||(this.counter=1),c=this._adjustValue(c+a*this._increment(this.counter)),this.spinning&&this._trigger("spin",b,{value:c})===!1||(this._value(c),this.counter++)},_increment:function(b){var c=this.options.incremental;return c?a.isFunction(c)?c(b):Math.floor(b*b*b/5e4-b*b/500+17*b/200+1):1},_precision:function(){var a=this._precisionOf(this.options.step);return null!==this.options.min&&(a=Math.max(a,this._precisionOf(this.options.min))),a},_precisionOf:function(a){var b=a.toString(),c=b.indexOf(".");return-1===c?0:b.length-c-1},_adjustValue:function(a){var b,c,d=this.options;return b=null!==d.min?d.min:0,c=a-b,c=Math.round(c/d.step)*d.step,a=b+c,a=parseFloat(a.toFixed(this._precision())),null!==d.max&&a>d.max?d.max:null!==d.min&&a<d.min?d.min:a},_stop:function(a){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",a))},_setOption:function(a,b){if("culture"===a||"numberFormat"===a){var c=this._parse(this.element.val());return this.options[a]=b,void this.element.val(this._format(c))}("max"===a||"min"===a||"step"===a)&&"string"==typeof b&&(b=this._parse(b)),"icons"===a&&(this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(b.up),this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(b.down)),this._super(a,b),"disabled"===a&&(b?(this.element.prop("disabled",!0),this.buttons.button("disable")):(this.element.prop("disabled",!1),this.buttons.button("enable")))},_setOptions:b(function(a){this._super(a),this._value(this.element.val())}),_parse:function(a){return"string"==typeof a&&""!==a&&(a=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(a,10,this.options.culture):+a),""===a||isNaN(a)?null:a},_format:function(a){return""===a?"":window.Globalize&&this.options.numberFormat?Globalize.format(a,this.options.numberFormat,this.options.culture):a},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},_value:function(a,b){var c;""!==a&&(c=this._parse(a),null!==c&&(b||(c=this._adjustValue(c)),a=this._format(c))),this.element.val(a),this._refresh()},_destroy:function(){this.element.removeClass("ui-spinner-input").prop("disabled",!1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:b(function(a){this._stepUp(a)}),_stepUp:function(a){this._start()&&(this._spin((a||1)*this.options.step),this._stop())},stepDown:b(function(a){this._stepDown(a)}),_stepDown:function(a){this._start()&&(this._spin((a||1)*-this.options.step),this._stop())},pageUp:b(function(a){this._stepUp((a||1)*this.options.page)}),pageDown:b(function(a){this._stepDown((a||1)*this.options.page)}),value:function(a){return arguments.length?void b(this._value).call(this,a):this._parse(this.element.val())},widget:function(){return this.uiSpinner}})}(jQuery),/*!
 * jQuery UI Effects 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
function(a,b){var c="ui-effects-";a.effects={effect:{}},/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
function(a,b){function c(a,b,c){var d=l[b.type]||{};return null==a?c||!b.def?null:b.def:(a=d.floor?~~a:parseFloat(a),isNaN(a)?b.def:d.mod?(a+d.mod)%d.mod:0>a?0:d.max<a?d.max:a)}function d(b){var c=j(),d=c._rgba=[];return b=b.toLowerCase(),o(i,function(a,e){var f,g=e.re.exec(b),h=g&&e.parse(g),i=e.space||"rgba";return h?(f=c[i](h),c[k[i].cache]=f[k[i].cache],d=c._rgba=f._rgba,!1):void 0}),d.length?("0,0,0,0"===d.join()&&a.extend(d,f.transparent),c):f[b]}function e(a,b,c){return c=(c+1)%1,1>6*c?a+(b-a)*c*6:1>2*c?b:2>3*c?a+(b-a)*(2/3-c)*6:a}var f,g="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",h=/^([\-+])=\s*(\d+\.?\d*)/,i=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[a[1],a[2],a[3],a[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(a){return[2.55*a[1],2.55*a[2],2.55*a[3],a[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(a){return[a[1],a[2]/100,a[3]/100,a[4]]}}],j=a.Color=function(b,c,d,e){return new a.Color.fn.parse(b,c,d,e)},k={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},l={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},m=j.support={},n=a("<p>")[0],o=a.each;n.style.cssText="background-color:rgba(1,1,1,.5)",m.rgba=n.style.backgroundColor.indexOf("rgba")>-1,o(k,function(a,b){b.cache="_"+a,b.props.alpha={idx:3,type:"percent",def:1}}),j.fn=a.extend(j.prototype,{parse:function(e,g,h,i){if(e===b)return this._rgba=[null,null,null,null],this;(e.jquery||e.nodeType)&&(e=a(e).css(g),g=b);var l=this,m=a.type(e),n=this._rgba=[];return g!==b&&(e=[e,g,h,i],m="array"),"string"===m?this.parse(d(e)||f._default):"array"===m?(o(k.rgba.props,function(a,b){n[b.idx]=c(e[b.idx],b)}),this):"object"===m?(e instanceof j?o(k,function(a,b){e[b.cache]&&(l[b.cache]=e[b.cache].slice())}):o(k,function(b,d){var f=d.cache;o(d.props,function(a,b){if(!l[f]&&d.to){if("alpha"===a||null==e[a])return;l[f]=d.to(l._rgba)}l[f][b.idx]=c(e[a],b,!0)}),l[f]&&a.inArray(null,l[f].slice(0,3))<0&&(l[f][3]=1,d.from&&(l._rgba=d.from(l[f])))}),this):void 0},is:function(a){var b=j(a),c=!0,d=this;return o(k,function(a,e){var f,g=b[e.cache];return g&&(f=d[e.cache]||e.to&&e.to(d._rgba)||[],o(e.props,function(a,b){return null!=g[b.idx]?c=g[b.idx]===f[b.idx]:void 0})),c}),c},_space:function(){var a=[],b=this;return o(k,function(c,d){b[d.cache]&&a.push(c)}),a.pop()},transition:function(a,b){var d=j(a),e=d._space(),f=k[e],g=0===this.alpha()?j("transparent"):this,h=g[f.cache]||f.to(g._rgba),i=h.slice();return d=d[f.cache],o(f.props,function(a,e){var f=e.idx,g=h[f],j=d[f],k=l[e.type]||{};null!==j&&(null===g?i[f]=j:(k.mod&&(j-g>k.mod/2?g+=k.mod:g-j>k.mod/2&&(g-=k.mod)),i[f]=c((j-g)*b+g,e)))}),this[e](i)},blend:function(b){if(1===this._rgba[3])return this;var c=this._rgba.slice(),d=c.pop(),e=j(b)._rgba;return j(a.map(c,function(a,b){return(1-d)*e[b]+d*a}))},toRgbaString:function(){var b="rgba(",c=a.map(this._rgba,function(a,b){return null==a?b>2?1:0:a});return 1===c[3]&&(c.pop(),b="rgb("),b+c.join()+")"},toHslaString:function(){var b="hsla(",c=a.map(this.hsla(),function(a,b){return null==a&&(a=b>2?1:0),b&&3>b&&(a=Math.round(100*a)+"%"),a});return 1===c[3]&&(c.pop(),b="hsl("),b+c.join()+")"},toHexString:function(b){var c=this._rgba.slice(),d=c.pop();return b&&c.push(~~(255*d)),"#"+a.map(c,function(a){return a=(a||0).toString(16),1===a.length?"0"+a:a}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),j.fn.parse.prototype=j.fn,k.hsla.to=function(a){if(null==a[0]||null==a[1]||null==a[2])return[null,null,null,a[3]];var b,c,d=a[0]/255,e=a[1]/255,f=a[2]/255,g=a[3],h=Math.max(d,e,f),i=Math.min(d,e,f),j=h-i,k=h+i,l=.5*k;return b=i===h?0:d===h?60*(e-f)/j+360:e===h?60*(f-d)/j+120:60*(d-e)/j+240,c=0===j?0:.5>=l?j/k:j/(2-k),[Math.round(b)%360,c,l,null==g?1:g]},k.hsla.from=function(a){if(null==a[0]||null==a[1]||null==a[2])return[null,null,null,a[3]];var b=a[0]/360,c=a[1],d=a[2],f=a[3],g=.5>=d?d*(1+c):d+c-d*c,h=2*d-g;return[Math.round(255*e(h,g,b+1/3)),Math.round(255*e(h,g,b)),Math.round(255*e(h,g,b-1/3)),f]},o(k,function(d,e){var f=e.props,g=e.cache,i=e.to,k=e.from;j.fn[d]=function(d){if(i&&!this[g]&&(this[g]=i(this._rgba)),d===b)return this[g].slice();var e,h=a.type(d),l="array"===h||"object"===h?d:arguments,m=this[g].slice();return o(f,function(a,b){var d=l["object"===h?a:b.idx];null==d&&(d=m[b.idx]),m[b.idx]=c(d,b)}),k?(e=j(k(m)),e[g]=m,e):j(m)},o(f,function(b,c){j.fn[b]||(j.fn[b]=function(e){var f,g=a.type(e),i="alpha"===b?this._hsla?"hsla":"rgba":d,j=this[i](),k=j[c.idx];return"undefined"===g?k:("function"===g&&(e=e.call(this,k),g=a.type(e)),null==e&&c.empty?this:("string"===g&&(f=h.exec(e),f&&(e=k+parseFloat(f[2])*("+"===f[1]?1:-1))),j[c.idx]=e,this[i](j)))})})}),j.hook=function(b){var c=b.split(" ");o(c,function(b,c){a.cssHooks[c]={set:function(b,e){var f,g,h="";if("transparent"!==e&&("string"!==a.type(e)||(f=d(e)))){if(e=j(f||e),!m.rgba&&1!==e._rgba[3]){for(g="backgroundColor"===c?b.parentNode:b;(""===h||"transparent"===h)&&g&&g.style;)try{h=a.css(g,"backgroundColor"),g=g.parentNode}catch(i){}e=e.blend(h&&"transparent"!==h?h:"_default")}e=e.toRgbaString()}try{b.style[c]=e}catch(i){}}},a.fx.step[c]=function(b){b.colorInit||(b.start=j(b.elem,c),b.end=j(b.end),b.colorInit=!0),a.cssHooks[c].set(b.elem,b.start.transition(b.end,b.pos))}})},j.hook(g),a.cssHooks.borderColor={expand:function(a){var b={};return o(["Top","Right","Bottom","Left"],function(c,d){b["border"+d+"Color"]=a}),b}},f=a.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function c(b){var c,d,e=b.ownerDocument.defaultView?b.ownerDocument.defaultView.getComputedStyle(b,null):b.currentStyle,f={};if(e&&e.length&&e[0]&&e[e[0]])for(d=e.length;d--;)c=e[d],"string"==typeof e[c]&&(f[a.camelCase(c)]=e[c]);else for(c in e)"string"==typeof e[c]&&(f[c]=e[c]);return f}function d(b,c){var d,e,g={};for(d in c)e=c[d],b[d]!==e&&(f[d]||(a.fx.step[d]||!isNaN(parseFloat(e)))&&(g[d]=e));return g}var e=["add","remove","toggle"],f={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(b,c){a.fx.step[c]=function(a){("none"!==a.end&&!a.setAttr||1===a.pos&&!a.setAttr)&&(jQuery.style(a.elem,c,a.end),a.setAttr=!0)}}),a.fn.addBack||(a.fn.addBack=function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}),a.effects.animateClass=function(b,f,g,h){var i=a.speed(f,g,h);return this.queue(function(){var f,g=a(this),h=g.attr("class")||"",j=i.children?g.find("*").addBack():g;j=j.map(function(){var b=a(this);return{el:b,start:c(this)}}),f=function(){a.each(e,function(a,c){b[c]&&g[c+"Class"](b[c])})},f(),j=j.map(function(){return this.end=c(this.el[0]),this.diff=d(this.start,this.end),this}),g.attr("class",h),j=j.map(function(){var b=this,c=a.Deferred(),d=a.extend({},i,{queue:!1,complete:function(){c.resolve(b)}});return this.el.animate(this.diff,d),c.promise()}),a.when.apply(a,j.get()).done(function(){f(),a.each(arguments,function(){var b=this.el;a.each(this.diff,function(a){b.css(a,"")})}),i.complete.call(g[0])})})},a.fn.extend({addClass:function(b){return function(c,d,e,f){return d?a.effects.animateClass.call(this,{add:c},d,e,f):b.apply(this,arguments)}}(a.fn.addClass),removeClass:function(b){return function(c,d,e,f){return arguments.length>1?a.effects.animateClass.call(this,{remove:c},d,e,f):b.apply(this,arguments)}}(a.fn.removeClass),toggleClass:function(c){return function(d,e,f,g,h){return"boolean"==typeof e||e===b?f?a.effects.animateClass.call(this,e?{add:d}:{remove:d},f,g,h):c.apply(this,arguments):a.effects.animateClass.call(this,{toggle:d},e,f,g)}}(a.fn.toggleClass),switchClass:function(b,c,d,e,f){return a.effects.animateClass.call(this,{add:c,remove:b},d,e,f)}})}(),function(){function d(b,c,d,e){return a.isPlainObject(b)&&(c=b,b=b.effect),b={effect:b},null==c&&(c={}),a.isFunction(c)&&(e=c,d=null,c={}),("number"==typeof c||a.fx.speeds[c])&&(e=d,d=c,c={}),a.isFunction(d)&&(e=d,d=null),c&&a.extend(b,c),d=d||c.duration,b.duration=a.fx.off?0:"number"==typeof d?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,b.complete=e||c.complete,b}function e(b){return!b||"number"==typeof b||a.fx.speeds[b]?!0:"string"!=typeof b||a.effects.effect[b]?a.isFunction(b)?!0:"object"!=typeof b||b.effect?!1:!0:!0}a.extend(a.effects,{version:"1.10.4",save:function(a,b){for(var d=0;d<b.length;d++)null!==b[d]&&a.data(c+b[d],a[0].style[b[d]])},restore:function(a,d){var e,f;for(f=0;f<d.length;f++)null!==d[f]&&(e=a.data(c+d[f]),e===b&&(e=""),a.css(d[f],e))},setMode:function(a,b){return"toggle"===b&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e={width:b.width(),height:b.height()},f=document.activeElement;try{f.id}catch(g){f=document.body}return b.wrap(d),(b[0]===f||a.contains(b[0],f))&&a(f).focus(),d=b.parent(),"static"===b.css("position")?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),b.css(e),d.css(c).show()},removeWrapper:function(b){var c=document.activeElement;return b.parent().is(".ui-effects-wrapper")&&(b.parent().replaceWith(b),(b[0]===c||a.contains(b[0],c))&&a(c).focus()),b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(){function b(b){function d(){a.isFunction(f)&&f.call(e[0]),a.isFunction(b)&&b()}var e=a(this),f=c.complete,h=c.mode;(e.is(":hidden")?"hide"===h:"show"===h)?(e[h](),d()):g.call(e[0],c,d)}var c=d.apply(this,arguments),e=c.mode,f=c.queue,g=a.effects.effect[c.effect];return a.fx.off||!g?e?this[e](c.duration,c.complete):this.each(function(){c.complete&&c.complete.call(this)}):f===!1?this.each(b):this.queue(f||"fx",b)},show:function(a){return function(b){if(e(b))return a.apply(this,arguments);var c=d.apply(this,arguments);return c.mode="show",this.effect.call(this,c)}}(a.fn.show),hide:function(a){return function(b){if(e(b))return a.apply(this,arguments);var c=d.apply(this,arguments);return c.mode="hide",this.effect.call(this,c)}}(a.fn.hide),toggle:function(a){return function(b){if(e(b)||"boolean"==typeof b)return a.apply(this,arguments);var c=d.apply(this,arguments);return c.mode="toggle",this.effect.call(this,c)}}(a.fn.toggle),cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}})}(),function(){var b={};a.each(["Quad","Cubic","Quart","Quint","Expo"],function(a,c){b[c]=function(b){return Math.pow(b,a+2)}}),a.extend(b,{Sine:function(a){return 1-Math.cos(a*Math.PI/2)},Circ:function(a){return 1-Math.sqrt(1-a*a)},Elastic:function(a){return 0===a||1===a?a:-Math.pow(2,8*(a-1))*Math.sin((80*(a-1)-7.5)*Math.PI/15)},Back:function(a){return a*a*(3*a-2)},Bounce:function(a){for(var b,c=4;a<((b=Math.pow(2,--c))-1)/11;);return 1/Math.pow(4,3-c)-7.5625*Math.pow((3*b-2)/22-a,2)}}),a.each(b,function(b,c){a.easing["easeIn"+b]=c,a.easing["easeOut"+b]=function(a){return 1-c(1-a)},a.easing["easeInOut"+b]=function(a){return.5>a?c(2*a)/2:1-c(-2*a+2)/2}})}()}(jQuery),/*!
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
function(a){function b(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var c,d=a.ui.mouse.prototype,e=d._mouseInit;d._touchStart=function(a){var d=this;!c&&d._mouseCapture(a.originalEvent.changedTouches[0])&&(c=!0,d._touchMoved=!1,b(a,"mouseover"),b(a,"mousemove"),b(a,"mousedown"))},d._touchMove=function(a){c&&(this._touchMoved=!0,b(a,"mousemove"))},d._touchEnd=function(a){c&&(b(a,"mouseup"),b(a,"mouseout"),this._touchMoved||b(a,"click"),c=!1)},d._mouseInit=function(){var b=this;b.element.bind("touchstart",a.proxy(b,"_touchStart")).bind("touchmove",a.proxy(b,"_touchMove")).bind("touchend",a.proxy(b,"_touchEnd")),e.call(b)}}}(jQuery),"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.1",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.1",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c="prev"==a?-1:1,d=this.getItemIndex(b),e=(d+c)%this.$items.length;return this.$items.eq(e)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i="next"==b?"first":"last",j=this;if(!f.length){if(!this.options.wrap)return;f=this.$element.find(".item")[i]()}if(f.hasClass("active"))return this.sliding=!1;var k=f[0],l=a.Event("slide.bs.carousel",{relatedTarget:k,direction:h});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var m=a(this.$indicators.children()[this.getItemIndex(f)]);m&&m.addClass("active")}var n=a.Event("slid.bs.carousel",{relatedTarget:k,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),j.sliding=!1,setTimeout(function(){j.$element.trigger(n)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(n)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&"show"==b&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a(this.options.trigger).filter('[href="#'+b.id+'"], [data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.1",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.find("> .panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":a.extend({},e.data(),{trigger:this});c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.1",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.divider):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.1",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.options.backdrop&&d.adjustBackdrop(),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$element.find(".modal-dialog").one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},c.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.tooltip",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.1",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=this.tip(),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b,g=f&&f.selector;(e||"destroy"!=b)&&(g?(e||d.data("bs.popover",e={}),e[g]||(e[g]=new c(this,f))):e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.1",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},c.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){var e=a.proxy(this.process,this);this.$body=a("body"),this.$scrollElement=a(a(c).is("body")?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",e),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.1",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b="offset",c=0;a.isWindow(this.$scrollElement[0])||(b="position",c=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var d=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+c,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){d.offsets.push(this[0]),d.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this
},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.1",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.1",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=i?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a("body").height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery),function(){var a=[].slice;!function(b,c){"use strict";var d;return d=function(){function a(a,c){null==c&&(c={}),this.$element=b(a),this.options=b.extend({},b.fn.bootstrapSwitch.defaults,{state:this.$element.is(":checked"),size:this.$element.data("size"),animate:this.$element.data("animate"),disabled:this.$element.is(":disabled"),readonly:this.$element.is("[readonly]"),indeterminate:this.$element.data("indeterminate"),onColor:this.$element.data("on-color"),offColor:this.$element.data("off-color"),onText:this.$element.data("on-text"),offText:this.$element.data("off-text"),labelText:this.$element.data("label-text"),baseClass:this.$element.data("base-class"),wrapperClass:this.$element.data("wrapper-class"),radioAllOff:this.$element.data("radio-all-off")},c),this.$wrapper=b("<div>",{"class":function(a){return function(){var b;return b=[""+a.options.baseClass].concat(a._getClasses(a.options.wrapperClass)),b.push(a.options.state?""+a.options.baseClass+"-on":""+a.options.baseClass+"-off"),null!=a.options.size&&b.push(""+a.options.baseClass+"-"+a.options.size),a.options.animate&&b.push(""+a.options.baseClass+"-animate"),a.options.disabled&&b.push(""+a.options.baseClass+"-disabled"),a.options.readonly&&b.push(""+a.options.baseClass+"-readonly"),a.options.indeterminate&&b.push(""+a.options.baseClass+"-indeterminate"),a.$element.attr("id")&&b.push(""+a.options.baseClass+"-id-"+a.$element.attr("id")),b.join(" ")}}(this)()}),this.$container=b("<div>",{"class":""+this.options.baseClass+"-container"}),this.$on=b("<span>",{html:this.options.onText,"class":""+this.options.baseClass+"-handle-on "+this.options.baseClass+"-"+this.options.onColor}),this.$off=b("<span>",{html:this.options.offText,"class":""+this.options.baseClass+"-handle-off "+this.options.baseClass+"-"+this.options.offColor}),this.$label=b("<label>",{html:this.options.labelText,"class":""+this.options.baseClass+"-label"}),this.options.indeterminate&&this.$element.prop("indeterminate",!0),this.$element.on("init.bootstrapSwitch",function(b){return function(){return b.options.onInit.apply(a,arguments)}}(this)),this.$element.on("switchChange.bootstrapSwitch",function(b){return function(){return b.options.onSwitchChange.apply(a,arguments)}}(this)),this.$container=this.$element.wrap(this.$container).parent(),this.$wrapper=this.$container.wrap(this.$wrapper).parent(),this.$element.before(this.$on).before(this.$label).before(this.$off).trigger("init.bootstrapSwitch"),this._elementHandlers(),this._handleHandlers(),this._labelHandlers(),this._formHandler()}return a.prototype._constructor=a,a.prototype.state=function(a,b){return"undefined"==typeof a?this.options.state:this.options.disabled||this.options.readonly||this.options.indeterminate?this.$element:this.options.state&&!this.options.radioAllOff&&this.$element.is(":radio")?this.$element:(a=!!a,this.$element.prop("checked",a).trigger("change.bootstrapSwitch",b),this.$element)},a.prototype.toggleState=function(a){return this.options.disabled||this.options.readonly||this.options.indeterminate?this.$element:this.$element.prop("checked",!this.options.state).trigger("change.bootstrapSwitch",a)},a.prototype.size=function(a){return"undefined"==typeof a?this.options.size:(null!=this.options.size&&this.$wrapper.removeClass(""+this.options.baseClass+"-"+this.options.size),a&&this.$wrapper.addClass(""+this.options.baseClass+"-"+a),this.options.size=a,this.$element)},a.prototype.animate=function(a){return"undefined"==typeof a?this.options.animate:(a=!!a,this.$wrapper[a?"addClass":"removeClass"](""+this.options.baseClass+"-animate"),this.options.animate=a,this.$element)},a.prototype.disabled=function(a){return"undefined"==typeof a?this.options.disabled:(a=!!a,this.$wrapper[a?"addClass":"removeClass"](""+this.options.baseClass+"-disabled"),this.$element.prop("disabled",a),this.options.disabled=a,this.$element)},a.prototype.toggleDisabled=function(){return this.$element.prop("disabled",!this.options.disabled),this.$wrapper.toggleClass(""+this.options.baseClass+"-disabled"),this.options.disabled=!this.options.disabled,this.$element},a.prototype.readonly=function(a){return"undefined"==typeof a?this.options.readonly:(a=!!a,this.$wrapper[a?"addClass":"removeClass"](""+this.options.baseClass+"-readonly"),this.$element.prop("readonly",a),this.options.readonly=a,this.$element)},a.prototype.toggleReadonly=function(){return this.$element.prop("readonly",!this.options.readonly),this.$wrapper.toggleClass(""+this.options.baseClass+"-readonly"),this.options.readonly=!this.options.readonly,this.$element},a.prototype.indeterminate=function(a){return"undefined"==typeof a?this.options.indeterminate:(a=!!a,this.$wrapper[a?"addClass":"removeClass"](""+this.options.baseClass+"-indeterminate"),this.$element.prop("indeterminate",a),this.options.indeterminate=a,this.$element)},a.prototype.toggleIndeterminate=function(){return this.$element.prop("indeterminate",!this.options.indeterminate),this.$wrapper.toggleClass(""+this.options.baseClass+"-indeterminate"),this.options.indeterminate=!this.options.indeterminate,this.$element},a.prototype.onColor=function(a){var b;return b=this.options.onColor,"undefined"==typeof a?b:(null!=b&&this.$on.removeClass(""+this.options.baseClass+"-"+b),this.$on.addClass(""+this.options.baseClass+"-"+a),this.options.onColor=a,this.$element)},a.prototype.offColor=function(a){var b;return b=this.options.offColor,"undefined"==typeof a?b:(null!=b&&this.$off.removeClass(""+this.options.baseClass+"-"+b),this.$off.addClass(""+this.options.baseClass+"-"+a),this.options.offColor=a,this.$element)},a.prototype.onText=function(a){return"undefined"==typeof a?this.options.onText:(this.$on.html(a),this.options.onText=a,this.$element)},a.prototype.offText=function(a){return"undefined"==typeof a?this.options.offText:(this.$off.html(a),this.options.offText=a,this.$element)},a.prototype.labelText=function(a){return"undefined"==typeof a?this.options.labelText:(this.$label.html(a),this.options.labelText=a,this.$element)},a.prototype.baseClass=function(){return this.options.baseClass},a.prototype.wrapperClass=function(a){return"undefined"==typeof a?this.options.wrapperClass:(a||(a=b.fn.bootstrapSwitch.defaults.wrapperClass),this.$wrapper.removeClass(this._getClasses(this.options.wrapperClass).join(" ")),this.$wrapper.addClass(this._getClasses(a).join(" ")),this.options.wrapperClass=a,this.$element)},a.prototype.radioAllOff=function(a){return"undefined"==typeof a?this.options.radioAllOff:(this.options.radioAllOff=a,this.$element)},a.prototype.onInit=function(a){return"undefined"==typeof a?this.options.onInit:(a||(a=b.fn.bootstrapSwitch.defaults.onInit),this.options.onInit=a,this.$element)},a.prototype.onSwitchChange=function(a){return"undefined"==typeof a?this.options.onSwitchChange:(a||(a=b.fn.bootstrapSwitch.defaults.onSwitchChange),this.options.onSwitchChange=a,this.$element)},a.prototype.destroy=function(){var a;return a=this.$element.closest("form"),a.length&&a.off("reset.bootstrapSwitch").removeData("bootstrap-switch"),this.$container.children().not(this.$element).remove(),this.$element.unwrap().unwrap().off(".bootstrapSwitch").removeData("bootstrap-switch"),this.$element},a.prototype._elementHandlers=function(){return this.$element.on({"change.bootstrapSwitch":function(a){return function(c,d){var e;return c.preventDefault(),c.stopImmediatePropagation(),e=a.$element.is(":checked"),e!==a.options.state?(a.options.state=e,a.$wrapper.removeClass(e?""+a.options.baseClass+"-off":""+a.options.baseClass+"-on").addClass(e?""+a.options.baseClass+"-on":""+a.options.baseClass+"-off"),d?void 0:(a.$element.is(":radio")&&b("[name='"+a.$element.attr("name")+"']").not(a.$element).prop("checked",!1).trigger("change.bootstrapSwitch",!0),a.$element.trigger("switchChange.bootstrapSwitch",[e]))):void 0}}(this),"focus.bootstrapSwitch":function(a){return function(b){return b.preventDefault(),a.$wrapper.addClass(""+a.options.baseClass+"-focused")}}(this),"blur.bootstrapSwitch":function(a){return function(b){return b.preventDefault(),a.$wrapper.removeClass(""+a.options.baseClass+"-focused")}}(this),"keydown.bootstrapSwitch":function(a){return function(b){if(b.which&&!a.options.disabled&&!a.options.readonly&&!a.options.indeterminate)switch(b.which){case 37:return b.preventDefault(),b.stopImmediatePropagation(),a.state(!1);case 39:return b.preventDefault(),b.stopImmediatePropagation(),a.state(!0)}}}(this)})},a.prototype._handleHandlers=function(){return this.$on.on("click.bootstrapSwitch",function(a){return function(){return a.state(!1),a.$element.trigger("focus.bootstrapSwitch")}}(this)),this.$off.on("click.bootstrapSwitch",function(a){return function(){return a.state(!0),a.$element.trigger("focus.bootstrapSwitch")}}(this))},a.prototype._labelHandlers=function(){return this.$label.on({"mousemove.bootstrapSwitch touchmove.bootstrapSwitch":function(a){return function(b){var c,d,e,f;if(a.isLabelDragging)return b.preventDefault(),a.isLabelDragged=!0,d=b.pageX||b.originalEvent.touches[0].pageX,e=(d-a.$wrapper.offset().left)/a.$wrapper.width()*100,c=25,f=75,a.options.animate&&a.$wrapper.removeClass(""+a.options.baseClass+"-animate"),c>e?e=c:e>f&&(e=f),a.$container.css("margin-left",""+(e-f)+"%"),a.$element.trigger("focus.bootstrapSwitch")}}(this),"mousedown.bootstrapSwitch touchstart.bootstrapSwitch":function(a){return function(b){return a.isLabelDragging||a.options.disabled||a.options.readonly||a.options.indeterminate?void 0:(b.preventDefault(),a.isLabelDragging=!0,a.$element.trigger("focus.bootstrapSwitch"))}}(this),"mouseup.bootstrapSwitch touchend.bootstrapSwitch":function(a){return function(b){return a.isLabelDragging?(b.preventDefault(),a.isLabelDragged?(a.isLabelDragged=!1,a.state(parseInt(a.$container.css("margin-left"),10)>-(a.$container.width()/6)),a.options.animate&&a.$wrapper.addClass(""+a.options.baseClass+"-animate"),a.$container.css("margin-left","")):a.state(!a.options.state),a.isLabelDragging=!1):void 0}}(this),"mouseleave.bootstrapSwitch":function(a){return function(){return a.$label.trigger("mouseup.bootstrapSwitch")}}(this)})},a.prototype._formHandler=function(){var a;return a=this.$element.closest("form"),a.data("bootstrap-switch")?void 0:a.on("reset.bootstrapSwitch",function(){return c.setTimeout(function(){return a.find("input").filter(function(){return b(this).data("bootstrap-switch")}).each(function(){return b(this).bootstrapSwitch("state",this.checked)})},1)}).data("bootstrap-switch",!0)},a.prototype._getClasses=function(a){var c,d,e,f;if(!b.isArray(a))return[""+this.options.baseClass+"-"+a];for(d=[],e=0,f=a.length;f>e;e++)c=a[e],d.push(""+this.options.baseClass+"-"+c);return d},a}(),b.fn.bootstrapSwitch=function(){var c,e,f;return e=arguments[0],c=2<=arguments.length?a.call(arguments,1):[],f=this,this.each(function(){var a,g;return a=b(this),g=a.data("bootstrap-switch"),g||a.data("bootstrap-switch",g=new d(this,e)),"string"==typeof e?f=g[e].apply(g,c):void 0}),f},b.fn.bootstrapSwitch.Constructor=d,b.fn.bootstrapSwitch.defaults={state:!0,size:null,animate:!0,disabled:!1,readonly:!1,indeterminate:!1,onColor:"primary",offColor:"default",onText:"ON",offText:"OFF",labelText:"&nbsp;",baseClass:"bootstrap-switch",wrapperClass:"wrapper",radioAllOff:!1,onInit:function(){},onSwitchChange:function(){}}}(window.jQuery,window)}.call(this),function(a){"use strict";function b(b,c){this.itemsArray=[],this.$element=a(b),this.$element.hide(),this.isSelect="SELECT"===b.tagName,this.multiple=this.isSelect&&b.hasAttribute("multiple"),this.objectItems=c&&c.itemValue,this.placeholderText=b.hasAttribute("placeholder")?this.$element.attr("placeholder"):"",this.inputSize=Math.max(1,this.placeholderText.length),this.$container=a('<div class="bootstrap-tagsinput"></div>'),this.$input=a('<input type="text" placeholder="'+this.placeholderText+'"/>').appendTo(this.$container),this.$element.after(this.$container);var d=(this.inputSize<3?3:this.inputSize)+"em";this.$input.get(0).style.cssText="width: "+d+" !important;",this.build(c)}function c(a,b){if("function"!=typeof a[b]){var c=a[b];a[b]=function(a){return a[c]}}}function d(a,b){if("function"!=typeof a[b]){var c=a[b];a[b]=function(){return c}}}function e(a){return a?i.text(a).html():""}function f(a){var b=0;if(document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-a.value.length),b=c.text.length}else(a.selectionStart||"0"==a.selectionStart)&&(b=a.selectionStart);return b}function g(b,c){var d=!1;return a.each(c,function(a,c){if("number"==typeof c&&b.which===c)return d=!0,!1;if(b.which===c.which){var e=!c.hasOwnProperty("altKey")||b.altKey===c.altKey,f=!c.hasOwnProperty("shiftKey")||b.shiftKey===c.shiftKey,g=!c.hasOwnProperty("ctrlKey")||b.ctrlKey===c.ctrlKey;if(e&&f&&g)return d=!0,!1}}),d}var h={tagClass:function(){return"label label-info"},itemValue:function(a){return a?a.toString():a},itemText:function(a){return this.itemValue(a)},freeInput:!0,addOnBlur:!0,maxTags:void 0,maxChars:void 0,confirmKeys:[13,44],onTagExists:function(a,b){b.hide().fadeIn()},trimValue:!1,allowDuplicates:!1};b.prototype={constructor:b,add:function(b,c){var d=this;if(!(d.options.maxTags&&d.itemsArray.length>=d.options.maxTags||b!==!1&&!b)){if("string"==typeof b&&d.options.trimValue&&(b=a.trim(b)),"object"==typeof b&&!d.objectItems)throw"Can't add objects when itemValue option is not set";if(!b.toString().match(/^\s*$/)){if(d.isSelect&&!d.multiple&&d.itemsArray.length>0&&d.remove(d.itemsArray[0]),"string"==typeof b&&"INPUT"===this.$element[0].tagName){var f=b.split(",");if(f.length>1){for(var g=0;g<f.length;g++)this.add(f[g],!0);return void(c||d.pushVal())}}var h=d.options.itemValue(b),i=d.options.itemText(b),j=d.options.tagClass(b),k=a.grep(d.itemsArray,function(a){return d.options.itemValue(a)===h})[0];if(!k||d.options.allowDuplicates){if(!(d.items().toString().length+b.length+1>d.options.maxInputLength)){var l=a.Event("beforeItemAdd",{item:b,cancel:!1});if(d.$element.trigger(l),!l.cancel){d.itemsArray.push(b);var m=a('<span class="tag '+e(j)+'">'+e(i)+'<span data-role="remove"></span></span>');if(m.data("item",b),d.findInputWrapper().before(m),m.after(" "),d.isSelect&&!a('option[value="'+encodeURIComponent(h)+'"]',d.$element)[0]){var n=a("<option selected>"+e(i)+"</option>");n.data("item",b),n.attr("value",h),d.$element.append(n)}c||d.pushVal(),(d.options.maxTags===d.itemsArray.length||d.items().toString().length===d.options.maxInputLength)&&d.$container.addClass("bootstrap-tagsinput-max"),d.$element.trigger(a.Event("itemAdded",{item:b}))}}}else if(d.options.onTagExists){var o=a(".tag",d.$container).filter(function(){return a(this).data("item")===k});d.options.onTagExists(b,o)}}}},remove:function(b,c){var d=this;if(d.objectItems&&(b="object"==typeof b?a.grep(d.itemsArray,function(a){return d.options.itemValue(a)==d.options.itemValue(b)}):a.grep(d.itemsArray,function(a){return d.options.itemValue(a)==b}),b=b[b.length-1]),b){var e=a.Event("beforeItemRemove",{item:b,cancel:!1});if(d.$element.trigger(e),e.cancel)return;a(".tag",d.$container).filter(function(){return a(this).data("item")===b}).remove(),a("option",d.$element).filter(function(){return a(this).data("item")===b}).remove(),-1!==a.inArray(b,d.itemsArray)&&d.itemsArray.splice(a.inArray(b,d.itemsArray),1)}c||d.pushVal(),d.options.maxTags>d.itemsArray.length&&d.$container.removeClass("bootstrap-tagsinput-max"),d.$element.trigger(a.Event("itemRemoved",{item:b}))},removeAll:function(){var b=this;for(a(".tag",b.$container).remove(),a("option",b.$element).remove();b.itemsArray.length>0;)b.itemsArray.pop();b.pushVal()},refresh:function(){var b=this;a(".tag",b.$container).each(function(){var c=a(this),d=c.data("item"),f=b.options.itemValue(d),g=b.options.itemText(d),h=b.options.tagClass(d);if(c.attr("class",null),c.addClass("tag "+e(h)),c.contents().filter(function(){return 3==this.nodeType})[0].nodeValue=e(g),b.isSelect){var i=a("option",b.$element).filter(function(){return a(this).data("item")===d});i.attr("value",f)}})},items:function(){return this.itemsArray},pushVal:function(){var b=this,c=a.map(b.items(),function(a){return b.options.itemValue(a).toString()});b.$element.val(c,!0).trigger("change")},build:function(b){var e=this;if(e.options=a.extend({},h,b),e.objectItems&&(e.options.freeInput=!1),c(e.options,"itemValue"),c(e.options,"itemText"),d(e.options,"tagClass"),e.options.typeahead){var i=e.options.typeahead||{};d(i,"source"),e.$input.typeahead(a.extend({},i,{source:function(b,c){function d(a){for(var b=[],d=0;d<a.length;d++){var g=e.options.itemText(a[d]);f[g]=a[d],b.push(g)}c(b)}this.map={};var f=this.map,g=i.source(b);a.isFunction(g.success)?g.success(d):a.isFunction(g.then)?g.then(d):a.when(g).then(d)},updater:function(a){e.add(this.map[a])},matcher:function(a){return-1!==a.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(a){return a.sort()},highlighter:function(a){var b=new RegExp("("+this.query+")","gi");return a.replace(b,"<strong>$1</strong>")}}))}if(e.options.typeaheadjs){var j=e.options.typeaheadjs||{};e.$input.typeahead(null,j).on("typeahead:selected",a.proxy(function(a,b){e.add(j.valueKey?b[j.valueKey]:b),e.$input.typeahead("val","")},e))}e.$container.on("click",a.proxy(function(){e.$element.attr("disabled")||e.$input.removeAttr("disabled"),e.$input.focus()},e)),e.options.addOnBlur&&e.options.freeInput&&e.$input.on("focusout",a.proxy(function(){0===a(".typeahead, .twitter-typeahead",e.$container).length&&(e.add(e.$input.val()),e.$input.val(""))},e)),e.$container.on("keydown","input",a.proxy(function(b){var c=a(b.target),d=e.findInputWrapper();if(e.$element.attr("disabled"))return void e.$input.attr("disabled","disabled");switch(b.which){case 8:if(0===f(c[0])){var g=d.prev();g&&e.remove(g.data("item"))}break;case 46:if(0===f(c[0])){var h=d.next();h&&e.remove(h.data("item"))}break;case 37:var i=d.prev();0===c.val().length&&i[0]&&(i.before(d),c.focus());break;case 39:var j=d.next();0===c.val().length&&j[0]&&(j.after(d),c.focus())}{var k=c.val().length;Math.ceil(k/5)}c.attr("size",Math.max(this.inputSize,c.val().length))},e)),e.$container.on("keypress","input",a.proxy(function(b){var c=a(b.target);if(e.$element.attr("disabled"))return void e.$input.attr("disabled","disabled");var d=c.val(),f=e.options.maxChars&&d.length>=e.options.maxChars;e.options.freeInput&&(g(b,e.options.confirmKeys)||f)&&(e.add(f?d.substr(0,e.options.maxChars):d),c.val(""),b.preventDefault());{var h=c.val().length;Math.ceil(h/5)}c.attr("size",Math.max(this.inputSize,c.val().length))},e)),e.$container.on("click","[data-role=remove]",a.proxy(function(b){e.$element.attr("disabled")||e.remove(a(b.target).closest(".tag").data("item"))},e)),e.options.itemValue===h.itemValue&&("INPUT"===e.$element[0].tagName?e.add(e.$element.val()):a("option",e.$element).each(function(){e.add(a(this).attr("value"),!0)}))},destroy:function(){var a=this;a.$container.off("keypress","input"),a.$container.off("click","[role=remove]"),a.$container.remove(),a.$element.removeData("tagsinput"),a.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var b=this.$input[0],c=this.$container[0];b&&b.parentNode!==c;)b=b.parentNode;return a(b)}},a.fn.tagsinput=function(c,d){var e=[];return this.each(function(){var f=a(this).data("tagsinput");if(f)if(c||d){if(void 0!==f[c]){var g=f[c](d);void 0!==g&&e.push(g)}}else e.push(f);else f=new b(this,c),a(this).data("tagsinput",f),e.push(f),"SELECT"===this.tagName&&a("option",a(this)).attr("selected","selected"),a(this).val(a(this).val())}),"string"==typeof c?e.length>1?e:e[0]:e},a.fn.tagsinput.Constructor=b;var i=a("<div />");a(function(){a("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})}(window.jQuery),/*!

Holder - client side image placeholders
Version 2.4.1+f2l1h
© 2014 Ivan Malopinsky - http://imsky.co

Site:     http://imsky.github.io/holder
Issues:   https://github.com/imsky/holder/issues
License:  http://opensource.org/licenses/MIT

*/
!function(a,b,c){b[a]=c}("onDomReady",this,function(a){"use strict";function b(a){if(!v){if(!g.body)return e(b);for(v=!0;a=w.shift();)e(a)}}function c(a){(t||a.type===i||g[m]===l)&&(d(),b())}function d(){t?(g[s](q,c,j),a[s](i,c,j)):(g[o](r,c),a[o](k,c))}function e(a,b){setTimeout(a,+b>=0?b:1)}function f(a){v?e(a):w.push(a)}null==document.readyState&&document.addEventListener&&(document.addEventListener("DOMContentLoaded",function y(){document.removeEventListener("DOMContentLoaded",y,!1),document.readyState="complete"},!1),document.readyState="loading");var g=a.document,h=g.documentElement,i="load",j=!1,k="on"+i,l="complete",m="readyState",n="attachEvent",o="detachEvent",p="addEventListener",q="DOMContentLoaded",r="onreadystatechange",s="removeEventListener",t=p in g,u=j,v=j,w=[];if(g[m]===l)e(b);else if(t)g[p](q,c,j),a[p](i,c,j);else{g[n](r,c),a[n](k,c);try{u=null==a.frameElement&&h}catch(x){}u&&u.doScroll&&!function z(){if(!v){try{u.doScroll("left")}catch(a){return e(z,50)}d(),b()}}()}return f.version="1.4.0",f.isReady=function(){return v},f}(this)),document.querySelectorAll||(document.querySelectorAll=function(a){var b,c=document.createElement("style"),d=[];for(document.documentElement.firstChild.appendChild(c),document._qsa=[],c.styleSheet.cssText=a+"{x-qsa:expression(document._qsa && document._qsa.push(this))}",window.scrollBy(0,0),c.parentNode.removeChild(c);document._qsa.length;)b=document._qsa.shift(),b.style.removeAttribute("x-qsa"),d.push(b);return document._qsa=null,d}),document.querySelector||(document.querySelector=function(a){var b=document.querySelectorAll(a);return b.length?b[0]:null}),document.getElementsByClassName||(document.getElementsByClassName=function(a){return a=String(a).replace(/^|\s+/g,"."),document.querySelectorAll(a)}),Object.keys||(Object.keys=function(a){if(a!==Object(a))throw TypeError("Object.keys called on non-object");var b,c=[];for(b in a)Object.prototype.hasOwnProperty.call(a,b)&&c.push(b);return c}),function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a.atob=a.atob||function(a){a=String(a);var c,d=0,e=[],f=0,g=0;if(a=a.replace(/\s/g,""),a.length%4===0&&(a=a.replace(/=+$/,"")),a.length%4===1)throw Error("InvalidCharacterError");if(/[^+/0-9A-Za-z]/.test(a))throw Error("InvalidCharacterError");for(;d<a.length;)c=b.indexOf(a.charAt(d)),f=f<<6|c,g+=6,24===g&&(e.push(String.fromCharCode(f>>16&255)),e.push(String.fromCharCode(f>>8&255)),e.push(String.fromCharCode(255&f)),g=0,f=0),d+=1;return 12===g?(f>>=4,e.push(String.fromCharCode(255&f))):18===g&&(f>>=2,e.push(String.fromCharCode(f>>8&255)),e.push(String.fromCharCode(255&f))),e.join("")},a.btoa=a.btoa||function(a){a=String(a);var c,d,e,f,g,h,i,j=0,k=[];if(/[^\x00-\xFF]/.test(a))throw Error("InvalidCharacterError");for(;j<a.length;)c=a.charCodeAt(j++),d=a.charCodeAt(j++),e=a.charCodeAt(j++),f=c>>2,g=(3&c)<<4|d>>4,h=(15&d)<<2|e>>6,i=63&e,j===a.length+2?(h=64,i=64):j===a.length+1&&(i=64),k.push(b.charAt(f),b.charAt(g),b.charAt(h),b.charAt(i));return k.join("")}}(this),function(){function a(b,c,d){b.document;var e,f=b.currentStyle[c].match(/([\d\.]+)(%|cm|em|in|mm|pc|pt|)/)||[0,0,""],g=f[1],h=f[2];return d=d?/%|em/.test(h)&&b.parentElement?a(b.parentElement,"fontSize",null):16:d,e="fontSize"==c?d:/width/i.test(c)?b.clientWidth:b.clientHeight,"%"==h?g/100*e:"cm"==h?.3937*g*96:"em"==h?g*d:"in"==h?96*g:"mm"==h?.3937*g*96/10:"pc"==h?12*g*96/72:"pt"==h?96*g/72:g}function b(a,b){var c="border"==b?"Width":"",d=b+"Top"+c,e=b+"Right"+c,f=b+"Bottom"+c,g=b+"Left"+c;a[b]=(a[d]==a[e]&&a[d]==a[f]&&a[d]==a[g]?[a[d]]:a[d]==a[f]&&a[g]==a[e]?[a[d],a[e]]:a[g]==a[e]?[a[d],a[e],a[f]]:[a[d],a[e],a[f],a[g]]).join(" ")}function c(c){var d,e=this,f=c.currentStyle,g=a(c,"fontSize"),h=function(a){return"-"+a.toLowerCase()};for(d in f)if(Array.prototype.push.call(e,"styleFloat"==d?"float":d.replace(/[A-Z]/,h)),"width"==d)e[d]=c.offsetWidth+"px";else if("height"==d)e[d]=c.offsetHeight+"px";else if("styleFloat"==d)e.float=f[d];else if(/margin.|padding.|border.+W/.test(d)&&"auto"!=e[d])e[d]=Math.round(a(c,d,g))+"px";else if(/^outline/.test(d))try{e[d]=f[d]}catch(i){e.outlineColor=f.color,e.outlineStyle=e.outlineStyle||"none",e.outlineWidth=e.outlineWidth||"0px",e.outline=[e.outlineColor,e.outlineWidth,e.outlineStyle].join(" ")}else e[d]=f[d];b(e,"margin"),b(e,"padding"),b(e,"border"),e.fontSize=Math.round(g)+"px"}window.getComputedStyle||(c.prototype={constructor:c,getPropertyPriority:function(){throw new Error("NotSupportedError: DOM Exception 9")},getPropertyValue:function(a){var b=a.replace(/-([a-z])/g,function(a){return a=a.charAt?a.split(""):a,a[1].toUpperCase()}),c=this[b];return c},item:function(a){return this[a]},removeProperty:function(){throw new Error("NoModificationAllowedError: DOM Exception 7")},setProperty:function(){throw new Error("NoModificationAllowedError: DOM Exception 7")},getPropertyCSSValue:function(){throw new Error("NotSupportedError: DOM Exception 9")}},window.getComputedStyle=function(a){return new c(a)})}(),Object.prototype.hasOwnProperty||(Object.prototype.hasOwnProperty=function(a){var b=this.__proto__||this.constructor.prototype;return a in this&&(!(a in b)||b[a]!==this[a])}),function(a,b){a.augment=b()}(this,function(){"use strict";var a=function(){},b=Array.prototype.slice,c=function(c,d){var e=a.prototype="function"==typeof c?c.prototype:c,f=new a,g=d.apply(f,b.call(arguments,2).concat(e));if("object"==typeof g)for(var h in g)f[h]=g[h];if(!f.hasOwnProperty("constructor"))return f;var i=f.constructor;return i.prototype=f,i};return c.defclass=function(a){var b=a.constructor;return b.prototype=a,b},c.extend=function(a,b){return c(a,function(a){return this.uber=a,b})},c}),function(a,b){function c(a,b,c,f){var g=d(c.substr(c.lastIndexOf(a.domain)),a);g&&e(null,f,g,b)}function d(a,b){for(var c={theme:p(A.settings.themes.gray,null),stylesheets:b.stylesheets,holderURL:[]},d=!1,e=String.fromCharCode(11),f=a.replace(/([^\\])\//g,"$1"+e).split(e),g=/%[0-9a-f]{2}/gi,h=f.length,i=0;h>i;i++){var j=f[i];if(j.match(g))try{j=decodeURIComponent(j)}catch(k){j=f[i]}var l=!1;if(A.flags.dimensions.match(j))d=!0,c.dimensions=A.flags.dimensions.output(j),l=!0;else if(A.flags.fluid.match(j))d=!0,c.dimensions=A.flags.fluid.output(j),c.fluid=!0,l=!0;else if(A.flags.textmode.match(j))c.textmode=A.flags.textmode.output(j),l=!0;else if(A.flags.colors.match(j)){var m=A.flags.colors.output(j);c.theme=p(c.theme,m),l=!0}else if(b.themes[j])b.themes.hasOwnProperty(j)&&(c.theme=p(b.themes[j],null)),l=!0;else if(A.flags.font.match(j))c.font=A.flags.font.output(j),l=!0;else if(A.flags.auto.match(j))c.auto=!0,l=!0;else if(A.flags.text.match(j))c.text=A.flags.text.output(j),l=!0;else if(A.flags.random.match(j)){null==A.vars.cache.themeKeys&&(A.vars.cache.themeKeys=Object.keys(b.themes));var n=A.vars.cache.themeKeys[0|Math.random()*A.vars.cache.themeKeys.length];c.theme=p(b.themes[n],null),l=!0}l&&c.holderURL.push(j)}return c.holderURL.unshift(b.domain),c.holderURL=c.holderURL.join("/"),d?c:!1}function e(a,b,c,d){var e=c.dimensions,g=c.theme,h=e.width+"x"+e.height;if(a=null==a?c.fluid?"fluid":"image":a,null!=c.text&&(g.text=c.text,"object"===b.nodeName.toLowerCase())){for(var j=g.text.split("\\n"),l=0;l<j.length;l++)j[l]=v(j[l]);g.text=j.join("\\n")}var n=c.holderURL,o=p(d,null);c.font&&(g.font=c.font,!o.noFontFallback&&"img"===b.nodeName.toLowerCase()&&A.setup.supportsCanvas&&"svg"===o.renderer&&(o=p(o,{renderer:"canvas"}))),c.font&&"canvas"==o.renderer&&(o.reRender=!0),"background"==a?null==b.getAttribute("data-background-src")&&m(b,{"data-background-src":n}):m(b,{"data-src":n}),c.theme=g,b.holderData={flags:c,renderSettings:o},("image"==a||"fluid"==a)&&m(b,{alt:g.text?(g.text.length>16?g.text.substring(0,16)+"…":g.text)+" ["+h+"]":h}),"image"==a?("html"!=o.renderer&&c.auto||(b.style.width=e.width+"px",b.style.height=e.height+"px"),"html"==o.renderer?b.style.backgroundColor=g.background:(f(a,{dimensions:e,theme:g,flags:c},b,o),c.textmode&&"exact"==c.textmode&&(A.vars.resizableImages.push(b),i(b)))):"background"==a&&"html"!=o.renderer?f(a,{dimensions:e,theme:g,flags:c},b,o):"fluid"==a&&("%"==e.height.slice(-1)?b.style.height=e.height:null!=c.auto&&c.auto||(b.style.height=e.height+"px"),"%"==e.width.slice(-1)?b.style.width=e.width:null!=c.auto&&c.auto||(b.style.width=e.width+"px"),("inline"==b.style.display||""===b.style.display||"none"==b.style.display)&&(b.style.display="block"),k(b),"html"==o.renderer?b.style.backgroundColor=g.background:(A.vars.resizableImages.push(b),i(b)))}function f(a,b,c,d){function e(){var a=null;switch(d.renderer){case"canvas":a=C(i);break;case"svg":a=D(i,d);break;default:throw"Holder: invalid renderer: "+d.renderer}return a}var f=null;switch(d.renderer){case"svg":if(!A.setup.supportsSVG)return;break;case"canvas":if(!A.setup.supportsCanvas)return;break;default:return}var h={width:b.dimensions.width,height:b.dimensions.height,theme:b.theme,flags:b.flags},i=g(h);if({text:h.text,width:h.width,height:h.height,textHeight:h.font.size,font:h.font.family,fontWeight:h.font.weight,template:h.theme},f=e(),null==f)throw"Holder: couldn't render placeholder";"background"==a?(c.style.backgroundImage="url("+f+")",c.style.backgroundSize=h.width+"px "+h.height+"px"):("img"===c.nodeName.toLowerCase()?m(c,{src:f}):"object"===c.nodeName.toLowerCase()&&(m(c,{data:f}),m(c,{type:"image/svg+xml"})),d.reRender&&setTimeout(function(){var a=e();if(null==a)throw"Holder: couldn't render placeholder";"img"===c.nodeName.toLowerCase()?m(c,{src:a}):"object"===c.nodeName.toLowerCase()&&(m(c,{data:a}),m(c,{type:"image/svg+xml"}))},100)),m(c,{"data-holder-rendered":!0})}function g(a){function b(a,b,c,d){b.width=c,b.height=d,a.width=Math.max(a.width,b.width),a.height+=b.height,a.add(b)}switch(a.font={family:a.theme.font?a.theme.font:"Arial, Helvetica, Open Sans, sans-serif",size:h(a.width,a.height,a.theme.size?a.theme.size:A.defaults.size),units:a.theme.units?a.theme.units:A.defaults.units,weight:a.theme.fontweight?a.theme.fontweight:"bold"},a.text=a.theme.text?a.theme.text:Math.floor(a.width)+"x"+Math.floor(a.height),a.flags.textmode){case"literal":a.text=a.flags.dimensions.width+"x"+a.flags.dimensions.height;break;case"exact":if(!a.flags.exactDimensions)break;a.text=Math.floor(a.flags.exactDimensions.width)+"x"+Math.floor(a.flags.exactDimensions.height)}var c=new E({width:a.width,height:a.height}),d=c.Shape,e=new d.Rect("holderBg",{fill:a.theme.background});e.resize(a.width,a.height),c.root.add(e);var f=new d.Group("holderTextGroup",{text:a.text,align:"center",font:a.font,fill:a.theme.foreground});f.moveTo(null,null,1),c.root.add(f);var g=f.textPositionData=B(c);if(!g)throw"Holder: staging fallback not supported yet.";f.properties.leading=g.boundingBox.height;var i=null,j=null;if(g.lineCount>1){var k=0,l=0,m=a.width*A.setup.lineWrapRatio,n=0;j=new d.Group("line"+n);for(var o=0;o<g.words.length;o++){var p=g.words[o];i=new d.Text(p.text);var q="\\n"==p.text;(k+p.width>=m||q===!0)&&(b(f,j,k,f.properties.leading),k=0,l+=f.properties.leading,n+=1,j=new d.Group("line"+n),j.y=l),q!==!0&&(i.moveTo(k,0),k+=g.spaceWidth+p.width,j.add(i))}b(f,j,k,f.properties.leading);for(var r in f.children)j=f.children[r],j.moveTo((f.width-j.width)/2,null,null);f.moveTo((a.width-f.width)/2,(a.height-f.height)/2,null),(a.height-f.height)/2<0&&f.moveTo(null,0,null)}else i=new d.Text(a.text),j=new d.Group("line0"),j.add(i),f.add(j),f.moveTo((a.width-g.boundingBox.width)/2,(a.height-g.boundingBox.height)/2,null);return c}function h(a,b,c){b=parseInt(b,10),a=parseInt(a,10);var d=Math.max(b,a),e=Math.min(b,a),f=A.defaults.scale,g=Math.min(.75*e,.75*d*f);return Math.round(Math.max(c,g))}function i(a){var b;b=null==a||null==a.nodeType?A.vars.resizableImages:[a];for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];if(d.holderData){var e=d.holderData.flags,g=j(d,z.invisibleErrorFn(i));if(g){if(e.fluid&&e.auto){var h=d.holderData.fluidConfig;switch(h.mode){case"width":g.height=g.width/h.ratio;break;case"height":g.width=g.height*h.ratio}}var k={dimensions:g,theme:e.theme,flags:e};e.textmode&&"exact"==e.textmode&&(e.exactDimensions=g,k.dimensions=e.dimensions),f("image",k,d,d.holderData.renderSettings)}}}}function j(a,b){var c={height:a.clientHeight,width:a.clientWidth};return c.height||c.width?(a.removeAttribute("data-holder-invisible"),c):(m(a,{"data-holder-invisible":!0}),void b.call(this,a))}function k(a){if(a.holderData){var b=j(a,z.invisibleErrorFn(k));if(b){var c=a.holderData.flags,d={fluidHeight:"%"==c.dimensions.height.slice(-1),fluidWidth:"%"==c.dimensions.width.slice(-1),mode:null,initialDimensions:b};d.fluidWidth&&!d.fluidHeight?(d.mode="width",d.ratio=d.initialDimensions.width/parseFloat(c.dimensions.height)):!d.fluidWidth&&d.fluidHeight&&(d.mode="height",d.ratio=parseFloat(c.dimensions.width)/d.initialDimensions.height),a.holderData.fluidConfig=d}}}function l(a,b){return null==b?y.createElement(a):y.createElementNS(b,a)}function m(a,b){for(var c in b)a.setAttribute(c,b[c])}function n(a,b,c){if(null==a){a=l("svg",x);var d=l("defs",x);a.appendChild(d)}return a.webkitMatchesSelector&&a.setAttribute("xmlns",x),m(a,{width:b,height:c,viewBox:"0 0 "+b+" "+c,preserveAspectRatio:"none"}),a}function o(a,c){if(b.XMLSerializer){var d=new XMLSerializer,e="",f=c.stylesheets;if(a.querySelector("defs"),c.svgXMLStylesheet){for(var g=(new DOMParser).parseFromString("<xml />","application/xml"),h=f.length-1;h>=0;h--){var i=g.createProcessingInstruction("xml-stylesheet",'href="'+f[h]+'" rel="stylesheet"');g.insertBefore(i,g.firstChild)}var j=g.createProcessingInstruction("xml",'version="1.0" encoding="UTF-8" standalone="yes"');g.insertBefore(j,g.firstChild),g.removeChild(g.documentElement),e=d.serializeToString(g)}var k=d.serializeToString(a);return k=k.replace(/\&amp;(\#[0-9]{2,}\;)/g,"&$1"),e+k}}function p(a,b){var c={};for(var d in a)a.hasOwnProperty(d)&&(c[d]=a[d]);if(null!=b)for(var e in b)b.hasOwnProperty(e)&&(c[e]=b[e]);return c}function q(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c+":"+a[c]);return b.join(";")}function r(a){A.vars.debounceTimer||a.call(this),A.vars.debounceTimer&&clearTimeout(A.vars.debounceTimer),A.vars.debounceTimer=setTimeout(function(){A.vars.debounceTimer=null,a.call(this)},A.setup.debounce)}function s(){r(function(){i(null)})}function t(a){var c=null;return"string"==typeof a?c=y.querySelectorAll(a):b.NodeList&&a instanceof b.NodeList?c=a:b.Node&&a instanceof b.Node?c=[a]:b.HTMLCollection&&a instanceof b.HTMLCollection?c=a:null===a&&(c=[]),c}function u(a,b){var c=new Image;c.onerror=function(){b.call(this,!1)},c.onload=function(){b.call(this,!0)},c.src=a}function v(a){for(var b=[],c=0,d=a.length-1;d>=0;d--)c=a.charCodeAt(d),b.unshift(c>128?["&#",c,";"].join(""):a[d]);return b.join("")}function w(a){return a.replace(/&#(\d+);/g,function(a,b){return String.fromCharCode(b)})}var x="http://www.w3.org/2000/svg",y=b.document,z={addTheme:function(a,b){return null!=a&&null!=b&&(A.settings.themes[a]=b),delete A.vars.cache.themeKeys,this},addImage:function(a,b){var c=y.querySelectorAll(b);if(c.length)for(var d=0,e=c.length;e>d;d++){var f=l("img");m(f,{"data-src":a}),c[d].appendChild(f)}return this},run:function(a){a=a||{};var f={};A.vars.preempted=!0;var g=p(A.settings,a);f.renderer=g.renderer?g.renderer:A.setup.renderer,-1===A.setup.renderers.join(",").indexOf(f.renderer)&&(f.renderer=A.setup.supportsSVG?"svg":A.setup.supportsCanvas?"canvas":"html"),g.use_canvas?f.renderer="canvas":g.use_svg&&(f.renderer="svg");var h=t(g.images),i=t(g.bgnodes),j=t(g.stylenodes),k=t(g.objects);f.stylesheets=[],f.svgXMLStylesheet=!0,f.noFontFallback=g.noFontFallback?g.noFontFallback:!1;for(var m=0;m<j.length;m++){var n=j[m];if(n.attributes.rel&&n.attributes.href&&"stylesheet"==n.attributes.rel.value){var o=n.attributes.href.value,q=l("a");q.href=o;var r=q.protocol+"//"+q.host+q.pathname+q.search;f.stylesheets.push(r)}}for(m=0;m<i.length;m++){var s=b.getComputedStyle(i[m],null).getPropertyValue("background-image"),v=i[m].getAttribute("data-background-src"),w=null;w=null==v?s:v;var x=null,y="?"+g.domain+"/";if(0===w.indexOf(y))x=w.slice(1);else if(-1!=w.indexOf(y)){var z=w.substr(w.indexOf(y)).slice(1),B=z.match(/([^\"]*)"?\)/);null!=B&&(x=B[1])}if(null!=x){var C=d(x,g);C&&e("background",i[m],C,f)}}for(m=0;m<k.length;m++){var D=k[m],E={};try{E.data=D.getAttribute("data"),E.dataSrc=D.getAttribute("data-src")}catch(F){}var G=null!=E.data&&0===E.data.indexOf(g.domain),H=null!=E.dataSrc&&0===E.dataSrc.indexOf(g.domain);G?c(g,f,E.data,D):H&&c(g,f,E.dataSrc,D)}for(m=0;m<h.length;m++){var I=h[m],J={};try{J.src=I.getAttribute("src"),J.dataSrc=I.getAttribute("data-src"),J.rendered=I.getAttribute("data-holder-rendered")}catch(F){}var K=null!=J.src,L=null!=J.dataSrc&&0===J.dataSrc.indexOf(g.domain),M=null!=J.rendered&&"true"==J.rendered;K?0===J.src.indexOf(g.domain)?c(g,f,J.src,I):L&&(M?c(g,f,J.dataSrc,I):!function(a,b,d,e,f){u(a,function(a){a||c(b,d,e,f)})}(J.src,g,f,J.dataSrc,I)):L&&c(g,f,J.dataSrc,I)}return this},invisibleErrorFn:function(){return function(a){if(a.hasAttribute("data-holder-invisible"))throw"Holder: invisible placeholder"}}};z.add_theme=z.addTheme,z.add_image=z.addImage,z.invisible_error_fn=z.invisibleErrorFn;var A={settings:{domain:"holder.js",images:"img",objects:"object",bgnodes:"body .holderjs",stylenodes:"head link.holderjs",stylesheets:[],themes:{gray:{background:"#EEEEEE",foreground:"#AAAAAA"},social:{background:"#3a5a97",foreground:"#FFFFFF"},industrial:{background:"#434A52",foreground:"#C2F200"},sky:{background:"#0D8FDB",foreground:"#FFFFFF"},vine:{background:"#39DBAC",foreground:"#1E292C"},lava:{background:"#F8591A",foreground:"#1C2846"}}},defaults:{size:10,units:"pt",scale:1/16},flags:{dimensions:{regex:/^(\d+)x(\d+)$/,output:function(a){var b=this.regex.exec(a);return{width:+b[1],height:+b[2]}}},fluid:{regex:/^([0-9]+%?)x([0-9]+%?)$/,output:function(a){var b=this.regex.exec(a);return{width:b[1],height:b[2]}}},colors:{regex:/(?:#|\^)([0-9a-f]{3,})\:(?:#|\^)([0-9a-f]{3,})/i,output:function(a){var b=this.regex.exec(a);return{foreground:"#"+b[2],background:"#"+b[1]}}},text:{regex:/text\:(.*)/,output:function(a){return this.regex.exec(a)[1].replace("\\/","/")}},font:{regex:/font\:(.*)/,output:function(a){return this.regex.exec(a)[1]}},auto:{regex:/^auto$/},textmode:{regex:/textmode\:(.*)/,output:function(a){return this.regex.exec(a)[1]}},random:{regex:/^random$/}}},B=function(){var a=null,b=null,c=null;return function(d){var e=d.root;if(A.setup.supportsSVG){var f=!1,g=function(a){return y.createTextNode(a)};null==a&&(f=!0),a=n(a,e.properties.width,e.properties.height),f&&(b=l("text",x),c=g(null),m(b,{x:0}),b.appendChild(c),a.appendChild(b),y.body.appendChild(a),a.style.visibility="hidden",a.style.position="absolute",a.style.top="-100%",a.style.left="-100%");var h=e.children.holderTextGroup,i=h.properties;m(b,{y:i.font.size,style:q({"font-weight":i.font.weight,"font-size":i.font.size+i.font.units,"font-family":i.font.family,"dominant-baseline":"middle"})}),c.nodeValue=i.text;var j=b.getBBox(),k=Math.ceil(j.width/(e.properties.width*A.setup.lineWrapRatio)),o=i.text.split(" "),p=i.text.match(/\\n/g);k+=null==p?0:p.length,c.nodeValue=i.text.replace(/[ ]+/g,"");var r=b.getComputedTextLength(),s=j.width-r,t=Math.round(s/Math.max(1,o.length-1)),u=[];if(k>1){c.nodeValue="";for(var v=0;v<o.length;v++)if(0!==o[v].length){c.nodeValue=w(o[v]);var z=b.getBBox();u.push({text:o[v],width:z.width})}}return{spaceWidth:t,lineCount:k,boundingBox:j,words:u}}return!1}}(),C=function(){var a=l("canvas"),b=null;return function(c){null==b&&(b=a.getContext("2d"));var d=c.root;a.width=A.dpr(d.properties.width),a.height=A.dpr(d.properties.height),b.textBaseline="middle",b.fillStyle=d.children.holderBg.properties.fill,b.fillRect(0,0,A.dpr(d.children.holderBg.width),A.dpr(d.children.holderBg.height));var e=d.children.holderTextGroup;e.properties,b.font=e.properties.font.weight+" "+A.dpr(e.properties.font.size)+e.properties.font.units+" "+e.properties.font.family+", monospace",b.fillStyle=e.properties.fill;for(var f in e.children){var g=e.children[f];for(var h in g.children){var i=g.children[h],j=A.dpr(e.x+g.x+i.x),k=A.dpr(e.y+g.y+i.y+e.properties.leading/2);b.fillText(i.properties.text,j,k)}}return a.toDataURL("image/png")}}(),D=function(){if(b.XMLSerializer){var a=n(null,0,0),c=l("rect",x);return a.appendChild(c),function(b,d){var e=b.root;n(a,e.properties.width,e.properties.height);for(var f=a.querySelectorAll("g"),g=0;g<f.length;g++)f[g].parentNode.removeChild(f[g]);m(c,{width:e.children.holderBg.width,height:e.children.holderBg.height,fill:e.children.holderBg.properties.fill});var h=e.children.holderTextGroup,i=h.properties,j=l("g",x);a.appendChild(j);for(var k in h.children){var p=h.children[k];for(var r in p.children){var s=p.children[r],t=h.x+p.x+s.x,u=h.y+p.y+s.y+h.properties.leading/2,v=l("text",x),w=y.createTextNode(null);m(v,{x:t,y:u,style:q({fill:i.fill,"font-weight":i.font.weight,"font-family":i.font.family+", monospace","font-size":i.font.size+i.font.units,"dominant-baseline":"central"})}),w.nodeValue=s.properties.text,v.appendChild(w),j.appendChild(v)}}var z="data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(o(a,d))));return z}}}(),E=function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}var c=1,d=augment.defclass({constructor:function(a){c++,this.parent=null,this.children={},this.id=c,this.name="n"+c,null!=a&&(this.name=a),this.x=0,this.y=0,this.z=0,this.width=0,this.height=0},resize:function(a,b){null!=a&&(this.width=a),null!=b&&(this.height=b)},moveTo:function(a,b,c){this.x=null!=a?a:this.x,this.y=null!=b?b:this.y,this.z=null!=c?c:this.z},add:function(a){var b=a.name;if(null!=this.children[b])throw"SceneGraph: child with that name already exists: "+b;this.children[b]=a,a.parent=this}}),e=augment(d,function(b){this.constructor=function(){b.constructor.call(this,"root"),this.properties=a}}),f=augment(d,function(a){function c(c,d){if(a.constructor.call(this,c),this.properties={fill:"#000"},null!=d)b(this.properties,d);else if(null!=c&&"string"!=typeof c)throw"SceneGraph: invalid node name"}this.Group=augment.extend(this,{constructor:c,type:"group"}),this.Rect=augment.extend(this,{constructor:c,type:"rect"}),this.Text=augment.extend(this,{constructor:function(a){c.call(this),this.properties.text=a},type:"text"})}),g=new e;return this.Shape=f,this.root=g,this};for(var F in A.flags)A.flags.hasOwnProperty(F)&&(A.flags[F].match=function(a){return a.match(this.regex)});A.setup={renderer:"html",debounce:100,ratio:1,supportsCanvas:!1,supportsSVG:!1,lineWrapRatio:.9,renderers:["html","canvas","svg"]},A.dpr=function(a){return a*A.setup.ratio},A.vars={preempted:!1,resizableImages:[],debounceTimer:null,cache:{}},function(){var a=1,c=1,d=l("canvas"),e=null;d.getContext&&-1!=d.toDataURL("image/png").indexOf("data:image/png")&&(A.setup.renderer="canvas",e=d.getContext("2d"),A.setup.supportsCanvas=!0),A.setup.supportsCanvas&&(a=b.devicePixelRatio||1,c=e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1),A.setup.ratio=a/c,y.createElementNS&&y.createElementNS(x,"svg").createSVGRect&&(A.setup.renderer="svg",A.setup.supportsSVG=!0)}(),a(z,"Holder",b),b.onDomReady&&b.onDomReady(function(){A.vars.preempted||z.run(),b.addEventListener?(b.addEventListener("resize",s,!1),b.addEventListener("orientationchange",s,!1)):b.attachEvent("onresize",s),"object"==typeof b.Turbolinks&&b.document.addEventListener("page:change",function(){z.run()})})}(function(a,b,c){var d="function"==typeof define&&define.amd;d?define(a):c[b]=a},this),/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */
function(a){var b=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,getUniqueId:function(){var a=0;return function(){return a++}}(),templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},noop:function(){}}}(),c="0.10.5",d=function(){"use strict";function a(a){return a=b.toStr(a),a?a.split(/\s+/):[]}function c(a){return a=b.toStr(a),a?a.split(/\W+/):[]}function d(a){return function(){var c=[].slice.call(arguments,0);return function(d){var e=[];return b.each(c,function(c){e=e.concat(a(b.toStr(d[c])))}),e}}}return{nonword:c,whitespace:a,obj:{nonword:d(c),whitespace:d(a)}}}(),e=function(){"use strict";function c(c){this.maxSize=b.isNumber(c)?c:100,this.reset(),this.maxSize<=0&&(this.set=this.get=a.noop)}function d(){this.head=this.tail=null}function e(a,b){this.key=a,this.val=b,this.prev=this.next=null}return b.mixin(c.prototype,{set:function(a,b){var c,d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key]),(c=this.hash[a])?(c.val=b,this.list.moveToFront(c)):(c=new e(a,b),this.list.add(c),this.hash[a]=c,this.size++)},get:function(a){var b=this.hash[a];return b?(this.list.moveToFront(b),b.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new d}}),b.mixin(d.prototype,{add:function(a){this.head&&(a.next=this.head,this.head.prev=a),this.head=a,this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a),this.add(a)}}),c}(),f=function(){"use strict";function a(a){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+b.escapeRegExChars(this.prefix))}function c(){return(new Date).getTime()}function d(a){return JSON.stringify(b.isUndefined(a)?null:a)}function e(a){return JSON.parse(a)}var f,g;try{f=window.localStorage,f.setItem("~~~","!"),f.removeItem("~~~")}catch(h){f=null}return g=f&&window.JSON?{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},get:function(a){return this.isExpired(a)&&this.remove(a),e(f.getItem(this._prefix(a)))},set:function(a,e,g){return b.isNumber(g)?f.setItem(this._ttlKey(a),d(c()+g)):f.removeItem(this._ttlKey(a)),f.setItem(this._prefix(a),d(e))},remove:function(a){return f.removeItem(this._ttlKey(a)),f.removeItem(this._prefix(a)),this},clear:function(){var a,b,c=[],d=f.length;for(a=0;d>a;a++)(b=f.key(a)).match(this.keyMatcher)&&c.push(b.replace(this.keyMatcher,""));for(a=c.length;a--;)this.remove(c[a]);return this},isExpired:function(a){var d=e(f.getItem(this._ttlKey(a)));return b.isNumber(d)&&c()>d?!0:!1}}:{get:b.noop,set:b.noop,remove:b.noop,clear:b.noop,isExpired:b.noop},b.mixin(a.prototype,g),a}(),g=function(){"use strict";function c(b){b=b||{},this.cancelled=!1,this.lastUrl=null,this._send=b.transport?d(b.transport):a.ajax,this._get=b.rateLimiter?b.rateLimiter(this._get):this._get,this._cache=b.cache===!1?new e(0):i}function d(c){return function(d,e){function f(a){b.defer(function(){h.resolve(a)})}function g(a){b.defer(function(){h.reject(a)})}var h=a.Deferred();return c(d,e,f,g),h}}var f=0,g={},h=6,i=new e(10);return c.setMaxPendingRequests=function(a){h=a},c.resetCache=function(){i.reset()},b.mixin(c.prototype,{_get:function(a,b,c){function d(b){c&&c(null,b),k._cache.set(a,b)}function e(){c&&c(!0)}function i(){f--,delete g[a],k.onDeckRequestArgs&&(k._get.apply(k,k.onDeckRequestArgs),k.onDeckRequestArgs=null)}var j,k=this;this.cancelled||a!==this.lastUrl||((j=g[a])?j.done(d).fail(e):h>f?(f++,g[a]=this._send(a,b).done(d).fail(e).always(i)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(a,c,d){var e;return b.isFunction(c)&&(d=c,c={}),this.cancelled=!1,this.lastUrl=a,(e=this._cache.get(a))?b.defer(function(){d&&d(null,e)}):this._get(a,c,d),!!e},cancel:function(){this.cancelled=!0}}),c}(),h=function(){"use strict";function c(b){b=b||{},b.datumTokenizer&&b.queryTokenizer||a.error("datumTokenizer and queryTokenizer are both required"),this.datumTokenizer=b.datumTokenizer,this.queryTokenizer=b.queryTokenizer,this.reset()}function d(a){return a=b.filter(a,function(a){return!!a}),a=b.map(a,function(a){return a.toLowerCase()})}function e(){return{ids:[],children:{}}}function f(a){for(var b={},c=[],d=0,e=a.length;e>d;d++)b[a[d]]||(b[a[d]]=!0,c.push(a[d]));return c}function g(a,b){function c(a,b){return a-b}var d=0,e=0,f=[];a=a.sort(c),b=b.sort(c);for(var g=a.length,h=b.length;g>d&&h>e;)a[d]<b[e]?d++:a[d]>b[e]?e++:(f.push(a[d]),d++,e++);return f}return b.mixin(c.prototype,{bootstrap:function(a){this.datums=a.datums,this.trie=a.trie},add:function(a){var c=this;a=b.isArray(a)?a:[a],b.each(a,function(a){var f,g;f=c.datums.push(a)-1,g=d(c.datumTokenizer(a)),b.each(g,function(a){var b,d,g;for(b=c.trie,d=a.split("");g=d.shift();)b=b.children[g]||(b.children[g]=e()),b.ids.push(f)})})},get:function(a){var c,e,h=this;return c=d(this.queryTokenizer(a)),b.each(c,function(a){var b,c,d,f;if(e&&0===e.length)return!1;for(b=h.trie,c=a.split("");b&&(d=c.shift());)b=b.children[d];return b&&0===c.length?(f=b.ids.slice(0),void(e=e?g(e,f):f)):(e=[],!1)}),e?b.map(f(e),function(a){return h.datums[a]}):[]},reset:function(){this.datums=[],this.trie=e()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),c}(),i=function(){"use strict";function d(a){return a.local||null}function e(d){var e,f;return f={url:null,thumbprint:"",ttl:864e5,filter:null,ajax:{}},(e=d.prefetch||null)&&(e=b.isString(e)?{url:e}:e,e=b.mixin(f,e),e.thumbprint=c+e.thumbprint,e.ajax.type=e.ajax.type||"GET",e.ajax.dataType=e.ajax.dataType||"json",!e.url&&a.error("prefetch requires url to be set")),e}function f(c){function d(a){return function(c){return b.debounce(c,a)}}function e(a){return function(c){return b.throttle(c,a)}}var f,g;return g={url:null,cache:!0,wildcard:"%QUERY",replace:null,rateLimitBy:"debounce",rateLimitWait:300,send:null,filter:null,ajax:{}},(f=c.remote||null)&&(f=b.isString(f)?{url:f}:f,f=b.mixin(g,f),f.rateLimiter=/^throttle$/i.test(f.rateLimitBy)?e(f.rateLimitWait):d(f.rateLimitWait),f.ajax.type=f.ajax.type||"GET",f.ajax.dataType=f.ajax.dataType||"json",delete f.rateLimitBy,delete f.rateLimitWait,!f.url&&a.error("remote requires url to be set")),f}return{local:d,prefetch:e,remote:f}}();!function(c){"use strict";function e(b){b&&(b.local||b.prefetch||b.remote)||a.error("one of local, prefetch, or remote is required"),this.limit=b.limit||5,this.sorter=j(b.sorter),this.dupDetector=b.dupDetector||k,this.local=i.local(b),this.prefetch=i.prefetch(b),this.remote=i.remote(b),this.cacheKey=this.prefetch?this.prefetch.cacheKey||this.prefetch.url:null,this.index=new h({datumTokenizer:b.datumTokenizer,queryTokenizer:b.queryTokenizer}),this.storage=this.cacheKey?new f(this.cacheKey):null}function j(a){function c(b){return b.sort(a)}function d(a){return a}return b.isFunction(a)?c:d}function k(){return!1}var l,m;return l=c.Bloodhound,m={data:"data",protocol:"protocol",thumbprint:"thumbprint"},c.Bloodhound=e,e.noConflict=function(){return c.Bloodhound=l,e},e.tokenizers=d,b.mixin(e.prototype,{_loadPrefetch:function(b){function c(a){f.clear(),f.add(b.filter?b.filter(a):a),f._saveToStorage(f.index.serialize(),b.thumbprint,b.ttl)}var d,e,f=this;return(d=this._readFromStorage(b.thumbprint))?(this.index.bootstrap(d),e=a.Deferred().resolve()):e=a.ajax(b.url,b.ajax).done(c),e},_getFromRemote:function(a,b){function c(a,c){b(a?[]:f.remote.filter?f.remote.filter(c):c)}var d,e,f=this;if(this.transport)return a=a||"",e=encodeURIComponent(a),d=this.remote.replace?this.remote.replace(this.remote.url,a):this.remote.url.replace(this.remote.wildcard,e),this.transport.get(d,this.remote.ajax,c)},_cancelLastRemoteRequest:function(){this.transport&&this.transport.cancel()},_saveToStorage:function(a,b,c){this.storage&&(this.storage.set(m.data,a,c),this.storage.set(m.protocol,location.protocol,c),this.storage.set(m.thumbprint,b,c))},_readFromStorage:function(a){var b,c={};return this.storage&&(c.data=this.storage.get(m.data),c.protocol=this.storage.get(m.protocol),c.thumbprint=this.storage.get(m.thumbprint)),b=c.thumbprint!==a||c.protocol!==location.protocol,c.data&&!b?c.data:null},_initialize:function(){function c(){e.add(b.isFunction(f)?f():f)}var d,e=this,f=this.local;return d=this.prefetch?this._loadPrefetch(this.prefetch):a.Deferred().resolve(),f&&d.done(c),this.transport=this.remote?new g(this.remote):null,this.initPromise=d.promise()},initialize:function(a){return!this.initPromise||a?this._initialize():this.initPromise},add:function(a){this.index.add(a)},get:function(a,c){function d(a){var d=f.slice(0);b.each(a,function(a){var c;return c=b.some(d,function(b){return e.dupDetector(a,b)}),!c&&d.push(a),d.length<e.limit}),c&&c(e.sorter(d))}var e=this,f=[],g=!1;f=this.index.get(a),f=this.sorter(f).slice(0,this.limit),f.length<this.limit?g=this._getFromRemote(a,d):this._cancelLastRemoteRequest(),g||(f.length>0||!this.transport)&&c&&c(f)},clear:function(){this.index.reset()},clearPrefetchCache:function(){this.storage&&this.storage.clear()},clearRemoteCache:function(){this.transport&&g.resetCache()},ttAdapter:function(){return b.bind(this.get,this)}}),e}(this);var j=function(){return{wrapper:'<span class="twitter-typeahead"></span>',dropdown:'<span class="tt-dropdown-menu"></span>',dataset:'<div class="tt-dataset-%CLASS%"></div>',suggestions:'<span class="tt-suggestions"></span>',suggestion:'<div class="tt-suggestion"></div>'}}(),k=function(){"use strict";var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},dropdown:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},suggestions:{display:"block"},suggestion:{whiteSpace:"nowrap",cursor:"pointer"},suggestionChild:{whiteSpace:"normal"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),b.isMsie()&&b.isMsie()<=7&&b.mixin(a.input,{marginTop:"-1px"}),a}(),l=function(){"use strict";function c(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d="typeahead:";return b.mixin(c.prototype,{trigger:function(a){var b=[].slice.call(arguments,1);this.$el.trigger(d+a,b)}}),c}(),m=function(){"use strict";function a(a,b,c,d){var e;if(!c)return this;for(b=b.split(i),c=d?h(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function b(b,c,d){return a.call(this,"async",b,c,d)}function c(b,c,d){return a.call(this,"sync",b,c,d)}function d(a){var b;if(!this._callbacks)return this;for(a=a.split(i);b=a.shift();)delete this._callbacks[b];return this}function e(a){var b,c,d,e,g;if(!this._callbacks)return this;for(a=a.split(i),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=f(c.sync,this,[b].concat(d)),g=f(c.async,this,[b].concat(d)),e()&&j(g);return this}function f(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&f>e;e+=1)d=a[e].apply(b,c)===!1;return!d}return d}function g(){var a;return a=window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)}}function h(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var i=/\s+/,j=g();return{onSync:c,onAsync:b,off:d,trigger:e}}(),n=function(a){"use strict";function c(a,c,d){for(var e,f=[],g=0,h=a.length;h>g;g++)f.push(b.escapeRegExChars(a[g]));return e=d?"\\b("+f.join("|")+")\\b":"("+f.join("|")+")",c?new RegExp(e):new RegExp(e,"i")}var d={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(e){function f(b){var c,d,f;return(c=h.exec(b.data))&&(f=a.createElement(e.tagName),e.className&&(f.className=e.className),d=b.splitText(c.index),d.splitText(c[0].length),f.appendChild(d.cloneNode(!0)),b.parentNode.replaceChild(f,d)),!!c}function g(a,b){for(var c,d=3,e=0;e<a.childNodes.length;e++)c=a.childNodes[e],c.nodeType===d?e+=b(c)?1:0:g(c,b)}var h;e=b.mixin({},d,e),e.node&&e.pattern&&(e.pattern=b.isArray(e.pattern)?e.pattern:[e.pattern],h=c(e.pattern,e.caseSensitive,e.wordsOnly),g(e.node,f))}}(window.document),o=function(){"use strict";function c(c){var e,f,h,i,j=this;c=c||{},c.input||a.error("input is missing"),e=b.bind(this._onBlur,this),f=b.bind(this._onFocus,this),h=b.bind(this._onKeydown,this),i=b.bind(this._onInput,this),this.$hint=a(c.hint),this.$input=a(c.input).on("blur.tt",e).on("focus.tt",f).on("keydown.tt",h),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop),b.isMsie()?this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){g[a.which||a.keyCode]||b.defer(b.bind(j._onInput,j,a))}):this.$input.on("input.tt",i),this.query=this.$input.val(),this.$overflowHelper=d(this.$input)}function d(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function e(a,b){return c.normalizeQuery(a)===c.normalizeQuery(b)}function f(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var g;return g={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},c.normalizeQuery=function(a){return(a||"").replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(c.prototype,m,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.trigger("focused")},_onKeydown:function(a){var b=g[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._checkInputValue()},_managePreventDefault:function(a,b){var c,d,e;switch(a){case"tab":d=this.getHint(),e=this.getInputValue(),c=d&&d!==e&&!f(b);break;case"up":case"down":c=!f(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!f(b);break;default:c=!0}return c},_checkInputValue:function(){var a,b,c;a=this.getInputValue(),b=e(a,this.query),c=b?this.query.length!==a.length:!1,this.query=a,b?c&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(a){this.query=a},getInputValue:function(){return this.$input.val()},setInputValue:function(a,b){this.$input.val(a),b?this.clearHint():this._checkInputValue()},resetInputValue:function(){this.setInputValue(this.query,!0)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),d=""!==a&&c&&!this.hasOverflow(),!d&&this.clearHint()},getLanguageDirection:function(){return(this.$input.css("direction")||"ltr").toLowerCase()},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:document.selection?(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$hint=this.$input=this.$overflowHelper=null}}),c}(),p=function(){"use strict";function c(c){c=c||{},c.templates=c.templates||{},c.source||a.error("missing source"),c.name&&!f(c.name)&&a.error("invalid dataset name: "+c.name),this.query=null,this.highlight=!!c.highlight,this.name=c.name||b.getUniqueId(),this.source=c.source,this.displayFn=d(c.display||c.displayKey),this.templates=e(c.templates,this.displayFn),this.$el=a(j.dataset.replace("%CLASS%",this.name))}function d(a){function c(b){return b[a]}return a=a||"value",b.isFunction(a)?a:c}function e(a,c){function d(a){return"<p>"+c(a)+"</p>"}return{empty:a.empty&&b.templatify(a.empty),header:a.header&&b.templatify(a.header),footer:a.footer&&b.templatify(a.footer),suggestion:a.suggestion||d}}function f(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var g="ttDataset",h="ttValue",i="ttDatum";return c.extractDatasetName=function(b){return a(b).data(g)},c.extractValue=function(b){return a(b).data(h)},c.extractDatum=function(b){return a(b).data(i)},b.mixin(c.prototype,m,{_render:function(c,d){function e(){return p.templates.empty({query:c,isEmpty:!0})}function f(){function e(b){var c;return c=a(j.suggestion).append(p.templates.suggestion(b)).data(g,p.name).data(h,p.displayFn(b)).data(i,b),c.children().each(function(){a(this).css(k.suggestionChild)}),c}var f,l;return f=a(j.suggestions).css(k.suggestions),l=b.map(d,e),f.append.apply(f,l),p.highlight&&n({className:"tt-highlight",node:f[0],pattern:c}),f}function l(){return p.templates.header({query:c,isEmpty:!o})}function m(){return p.templates.footer({query:c,isEmpty:!o})}if(this.$el){var o,p=this;this.$el.empty(),o=d&&d.length,!o&&this.templates.empty?this.$el.html(e()).prepend(p.templates.header?l():null).append(p.templates.footer?m():null):o&&this.$el.html(f()).prepend(p.templates.header?l():null).append(p.templates.footer?m():null),this.trigger("rendered")}},getRoot:function(){return this.$el},update:function(a){function b(b){c.canceled||a!==c.query||c._render(a,b)}var c=this;this.query=a,this.canceled=!1,this.source(a,b)},cancel:function(){this.canceled=!0},clear:function(){this.cancel(),this.$el.empty(),this.trigger("rendered")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=null}}),c}(),q=function(){"use strict";function c(c){var e,f,g,h=this;c=c||{},c.menu||a.error("menu is required"),this.isOpen=!1,this.isEmpty=!0,this.datasets=b.map(c.datasets,d),e=b.bind(this._onSuggestionClick,this),f=b.bind(this._onSuggestionMouseEnter,this),g=b.bind(this._onSuggestionMouseLeave,this),this.$menu=a(c.menu).on("click.tt",".tt-suggestion",e).on("mouseenter.tt",".tt-suggestion",f).on("mouseleave.tt",".tt-suggestion",g),b.each(this.datasets,function(a){h.$menu.append(a.getRoot()),a.onSync("rendered",h._onRendered,h)})}function d(a){return new p(a)}return b.mixin(c.prototype,m,{_onSuggestionClick:function(b){this.trigger("suggestionClicked",a(b.currentTarget))},_onSuggestionMouseEnter:function(b){this._removeCursor(),this._setCursor(a(b.currentTarget),!0)},_onSuggestionMouseLeave:function(){this._removeCursor()},_onRendered:function(){function a(a){return a.isEmpty()}this.isEmpty=b.every(this.datasets,a),this.isEmpty?this._hide():this.isOpen&&this._show(),this.trigger("datasetRendered")},_hide:function(){this.$menu.hide()},_show:function(){this.$menu.css("display","block")},_getSuggestions:function(){return this.$menu.find(".tt-suggestion")},_getCursor:function(){return this.$menu.find(".tt-cursor").first()},_setCursor:function(a,b){a.first().addClass("tt-cursor"),!b&&this.trigger("cursorMoved")},_removeCursor:function(){this._getCursor().removeClass("tt-cursor")},_moveCursor:function(a){var b,c,d,e;if(this.isOpen){if(c=this._getCursor(),b=this._getSuggestions(),this._removeCursor(),d=b.index(c)+a,d=(d+1)%(b.length+1)-1,-1===d)return void this.trigger("cursorRemoved");-1>d&&(d=b.length-1),this._setCursor(e=b.eq(d)),this._ensureVisible(e)}},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.outerHeight(!0),d=this.$menu.scrollTop(),e=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10),0>b?this.$menu.scrollTop(d+b):c>e&&this.$menu.scrollTop(d+(c-e))},close:function(){this.isOpen&&(this.isOpen=!1,this._removeCursor(),this._hide(),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,!this.isEmpty&&this._show(),this.trigger("opened"))},setLanguageDirection:function(a){this.$menu.css("ltr"===a?k.ltr:k.rtl)},moveCursorUp:function(){this._moveCursor(-1)},moveCursorDown:function(){this._moveCursor(1)},getDatumForSuggestion:function(a){var b=null;return a.length&&(b={raw:p.extractDatum(a),value:p.extractValue(a),datasetName:p.extractDatasetName(a)}),b},getDatumForCursor:function(){return this.getDatumForSuggestion(this._getCursor().first())},getDatumForTopSuggestion:function(){return this.getDatumForSuggestion(this._getSuggestions().first())},update:function(a){function c(b){b.update(a)}b.each(this.datasets,c)},empty:function(){function a(a){a.clear()}b.each(this.datasets,a),this.isEmpty=!0},isVisible:function(){return this.isOpen&&!this.isEmpty},destroy:function(){function a(a){a.destroy()}this.$menu.off(".tt"),this.$menu=null,b.each(this.datasets,a)}}),c}(),r=function(){"use strict";function c(c){var e,f,g;c=c||{},c.input||a.error("missing input"),this.isActivated=!1,this.autoselect=!!c.autoselect,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.$node=d(c.input,c.withHint),e=this.$node.find(".tt-dropdown-menu"),f=this.$node.find(".tt-input"),g=this.$node.find(".tt-hint"),f.on("blur.tt",function(a){var c,d,g;c=document.activeElement,d=e.is(c),g=e.has(c).length>0,b.isMsie()&&(d||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){f.focus()}))}),e.on("mousedown.tt",function(a){a.preventDefault()}),this.eventBus=c.eventBus||new l({el:f}),this.dropdown=new q({menu:e,datasets:c.datasets}).onSync("suggestionClicked",this._onSuggestionClicked,this).onSync("cursorMoved",this._onCursorMoved,this).onSync("cursorRemoved",this._onCursorRemoved,this).onSync("opened",this._onOpened,this).onSync("closed",this._onClosed,this).onAsync("datasetRendered",this._onDatasetRendered,this),this.input=new o({input:f,hint:g}).onSync("focused",this._onFocused,this).onSync("blurred",this._onBlurred,this).onSync("enterKeyed",this._onEnterKeyed,this).onSync("tabKeyed",this._onTabKeyed,this).onSync("escKeyed",this._onEscKeyed,this).onSync("upKeyed",this._onUpKeyed,this).onSync("downKeyed",this._onDownKeyed,this).onSync("leftKeyed",this._onLeftKeyed,this).onSync("rightKeyed",this._onRightKeyed,this).onSync("queryChanged",this._onQueryChanged,this).onSync("whitespaceChanged",this._onWhitespaceChanged,this),this._setLanguageDirection()}function d(b,c){var d,f,h,i;d=a(b),f=a(j.wrapper).css(k.wrapper),h=a(j.dropdown).css(k.dropdown),i=d.clone().css(k.hint).css(e(d)),i.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly",!0).attr({autocomplete:"off",spellcheck:"false",tabindex:-1}),d.data(g,{dir:d.attr("dir"),autocomplete:d.attr("autocomplete"),spellcheck:d.attr("spellcheck"),style:d.attr("style")}),d.addClass("tt-input").attr({autocomplete:"off",spellcheck:!1}).css(c?k.input:k.inputWithNoHint);try{!d.attr("dir")&&d.attr("dir","auto")}catch(l){}return d.wrap(f).parent().prepend(c?i:null).append(h)}function e(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function f(a){var c=a.find(".tt-input");b.each(c.data(g),function(a,d){b.isUndefined(a)?c.removeAttr(d):c.attr(d,a)}),c.detach().removeData(g).removeClass("tt-input").insertAfter(a),a.remove()}var g="ttAttrs";return b.mixin(c.prototype,{_onSuggestionClicked:function(a,b){var c;(c=this.dropdown.getDatumForSuggestion(b))&&this._select(c)},_onCursorMoved:function(){var a=this.dropdown.getDatumForCursor();this.input.setInputValue(a.value,!0),this.eventBus.trigger("cursorchanged",a.raw,a.datasetName)},_onCursorRemoved:function(){this.input.resetInputValue(),this._updateHint()},_onDatasetRendered:function(){this._updateHint()},_onOpened:function(){this._updateHint(),this.eventBus.trigger("opened")},_onClosed:function(){this.input.clearHint(),this.eventBus.trigger("closed")},_onFocused:function(){this.isActivated=!0,this.dropdown.open()},_onBlurred:function(){this.isActivated=!1,this.dropdown.empty(),this.dropdown.close()},_onEnterKeyed:function(a,b){var c,d;c=this.dropdown.getDatumForCursor(),d=this.dropdown.getDatumForTopSuggestion(),c?(this._select(c),b.preventDefault()):this.autoselect&&d&&(this._select(d),b.preventDefault())},_onTabKeyed:function(a,b){var c;(c=this.dropdown.getDatumForCursor())?(this._select(c),b.preventDefault()):this._autocomplete(!0)},_onEscKeyed:function(){this.dropdown.close(),this.input.resetInputValue()},_onUpKeyed:function(){var a=this.input.getQuery();this.dropdown.isEmpty&&a.length>=this.minLength?this.dropdown.update(a):this.dropdown.moveCursorUp(),this.dropdown.open()},_onDownKeyed:function(){var a=this.input.getQuery();this.dropdown.isEmpty&&a.length>=this.minLength?this.dropdown.update(a):this.dropdown.moveCursorDown(),this.dropdown.open()},_onLeftKeyed:function(){"rtl"===this.dir&&this._autocomplete()},_onRightKeyed:function(){"ltr"===this.dir&&this._autocomplete()},_onQueryChanged:function(a,b){this.input.clearHintIfInvalid(),b.length>=this.minLength?this.dropdown.update(b):this.dropdown.empty(),this.dropdown.open(),this._setLanguageDirection()},_onWhitespaceChanged:function(){this._updateHint(),this.dropdown.open()},_setLanguageDirection:function(){var a;this.dir!==(a=this.input.getLanguageDirection())&&(this.dir=a,this.$node.css("direction",a),this.dropdown.setLanguageDirection(a))},_updateHint:function(){var a,c,d,e,f,g;a=this.dropdown.getDatumForTopSuggestion(),a&&this.dropdown.isVisible()&&!this.input.hasOverflow()?(c=this.input.getInputValue(),d=o.normalizeQuery(c),e=b.escapeRegExChars(d),f=new RegExp("^(?:"+e+")(.+$)","i"),g=f.exec(a.value),g?this.input.setHint(c+g[1]):this.input.clearHint()):this.input.clearHint()},_autocomplete:function(a){var b,c,d,e;b=this.input.getHint(),c=this.input.getQuery(),d=a||this.input.isCursorAtEnd(),b&&c!==b&&d&&(e=this.dropdown.getDatumForTopSuggestion(),e&&this.input.setInputValue(e.value),this.eventBus.trigger("autocompleted",e.raw,e.datasetName))},_select:function(a){this.input.setQuery(a.value),this.input.setInputValue(a.value,!0),this._setLanguageDirection(),this.eventBus.trigger("selected",a.raw,a.datasetName),this.dropdown.close(),b.defer(b.bind(this.dropdown.empty,this.dropdown))},open:function(){this.dropdown.open()},close:function(){this.dropdown.close()},setVal:function(a){a=b.toStr(a),this.isActivated?this.input.setInputValue(a):(this.input.setQuery(a),this.input.setInputValue(a,!0)),this._setLanguageDirection()},getVal:function(){return this.input.getQuery()},destroy:function(){this.input.destroy(),this.dropdown.destroy(),f(this.$node),this.$node=null}}),c}();!function(){"use strict";var c,d,e;c=a.fn.typeahead,d="ttTypeahead",e={initialize:function(c,e){function f(){var f,g,h=a(this);b.each(e,function(a){a.highlight=!!c.highlight}),g=new r({input:h,eventBus:f=new l({el:h}),withHint:b.isUndefined(c.hint)?!0:!!c.hint,minLength:c.minLength,autoselect:c.autoselect,datasets:e}),h.data(d,g)}return e=b.isArray(e)?e:[].slice.call(arguments,1),c=c||{},this.each(f)},open:function(){function b(){var b,c=a(this);(b=c.data(d))&&b.open()}return this.each(b)},close:function(){function b(){var b,c=a(this);(b=c.data(d))&&b.close()}return this.each(b)},val:function(b){function c(){var c,e=a(this);(c=e.data(d))&&c.setVal(b)}function e(a){var b,c;return(b=a.data(d))&&(c=b.getVal()),c}return arguments.length?this.each(c):e(this.first())},destroy:function(){function b(){var b,c=a(this);(b=c.data(d))&&(b.destroy(),c.removeData(d))}return this.each(b)}},a.fn.typeahead=function(b){var c;return e[b]&&"initialize"!==b?(c=this.filter(function(){return!!a(this).data(d)}),e[b].apply(c,[].slice.call(arguments,1))):e.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=c,this}}()}(window.jQuery),function(a,b,c){function d(a){var b={},d=/^jQuery\d+$/;return c.each(a.attributes,function(a,c){c.specified&&!d.test(c.name)&&(b[c.name]=c.value)}),b}function e(a,b){var d=this,e=c(d);if(d.value==e.attr("placeholder")&&e.hasClass("placeholder"))if(e.data("placeholder-password")){if(e=e.hide().next().show().attr("id",e.removeAttr("id").data("placeholder-id")),a===!0)return e[0].value=b;e.focus()}else d.value="",e.removeClass("placeholder"),d==g()&&d.select()}function f(){var a,b=this,f=c(b),g=this.id;if(""==b.value){if("password"==b.type){if(!f.data("placeholder-textinput")){try{a=f.clone().attr({type:"text"})}catch(h){a=c("<input>").attr(c.extend(d(this),{type:"text"}))}a.removeAttr("name").data({"placeholder-password":f,"placeholder-id":g}).bind("focus.placeholder",e),f.data({"placeholder-textinput":a,"placeholder-id":g}).before(a)}f=f.removeAttr("id").hide().prev().attr("id",g).show()}f.addClass("placeholder"),f[0].value=f.attr("placeholder")}else f.removeClass("placeholder")}function g(){try{return b.activeElement}catch(a){}}var h,i,j="[object OperaMini]"==Object.prototype.toString.call(a.operamini),k="placeholder"in b.createElement("input")&&!j,l="placeholder"in b.createElement("textarea")&&!j,m=c.fn,n=c.valHooks,o=c.propHooks;k&&l?(i=m.placeholder=function(){return this},i.input=i.textarea=!0):(i=m.placeholder=function(){var a=this;return a.filter((k?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":e,"blur.placeholder":f}).data("placeholder-enabled",!0).trigger("blur.placeholder"),a},i.input=k,i.textarea=l,h={get:function(a){var b=c(a),d=b.data("placeholder-password");return d?d[0].value:b.data("placeholder-enabled")&&b.hasClass("placeholder")?"":a.value},set:function(a,b){var d=c(a),h=d.data("placeholder-password");return h?h[0].value=b:d.data("placeholder-enabled")?(""==b?(a.value=b,a!=g()&&f.call(a)):d.hasClass("placeholder")?e.call(a,!0,b)||(a.value=b):a.value=b,d):a.value=b}},k||(n.input=h,o.value=h),l||(n.textarea=h,o.value=h),c(function(){c(b).delegate("form","submit.placeholder",function(){var a=c(".placeholder",this).each(e);setTimeout(function(){a.each(f)},10)})}),c(a).bind("beforeunload.placeholder",function(){c(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery),function(a){"undefined"==typeof a.fn.each2&&a.extend(a.fn,{each2:function(b){for(var c=a([0]),d=-1,e=this.length;++d<e&&(c.context=c[0]=this[d])&&b.call(c[0],d,c)!==!1;);return this}})}(jQuery),function(a,b){"use strict";
function c(b){var c=a(document.createTextNode(""));b.before(c),c.before(b),c.remove()}function d(a){function b(a){return O[a]||a}return a.replace(/[^\u0000-\u007E]/g,b)}function e(a,b){for(var c=0,d=b.length;d>c;c+=1)if(g(a,b[c]))return c;return-1}function f(){var b=a(N);b.appendTo(document.body);var c={width:b.width()-b[0].clientWidth,height:b.height()-b[0].clientHeight};return b.remove(),c}function g(a,c){return a===c?!0:a===b||c===b?!1:null===a||null===c?!1:a.constructor===String?a+""==c+"":c.constructor===String?c+""==a+"":!1}function h(a,b,c){var d,e,f;if(null===a||a.length<1)return[];for(d=a.split(b),e=0,f=d.length;f>e;e+=1)d[e]=c(d[e]);return d}function i(a){return a.outerWidth(!1)-a.width()}function j(c){var d="keyup-change-value";c.on("keydown",function(){a.data(c,d)===b&&a.data(c,d,c.val())}),c.on("keyup",function(){var e=a.data(c,d);e!==b&&c.val()!==e&&(a.removeData(c,d),c.trigger("keyup-change"))})}function k(c){c.on("mousemove",function(c){var d=L;(d===b||d.x!==c.pageX||d.y!==c.pageY)&&a(c.target).trigger("mousemove-filtered",c)})}function l(a,c,d){d=d||b;var e;return function(){var b=arguments;window.clearTimeout(e),e=window.setTimeout(function(){c.apply(d,b)},a)}}function m(a,b){var c=l(a,function(a){b.trigger("scroll-debounced",a)});b.on("scroll",function(a){e(a.target,b.get())>=0&&c(a)})}function n(a){a[0]!==document.activeElement&&window.setTimeout(function(){var b,c=a[0],d=a.val().length;a.focus();var e=c.offsetWidth>0||c.offsetHeight>0;e&&c===document.activeElement&&(c.setSelectionRange?c.setSelectionRange(d,d):c.createTextRange&&(b=c.createTextRange(),b.collapse(!1),b.select()))},0)}function o(b){b=a(b)[0];var c=0,d=0;if("selectionStart"in b)c=b.selectionStart,d=b.selectionEnd-c;else if("selection"in document){b.focus();var e=document.selection.createRange();d=document.selection.createRange().text.length,e.moveStart("character",-b.value.length),c=e.text.length-d}return{offset:c,length:d}}function p(a){a.preventDefault(),a.stopPropagation()}function q(a){a.preventDefault(),a.stopImmediatePropagation()}function r(b){if(!I){var c=b[0].currentStyle||window.getComputedStyle(b[0],null);I=a(document.createElement("div")).css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:c.fontSize,fontFamily:c.fontFamily,fontStyle:c.fontStyle,fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,textTransform:c.textTransform,whiteSpace:"nowrap"}),I.attr("class","select2-sizer"),a(document.body).append(I)}return I.text(b.val()),I.width()}function s(b,c,d){var e,f,g=[];e=a.trim(b.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each2(function(){0===this.indexOf("select2-")&&g.push(this)})),e=a.trim(c.attr("class")),e&&(e=""+e,a(e.split(/\s+/)).each2(function(){0!==this.indexOf("select2-")&&(f=d(this),f&&g.push(f))})),b.attr("class",g.join(" "))}function t(a,b,c,e){var f=d(a.toUpperCase()).indexOf(d(b.toUpperCase())),g=b.length;return 0>f?void c.push(e(a)):(c.push(e(a.substring(0,f))),c.push("<span class='select2-match'>"),c.push(e(a.substring(f,f+g))),c.push("</span>"),void c.push(e(a.substring(f+g,a.length))))}function u(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})}function v(c){var d,e=null,f=c.quietMillis||100,g=c.url,h=this;return function(i){window.clearTimeout(d),d=window.setTimeout(function(){var d=c.data,f=g,j=c.transport||a.fn.select2.ajaxDefaults.transport,k={type:c.type||"GET",cache:c.cache||!1,jsonpCallback:c.jsonpCallback||b,dataType:c.dataType||"json"},l=a.extend({},a.fn.select2.ajaxDefaults.params,k);d=d?d.call(h,i.term,i.page,i.context):null,f="function"==typeof f?f.call(h,i.term,i.page,i.context):f,e&&"function"==typeof e.abort&&e.abort(),c.params&&(a.isFunction(c.params)?a.extend(l,c.params.call(h)):a.extend(l,c.params)),a.extend(l,{url:f,dataType:c.dataType,data:d,success:function(a){var b=c.results(a,i.page,i);i.callback(b)},error:function(a,b,c){var d={hasError:!0,jqXHR:a,textStatus:b,errorThrown:c};i.callback(d)}}),e=j.call(h,l)},f)}}function w(b){var c,d,e=b,f=function(a){return""+a.text};a.isArray(e)&&(d=e,e={results:d}),a.isFunction(e)===!1&&(d=e,e=function(){return d});var g=e();return g.text&&(f=g.text,a.isFunction(f)||(c=g.text,f=function(a){return a[c]})),function(b){var c,d=b.term,g={results:[]};return""===d?void b.callback(e()):(c=function(e,g){var h,i;if(e=e[0],e.children){h={};for(i in e)e.hasOwnProperty(i)&&(h[i]=e[i]);h.children=[],a(e.children).each2(function(a,b){c(b,h.children)}),(h.children.length||b.matcher(d,f(h),e))&&g.push(h)}else b.matcher(d,f(e),e)&&g.push(e)},a(e().results).each2(function(a,b){c(b,g.results)}),void b.callback(g))}}function x(c){var d=a.isFunction(c);return function(e){var f=e.term,g={results:[]},h=d?c(e):c;a.isArray(h)&&(a(h).each(function(){var a=this.text!==b,c=a?this.text:this;(""===f||e.matcher(f,c))&&g.results.push(a?this:{id:this,text:this})}),e.callback(g))}}function y(b,c){if(a.isFunction(b))return!0;if(!b)return!1;if("string"==typeof b)return!0;throw new Error(c+" must be a string, function, or falsy value")}function z(b,c){if(a.isFunction(b)){var d=Array.prototype.slice.call(arguments,2);return b.apply(c,d)}return b}function A(b){var c=0;return a.each(b,function(a,b){b.children?c+=A(b.children):c++}),c}function B(a,c,d,e){var f,h,i,j,k,l=a,m=!1;if(!e.createSearchChoice||!e.tokenSeparators||e.tokenSeparators.length<1)return b;for(;;){for(h=-1,i=0,j=e.tokenSeparators.length;j>i&&(k=e.tokenSeparators[i],h=a.indexOf(k),!(h>=0));i++);if(0>h)break;if(f=a.substring(0,h),a=a.substring(h+k.length),f.length>0&&(f=e.createSearchChoice.call(this,f,c),f!==b&&null!==f&&e.id(f)!==b&&null!==e.id(f))){for(m=!1,i=0,j=c.length;j>i;i++)if(g(e.id(f),e.id(c[i]))){m=!0;break}m||d(f)}}return l!==a?a:void 0}function C(){var b=this;a.each(arguments,function(a,c){b[c].remove(),b[c]=null})}function D(b,c){var d=function(){};return d.prototype=new b,d.prototype.constructor=d,d.prototype.parent=b.prototype,d.prototype=a.extend(d.prototype,c),d}if(window.Select2===b){var E,F,G,H,I,J,K,L={x:0,y:0},M={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(a){switch(a=a.which?a.which:a){case M.LEFT:case M.RIGHT:case M.UP:case M.DOWN:return!0}return!1},isControl:function(a){var b=a.which;switch(b){case M.SHIFT:case M.CTRL:case M.ALT:return!0}return a.metaKey?!0:!1},isFunctionKey:function(a){return a=a.which?a.which:a,a>=112&&123>=a}},N="<div class='select2-measure-scrollbar'></div>",O={"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"};J=a(document),H=function(){var a=1;return function(){return a++}}(),E=D(Object,{bind:function(a){var b=this;return function(){a.apply(b,arguments)}},init:function(c){var d,e,g=".select2-results";this.opts=c=this.prepareOpts(c),this.id=c.id,c.element.data("select2")!==b&&null!==c.element.data("select2")&&c.element.data("select2").destroy(),this.container=this.createContainer(),this.liveRegion=a(".select2-hidden-accessible"),0==this.liveRegion.length&&(this.liveRegion=a("<span>",{role:"status","aria-live":"polite"}).addClass("select2-hidden-accessible").appendTo(document.body)),this.containerId="s2id_"+(c.element.attr("id")||"autogen"+H()),this.containerEventName=this.containerId.replace(/([.])/g,"_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.container.attr("title",c.element.attr("title")),this.body=a(document.body),s(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.attr("style",c.element.attr("style")),this.container.css(z(c.containerCss,this.opts.element)),this.container.addClass(z(c.containerCssClass,this.opts.element)),this.elementTabIndex=this.opts.element.attr("tabindex"),this.opts.element.data("select2",this).attr("tabindex","-1").before(this.container).on("click.select2",p),this.container.data("select2",this),this.dropdown=this.container.find(".select2-drop"),s(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(z(c.dropdownCssClass,this.opts.element)),this.dropdown.data("select2",this),this.dropdown.on("click",p),this.results=d=this.container.find(g),this.search=e=this.container.find("input.select2-input"),this.queryCount=0,this.resultsPage=0,this.context=null,this.initContainer(),this.container.on("click",p),k(this.results),this.dropdown.on("mousemove-filtered",g,this.bind(this.highlightUnderEvent)),this.dropdown.on("touchstart touchmove touchend",g,this.bind(function(a){this._touchEvent=!0,this.highlightUnderEvent(a)})),this.dropdown.on("touchmove",g,this.bind(this.touchMoved)),this.dropdown.on("touchstart touchend",g,this.bind(this.clearTouchMoved)),this.dropdown.on("click",this.bind(function(){this._touchEvent&&(this._touchEvent=!1,this.selectHighlighted())})),m(80,this.results),this.dropdown.on("scroll-debounced",g,this.bind(this.loadMoreIfNeeded)),a(this.container).on("change",".select2-input",function(a){a.stopPropagation()}),a(this.dropdown).on("change",".select2-input",function(a){a.stopPropagation()}),a.fn.mousewheel&&d.mousewheel(function(a,b,c,e){var f=d.scrollTop();e>0&&0>=f-e?(d.scrollTop(0),p(a)):0>e&&d.get(0).scrollHeight-d.scrollTop()+e<=d.height()&&(d.scrollTop(d.get(0).scrollHeight-d.height()),p(a))}),j(e),e.on("keyup-change input paste",this.bind(this.updateResults)),e.on("focus",function(){e.addClass("select2-focused")}),e.on("blur",function(){e.removeClass("select2-focused")}),this.dropdown.on("mouseup",g,this.bind(function(b){a(b.target).closest(".select2-result-selectable").length>0&&(this.highlightUnderEvent(b),this.selectHighlighted(b))})),this.dropdown.on("click mouseup mousedown touchstart touchend focusin",function(a){a.stopPropagation()}),this.nextSearchTerm=b,a.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource()),null!==c.maximumInputLength&&this.search.attr("maxlength",c.maximumInputLength);var h=c.element.prop("disabled");h===b&&(h=!1),this.enable(!h);var i=c.element.prop("readonly");i===b&&(i=!1),this.readonly(i),K=K||f(),this.autofocus=c.element.prop("autofocus"),c.element.prop("autofocus",!1),this.autofocus&&this.focus(),this.search.attr("placeholder",c.searchInputPlaceholder)},destroy:function(){var a=this.opts.element,c=a.data("select2"),d=this;this.close(),a.length&&a[0].detachEvent&&d._sync&&a.each(function(){d._sync&&this.detachEvent("onpropertychange",d._sync)}),this.propertyObserver&&(this.propertyObserver.disconnect(),this.propertyObserver=null),this._sync=null,c!==b&&(c.container.remove(),c.liveRegion.remove(),c.dropdown.remove(),a.show().removeData("select2").off(".select2").prop("autofocus",this.autofocus||!1),this.elementTabIndex?a.attr({tabindex:this.elementTabIndex}):a.removeAttr("tabindex"),a.show()),C.call(this,"container","liveRegion","dropdown","results","search")},optionToData:function(a){return a.is("option")?{id:a.prop("value"),text:a.text(),element:a.get(),css:a.attr("class"),disabled:a.prop("disabled"),locked:g(a.attr("locked"),"locked")||g(a.data("locked"),!0)}:a.is("optgroup")?{text:a.attr("label"),children:[],element:a.get(),css:a.attr("class")}:void 0},prepareOpts:function(c){var d,e,f,i,j=this;if(d=c.element,"select"===d.get(0).tagName.toLowerCase()&&(this.select=e=c.element),e&&a.each(["id","multiple","ajax","query","createSearchChoice","initSelection","data","tags"],function(){if(this in c)throw new Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.")}),c=a.extend({},{populateResults:function(d,e,f){var g,h=this.opts.id,i=this.liveRegion;(g=function(d,e,k){var l,m,n,o,p,q,r,s,t,u;d=c.sortResults(d,e,f);var v=[];for(l=0,m=d.length;m>l;l+=1)n=d[l],p=n.disabled===!0,o=!p&&h(n)!==b,q=n.children&&n.children.length>0,r=a("<li></li>"),r.addClass("select2-results-dept-"+k),r.addClass("select2-result"),r.addClass(o?"select2-result-selectable":"select2-result-unselectable"),p&&r.addClass("select2-disabled"),q&&r.addClass("select2-result-with-children"),r.addClass(j.opts.formatResultCssClass(n)),r.attr("role","presentation"),s=a(document.createElement("div")),s.addClass("select2-result-label"),s.attr("id","select2-result-label-"+H()),s.attr("role","option"),u=c.formatResult(n,s,f,j.opts.escapeMarkup),u!==b&&(s.html(u),r.append(s)),q&&(t=a("<ul></ul>"),t.addClass("select2-result-sub"),g(n.children,t,k+1),r.append(t)),r.data("select2-data",n),v.push(r[0]);e.append(v),i.text(c.formatMatches(d.length))})(e,d,0)}},a.fn.select2.defaults,c),"function"!=typeof c.id&&(f=c.id,c.id=function(a){return a[f]}),a.isArray(c.element.data("select2Tags"))){if("tags"in c)throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 "+c.element.attr("id");c.tags=c.element.data("select2Tags")}if(e?(c.query=this.bind(function(a){var c,e,f,g={results:[],more:!1},h=a.term;f=function(b,c){var d;b.is("option")?a.matcher(h,b.text(),b)&&c.push(j.optionToData(b)):b.is("optgroup")&&(d=j.optionToData(b),b.children().each2(function(a,b){f(b,d.children)}),d.children.length>0&&c.push(d))},c=d.children(),this.getPlaceholder()!==b&&c.length>0&&(e=this.getPlaceholderOption(),e&&(c=c.not(e))),c.each2(function(a,b){f(b,g.results)}),a.callback(g)}),c.id=function(a){return a.id}):"query"in c||("ajax"in c?(i=c.element.data("ajax-url"),i&&i.length>0&&(c.ajax.url=i),c.query=v.call(c.element,c.ajax)):"data"in c?c.query=w(c.data):"tags"in c&&(c.query=x(c.tags),c.createSearchChoice===b&&(c.createSearchChoice=function(b){return{id:a.trim(b),text:a.trim(b)}}),c.initSelection===b&&(c.initSelection=function(b,d){var e=[];a(h(b.val(),c.separator,c.transformVal)).each(function(){var b={id:this,text:this},d=c.tags;a.isFunction(d)&&(d=d()),a(d).each(function(){return g(this.id,b.id)?(b=this,!1):void 0}),e.push(b)}),d(e)}))),"function"!=typeof c.query)throw"query function not defined for Select2 "+c.element.attr("id");if("top"===c.createSearchChoicePosition)c.createSearchChoicePosition=function(a,b){a.unshift(b)};else if("bottom"===c.createSearchChoicePosition)c.createSearchChoicePosition=function(a,b){a.push(b)};else if("function"!=typeof c.createSearchChoicePosition)throw"invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";return c},monitorSource:function(){var c,d=this.opts.element,e=this;d.on("change.select2",this.bind(function(){this.opts.element.data("select2-change-triggered")!==!0&&this.initSelection()})),this._sync=this.bind(function(){var a=d.prop("disabled");a===b&&(a=!1),this.enable(!a);var c=d.prop("readonly");c===b&&(c=!1),this.readonly(c),this.container&&(s(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.addClass(z(this.opts.containerCssClass,this.opts.element))),this.dropdown&&(s(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(z(this.opts.dropdownCssClass,this.opts.element)))}),d.length&&d[0].attachEvent&&d.each(function(){this.attachEvent("onpropertychange",e._sync)}),c=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,c!==b&&(this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.propertyObserver=new c(function(b){a.each(b,e._sync)}),this.propertyObserver.observe(d.get(0),{attributes:!0,subtree:!1}))},triggerSelect:function(b){var c=a.Event("select2-selecting",{val:this.id(b),object:b,choice:b});return this.opts.element.trigger(c),!c.isDefaultPrevented()},triggerChange:function(b){b=b||{},b=a.extend({},b,{type:"change",val:this.val()}),this.opts.element.data("select2-change-triggered",!0),this.opts.element.trigger(b),this.opts.element.data("select2-change-triggered",!1),this.opts.element.click(),this.opts.blurOnChange&&this.opts.element.blur()},isInterfaceEnabled:function(){return this.enabledInterface===!0},enableInterface:function(){var a=this._enabled&&!this._readonly,b=!a;return a===this.enabledInterface?!1:(this.container.toggleClass("select2-container-disabled",b),this.close(),this.enabledInterface=a,!0)},enable:function(a){a===b&&(a=!0),this._enabled!==a&&(this._enabled=a,this.opts.element.prop("disabled",!a),this.enableInterface())},disable:function(){this.enable(!1)},readonly:function(a){a===b&&(a=!1),this._readonly!==a&&(this._readonly=a,this.opts.element.prop("readonly",a),this.enableInterface())},opened:function(){return this.container?this.container.hasClass("select2-dropdown-open"):!1},positionDropdown:function(){var b,c,d,e,f,g=this.dropdown,h=this.container,i=h.offset(),j=h.outerHeight(!1),k=h.outerWidth(!1),l=g.outerHeight(!1),m=a(window),n=m.width(),o=m.height(),p=m.scrollLeft()+n,q=m.scrollTop()+o,r=i.top+j,s=i.left,t=q>=r+l,u=i.top-l>=m.scrollTop(),v=g.outerWidth(!1),w=function(){return p>=s+v},x=function(){return i.left+p+h.outerWidth(!1)>v},y=g.hasClass("select2-drop-above");y?(c=!0,!u&&t&&(d=!0,c=!1)):(c=!1,!t&&u&&(d=!0,c=!0)),d&&(g.hide(),i=this.container.offset(),j=this.container.outerHeight(!1),k=this.container.outerWidth(!1),l=g.outerHeight(!1),p=m.scrollLeft()+n,q=m.scrollTop()+o,r=i.top+j,s=i.left,v=g.outerWidth(!1),g.show(),this.focusSearch()),this.opts.dropdownAutoWidth?(f=a(".select2-results",g)[0],g.addClass("select2-drop-auto-width"),g.css("width",""),v=g.outerWidth(!1)+(f.scrollHeight===f.clientHeight?0:K.width),v>k?k=v:v=k,l=g.outerHeight(!1)):this.container.removeClass("select2-drop-auto-width"),"static"!==this.body.css("position")&&(b=this.body.offset(),r-=b.top,s-=b.left),!w()&&x()&&(s=i.left+this.container.outerWidth(!1)-v),e={left:s,width:k},c?(e.top=i.top-l,e.bottom="auto",this.container.addClass("select2-drop-above"),g.addClass("select2-drop-above")):(e.top=r,e.bottom="auto",this.container.removeClass("select2-drop-above"),g.removeClass("select2-drop-above")),e=a.extend(e,z(this.opts.dropdownCss,this.opts.element)),g.css(e)},shouldOpen:function(){var b;return this.opened()?!1:this._enabled===!1||this._readonly===!0?!1:(b=a.Event("select2-opening"),this.opts.element.trigger(b),!b.isDefaultPrevented())},clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")},open:function(){return this.shouldOpen()?(this.opening(),J.on("mousemove.select2Event",function(a){L.x=a.pageX,L.y=a.pageY}),!0):!1},opening:function(){var b,d=this.containerEventName,e="scroll."+d,f="resize."+d,g="orientationchange."+d;this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),this.clearDropdownAlignmentPreference(),this.dropdown[0]!==this.body.children().last()[0]&&this.dropdown.detach().appendTo(this.body),b=a("#select2-drop-mask"),0===b.length&&(b=a(document.createElement("div")),b.attr("id","select2-drop-mask").attr("class","select2-drop-mask"),b.hide(),b.appendTo(this.body),b.on("mousedown touchstart click",function(d){c(b);var e,f=a("#select2-drop");f.length>0&&(e=f.data("select2"),e.opts.selectOnBlur&&e.selectHighlighted({noFocus:!0}),e.close(),d.preventDefault(),d.stopPropagation())})),this.dropdown.prev()[0]!==b[0]&&this.dropdown.before(b),a("#select2-drop").removeAttr("id"),this.dropdown.attr("id","select2-drop"),b.show(),this.positionDropdown(),this.dropdown.show(),this.positionDropdown(),this.dropdown.addClass("select2-drop-active");var h=this;this.container.parents().add(window).each(function(){a(this).on(f+" "+e+" "+g,function(){h.opened()&&h.positionDropdown()})})},close:function(){if(this.opened()){var b=this.containerEventName,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.parents().add(window).each(function(){a(this).off(c).off(d).off(e)}),this.clearDropdownAlignmentPreference(),a("#select2-drop-mask").hide(),this.dropdown.removeAttr("id"),this.dropdown.hide(),this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),this.results.empty(),J.off("mousemove.select2Event"),this.clearSearch(),this.search.removeClass("select2-active"),this.opts.element.trigger(a.Event("select2-close"))}},externalSearch:function(a){this.open(),this.search.val(a),this.updateResults(!1)},clearSearch:function(){},getMaximumSelectionSize:function(){return z(this.opts.maximumSelectionSize,this.opts.element)},ensureHighlightVisible:function(){var b,c,d,e,f,g,h,i,j=this.results;if(c=this.highlight(),!(0>c)){if(0==c)return void j.scrollTop(0);b=this.findHighlightableChoices().find(".select2-result-label"),d=a(b[c]),i=(d.offset()||{}).top||0,e=i+d.outerHeight(!0),c===b.length-1&&(h=j.find("li.select2-more-results"),h.length>0&&(e=h.offset().top+h.outerHeight(!0))),f=j.offset().top+j.outerHeight(!1),e>f&&j.scrollTop(j.scrollTop()+(e-f)),g=i-j.offset().top,0>g&&"none"!=d.css("display")&&j.scrollTop(j.scrollTop()+g)}},findHighlightableChoices:function(){return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)")},moveHighlight:function(b){for(var c=this.findHighlightableChoices(),d=this.highlight();d>-1&&d<c.length;){d+=b;var e=a(c[d]);if(e.hasClass("select2-result-selectable")&&!e.hasClass("select2-disabled")&&!e.hasClass("select2-selected")){this.highlight(d);break}}},highlight:function(b){var c,d,f=this.findHighlightableChoices();return 0===arguments.length?e(f.filter(".select2-highlighted")[0],f.get()):(b>=f.length&&(b=f.length-1),0>b&&(b=0),this.removeHighlight(),c=a(f[b]),c.addClass("select2-highlighted"),this.search.attr("aria-activedescendant",c.find(".select2-result-label").attr("id")),this.ensureHighlightVisible(),this.liveRegion.text(c.text()),d=c.data("select2-data"),void(d&&this.opts.element.trigger({type:"select2-highlight",val:this.id(d),choice:d})))},removeHighlight:function(){this.results.find(".select2-highlighted").removeClass("select2-highlighted")},touchMoved:function(){this._touchMoved=!0},clearTouchMoved:function(){this._touchMoved=!1},countSelectableResults:function(){return this.findHighlightableChoices().length},highlightUnderEvent:function(b){var c=a(b.target).closest(".select2-result-selectable");if(c.length>0&&!c.is(".select2-highlighted")){var d=this.findHighlightableChoices();this.highlight(d.index(c))}else 0==c.length&&this.removeHighlight()},loadMoreIfNeeded:function(){var a,b=this.results,c=b.find("li.select2-more-results"),d=this.resultsPage+1,e=this,f=this.search.val(),g=this.context;0!==c.length&&(a=c.offset().top-b.offset().top-b.height(),a<=this.opts.loadMorePadding&&(c.addClass("select2-active"),this.opts.query({element:this.opts.element,term:f,page:d,context:g,matcher:this.opts.matcher,callback:this.bind(function(a){e.opened()&&(e.opts.populateResults.call(this,b,a.results,{term:f,page:d,context:g}),e.postprocessResults(a,!1,!1),a.more===!0?(c.detach().appendTo(b).html(e.opts.escapeMarkup(z(e.opts.formatLoadMore,e.opts.element,d+1))),window.setTimeout(function(){e.loadMoreIfNeeded()},10)):c.remove(),e.positionDropdown(),e.resultsPage=d,e.context=a.context,this.opts.element.trigger({type:"select2-loaded",items:a}))})})))},tokenize:function(){},updateResults:function(c){function d(){j.removeClass("select2-active"),m.positionDropdown(),m.liveRegion.text(k.find(".select2-no-results,.select2-selection-limit,.select2-searching").length?k.text():m.opts.formatMatches(k.find('.select2-result-selectable:not(".select2-selected")').length))}function e(a){k.html(a),d()}var f,h,i,j=this.search,k=this.results,l=this.opts,m=this,n=j.val(),o=a.data(this.container,"select2-last-term");if((c===!0||!o||!g(n,o))&&(a.data(this.container,"select2-last-term",n),c===!0||this.showSearchInput!==!1&&this.opened())){i=++this.queryCount;var p=this.getMaximumSelectionSize();if(p>=1&&(f=this.data(),a.isArray(f)&&f.length>=p&&y(l.formatSelectionTooBig,"formatSelectionTooBig")))return void e("<li class='select2-selection-limit'>"+z(l.formatSelectionTooBig,l.element,p)+"</li>");if(j.val().length<l.minimumInputLength)return e(y(l.formatInputTooShort,"formatInputTooShort")?"<li class='select2-no-results'>"+z(l.formatInputTooShort,l.element,j.val(),l.minimumInputLength)+"</li>":""),void(c&&this.showSearch&&this.showSearch(!0));if(l.maximumInputLength&&j.val().length>l.maximumInputLength)return void e(y(l.formatInputTooLong,"formatInputTooLong")?"<li class='select2-no-results'>"+z(l.formatInputTooLong,l.element,j.val(),l.maximumInputLength)+"</li>":"");l.formatSearching&&0===this.findHighlightableChoices().length&&e("<li class='select2-searching'>"+z(l.formatSearching,l.element)+"</li>"),j.addClass("select2-active"),this.removeHighlight(),h=this.tokenize(),h!=b&&null!=h&&j.val(h),this.resultsPage=1,l.query({element:l.element,term:j.val(),page:this.resultsPage,context:null,matcher:l.matcher,callback:this.bind(function(f){var h;if(i==this.queryCount){if(!this.opened())return void this.search.removeClass("select2-active");if(f.hasError!==b&&y(l.formatAjaxError,"formatAjaxError"))return void e("<li class='select2-ajax-error'>"+z(l.formatAjaxError,l.element,f.jqXHR,f.textStatus,f.errorThrown)+"</li>");if(this.context=f.context===b?null:f.context,this.opts.createSearchChoice&&""!==j.val()&&(h=this.opts.createSearchChoice.call(m,j.val(),f.results),h!==b&&null!==h&&m.id(h)!==b&&null!==m.id(h)&&0===a(f.results).filter(function(){return g(m.id(this),m.id(h))}).length&&this.opts.createSearchChoicePosition(f.results,h)),0===f.results.length&&y(l.formatNoMatches,"formatNoMatches"))return void e("<li class='select2-no-results'>"+z(l.formatNoMatches,l.element,j.val())+"</li>");
k.empty(),m.opts.populateResults.call(this,k,f.results,{term:j.val(),page:this.resultsPage,context:null}),f.more===!0&&y(l.formatLoadMore,"formatLoadMore")&&(k.append("<li class='select2-more-results'>"+l.escapeMarkup(z(l.formatLoadMore,l.element,this.resultsPage))+"</li>"),window.setTimeout(function(){m.loadMoreIfNeeded()},10)),this.postprocessResults(f,c),d(),this.opts.element.trigger({type:"select2-loaded",items:f})}})})}},cancel:function(){this.close()},blur:function(){this.opts.selectOnBlur&&this.selectHighlighted({noFocus:!0}),this.close(),this.container.removeClass("select2-container-active"),this.search[0]===document.activeElement&&this.search.blur(),this.clearSearch(),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")},focusSearch:function(){n(this.search)},selectHighlighted:function(a){if(this._touchMoved)return void this.clearTouchMoved();var b=this.highlight(),c=this.results.find(".select2-highlighted"),d=c.closest(".select2-result").data("select2-data");d?(this.highlight(b),this.onSelect(d,a)):a&&a.noFocus&&this.close()},getPlaceholder:function(){var a;return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder||((a=this.getPlaceholderOption())!==b?a.text():b)},getPlaceholderOption:function(){if(this.select){var c=this.select.children("option").first();if(this.opts.placeholderOption!==b)return"first"===this.opts.placeholderOption&&c||"function"==typeof this.opts.placeholderOption&&this.opts.placeholderOption(this.select);if(""===a.trim(c.text())&&""===c.val())return c}},initContainerWidth:function(){function c(){var c,d,e,f,g,h;if("off"===this.opts.width)return null;if("element"===this.opts.width)return 0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px";if("copy"===this.opts.width||"resolve"===this.opts.width){if(c=this.opts.element.attr("style"),c!==b)for(d=c.split(";"),f=0,g=d.length;g>f;f+=1)if(h=d[f].replace(/\s/g,""),e=h.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i),null!==e&&e.length>=1)return e[1];return"resolve"===this.opts.width?(c=this.opts.element.css("width"),c.indexOf("%")>0?c:0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"):null}return a.isFunction(this.opts.width)?this.opts.width():this.opts.width}var d=c.call(this);null!==d&&this.container.css("width",d)}}),F=D(E,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container"}).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>","   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>","   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>","</a>","<label for='' class='select2-offscreen'></label>","<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />","<div class='select2-drop select2-display-none'>","   <div class='select2-search'>","       <label for='' class='select2-offscreen'></label>","       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'","       aria-autocomplete='list' />","   </div>","   <ul class='select2-results' role='listbox'>","   </ul>","</div>"].join(""));return b},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.focusser.prop("disabled",!this.isInterfaceEnabled())},opening:function(){var c,d,e;this.opts.minimumResultsForSearch>=0&&this.showSearch(!0),this.parent.opening.apply(this,arguments),this.showSearchInput!==!1&&this.search.val(this.focusser.val()),this.opts.shouldFocusInput(this)&&(this.search.focus(),c=this.search.get(0),c.createTextRange?(d=c.createTextRange(),d.collapse(!1),d.select()):c.setSelectionRange&&(e=this.search.val().length,c.setSelectionRange(e,e))),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.focusser.prop("disabled",!0).val(""),this.updateResults(!0),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&(this.parent.close.apply(this,arguments),this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus())},focus:function(){this.opened()?this.close():(this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus())},isFocused:function(){return this.container.hasClass("select2-container-active")},cancel:function(){this.parent.cancel.apply(this,arguments),this.focusser.prop("disabled",!1),this.opts.shouldFocusInput(this)&&this.focusser.focus()},destroy:function(){a("label[for='"+this.focusser.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments),C.call(this,"selection","focusser")},initContainer:function(){var b,d,e=this.container,f=this.dropdown,g=H();this.showSearch(this.opts.minimumResultsForSearch<0?!1:!0),this.selection=b=e.find(".select2-choice"),this.focusser=e.find(".select2-focusser"),b.find(".select2-chosen").attr("id","select2-chosen-"+g),this.focusser.attr("aria-labelledby","select2-chosen-"+g),this.results.attr("id","select2-results-"+g),this.search.attr("aria-owns","select2-results-"+g),this.focusser.attr("id","s2id_autogen"+g),d=a("label[for='"+this.opts.element.attr("id")+"']"),this.opts.element.focus(this.bind(function(){this.focus()})),this.focusser.prev().text(d.text()).attr("for",this.focusser.attr("id"));var h=this.opts.element.attr("title");this.opts.element.attr("title",h||d.text()),this.focusser.attr("tabindex",this.elementTabIndex),this.search.attr("id",this.focusser.attr("id")+"_search"),this.search.prev().text(a("label[for='"+this.focusser.attr("id")+"']").text()).attr("for",this.search.attr("id")),this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&229!=a.keyCode){if(a.which===M.PAGE_UP||a.which===M.PAGE_DOWN)return void p(a);switch(a.which){case M.UP:case M.DOWN:return this.moveHighlight(a.which===M.UP?-1:1),void p(a);case M.ENTER:return this.selectHighlighted(),void p(a);case M.TAB:return void this.selectHighlighted({noFocus:!0});case M.ESC:return this.cancel(a),void p(a)}}})),this.search.on("blur",this.bind(function(){document.activeElement===this.body.get(0)&&window.setTimeout(this.bind(function(){this.opened()&&this.search.focus()}),0)})),this.focusser.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&a.which!==M.TAB&&!M.isControl(a)&&!M.isFunctionKey(a)&&a.which!==M.ESC){if(this.opts.openOnEnter===!1&&a.which===M.ENTER)return void p(a);if(a.which==M.DOWN||a.which==M.UP||a.which==M.ENTER&&this.opts.openOnEnter){if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return;return this.open(),void p(a)}return a.which==M.DELETE||a.which==M.BACKSPACE?(this.opts.allowClear&&this.clear(),void p(a)):void 0}})),j(this.focusser),this.focusser.on("keyup-change input",this.bind(function(a){if(this.opts.minimumResultsForSearch>=0){if(a.stopPropagation(),this.opened())return;this.open()}})),b.on("mousedown touchstart","abbr",this.bind(function(a){this.isInterfaceEnabled()&&(this.clear(),q(a),this.close(),this.selection&&this.selection.focus())})),b.on("mousedown touchstart",this.bind(function(d){c(b),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.opened()?this.close():this.isInterfaceEnabled()&&this.open(),p(d)})),f.on("mousedown touchstart",this.bind(function(){this.opts.shouldFocusInput(this)&&this.search.focus()})),b.on("focus",this.bind(function(a){p(a)})),this.focusser.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})).on("blur",this.bind(function(){this.opened()||(this.container.removeClass("select2-container-active"),this.opts.element.trigger(a.Event("select2-blur")))})),this.search.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})),this.initContainerWidth(),this.opts.element.hide(),this.setPlaceholder()},clear:function(b){var c=this.selection.data("select2-data");if(c){var d=a.Event("select2-clearing");if(this.opts.element.trigger(d),d.isDefaultPrevented())return;var e=this.getPlaceholderOption();this.opts.element.val(e?e.val():""),this.selection.find(".select2-chosen").empty(),this.selection.removeData("select2-data"),this.setPlaceholder(),b!==!1&&(this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}))}},initSelection:function(){if(this.isPlaceholderOptionSelected())this.updateSelection(null),this.close(),this.setPlaceholder();else{var a=this;this.opts.initSelection.call(null,this.opts.element,function(c){c!==b&&null!==c&&(a.updateSelection(c),a.close(),a.setPlaceholder(),a.nextSearchTerm=a.opts.nextSearchTerm(c,a.search.val()))})}},isPlaceholderOptionSelected:function(){var a;return this.getPlaceholder()===b?!1:(a=this.getPlaceholderOption())!==b&&a.prop("selected")||""===this.opts.element.val()||this.opts.element.val()===b||null===this.opts.element.val()},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=a.find("option").filter(function(){return this.selected&&!this.disabled});b(c.optionToData(d))}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=c.val(),f=null;b.query({matcher:function(a,c,d){var h=g(e,b.id(d));return h&&(f=d),h},callback:a.isFunction(d)?function(){d(f)}:a.noop})}),b},getPlaceholder:function(){return this.select&&this.getPlaceholderOption()===b?b:this.parent.getPlaceholder.apply(this,arguments)},setPlaceholder:function(){var a=this.getPlaceholder();if(this.isPlaceholderOptionSelected()&&a!==b){if(this.select&&this.getPlaceholderOption()===b)return;this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)),this.selection.addClass("select2-default"),this.container.removeClass("select2-allowclear")}},postprocessResults:function(a,b,c){var d=0,e=this;if(this.findHighlightableChoices().each2(function(a,b){return g(e.id(b.data("select2-data")),e.opts.element.val())?(d=a,!1):void 0}),c!==!1&&this.highlight(b===!0&&d>=0?d:0),b===!0){var f=this.opts.minimumResultsForSearch;f>=0&&this.showSearch(A(a.results)>=f)}},showSearch:function(b){this.showSearchInput!==b&&(this.showSearchInput=b,this.dropdown.find(".select2-search").toggleClass("select2-search-hidden",!b),this.dropdown.find(".select2-search").toggleClass("select2-offscreen",!b),a(this.dropdown,this.container).toggleClass("select2-with-searchbox",b))},onSelect:function(a,b){if(this.triggerSelect(a)){var c=this.opts.element.val(),d=this.data();this.opts.element.val(this.id(a)),this.updateSelection(a),this.opts.element.trigger({type:"select2-selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.close(),b&&b.noFocus||!this.opts.shouldFocusInput(this)||this.focusser.focus(),g(c,this.id(a))||this.triggerChange({added:a,removed:d})}},updateSelection:function(a){var c,d,e=this.selection.find(".select2-chosen");this.selection.data("select2-data",a),e.empty(),null!==a&&(c=this.opts.formatSelection(a,e,this.opts.escapeMarkup)),c!==b&&e.append(c),d=this.opts.formatSelectionCssClass(a,e),d!==b&&e.addClass(d),this.selection.removeClass("select2-default"),this.opts.allowClear&&this.getPlaceholder()!==b&&this.container.addClass("select2-allowclear")},val:function(){var a,c=!1,d=null,e=this,f=this.data();if(0===arguments.length)return this.opts.element.val();if(a=arguments[0],arguments.length>1&&(c=arguments[1]),this.select)this.select.val(a).find("option").filter(function(){return this.selected}).each2(function(a,b){return d=e.optionToData(b),!1}),this.updateSelection(d),this.setPlaceholder(),c&&this.triggerChange({added:d,removed:f});else{if(!a&&0!==a)return void this.clear(c);if(this.opts.initSelection===b)throw new Error("cannot call val() if initSelection() is not defined");this.opts.element.val(a),this.opts.initSelection(this.opts.element,function(a){e.opts.element.val(a?e.id(a):""),e.updateSelection(a),e.setPlaceholder(),c&&e.triggerChange({added:a,removed:f})})}},clearSearch:function(){this.search.val(""),this.focusser.val("")},data:function(a){var c,d=!1;return 0===arguments.length?(c=this.selection.data("select2-data"),c==b&&(c=null),c):(arguments.length>1&&(d=arguments[1]),void(a?(c=this.data(),this.opts.element.val(a?this.id(a):""),this.updateSelection(a),d&&this.triggerChange({added:a,removed:c})):this.clear(d)))}}),G=D(E,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container select2-container-multi"}).html(["<ul class='select2-choices'>","  <li class='select2-search-field'>","    <label for='' class='select2-offscreen'></label>","    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>","  </li>","</ul>","<div class='select2-drop select2-drop-multi select2-display-none'>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=[];a.find("option").filter(function(){return this.selected&&!this.disabled}).each2(function(a,b){d.push(c.optionToData(b))}),b(d)}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=h(c.val(),b.separator,b.transformVal),f=[];b.query({matcher:function(c,d,h){var i=a.grep(e,function(a){return g(a,b.id(h))}).length;return i&&f.push(h),i},callback:a.isFunction(d)?function(){for(var a=[],c=0;c<e.length;c++)for(var h=e[c],i=0;i<f.length;i++){var j=f[i];if(g(h,b.id(j))){a.push(j),f.splice(i,1);break}}d(a)}:a.noop})}),b},selectChoice:function(a){var b=this.container.find(".select2-search-choice-focus");b.length&&a&&a[0]==b[0]||(b.length&&this.opts.element.trigger("choice-deselected",b),b.removeClass("select2-search-choice-focus"),a&&a.length&&(this.close(),a.addClass("select2-search-choice-focus"),this.opts.element.trigger("choice-selected",a)))},destroy:function(){a("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments),C.call(this,"searchContainer","selection")},initContainer:function(){var b,c=".select2-choices";this.searchContainer=this.container.find(".select2-search-field"),this.selection=b=this.container.find(c);var d=this;this.selection.on("click",".select2-container:not(.select2-container-disabled) .select2-search-choice:not(.select2-locked)",function(){d.search[0].focus(),d.selectChoice(a(this))}),this.search.attr("id","s2id_autogen"+H()),this.search.prev().text(a("label[for='"+this.opts.element.attr("id")+"']").text()).attr("for",this.search.attr("id")),this.opts.element.focus(this.bind(function(){this.focus()})),this.search.on("input paste",this.bind(function(){this.search.attr("placeholder")&&0==this.search.val().length||this.isInterfaceEnabled()&&(this.opened()||this.open())})),this.search.attr("tabindex",this.elementTabIndex),this.keydowns=0,this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){++this.keydowns;var c=b.find(".select2-search-choice-focus"),d=c.prev(".select2-search-choice:not(.select2-locked)"),e=c.next(".select2-search-choice:not(.select2-locked)"),f=o(this.search);if(c.length&&(a.which==M.LEFT||a.which==M.RIGHT||a.which==M.BACKSPACE||a.which==M.DELETE||a.which==M.ENTER)){var g=c;return a.which==M.LEFT&&d.length?g=d:a.which==M.RIGHT?g=e.length?e:null:a.which===M.BACKSPACE?this.unselect(c.first())&&(this.search.width(10),g=d.length?d:e):a.which==M.DELETE?this.unselect(c.first())&&(this.search.width(10),g=e.length?e:null):a.which==M.ENTER&&(g=null),this.selectChoice(g),p(a),void(g&&g.length||this.open())}if((a.which===M.BACKSPACE&&1==this.keydowns||a.which==M.LEFT)&&0==f.offset&&!f.length)return this.selectChoice(b.find(".select2-search-choice:not(.select2-locked)").last()),void p(a);if(this.selectChoice(null),this.opened())switch(a.which){case M.UP:case M.DOWN:return this.moveHighlight(a.which===M.UP?-1:1),void p(a);case M.ENTER:return this.selectHighlighted(),void p(a);case M.TAB:return this.selectHighlighted({noFocus:!0}),void this.close();case M.ESC:return this.cancel(a),void p(a)}if(a.which!==M.TAB&&!M.isControl(a)&&!M.isFunctionKey(a)&&a.which!==M.BACKSPACE&&a.which!==M.ESC){if(a.which===M.ENTER){if(this.opts.openOnEnter===!1)return;if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return}this.open(),(a.which===M.PAGE_UP||a.which===M.PAGE_DOWN)&&p(a),a.which===M.ENTER&&p(a)}}})),this.search.on("keyup",this.bind(function(){this.keydowns=0,this.resizeSearch()})),this.search.on("blur",this.bind(function(b){this.container.removeClass("select2-container-active"),this.search.removeClass("select2-focused"),this.selectChoice(null),this.opened()||this.clearSearch(),b.stopImmediatePropagation(),this.opts.element.trigger(a.Event("select2-blur"))})),this.container.on("click",c,this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").length>0||(this.selectChoice(null),this.clearPlaceholder(),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.open(),this.focusSearch(),b.preventDefault()))})),this.container.on("focus",c,this.bind(function(){this.isInterfaceEnabled()&&(this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())})),this.initContainerWidth(),this.opts.element.hide(),this.clearSearch()},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this.isInterfaceEnabled())},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()&&(this.updateSelection([]),this.close(),this.clearSearch()),this.select||""!==this.opts.element.val()){var a=this;this.opts.initSelection.call(null,this.opts.element,function(c){c!==b&&null!==c&&(a.updateSelection(c),a.close(),a.clearSearch())})}},clearSearch:function(){var a=this.getPlaceholder(),c=this.getMaxSearchWidth();a!==b&&0===this.getVal().length&&this.search.hasClass("select2-focused")===!1?(this.search.val(a).addClass("select2-default"),this.search.width(c>0?c:this.container.css("width"))):this.search.val("").width(10)},clearPlaceholder:function(){this.search.hasClass("select2-default")&&this.search.val("").removeClass("select2-default")},opening:function(){this.clearPlaceholder(),this.resizeSearch(),this.parent.opening.apply(this,arguments),this.focusSearch(),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.updateResults(!0),this.opts.shouldFocusInput(this)&&this.search.focus(),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&this.parent.close.apply(this,arguments)},focus:function(){this.close(),this.search.focus()},isFocused:function(){return this.search.hasClass("select2-focused")},updateSelection:function(b){var c=[],d=[],f=this;a(b).each(function(){e(f.id(this),c)<0&&(c.push(f.id(this)),d.push(this))}),b=d,this.selection.find(".select2-search-choice").remove(),a(b).each(function(){f.addSelectedChoice(this)}),f.postprocessResults()},tokenize:function(){var a=this.search.val();a=this.opts.tokenizer.call(this,a,this.data(),this.bind(this.onSelect),this.opts),null!=a&&a!=b&&(this.search.val(a),a.length>0&&this.open())},onSelect:function(a,c){this.triggerSelect(a)&&""!==a.text&&(this.addSelectedChoice(a),this.opts.element.trigger({type:"selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.clearSearch(),this.updateResults(),(this.select||!this.opts.closeOnSelect)&&this.postprocessResults(a,!1,this.opts.closeOnSelect===!0),this.opts.closeOnSelect?(this.close(),this.search.width(10)):this.countSelectableResults()>0?(this.search.width(10),this.resizeSearch(),this.getMaximumSelectionSize()>0&&this.val().length>=this.getMaximumSelectionSize()?this.updateResults(!0):this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.updateResults(),this.search.select()),this.positionDropdown()):(this.close(),this.search.width(10)),this.triggerChange({added:a}),c&&c.noFocus||this.focusSearch())},cancel:function(){this.close(),this.focusSearch()},addSelectedChoice:function(c){var d,e,f=!c.locked,g=a("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),h=a("<li class='select2-search-choice select2-locked'><div></div></li>"),i=f?g:h,j=this.id(c),k=this.getVal();d=this.opts.formatSelection(c,i.find("div"),this.opts.escapeMarkup),d!=b&&i.find("div").replaceWith(a("<div></div>").html(d)),e=this.opts.formatSelectionCssClass(c,i.find("div")),e!=b&&i.addClass(e),f&&i.find(".select2-search-choice-close").on("mousedown",p).on("click dblclick",this.bind(function(b){this.isInterfaceEnabled()&&(this.unselect(a(b.target)),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),p(b),this.close(),this.focusSearch())})).on("focus",this.bind(function(){this.isInterfaceEnabled()&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))})),i.data("select2-data",c),i.insertBefore(this.searchContainer),k.push(j),this.setVal(k)},unselect:function(b){var c,d,f=this.getVal();if(b=b.closest(".select2-search-choice"),0===b.length)throw"Invalid argument: "+b+". Must be .select2-search-choice";if(c=b.data("select2-data")){var g=a.Event("select2-removing");if(g.val=this.id(c),g.choice=c,this.opts.element.trigger(g),g.isDefaultPrevented())return!1;for(;(d=e(this.id(c),f))>=0;)f.splice(d,1),this.setVal(f),this.select&&this.postprocessResults();return b.remove(),this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}),!0}},postprocessResults:function(a,b,c){var d=this.getVal(),f=this.results.find(".select2-result"),g=this.results.find(".select2-result-with-children"),h=this;f.each2(function(a,b){var c=h.id(b.data("select2-data"));e(c,d)>=0&&(b.addClass("select2-selected"),b.find(".select2-result-selectable").addClass("select2-selected"))}),g.each2(function(a,b){b.is(".select2-result-selectable")||0!==b.find(".select2-result-selectable:not(.select2-selected)").length||b.addClass("select2-selected")}),-1==this.highlight()&&c!==!1&&this.opts.closeOnSelect===!0&&h.highlight(0),!this.opts.createSearchChoice&&!f.filter(".select2-result:not(.select2-selected)").length>0&&(!a||a&&!a.more&&0===this.results.find(".select2-no-results").length)&&y(h.opts.formatNoMatches,"formatNoMatches")&&this.results.append("<li class='select2-no-results'>"+z(h.opts.formatNoMatches,h.opts.element,h.search.val())+"</li>")},getMaxSearchWidth:function(){return this.selection.width()-i(this.search)},resizeSearch:function(){var a,b,c,d,e,f=i(this.search);a=r(this.search)+10,b=this.search.offset().left,c=this.selection.width(),d=this.selection.offset().left,e=c-(b-d)-f,a>e&&(e=c-f),40>e&&(e=c-f),0>=e&&(e=a),this.search.width(Math.floor(e))},getVal:function(){var a;return this.select?(a=this.select.val(),null===a?[]:a):(a=this.opts.element.val(),h(a,this.opts.separator,this.opts.transformVal))},setVal:function(b){var c;this.select?this.select.val(b):(c=[],a(b).each(function(){e(this,c)<0&&c.push(this)}),this.opts.element.val(0===c.length?"":c.join(this.opts.separator)))},buildChangeDetails:function(a,b){for(var b=b.slice(0),a=a.slice(0),c=0;c<b.length;c++)for(var d=0;d<a.length;d++)g(this.opts.id(b[c]),this.opts.id(a[d]))&&(b.splice(c,1),c>0&&c--,a.splice(d,1),d--);return{added:b,removed:a}},val:function(c,d){var e,f=this;if(0===arguments.length)return this.getVal();if(e=this.data(),e.length||(e=[]),!c&&0!==c)return this.opts.element.val(""),this.updateSelection([]),this.clearSearch(),void(d&&this.triggerChange({added:this.data(),removed:e}));if(this.setVal(c),this.select)this.opts.initSelection(this.select,this.bind(this.updateSelection)),d&&this.triggerChange(this.buildChangeDetails(e,this.data()));else{if(this.opts.initSelection===b)throw new Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element,function(b){var c=a.map(b,f.id);f.setVal(c),f.updateSelection(b),f.clearSearch(),d&&f.triggerChange(f.buildChangeDetails(e,f.data()))})}this.clearSearch()},onSortStart:function(){if(this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0),this.searchContainer.hide()},onSortEnd:function(){var b=[],c=this;this.searchContainer.show(),this.searchContainer.appendTo(this.searchContainer.parent()),this.resizeSearch(),this.selection.find(".select2-search-choice").each(function(){b.push(c.opts.id(a(this).data("select2-data")))}),this.setVal(b),this.triggerChange()},data:function(b,c){var d,e,f=this;return 0===arguments.length?this.selection.children(".select2-search-choice").map(function(){return a(this).data("select2-data")}).get():(e=this.data(),b||(b=[]),d=a.map(b,function(a){return f.opts.id(a)}),this.setVal(d),this.updateSelection(b),this.clearSearch(),c&&this.triggerChange(this.buildChangeDetails(e,this.data())),void 0)}}),a.fn.select2=function(){var c,d,f,g,h,i=Array.prototype.slice.call(arguments,0),j=["val","destroy","opened","open","close","focus","isFocused","container","dropdown","onSortStart","onSortEnd","enable","disable","readonly","positionDropdown","data","search"],k=["opened","isFocused","container","dropdown"],l=["val","data"],m={search:"externalSearch"};return this.each(function(){if(0===i.length||"object"==typeof i[0])c=0===i.length?{}:a.extend({},i[0]),c.element=a(this),"select"===c.element.get(0).tagName.toLowerCase()?h=c.element.prop("multiple"):(h=c.multiple||!1,"tags"in c&&(c.multiple=h=!0)),d=h?new window.Select2["class"].multi:new window.Select2["class"].single,d.init(c);else{if("string"!=typeof i[0])throw"Invalid arguments to select2 plugin: "+i;if(e(i[0],j)<0)throw"Unknown method: "+i[0];if(g=b,d=a(this).data("select2"),d===b)return;if(f=i[0],"container"===f?g=d.container:"dropdown"===f?g=d.dropdown:(m[f]&&(f=m[f]),g=d[f].apply(d,i.slice(1))),e(i[0],k)>=0||e(i[0],l)>=0&&1==i.length)return!1}}),g===b?this:g},a.fn.select2.defaults={width:"copy",loadMorePadding:0,closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(a,b,c,d){var e=[];return t(this.text(a),c.term,e,d),e.join("")},transformVal:function(b){return a.trim(b)},formatSelection:function(a,c,d){return a?d(this.text(a)):b},sortResults:function(a){return a},formatResultCssClass:function(a){return a.css},formatSelectionCssClass:function(){return b},minimumResultsForSearch:0,minimumInputLength:0,maximumInputLength:null,maximumSelectionSize:0,id:function(a){return a==b?null:a.id},text:function(b){return b&&this.data&&this.data.text?a.isFunction(this.data.text)?this.data.text(b):b[this.data.text]:b.text},matcher:function(a,b){return d(""+b).toUpperCase().indexOf(d(""+a).toUpperCase())>=0},separator:",",tokenSeparators:[],tokenizer:B,escapeMarkup:u,blurOnChange:!1,selectOnBlur:!1,adaptContainerCssClass:function(a){return a},adaptDropdownCssClass:function(){return null},nextSearchTerm:function(){return b},searchInputPlaceholder:"",createSearchChoicePosition:"top",shouldFocusInput:function(a){var b="ontouchstart"in window||navigator.msMaxTouchPoints>0;return b&&a.opts.minimumResultsForSearch<0?!1:!0}},a.fn.select2.locales=[],a.fn.select2.locales.en={formatMatches:function(a){return 1===a?"One result is available, press enter to select it.":a+" results are available, use up and down arrow keys to navigate."},formatNoMatches:function(){return"No matches found"},formatAjaxError:function(){return"Loading failed"},formatInputTooShort:function(a,b){var c=b-a.length;return"Please enter "+c+" or more character"+(1==c?"":"s")},formatInputTooLong:function(a,b){var c=a.length-b;return"Please delete "+c+" character"+(1==c?"":"s")},formatSelectionTooBig:function(a){return"You can only select "+a+" item"+(1==a?"":"s")},formatLoadMore:function(){return"Loading more results…"},formatSearching:function(){return"Searching…"}},a.extend(a.fn.select2.defaults,a.fn.select2.locales.en),a.fn.select2.ajaxDefaults={transport:a.ajax,params:{type:"GET",cache:!1,dataType:"json"}},window.Select2={query:{ajax:v,local:w,tags:x},util:{debounce:l,markMatch:t,escapeMarkup:u,stripDiacritics:d},"class":{"abstract":E,single:F,multi:G}}}}(jQuery),/*! DataTables 1.10.4
 * ©2008-2014 SpryMedia Ltd - datatables.net/license
 */
function(a,b,c){!function(a){"use strict";"function"==typeof define&&define.amd?define("datatables",["jquery"],a):"object"==typeof exports?a(require("jquery")):jQuery&&!jQuery.fn.dataTable&&a(jQuery)}(function(d){"use strict";function e(a){var b,c,f="a aa ai ao as b fn i m o s ",g={};d.each(a,function(d){b=d.match(/^([^A-Z]+?)([A-Z])/),b&&-1!==f.indexOf(b[1]+" ")&&(c=d.replace(b[0],b[2].toLowerCase()),g[c]=d,"o"===b[1]&&e(a[d]))}),a._hungarianMap=g}function f(a,b,g){a._hungarianMap||e(a);var h;d.each(b,function(e){h=a._hungarianMap[e],h===c||!g&&b[h]!==c||("o"===h.charAt(0)?(b[h]||(b[h]={}),d.extend(!0,b[h],b[e]),f(a[h],b[h],g)):b[h]=b[e])})}function g(a){var b=Wb.defaults.oLanguage,c=a.sZeroRecords;!a.sEmptyTable&&c&&"No data available in table"===b.sEmptyTable&&Lb(a,a,"sZeroRecords","sEmptyTable"),!a.sLoadingRecords&&c&&"Loading..."===b.sLoadingRecords&&Lb(a,a,"sZeroRecords","sLoadingRecords"),a.sInfoThousands&&(a.sThousands=a.sInfoThousands);var d=a.sDecimal;d&&Ub(d)}function h(a){sc(a,"ordering","bSort"),sc(a,"orderMulti","bSortMulti"),sc(a,"orderClasses","bSortClasses"),sc(a,"orderCellsTop","bSortCellsTop"),sc(a,"order","aaSorting"),sc(a,"orderFixed","aaSortingFixed"),sc(a,"paging","bPaginate"),sc(a,"pagingType","sPaginationType"),sc(a,"pageLength","iDisplayLength"),sc(a,"searching","bFilter");var b=a.aoSearchCols;if(b)for(var c=0,d=b.length;d>c;c++)b[c]&&f(Wb.models.oSearch,b[c])}function i(a){sc(a,"orderable","bSortable"),sc(a,"orderData","aDataSort"),sc(a,"orderSequence","asSorting"),sc(a,"orderDataType","sortDataType")}function j(a){var b=a.oBrowser,c=d("<div/>").css({position:"absolute",top:0,left:0,height:1,width:1,overflow:"hidden"}).append(d("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(d('<div class="test"/>').css({width:"100%",height:10}))).appendTo("body"),e=c.find(".test");b.bScrollOversize=100===e[0].offsetWidth,b.bScrollbarLeft=1!==e.offset().left,c.remove()}function k(a,b,d,e,f,g){var h,i=e,j=!1;for(d!==c&&(h=d,j=!0);i!==f;)a.hasOwnProperty(i)&&(h=j?b(h,a[i],i,a):a[i],j=!0,i+=g);return h}function l(a,c){var e=Wb.defaults.column,f=a.aoColumns.length,g=d.extend({},Wb.models.oColumn,e,{nTh:c?c:b.createElement("th"),sTitle:e.sTitle?e.sTitle:c?c.innerHTML:"",aDataSort:e.aDataSort?e.aDataSort:[f],mData:e.mData?e.mData:f,idx:f});a.aoColumns.push(g);var h=a.aoPreSearchCols;h[f]=d.extend({},Wb.models.oSearch,h[f]),m(a,f,null)}function m(a,b,e){var g=a.aoColumns[b],h=a.oClasses,j=d(g.nTh);if(!g.sWidthOrig){g.sWidthOrig=j.attr("width")||null;var k=(j.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);k&&(g.sWidthOrig=k[1])}e!==c&&null!==e&&(i(e),f(Wb.defaults.column,e),e.mDataProp===c||e.mData||(e.mData=e.mDataProp),e.sType&&(g._sManualType=e.sType),e.className&&!e.sClass&&(e.sClass=e.className),d.extend(g,e),Lb(g,e,"sWidth","sWidthOrig"),"number"==typeof e.iDataSort&&(g.aDataSort=[e.iDataSort]),Lb(g,e,"aDataSort"));var l=g.mData,m=B(l),n=g.mRender?B(g.mRender):null,o=function(a){return"string"==typeof a&&-1!==a.indexOf("@")};g._bAttrSrc=d.isPlainObject(l)&&(o(l.sort)||o(l.type)||o(l.filter)),g.fnGetData=function(a,b,d){var e=m(a,b,c,d);return n&&b?n(e,b,a,d):e},g.fnSetData=function(a,b,c){return C(l)(a,b,c)},"number"!=typeof l&&(a._rowReadObject=!0),a.oFeatures.bSort||(g.bSortable=!1,j.addClass(h.sSortableNone));var p=-1!==d.inArray("asc",g.asSorting),q=-1!==d.inArray("desc",g.asSorting);g.bSortable&&(p||q)?p&&!q?(g.sSortingClass=h.sSortableAsc,g.sSortingClassJUI=h.sSortJUIAscAllowed):!p&&q?(g.sSortingClass=h.sSortableDesc,g.sSortingClassJUI=h.sSortJUIDescAllowed):(g.sSortingClass=h.sSortable,g.sSortingClassJUI=h.sSortJUI):(g.sSortingClass=h.sSortableNone,g.sSortingClassJUI="")}function n(a){if(a.oFeatures.bAutoWidth!==!1){var b=a.aoColumns;sb(a);for(var c=0,d=b.length;d>c;c++)b[c].nTh.style.width=b[c].sWidth}var e=a.oScroll;(""!==e.sY||""!==e.sX)&&qb(a),Pb(a,null,"column-sizing",[a])}function o(a,b){var c=r(a,"bVisible");return"number"==typeof c[b]?c[b]:null}function p(a,b){var c=r(a,"bVisible"),e=d.inArray(b,c);return-1!==e?e:null}function q(a){return r(a,"bVisible").length}function r(a,b){var c=[];return d.map(a.aoColumns,function(a,d){a[b]&&c.push(d)}),c}function s(a){var b,d,e,f,g,h,i,j,k,l=a.aoColumns,m=a.aoData,n=Wb.ext.type.detect;for(b=0,d=l.length;d>b;b++)if(i=l[b],k=[],!i.sType&&i._sManualType)i.sType=i._sManualType;else if(!i.sType){for(e=0,f=n.length;f>e;e++){for(g=0,h=m.length;h>g&&(k[g]===c&&(k[g]=y(a,g,b,"type")),j=n[e](k[g],a),j||e===n.length-1)&&"html"!==j;g++);if(j){i.sType=j;break}}i.sType||(i.sType="string")}}function t(a,b,e,f){var g,h,i,j,k,m,n,o=a.aoColumns;if(b)for(g=b.length-1;g>=0;g--){n=b[g];var p=n.targets!==c?n.targets:n.aTargets;for(d.isArray(p)||(p=[p]),i=0,j=p.length;j>i;i++)if("number"==typeof p[i]&&p[i]>=0){for(;o.length<=p[i];)l(a);f(p[i],n)}else if("number"==typeof p[i]&&p[i]<0)f(o.length+p[i],n);else if("string"==typeof p[i])for(k=0,m=o.length;m>k;k++)("_all"==p[i]||d(o[k].nTh).hasClass(p[i]))&&f(k,n)}if(e)for(g=0,h=e.length;h>g;g++)f(g,e[g])}function u(a,b,c,e){var f=a.aoData.length,g=d.extend(!0,{},Wb.models.oRow,{src:c?"dom":"data"});g._aData=b,a.aoData.push(g);for(var h=a.aoColumns,i=0,j=h.length;j>i;i++)c&&z(a,f,i,y(a,f,i)),h[i].sType=null;return a.aiDisplayMaster.push(f),(c||!a.oFeatures.bDeferRender)&&I(a,f,c,e),f}function v(a,b){var c;return b instanceof d||(b=d(b)),b.map(function(b,d){return c=H(a,d),u(a,c.data,d,c.cells)})}function w(a,b){return b._DT_RowIndex!==c?b._DT_RowIndex:null}function x(a,b,c){return d.inArray(c,a.aoData[b].anCells)}function y(a,b,d,e){var f=a.iDraw,g=a.aoColumns[d],h=a.aoData[b]._aData,i=g.sDefaultContent,j=g.fnGetData(h,e,{settings:a,row:b,col:d});if(j===c)return a.iDrawError!=f&&null===i&&(Kb(a,0,"Requested unknown parameter "+("function"==typeof g.mData?"{function}":"'"+g.mData+"'")+" for row "+b,4),a.iDrawError=f),i;if(j!==h&&null!==j||null===i){if("function"==typeof j)return j.call(h)}else j=i;return null===j&&"display"==e?"":j}function z(a,b,c,d){var e=a.aoColumns[c],f=a.aoData[b]._aData;e.fnSetData(f,d,{settings:a,row:b,col:c})}function A(a){return d.map(a.match(/(\\.|[^\.])+/g),function(a){return a.replace(/\\./g,".")})}function B(a){if(d.isPlainObject(a)){var b={};return d.each(a,function(a,c){c&&(b[a]=B(c))}),function(a,d,e,f){var g=b[d]||b._;return g!==c?g(a,d,e,f):a}}if(null===a)return function(a){return a};if("function"==typeof a)return function(b,c,d,e){return a(b,c,d,e)};if("string"!=typeof a||-1===a.indexOf(".")&&-1===a.indexOf("[")&&-1===a.indexOf("("))return function(b){return b[a]};var e=function(a,b,d){var f,g,h,i;if(""!==d)for(var j=A(d),k=0,l=j.length;l>k;k++){if(f=j[k].match(tc),g=j[k].match(uc),f){j[k]=j[k].replace(tc,""),""!==j[k]&&(a=a[j[k]]),h=[],j.splice(0,k+1),i=j.join(".");for(var m=0,n=a.length;n>m;m++)h.push(e(a[m],b,i));var o=f[0].substring(1,f[0].length-1);a=""===o?h:h.join(o);break}if(g)j[k]=j[k].replace(uc,""),a=a[j[k]]();else{if(null===a||a[j[k]]===c)return c;a=a[j[k]]}}return a};return function(b,c){return e(b,c,a)}}function C(a){if(d.isPlainObject(a))return C(a._);if(null===a)return function(){};if("function"==typeof a)return function(b,c,d){a(b,"set",c,d)};if("string"!=typeof a||-1===a.indexOf(".")&&-1===a.indexOf("[")&&-1===a.indexOf("("))return function(b,c){b[a]=c};var b=function(a,d,e){for(var f,g,h,i,j,k=A(e),l=k[k.length-1],m=0,n=k.length-1;n>m;m++){if(g=k[m].match(tc),h=k[m].match(uc),g){k[m]=k[m].replace(tc,""),a[k[m]]=[],f=k.slice(),f.splice(0,m+1),j=f.join(".");for(var o=0,p=d.length;p>o;o++)i={},b(i,d[o],j),a[k[m]].push(i);return}h&&(k[m]=k[m].replace(uc,""),a=a[k[m]](d)),(null===a[k[m]]||a[k[m]]===c)&&(a[k[m]]={}),a=a[k[m]]}l.match(uc)?a=a[l.replace(uc,"")](d):a[l.replace(tc,"")]=d};return function(c,d){return b(c,d,a)}}function D(a){return mc(a.aoData,"_aData")}function E(a){a.aoData.length=0,a.aiDisplayMaster.length=0,a.aiDisplay.length=0}function F(a,b,d){for(var e=-1,f=0,g=a.length;g>f;f++)a[f]==b?e=f:a[f]>b&&a[f]--;-1!=e&&d===c&&a.splice(e,1)}function G(a,b,d,e){var f,g,h=a.aoData[b],i=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);c.innerHTML=y(a,b,d,"display")};if("dom"!==d&&(d&&"auto"!==d||"dom"!==h.src)){var j=h.anCells;if(j)if(e!==c)i(j[e],e);else for(f=0,g=j.length;g>f;f++)i(j[f],f)}else h._aData=H(a,h,e,e===c?c:h._aData).data;h._aSortData=null,h._aFilterData=null;var k=a.aoColumns;if(e!==c)k[e].sType=null;else{for(f=0,g=k.length;g>f;f++)k[f].sType=null;J(h)}}function H(a,b,e,f){var g,h,i,j=[],k=b.firstChild,l=0,m=a.aoColumns,n=a._rowReadObject;f=f||n?{}:[];var o=function(a,b){if("string"==typeof a){var c=a.indexOf("@");if(-1!==c){var d=a.substring(c+1),e=C(a);e(f,b.getAttribute(d))}}},p=function(a){if(e===c||e===l)if(h=m[l],i=d.trim(a.innerHTML),h&&h._bAttrSrc){var b=C(h.mData._);b(f,i),o(h.mData.sort,a),o(h.mData.type,a),o(h.mData.filter,a)}else n?(h._setter||(h._setter=C(h.mData)),h._setter(f,i)):f[l]=i;l++};if(k)for(;k;)g=k.nodeName.toUpperCase(),("TD"==g||"TH"==g)&&(p(k),j.push(k)),k=k.nextSibling;else{j=b.anCells;for(var q=0,r=j.length;r>q;q++)p(j[q])}return{data:f,cells:j}}function I(a,c,d,e){var f,g,h,i,j,k=a.aoData[c],l=k._aData,m=[];if(null===k.nTr){for(f=d||b.createElement("tr"),k.nTr=f,k.anCells=m,f._DT_RowIndex=c,J(k),i=0,j=a.aoColumns.length;j>i;i++)h=a.aoColumns[i],g=d?e[i]:b.createElement(h.sCellType),m.push(g),(!d||h.mRender||h.mData!==i)&&(g.innerHTML=y(a,c,i,"display")),h.sClass&&(g.className+=" "+h.sClass),h.bVisible&&!d?f.appendChild(g):!h.bVisible&&d&&g.parentNode.removeChild(g),h.fnCreatedCell&&h.fnCreatedCell.call(a.oInstance,g,y(a,c,i),l,c,i);Pb(a,"aoRowCreatedCallback",null,[f,l,c])}k.nTr.setAttribute("role","row")}function J(a){var b=a.nTr,c=a._aData;if(b){if(c.DT_RowId&&(b.id=c.DT_RowId),c.DT_RowClass){var e=c.DT_RowClass.split(" ");a.__rowc=a.__rowc?rc(a.__rowc.concat(e)):e,d(b).removeClass(a.__rowc.join(" ")).addClass(c.DT_RowClass)}c.DT_RowData&&d(b).data(c.DT_RowData)}}function K(a){var b,c,e,f,g,h=a.nTHead,i=a.nTFoot,j=0===d("th, td",h).length,k=a.oClasses,l=a.aoColumns;for(j&&(f=d("<tr/>").appendTo(h)),b=0,c=l.length;c>b;b++)g=l[b],e=d(g.nTh).addClass(g.sClass),j&&e.appendTo(f),a.oFeatures.bSort&&(e.addClass(g.sSortingClass),g.bSortable!==!1&&(e.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Eb(a,g.nTh,b))),g.sTitle!=e.html()&&e.html(g.sTitle),Rb(a,"header")(a,e,g,k);if(j&&P(a.aoHeader,h),d(h).find(">tr").attr("role","row"),d(h).find(">tr>th, >tr>td").addClass(k.sHeaderTH),d(i).find(">tr>th, >tr>td").addClass(k.sFooterTH),null!==i){var m=a.aoFooter[0];for(b=0,c=m.length;c>b;b++)g=l[b],g.nTf=m[b].cell,g.sClass&&d(g.nTf).addClass(g.sClass)}}function L(a,b,e){var f,g,h,i,j,k,l,m,n,o=[],p=[],q=a.aoColumns.length;if(b){for(e===c&&(e=!1),f=0,g=b.length;g>f;f++){for(o[f]=b[f].slice(),o[f].nTr=b[f].nTr,h=q-1;h>=0;h--)a.aoColumns[h].bVisible||e||o[f].splice(h,1);p.push([])}for(f=0,g=o.length;g>f;f++){if(l=o[f].nTr)for(;k=l.firstChild;)l.removeChild(k);for(h=0,i=o[f].length;i>h;h++)if(m=1,n=1,p[f][h]===c){for(l.appendChild(o[f][h].cell),p[f][h]=1;o[f+m]!==c&&o[f][h].cell==o[f+m][h].cell;)p[f+m][h]=1,m++;for(;o[f][h+n]!==c&&o[f][h].cell==o[f][h+n].cell;){for(j=0;m>j;j++)p[f+j][h+n]=1;n++}d(o[f][h].cell).attr("rowspan",m).attr("colspan",n)}}}}function M(a){var b=Pb(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==d.inArray(!1,b))return void ob(a,!1);var e=[],f=0,g=a.asStripeClasses,h=g.length,i=(a.aoOpenRows.length,a.oLanguage),j=a.iInitDisplayStart,k="ssp"==Sb(a),l=a.aiDisplay;a.bDrawing=!0,j!==c&&-1!==j&&(a._iDisplayStart=k?j:j>=a.fnRecordsDisplay()?0:j,a.iInitDisplayStart=-1);var m=a._iDisplayStart,n=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,ob(a,!1);else if(k){if(!a.bDestroying&&!S(a))return}else a.iDraw++;if(0!==l.length)for(var o=k?0:m,p=k?a.aoData.length:n,r=o;p>r;r++){var s=l[r],t=a.aoData[s];null===t.nTr&&I(a,s);var u=t.nTr;if(0!==h){var v=g[f%h];t._sRowStripe!=v&&(d(u).removeClass(t._sRowStripe).addClass(v),t._sRowStripe=v)}Pb(a,"aoRowCallback",null,[u,t._aData,f,r]),e.push(u),f++}else{var w=i.sZeroRecords;1==a.iDraw&&"ajax"==Sb(a)?w=i.sLoadingRecords:i.sEmptyTable&&0===a.fnRecordsTotal()&&(w=i.sEmptyTable),e[0]=d("<tr/>",{"class":h?g[0]:""}).append(d("<td />",{valign:"top",colSpan:q(a),"class":a.oClasses.sRowEmpty}).html(w))[0]}Pb(a,"aoHeaderCallback","header",[d(a.nTHead).children("tr")[0],D(a),m,n,l]),Pb(a,"aoFooterCallback","footer",[d(a.nTFoot).children("tr")[0],D(a),m,n,l]);var x=d(a.nTBody);x.children().detach(),x.append(d(e)),Pb(a,"aoDrawCallback","draw",[a]),a.bSorted=!1,a.bFiltered=!1,a.bDrawing=!1}function N(a,b){var c=a.oFeatures,d=c.bSort,e=c.bFilter;d&&Bb(a),e?X(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice(),b!==!0&&(a._iDisplayStart=0),a._drawHold=b,M(a),a._drawHold=!1}function O(a){var b=a.oClasses,c=d(a.nTable),e=d("<div/>").insertBefore(c),f=a.oFeatures,g=d("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=e[0],a.nTableWrapper=g[0],a.nTableReinsertBefore=a.nTable.nextSibling;for(var h,i,j,k,l,m,n=a.sDom.split(""),o=0;o<n.length;o++){if(h=null,i=n[o],"<"==i){if(j=d("<div/>")[0],k=n[o+1],"'"==k||'"'==k){for(l="",m=2;n[o+m]!=k;)l+=n[o+m],m++;if("H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter),-1!=l.indexOf(".")){var p=l.split(".");j.id=p[0].substr(1,p[0].length-1),j.className=p[1]}else"#"==l.charAt(0)?j.id=l.substr(1,l.length-1):j.className=l;o+=m}g.append(j),g=d(j)}else if(">"==i)g=g.parent();else if("l"==i&&f.bPaginate&&f.bLengthChange)h=kb(a);else if("f"==i&&f.bFilter)h=W(a);else if("r"==i&&f.bProcessing)h=nb(a);else if("t"==i)h=pb(a);else if("i"==i&&f.bInfo)h=eb(a);else if("p"==i&&f.bPaginate)h=lb(a);else if(0!==Wb.ext.feature.length)for(var q=Wb.ext.feature,r=0,s=q.length;s>r;r++)if(i==q[r].cFeature){h=q[r].fnInit(a);break}if(h){var t=a.aanFeatures;t[i]||(t[i]=[]),t[i].push(h),g.append(h)}}e.replaceWith(g)}function P(a,b){var c,e,f,g,h,i,j,k,l,m,n,o=d(b).children("tr"),p=function(a,b,c){for(var d=a[b];d[c];)c++;return c};for(a.splice(0,a.length),f=0,i=o.length;i>f;f++)a.push([]);for(f=0,i=o.length;i>f;f++)for(c=o[f],k=0,e=c.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase())for(l=1*e.getAttribute("colspan"),m=1*e.getAttribute("rowspan"),l=l&&0!==l&&1!==l?l:1,m=m&&0!==m&&1!==m?m:1,j=p(a,f,k),n=1===l?!0:!1,h=0;l>h;h++)for(g=0;m>g;g++)a[f+g][j+h]={cell:e,unique:n},a[f+g].nTr=c;e=e.nextSibling}}function Q(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],P(c,b)));for(var e=0,f=c.length;f>e;e++)for(var g=0,h=c[e].length;h>g;g++)!c[e][g].unique||d[g]&&a.bSortCellsTop||(d[g]=c[e][g].cell);return d}function R(a,b,c){if(Pb(a,"aoServerParams","serverParams",[b]),b&&d.isArray(b)){var e={},f=/(.*?)\[\]$/;d.each(b,function(a,b){var c=b.name.match(f);if(c){var d=c[0];e[d]||(e[d]=[]),e[d].push(b.value)}else e[b.name]=b.value}),b=e}var g,h=a.ajax,i=a.oInstance;if(d.isPlainObject(h)&&h.data){g=h.data;var j=d.isFunction(g)?g(b):g;b=d.isFunction(g)&&j?j:d.extend(!0,b,j),delete h.data}var k={data:b,success:function(b){var d=b.error||b.sError;d&&a.oApi._fnLog(a,0,d),a.json=b,Pb(a,null,"xhr",[a,b]),c(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=a.oApi._fnLog;"parsererror"==c?d(a,0,"Invalid JSON response",1):4===b.readyState&&d(a,0,"Ajax error",7),ob(a,!1)}};a.oAjaxData=b,Pb(a,null,"preXhr",[a,b]),a.fnServerData?a.fnServerData.call(i,a.sAjaxSource,d.map(b,function(a,b){return{name:b,value:a}}),c,a):a.sAjaxSource||"string"==typeof h?a.jqXHR=d.ajax(d.extend(k,{url:h||a.sAjaxSource})):d.isFunction(h)?a.jqXHR=h.call(i,b,c,a):(a.jqXHR=d.ajax(d.extend(k,h)),h.data=g)}function S(a){return a.bAjaxDataGet?(a.iDraw++,ob(a,!0),R(a,T(a),function(b){U(a,b)}),!1):!0}function T(a){var b,c,e,f,g=a.aoColumns,h=g.length,i=a.oFeatures,j=a.oPreviousSearch,k=a.aoPreSearchCols,l=[],m=Ab(a),n=a._iDisplayStart,o=i.bPaginate!==!1?a._iDisplayLength:-1,p=function(a,b){l.push({name:a,value:b})};p("sEcho",a.iDraw),p("iColumns",h),p("sColumns",mc(g,"sName").join(",")),p("iDisplayStart",n),p("iDisplayLength",o);var q={draw:a.iDraw,columns:[],order:[],start:n,length:o,search:{value:j.sSearch,regex:j.bRegex}};for(b=0;h>b;b++)e=g[b],f=k[b],c="function"==typeof e.mData?"function":e.mData,q.columns.push({data:c,name:e.sName,searchable:e.bSearchable,orderable:e.bSortable,search:{value:f.sSearch,regex:f.bRegex}}),p("mDataProp_"+b,c),i.bFilter&&(p("sSearch_"+b,f.sSearch),p("bRegex_"+b,f.bRegex),p("bSearchable_"+b,e.bSearchable)),i.bSort&&p("bSortable_"+b,e.bSortable);i.bFilter&&(p("sSearch",j.sSearch),p("bRegex",j.bRegex)),i.bSort&&(d.each(m,function(a,b){q.order.push({column:b.col,dir:b.dir}),p("iSortCol_"+a,b.col),p("sSortDir_"+a,b.dir)}),p("iSortingCols",m.length));var r=Wb.ext.legacy.ajax;return null===r?a.sAjaxSource?l:q:r?l:q}function U(a,b){var d=function(a,d){return b[a]!==c?b[a]:b[d]},e=d("sEcho","draw"),f=d("iTotalRecords","recordsTotal"),g=d("iTotalDisplayRecords","recordsFiltered");if(e){if(1*e<a.iDraw)return;a.iDraw=1*e}E(a),a._iRecordsTotal=parseInt(f,10),a._iRecordsDisplay=parseInt(g,10);for(var h=V(a,b),i=0,j=h.length;j>i;i++)u(a,h[i]);a.aiDisplay=a.aiDisplayMaster.slice(),a.bAjaxDataGet=!1,M(a),a._bInitComplete||ib(a,b),a.bAjaxDataGet=!0,ob(a,!1)}function V(a,b){var e=d.isPlainObject(a.ajax)&&a.ajax.dataSrc!==c?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===e?b.aaData||b[e]:""!==e?B(e)(b):b}function W(a){var c=a.oClasses,e=a.sTableId,f=a.oLanguage,g=a.oPreviousSearch,h=a.aanFeatures,i='<input type="search" class="'+c.sFilterInput+'"/>',j=f.sSearch;j=j.match(/_INPUT_/)?j.replace("_INPUT_",i):j+i;var k=d("<div/>",{id:h.f?null:e+"_filter","class":c.sFilter}).append(d("<label/>").append(j)),l=function(){var b=(h.f,this.value?this.value:"");b!=g.sSearch&&(X(a,{sSearch:b,bRegex:g.bRegex,bSmart:g.bSmart,bCaseInsensitive:g.bCaseInsensitive}),a._iDisplayStart=0,M(a))},m=null!==a.searchDelay?a.searchDelay:"ssp"===Sb(a)?400:0,n=d("input",k).val(g.sSearch).attr("placeholder",f.sSearchPlaceholder).bind("keyup.DT search.DT input.DT paste.DT cut.DT",m?tb(l,m):l).bind("keypress.DT",function(a){return 13==a.keyCode?!1:void 0}).attr("aria-controls",e);return d(a.nTable).on("search.dt.DT",function(c,d){if(a===d)try{n[0]!==b.activeElement&&n.val(g.sSearch)}catch(e){}}),k[0]}function X(a,b,d){var e=a.oPreviousSearch,f=a.aoPreSearchCols,g=function(a){e.sSearch=a.sSearch,e.bRegex=a.bRegex,e.bSmart=a.bSmart,e.bCaseInsensitive=a.bCaseInsensitive},h=function(a){return a.bEscapeRegex!==c?!a.bEscapeRegex:a.bRegex};if(s(a),"ssp"!=Sb(a)){$(a,b.sSearch,d,h(b),b.bSmart,b.bCaseInsensitive),g(b);for(var i=0;i<f.length;i++)Z(a,f[i].sSearch,i,h(f[i]),f[i].bSmart,f[i].bCaseInsensitive);Y(a)}else g(b);a.bFiltered=!0,Pb(a,null,"search",[a])}function Y(a){for(var b,c,d=Wb.ext.search,e=a.aiDisplay,f=0,g=d.length;g>f;f++){for(var h=[],i=0,j=e.length;j>i;i++)c=e[i],b=a.aoData[c],d[f](a,b._aFilterData,c,b._aData,i)&&h.push(c);e.length=0,e.push.apply(e,h)}}function Z(a,b,c,d,e,f){if(""!==b)for(var g,h=a.aiDisplay,i=_(b,d,e,f),j=h.length-1;j>=0;j--)g=a.aoData[h[j]]._aFilterData[c],i.test(g)||h.splice(j,1)}function $(a,b,c,d,e,f){var g,h,i,j=_(b,d,e,f),k=a.oPreviousSearch.sSearch,l=a.aiDisplayMaster;if(0!==Wb.ext.search.length&&(c=!0),h=bb(a),b.length<=0)a.aiDisplay=l.slice();else for((h||c||k.length>b.length||0!==b.indexOf(k)||a.bSorted)&&(a.aiDisplay=l.slice()),g=a.aiDisplay,i=g.length-1;i>=0;i--)j.test(a.aoData[g[i]]._sFilterRow)||g.splice(i,1)}function _(a,b,c,e){if(a=b?a:ab(a),c){var f=d.map(a.match(/"[^"]+"|[^ ]+/g)||"",function(a){if('"'===a.charAt(0)){var b=a.match(/^"(.*)"$/);a=b?b[1]:a}return a.replace('"',"")});a="^(?=.*?"+f.join(")(?=.*?")+").*$"}return new RegExp(a,e?"i":"")}function ab(a){return a.replace(ec,"\\$1")}function bb(a){var b,c,d,e,f,g,h,i,j=a.aoColumns,k=Wb.ext.type.search,l=!1;for(c=0,e=a.aoData.length;e>c;c++)if(i=a.aoData[c],!i._aFilterData){for(g=[],d=0,f=j.length;f>d;d++)b=j[d],b.bSearchable?(h=y(a,c,d,"filter"),k[b.sType]&&(h=k[b.sType](h)),null===h&&(h=""),"string"!=typeof h&&h.toString&&(h=h.toString())):h="",h.indexOf&&-1!==h.indexOf("&")&&(vc.innerHTML=h,h=wc?vc.textContent:vc.innerText),h.replace&&(h=h.replace(/[\r\n]/g,"")),g.push(h);i._aFilterData=g,i._sFilterRow=g.join("  "),l=!0}return l}function cb(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,caseInsensitive:a.bCaseInsensitive}}function db(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function eb(a){var b=a.sTableId,c=a.aanFeatures.i,e=d("<div/>",{"class":a.oClasses.sInfo,id:c?null:b+"_info"});return c||(a.aoDrawCallback.push({fn:fb,sName:"information"}),e.attr("role","status").attr("aria-live","polite"),d(a.nTable).attr("aria-describedby",b+"_info")),e[0]}function fb(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,e=a._iDisplayStart+1,f=a.fnDisplayEnd(),g=a.fnRecordsTotal(),h=a.fnRecordsDisplay(),i=h?c.sInfo:c.sInfoEmpty;h!==g&&(i+=" "+c.sInfoFiltered),i+=c.sInfoPostFix,i=gb(a,i);var j=c.fnInfoCallback;null!==j&&(i=j.call(a.oInstance,a,e,f,g,h,i)),d(b).html(i)}}function gb(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function hb(a){var b,c,d,e=a.iInitDisplayStart,f=a.aoColumns,g=a.oFeatures;if(!a.bInitialised)return void setTimeout(function(){hb(a)},200);for(O(a),K(a),L(a,a.aoHeader),L(a,a.aoFooter),ob(a,!0),g.bAutoWidth&&sb(a),b=0,c=f.length;c>b;b++)d=f[b],d.sWidth&&(d.nTh.style.width=yb(d.sWidth));N(a);var h=Sb(a);"ssp"!=h&&("ajax"==h?R(a,[],function(c){var d=V(a,c);for(b=0;b<d.length;b++)u(a,d[b]);a.iInitDisplayStart=e,N(a),ob(a,!1),ib(a,c)},a):(ob(a,!1),ib(a)))}function ib(a,b){a._bInitComplete=!0,b&&n(a),Pb(a,"aoInitComplete","init",[a,b])}function jb(a,b){var c=parseInt(b,10);a._iDisplayLength=c,Qb(a),Pb(a,null,"length",[a,c])}function kb(a){for(var b=a.oClasses,c=a.sTableId,e=a.aLengthMenu,f=d.isArray(e[0]),g=f?e[0]:e,h=f?e[1]:e,i=d("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),j=0,k=g.length;k>j;j++)i[0][j]=new Option(h[j],g[j]);var l=d("<div><label/></div>").addClass(b.sLength);return a.aanFeatures.l||(l[0].id=c+"_length"),l.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",i[0].outerHTML)),d("select",l).val(a._iDisplayLength).bind("change.DT",function(){jb(a,d(this).val()),M(a)}),d(a.nTable).bind("length.dt.DT",function(b,c,e){a===c&&d("select",l).val(e)}),l[0]}function lb(a){var b=a.sPaginationType,c=Wb.ext.pager[b],e="function"==typeof c,f=function(a){M(a)},g=d("<div/>").addClass(a.oClasses.sPaging+b)[0],h=a.aanFeatures;return e||c.fnInit(a,g,f),h.p||(g.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(e){var b,d,g=a._iDisplayStart,i=a._iDisplayLength,j=a.fnRecordsDisplay(),k=-1===i,l=k?0:Math.ceil(g/i),m=k?1:Math.ceil(j/i),n=c(l,m);for(b=0,d=h.p.length;d>b;b++)Rb(a,"pageButton")(a,h.p[b],b,n,l,m)}else c.fnUpdate(a,f)},sName:"pagination"})),g}function mb(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"==typeof b?(d=b*e,d>f&&(d=0)):"first"==b?d=0:"previous"==b?(d=e>=0?d-e:0,0>d&&(d=0)):"next"==b?f>d+e&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:Kb(a,0,"Unknown paging action: "+b,5);var g=a._iDisplayStart!==d;return a._iDisplayStart=d,g&&(Pb(a,null,"page",[a]),c&&M(a)),g}function nb(a){return d("<div/>",{id:a.aanFeatures.r?null:a.sTableId+"_processing","class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}function ob(a,b){a.oFeatures.bProcessing&&d(a.aanFeatures.r).css("display",b?"block":"none"),Pb(a,null,"processing",[a,b])}function pb(a){var b=d(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var e=c.sX,f=c.sY,g=a.oClasses,h=b.children("caption"),i=h.length?h[0]._captionSide:null,j=d(b[0].cloneNode(!1)),k=d(b[0].cloneNode(!1)),l=b.children("tfoot"),m="<div/>",n=function(a){return a?yb(a):null};c.sX&&"100%"===b.attr("width")&&b.removeAttr("width"),l.length||(l=null);var o=d(m,{"class":g.sScrollWrapper}).append(d(m,{"class":g.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:e?n(e):"100%"}).append(d(m,{"class":g.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(j.removeAttr("id").css("margin-left",0).append("top"===i?h:null).append(b.children("thead"))))).append(d(m,{"class":g.sScrollBody}).css({overflow:"auto",height:n(f),width:n(e)}).append(b));l&&o.append(d(m,{"class":g.sScrollFoot}).css({overflow:"hidden",border:0,width:e?n(e):"100%"}).append(d(m,{"class":g.sScrollFootInner}).append(k.removeAttr("id").css("margin-left",0).append("bottom"===i?h:null).append(b.children("tfoot")))));var p=o.children(),q=p[0],r=p[1],s=l?p[2]:null;return e&&d(r).scroll(function(){var a=this.scrollLeft;q.scrollLeft=a,l&&(s.scrollLeft=a)}),a.nScrollHead=q,a.nScrollBody=r,a.nScrollFoot=s,a.aoDrawCallback.push({fn:qb,sName:"scrolling"}),o[0]}function qb(a){var b,c,e,f,g,h,i,j,k,l=a.oScroll,m=l.sX,n=l.sXInner,p=l.sY,q=l.iBarWidth,r=d(a.nScrollHead),s=r[0].style,t=r.children("div"),u=t[0].style,v=t.children("table"),w=a.nScrollBody,x=d(w),y=w.style,z=d(a.nScrollFoot),A=z.children("div"),B=A.children("table"),C=d(a.nTHead),D=d(a.nTable),E=D[0],F=E.style,G=a.nTFoot?d(a.nTFoot):null,H=a.oBrowser,I=H.bScrollOversize,J=[],K=[],L=[],M=function(a){var b=a.style;b.paddingTop="0",b.paddingBottom="0",b.borderTopWidth="0",b.borderBottomWidth="0",b.height=0};if(D.children("thead, tfoot").remove(),g=C.clone().prependTo(D),b=C.find("tr"),e=g.find("tr"),g.find("th, td").removeAttr("tabindex"),G&&(h=G.clone().prependTo(D),c=G.find("tr"),f=h.find("tr")),m||(y.width="100%",r[0].style.width="100%"),d.each(Q(a,g),function(b,c){i=o(a,b),c.style.width=a.aoColumns[i].sWidth}),G&&rb(function(a){a.style.width=""},f),l.bCollapse&&""!==p&&(y.height=x[0].offsetHeight+C[0].offsetHeight+"px"),k=D.outerWidth(),""===m?(F.width="100%",I&&(D.find("tbody").height()>w.offsetHeight||"scroll"==x.css("overflow-y"))&&(F.width=yb(D.outerWidth()-q))):""!==n?F.width=yb(n):k==x.width()&&x.height()<D.height()?(F.width=yb(k-q),D.outerWidth()>k-q&&(F.width=yb(k))):F.width=yb(k),k=D.outerWidth(),rb(M,e),rb(function(a){L.push(a.innerHTML),J.push(yb(d(a).css("width")))},e),rb(function(a,b){a.style.width=J[b]},b),d(e).height(0),G&&(rb(M,f),rb(function(a){K.push(yb(d(a).css("width")))},f),rb(function(a,b){a.style.width=K[b]},c),d(f).height(0)),rb(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+L[b]+"</div>",a.style.width=J[b]},e),G&&rb(function(a,b){a.innerHTML="",a.style.width=K[b]},f),D.outerWidth()<k?(j=w.scrollHeight>w.offsetHeight||"scroll"==x.css("overflow-y")?k+q:k,I&&(w.scrollHeight>w.offsetHeight||"scroll"==x.css("overflow-y"))&&(F.width=yb(j-q)),(""===m||""!==n)&&Kb(a,1,"Possible column misalignment",6)):j="100%",y.width=yb(j),s.width=yb(j),G&&(a.nScrollFoot.style.width=yb(j)),p||I&&(y.height=yb(E.offsetHeight+q)),p&&l.bCollapse){y.height=yb(p);var N=m&&E.offsetWidth>w.offsetWidth?q:0;E.offsetHeight<w.offsetHeight&&(y.height=yb(E.offsetHeight+N))}var O=D.outerWidth();v[0].style.width=yb(O),u.width=yb(O);var P=D.height()>w.clientHeight||"scroll"==x.css("overflow-y"),R="padding"+(H.bScrollbarLeft?"Left":"Right");u[R]=P?q+"px":"0px",G&&(B[0].style.width=yb(O),A[0].style.width=yb(O),A[0].style[R]=P?q+"px":"0px"),x.scroll(),!a.bSorted&&!a.bFiltered||a._drawHold||(w.scrollTop=0)}function rb(a,b,c){for(var d,e,f=0,g=0,h=b.length;h>g;){for(d=b[g].firstChild,e=c?c[g].firstChild:null;d;)1===d.nodeType&&(c?a(d,e,f):a(d,f),f++),d=d.nextSibling,e=c?e.nextSibling:null;g++}}function sb(b){var c,e,f,g,h,i=b.nTable,j=b.aoColumns,k=b.oScroll,l=k.sY,m=k.sX,o=k.sXInner,p=j.length,s=r(b,"bVisible"),t=d("th",b.nTHead),u=i.getAttribute("width"),v=i.parentNode,w=!1;for(c=0;c<s.length;c++)e=j[s[c]],null!==e.sWidth&&(e.sWidth=ub(e.sWidthOrig,v),w=!0);if(w||m||l||p!=q(b)||p!=t.length){var x=d(i).clone().empty().css("visibility","hidden").removeAttr("id").append(d(b.nTHead).clone(!1)).append(d(b.nTFoot).clone(!1)).append(d("<tbody><tr/></tbody>"));x.find("tfoot th, tfoot td").css("width","");var y=x.find("tbody tr");for(t=Q(b,x.find("thead")[0]),c=0;c<s.length;c++)e=j[s[c]],t[c].style.width=null!==e.sWidthOrig&&""!==e.sWidthOrig?yb(e.sWidthOrig):"";if(b.aoData.length)for(c=0;c<s.length;c++)f=s[c],e=j[f],d(wb(b,f)).clone(!1).append(e.sContentPadding).appendTo(y);if(x.appendTo(v),m&&o?x.width(o):m?(x.css("width","auto"),x.width()<v.offsetWidth&&x.width(v.offsetWidth)):l?x.width(v.offsetWidth):u&&x.width(u),vb(b,x[0]),m){var z=0;for(c=0;c<s.length;c++)e=j[s[c]],h=d(t[c]).outerWidth(),z+=null===e.sWidthOrig?h:parseInt(e.sWidth,10)+h-d(t[c]).width();x.width(yb(z)),i.style.width=yb(z)}for(c=0;c<s.length;c++)e=j[s[c]],g=d(t[c]).width(),g&&(e.sWidth=yb(g));i.style.width=yb(x.css("width")),x.remove()}else for(c=0;p>c;c++)j[c].sWidth=yb(t.eq(c).width());u&&(i.style.width=yb(u)),!u&&!m||b._reszEvt||(d(a).bind("resize.DT-"+b.sInstance,tb(function(){n(b)})),b._reszEvt=!0)}function tb(a,b){var d,e,f=b!==c?b:200;return function(){var b=this,g=+new Date,h=arguments;d&&d+f>g?(clearTimeout(e),e=setTimeout(function(){d=c,a.apply(b,h)},f)):d?(d=g,a.apply(b,h)):d=g}}function ub(a,c){if(!a)return 0;var e=d("<div/>").css("width",yb(a)).appendTo(c||b.body),f=e[0].offsetWidth;return e.remove(),f}function vb(a,b){var c=a.oScroll;if(c.sX||c.sY){var e=c.sX?0:c.iBarWidth;b.style.width=yb(d(b).outerWidth()-e)}}function wb(a,b){var c=xb(a,b);if(0>c)return null;var e=a.aoData[c];return e.nTr?e.anCells[b]:d("<td/>").html(y(a,c,b,"display"))[0]}function xb(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;g>f;f++)c=y(a,f,b,"display")+"",c=c.replace(xc,""),c.length>d&&(d=c.length,e=f);return e}function yb(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function zb(){if(!Wb.__scrollbarWidth){var a=d("<p/>").css({width:"100%",height:200,padding:0})[0],b=d("<div/>").css({position:"absolute",top:0,left:0,width:200,height:150,padding:0,overflow:"hidden",visibility:"hidden"}).append(a).appendTo("body"),c=a.offsetWidth;b.css("overflow","scroll");var e=a.offsetWidth;c===e&&(e=b[0].clientWidth),b.remove(),Wb.__scrollbarWidth=c-e}return Wb.__scrollbarWidth}function Ab(a){var b,e,f,g,h,i,j,k=[],l=a.aoColumns,m=a.aaSortingFixed,n=d.isPlainObject(m),o=[],p=function(a){a.length&&!d.isArray(a[0])?o.push(a):o.push.apply(o,a)};for(d.isArray(m)&&p(m),n&&m.pre&&p(m.pre),p(a.aaSorting),n&&m.post&&p(m.post),b=0;b<o.length;b++)for(j=o[b][0],g=l[j].aDataSort,e=0,f=g.length;f>e;e++)h=g[e],i=l[h].sType||"string",o[b]._idx===c&&(o[b]._idx=d.inArray(o[b][1],l[h].asSorting)),k.push({src:j,col:h,dir:o[b][1],index:o[b]._idx,type:i,formatter:Wb.ext.type.order[i+"-pre"]});return k}function Bb(a){var b,c,d,e,f,g=[],h=Wb.ext.type.order,i=a.aoData,j=(a.aoColumns,0),k=a.aiDisplayMaster;for(s(a),f=Ab(a),b=0,c=f.length;c>b;b++)e=f[b],e.formatter&&j++,Gb(a,e.col);if("ssp"!=Sb(a)&&0!==f.length){for(b=0,d=k.length;d>b;b++)g[k[b]]=b;k.sort(j===f.length?function(a,b){var c,d,e,h,j,k=f.length,l=i[a]._aSortData,m=i[b]._aSortData;for(e=0;k>e;e++)if(j=f[e],c=l[j.col],d=m[j.col],h=d>c?-1:c>d?1:0,0!==h)return"asc"===j.dir?h:-h;return c=g[a],d=g[b],d>c?-1:c>d?1:0}:function(a,b){var c,d,e,j,k,l,m=f.length,n=i[a]._aSortData,o=i[b]._aSortData;for(e=0;m>e;e++)if(k=f[e],c=n[k.col],d=o[k.col],l=h[k.type+"-"+k.dir]||h["string-"+k.dir],j=l(c,d),0!==j)return j;return c=g[a],d=g[b],d>c?-1:c>d?1:0})}a.bSorted=!0}function Cb(a){for(var b,c,d=a.aoColumns,e=Ab(a),f=a.oLanguage.oAria,g=0,h=d.length;h>g;g++){var i=d[g],j=i.asSorting,k=i.sTitle.replace(/<.*?>/g,""),l=i.nTh;l.removeAttribute("aria-sort"),i.bSortable?(e.length>0&&e[0].col==g?(l.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b=k+("asc"===c?f.sSortAscending:f.sSortDescending)):b=k,l.setAttribute("aria-label",b)}}function Db(a,b,e,f){var g,h=a.aoColumns[b],i=a.aaSorting,j=h.asSorting,k=function(a,b){var e=a._idx;
return e===c&&(e=d.inArray(a[1],j)),e+1<j.length?e+1:b?null:0};if("number"==typeof i[0]&&(i=a.aaSorting=[i]),e&&a.oFeatures.bSortMulti){var l=d.inArray(b,mc(i,"0"));-1!==l?(g=k(i[l],!0),null===g?i.splice(l,1):(i[l][1]=j[g],i[l]._idx=g)):(i.push([b,j[0],0]),i[i.length-1]._idx=0)}else i.length&&i[0][0]==b?(g=k(i[0]),i.length=1,i[0][1]=j[g],i[0]._idx=g):(i.length=0,i.push([b,j[0]]),i[0]._idx=0);N(a),"function"==typeof f&&f(a)}function Eb(a,b,c,d){var e=a.aoColumns[c];Nb(b,{},function(b){e.bSortable!==!1&&(a.oFeatures.bProcessing?(ob(a,!0),setTimeout(function(){Db(a,c,b.shiftKey,d),"ssp"!==Sb(a)&&ob(a,!1)},0)):Db(a,c,b.shiftKey,d))})}function Fb(a){var b,c,e,f=a.aLastSort,g=a.oClasses.sSortColumn,h=Ab(a),i=a.oFeatures;if(i.bSort&&i.bSortClasses){for(b=0,c=f.length;c>b;b++)e=f[b].src,d(mc(a.aoData,"anCells",e)).removeClass(g+(2>b?b+1:3));for(b=0,c=h.length;c>b;b++)e=h[b].src,d(mc(a.aoData,"anCells",e)).addClass(g+(2>b?b+1:3))}a.aLastSort=h}function Gb(a,b){var c,d=a.aoColumns[b],e=Wb.ext.order[d.sSortDataType];e&&(c=e.call(a.oInstance,a,b,p(a,b)));for(var f,g,h=Wb.ext.type.order[d.sType+"-pre"],i=0,j=a.aoData.length;j>i;i++)f=a.aoData[i],f._aSortData||(f._aSortData=[]),(!f._aSortData[b]||e)&&(g=e?c[i]:y(a,i,b,"sort"),f._aSortData[b]=h?h(g):g)}function Hb(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:d.extend(!0,[],a.aaSorting),search:cb(a.oPreviousSearch),columns:d.map(a.aoColumns,function(b,c){return{visible:b.bVisible,search:cb(a.aoPreSearchCols[c])}})};Pb(a,"aoStateSaveParams","stateSaveParams",[a,b]),a.oSavedState=b,a.fnStateSaveCallback.call(a.oInstance,a,b)}}function Ib(a){var b,c,e=a.aoColumns;if(a.oFeatures.bStateSave){var f=a.fnStateLoadCallback.call(a.oInstance,a);if(f&&f.time){var g=Pb(a,"aoStateLoadParams","stateLoadParams",[a,f]);if(-1===d.inArray(!1,g)){var h=a.iStateDuration;if(!(h>0&&f.time<+new Date-1e3*h)&&e.length===f.columns.length){for(a.oLoadedState=d.extend(!0,{},f),a._iDisplayStart=f.start,a.iInitDisplayStart=f.start,a._iDisplayLength=f.length,a.aaSorting=[],d.each(f.order,function(b,c){a.aaSorting.push(c[0]>=e.length?[0,c[1]]:c)}),d.extend(a.oPreviousSearch,db(f.search)),b=0,c=f.columns.length;c>b;b++){var i=f.columns[b];e[b].bVisible=i.visible,d.extend(a.aoPreSearchCols[b],db(i.search))}Pb(a,"aoStateLoaded","stateLoaded",[a,f])}}}}}function Jb(a){var b=Wb.settings,c=d.inArray(a,mc(b,"nTable"));return-1!==c?b[c]:null}function Kb(b,c,d,e){if(d="DataTables warning: "+(null!==b?"table id="+b.sTableId+" - ":"")+d,e&&(d+=". For more information about this error, please see http://datatables.net/tn/"+e),c)a.console&&console.log&&console.log(d);else{var f=Wb.ext,g=f.sErrMode||f.errMode;if("alert"!=g)throw new Error(d);alert(d)}}function Lb(a,b,e,f){return d.isArray(e)?void d.each(e,function(c,e){d.isArray(e)?Lb(a,b,e[0],e[1]):Lb(a,b,e)}):(f===c&&(f=e),void(b[e]!==c&&(a[f]=b[e])))}function Mb(a,b,c){var e;for(var f in b)b.hasOwnProperty(f)&&(e=b[f],d.isPlainObject(e)?(d.isPlainObject(a[f])||(a[f]={}),d.extend(!0,a[f],e)):a[f]=c&&"data"!==f&&"aaData"!==f&&d.isArray(e)?e.slice():e);return a}function Nb(a,b,c){d(a).bind("click.DT",b,function(b){a.blur(),c(b)}).bind("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).bind("selectstart.DT",function(){return!1})}function Ob(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function Pb(a,b,c,e){var f=[];return b&&(f=d.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,e)})),null!==c&&d(a.nTable).trigger(c+".dt",e),f}function Qb(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d),b-=b%d,(-1===d||0>b)&&(b=0),a._iDisplayStart=b}function Rb(a,b){var c=a.renderer,e=Wb.ext.renderer[b];return d.isPlainObject(c)&&c[b]?e[c[b]]||e._:"string"==typeof c?e[c]||e._:e._}function Sb(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function Tb(a,b){var c=[],d=Uc.numbers_length,e=Math.floor(d/2);return d>=b?c=oc(0,b):e>=a?(c=oc(0,d-2),c.push("ellipsis"),c.push(b-1)):a>=b-1-e?(c=oc(b-(d-2),b),c.splice(0,0,"ellipsis"),c.splice(0,0,0)):(c=oc(a-1,a+2),c.push("ellipsis"),c.push(b-1),c.splice(0,0,"ellipsis"),c.splice(0,0,0)),c.DT_el="span",c}function Ub(a){d.each({num:function(b){return Vc(b,a)},"num-fmt":function(b){return Vc(b,a,fc)},"html-num":function(b){return Vc(b,a,bc)},"html-num-fmt":function(b){return Vc(b,a,bc,fc)}},function(b,c){Xb.type.order[b+a+"-pre"]=c,b.match(/^html\-/)&&(Xb.type.search[b+a]=Xb.type.search.html)})}function Vb(a){return function(){var b=[Jb(this[Wb.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return Wb.ext.internal[a].apply(this,b)}}var Wb,Xb,Yb,Zb,$b,_b={},ac=/[\r\n]/g,bc=/<.*?>/g,cc=/^[\w\+\-]/,dc=/[\w\+\-]$/,ec=new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^","-"].join("|\\")+")","g"),fc=/[',$£€¥%\u2009\u202F]/g,gc=function(a){return a&&a!==!0&&"-"!==a?!1:!0},hc=function(a){var b=parseInt(a,10);return!isNaN(b)&&isFinite(a)?b:null},ic=function(a,b){return _b[b]||(_b[b]=new RegExp(ab(b),"g")),"string"==typeof a&&"."!==b?a.replace(/\./g,"").replace(_b[b],"."):a},jc=function(a,b,c){var d="string"==typeof a;return b&&d&&(a=ic(a,b)),c&&d&&(a=a.replace(fc,"")),gc(a)||!isNaN(parseFloat(a))&&isFinite(a)},kc=function(a){return gc(a)||"string"==typeof a},lc=function(a,b,c){if(gc(a))return!0;var d=kc(a);return d&&jc(qc(a),b,c)?!0:null},mc=function(a,b,d){var e=[],f=0,g=a.length;if(d!==c)for(;g>f;f++)a[f]&&a[f][b]&&e.push(a[f][b][d]);else for(;g>f;f++)a[f]&&e.push(a[f][b]);return e},nc=function(a,b,d,e){var f=[],g=0,h=b.length;if(e!==c)for(;h>g;g++)a[b[g]][d]&&f.push(a[b[g]][d][e]);else for(;h>g;g++)f.push(a[b[g]][d]);return f},oc=function(a,b){var d,e=[];b===c?(b=0,d=a):(d=b,b=a);for(var f=b;d>f;f++)e.push(f);return e},pc=function(a){for(var b=[],c=0,d=a.length;d>c;c++)a[c]&&b.push(a[c]);return b},qc=function(a){return a.replace(bc,"")},rc=function(a){var b,c,d,e=[],f=a.length,g=0;a:for(c=0;f>c;c++){for(b=a[c],d=0;g>d;d++)if(e[d]===b)continue a;e.push(b),g++}return e},sc=function(a,b,d){a[b]!==c&&(a[d]=a[b])},tc=/\[.*?\]$/,uc=/\(\)$/,vc=d("<div>")[0],wc=vc.textContent!==c,xc=/<.*?>/g;Wb=function(a){this.$=function(a,b){return this.api(!0).$(a,b)},this._=function(a,b){return this.api(!0).rows(a,b).data()},this.api=function(a){return new Yb(a?Jb(this[Xb.iApiIndex]):this)},this.fnAddData=function(a,b){var e=this.api(!0),f=d.isArray(a)&&(d.isArray(a[0])||d.isPlainObject(a[0]))?e.rows.add(a):e.row.add(a);return(b===c||b)&&e.draw(),f.flatten().toArray()},this.fnAdjustColumnSizing=function(a){var b=this.api(!0).columns.adjust(),d=b.settings()[0],e=d.oScroll;a===c||a?b.draw(!1):(""!==e.sX||""!==e.sY)&&qb(d)},this.fnClearTable=function(a){var b=this.api(!0).clear();(a===c||a)&&b.draw()},this.fnClose=function(a){this.api(!0).row(a).child.hide()},this.fnDeleteRow=function(a,b,d){var e=this.api(!0),f=e.rows(a),g=f.settings()[0],h=g.aoData[f[0][0]];return f.remove(),b&&b.call(this,g,h),(d===c||d)&&e.draw(),h},this.fnDestroy=function(a){this.api(!0).destroy(a)},this.fnDraw=function(a){this.api(!0).draw(!a)},this.fnFilter=function(a,b,d,e,f,g){var h=this.api(!0);null===b||b===c?h.search(a,d,e,g):h.column(b).search(a,d,e,g),h.draw()},this.fnGetData=function(a,b){var d=this.api(!0);if(a!==c){var e=a.nodeName?a.nodeName.toLowerCase():"";return b!==c||"td"==e||"th"==e?d.cell(a,b).data():d.row(a).data()||null}return d.data().toArray()},this.fnGetNodes=function(a){var b=this.api(!0);return a!==c?b.row(a).node():b.rows().nodes().flatten().toArray()},this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();if("TR"==c)return b.row(a).index();if("TD"==c||"TH"==c){var d=b.cell(a).index();return[d.row,d.columnVisible,d.column]}return null},this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()},this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]},this.fnPageChange=function(a,b){var d=this.api(!0).page(a);(b===c||b)&&d.draw(!1)},this.fnSetColumnVis=function(a,b,d){var e=this.api(!0).column(a).visible(b);(d===c||d)&&e.columns.adjust().draw()},this.fnSettings=function(){return Jb(this[Xb.iApiIndex])},this.fnSort=function(a){this.api(!0).order(a).draw()},this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)},this.fnUpdate=function(a,b,d,e,f){var g=this.api(!0);return d===c||null===d?g.row(b).data(a):g.cell(b,d).data(a),(f===c||f)&&g.columns.adjust(),(e===c||e)&&g.draw(),0},this.fnVersionCheck=Xb.fnVersionCheck;var b=this,e=a===c,k=this.length;e&&(a={}),this.oApi=this.internal=Xb.internal;for(var n in Wb.ext.internal)n&&(this[n]=Vb(n));return this.each(function(){var n,o={},p=k>1?Mb(o,a,!0):a,q=0,r=this.getAttribute("id"),s=!1,w=Wb.defaults;if("table"!=this.nodeName.toLowerCase())return void Kb(null,0,"Non-table node initialisation ("+this.nodeName+")",2);h(w),i(w.column),f(w,w,!0),f(w.column,w.column,!0),f(w,p);var x=Wb.settings;for(q=0,n=x.length;n>q;q++){if(x[q].nTable==this){var y=p.bRetrieve!==c?p.bRetrieve:w.bRetrieve,z=p.bDestroy!==c?p.bDestroy:w.bDestroy;if(e||y)return x[q].oInstance;if(z){x[q].oInstance.fnDestroy();break}return void Kb(x[q],0,"Cannot reinitialise DataTable",3)}if(x[q].sTableId==this.id){x.splice(q,1);break}}(null===r||""===r)&&(r="DataTables_Table_"+Wb.ext._unique++,this.id=r);var A=d.extend(!0,{},Wb.models.oSettings,{nTable:this,oApi:b.internal,oInit:p,sDestroyWidth:d(this)[0].style.width,sInstance:r,sTableId:r});x.push(A),A.oInstance=1===b.length?b:d(this).dataTable(),h(p),p.oLanguage&&g(p.oLanguage),p.aLengthMenu&&!p.iDisplayLength&&(p.iDisplayLength=d.isArray(p.aLengthMenu[0])?p.aLengthMenu[0][0]:p.aLengthMenu[0]),p=Mb(d.extend(!0,{},w),p),Lb(A.oFeatures,p,["bPaginate","bLengthChange","bFilter","bSort","bSortMulti","bInfo","bProcessing","bAutoWidth","bSortClasses","bServerSide","bDeferRender"]),Lb(A,p,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]),Lb(A.oScroll,p,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]),Lb(A.oLanguage,p,"fnInfoCallback"),Ob(A,"aoDrawCallback",p.fnDrawCallback,"user"),Ob(A,"aoServerParams",p.fnServerParams,"user"),Ob(A,"aoStateSaveParams",p.fnStateSaveParams,"user"),Ob(A,"aoStateLoadParams",p.fnStateLoadParams,"user"),Ob(A,"aoStateLoaded",p.fnStateLoaded,"user"),Ob(A,"aoRowCallback",p.fnRowCallback,"user"),Ob(A,"aoRowCreatedCallback",p.fnCreatedRow,"user"),Ob(A,"aoHeaderCallback",p.fnHeaderCallback,"user"),Ob(A,"aoFooterCallback",p.fnFooterCallback,"user"),Ob(A,"aoInitComplete",p.fnInitComplete,"user"),Ob(A,"aoPreDrawCallback",p.fnPreDrawCallback,"user");var B=A.oClasses;if(p.bJQueryUI?(d.extend(B,Wb.ext.oJUIClasses,p.oClasses),p.sDom===w.sDom&&"lfrtip"===w.sDom&&(A.sDom='<"H"lfr>t<"F"ip>'),A.renderer?d.isPlainObject(A.renderer)&&!A.renderer.header&&(A.renderer.header="jqueryui"):A.renderer="jqueryui"):d.extend(B,Wb.ext.classes,p.oClasses),d(this).addClass(B.sTable),(""!==A.oScroll.sX||""!==A.oScroll.sY)&&(A.oScroll.iBarWidth=zb()),A.oScroll.sX===!0&&(A.oScroll.sX="100%"),A.iInitDisplayStart===c&&(A.iInitDisplayStart=p.iDisplayStart,A._iDisplayStart=p.iDisplayStart),null!==p.iDeferLoading){A.bDeferLoading=!0;var C=d.isArray(p.iDeferLoading);A._iRecordsDisplay=C?p.iDeferLoading[0]:p.iDeferLoading,A._iRecordsTotal=C?p.iDeferLoading[1]:p.iDeferLoading}var D=A.oLanguage;d.extend(!0,D,p.oLanguage),""!==D.sUrl&&(d.ajax({dataType:"json",url:D.sUrl,success:function(a){g(a),f(w.oLanguage,a),d.extend(!0,D,a),hb(A)},error:function(){hb(A)}}),s=!0),null===p.asStripeClasses&&(A.asStripeClasses=[B.sStripeOdd,B.sStripeEven]);var E=A.asStripeClasses,F=d("tbody tr:eq(0)",this);-1!==d.inArray(!0,d.map(E,function(a){return F.hasClass(a)}))&&(d("tbody tr",this).removeClass(E.join(" ")),A.asDestroyStripes=E.slice());var G,I=[],J=this.getElementsByTagName("thead");if(0!==J.length&&(P(A.aoHeader,J[0]),I=Q(A)),null===p.aoColumns)for(G=[],q=0,n=I.length;n>q;q++)G.push(null);else G=p.aoColumns;for(q=0,n=G.length;n>q;q++)l(A,I?I[q]:null);if(t(A,p.aoColumnDefs,G,function(a,b){m(A,a,b)}),F.length){var K=function(a,b){return a.getAttribute("data-"+b)?b:null};d.each(H(A,F[0]).cells,function(a,b){var d=A.aoColumns[a];if(d.mData===a){var e=K(b,"sort")||K(b,"order"),f=K(b,"filter")||K(b,"search");(null!==e||null!==f)&&(d.mData={_:a+".display",sort:null!==e?a+".@data-"+e:c,type:null!==e?a+".@data-"+e:c,filter:null!==f?a+".@data-"+f:c},m(A,a))}})}var L=A.oFeatures;if(p.bStateSave&&(L.bStateSave=!0,Ib(A,p),Ob(A,"aoDrawCallback",Hb,"state_save")),p.aaSorting===c){var M=A.aaSorting;for(q=0,n=M.length;n>q;q++)M[q][1]=A.aoColumns[q].asSorting[0]}Fb(A),L.bSort&&Ob(A,"aoDrawCallback",function(){if(A.bSorted){var a=Ab(A),b={};d.each(a,function(a,c){b[c.src]=c.dir}),Pb(A,null,"order",[A,a,b]),Cb(A)}}),Ob(A,"aoDrawCallback",function(){(A.bSorted||"ssp"===Sb(A)||L.bDeferRender)&&Fb(A)},"sc"),j(A);var N=d(this).children("caption").each(function(){this._captionSide=d(this).css("caption-side")}),O=d(this).children("thead");0===O.length&&(O=d("<thead/>").appendTo(this)),A.nTHead=O[0];var R=d(this).children("tbody");0===R.length&&(R=d("<tbody/>").appendTo(this)),A.nTBody=R[0];var S=d(this).children("tfoot");if(0===S.length&&N.length>0&&(""!==A.oScroll.sX||""!==A.oScroll.sY)&&(S=d("<tfoot/>").appendTo(this)),0===S.length||0===S.children().length?d(this).addClass(B.sNoFooter):S.length>0&&(A.nTFoot=S[0],P(A.aoFooter,A.nTFoot)),p.aaData)for(q=0;q<p.aaData.length;q++)u(A,p.aaData[q]);else(A.bDeferLoading||"dom"==Sb(A))&&v(A,d(A.nTBody).children("tr"));A.aiDisplay=A.aiDisplayMaster.slice(),A.bInitialised=!0,s===!1&&hb(A)}),b=null,this};var yc=[],zc=Array.prototype,Ac=function(a){var b,c,e=Wb.settings,f=d.map(e,function(a){return a.nTable});return a?a.nTable&&a.oApi?[a]:a.nodeName&&"table"===a.nodeName.toLowerCase()?(b=d.inArray(a,f),-1!==b?[e[b]]:null):a&&"function"==typeof a.settings?a.settings().toArray():("string"==typeof a?c=d(a):a instanceof d&&(c=a),c?c.map(function(){return b=d.inArray(this,f),-1!==b?e[b]:null}).toArray():void 0):[]};Yb=function(a,b){if(!this instanceof Yb)throw"DT API must be constructed as a new object";var c=[],e=function(a){var b=Ac(a);b&&c.push.apply(c,b)};if(d.isArray(a))for(var f=0,g=a.length;g>f;f++)e(a[f]);else e(a);this.context=rc(c),b&&this.push.apply(this,b.toArray?b.toArray():b),this.selector={rows:null,cols:null,opts:null},Yb.extend(this,this,yc)},Wb.Api=Yb,Yb.prototype={concat:zc.concat,context:[],each:function(a){for(var b=0,c=this.length;c>b;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=this.context;return b.length>a?new Yb(b[a],this[a]):null},filter:function(a){var b=[];if(zc.filter)b=zc.filter.call(this,a,this);else for(var c=0,d=this.length;d>c;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new Yb(this.context,b)},flatten:function(){var a=[];return new Yb(this.context,a.concat.apply(a,this.toArray()))},join:zc.join,indexOf:zc.indexOf||function(a,b){for(var c=b||0,d=this.length;d>c;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,d,e){var f,g,h,i,j,k,l,m,n=[],o=this.context,p=this.selector;for("string"==typeof a&&(e=d,d=b,b=a,a=!1),g=0,h=o.length;h>g;g++){var q=new Yb(o[g]);if("table"===b)f=d.call(q,o[g],g),f!==c&&n.push(f);else if("columns"===b||"rows"===b)f=d.call(q,o[g],this[g],g),f!==c&&n.push(f);else if("column"===b||"column-rows"===b||"row"===b||"cell"===b)for(l=this[g],"column-rows"===b&&(k=Gc(o[g],p.opts)),i=0,j=l.length;j>i;i++)m=l[i],f="cell"===b?d.call(q,o[g],m.row,m.column,g,i):d.call(q,o[g],m,g,i,k),f!==c&&n.push(f)}if(n.length||e){var r=new Yb(o,a?n.concat.apply([],n):n),s=r.selector;return s.rows=p.rows,s.cols=p.cols,s.opts=p.opts,r}return this},lastIndexOf:zc.lastIndexOf||function(){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(zc.map)b=zc.map.call(this,a,this);else for(var c=0,d=this.length;d>c;c++)b.push(a.call(this,this[c],c));return new Yb(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:zc.pop,push:zc.push,reduce:zc.reduce||function(a,b){return k(this,a,b,0,this.length,1)},reduceRight:zc.reduceRight||function(a,b){return k(this,a,b,this.length-1,-1,-1)},reverse:zc.reverse,selector:null,shift:zc.shift,sort:zc.sort,splice:zc.splice,toArray:function(){return zc.slice.call(this)},to$:function(){return d(this)},toJQuery:function(){return d(this)},unique:function(){return new Yb(this.context,rc(this))},unshift:zc.unshift},Yb.extend=function(a,b,c){if(b&&(b instanceof Yb||b.__dt_wrapper)){var e,f,g,h=function(a,b,c){return function(){var d=b.apply(a,arguments);return Yb.extend(d,d,c.methodExt),d}};for(e=0,f=c.length;f>e;e++)g=c[e],b[g.name]="function"==typeof g.val?h(a,g.val,g):d.isPlainObject(g.val)?{}:g.val,b[g.name].__dt_wrapper=!0,Yb.extend(a,b[g.name],g.propExt)}},Yb.register=Zb=function(a,b){if(d.isArray(a))for(var c=0,e=a.length;e>c;c++)Yb.register(a[c],b);else{var f,g,h,i,j=a.split("."),k=yc,l=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c].name===b)return a[c];return null};for(f=0,g=j.length;g>f;f++){i=-1!==j[f].indexOf("()"),h=i?j[f].replace("()",""):j[f];var m=l(k,h);m||(m={name:h,val:{},methodExt:[],propExt:[]},k.push(m)),f===g-1?m.val=b:k=i?m.methodExt:m.propExt}}},Yb.registerPlural=$b=function(a,b,e){Yb.register(a,e),Yb.register(b,function(){var a=e.apply(this,arguments);return a===this?this:a instanceof Yb?a.length?d.isArray(a[0])?new Yb(a.context,a[0]):a[0]:c:a})};var Bc=function(a,b){if("number"==typeof a)return[b[a]];var c=d.map(b,function(a){return a.nTable});return d(c).filter(a).map(function(){var a=d.inArray(this,c);return b[a]}).toArray()};Zb("tables()",function(a){return a?new Yb(Bc(a,this.context)):this}),Zb("table()",function(a){var b=this.tables(a),c=b.context;return c.length?new Yb(c[0]):b}),$b("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)}),$b("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody},1)}),$b("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)}),$b("tables().footer()","table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)}),$b("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)}),Zb("draw()",function(a){return this.iterator("table",function(b){N(b,a===!1)})}),Zb("page()",function(a){return a===c?this.page.info().page:this.iterator("table",function(b){mb(b,a)})}),Zb("page.info()",function(){if(0===this.context.length)return c;var a=this.context[0],b=a._iDisplayStart,d=a._iDisplayLength,e=a.fnRecordsDisplay(),f=-1===d;return{page:f?0:Math.floor(b/d),pages:f?1:Math.ceil(e/d),start:b,end:a.fnDisplayEnd(),length:d,recordsTotal:a.fnRecordsTotal(),recordsDisplay:e}}),Zb("page.len()",function(a){return a===c?0!==this.context.length?this.context[0]._iDisplayLength:c:this.iterator("table",function(b){jb(b,a)})});var Cc=function(a,b,c){if("ssp"==Sb(a)?N(a,b):(ob(a,!0),R(a,[],function(c){E(a);for(var d=V(a,c),e=0,f=d.length;f>e;e++)u(a,d[e]);N(a,b),ob(a,!1)})),c){var d=new Yb(a);d.one("draw",function(){c(d.ajax.json())})}};Zb("ajax.json()",function(){var a=this.context;return a.length>0?a[0].json:void 0}),Zb("ajax.params()",function(){var a=this.context;return a.length>0?a[0].oAjaxData:void 0}),Zb("ajax.reload()",function(a,b){return this.iterator("table",function(c){Cc(c,b===!1,a)})}),Zb("ajax.url()",function(a){var b=this.context;return a===c?0===b.length?c:(b=b[0],b.ajax?d.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource):this.iterator("table",function(b){d.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})}),Zb("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Cc(c,b===!1,a)})});var Dc=function(a,b){var e,f,g,h,i,j,k=[],l=typeof a;for(a&&"string"!==l&&"function"!==l&&a.length!==c||(a=[a]),g=0,h=a.length;h>g;g++)for(f=a[g]&&a[g].split?a[g].split(","):[a[g]],i=0,j=f.length;j>i;i++)e=b("string"==typeof f[i]?d.trim(f[i]):f[i]),e&&e.length&&k.push.apply(k,e);return k},Ec=function(a){return a||(a={}),a.filter&&!a.search&&(a.search=a.filter),{search:a.search||"none",order:a.order||"current",page:a.page||"all"}},Fc=function(a){for(var b=0,c=a.length;c>b;b++)if(a[b].length>0)return a[0]=a[b],a.length=1,a.context=[a.context[b]],a;return a.length=0,a},Gc=function(a,b){var c,e,f,g=[],h=a.aiDisplay,i=a.aiDisplayMaster,j=b.search,k=b.order,l=b.page;if("ssp"==Sb(a))return"removed"===j?[]:oc(0,i.length);if("current"==l)for(c=a._iDisplayStart,e=a.fnDisplayEnd();e>c;c++)g.push(h[c]);else if("current"==k||"applied"==k)g="none"==j?i.slice():"applied"==j?h.slice():d.map(i,function(a){return-1===d.inArray(a,h)?a:null});else if("index"==k||"original"==k)for(c=0,e=a.aoData.length;e>c;c++)"none"==j?g.push(c):(f=d.inArray(c,h),(-1===f&&"removed"==j||f>=0&&"applied"==j)&&g.push(c));return g},Hc=function(a,b,c){return Dc(b,function(b){var e=hc(b);if(null!==e&&!c)return[e];var f=Gc(a,c);if(null!==e&&-1!==d.inArray(e,f))return[e];if(!b)return f;if("function"==typeof b)return d.map(f,function(c){var d=a.aoData[c];return b(c,d._aData,d.nTr)?c:null});var g=pc(nc(a.aoData,f,"nTr"));return b.nodeName&&-1!==d.inArray(b,g)?[b._DT_RowIndex]:d(g).filter(b).map(function(){return this._DT_RowIndex}).toArray()})};Zb("rows()",function(a,b){a===c?a="":d.isPlainObject(a)&&(b=a,a=""),b=Ec(b);var e=this.iterator("table",function(c){return Hc(c,a,b)},1);return e.selector.rows=a,e.selector.opts=b,e}),Zb("rows().nodes()",function(){return this.iterator("row",function(a,b){return a.aoData[b].nTr||c},1)}),Zb("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return nc(a.aoData,b,"_aData")},1)}),$b("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData},1)}),$b("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){G(b,c,a)})}),$b("rows().indexes()","row().index()",function(){return this.iterator("row",function(a,b){return b},1)}),$b("rows().remove()","row().remove()",function(){var a=this;return this.iterator("row",function(b,c,e){var f=b.aoData;f.splice(c,1);for(var g=0,h=f.length;h>g;g++)null!==f[g].nTr&&(f[g].nTr._DT_RowIndex=g);d.inArray(c,b.aiDisplay);F(b.aiDisplayMaster,c),F(b.aiDisplay,c),F(a[e],c,!1),Qb(b)})}),Zb("rows.add()",function(a){var b=this.iterator("table",function(b){var c,d,e,f=[];for(d=0,e=a.length;e>d;d++)c=a[d],f.push(c.nodeName&&"TR"===c.nodeName.toUpperCase()?v(b,c)[0]:u(b,c));return f},1),c=this.rows(-1);return c.pop(),c.push.apply(c,b.toArray()),c}),Zb("row()",function(a,b){return Fc(this.rows(a,b))}),Zb("row().data()",function(a){var b=this.context;return a===c?b.length&&this.length?b[0].aoData[this[0]]._aData:c:(b[0].aoData[this[0]]._aData=a,G(b[0],this[0],"data"),this)}),Zb("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null}),Zb("row.add()",function(a){a instanceof d&&a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?v(b,a)[0]:u(b,a)});return this.row(b[0])});var Ic=function(a,b,c,e){var f=[],g=function(b,c){if(b.nodeName&&"tr"===b.nodeName.toLowerCase())f.push(b);else{var e=d("<tr><td/></tr>").addClass(c);d("td",e).addClass(c).html(b)[0].colSpan=q(a),f.push(e[0])}};if(d.isArray(c)||c instanceof d)for(var h=0,i=c.length;i>h;h++)g(c[h],e);else g(c,e);b._details&&b._details.remove(),b._details=d(f),b._detailsShow&&b._details.insertAfter(b.nTr)},Jc=function(a,b){var d=a.context;if(d.length){var e=d[0].aoData[b!==c?b:a[0]];e._details&&(e._details.remove(),e._detailsShow=c,e._details=c)}},Kc=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];d._details&&(d._detailsShow=b,b?d._details.insertAfter(d.nTr):d._details.detach(),Lc(c[0]))}},Lc=function(a){var b=new Yb(a),c=".dt.DT_details",d="draw"+c,e="column-visibility"+c,f="destroy"+c,g=a.aoData;b.off(d+" "+e+" "+f),mc(g,"_details").length>0&&(b.on(d,function(c,d){a===d&&b.rows({page:"current"}).eq(0).each(function(a){var b=g[a];b._detailsShow&&b._details.insertAfter(b.nTr)})}),b.on(e,function(b,c){if(a===c)for(var d,e=q(c),f=0,h=g.length;h>f;f++)d=g[f],d._details&&d._details.children("td[colspan]").attr("colspan",e)}),b.on(f,function(c,d){if(a===d)for(var e=0,f=g.length;f>e;e++)g[e]._details&&Jc(b,e)}))},Mc="",Nc=Mc+"row().child",Oc=Nc+"()";Zb(Oc,function(a,b){var d=this.context;return a===c?d.length&&this.length?d[0].aoData[this[0]]._details:c:(a===!0?this.child.show():a===!1?Jc(this):d.length&&this.length&&Ic(d[0],d[0].aoData[this[0]],a,b),this)}),Zb([Nc+".show()",Oc+".show()"],function(){return Kc(this,!0),this}),Zb([Nc+".hide()",Oc+".hide()"],function(){return Kc(this,!1),this}),Zb([Nc+".remove()",Oc+".remove()"],function(){return Jc(this),this}),Zb(Nc+".isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var Pc=/^(.+):(name|visIdx|visible)$/,Qc=function(a,b,c,d,e){for(var f=[],g=0,h=e.length;h>g;g++)f.push(y(a,e[g],b));return f},Rc=function(a,b,c){var e=a.aoColumns,f=mc(e,"sName"),g=mc(e,"nTh");return Dc(b,function(b){var h=hc(b);if(""===b)return oc(e.length);if(null!==h)return[h>=0?h:e.length+h];if("function"==typeof b){var i=Gc(a,c);return d.map(e,function(c,d){return b(d,Qc(a,d,0,0,i),g[d])?d:null})}var j="string"==typeof b?b.match(Pc):"";if(!j)return d(g).filter(b).map(function(){return d.inArray(this,g)}).toArray();switch(j[2]){case"visIdx":case"visible":var k=parseInt(j[1],10);if(0>k){var l=d.map(e,function(a,b){return a.bVisible?b:null});return[l[l.length+k]]}return[o(a,k)];case"name":return d.map(f,function(a,b){return a===j[1]?b:null})}})},Sc=function(a,b,e,f){var g,h,i,j,k=a.aoColumns,l=k[b],m=a.aoData;if(e===c)return l.bVisible;if(l.bVisible!==e){if(e){var o=d.inArray(!0,mc(k,"bVisible"),b+1);for(h=0,i=m.length;i>h;h++)j=m[h].nTr,g=m[h].anCells,j&&j.insertBefore(g[b],g[o]||null)}else d(mc(a.aoData,"anCells",b)).detach();l.bVisible=e,L(a,a.aoHeader),L(a,a.aoFooter),(f===c||f)&&(n(a),(a.oScroll.sX||a.oScroll.sY)&&qb(a)),Pb(a,null,"column-visibility",[a,b,e]),Hb(a)}};Zb("columns()",function(a,b){a===c?a="":d.isPlainObject(a)&&(b=a,a=""),b=Ec(b);var e=this.iterator("table",function(c){return Rc(c,a,b)},1);return e.selector.cols=a,e.selector.opts=b,e}),$b("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)}),$b("columns().footer()","column().footer()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)}),$b("columns().data()","column().data()",function(){return this.iterator("column-rows",Qc,1)}),$b("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},1)}),$b("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,d,e,f){return nc(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)}),$b("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return nc(a.aoData,e,"anCells",b)},1)}),$b("columns().visible()","column().visible()",function(a,b){return this.iterator("column",function(d,e){return a===c?d.aoColumns[e].bVisible:void Sc(d,e,a,b)})}),$b("columns().indexes()","column().index()",function(a){return this.iterator("column",function(b,c){return"visible"===a?p(b,c):c},1)}),Zb("columns.adjust()",function(){return this.iterator("table",function(a){n(a)},1)}),Zb("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===a||"toData"===a)return o(c,b);if("fromData"===a||"toVisible"===a)return p(c,b)}}),Zb("column()",function(a,b){return Fc(this.columns(a,b))});var Tc=function(a,b,e){var f,g,h,i,j,k,l,m=a.aoData,n=Gc(a,e),o=pc(nc(m,n,"anCells")),p=d([].concat.apply([],o)),q=a.aoColumns.length;return Dc(b,function(b){var e="function"==typeof b;if(null===b||b===c||e){for(g=[],h=0,i=n.length;i>h;h++)for(f=n[h],j=0;q>j;j++)k={row:f,column:j},e?(l=a.aoData[f],b(k,y(a,f,j),l.anCells[j])&&g.push(k)):g.push(k);return g}return d.isPlainObject(b)?[b]:p.filter(b).map(function(a,b){return f=b.parentNode._DT_RowIndex,{row:f,column:d.inArray(b,m[f].anCells)}}).toArray()})};Zb("cells()",function(a,b,e){if(d.isPlainObject(a)&&(typeof a.row!==c?(e=b,b=null):(e=a,a=null)),d.isPlainObject(b)&&(e=b,b=null),null===b||b===c)return this.iterator("table",function(b){return Tc(b,a,Ec(e))});var f,g,h,i,j,k=this.columns(b,e),l=this.rows(a,e),m=this.iterator("table",function(a,b){for(f=[],g=0,h=l[b].length;h>g;g++)for(i=0,j=k[b].length;j>i;i++)f.push({row:l[b][g],column:k[b][i]});return f},1);return d.extend(m.selector,{cols:b,rows:a,opts:e}),m}),$b("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,d){var e=a.aoData[b].anCells;return e?e[d]:c},1)}),Zb("cells().data()",function(){return this.iterator("cell",function(a,b,c){return y(a,b,c)},1)}),$b("cells().cache()","cell().cache()",function(a){return a="search"===a?"_aFilterData":"_aSortData",this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)}),$b("cells().render()","cell().render()",function(a){return this.iterator("cell",function(b,c,d){return y(b,c,d,a)},1)}),$b("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:p(a,c)}},1)}),$b("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,d){G(b,c,a,d)})}),Zb("cell()",function(a,b,c){return Fc(this.cells(a,b,c))}),Zb("cell().data()",function(a){var b=this.context,d=this[0];return a===c?b.length&&d.length?y(b[0],d[0].row,d[0].column):c:(z(b[0],d[0].row,d[0].column,a),G(b[0],d[0].row,"data",d[0].column),this)}),Zb("order()",function(a,b){var e=this.context;return a===c?0!==e.length?e[0].aaSorting:c:("number"==typeof a?a=[[a,b]]:d.isArray(a[0])||(a=Array.prototype.slice.call(arguments)),this.iterator("table",function(b){b.aaSorting=a.slice()}))}),Zb("order.listener()",function(a,b,c){return this.iterator("table",function(d){Eb(d,a,b,c)})}),Zb(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,e){var f=[];d.each(b[e],function(b,c){f.push([c,a])}),c.aaSorting=f})}),Zb("search()",function(a,b,e,f){var g=this.context;return a===c?0!==g.length?g[0].oPreviousSearch.sSearch:c:this.iterator("table",function(c){c.oFeatures.bFilter&&X(c,d.extend({},c.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===e?!0:e,bCaseInsensitive:null===f?!0:f}),1)})}),$b("columns().search()","column().search()",function(a,b,e,f){return this.iterator("column",function(g,h){var i=g.aoPreSearchCols;return a===c?i[h].sSearch:void(g.oFeatures.bFilter&&(d.extend(i[h],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===e?!0:e,bCaseInsensitive:null===f?!0:f}),X(g,g.oPreviousSearch,1)))})}),Zb("state()",function(){return this.context.length?this.context[0].oSavedState:null}),Zb("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})}),Zb("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null}),Zb("state.save()",function(){return this.iterator("table",function(a){Hb(a)})}),Wb.versionCheck=Wb.fnVersionCheck=function(a){for(var b,c,d=Wb.version.split("."),e=a.split("."),f=0,g=e.length;g>f;f++)if(b=parseInt(d[f],10)||0,c=parseInt(e[f],10)||0,b!==c)return b>c;return!0},Wb.isDataTable=Wb.fnIsDataTable=function(a){var b=d(a).get(0),c=!1;return d.each(Wb.settings,function(a,d){(d.nTable===b||d.nScrollHead===b||d.nScrollFoot===b)&&(c=!0)
}),c},Wb.tables=Wb.fnTables=function(a){return d.map(Wb.settings,function(b){return!a||a&&d(b.nTable).is(":visible")?b.nTable:void 0})},Wb.util={throttle:tb,escapeRegex:ab},Wb.camelToHungarian=f,Zb("$()",function(a,b){var c=this.rows(b).nodes(),e=d(c);return d([].concat(e.filter(a).toArray(),e.find(a).toArray()))}),d.each(["on","one","off"],function(a,b){Zb(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0].match(/\.dt\b/)||(a[0]+=".dt");var c=d(this.tables().nodes());return c[b].apply(c,a),this})}),Zb("clear()",function(){return this.iterator("table",function(a){E(a)})}),Zb("settings()",function(){return new Yb(this.context,this.context)}),Zb("data()",function(){return this.iterator("table",function(a){return mc(a.aoData,"_aData")}).flatten()}),Zb("destroy()",function(b){return b=b||!1,this.iterator("table",function(c){var e,f=c.nTableWrapper.parentNode,g=c.oClasses,h=c.nTable,i=c.nTBody,j=c.nTHead,k=c.nTFoot,l=d(h),m=d(i),n=d(c.nTableWrapper),o=d.map(c.aoData,function(a){return a.nTr});c.bDestroying=!0,Pb(c,"aoDestroyCallback","destroy",[c]),b||new Yb(c).columns().visible(!0),n.unbind(".DT").find(":not(tbody *)").unbind(".DT"),d(a).unbind(".DT-"+c.sInstance),h!=j.parentNode&&(l.children("thead").detach(),l.append(j)),k&&h!=k.parentNode&&(l.children("tfoot").detach(),l.append(k)),l.detach(),n.detach(),c.aaSorting=[],c.aaSortingFixed=[],Fb(c),d(o).removeClass(c.asStripeClasses.join(" ")),d("th, td",j).removeClass(g.sSortable+" "+g.sSortableAsc+" "+g.sSortableDesc+" "+g.sSortableNone),c.bJUI&&(d("th span."+g.sSortIcon+", td span."+g.sSortIcon,j).detach(),d("th, td",j).each(function(){var a=d("div."+g.sSortJUIWrapper,this);d(this).append(a.contents()),a.detach()})),!b&&f&&f.insertBefore(h,c.nTableReinsertBefore),m.children().detach(),m.append(o),l.css("width",c.sDestroyWidth).removeClass(g.sTable),e=c.asDestroyStripes.length,e&&m.children().each(function(a){d(this).addClass(c.asDestroyStripes[a%e])});var p=d.inArray(c,Wb.settings);-1!==p&&Wb.settings.splice(p,1)})}),Wb.version="1.10.4",Wb.settings=[],Wb.models={},Wb.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0},Wb.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null},Wb.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null},Wb.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bJQueryUI:!1,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:d.extend({},Wb.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null},e(Wb.defaults),Wb.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null},e(Wb.defaults.column),Wb.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:c,oAjaxData:c,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==Sb(this)?1*this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==Sb(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?f===!1||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{}},Wb.ext=Xb={classes:{},errMode:"alert",feature:[],search:[],internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:Wb.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:Wb.version},d.extend(Xb,{afnFiltering:Xb.search,aTypes:Xb.type.detect,ofnSearch:Xb.type.search,oSort:Xb.type.order,afnSortData:Xb.order,aoFeatures:Xb.feature,oApi:Xb.internal,oStdClasses:Xb.classes,oPagination:Xb.pager}),d.extend(Wb.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""}),function(){var a="";a="";var b=a+"ui-state-default",c=a+"css_right ui-icon ui-icon-",e=a+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";d.extend(Wb.ext.oJUIClasses,Wb.ext.classes,{sPageButton:"fg-button ui-button "+b,sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:b+" sorting_asc",sSortDesc:b+" sorting_desc",sSortable:b+" sorting",sSortableAsc:b+" sorting_asc_disabled",sSortableDesc:b+" sorting_desc_disabled",sSortableNone:b+" sorting_disabled",sSortJUIAsc:c+"triangle-1-n",sSortJUIDesc:c+"triangle-1-s",sSortJUI:c+"carat-2-n-s",sSortJUIAscAllowed:c+"carat-1-n",sSortJUIDescAllowed:c+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+b,sScrollFoot:"dataTables_scrollFoot "+b,sHeaderTH:b,sFooterTH:b,sJUIHeader:e+" ui-corner-tl ui-corner-tr",sJUIFooter:e+" ui-corner-bl ui-corner-br"})}();var Uc=Wb.ext.pager;d.extend(Uc,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},simple_numbers:function(a,b){return["previous",Tb(a,b),"next"]},full_numbers:function(a,b){return["first","previous",Tb(a,b),"next","last"]},_numbers:Tb,numbers_length:7}),d.extend(!0,Wb.ext.renderer,{pageButton:{_:function(a,c,e,f,g,h){var i,j,k=a.oClasses,l=a.oLanguage.oPaginate,m=0,n=function(b,c){var f,o,p,q,r=function(b){mb(a,b.data.action,!0)};for(f=0,o=c.length;o>f;f++)if(q=c[f],d.isArray(q)){var s=d("<"+(q.DT_el||"div")+"/>").appendTo(b);n(s,q)}else{switch(i="",j="",q){case"ellipsis":b.append("<span>&hellip;</span>");break;case"first":i=l.sFirst,j=q+(g>0?"":" "+k.sPageButtonDisabled);break;case"previous":i=l.sPrevious,j=q+(g>0?"":" "+k.sPageButtonDisabled);break;case"next":i=l.sNext,j=q+(h-1>g?"":" "+k.sPageButtonDisabled);break;case"last":i=l.sLast,j=q+(h-1>g?"":" "+k.sPageButtonDisabled);break;default:i=q+1,j=g===q?k.sPageButtonActive:""}i&&(p=d("<a>",{"class":k.sPageButton+" "+j,"aria-controls":a.sTableId,"data-dt-idx":m,tabindex:a.iTabIndex,id:0===e&&"string"==typeof q?a.sTableId+"_"+q:null}).html(i).appendTo(b),Nb(p,{action:q},r),m++)}};try{var o=d(b.activeElement).data("dt-idx");n(d(c).empty(),f),null!==o&&d(c).find("[data-dt-idx="+o+"]").focus()}catch(p){}}}}),d.extend(Wb.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return jc(a,c)?"num"+c:null},function(a){if(!(!a||a instanceof Date||cc.test(a)&&dc.test(a)))return null;var b=Date.parse(a);return null!==b&&!isNaN(b)||gc(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return jc(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return lc(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return lc(a,c,!0)?"html-num-fmt"+c:null},function(a){return gc(a)||"string"==typeof a&&-1!==a.indexOf("<")?"html":null}]),d.extend(Wb.ext.type.search,{html:function(a){return gc(a)?a:"string"==typeof a?a.replace(ac," ").replace(bc,""):""},string:function(a){return gc(a)?a:"string"==typeof a?a.replace(ac," "):a}});var Vc=function(a,b,c,d){return 0===a||a&&"-"!==a?(b&&(a=ic(a,b)),a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,""))),1*a):-1/0};return d.extend(Xb.type.order,{"date-pre":function(a){return Date.parse(a)||0},"html-pre":function(a){return gc(a)?"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return gc(a)?"":"string"==typeof a?a.toLowerCase():a.toString?a.toString():""},"string-asc":function(a,b){return b>a?-1:a>b?1:0},"string-desc":function(a,b){return b>a?1:a>b?-1:0}}),Ub(""),d.extend(!0,Wb.ext.renderer,{header:{_:function(a,b,c,e){d(a.nTable).on("order.dt.DT",function(d,f,g,h){if(a===f){var i=c.idx;b.removeClass(c.sSortingClass+" "+e.sSortAsc+" "+e.sSortDesc).addClass("asc"==h[i]?e.sSortAsc:"desc"==h[i]?e.sSortDesc:c.sSortingClass)}})},jqueryui:function(a,b,c,e){d("<div/>").addClass(e.sSortJUIWrapper).append(b.contents()).append(d("<span/>").addClass(e.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b),d(a.nTable).on("order.dt.DT",function(d,f,g,h){if(a===f){var i=c.idx;b.removeClass(e.sSortAsc+" "+e.sSortDesc).addClass("asc"==h[i]?e.sSortAsc:"desc"==h[i]?e.sSortDesc:c.sSortingClass),b.find("span."+e.sSortIcon).removeClass(e.sSortJUIAsc+" "+e.sSortJUIDesc+" "+e.sSortJUI+" "+e.sSortJUIAscAllowed+" "+e.sSortJUIDescAllowed).addClass("asc"==h[i]?e.sSortJUIAsc:"desc"==h[i]?e.sSortJUIDesc:c.sSortingClassJUI)}})}}}),Wb.render={number:function(a,b,c,d){return{display:function(e){var f=0>e?"-":"";e=Math.abs(parseFloat(e));var g=parseInt(e,10),h=c?b+(e-g).toFixed(c).substring(2):"";return f+(d||"")+g.toString().replace(/\B(?=(\d{3})+(?!\d))/g,a)+h}}}},d.extend(Wb.ext.internal,{_fnExternApiFunc:Vb,_fnBuildAjax:R,_fnAjaxUpdate:S,_fnAjaxParameters:T,_fnAjaxUpdateDraw:U,_fnAjaxDataSrc:V,_fnAddColumn:l,_fnColumnOptions:m,_fnAdjustColumnSizing:n,_fnVisibleToColumnIndex:o,_fnColumnIndexToVisible:p,_fnVisbleColumns:q,_fnGetColumns:r,_fnColumnTypes:s,_fnApplyColumnDefs:t,_fnHungarianMap:e,_fnCamelToHungarian:f,_fnLanguageCompat:g,_fnBrowserDetect:j,_fnAddData:u,_fnAddTr:v,_fnNodeToDataIndex:w,_fnNodeToColumnIndex:x,_fnGetCellData:y,_fnSetCellData:z,_fnSplitObjNotation:A,_fnGetObjectDataFn:B,_fnSetObjectDataFn:C,_fnGetDataMaster:D,_fnClearTable:E,_fnDeleteIndex:F,_fnInvalidate:G,_fnGetRowElements:H,_fnCreateTr:I,_fnBuildHead:K,_fnDrawHead:L,_fnDraw:M,_fnReDraw:N,_fnAddOptionsHtml:O,_fnDetectHeader:P,_fnGetUniqueThs:Q,_fnFeatureHtmlFilter:W,_fnFilterComplete:X,_fnFilterCustom:Y,_fnFilterColumn:Z,_fnFilter:$,_fnFilterCreateSearch:_,_fnEscapeRegex:ab,_fnFilterData:bb,_fnFeatureHtmlInfo:eb,_fnUpdateInfo:fb,_fnInfoMacros:gb,_fnInitialise:hb,_fnInitComplete:ib,_fnLengthChange:jb,_fnFeatureHtmlLength:kb,_fnFeatureHtmlPaginate:lb,_fnPageChange:mb,_fnFeatureHtmlProcessing:nb,_fnProcessingDisplay:ob,_fnFeatureHtmlTable:pb,_fnScrollDraw:qb,_fnApplyToChildren:rb,_fnCalculateColumnWidths:sb,_fnThrottle:tb,_fnConvertToWidth:ub,_fnScrollingWidthAdjust:vb,_fnGetWidestNode:wb,_fnGetMaxLenString:xb,_fnStringToCss:yb,_fnScrollBarWidth:zb,_fnSortFlatten:Ab,_fnSort:Bb,_fnSortAria:Cb,_fnSortListener:Db,_fnSortAttachListener:Eb,_fnSortingClasses:Fb,_fnSortData:Gb,_fnSaveState:Hb,_fnLoadState:Ib,_fnSettingsFromNode:Jb,_fnLog:Kb,_fnMap:Lb,_fnBindAction:Nb,_fnCallbackReg:Ob,_fnCallbackFire:Pb,_fnLengthOverflow:Qb,_fnRenderer:Rb,_fnDataSource:Sb,_fnRowAttributes:J,_fnCalculateEnd:function(){}}),d.fn.dataTable=Wb,d.fn.dataTableSettings=Wb.settings,d.fn.dataTableExt=Wb.ext,d.fn.DataTable=function(a){return d(this).dataTable(a).api()},d.each(Wb,function(a,b){d.fn.DataTable[a]=b}),d.fn.dataTable})}(window,document),/*! DataTables Bootstrap 3 integration
 * ©2011-2014 SpryMedia Ltd - datatables.net/license
 */
function(){var a=function(a,b){"use strict";a.extend(!0,b.defaults,{dom:"<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-6'i><'col-sm-6'p>>",renderer:"bootstrap"}),a.extend(b.ext.classes,{sWrapper:"dataTables_wrapper form-inline dt-bootstrap",sFilterInput:"form-control input-sm",sLengthSelect:"form-control input-sm"}),b.ext.renderer.pageButton.bootstrap=function(c,d,e,f,g,h){var i,j,k=new b.Api(c),l=c.oClasses,m=c.oLanguage.oPaginate,n=function(b,d){var f,o,p,q,r=function(b){b.preventDefault(),a(b.currentTarget).hasClass("disabled")||k.page(b.data.action).draw(!1)};for(f=0,o=d.length;o>f;f++)if(q=d[f],a.isArray(q))n(b,q);else{switch(i="",j="",q){case"ellipsis":i="&hellip;",j="disabled";break;case"first":i=m.sFirst,j=q+(g>0?"":" disabled");break;case"previous":i=m.sPrevious,j=q+(g>0?"":" disabled");break;case"next":i=m.sNext,j=q+(h-1>g?"":" disabled");break;case"last":i=m.sLast,j=q+(h-1>g?"":" disabled");break;default:i=q+1,j=g===q?"active":""}i&&(p=a("<li>",{"class":l.sPageButton+" "+j,"aria-controls":c.sTableId,tabindex:c.iTabIndex,id:0===e&&"string"==typeof q?c.sTableId+"_"+q:null}).append(a("<a>",{href:"#"}).html(i)).appendTo(b),c.oApi._fnBindAction(p,{action:q},r))}};n(a(d).empty().html('<ul class="pagination"/>').children("ul"),f)},b.TableTools&&(a.extend(!0,b.TableTools.classes,{container:"DTTT btn-group",buttons:{normal:"btn btn-default",disabled:"disabled"},collection:{container:"DTTT_dropdown dropdown-menu",buttons:{normal:"",disabled:"disabled"}},print:{info:"DTTT_print_info"},select:{row:"active"}}),a.extend(!0,b.TableTools.DEFAULTS.oTags,{collection:{container:"ul",button:"li",liner:"a"}}))};"function"==typeof define&&define.amd?define(["jquery","datatables"],a):"object"==typeof exports?a(require("jquery"),require("datatables")):jQuery&&a(jQuery,jQuery.fn.dataTable)}(window,document),function(a){"object"==typeof exports&&exports&&"object"==typeof module&&module&&module.exports===exports?a(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(a){var b=a[0];return b.offsetWidth>0&&b.offsetHeight>0}function c(b){if(b.minTime&&(b.minTime=u(b.minTime)),b.maxTime&&(b.maxTime=u(b.maxTime)),b.durationTime&&"function"!=typeof b.durationTime&&(b.durationTime=u(b.durationTime)),"now"==b.scrollDefault?b.scrollDefault=u(new Date):b.scrollDefault?b.scrollDefault=u(b.scrollDefault):b.minTime&&(b.scrollDefault=b.minTime),b.scrollDefault&&(b.scrollDefault=f(b.scrollDefault,b)),"string"===a.type(b.timeFormat)&&b.timeFormat.match(/[gh]/)&&(b._twelveHourTime=!0),b.disableTimeRanges.length>0){for(var c in b.disableTimeRanges)b.disableTimeRanges[c]=[u(b.disableTimeRanges[c][0]),u(b.disableTimeRanges[c][1])];b.disableTimeRanges=b.disableTimeRanges.sort(function(a,b){return a[0]-b[0]});for(var c=b.disableTimeRanges.length-1;c>0;c--)b.disableTimeRanges[c][0]<=b.disableTimeRanges[c-1][1]&&(b.disableTimeRanges[c-1]=[Math.min(b.disableTimeRanges[c][0],b.disableTimeRanges[c-1][0]),Math.max(b.disableTimeRanges[c][1],b.disableTimeRanges[c-1][1])],b.disableTimeRanges.splice(c,1))}return b}function d(b){var c=b.data("timepicker-settings"),d=b.data("timepicker-list");if(d&&d.length&&(d.remove(),b.data("timepicker-list",!1)),c.useSelect){d=a("<select />",{"class":"ui-timepicker-select"});var f=d}else{d=a("<ul />",{"class":"ui-timepicker-list"});var f=a("<div />",{"class":"ui-timepicker-wrapper",tabindex:-1});f.css({display:"none",position:"absolute"}).append(d)}if(c.noneOption)if(c.noneOption===!0&&(c.noneOption=c.useSelect?"Time...":"None"),a.isArray(c.noneOption)){for(var h in c.noneOption)if(parseInt(h,10)==h){var i=e(c.noneOption[h],c.useSelect);d.append(i)}}else{var i=e(c.noneOption,c.useSelect);d.append(i)}c.className&&f.addClass(c.className),null===c.minTime&&null===c.durationTime||!c.showDuration||(f.addClass("ui-timepicker-with-duration"),f.addClass("ui-timepicker-step-"+c.step));var k=c.minTime;"function"==typeof c.durationTime?k=u(c.durationTime()):null!==c.durationTime&&(k=c.durationTime);var m=null!==c.minTime?c.minTime:0,n=null!==c.maxTime?c.maxTime:m+w-1;m>=n&&(n+=w),n===w-1&&"string"===a.type(c.timeFormat)&&-1!==c.timeFormat.indexOf("H")&&(n=w);for(var p=c.disableTimeRanges,q=0,v=p.length,h=m;n>=h;h+=60*c.step){var x=h,z=t(x,c.timeFormat);if(c.useSelect){var A=a("<option />",{value:z});A.text(z)}else{var A=a("<li />");A.data("time",86400>=x?x:x%86400),A.text(z)}if((null!==c.minTime||null!==c.durationTime)&&c.showDuration){var B=s(h-k,c.step);if(c.useSelect)A.text(A.text()+" ("+B+")");else{var C=a("<span />",{"class":"ui-timepicker-duration"});C.text(" ("+B+")"),A.append(C)}}v>q&&(x>=p[q][1]&&(q+=1),p[q]&&x>=p[q][0]&&x<p[q][1]&&(c.useSelect?A.prop("disabled",!0):A.addClass("ui-timepicker-disabled"))),d.append(A)}if(f.data("timepicker-input",b),b.data("timepicker-list",f),c.useSelect)b.val()&&d.val(g(b.val(),c)),d.on("focus",function(){a(this).data("timepicker-input").trigger("showTimepicker")}),d.on("blur",function(){a(this).data("timepicker-input").trigger("hideTimepicker")}),d.on("change",function(){o(b,a(this).val(),"select")}),o(b,d.val()),b.hide().after(d);else{var D=c.appendTo;"string"==typeof D?D=a(D):"function"==typeof D&&(D=D(b)),D.append(f),l(b,d),d.on("mousedown","li",function(){b.off("focus.timepicker"),b.on("focus.timepicker-ie-hack",function(){b.off("focus.timepicker-ie-hack"),b.on("focus.timepicker",y.show)}),j(b)||b[0].focus(),d.find("li").removeClass("ui-timepicker-selected"),a(this).addClass("ui-timepicker-selected"),r(b)&&(b.trigger("hideTimepicker"),f.hide())})}}function e(b,c){var d,e,f;return"object"==typeof b?(d=b.label,e=b.className,f=b.value):"string"==typeof b?d=b:a.error("Invalid noneOption value"),c?a("<option />",{value:f,"class":e,text:d}):a("<li />",{"class":e,text:d}).data("time",f)}function f(b,c){if(a.isNumeric(b)||(b=u(b)),null===b)return null;var d=b%(60*c.step);return d>=30*c.step?b+=60*c.step-d:b-=d,b}function g(a,b){return a=f(a,b),null!==a?t(a,b.timeFormat):void 0}function h(){return new Date(1970,1,1,0,0,0)}function i(b){var c=a(b.target),d=c.closest(".ui-timepicker-input");0===d.length&&0===c.closest(".ui-timepicker-wrapper").length&&(y.hide(),a(document).unbind(".ui-timepicker"))}function j(a){var b=a.data("timepicker-settings");return(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&b.disableTouchKeyboard}function k(b,c,d){if(!d&&0!==d)return!1;var e=b.data("timepicker-settings"),f=!1,g=30*e.step;return c.find("li").each(function(b,c){var e=a(c);if("number"==typeof e.data("time")){var h=e.data("time")-d;return Math.abs(h)<g||h==g?(f=e,!1):void 0}}),f}function l(a,b){b.find("li").removeClass("ui-timepicker-selected");var c=u(n(a),a.data("timepicker-settings"));if(null!==c){var d=k(a,b,c);if(d){var e=d.offset().top-b.offset().top;(e+d.outerHeight()>b.outerHeight()||0>e)&&b.scrollTop(b.scrollTop()+d.position().top-d.outerHeight()),d.addClass("ui-timepicker-selected")}}}function m(b,c){if(""!==this.value&&"timepicker"!=c){{var d=a(this);d.data("timepicker-list")}if(!d.is(":focus")||b&&"change"==b.type){var e=u(this.value);if(null===e)return void d.trigger("timeFormatError");var f=d.data("timepicker-settings"),g=!1;if(null!==f.minTime&&e<f.minTime?g=!0:null!==f.maxTime&&e>f.maxTime&&(g=!0),a.each(f.disableTimeRanges,function(){return e>=this[0]&&e<this[1]?(g=!0,!1):void 0}),f.forceRoundTime){var h=e%(60*f.step);h>=30*f.step?e+=60*f.step-h:e-=h}var i=t(e,f.timeFormat);g?o(d,i,"error")&&d.trigger("timeRangeError"):o(d,i)}}}function n(a){return a.is("input")?a.val():a.data("ui-timepicker-value")}function o(a,b,c){if(a.is("input")){a.val(b);var d=a.data("timepicker-settings");d.useSelect&&"select"!=c&&a.data("timepicker-list").val(g(b,d))}return a.data("ui-timepicker-value")!=b?(a.data("ui-timepicker-value",b),"select"==c?a.trigger("selectTime").trigger("changeTime").trigger("change","timepicker"):"error"!=c&&a.trigger("changeTime"),!0):(a.trigger("selectTime"),!1)}function p(c){var d=a(this),e=d.data("timepicker-list");if(!e||!b(e)){if(40!=c.keyCode)return!0;y.show.call(d.get(0)),e=d.data("timepicker-list"),j(d)||d.focus()}switch(c.keyCode){case 13:return r(d)&&y.hide.apply(this),c.preventDefault(),!1;case 38:var f=e.find(".ui-timepicker-selected");return f.length?f.is(":first-child")||(f.removeClass("ui-timepicker-selected"),f.prev().addClass("ui-timepicker-selected"),f.prev().position().top<f.outerHeight()&&e.scrollTop(e.scrollTop()-f.outerHeight())):(e.find("li").each(function(b,c){return a(c).position().top>0?(f=a(c),!1):void 0}),f.addClass("ui-timepicker-selected")),!1;case 40:return f=e.find(".ui-timepicker-selected"),0===f.length?(e.find("li").each(function(b,c){return a(c).position().top>0?(f=a(c),!1):void 0}),f.addClass("ui-timepicker-selected")):f.is(":last-child")||(f.removeClass("ui-timepicker-selected"),f.next().addClass("ui-timepicker-selected"),f.next().position().top+2*f.outerHeight()>e.outerHeight()&&e.scrollTop(e.scrollTop()+f.outerHeight())),!1;case 27:e.find("li").removeClass("ui-timepicker-selected"),y.hide();break;case 9:y.hide();break;default:return!0}}function q(c){var d=a(this),e=d.data("timepicker-list");if(!e||!b(e))return!0;if(!d.data("timepicker-settings").typeaheadHighlight)return e.find("li").removeClass("ui-timepicker-selected"),!0;switch(c.keyCode){case 96:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 65:case 77:case 80:case 186:case 8:case 46:l(d,e);break;default:return}}function r(a){var b=a.data("timepicker-settings"),c=a.data("timepicker-list"),d=null,e=c.find(".ui-timepicker-selected");if(e.hasClass("ui-timepicker-disabled"))return!1;if(e.length&&(d=e.data("time")),null!==d)if("string"==typeof d)a.val(d);else{var f=t(d,b.timeFormat);o(a,f,"select")}return!0}function s(a,b){a=Math.abs(a);var c,d,e=Math.round(a/60),f=[];return 60>e?f=[e,x.mins]:(c=Math.floor(e/60),d=e%60,30==b&&30==d&&(c+=x.decimal+5),f.push(c),f.push(1==c?x.hr:x.hrs),30!=b&&d&&(f.push(d),f.push(x.mins))),f.join(" ")}function t(b,c){if(null!==b){var d=new Date(v.valueOf()+1e3*b);if(!isNaN(d.getTime())){if("function"===a.type(c))return c(d);for(var e,f,g="",h=0;h<c.length;h++)switch(f=c.charAt(h)){case"a":g+=d.getHours()>11?x.pm:x.am;break;case"A":g+=d.getHours()>11?x.pm.toUpperCase():x.am.toUpperCase();break;case"g":e=d.getHours()%12,g+=0===e?"12":e;break;case"G":g+=d.getHours();break;case"h":e=d.getHours()%12,0!==e&&10>e&&(e="0"+e),g+=0===e?"12":e;break;case"H":e=d.getHours(),b===w&&(e=24),g+=e>9?e:"0"+e;break;case"i":var i=d.getMinutes();g+=i>9?i:"0"+i;break;case"s":b=d.getSeconds(),g+=b>9?b:"0"+b;break;case"\\":h++,g+=c.charAt(h);break;default:g+=f}return g}}}function u(a,b){if(""===a)return null;if(!a||a+0==a)return a;if("object"==typeof a)return 3600*a.getHours()+60*a.getMinutes()+a.getSeconds();a=a.toLowerCase(),("a"==a.slice(-1)||"p"==a.slice(-1))&&(a+="m");var c=new RegExp("^([0-2]?[0-9])\\W?([0-5][0-9])?\\W?([0-5][0-9])?\\s*("+x.am+"|"+x.pm+")?$"),d=a.match(c);if(!d)return null;var e=parseInt(1*d[1],10),f=d[4],g=e;12>=e&&f&&(g=12==e?d[4]==x.pm?12:0:e+(d[4]==x.pm?12:0));var h=1*d[2]||0,i=1*d[3]||0,j=3600*g+60*h+i;if(!f&&b&&b._twelveHourTime&&b.scrollDefault){var k=j-b.scrollDefault;0>k&&k>=w/-2&&(j=(j+w/2)%w)}return j}var v=h(),w=86400,x={am:"am",pm:"pm",AM:"AM",PM:"PM",decimal:".",mins:"mins",hr:"hr",hrs:"hrs"},y={init:function(b){return this.each(function(){var e=a(this),f=[];for(var g in a.fn.timepicker.defaults)e.data(g)&&(f[g]=e.data(g));var h=a.extend({},a.fn.timepicker.defaults,f,b);h.lang&&(x=a.extend(x,h.lang)),h=c(h),e.data("timepicker-settings",h),e.addClass("ui-timepicker-input"),h.useSelect?d(e):(e.prop("autocomplete","off"),e.on("click.timepicker focus.timepicker",y.show),e.on("change.timepicker",m),e.on("keydown.timepicker",p),e.on("keyup.timepicker",q),m.call(e.get(0)))})},show:function(c){var e=a(this),f=e.data("timepicker-settings");if(c){if(!f.showOnFocus)return!0;c.preventDefault()}if(f.useSelect)return void e.data("timepicker-list").focus();j(e)&&e.blur();var g=e.data("timepicker-list");if(!e.prop("readonly")&&(g&&0!==g.length&&"function"!=typeof f.durationTime||(d(e),g=e.data("timepicker-list")),!b(g))){y.hide(),g.show();var h={};h.left="rtl"==f.orientation?e.offset().left+e.outerWidth()-g.outerWidth()+parseInt(g.css("marginLeft").replace("px",""),10):e.offset().left+parseInt(g.css("marginLeft").replace("px",""),10),e.offset().top+e.outerHeight(!0)+g.outerHeight()>a(window).height()+a(window).scrollTop()?(h.top=e.offset().top-g.outerHeight()+parseInt(g.css("marginTop").replace("px",""),10),g.addClass("ui-timepicker-positioned-top")):(h.top=e.offset().top+e.outerHeight()+parseInt(g.css("marginTop").replace("px",""),10),g.removeClass("ui-timepicker-positioned-top")),g.offset(h);var l=g.find(".ui-timepicker-selected");if(l.length||(n(e)?l=k(e,g,u(n(e))):f.scrollDefault&&(l=k(e,g,f.scrollDefault))),l&&l.length){var m=g.scrollTop()+l.position().top-l.outerHeight();g.scrollTop(m)}else g.scrollTop(0);return a(document).on("touchstart.ui-timepicker mousedown.ui-timepicker",i),f.closeOnWindowScroll&&a(document).on("scroll.ui-timepicker",i),e.trigger("showTimepicker"),this}},hide:function(){var c=a(this),d=c.data("timepicker-settings");return d&&d.useSelect&&c.blur(),a(".ui-timepicker-wrapper").each(function(){var c=a(this);if(b(c)){var d=c.data("timepicker-input"),e=d.data("timepicker-settings");e&&e.selectOnBlur&&r(d),c.hide(),d.trigger("hideTimepicker")}}),this},option:function(b,e){return this.each(function(){var f=a(this),g=f.data("timepicker-settings"),h=f.data("timepicker-list");if("object"==typeof b)g=a.extend(g,b);else if("string"==typeof b&&"undefined"!=typeof e)g[b]=e;else if("string"==typeof b)return g[b];g=c(g),f.data("timepicker-settings",g),h&&(h.remove(),f.data("timepicker-list",!1)),g.useSelect&&d(f)})},getSecondsFromMidnight:function(){return u(n(this))},getTime:function(a){var b=this,c=n(b);if(!c)return null;a||(a=new Date);var d=u(c),e=new Date(a);return e.setHours(d/3600),e.setMinutes(d%3600/60),e.setSeconds(d%60),e.setMilliseconds(0),e},setTime:function(a){var b=this,c=b.data("timepicker-settings");if(c.forceRoundTime)var d=g(a,c);else var d=t(u(a),c.timeFormat);return o(b,d),b.data("timepicker-list")&&l(b,b.data("timepicker-list")),this},remove:function(){var a=this;if(a.hasClass("ui-timepicker-input")){var b=a.data("timepicker-settings");return a.removeAttr("autocomplete","off"),a.removeClass("ui-timepicker-input"),a.removeData("timepicker-settings"),a.off(".timepicker"),a.data("timepicker-list")&&a.data("timepicker-list").remove(),b.useSelect&&a.show(),a.removeData("timepicker-list"),this}}};a.fn.timepicker=function(b){return this.length?y[b]?this.hasClass("ui-timepicker-input")?y[b].apply(this,Array.prototype.slice.call(arguments,1)):this:"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.timepicker"):y.init.apply(this,arguments):this},a.fn.timepicker.defaults={className:null,minTime:null,maxTime:null,durationTime:null,step:30,showDuration:!1,showOnFocus:!0,timeFormat:"g:ia",scrollDefault:null,selectOnBlur:!1,disableTouchKeyboard:!1,forceRoundTime:!1,appendTo:"body",orientation:"ltr",disableTimeRanges:[],closeOnWindowScroll:!1,typeaheadHighlight:!0,noneOption:!1}}),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.fileinput");e||c.data("bs.fileinput",e=new d(this,b)),"string"==typeof b&&e[b]()})}var c="Microsoft Internet Explorer"==window.navigator.appName,d=function(b,c){if(this.$element=a(b),this.$input=this.$element.find(":file"),0!==this.$input.length){this.name=this.$input.attr("name")||c.name,this.$hidden=this.$element.find('input[type=hidden][name="'+this.name+'"]'),0===this.$hidden.length&&(this.$hidden=a('<input type="hidden">').insertBefore(this.$input)),this.$preview=this.$element.find(".fileinput-preview");var d=this.$preview.css("height");"inline"!==this.$preview.css("display")&&"0px"!==d&&"none"!==d&&this.$preview.css("line-height",d),this.original={exists:this.$element.hasClass("fileinput-exists"),preview:this.$preview.html(),hiddenVal:this.$hidden.val()},this.listen()}};d.prototype.listen=function(){this.$input.on("change.bs.fileinput",a.proxy(this.change,this)),a(this.$input[0].form).on("reset.bs.fileinput",a.proxy(this.reset,this)),this.$element.find('[data-trigger="fileinput"]').on("click.bs.fileinput",a.proxy(this.trigger,this)),this.$element.find('[data-dismiss="fileinput"]').on("click.bs.fileinput",a.proxy(this.clear,this))},d.prototype.change=function(b){var c=void 0===b.target.files?b.target&&b.target.value?[{name:b.target.value.replace(/^.+\\/,"")}]:[]:b.target.files;if(b.stopPropagation(),0===c.length)return void this.clear();this.$hidden.val(""),this.$hidden.attr("name",""),this.$input.attr("name",this.name);var d=c[0];if(this.$preview.length>0&&("undefined"!=typeof d.type?d.type.match(/^image\/(gif|png|jpeg)$/):d.name.match(/\.(gif|png|jpe?g)$/i))&&"undefined"!=typeof FileReader){var e=new FileReader,f=this.$preview,g=this.$element;e.onload=function(b){var e=a("<img>");e[0].src=b.target.result,c[0].result=b.target.result,g.find(".fileinput-filename").text(d.name),"none"!=f.css("max-height")&&e.css("max-height",parseInt(f.css("max-height"),10)-parseInt(f.css("padding-top"),10)-parseInt(f.css("padding-bottom"),10)-parseInt(f.css("border-top"),10)-parseInt(f.css("border-bottom"),10)),f.html(e),g.addClass("fileinput-exists").removeClass("fileinput-new"),g.trigger("change.bs.fileinput",c)},e.readAsDataURL(d)}else this.$element.find(".fileinput-filename").text(d.name),this.$preview.text(d.name),this.$element.addClass("fileinput-exists").removeClass("fileinput-new"),this.$element.trigger("change.bs.fileinput")},d.prototype.clear=function(a){if(a&&a.preventDefault(),this.$hidden.val(""),this.$hidden.attr("name",this.name),this.$input.attr("name",""),c){var b=this.$input.clone(!0);this.$input.after(b),this.$input.remove(),this.$input=b}else this.$input.val("");this.$preview.html(""),this.$element.find(".fileinput-filename").text(""),this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),void 0!==a&&(this.$input.trigger("change"),this.$element.trigger("clear.bs.fileinput"))},d.prototype.reset=function(){this.clear(),this.$hidden.val(this.original.hiddenVal),this.$preview.html(this.original.preview),this.$element.find(".fileinput-filename").text(""),this.original.exists?this.$element.addClass("fileinput-exists").removeClass("fileinput-new"):this.$element.addClass("fileinput-new").removeClass("fileinput-exists"),this.$element.trigger("reset.bs.fileinput")},d.prototype.trigger=function(a){this.$input.trigger("click"),a.preventDefault()};var e=a.fn.fileinput;a.fn.fileinput=b,a.fn.fileinput.Constructor=d,a.fn.fileinput.noConflict=function(){return a.fn.fileinput=e,this},a(document).on("click.fileinput.data-api",'[data-provides="fileinput"]',function(c){var d=a(this);if(!d.data("bs.fileinput")){b.call(d,d.data());var e=a(c.target).closest('[data-dismiss="fileinput"],[data-trigger="fileinput"]');e.length>0&&(c.preventDefault(),e.trigger("click.bs.fileinput"))}})}(window.jQuery),+function(a,b){"use strict";function c(c){return this.each(function(){var e=b(this),f=e.data("radiocheck"),g="object"==typeof c&&c;if(f||"destroy"!=c){f||e.data("radiocheck",f=new d(this,g)),"string"==typeof c&&f[c]();var h=/mobile|tablet|phone|ip(ad|od)|android|silk|webos/i.test(a.navigator.userAgent);h===!0&&e.parent().hover(function(){e.addClass("nohover")},function(){e.removeClass("nohover")})}})}var d=function(a,b){this.init("radiocheck",a,b)};d.DEFAULTS={checkboxClass:"custom-checkbox",radioClass:"custom-radio",checkboxTemplate:'<span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>',radioTemplate:'<span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>'},d.prototype.init=function(a,c,e){this.$element=b(c),this.options=b.extend({},d.DEFAULTS,this.$element.data(),e),"checkbox"==this.$element.attr("type")?(this.$element.addClass(this.options.checkboxClass),this.$element.after(this.options.checkboxTemplate)):"radio"==this.$element.attr("type")&&(this.$element.addClass(this.options.radioClass),this.$element.after(this.options.radioTemplate))},d.prototype.check=function(){this.$element.prop("checked",!0),this.$element.trigger("change.radiocheck").trigger("checked.radiocheck")},d.prototype.uncheck=function(){this.$element.prop("checked",!1),this.$element.trigger("change.radiocheck").trigger("unchecked.radiocheck")},d.prototype.toggle=function(){this.$element.prop("checked",function(a,b){return!b}),this.$element.trigger("change.radiocheck").trigger("toggled.radiocheck")},d.prototype.indeterminate=function(){this.$element.prop("indeterminate",!0),this.$element.trigger("change.radiocheck").trigger("indeterminated.radiocheck")},d.prototype.determinate=function(){this.$element.prop("indeterminate",!1),this.$element.trigger("change.radiocheck").trigger("determinated.radiocheck")},d.prototype.disable=function(){this.$element.prop("disabled",!0),this.$element.trigger("change.radiocheck").trigger("disabled.radiocheck")},d.prototype.enable=function(){this.$element.prop("disabled",!1),this.$element.trigger("change.radiocheck").trigger("enabled.radiocheck")},d.prototype.destroy=function(){this.$element.removeData().removeClass(this.options.checkboxClass+" "+this.options.radioClass).next(".icons").remove(),this.$element.trigger("destroyed.radiocheck")};var e=b.fn.radiocheck;b.fn.radiocheck=c,b.fn.radiocheck.Constructor=d,b.fn.radiocheck.noConflict=function(){return b.fn.radiocheck=e,this}}(this,jQuery);
//# sourceMappingURL=all.js.map
