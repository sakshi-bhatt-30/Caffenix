// const mongoose = require("mongoose");

// const connectDatabase = async () => {
//   try {
//     const { connection } = await mongoose.connect(process.env.DB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });
//     console.log(`Mongodb connected with server: ${connection.host}`);
//   } catch (error) {
//     console.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1); 
//   }
// };

// module.exports = connectDatabase;
const mongoose = require("mongoose");

const connectDatabase = () => {
  const uri = process.env.DB_URI;

  if (!uri) {
    console.error("MongoDB URI is missing in environment variables!");
    return;
  }

  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1); // Stop the server if MongoDB connection fails
    });
};

module.exports = connectDatabase;
