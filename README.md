Bench Brewing Website 2.0

Step 1 – Install Node.js

Head on over to http://nodejs.org and click install – this should automagically figure out what OS and version.

Step 2 – Install Gulp.js Globally

Open the command prompt – (run cmd) then type

	npm

If there is no  error you’ve installed Node.js correctly. Otherwise make sure you close and reopen command prompt if it was open during install. Or try rebooting – reinstalling, the usual.

Now type:

	npm install -g gulp

This will install Gulp.js globally on your system. It will enable you to run the ‘gulp’ command in your command prompt.

Step 3 - Install Gulp.js Locally

	cd bench_2-0/
	npm install gulp

Step 4 - Copy the contents of bench2_0/node_overrides over top of bench2_0/node_modules

Overwrite any files in the destination. These are custom node modules you need.

Step 5 - Unzip node_modules.zip into brew2_0 folder over top of any existing node_modules folder §

Step 6 - Install any missing node modules (should not be necessary but added just in case)

	Try running the following:

	gulp

	The server might fail to start. This is due to missing modules.

	The output will be like: 
	Error: Cannot find module 'gulp-git'

	The name in quotes will change each time you run gulp. You may have to do this multiple times.

	npm install gulp-git

	Then go back to Step 6 until it runs properly.

Step 7 - Run local gulp (this will start the server, run this any time you want to start working on it)

	gulp

§ The node modules are ignored because they can cause issues with git in various OSes if included in the repository. The filesystem links don't get created properly if they are simply checked out between Windows and MacOS for some reason. Have to figure out why that is, but for now keeping them in a ZIP file will have to do.