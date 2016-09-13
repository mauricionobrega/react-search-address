var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    scripts = [
      'src/js/vendor/reqwest.js',
      'src/js/vendor/react.js',
      'src/js/vendor/react-dom.js',
      'src/js/vendor/browser.js',
      'src/js/vendor/InputElement.js',
      'src/js/init.js'
    ];

gulp.task('scripts', function() {
  gulp.src(scripts).pipe(concat('react.js')).on('error', function(error){
      console.log(error);
    }).pipe(gulp.dest('build'))
    .pipe(rename({
      suffix: '.min'
    })).on('error', function(error){
      console.log(error);
    })
    .pipe(uglify()).on('error', function(error){
      console.log(error);
    }).pipe(gulp.dest('build'));
});

gulp.task('copyApp', function() {
  gulp.src('src/js/app.js').pipe(gulp.dest('build'));
});
