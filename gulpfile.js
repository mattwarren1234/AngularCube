'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  // cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del');

gulp.task('scripts', function() {
  return gulp.src('public/**/*.js')
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('dist/assets/js'))
  .pipe(notify({ message: 'Scripts task complete' }));
});

// Styles
gulp.task('styles', function() {
  return gulp.src('public/css/*.css')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});
 

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch(['dist/**']).on('change', livereload.changed);
    gulp.watch('public/**/*.js', ['scripts']);

});