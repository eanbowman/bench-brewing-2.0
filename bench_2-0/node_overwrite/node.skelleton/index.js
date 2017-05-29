/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */

 var git = require('gulp-git')

module.exports = {
	config: {},
	modules: [],
	js: [],
	css: [],
	scss: [],
	images: [],
	load: function(config) {
		var self = this;
		self.config = config;

		self.js.push("_assets/config.js");
		self.js.push("_assets/functions.js");
		self.js.push("_assets/base.js");
		self.js.push("_assets/google.maps.js");

		
	 	self.config.modules.forEach(function(module) {
	 		git.clone('https://github.com/joeycaughey/'+module+".git", {
	 			cwd: '_assets/'
	 		}, function (err) {
	 			
			});

	        var dir = "_assets/" + module;
	        self.js.push(dir + "/*.js");
	        self.css.push(dir + "/*.css");
	        self.scss.push(dir + "/*.scss");
	        self.images.push(dir + "/*.jpg");
	        self.images.push(dir + "/*.png");
	    });

	    self.js.push("_assets/mobile.js");
	 	
	    return self;
	}
}


