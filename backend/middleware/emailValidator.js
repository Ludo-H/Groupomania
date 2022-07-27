// Ce middleware va permettre de valider l'adresse mail à l'inscription (si pas de @ ou .)
const validator = require("validator");


module.exports = (req, res, next)=>{
    // Permet de cibler l'email de la requete sans avoir à ecrire req.body.email
    const {email} = req.body;

    
    if(validator.isEmail(email)){
        next();
    }else{
        return res.status(200).json({error: "Cet email n'est pas valide"})
    }
};