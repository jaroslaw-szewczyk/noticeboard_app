const Author = require('../models/author.model');
const bcrypt = require('bcryptjs');

exports.newUser = async (req, res) => {
  try {

    const { userName, password } = req.body;

    if(userName && typeof userName === 'string' && password && typeof password === 'string'){
      const checkIfUserExist = await Author.findOne({ userName })
      if(checkIfUserExist) {
        return res.status(409).send({ message: 'User alredy exists' });
      }

      const user = await Author.create({ userName, password: await bcrypt.hash(password, 10) });
      res.status(201).send({ message: 'User created ' + userName });
    } else {
      res.status(400).send({ message: 'Bad request' });
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

};