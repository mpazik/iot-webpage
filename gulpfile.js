const gulp = require('gulp');
const frontMatter = require('gulp-front-matter');
const marked = require('gulp-marked');
const rename = require('gulp-rename');
const renderJs = require('./gulp-render-js');
const del = require('del');
const lastRun = require('last-run');

gulp.task('build', gulp.series(buildPages, copyResources));

gulp.task('build:clean', gulp.series(clean, 'build'));

gulp.task('default', gulp.series('build', gulp.parallel(watchPages, watchLayout, watchResources)));


function clean() {
    return del('build/**/*');
}

function buildPages() {
    return gulp.src('./pages/*.md', {since: gulp.lastRun(buildPages)})
        .pipe(frontMatter({
            property: 'meta', // property added to file object
            remove: true // should we remove front-matter header?
        }))
        .pipe(marked())
        .pipe(renderJs({
            layoutDir: './layout'
        }))
        .pipe(rename((path) => {
            path.dirname += '/' + path.basename;
            path.basename = 'index';
            return path;
        }))
        .pipe(gulp.dest('./build'))
}

function copyResources() {
    return gulp.src('./public/*', {since: gulp.lastRun('build')})
        .pipe(gulp.dest('./build'))
}

function watchPages() {
    return gulp.watch(['./pages/*.md'], gulp.parallel(buildPages));
}

function watchResources() {
    return gulp.watch(['./public/*'], gulp.parallel(copyResources));
}

function watchLayout() {
    return gulp.watch(['./layout/**/*', './layout-fragments/**/*'], gulp.parallel(buildPages))
        .on('change', () => {
            lastRun.release(buildPages);
        });
}