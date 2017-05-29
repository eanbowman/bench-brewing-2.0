var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var del = require('del');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var merge = require('merge2');
var minifycss = require('gulp-minify-css');
var remoteSrc = require('gulp-remote-src');
var exec = require('child_process').exec;
var mergejson = require('gulp-merge-json');

var skelleton = require('node.skelleton').load(
    require('./skelleton.json')
);


// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function() {
    browserSync.init({
        server: "./client",
        files: ["./client/_assets/*.css", "./client/_assets/*.js"]
    });


    gulp.watch("_assets/**/**.js", ['javascripts'], function() {
        gulp.start('publish-development');
    }).on('all', (event, path) => {
        console.log(event, path);
 
    });
    gulp.watch([
        "_assets/**/**.scss",
        "client/_assets/scss/**scss"
    ], ['styles']).on('all', (event, path) => {
        console.log(event, path);
        //gulp.start('publish-development');
    }).on('change', browserSync.reload);

    // Publish Updated Assets
    gulp.watch([
        "client/**/**.html",
        "client/_assets/**.js",
        "client/_assets/**.css",
    ], ['publish-development']);

    //gulp.watch("_assets/**/**css", ['styles', 'publish-development']);
    gulp.watch("client/*.html", ['publish-development']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('styles', function() {
    del(['client/_assets/app.css']).then(paths => {
        //console.log(skelleton.css);

        var cssstyles = gulp.src(skelleton.css)
            .pipe(concat('css-files.css'));

        var scssstyles = gulp.src(skelleton.scss)
            .pipe(sass(sassOptions).on('error', sass.logError))
            .pipe(concat('scss-files.css'));

        var sassstyles = gulp
            .src(["client/_assets/scss/**/*.scss"])
            .pipe(sass(sassOptions).on('error', sass.logError))
            .pipe(concat('scss-files.css'))


        return merge(cssstyles, scssstyles, sassstyles)
            .pipe(concat('app.css'))
            .pipe(minifycss())
            .pipe(gulp.dest("client/_assets/"));
    });
});


gulp.task('javascripts', function() {
    del(['client/_assets/libraries.js', 'client/_assets/assets.js']).then(paths => {
        console.log("Compiling Javascripts")
        var javascripts = gulp.src(skelleton.js, { base: './' });

        merge(javascripts)
            .pipe(concat('assets.js'))
            //.pipe(uglify())
            .pipe(gulp.dest('client/_assets'))
            .pipe(gulp.dest("_assets/"));

        //console.log("Javascripts", skelleton.js);
        //console.log(skelleton.config.packages)

        remoteSrc(skelleton.config.packages)
            .pipe(concat('libraries.js'))
            //.pipe(uglify())
            .pipe(gulp.dest('client/_assets'));

    })
});

gulp.task('publish-development', function(cb) {
    console.log("Development Has Been Published!");
    /*
    exec('sh publish.sh', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
    */
});




gulp.task('optimize-images', function() {
    console.log("Optimizing Images", skelleton.images);

    //return gulp.src(skelleton.images)
    //.pipe(imagemin({ progressive: true }))
    //.pipe(gulp.dest('client/_assets/images'));

});

gulp.task('default', ['serve', 'javascripts', 'styles', 'optimize-images', 'publish-development']);
