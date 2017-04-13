var mongoose= require("mongoose");


/* ********************************************
Templates SCHEMA
******************************************** */

var templateSchema = mongoose.Schema({
 	name: {type: String, unique :true},
 	version: String,
 	content: String
});


// Build the template model and export it
module.exports = mongoose.model('Template', templateSchema);

