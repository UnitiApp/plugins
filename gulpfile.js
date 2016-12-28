var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    runSequence = require('run-sequence'),
    Server = require('karma').Server,
    exec = require('child_process').exec,
    open = require('gulp-open');


/**
 * Testing: run: gulp test
 */
gulp.task('test', function(callback) {
    runSequence(['lint', 'jasmine'], callback);
});
gulp.task('jasmine', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});
gulp.task('lint', function(done) {
    return gulp.src(['./src/**/*.js'])
        .pipe(eslint({
            useEslintrc: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
