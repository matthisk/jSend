(function(global) {
    var jSendPlugin = function($) {
        var jSend = function(config) {
            if( ! config.url ) throw new Error("No url supplied to jSend");

            var config = $.extend({
                throwError : true
            },config);

            var SUCCESS = 'success',
                FAIL    = 'fail',
                ERROR   = 'error',
                ERROR_STRING = 'The returned object was not in jSend format, use normal ajax to request it: ';

            var deferred = new $.Deferred(),
                self = this;

            $.ajax({
                url : config.url,
                type : config.type || "POST",
                data : config.data || null
            })
                .done(function(jsend) {
                    if( ! jsend.status ) throw new Error(ERROR_STRING,jsend);

                    switch(jsend.status) {
                        case SUCCESS:
                            deferred.resolve(jsend);
                            break;
                        case FAIL:
                            if( ! jsend.data ) throw new Error(ERROR_STRING,jsend);
                            deferred.reject(jsend);
                            if( config.throwError ) throw new Error('Some of the supplied data to the url: ' + config.submit_url + ' was incorrect. Failed with return: ' + jsend.data);
                            break;
                        case ERROR:
                            if( ! jsend.message ) throw new Error(ERROR_STRING,jsend);
                            deferred.reject(jsend);
                            if( config.throwError ) throw new Error('A server side error ocurred with message: ' + jsend.message);
                            break;
                        default:
                            throw new Error(ERROR_STRING,jsend);
                            break;
                    }
                })
                .fail(function(data) {
                    deferred.reject({
                        status : 'error',
                        message : 'The server responded with an error: ' + data.statusText
                    });
                    if(config.throwError) throw new Error("jSend got an http error with data: " + data.statusText);
                });

            return deferred.promise();
        }

    	return jSend;
    };

    if(typeof(define) === 'function' && define.amd) {
        define(["jquery"],jSendPlugin);
    } else {
        if(! global.jQuery) throw new Error("The jSend plugin require jQuery in the global namespace");
        jSendPlugin(global.jQuery);
    }
})(this);