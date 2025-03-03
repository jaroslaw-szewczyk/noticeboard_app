const Author = require('../models/author.model');
const Session = require('../models/session.model');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

exports.newUser = async (req, res) => {
  try {

    const { username, password, phoneNumber } = req.body;
    
    if(!req.file){
      return res.status(400).send({ message: 'Bad request' });
    }

    const fileType =  req.file ? await getImageFileType(req.file) : 'unknown';

    if(username && typeof username === 'string' 
      && password && typeof password === 'string' 
      && phoneNumber && typeof phoneNumber === 'string'
      && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)){
        
        const checkIfUserExist = await Author.findOne({ username })
        if(checkIfUserExist) {
          fs.unlinkSync(`./public/uploads/${req.file.filename}`);
          return res.status(409).send({ message: 'User alredy exists' });
        }

        const user = await Author.create({ 
          username, 
          password: await bcrypt.hash(password, 10), 
          avatar: req.file.filename, 
          phoneNumber: phoneNumber 
        });
        res.status(201).send({ message: 'User created: ' + user.username });
      } else {
        fs.unlinkSync(`./public/uploads/${req.file.filename}`);
        res.status(400).send({ message: 'Bad request' });
      }

  } catch(err) {
    fs.unlinkSync(`./public/uploads/${req.file.filename}`);
    res.status(500).send({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if(username && typeof username === 'string' && password && typeof password === 'string'){
      const user = await Author.findOne({ username });
      
      if(!user) {
        res.status(400).send({ message: 'Login or password are incorect'})
      } else {
        if(bcrypt.compareSync(password, user.password)) {
          
          req.session.user = { 
            id: user._id.toString(),
            username: user.username,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar
          };

          // req.session.cookie.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
          

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
  if (!req.session.user) {
    return res.status(401).json({ error: "Brak sesji" });
  }
  const { _id, username, phoneNumber, avatar } = req.session.user;
  res.status(200).send({ _id, username, phoneNumber, avatar});
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