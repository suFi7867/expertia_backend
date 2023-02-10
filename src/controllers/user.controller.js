require("dotenv").config();
const UserModel = require("../routes/user/user.model");
const bcrypt = require("bcrypt");
const GenerateToken = require("../middleware/CreateToken");


// Get all users / seperate user data  
const AllUsers = async (req,res)=>{
    
    const username = req.body.username

    try {
        if (username) {
            let data = await UserModel.find({username});
            return res.status(200).send(data);
        }else{
            let data = await UserModel.find();
            return res.status(200).send(data);
        }  
    } catch (er) {
        return res.status(404).send(er.message);
    }
}

// Login Route
const loginUser = async (req, res)=>{
    const { username, password } = req.body;

   // console.log(username, password)

    if (!username || !password) {
        return res.status(403).send("Enter Credianteials");
    }

    const User = await UserModel.findOne({ username });
   console.log(User)
    // if (!User) return res.status(404).send("User Not Found");

    try {
        const match = bcrypt.compareSync(password, User.password);
      
        if (match) {
           
            // it will create JWT TOKENS and will return it
            const { token, refresh_token } = GenerateToken({
                _id: User._id,
                email: User.email,
                username: User.username,
            })
           //console.log(tokens)
           
            return res
                .status(200)
                .send({ message: "Login success" ,token, refresh_token, username });
        } else {
            return res.status(401).send({ message: "Authentication Failed" });
        }
    } catch {
        return res.status(401).send({ message: "No User Found" });
    }
}

// Signup Route
const registerUser = async (req, res) => {
    const {
        email,
        password,
        username,
    } = req.body;

console.log(req.body)


    if (!email || !password || !username) {
        return res.status(403).send("Enter Credentails");
    }

    try {
        const exsist = await UserModel.findOne({ username });
        if (exsist)
            return res
                .status(403)
                .send({ message: "UserName already exist ,try Different UserName" });

        bcrypt.hash(password, 6, async function (err, hash) {
            if (err) {
                return res.status(403).send({ message: "Connection has failed" });
            }

            const user = await UserModel({
                email,
                password: hash,
                username ,
                tasks : []
            });

            await user.save();
      
            // it will create JWT TOKENS and will return it
            const { token, refresh_token } = GenerateToken({
                _id: user._id,
                email: user.email,
                username: user.username,
            })

            return res
                .status(200)
                .send({ message: "Signup success", token, refresh_token, username });

        });
    } catch (er) {
        return res.status(404).send(er.message);
    }
}



// Task 
const TaskPost = async (req,res) =>{

    const { username, task ,date ,dateF} = req.body;
    if (!username) return res.status(403).send("Something went wrong");

   try{
        
       const taskObj = { date: "11th Feb, 2023", task, dateF: "11022023" }  
       let addData = await UserModel.updateOne(
           { username },
           { $push: { tasks: taskObj } }
       );

       return res.status(200).send(addData)

   }catch(e){
       return res.status(404).send(er.message);
   }
}



module.exports =  {
    AllUsers, loginUser, registerUser, TaskPost
}




