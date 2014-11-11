'use strict';

var gulp = require('gulp'),
  argv = require('yargs').argv,
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  gulpif = require('gulp-if'),
  cache = require('gulp-cached'),
  remember = require('gulp-remember'),
  browserSync  = require('browser-sync'),
  del = require('del');

var source = {
    html :    ['public/**/*.html'],
    scripts : ['public/**/*.js'],
    css :     ['public/css/**/*.css']
  }, 
  destination = {
    css : 'dist/css',
    scripts: 'dist/js'
  };

// reload on html changes
gulp.task('html', function () {
  return gulp.src(source.html)
    .pipe(cache('html'))
    .pipe(gulpif(!argv.production, browserSync.reload({stream:true})))
    .pipe(remember('html'));
});

gulp.task('scripts', function() {
  return gulp.src(source.scripts) 
  .pipe(cache('scripts'))
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(gulpif(argv.production, uglify()))
  .pipe(remember('scripts'))
  .pipe(concat('app.js'))
  .pipe(gulp.dest(destination.scripts))
  .pipe(notify({ message: 'Scripts task complete' }));
});


// gulp.task('sass', function () {
//   return gulp.src(source.sass)
//     .pipe(cache('sass'))
//       .pipe(sass({
//         require: ['susy'],
//         errLogToConsole: true
//       }))
//       .pipe(autoprefixer({
//         browsers: ['last 4 versions'],
//         cascade: false
//       }))
//       .pipe(cmq({log:true}))
//       .pipe(gulpif(argv.production, cssmin()))
//       .pipe(gulp.dest(destination.css))
//       .pipe(gulpif(!argv.production, browserSync.reload({stream:true})))
//     .pipe(remember('sass'))
// });


// Styles
gulp.task('styles', function() {
  return gulp.src(source.css)
    .pipe(cache('styles'))
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    }))
    .pipe(gulpif(argv.production, minifycss()))
    .pipe(gulp.dest(destination.css))
    .pipe(gulpif(!argv.production, browserSync.reload({stream:true})))
    .pipe(remember('styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

 // Initialize Browser Sync
gulp.task('browser-sync', function () {
  if(!argv.production) {
    browserSync({
      port: 3001
      // proxy: '127.0.0.1:1337'
    });
  }
});

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/js', 'dist/css'], cb);
});

gulp.task('watch', function() {
    gulp.watch(source.css, ['styles']);
    gulp.watch(source.html, ['html']);
    gulp.watch(source.scripts, ['scripts']);
});

gulp.task('default', [
  'html',
  'styles',
  'scripts',
  'browser-sync',
  'watch'
]);
