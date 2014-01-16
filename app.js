var underscore = require("underscore");
var Hapi = require("hapi");
var Joi = require("joi");

// Create a server with a host, port, and options
var server = new Hapi.Server("0.0.0.0", 3000);

var store = {
    "firstitem": "value of first item"
};

// POST
server.route({
    "method": "POST",
    "path": "/store/{key}",
    "config": {
        "validate": {
            "path": {
                "key": Joi.string().alphanum()
            },
        },
        "payload": {
            "mode": "raw",
            "allow": "application/octet-stream"
        },
        "handler": function(request) {
            "use strict";
            store[request.params.key] = request.rawPayload;
            request.reply();
        }
    }
});
// DEL
server.route({
    "method": "DEL",
    "path": "/store/{key}",
    "config": {
        "validate": {
            "payload": false,
            "path": {
                "key": Joi.string().alphanum()
            },
        },
        "handler": function(request) {
            "use strict";
            store[request.params.key] = undefined;
            request.reply();
        }
    }
});

// GET
server.route({
    "method": "GET",
    "path": "/store/{key}",
    "config": {
        "validate": {
            "payload": false,
            "path": {
                "key": Joi.string().alphanum()
            },
        },
        "handler": function(request) {
            "use strict";
            var value = store[request.params.key];
            if (underscore.isUndefined(value)) {
                request.reply(Hapi.error.notFound());
            }
            else {
                request.reply(value);
            }
        }
    }
});

server.route({
    "method": "GET",
    "path": "/store",
    "config": {
        "validate": {
            "payload": false,
            "path": {
                "key": Joi.string().alphanum()
            },
        },
        "handler": function(request) {
            "use strict";
            var keys = underscore.keys(store)
            request.reply(keys);

        }
    }
});

// Add a route
server.route({
    "method": "GET",
    "path": "/hello",
    "config": {
        "handler": function (request) {
            "use strict";
            request.reply({ "greeting": "hello world~" });
        }
    }
});

// Start the server
server.start(function() {
    "use strict";
    console.log("Server started");
});