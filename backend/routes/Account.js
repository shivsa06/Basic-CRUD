const express = require ('express');
const multer = require ('multer');
const connection = require ('../DBConnection');

let router = express.Router ();

const storage = multer.diskStorage ({
  destination: (req, file, cb) => {
    cb (null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log (file);
    cb (null, `${Date.now ()}_${file.originalname}`);
  },
});
const upload = multer ({storage: storage});

router.post ('/signup', upload.single ('profilePic'), (request, response) => {
  console.log (request.body);
  let profilePicPath = `${request.file.destination}/${request.file.filename}`;
  let insertData = `insert into employee(firstName, lastName, mobileNo, dob, email, ePassword, state, profilePic)
  values('${request.body.firstName}', '${request.body.lastName}', '${request.body.mobileNo}', '${request.body.dob}', '${request.body.email}', '${request.body.password}', '${request.body.state}', '${profilePicPath}')`;

  connection.query (insertData, (error, results) => {
    if (error) {
      response.json (error);
      console.log (error);
    } else {
      response.json ({status: 'Success', msg: 'Account Created Successfully'});
      console.log (results);
    }
  });
});

router.post ('/validateLogin', upload.none (), (request, response) => {
  let emp = `select * from employee where email = '${request.body.email}'`;
  console.log (request.body);
  connection.query (emp, (error, result) => {
    if (error) {
      response.json (error);
      console.log (error);
    } else {
      if (result.length > 0) {
        if (result[0].ePassword == request.body.password) {
          console.log (result);
          let userDetails = result[0];
          console.log (userDetails);
          delete userDetails.ePassword;
          console.log (userDetails);
          response.json ({
            status: 'success',
            isLoggedIn: true,
            details: userDetails,
          });
        } else {
          response.json ({
            status: 'success',
            isLoggedIn: false,
            msg: 'Please Check your password',
          });
        }
      } else {
        response.json ({
          status: 'success',
          isLoggedIn: false,
          msg: 'Please check you emailId',
        });
      }
    }
  });
});

router.put (
  '/editProfile',
  upload.single ('profilePic'),
  (request, response) => {
    console.log (request.body);
    console.log (request.file);

    let profilePicPath = `${request.file.destination}/${request.file.filename}`;
    console.log (profilePicPath);

    let updateEmp = `update employee set firstName = '${request.body.firstName}', lastName = '${request.body.lastName}', mobileNo = '${request.body.mobileNo}', dob = '${request.body.dob}', email = '${request.body.email}', state = '${request.body.state}', profilePic = '${profilePicPath}' where eId = ${request.body.id}`;

    connection.query (updateEmp, (error, results) => {
      if (error) {
        console.log (error);
        response.json (error);
      } else {
        response.json ({
          status: 'success',
          msg: 'Account Updated Successfully',
        });
        console.log (results);
      }
    });
  }
);

router.delete ('/deleteAccount', (request, response) => {
  console.log (request.query);
  let delEmp = `delete from employee where eId = ${request.query.id}`;
  connection.query (delEmp, (error, result) => {
    if (error) {
      console.log (error);
      response.json (error);
    } else {
      response.json ({status: 'Success', msg: 'Account Deleted Successfully'});
      console.log (result);
    }
  });
});

router.get ('/employee', (request, response) => {
  let allEmp = `select * from employee`;
  connection.query (allEmp, (error, result) => {
    if (error) {
      response.json (error);
      console.log (error);
    } else {
      response.json (result);
      console.log (result);
    }
  });
});

module.exports = router;
