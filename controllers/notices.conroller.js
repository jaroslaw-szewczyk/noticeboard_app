
const Notice = require('../models/notice.model');

exports.getAll =  async (req, res) => {
  try {
    res.json(await Notice.find());
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
  try {
    console.log(req.params.searchPhrase);
    res.json(await Notice.find({ title: { $regex: req.params.searchPhrase }}))
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.addOne = async (req, res) => {
  try {
    const { title, text, date, price, location, image, author } = req.body;
    const newNotice = new Notice({ 
      title: title, 
      text: text,
      date: date,
      price: price,
      location: location,
      image: image,
      author: author
    });
    await newNotice.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const updateNotice = {};
    const { title, text, date, price, location, image, author } = req.body;
  
    if (title) updateNotice.title = title;
    if (text) updateNotice.text = text;
    if (date) updateNotice.date = date;
    if (price) updateNotice.price = price;
    if (location) updateNotice.location = location;
    if (image) updateNotice.image = image;
    if (author) updateNotice.author = author;
    
    const dep = await Notice.findById(req.params.id);

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
