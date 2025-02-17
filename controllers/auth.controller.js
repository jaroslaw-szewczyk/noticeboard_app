const Author = require('../models/author.model');
const bcrypt = require('bcryptjs');

exports.newUser = async (req, res) => {
  try {

    const { userName, password } = req.body;

    if(userName && typeof userName === 'string' && password && typeof password === 'string'){
      const checkIfUserExist = await Author.findOne({ userName })
      if(userName) {
        return res.status(409).send({ message: 'User alredy exists' });
      }

      const user = Author.create({ userName, password: await bcrypt.hash(password, 10) })
    }

  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  
};

exports.getUser = async (req, res) => {

};