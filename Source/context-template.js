(function() {

    var CT = window.ContextTemplate = function(html, variables) {
        if (!CT.cache[html]) {
            CT.cache[html] = new Function(CT.compile(html));
        }

        return CT.cache[html].apply(variables || {});
    };

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
