
const Notice = require('../models/notice.model');
const getImageFileType =require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll =  async (req, res) => {
  try {
    res.json(await Notice.find().populate('author'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Notice.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.search = async (req, res) => {
  console.log('req.params.searchPhrase',req.params.searchPhrase);
  try {
    console.log(await Notice.find({ title: { $regex: req.params.searchPhrase }}));
    res.json(await Notice.find({ title: { $regex: req.params.searchPhrase }}))
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.addOne = async (req, res) => {

  
  try {
    const { title, text, date, price, location } = req.body;
    const author = req.session.user.id;
    console.log('hello author', author);
    console.log('req.file.filename',req.file.filename)

    const fileType =  req.file ? await getImageFileType(req.file) : 'unknown';

    if(title && typeof title === 'string' 
      && text && typeof text === 'string' 
      && date && typeof date === 'string'
      && price && typeof price === 'string'
      && location && typeof location === 'string'
      && author && typeof author === 'string'
      && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) { 
       
        const newNotice = new Notice({ 
          title: title, 
          text: text,
          date: date,
          price: price,
          location: location,
          image: req.file.filename,
          author: author
        });
        
        await newNotice.save();
        
        return res.json({ message: 'OK' });    
    } else {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      return res.status(400).send({ message: 'Bad request' });
    } 
  } catch(err) {
    fs.unlinkSync(`./public/uploads/${req.file.filename}`);
    return res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
 
  try {
    const updateNotice = {};
    const fileType =  req.file ? await getImageFileType(req.file) : 'unknown';
    
    const dep = await Notice.findById(req.params.id);

    const { title, text, date, price, location} = req.body;

    if (title) updateNotice.title = title;
    if (text) updateNotice.text = text;
    if (date) updateNotice.date = date;
    if (price) updateNotice.price = price;
    if (location) updateNotice.location = location;
    if (req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)){
      fs.unlinkSync(`./public/uploads/${dep.image}`);
      updateNotice.image = req.file.filename;
    }
    
    if(dep) {
      await Notice.updateOne({ _id: req.params.id }, { $set: updateNotice });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await Notice.findById(req.params.id);
    if(dep) {
      await Notice.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(500).json({message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
