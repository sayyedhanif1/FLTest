
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var Template = require('../model/template')

exports.create = function(req, res){
    var template = new Template(req.payload);

    template.save(function(err,template){
        if(err){
            if(err.code===11000){
                //res.redirect( '/user/new?exists=true' );
                res(500, {error: 'Template already exist with this name!'});
            } else{             
                res(500, {error: 'error in creating template!'});
            }
        } else{
        //res.redirect('/users/index');
        res(template);
    }
  });
};

exports.index= function(req,res){
    Template.find({},function(err,templates){
        if (!err){
            res(templates);
        }
    });
}; 

exports.show = function(req,res){
    if(req.params.id){
        Template.findById(req.params.id,
        function(err,template){
            if(!err){          
                res(template);
            }
        });
    }
};


exports.delete = function(req,res){  
    if(req.params.id){
        Template.findById(req.params.id, function(err,template){
            if(!err){
                template.remove();
                res(template);
            }
        });
    }
};

exports.update = function(req, res, next) {
    if(req.params.id){
        Template.findById(req.params.id, function(err,template){
            if(err) { console.log('error'); return next(err)};
              if(template){
                template.name = req.payload.name;
                template.version =  req.payload.version;
                template.content = req.payload.content;
                      
                template.save( function(err){
                  if(!err){
                    res(template);
                  }
                  else {
                    console.log(err);
                    res(500, {error: err});
                  }
                });        
            } 
        });   
    }
};
