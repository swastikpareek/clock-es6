var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('compile:sass', function () {
  return gulp.src([
    'sass/*.scss'
  ])
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

gulp.task('watch:sass', function(){
  gulp.watch('sass/**/*', ['compile:sass']);
});

gulp.task('default', ['compile:sass']);

gulp.task('watch', ['watch:sass']);

