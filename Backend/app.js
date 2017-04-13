
const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
var mongoose = require("mongoose");


var homeController = require('./controllers');
var config = require('./config');
var templateController = require('./controllers/template');

mongoose.connect(config.dbUrl);

// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            },
            cors: true
        }
    }
});
server.connection({ 
    host: 'localhost', 
    port: 8000

    
});



server.register(Inert, () => {});



server.register(require('vision'), (err) => {

    // Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('ejs')
        },
        relativeTo: __dirname,
        path: 'views',
        helpersPath : 'public'
    });
});


server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});


// Add the route
server.route({
    method: 'GET',
    path:'/', 
    handler:  {
    	view: 'angular'
        // return reply('hello world');
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
});




server.route({
    method: 'GET',
    path:'/templates', 
    handler:  templateController.index
});

server.route({
    method: 'POST',
    path:'/templates', 
    handler:  templateController.create,
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
});

server.route({
    method: 'GET',
    path:'/templates/{id}', 
    handler:  templateController.show
});

server.route({
    method: 'PUT',
    path:'/templates/{id}', 
    handler:  templateController.update
});

server.route({
    method: 'DELETE',
    path:'/templates/{id}', 
    handler:  templateController.delete
});


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at: 8000');
});