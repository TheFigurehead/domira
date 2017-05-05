var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
concat = require('gulp-concat'),
uglify = require('gulp-uglifyjs'),
cssnano = require('gulp-cssnano'),
del = require('del'),
autoprefixer = require('gulp-autoprefixer'),
imagemin = require('gulp-imagemin'),
htmlmin = require('gulp-htmlmin');

gulp.task('sass', function() {
return gulp.src(['app/scss/style.scss', 'app/scss/libs.min.scss'])
.pipe(sass())
.pipe(autoprefixer())
.pipe(gulp.dest('app/css'))
.pipe(browserSync.reload({stream: true}));
});

gulp.task('script', function() {
return gulp.src([
'app/libs/jquery/dist/jquery.min.js'
])
.pipe(concat('libs.min.js'))
//.pipe(uglify())
.pipe(gulp.dest('app/js'));
});

gulp.task('browser', function() {
browserSync({
server: {
baseDir: 'app',
},
notify: false
});
});

gulp.task('watch', ['browser', 'sass', 'script'], function() {
gulp.watch('app/scss/*.scss', ['sass']);
gulp.watch('app/*.html', browserSync.reload);
gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('clean', function() {
return del.sync('dist')
})

gulp.task('build', ['clean', 'sass', 'script'], function() {
var buildCss = gulp.src('app/css/*.css')
//.pipe(cssnano())
.pipe(gulp.dest('dist/css'));

var buildFonts = gulp.src('app/fonts/**/*')
.pipe(gulp.dest('dist/fonts'));

var buildJs = gulp.src('app/js/*.js')
//.pipe(uglify())
.pipe(gulp.dest('dist/js'));

var buildHtml = gulp.src('app/*.html')
.pipe(htmlmin({collapseWhitespace: true}))
.pipe(gulp.dest('dist'));

var buildImg = gulp.src('app/img/**/*')
.pipe(imagemin())
.pipe(gulp.dest('dist/img'));

// var buildMovies = gulp.src('app/movies/**/*')
// .pipe(gulp.dest('dist/movies'));
});