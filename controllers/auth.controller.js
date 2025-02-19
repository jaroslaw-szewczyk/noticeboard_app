const Author = require('../models/author.model');
const Session = require('../models/session.model');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

exports.newUser = async (req, res) => {
  try {

    const { userName, password, phoneNumber } = req.body;
  
    const fileType =  req.file ? await getImageFileType(req.file) : 'unknown';

    if(userName && typeof userName === 'string' 
      && password && typeof password === 'string' 
      && phoneNumber && typeof phoneNumber === 'string'
      && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)){

        const checkIfUserExist = await Author.findOne({ userName })
        if(checkIfUserExist) {
          return res.status(409).send({ message: 'User alredy exists' });
        }

        const user = await Author.create({ 
          userName, 
          password: await bcrypt.hash(password, 10), 
          avatar: req.file.filename, 
          phoneNumber: phoneNumber 
        });
        res.status(201).send({ message: 'User created: ' + user.userName });
      } else {
        res.status(400).send({ message: 'Bad request' });
        fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      }

  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if(userName && typeof userName === 'string' && password && typeof password === 'string'){
      const user = await Author.findOne({ userName });

      if(!user) {
        res.status(400).send({ message: 'Login or password are incorect'})
      } else {
        if(bcrypt.compareSync(password, user.password)) {
          req.session.login = user;
  
          res.status(200).send({ message: 'Login successful' });
        } else {
          res.status(400).send({ message: 'Login or password are incorect'})
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }

  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  const {_id, userName, phoneNumber, avatar} = req.session.login
  res.status(200).send({ _id, userName, phoneNumber, avatar});
};

exports.logOut = async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "production"){
      await Session.deleteMany({});
      // req.session.destroy();
      res.status(200).send({ message: 'You are log out' });
    }
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
  // req.session.destroy();
};