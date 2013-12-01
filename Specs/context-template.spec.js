var CT = window.ContextTemplate;

describe("Context template", {

    "should work fine without variables": function() {
        var html = "<div>Hello, world!</div>";
        value_of(CT(html)).should_be(html);
    },

    "should not throw error if variable is not passed": function() {
        var html = "<div><%= @name %></div>";
        value_of(CT(html, {  })).should_be("<div></div>");
    },

    "should evaluate script": function() {
        var html = "<% if(this.success) { %>Success<% } else { %>Failure<% } %>";
        value_of(CT(html, { success: true })).should_be("Success");
        value_of(CT(html, { success: false })).should_be("Failure");
    },

    "should interpolate variables with @ as in object context": function() {
        value_of(CT("<%= @name %>", { name: "Bob" })).should_be("Bob");
    },

    "should not interpolate email address with @ as in object context": function() {
        value_of(CT("<%= 'name@name.com' %>", { name: "Bob" })).should_be("name@name.com");
    },

    "should store cached compiler": function() {
		CT.cache = {};
		
        var html = "<% if(true) { %>a<% } %>",
			result = CT(html, { success: true }),
			cacheKey = Object.keys(CT.cache)[0]
			cached = CT.cache[cacheKey];
			
		value_of(cached()).should_be(result);
    }

});
