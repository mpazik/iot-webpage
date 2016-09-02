'use strict';

const Stream = require('stream');
const path = require('path');
const decache = require('decache');

const pluginName = 'gulp-render-js';

module.exports = function render(options) {
    options = options || {};

    const properties = Object.assign({
        layoutDir: 'layout',
        metaKey: 'meta',
        layoutKey: 'layout'
    }, options);

    var stream = Stream.Transform({objectMode: true});
    stream._transform = function (file, unused, done) {
        // Only buffer is supported
        if (file.isNull()) {
            stream.push(file);
            done();
            return;
        }
        if (!file.isBuffer()) {
            stream.emit('error', new Error(`${pluginName}: streams are not supported`));
            return done();
        }

        const metadata = file[properties.metaKey];
        if (metadata == null) {
            stream.emit('error', new Error(`${pluginName}: file: ${file.path}, does not have defined metadata`));
            return done();
        }

        const layoutName = metadata[properties.layoutKey];
        if (layoutName == null) {
            stream.emit('error', new Error(`${pluginName}: file: ${file.path}, does not have defined layout field in metadata`));
            return done();
        }

        Object.assign({}, file.meta);

        const layoutPath = path.format({
            dir: properties.layoutDir,
            base: layoutName,
            ext: 'js'
        });
        const layout = require(layoutPath);
        const renderData = Object.assign({}, metadata, {content: file.contents});
        file.contents = new Buffer(layout(renderData));
        decache(layoutPath);

        stream.push(file);
        done();
    };
    return stream;
};
