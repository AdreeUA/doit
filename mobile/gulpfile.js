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
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    wiredep = require('wiredep').stream,
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    jade = require('gulp-jade'),
    pipe = require('multipipe'),
    cache = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    lazypipe = require('lazypipe'),
    spritesmith = require('gulp.spritesmith'),
    merge = require('merge-stream'),
    inheritance = require('gulp-jade-inheritance'),
    filter = require('gulp-filter'),
    browserify = require('gulp-browserify'),
    modernizr = require('gulp-modernizr'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    path = require('path'),
    fs = require('fs');

//===============================================
// ПУТИ
//===============================================

var paths = {

    scriptsDev: 'app/js/',
    scriptsDist: 'dist/js/',
    spriteDev: 'app/resources/i/sprite/',
    imgDev: 'app/resources/i/',
    scss: 'app/scss/',
    stylesDist: 'dist/css/',
    jade: 'app/jade/',
    svgIcons: 'app/resources/i/icons'

};

//===============================================
// ЗАДАЧИ
//===============================================

// генерирует спрайт
gulp.task('sprite', function () {

    var spriteData = gulp.src(paths.spriteDev + '*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../i/sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'scss',
        padding: 10,
        cssTemplate: 'handlebarsInheritance.scss.handlebars'
    }));

    var imgStream = spriteData.img.pipe(gulp.dest(paths.imgDev));
    var scssStream = spriteData.css.pipe(gulp.dest(paths.scss + 'helpers'));

    return merge(imgStream, scssStream);

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

// Компилируем scss и кладем его в dist/css
gulp.task('sass', function() {

    return gulp.src(paths.scss + 'main.scss')
        .pipe(sassGlobbing())
        .pipe(sourcemaps.init())
            .pipe(sass()
                .on('error', sass.logError))
            .pipe(prefix("last 2 version", "> 1%", "ie 9"))
        .pipe(sourcemaps.write())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(paths.stylesDist));

});

// Компилирует jade
gulp.task('jade', function() {

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

 gulp.task('scripts', function() {
    return gulp.src(paths.scriptsDev + 'entry.js')
        .pipe(plumber())
        .pipe(browserify({
            debug : true
        }))
        .pipe(rename('scripts.js'))
        .pipe(gulp.dest(paths.scriptsDist));
});

// Подключает bower файлы к html файлам
gulp.task('wiredep', function() {

    return gulp.src(paths.jade + '**/*.jade')
        .pipe(plumber())
        .pipe(wiredep({
            ignorePath: '../../'
        }))
        .pipe(gulp.dest(paths.jade));

});

// Склеивает и минифицирует все bower скрипты и стили, а также прописывает путь к новым файлам в html страницах
gulp.task('useref', function () {

    return gulp.src('dist/*.html')
        .pipe(useref({}))
        .pipe(cache('useref'))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));

});

// Сборка файла modernizr
gulp.task('modernizr', function() {
    return gulp.src(paths.scriptsDev + '*.js')
        .pipe(modernizr('modernizr.min.js', {
            'options': [
                'setClasses'
            ],
            'tests': [
                'flexbox',
                'csscalc',
                'objectfit'
            ],
            'uglify': true
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scriptsDist));
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

    watch(paths.scriptsDev + '**/*.js', function() {
        runSequence('scripts', browserSync.reload);
    });

    watch('app/resources/**/*', function(event) {

        if (event) {
            runSequence('copy', browserSync.reload);
        }

    });

    watch(paths.spriteDev + '/**/*.png', function(event) {

        if (event) {
                runSequence('sprite', 'copy');
        }

    });

    watch(paths.svgIcons + '**/*.svg', function() {
        runSequence('svg:icons', browserSync.reload);
    });

    watch('bower.json', function() {
        runSequence('wiredep', browserSync.reload);
    });

});

// Сборка на продакшн
gulp.task('build', ['clean'], function() {
    runSequence(
        'modernizr',
        'svg:icons',
        'wiredep',
        'jade',
        'sprite',
        'copy',
        'sass',
        'scripts',
        'useref'
    );
});

// Задача по умолчанию
gulp.task('default', ['clean'], function() {
    runSequence(
        'modernizr',
        'svg:icons',
        'wiredep',
        'jade',
        'sprite',
        'copy',
        'sass',
        'scripts',
        'server',
        'watch'
    )
});
