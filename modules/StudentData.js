var config = require('../config.json');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });


var tblStudent = db.collection('Students');

exports.getAllStudents =function (callback){
    tblStudent.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

exports.getStudent =function (id,callback){
    tblStudent.findById(id, function(e, o){
         if(o){
            callback(o)
         }else{
         callback("record not found");
         }
     });
}

exports.addNewStudent = function(newData, callback)
{
	tblStudent.findOne({Name:newData.Name}, function(e, o) {
		if (o){
			callback('Student already exist');
		}	else{
			tblStudent.insert(newData, {safe: true}, callback);
		}
	});
}
exports.updateStudent = function(req, callback)
{
    //console.log(req);
    tblStudent.findById(req.id, function(e, o){
        if(o){
		o.Name 		= req.body.Name;
		o.Age 	    = req.body.Age;
		o.class 	= req.body.class;
        o.place 	= req.body.place;
			tblStudent.save(o, {safe: true}, function(e) {
				if (e)
                {
                     callback(e);
                }
				else{ 
                    callback(null,o);
                }
			});
        }
        else{
            callback("unable to update");
        }
    });

}
exports.deleteStudent = function(id, callback)
{
    tblStudent.findById(id,function(e,o){
        if(o){
        tblStudent.remove(o, callback);
    }
    
    });
	
}