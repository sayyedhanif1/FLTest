
/*
 * GET users listing.
 */
var mongoose = require('mongoose');
var Template = require('../model/template')

exports.create = function(req, res){
    var template = new Template(req.body);

    template.save(function(err,template){
        if(err){
            if(err.code===11000){
                //res.redirect( '/user/new?exists=true' );
                res.json(500, {error: 'Template already exist with this name!'});
            } else{             
                res.json(500, {error: 'error in creating template!'});
            }
        } else{
        //res.redirect('/users/index');
        res.json(template);
    }
  });
};

exports.index= function(req,res){
    Template.find({},function(err,templates){
        if (!err){
            res.json(templates);
        }
    });
}; 

exports.show = function(req,res){
    if(req.params.id){
        Template.findById(req.params.id,
        function(err,template){
            if(!err){          
                res.json(template);
            }
        });
    }
};


exports.delete = function(req,res){  
    if(req.params.id){
        Template.findById(req.params.id, function(err,template){
            if(!err){
                template.remove();
                res.json(template);
            }
        });
    }
};

exports.update = function(req, res, next) {
    if(req.params.id){
        Template.findById(req.params.id, function(err,template){
            if(err) { console.log('error'); return next(err)};
              if(template){
                template.name = req.body.name;
                template.version =  req.body.version;
                template.content = req.body.content;
                      
                template.save( function(err){
                  if(!err){
                    res.json(template);
                  }
                  else {
                    console.log(err);
                    res.json(500, {error: err});
                  }
                });        
            } 
        });   
    }
};
