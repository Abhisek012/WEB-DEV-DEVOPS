const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://abhisekprusty018_db_user:rbARyx6cERqSAx6J@100xapps.a0fraxf.mongodb.net/trello"
)
.then(() => {
  console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});

/// schemas and models

const userSchema = mongoose.Schema({
    username: String,
    password: String
})
//  |
//by default mongodb has id fiels i.e. (_id)
//  |
 
const organisationSchema = mongoose.Schema({
    
    title: String,
    description: String,
    admin : mongoose.Types.ObjectId,
    members: [mongoose.Types.ObjectId],
})

const organisationModel = mongoose.model("organisations", organisationSchema);
const userModel = mongoose.model("users", userSchema)

module.exports = {
    organisationModel,
    userModel
}