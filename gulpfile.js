const gulp = require('gulp');
const frontMatter = require('gulp-front-matter');
const marked = require('gulp-marked');
const rename = require('gulp-rename');
const renderJs = require('./gulp-render-js');
const del = require('del');
const lastRun = require('last-run');
const webserver = require('gulp-webserver');
const AwsPublish = require('gulp-awspublish');

const path = {
    pages: './pages/*.md',
    layout: './layout',
    layoutFiles: './layout/**/*',
    layoutFragmentFiles: './layout-fragments/**/*',
    publicFiles: './public/**/*',
    build: './build',
    buildFiles: './build/**/*',
    prodFiles: './prod/**/*',
    dist: './dist',
    distFiles: './dist/**/*'
};

gulp.task('build', gulp.series(buildPages, copyResources, createIndex));

gulp.task('build:clean', gulp.series(clean, 'build'));

gulp.task('default', gulp.series('build', gulp.parallel(watchPages, watchLayout, watchResources, runWebserver)));

gulp.task('build:dist', gulp.series(cleanDist, 'build:clean', copyToDist, overrideByProdFiles));

gulp.task('publish', gulp.series('build:dist', publishToAws));

function clean() {
    return del(path.build);
}

function buildPages() {
    return gulp.src(path.pages, {since: gulp.lastRun(buildPages)})
        .pipe(frontMatter({
            property: 'meta', // property added to file object
            remove: true // should we remove front-matter header?
        }))
        .pipe(marked())
        .pipe(renderJs({
            layoutDir: path.layout
        }))
        .pipe(rename((path) => {
            path.dirname += '/' + path.basename;
            path.basename = 'index';
            return path;
        }))
        .pipe(gulp.dest(path.build))
}

function copyResources() {
    return gulp.src(path.publicFiles, {since: gulp.lastRun('build')})
        .pipe(gulp.dest(path.build))
}

function createIndex() {
    return gulp.src(path.build + '/registration/index.html')
        .pipe(gulp.dest(path.build))
}

function watchPages() {
    return gulp.watch([path.pages], gulp.series(buildPages, createIndex));
}

function watchResources() {
    return gulp.watch([path.publicFiles], gulp.parallel(copyResources));
}

function watchLayout() {
    return gulp.watch([path.layoutFiles, path.layoutFragmentFiles], gulp.series(buildPages, createIndex))
        .on('change', () => {
            lastRun.release(buildPages);
        });
}

function runWebserver() {
    gulp.src('build')
        .pipe(webserver({
            livereload: false
        }));
}

function cleanDist() {
    return del(path.dist);
}

function copyToDist() {
    return gulp.src(path.buildFiles)
        .pipe(gulp.dest(path.dist));
}

function overrideByProdFiles() {
    return gulp.src(path.prodFiles)
        .pipe(gulp.dest(path.dist));
}

function publishToAws() {
    process.env['AWS_PROFILE'] = 's3_deploy';

    const publisher = AwsPublish.create({
        region: 'eu-central-1',
        params: {
            Bucket: 'islesoftales.com'
        }
    });

    var headers = {
        // Enable cache when files will be versioned, for now it's only symbolic minute
        'Cache-Control': 'max-age=60, no-transform, public'
    };

    return gulp.src(path.distFiles)
        .pipe(AwsPublish.gzip())
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache())
        .pipe(AwsPublish.reporter());
}