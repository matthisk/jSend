# jSend Ajax
=========

Very simple wrapper for jQuery ajax, which validates the result according to the unoffical [jSend](http://labs.omniti.com/labs/jsend) spec. For more information on the spec check their site.

## Usage

### Calling

You can supply all the normal attributes you do to jQuery.ajax:

```
jSend({
	type : "POST",
	url : "http://someurl.com",
	data : {}
})
```

You can turn on error throwing when the returned object is not in valid jSend format:

```
throwError : true
```

jSend returns a promise so you can call .done and .fail on the returned object. The deferred is rejected if the received object is not in valid jSend format, with a correct error message.

### Require js

You could either load the plugin via requirejs or just include the script file in your dom. The only dependecy is jquery.

