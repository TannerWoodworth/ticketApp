var gulp = require('gulp'),
		del = require('del'),
		sass = require('gulp-sass'),
		plumber = require('gulp-plumber'),
		imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
		browserify = require('browserify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		jshint = require('gulp-jshint'),
		browserSync = require('browser-sync').create(),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		environments = require('gulp-environments');

var development = environments.development,
		production = environments.production,
		configFile = production() ? "./_build/env/prod.js" : "./_build/env/dev.js";

// CLEAN GULP TASKS
//////////////////////////////////////////////////

gulp.task('clean', function () {
    del(['public']);
});

// JS GULP TASKS
//////////////////////////////////////////////////

gulp.task('lint', function() {
  return gulp.src('./_build/app/**/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('scripts', function(){
	return gulp.src(['./_build/assets/**/*.js',configFile])
			.pipe(uglify())
			.pipe(concat('vendor.min.js'))
			.pipe(gulp.dest('./public/assets/scripts'));
});

gulp.task('browserify', function() {
	return browserify('./_build/app/app.js')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./public/assets/scripts'));
});

// CSS GULP TASKS
//////////////////////////////////////////////////

gulp.task('copy', ['browserify','scss'], function() {
	gulp.src(['./_build/**/*.html','./_build/**/*.css'])
		.pipe(gulp.dest('./public'))
		.pipe(browserSync.stream())
});

gulp.task('scss', function() {
	gulp.src('./_build/assets/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./_build/assets/stylesheets/'));
});

// IMAGE GULP TASKS
//////////////////////////////////////////////////

gulp.task('images', function() {
  return gulp.src('./_build/assets/images/**/*')
    .pipe(plumber())
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./public/assets/images'));
});

// MISC GULP TASKS
//////////////////////////////////////////////////

gulp.task('moveFavicons', [], function() {
  console.log("Moving favicons");
    return gulp.src("./_build/assets/favicons/*")
    .pipe(gulp.dest('./public'));
});

gulp.task('browser-sync', ['build'], function() {
	browserSync.init({
		server: {
			baseDir: "./public",
			routes: {
				"/bower_components": "bower_components",
				"/node_modules": "node_modules"
			}
		}
	});
});

// GULP TASKS / BUILDS
//////////////////////////////////////////////////

gulp.task('build',['lint', 'images', 'scss', 'moveFavicons', 'copy', 'scripts']);

gulp.task('default', ['browser-sync'], function(){
	gulp.watch("./_build/**/*.*", ["build"]);
	gulp.watch("./public/**/*.*").on('change', browserSync.reload);
});
