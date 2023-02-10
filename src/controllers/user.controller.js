const { model } = require("mongoose");
const UserModel = require("../routes/user/user.model");


const AllUsers = async (req,res)=>{
    try {
        let data = await UserModel.find();
        return res.status(200).send(data);
    } catch (er) {
        return res.status(404).send(er.message);
    }
}

const registerUser = async (req, res)=>{
    res.status(200).send("DONE")
}

const loginUser = async (req, res) => {
    res.status(200).send("DONE")
}

module.exports =  {
    AllUsers, loginUser , registerUser
}