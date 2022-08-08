// Importation bcrypt
const bcrypt = require("bcrypt");

// Importation de crypto.js pour chiffre le mail
const cryptoJS = require('crypto-js');

// Importation de JWT
const jwt = require("jsonwebtoken");

// Importation de dotenv pour utiliser variable d'environnement
require("dotenv").config();

// On pourra utiliser directement database.query(...)
const database = require("../database/database").getDatabase();

const fs = require('fs');



//********************************************************************/
exports.signup = async (req, res) => {
    try {
        // On crypte le mail
        const emailCryptoJS = cryptoJS.HmacSHA256(req.body.email, process.env.CHIFFREMENT_EMAIL).toString();
        // On crypte le MDP
        const passwordCrypt = await bcrypt.hash(req.body.password, 10);
        // On créé un nouvel user
        const newUser = {
            user_email: emailCryptoJS,
            user_password: passwordCrypt,
            user_firstname: req.body.firstname,
            user_lastname: req.body.lastname
        };
        // On créé la requete 
        const sql = "INSERT INTO users SET ?";
        database.query(sql, newUser, (error, result) => {

            if (error) {
                res.status(200).json({message : 'Email déjà créé', error});
            } else {
                res.status(200).json("Utilisateur créé !");
            }
 
        });
    } catch (error) {
        res.status(400).json("Erreur création compte " + error);
    };
};
//********************************************************************/


//********************************************************************/
exports.login = (req, res) => {
    try {
        // On crypte le mail
        const emailCryptoJS = cryptoJS.HmacSHA256(req.body.email, process.env.CHIFFREMENT_EMAIL).toString();
        // On créé la requète
        const sql = "SELECT * FROM users WHERE user_email = ?";
        database.query(sql, emailCryptoJS, async (error, result) => {
            // Si l'index 0 de result est faux
            if (!result[0]) {
                res.status(200).json('Email incorrect');
                // Sinon
            } else {
                // On compare le MDP entré et celui dans la BDD correspondant
                const passwordControl = await bcrypt.compare(req.body.password, result[0].user_password);
                // Si le passwordControl est faux
                if (!passwordControl) {
                    res.status(200).json("Mot de passe incorrect");
                    // Sinon
                } else {
                    // On créé la const token pour pouvoir l'utiliser
                    // On retrouve l'userId et le role admin de l'user dans le token, dans le middleware on s'en sert, et va permettre les droits plus tard
                    const token = jwt.sign(
                        { userId: result[0].user_id, admin: result[0].user_isadmin },
                        process.env.JWT_KEY,
                        { expiresIn: "24h" }
                    );
                    // On stocke le token dans les cookies
                    res.cookie("jwt", token);

                    // On envoie en réponse à la connexion des infos sur l'user et son token
                    res.status(200).json({
                        userId: result[0].user_id,
                        admin: result[0].user_isadmin,
                        token: token
                    });
                };
            };
        });
    } catch (error) {
        res.status(400).json("Erreur connexion au compte " + error);
    };
};
//********************************************************************/


//********************************************************************/
exports.deleteAccount = async (req, res) => {
    try {
            // Pour pouvoir modifier, soit admin soit bon user
            if (req.auth.userId == req.params.id || req.auth.admin == 1) {
                const sql = "DELETE FROM users WHERE user_id = ?";
                const userId = req.params.id;
                database.query(sql, userId, (error, result) => {
                    if (!result) throw error;
                    res.status(200).json("Compte supprimé");
                });
            } else {
                res.status(400).json("Action non autorisée");
            }
    } catch (error) {
        res.status(400).json("Erreur suppression compte " + error);
    };
};
//********************************************************************/


//********************************************************************/
exports.logout = async (req, res) => {
    try {
        // Sans le token la connexion n'est plus possible
        res.clearCookie("jwt");
        res.status(200).json("Utilisateur déconnecté");
    } catch (error) {
        res.status(400).json("Erreur déconnexion compte " + error);
    };
};
//********************************************************************/


//********************************************************************/
exports.getOneUser = async (req, res) => {
    try {
        // On isole la requete
        const sql = "SELECT * FROM users WHERE user_id = ?";
        // On stocke l'id voulu de la requete
        const userId = req.params.id;
        database.query(sql, userId, (error, result) => {
            if (error) throw error;
            // On sélectionne les infos de l'user que l'on souhaite retourner 
            const userInfos = {
                firstname: result[0].user_firstname,
                lastname: result[0].user_lastname,
                photo: result[0].user_photo,
                inscription: result[0].user_createdat,
                userId: result[0].user_id,
                bio: result[0].user_bio
            };
            res.status(200).json(userInfos); 
        });
    } catch (error) {
        res.status(400).json("Erreur affichage utilisateur " + error); 
    };
};
//********************************************************************/


//********************************************************************/
exports.getAllUsers = async (req, res) => {
    try {
        const sql = "SELECT * FROM users ORDER BY user_lastname ASC";

        database.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({ err });
            }
            if (result.length === 0) {
                res.status(200).json({ message: "Aucuns utilisateurs !" })
            }
            res.status(200).json(result)
        })

    } catch (error) {
        res.status(400).json("Erreur affichage utilisateurs " + error); 
    }

};
//********************************************************************/ 


//********************************************************************/ 
exports.modifyPhotoProfil = async (req, res) => {
    try {
            // Pour pouvoir modifier, soit admin soit bon user
            if (req.auth.userId == req.params.id || req.auth.admin == 1) {
                // Modification si il y a une image dans les changements user
                    let sql = `SELECT * FROM users WHERE user_id = ?`;
                    database.query(sql, req.params.id, (error, result) => {
                        if (error) res.status(400).json("Erreur affichage user avec image " + error);
                                // On recréé le nom de l'image sans le chemin avant
                                console.log(req.file);
                                const imageToDelete = result[0].user_photo.split('/images')[1];
    
                                // On supprime l'image du dossier node
                                fs.unlink(`images/${imageToDelete}`, () => {
                                    if (error) console.log("Erreur de suppression image dans le dossier " + error); 
                                    console.log('Image supprimée du dossier');
                                })
    
                                // On créé le contenu pour insérer la nouvelle image
                                const newImage = {
                                    user_photo: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
                                };
    
                                // Requete pour remplacer l'ancienne image par la nouvelle dans la BDD, sans recréer d'id
                                const sqlImage = `UPDATE users SET ? WHERE user_id = ${req.params.id}`;
                                database.query(sqlImage, newImage, (error, result) => {
                                    if (error) res.status(400).json(error);
                                    res.status(200).json("Photo User mis à jour !");
                                });
                            })
            } else {
                res.status(400).json("Action non autorisée");
            }
    } catch (error) {
        res.status(400).json("Erreur affichage utilisateurs " + error);
    }
};
//********************************************************************/ 


//********************************************************************/ 
exports.modifyNameAndLastname = (req, res)=>{
    try {
        if (req.auth.userId == req.params.id || req.auth.admin == 1) {
            const updateInfos = {
                user_firstname: req.body.firstname,
                user_lastname: req.body.lastname
            };
            console.log(req.body);
            const sql = `UPDATE users SET ? WHERE user_id = ${req.params.id}`;
            database.query(sql, updateInfos, (error, result) => {
                if (error) res.status(400).json("Erreur de changement infos user " + error);
                res.status(200).json("Modifications user à jour");
            });
        }else{
            res.status(400).json("Action non autorisée");
        }
        
    } catch (error) {
        res.status(400).json("Erreur modification nom et prénom " + error);
    }
}
//********************************************************************/ 