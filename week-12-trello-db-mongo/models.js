const mongoose = require("mongoose");

/// schemas and models

const userSchema = mongoose.Schema({
    username: username,
    password: password
})

const organisationSchema = mongoose.Schema({
    
    title: string,
    description: string,
    admin: mongoose.Types.ObjectId,
    members: [mongoose.Types.ObjectId],
})

const organisationModel = mongoose.model("organisations", organisationSchema);
const userModel = mongoose.model("users", userSchema)

module.exports = {
    organisationModel,
    userModel
}