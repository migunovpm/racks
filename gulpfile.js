'use strict';

var gulp         = require("gulp"),
    browserSync  = require('browser-sync'),
    pug         = require('gulp-pug'),
    plumber      = require('gulp-plumber'),
    sourcemaps   = require('gulp-sourcemaps'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith  = require('gulp.spritesmith'),
    filter       = require('gulp-filter'),
    cache        = require('gulp-cache'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    useref       = require('gulp-useref'),
    gulpif       = require('gulp-if'),
    uglify       = require('gulp-uglify'),
    cleanCss     = require('gulp-clean-css'),
    size         = require('gulp-size'),
    rimraf       = require('gulp-rimraf');

/* --------- paths --------- */
var paths = {
    sass: {
      src: 'scss/**/*.scss',
      location: 'scss/main.scss',
      destination: 'app/css'
    },

    pug: {
      src: 'pug/**/*.pug',
      location: 'pug/_pages/*.pug',
      destination: 'app'
    },

    sprite: {
      location: 'images/*.png',
      imgDestination: 'app/img/',
      cssDestination: 'scss/_settings/'
    }
};

/* ----- pug ----- */
gulp.task('pug', function() {
  gulp.src(paths.pug.location)
    .pipe(plumber())
		.pipe(pug({
			pretty : '\t'
		}))
    .pipe(gulp.dest(paths.pug.destination))
});

/* ------ sass ------ */
gulp.task('sass', function () {
  gulp.src(paths.sass.location)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], cascade: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.sass.destination))
});

/* -------- sprites -------- */
gulp.task('sprite', function () {
    var spriteData = gulp.src(paths.sprite.location)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            padding: 20,
            algorithm: 'left-right'
        }));
    spriteData.img.pipe(gulp.dest(paths.sprite.imgDestination));
    spriteData.css.pipe(gulp.dest(paths.sprite.cssDestination));
});

/* -------- fonts to prod  -------- */
gulp.task('fonts', function() {
  gulp.src('app/fonts/*')
    .pipe(gulp.dest('prod/fonts'));
});

/* -------- pictures to prod  -------- */
gulp.task('images', function () {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('prod/img'));
});

/* -------- HTML, CSS, JS to prod  -------- */
gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleanCss({compatibility: 'ie8'})))
    .pipe(gulp.dest('prod'));
});

/* -------- other files to prod  -------- */
gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    'app/.htaccess',
    '!app/*.html'
  ]).pipe(gulp.dest('prod'));
});

/* -------- assembly and size prod -------- */
gulp.task('prod', ['useref', 'images', 'fonts', 'extras'], function () {
  return gulp.src('prod/**/*').pipe(size({title: 'build'}));
});

/* -------- assembly prod -------- */
gulp.task('build', ['clean'], function () {
  gulp.start('prod');
});

/* -------- clean prod  -------- */
gulp.task('clean', function() {
 return gulp.src('prod', { read: false }) 
   .pipe(rimraf());
});

/* -------- clean cache  -------- */
gulp.task('clear', function() {
  return cache.clearAll();
});

/* -------- server -------- */
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

/* -------- watching -------- */
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
  gulp.watch(paths.pug.src, ['pug']);
  gulp.watch(paths.sass.src, ['sass']);
});

gulp.task('default', ['server', 'watch']);



/* -------- ERRORS  -------- */
var log = function (error) {
  console.log([
    '',
    "----------ERROR MESSAGE START----------",
    ("[" + error.name + " in " + error.plugin + "]"),
    error.message,
    "----------ERROR MESSAGE END----------",
    ''
  ].join('\n'));
  this.end();
}