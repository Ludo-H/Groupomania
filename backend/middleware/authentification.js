// Ici on va gérer l'authentification par TOKEN pour protéger les routes
// Importations
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = (req, res, next)=>{
try{
    
// On va dabord récupérer le token qui a été envoyé depuis le FE  
// Il se trouve dans req->headers: {authorization : bearer token}
// const token = req.headers.authorization.split(" ")[1]; // On split bearer et token et on garde que token
const token = req.cookies.jwt; 

// On va ensuite décoder le token
const decodedToken = jwt.verify(token, process.env.JWT_KEY);  


// On va récupérer le userId présent dans le token déchiffré
const userId = decodedToken.userId;

const admin = decodedToken.admin;

// On créé des données qui vont être utilisées lors des requetes dans les controllers, pour les permettre ou non
// En accédant aux infos userId et statut de l'user
req.auth = {userId, admin};



// On va verifier si l'id qui créé la requete correspond à l'id qu'il y a dans le token en clair
if(req.body.userId && req.body.userId !== userId){
    // Sinon je créé une erreur
    throw "UserId invalide"
}else{
    // Si l'userId de la requete correspond à l'userId du token on passe au middleware suivant
    next();
}


// Les erreurs du try seront récupérées ici
}catch(error){
    
    res.status(401).json({
        message : "Echec d'authentification",
        error : error
    });
}
};





// const db = require('../config/database').getDB();
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;
//         if (token) {
//             const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
//             const myID = decodedToken.id;
//             const sql = `SELECT id FROM users WHERE id='${myID}'`;
//             db.query(sql, (err, result) => {
//                 if (err) {
//                     res.status(400).json({err});
//                 }
//                 else {
//                     next()
//                 }
//             });
//         }
//         else {
//             res.clearCookie();
//             res.status(400).json({error: 'No token'});
//         }
//     }
//     catch (error) {
//         res.clearCookie();
//         res.status(400).json({error});
//     }
// }