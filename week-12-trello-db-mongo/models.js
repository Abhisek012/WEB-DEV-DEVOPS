const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://abhisekprusty018_db_user:*****@ac-peeuyxw-shard-00-00.k0pnoyx.mongodb.net:27017,ac-peeuyxw-shard-00-01.k0pnoyx.mongodb.net:27017,ac-peeuyxw-shard-00-02.k0pnoyx.mongodb.net:27017/trello?ssl=true&replicaSet=atlas-ptxwnp-shard-0&authSource=admin&appName=100xapps"
)
.then(() => {
  console.log(" MongoDB connected successfully");
})
.catch((err) => {
  console.error(" MongoDB connection failed:", err.message);
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

// replace *** with MongoDB password 