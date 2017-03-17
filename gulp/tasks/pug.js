'use strict';

module.exports = function () {
    $.gulp.task('pug', function () {
        //return $.gulp.src('./source/template/pages/*.pug')
        return $.gulp.src('./views/pages/*.pug')
            .pipe($.gp.pug({pretty: true}))
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Pug',
                    message: error.message
                }
            }))
            .pipe($.gulp.dest($.config.root));
    });
};
