const jwt = require("jsonwebtoken");
const UserModel = require("../routes/user/user.model");


const privateRoute = async(req,res, next)=>{

    let authToken;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        try{
            authToken = req.headers.authorization.split(" ")[1]

            // Verify the JWT Token
            const decodedtoken = jwt.verify(authToken, process.env.SECRET_TOKEN)

            // Get the user Data from the TOKEN => .select(-password will not include password)
            req.user = await UserModel.findById(decodedtoken.id).select("-password")
            next()

        }catch(e){
         return res.status(401).send({message : "Not Authorized"})
        }

    }

    if(!authToken){
        return res.status(401).send({ message: "Not Authorized" })
    }

}


module.exports = {
    privateRoute
}