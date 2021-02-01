'use strict';

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');

gulp.task('default', function () {
  return gulp
    .src('./dist' + '*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./dist'));
});
