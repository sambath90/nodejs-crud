var express = require('express');
var router = express.Router();
var Student = require("../modules/StudentData");
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/readall',getallstudents);
router.get('/read/:id',getstudent);
router.post('/create', addstudent);
router.put('/update/:id',updatestudent);
router.delete('/delete/:id',deletestudent);

module.exports = router;

function getallstudents(req,res){

  //Get All student list from database
    Student.getAllStudents(function(e,o){
      res.json(o);
    });

}
function getstudent(req, res){

  Student.getStudent(req.params.id,function(e,o){
     if(!e){
     res.json(o);
  }
  else{
   	res.status(400).send(e);
  }

});
}

function addstudent(req,res){
   // res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");

 Student.addNewStudent(req.body,function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
}


function updatestudent(req, res){

  Student.updateStudent({ body : req.body, id : req.params.id},function(e,o){
    if(e){
      res.status(400).send(e);
    }
    else
    {
      res.status(200).send(o);
    }
  
  });
}
function deletestudent(req, res){
Student.deleteStudent(req.params.id, function(e, o){
			if (!e){
  			res.status(200).send('record deleted');
			}	else{
				res.status(400).send('record not found');
			}
	    });
}