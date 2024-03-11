const mongoose = require('mongoose');

function run() {
  // Check databse connection
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
      console.log('Connected to MongoDB');
  });

  //Connect to database
  mongoose.connect(`${process.env.ATLAS_URI}`, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports={run};