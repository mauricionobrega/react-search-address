var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    scripts = [
      'src/js/vendor/reqwest.js',
      'src/js/vendor/react.js',
      'src/js/vendor/react-dom.js',
      'src/js/vendor/browser.js',
      'src/js/vendor/InputElement.js',
      'src/js/init.js'
    ];

gulp.task('scripts', () => {
  gulp.src(scripts).pipe(concat('react.js')).on('error', (error) => {
      console.log(error);
    }).pipe(gulp.dest('build'))
    .pipe(rename({
      suffix: '.min'
    })).on('error', (error) => {
      console.log(error);
    })
    .pipe(uglify()).on('error', (error) => {
      console.log(error);
    }).pipe(gulp.dest('build'));
});

gulp.task('copyApp', () => {
  gulp.src('src/js/app.js').pipe(gulp.dest('build'));
});

gulp.task('scss', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/'))
    .pipe(cleanCSS({
      compatibility: 'ie8',
      debug: true
    }, (details) => {
      console.log(details.name + ': ' + details.stats.originalSize + 'b -> ' + details.stats.minifiedSize + 'b');
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['scripts', 'scss', 'copyApp'], () => {});

gulp.task('default', () => {
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/js/app.js', ['copyApp']);
});
