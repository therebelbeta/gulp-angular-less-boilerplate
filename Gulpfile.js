/*
  This is an EXAMPLE gulpfile.js
  You'll want to change it to match your project.
  Find plugins at https://npmjs.org/browse/keyword/gulpplugin
*/
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var ngmin = require('gulp-ngmin');
var minifyHTML = require('gulp-minify-html');
var templates = require('gulp-angular-templatecache');


gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)

  gulp.src('source/templates/**/*.html')
    .pipe(minifyHTML({
          empty: true,
          spare: true,
          quotes: true
      }))
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('source/js'));

  gulp.src(['source/js/**/*.js', '!source/js/lib/**', 'source/js/templates.js'])
    .pipe(concat("main.js"))
    .pipe(ngmin())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

  // Copy vendor files
  gulp.src(['source/lib/jquery/jquery.min.js','source/lib/angular/angular.min.js','source/lib/angular-route/angular-route.min.js'])
    .pipe(concat("lib.js"))
    .pipe(gulp.dest('build/js'));

  gulp.src(['source/lib/**/*.css'])
    .pipe(concat("lib.css"))
    .pipe(gulp.dest('build/css/lib'));
});

gulp.task('less', function () {
  gulp.src('source/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});

// Copy all static assets
gulp.task('copy', function() {
  gulp.src('source/img/**')
    .pipe(gulp.dest('build/img'));

  gulp.src('source/index.html')
    .pipe(gulp.dest('build'));

  gulp.src('source/assets/fonts/**')
    .pipe(gulp.dest('build/fonts'));

  gulp.src('source/assets/misc/**')
    .pipe(gulp.dest('build/misc'));
});

// The default task (called when you run `gulp`)
gulp.task('default', function() {
  gulp.run('scripts', 'less', 'copy');

  // Watch files and run tasks if they change
  gulp.watch('source/js/**', function(event) {
    gulp.run('scripts');
  });
  gulp.watch('source/less/**', function(event) {
    gulp.run('less');
  });
  gulp.watch('source/**/*.html', function(event) {
    gulp.run('copy','scripts');
  }); 
  gulp.watch([
    'source/img/**',
    'source/assets/fonts/**',
    'source/assets/misc/**'
  ], function(event) {
    gulp.run('copy');
  });
});