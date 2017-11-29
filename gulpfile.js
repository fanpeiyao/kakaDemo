var gulp = require("gulp");
var gutil = require("gulp-util");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var imgmin = require('gulp-imagemin');
var fse = require('fs-extra');
var connect = require('gulp-connect');
var replace = require('gulp-replace');
var config = require("./config.js");


//public clean
gulp.task('clean', function () {
    fse.emptyDirSync('dist');
});

//load assets
gulp.task("assets",function(){
     gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'node_modules/fnui/dist/js/fnui.js',
        'bower_components/iscroll/build/iscroll-probe.js'
    ])
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
    gulp.src([
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/oclazyload/dist/ocLazyLoad.js'
    ])
        .pipe(concat('angular.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
    gulp.src('node_modules/fnui/dist/fonts/*').pipe(gulp.dest('dist/assets/fonts'));
    gulp.src('node_modules/fnui/dist/css/*').pipe(gulp.dest('dist/assets/styles'));
});

//copy files
gulp.task('copy',function(){
    gulp.src('src/app/templates/*').pipe(gulp.dest('dist/templates'));
    gulp.src('src/app/iconfont/*').pipe(gulp.dest('dist/styles/iconfont'));
    gulp.src('src/index.html').pipe(gulp.dest('dist'));
    gulp.src('src/404.html').pipe(gulp.dest('dist'));

    config.modules.forEach(function (item) {
        fse.copySync(item.path, 'dist/views/'+item.name);
    })
});

//app builder
gulp.task('app',function(){
    gulp.src(['src/config.js'])
        .pipe(gulp.dest('dist/scripts'));
    gulp.src(['src/app/components/*','src/app/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/scripts'));
    gulp.src('src/app/*.css')
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist/styles'));
    gulp.src(['src/app/directives/*.js'])
        .pipe(concat('directive.min.js'))
        .pipe(gulp.dest('dist/scripts/directives'));
});

gulp.task('app-build',function(){
    gulp.src(['src/config.js'])
        .pipe(gulp.dest('dist/scripts'));
    gulp.src(['src/app/components/*','src/app/*.js'])
        .pipe(concat('app.js'))
        .pipe(replace(/\/\/#[^#]*\/\/##/g,''))
        .pipe(uglify({
            mangle:false
        }))
        .pipe(gulp.dest('dist/scripts'));
    gulp.src('src/app/*.css')
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/styles'));
    gulp.src(['src/app/directives/*.js'])
        .pipe(replace(/\/\/#[^#]*\/\/##/g,''))
        .pipe(concat('directive.min.js'))
        .pipe(uglify({
            mangle:false
        }))
        .pipe(gulp.dest('dist/scripts/directives'));
});

gulp.task('service',function(){
    gulp.src('src/app/services/*.js')
        .pipe(gulp.dest('dist/scripts/services/'));
});


gulp.task('replace',function(){
    gulp.src('src/app/services/*.js')
        .pipe(replace(/\/\/#[^#]*\/\/##/g,''))
        .pipe(gulp.dest('dist/scripts/services/'));
});


gulp.task('watch', function () {
    gulp.watch(['src/index.html','src/app/templates/*','src/app/services/*','src/app/views/**/*.html','src/app/views/**/**/*'], ['copy','reload']);
    gulp.watch(['src/app/*.js','src/app/components/*','src/app/*.css'], ['app','reload']);
});
gulp.task('reload',function () {
    gulp.src('dist').pipe(connect.reload())
});
gulp.task('connect',['dev'],function(){
    connect.server({
        root: 'dist',
        livereload:true
    })
});

gulp.task('dev',['clean', 'assets', 'copy','app','service']);
gulp.task('build-dev',['connect','watch']);

gulp.task('build',['clean', 'assets', 'copy','app-build','replace']);
gulp.task('default',['build']);