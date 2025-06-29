
require('dotenv').config(); // 👈 this is crucial
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(() => {
  console.log("MongoDB Connected...");
})
.catch((err) => {
  console.log('MongoDB Connection Error: ', err);
});
//zX6FqwrAjvtAT2ph
//4AvnodtPffmduV6G
