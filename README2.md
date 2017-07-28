##项目目录
——angualr-seed
    |--LICENSE 
    |--README2.md  
    |--bower.json  
    |--e2e-tests   
    |--karma.conf.js   
    |--package.json
    |--README.md
    |--app
    |   |--app.css          
    |   |--app.routes.js       
    |   |--components      
    |   |--index.html      
    |   |--views
    |   |   |--view1
    |   |   |--view2
    |   |--app.js          
    |   |--bower_components    
    |   |--index-async.html    
    |   |--style     
    |--dist        
    |--gulpfile.js 
    |--node_modules
##加入gulp自动构建方案
- 下载gulp工具
``` 
sudo npm install gulp -g  //全局
npm install gulp --save-dev //局部
```
- 在项目根目录下加入gulpfile.js
```
var gulp = require('gulp');
//引入gulp组件
//js语法检查
var jshint = require('gulp-jshint');//注意这些也要你npm install dev-name
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

```
- 用原有的路由配置项目，关键点：
    - 在app目录下的index.html中需要用script加载对应的js文件
    - 根的js文件与子的js文件之间的关系通过
    - 
    - 
    - 
- 用ui-router进行路由配置
    - 要正确安装angular-ui-router
    - 在index.html中正确引入其script文件;记得引入js文件
    - 在主js文件中app.js中注册入模块中并配置
``` 
    angular.module('myApp', [
      'ui.router',//注册ui.router组件
      'myApp.view1',//这里是ui-router必须的
      'myApp.view2',
      'myApp.version'
    ]).
    //注意下面一行的'$stateProvider'，'$urlRouterProvider'
    config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/view1');//不匹配的路径重定向
    }
    ]);
```
    - 在子的js文件中注册
```
app/views/view1/view1.js
'use strict';

angular.module('myApp.view1', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('view1', {
    url: '/view1',
    templateUrl:'views/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);
```
