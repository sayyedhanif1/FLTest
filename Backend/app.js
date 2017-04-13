const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');
var mongoose = require("mongoose");

var homeController = require('./controllers');
var config = require('./config');
var templateController = require('./controllers/template');

// connnect mongoDB database
mongoose.connect(config.dbUrl);

// Create a server
const server = new Hapi.Server({
    connections: {
        routes: {            
            cors: true
        }
    }
});

server.connection({ 
    host: 'localhost', 
    port: 8000    
});

server.register(Inert, () => {});

// setup for views engine for html page rendering
server.register(require('vision'), (err) => {
    server.views({
        engines: {
            html: require('ejs')
        },
        relativeTo: __dirname,
        path: 'views'
    });
});

// setup for public js/image/css file
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: Path.join(__dirname, 'public'),
            redirectToSlash: true,
            index: true
        }
    }
});


// Render html file for home route
server.route({
    method: 'GET',
    path:'/', 
    handler:  {
    	view: 'angular'
    }
});



server.route({
    method: 'GET',
    path:'/templates', 
    handler:  templateController.index
});

server.route({
    method: 'POST',
    path:'/templates', 
    handler:  templateController.create
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
    console.log('Server running at: ', server.info.uri);
});