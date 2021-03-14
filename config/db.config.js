const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("🚀 ~ file: db.config.js ~ line 5 ~ connectDB ~ process.env.MONGO_URI", process.env.MONGO_URI)
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
