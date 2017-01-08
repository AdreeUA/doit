//===============================================
// ПЕРЕМЕННЫЕ
//===============================================

var
    gulp = require('gulp'),
    sassGlobbing = require('gulp-sass-glob'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    minifyCss = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    runSequence = require('gulp-run-sequence'),
    del = require('del'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    wiredep = require('wiredep').stream,
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    jade = require('gulp-jade'),
    pipe = require('multipipe'),
    htmlReplace = require('gulp-html-replace'),
    plumber = require('gulp-plumber'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    path = require('path'),
    fs = require('fs'),
    sourcemaps = require('gulp-sourcemaps'),
    cache = require('gulp-cached'),
    inheritance = require('gulp-jade-inheritance'),
    filter = require('gulp-filter');

//===============================================
// ПУТИ
//===============================================

var paths = {

    scriptsDev: 'app/js/',
    scriptsDist: 'dist/js/',
    scss: 'app/scss/',
    stylesDev: 'app/css/',
    stylesDist: 'dist/css/',
    jade: 'app/jade/',
    svgIcons: 'app/resources/i/icons',
    svgImages: 'app/resources/i/svg-images'

};

//===============================================
// ЗАДАЧИ
//===============================================

// Компилируем scss и кладем его в dist/css
gulp.task('sass', function() {

    return gulp.src(paths.scss + 'main.scss')
        .pipe(sassGlobbing())
        .pipe(sourcemaps.init())
            .pipe(sass()
                .on('error', sass.logError))
            .pipe(prefix("last 2 version", "> 1%", "ie 9", "ie 8"))
        .pipe(sourcemaps.write())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(paths.stylesDist));

});

// Компилирует jade
gulp.task('jade', function() {

    var pagesList = './pages.json';

    return gulp.src(paths.jade + 'pages/index.jade')
        .pipe(plumber())
        .pipe(cache('jade'))
        .pipe(gulpif(global.watch, inheritance({basedir: paths.jade})))
        .pipe(filter(file => /app[\\\/]jade[\\\/]pages/.test(file.path)))
        .pipe(jade({
            pretty: true,
            locals: JSON.parse(fs.readFileSync(pagesList, 'utf8'))
        }))
        .pipe(rename({dirname: '.'}))
        .pipe(gulp.dest('dist'));

});

// Компилирует ВЕСЬ jade
gulp.task('jade-all', function() {

    var pagesList = './pages.json';

    return gulp.src(paths.jade + 'pages/*.jade')
        .pipe(plumber())
        .pipe(cache('jade'))
        .pipe(gulpif(global.watch, inheritance({basedir: paths.jade})))
        .pipe(filter(file => /app[\\\/]jade[\\\/]pages/.test(file.path)))
        .pipe(jade({
            pretty: true,
            locals: JSON.parse(fs.readFileSync(pagesList, 'utf8'))
        }))
        .pipe(rename({dirname: '.'}))
        .pipe(gulp.dest('dist'));

});

// Склеивает и минифицирует все bower скрипты и стили, а также прописывает путь к новым файлам в html страницах
gulp.task('useref-all', function () {

    return gulp.src('dist/index.html')
        .pipe(useref())
        .pipe(cache('useref'))
        .pipe(gulpif('*.js', pipe(
            // убирает суффикс .min и сохраняет не минифицированную версию
            rename(function (path) {
                path.basename = path.basename.slice(0, path.basename.length - 4);
            }),
            gulp.dest('dist'),
            uglify(),
            rename({
                suffix: '.min'
            }) // снова добавляет суффикс .min
        )))
        .pipe(gulpif('*.css', pipe(
            minifyCss()
        )))
        .pipe(gulp.dest('dist'));

});

// Склеивает и минифицирует все bower скрипты и стили, а также прописывает путь КО ВСЕМ файлам в html страницах
gulp.task('useref', function () {

    return gulp.src('dist/*.html')
        .pipe(useref())
        .pipe(cache('useref'))
        .pipe(gulpif('*.js', pipe(
            // убирает суффикс .min и сохраняет не минифицированную версию
            rename(function (path) {
                path.basename = path.basename.slice(0, path.basename.length - 4);
            }),
            gulp.dest('dist'),
            uglify(),
            rename({
                suffix: '.min'
            }) // снова добавляет суффикс .min
        )))
        .pipe(gulpif('*.css', pipe(
            minifyCss()
        )))
        .pipe(gulp.dest('dist'));

});

// Подключает bower файлы к jade шаблонам
gulp.task('wiredep', function() {

    return gulp.src(paths.jade + 'partials/scripts.jade')
        .pipe(wiredep({
            ignorePath: '../../',
            exclude: ['bower_components/picturefill']
        }))
        .pipe(gulp.dest(paths.jade + 'partials/'));

});

// Генерирует svg спрайт из иконок, которым можно менять цвет
gulp.task('svg:icons', function () {
    return gulp.src(paths.svgIcons + '/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }, {
                    removeAttrs: {
                        attrs: ['fill', 'stroke']
                    }
                }]
            }
        }))
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgstore())
        .pipe(gulp.dest('app/resources/i'));
});

// Генерирует svg спрайт из иконок, которым задан цвет
gulp.task('svg:images', function () {
    return gulp.src(paths.svgImages + '/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(rename({prefix: 'img-'}))
        .pipe(svgstore())
        .pipe(gulp.dest('app/resources/i'));
});

// Копируем всё из папки resources в dist
gulp.task('copy', function() {

    return gulp.src('app/resources/**/*')
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'));

});

// Очищаем папку dist
gulp.task('clean', function() {

    return del('dist');

});

// Сервер
gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'dist',
            routes: {
                "/app": "app",
                "/bower_components": "bower_components"
            }
        }
    });
});

//Watch task
gulp.task('watch', function() {

    global.watch = true;

    watch(paths.scss + '**/*.scss', function() {
        runSequence('sass', browserSync.reload);
    });

    watch(paths.jade + '**/*.jade', function() {
        runSequence('jade', browserSync.reload);
    });

    watch(paths.scriptsDev + '**/*.js', browserSync.reload);

    watch(paths.svgIcons + '**/*.svg', function() {
        runSequence('svg:icons', browserSync.reload);
    });

    watch(paths.svgImages + '**/*.svg', function() {
        runSequence('svg:images', browserSync.reload);
    });

    watch('app/resources/**/*', function() {
        runSequence('copy', browserSync.reload);
    });

    watch('bower.json', function() {
        runSequence('wiredep', browserSync.reload);
    });

});

// Сборка на продакшн
gulp.task('build', ['clean'], function() {
    runSequence(
        'svg:icons',
        'svg:images',
        'wiredep',
        'copy',
        'jade',
        'sass',
        'useref'
    )
});

// Полная сборка на продакшн
gulp.task('superbuild', ['clean'], function() {
    runSequence(
        'svg:icons',
        'svg:images',
        'wiredep',
        'copy',
        'jade-all',
        'sass',
        'useref-all'
    )
});

// Задача по умолчанию
gulp.task('default', ['clean'], function() {
    runSequence(
        'svg:icons',
        'svg:images',
        'wiredep',
        'copy',
        'jade-all',
        'sass',
        'server',
        'watch'
    )
});
