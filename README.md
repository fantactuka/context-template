Context Template
===========

Context based version of Underscore.js (https://github.com/documentcloud/underscore) micro-templating. General difference is to use object context, instead of `with(object) { }` statement.
It solves problems with undefined variable issues and makes easier to handle it.


How to use
----------

Assume that ContextTemplate function is assigned to CT global variable:

	var html = "<div><%= this.name %></div>";
	CT(html, { name: "Bob" }); // <div>Bob</div>

Also it's possible to use `@` as a shorthand for `this.`:

	var html = "<div><%= @name %></div>";
	CT(html, { name: "Bob" }); // <div>Bob</div>


Caching
----------

The other difference with Underscore template is lazy caching. Whenever template function is called for html string, "compiled" result will be saved in cache and next time same template called - cached version will be used:

	var html = "<div><%= @name %></div>";
	CT(html, { name: "Bob" });  // Stores "compiled" template
	CT(html, { name: "Sam" });  // Use cached template, just apply new variables
