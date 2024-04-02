const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, "masai", (err, decoded) => {
        if(decoded){
            req.body._id=decoded.userID
             next()
         
        } else {
            res.status(401).send({ msg: "You are not authorized", err });
        }
    });
};

module.exports = {
    auth
};


