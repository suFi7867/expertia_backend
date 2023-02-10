require("dotenv").config();
const UserModel = require("../routes/user/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_TOKEN = process.env.SECRET_TOKEN

const AllUsers = async (req,res)=>{
    try {
        let data = await UserModel.find();
        return res.status(200).send(data);
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
      //  console.log(match, "<AT")
        if (match) {
            //login
            const token = jwt.sign(
                {
                    _id: User._id,
                    email: User.email,
                    username: User.username,
                },
                SECRET_TOKEN,
                {
                    expiresIn: "7 days",
                }
            );
            const refresh_token = jwt.sign(
                {
                    _id: User._id,
                    email: User.email,
                    username: User.username,
                },
                SECRET_TOKEN,
                {
                    expiresIn: "28 days",
                }
            );
          //  console.log(token, SECRET_TOKEN, refresh_token)
            return res
                .status(200)
                .send({ message: "Login success", token, refresh_token, username });
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
        const exsist = await UserModel.findOne({ email });
        if (exsist)
            return res
                .status(403)
                .send({ message: "User Already Created Try Logging in" });

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
            return res
                .status(200)
                .send({ message: "Signup success" });

        });
    } catch (er) {
        return res.status(404).send(er.message);
    }
}

module.exports =  {
    AllUsers, loginUser , registerUser
}




