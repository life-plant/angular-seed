var gulp = require('gulp');
//引入gulp组件
//js语法检查
var jshint = require('gulp-jshint');
//sass预处理
var sass = require('gulp-sass');
//文件合并
var concat = require('gulp-concat');
//js压缩
var uglify = require('gulp-uglify');
//重命名
var rename = require('gulp-rename');
//server服务
browserSync = require('browser-sync').create();

var jsFiles = [
  './node_modules/angular/angular.js',
  './node_modules/angular-ui-router/release/angular-ui-router.js'
];

//检查脚本
gulp.task('lint', function() {
  gulp.src('./app/**/*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'));

})

//编译Sass
gulp.task('sass', function() {
  console.log('sass!');
  gulp.src('./app/style/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/style'));
  gulp.src('./app/style/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css'))
})

//合并、压缩js文件
gulp.task('scripts', function() {
  gulp.src('./app/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});
//合并、压缩来自npm的js资源文件
gulp.task('npmscripts', function() {
  return gulp.src(jsFiles)
  .pipe(concat('npm.js'))
  .pipe(gulp.dest('./dist/js'))
  .pipe(rename('npm.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
})

//合并、压缩css文件
// gulp.task('css', function() {
//   gulp.src('./app/style/*.css')
//     .pipe(concat('style.css'))
//     .pipe(gulp.dest('./dist/css'))
//     // .pipe(rename('style.min.css'))
//     // .pipe(uglify())
//     // .pipe(gulp.dest('./dist/css'));
// });

//使用connect启动一个Web服务器
gulp.task('browserSync', function () {
  browserSync.init({
         server: {
             baseDir: "./app/"
         }
     });
});

//默认任务
gulp.task('default', function() {
  gulp.run('npmscripts');

//监听js变化
browserSync.init({
       server: {
           baseDir: "./app/"
       }
   });

gulp.watch('./app/**/*.js', ['lint', 'scripts']);

gulp.watch('./app/style/**/*.scss', ['sass']);

// gulp.watch('./app/style/**/*.css', ['css'])

gulp.watch('./app/**', function() {
       console.log('reload');
       browserSync.reload();
   });

})
