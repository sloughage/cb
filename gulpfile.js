const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const less = require('gulp-less')
const cssmin = require('gulp-clean-css')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')
const watch = require('gulp-watch')

gulp.task('html', () => gulp.src('src/index.html')
  .pipe(htmlmin({
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true
  })).pipe(gulp.dest('build'))
)

gulp.task('css', () => gulp.src('src/style.less')
  .pipe(less())
  .pipe(cssmin())
  .pipe(gulp.dest('build'))
)

gulp.task('js', () => browserify('./src/app.jsx')
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('app.js'))
  //.pipe(buffer())
  //.pipe(uglify())
  .pipe(gulp.dest('build'))
)

gulp.task('react', () => browserify('./test/components/main.jsx')
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('app.js'))
  //.pipe(buffer())
  //.pipe(uglify())
  .pipe(gulp.dest('test'))
)

gulp.task('watch', () => {
  gulp.watch(['src/index.html'], ['html'])
  gulp.watch(['src/style.less'], ['css'])
  gulp.watch(['src/**/*.jsx'], ['js'])
})

gulp.task('default', ['html', 'css', 'js', 'watch'])