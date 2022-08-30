const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
var spritesmith = require('gulp.spritesmith');

const siteRoot = 'www';
const cssFiles = '_sass/**/*.?(s)css';

gulp.task('css', () => {
  gulp.src(cssFiles)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('www/css'))
    .pipe(gulp.dest('css'));
});

gulp.task('sprite', () => {
  var spriteData = gulp.src('images/src/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png?' + (new Date().getTime()),
      retinaSrcFilter: 'images/src/*@2x.png',
      retinaImgName: 'sprite-2x.png',
      retinaImgPath: '../images/sprite-2x.png?' + (new Date().getTime()),
      cssName: '_sprite.scss',
    }));

  var imgStream = spriteData.img
    .pipe(gulp.dest('images/'));

  var cssStream = spriteData.css
    .pipe(gulp.dest('_sass'));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  gulp.watch(cssFiles, ['css']);
});

gulp.task('default', ['css', 'serve']);
