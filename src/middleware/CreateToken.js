require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN


const GenerateToken = ({ _id , email , username }) => {

    const token = jwt.sign(
        { _id, email, username },
        SECRET_TOKEN,
        { expiresIn: "7 days" }
    );
    const refresh_token = jwt.sign(
        {_id, email, username },
        SECRET_TOKEN,
        { expiresIn: "28 days" }
    );

    return { token, refresh_token }
}


module.exports = GenerateToken
