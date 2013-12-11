var Hapi = require("hapi");

// Create a server with a host, port, and options
var server = new Hapi.Server("0.0.0.0", 3000);

// Add a route
server.addRoute({
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