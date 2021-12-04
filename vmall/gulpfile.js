let { series, parallel, src, dest, watch } = require('gulp');
let fileInclude = require('gulp-file-include');
let clean = require('gulp-clean');
let webserver = require('gulp-webserver');
let sass = require('gulp-sass')(require('sass'));


//清理任务
function cleanTask(){
    return src('./dist', { allowEmpty: true })
            .pipe(clean());
}

//创建html片段
function fileIncludeTask(){
    return src('./src/views/*.html')
            .pipe(fileInclude({
                prefix: '@', 
                basepath: './src/views/templates' 
            }))
            .pipe(dest('./dist/views'))
}

//开启web服务器
function webTask(){
    return src('./dist')
            .pipe(webserver({
                livereload: true,     
                open: './views/index.html', 
                port: 4000,
                host: 'localhost'
            }));
}
   
//实时进行文件的变化
function watchTask(){
    watch('./src/views/**', fileIncludeTask);
    watch('./src/static/**', staticTask);
    watch('./src/lib/**', libTask);
    watch('./src/api/**', apiTask);
    watch('./src/css/**', sassTask);
    watch('./src/js/**', jsTask);
}

//同步静态资源
function staticTask(){
    return src('./src/static/**')
            .pipe(dest('./dist/static'));
}

//同步lib库
function libTask(){
    return src('./src/lib/**')
            .pipe(dest('./dist/lib'));
}

//同步api
function apiTask(){
    return src('./src/api/**')
            .pipe(dest('./dist/api'));
}

//同步js
function jsTask(){
    return src('./src/js/**')
            .pipe(dest('./dist/js'));
}


//sass的任务
function sassTask(){
    return src('./src/css/*.scss')
            .pipe(sass())
            .pipe(dest('./dist/css'));
}


module.exports = {
    dev: series(cleanTask, parallel(fileIncludeTask, staticTask, libTask, apiTask, sassTask, jsTask), parallel(webTask, watchTask) )
};