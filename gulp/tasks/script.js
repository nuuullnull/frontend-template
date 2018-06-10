const config = require('../config').script;
const $ = require('../plugins');
const webpackConfig = require('../../webpack.config');

const task = function(){
    let stream = $.webpackStream(webpackConfig, $.webpack)
        .on('error', function handleError() {
            this.emit('end');
        })
        .pipe($.gulp.dest(config.dist))
        .pipe($.browserSync.stream());
    return stream;
}

$.gulp.task('script', () => task());