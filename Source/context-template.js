(function() {

    var CT = window.ContextTemplate = function(html, variables) {
		var hashCode = toHashCode(html);
		
        if (!CT.cache[hashCode]) {
            CT.cache[hashCode] = new Function(CT.compile(html));
        }

        return CT.cache[hashCode].apply(variables || {});
    };

	var toHashCode = function(str) {
	    var h1 = (5381 << 16) + 5381, h2 = h1, index = 0;
	    while (index < str.length) {
	        h1 = ((h1 << 5) + h1 + (h1 >> 27)) ^ str.charCodeAt(index);
	        if (index == str.length - 1) {
	            break;
	        }
	        h2 = ((h2 << 5) + h2 + (h2 >> 27)) ^ str.charCodeAt(index + 1);
	        index += 2;
	    }
 
	    return h1 + (h2 * 1566083941);
	}

    var evaluation = function(match, code) {
        return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "p.push('";
    };

    var interpolation = function(match, code) {
        return "'," + code.replace(/\\'/g, "'").replace(/([\W])@(\w)/, "$1this.$2") + ",'";
    };

    CT.cache = {};

    CT.compile = function(html) {
        var settings = CT.settings,
                result = html
                        .replace(/\\/g, '\\\\')
                        .replace(/'/g, "\\'")
                        .replace(settings.interpolate, interpolation)
                        .replace(settings.evaluate || null, evaluation)
                        .replace(/\r/g, '\\r')
                        .replace(/\n/g, '\\n')
                        .replace(/\t/g, '\\t');

        return "var p = []; p.push('" + result + "'); return p.join('')";
    };

    CT.settings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g
    };

})();
