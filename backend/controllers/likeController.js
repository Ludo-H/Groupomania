// On pourra utiliser directement database.query(...)
const database = require("../database/database").getDatabase();


//********************************************************************/
exports.likePost = async (req, res) => {
    try {
        // On créé le like
        const infosLike = {
            user_id: req.auth.userId,
            post_id: req.body.postId
        };
        
        // On veut d'abord afficher le like pour voir si il existe
        const sql = `SELECT * FROM likes WHERE user_id = ${infosLike.user_id} AND post_id = ${infosLike.post_id}`;
        database.query(sql, (error, result) => {
            if (error) res.status(400).json("Erreur de requete affichage like " + error);
            // Si le contenu est vide (pas de like)
            if (result.length === 0) {
                // Alors on insère un like correspondant à l'user qui a cliqué sur le post en question
                const sqlAddLike = `INSERT INTO likes (user_id, post_id) VALUES (${infosLike.user_id}, ${infosLike.post_id})`;
                database.query(sqlAddLike, (error, result) => {
                    if (error) res.status(400).json("Erreur ajout du like " + error);
                    console.log('+1');
                    res.status(200).json("Like ajouté !")
                });
                // Si result renvoi du contenu (le like est dejà présent)
            } else {
                // Alors on le supprime (en recliquant dessus)
                const sqlRemoveLike = `DELETE FROM likes WHERE user_id = ${infosLike.user_id} AND post_id = ${infosLike.post_id}`;
                database.query(sqlRemoveLike, (error, result) => {
                    if (error) res.status(400).json("Erreur remove like " + error);
                    console.log('-1');
                    res.status(200).json("Like supprimé")
                });
            };
        });
    } catch (error) {
        res.status(400).json("Erreur like du post " + error);
    };
};
//********************************************************************/


//********************************************************************/
exports.totalLikes = async (req, res) => {
    try {
        // On veut afficher tous les like d'un post
        const sql = `SELECT * FROM likes`
        // `SELECT * FROM likes WHERE post_id = ${req.params.id}`;
        database.query(sql, (error, result) => {
            if (error) res.status(400).json("Erreur affichage des likes du post " + error);
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(400).json("Erreur création user dans totalLikes " + error);
    };
};
//********************************************************************/



exports.addLike = async (req, res) => {
    try {
        const sql = `INSERT INTO posts (post_likers) VALUES (${req.params.id})`
        // `SELECT * FROM likes WHERE post_id = ${req.params.id}`;
        database.query(sql, (error, result) => {
            if (error) res.status(400).json("Erreur d'ajout like au post " + error);
            res.status(200).json(result);
        });
    } catch (error) {
        res.status(400).json("Erreur requete ajout like au post " + error);
    };
};


exports.likePost = (req, res, next) => {
    const userId = req.auth.userId;
    const postId = req.params.id;
    
    database.query(`SELECT * FROM likes WHERE post_id = ${postId} AND user_id = ${userId}`, (err, result, fields) => {
            if(err){
                return res.status(500).json({err});
            }
            if(result.length === 0){
                database.query(`INSERT INTO likes (post_id, user_id) VALUES (?,?)`, [postId, userId], (err, result, fields) => {
                    if(err){
                        return res.status(500).json({err});
                    }
                    database.query(`SELECT COUNT(*) as likes FROM likes WHERE post_id = ${postId}`, (err, result, fields) => {
                        if(err){
                            return res.status(500).json({err});
                        }
                        const numberOfLikes = result[0].likes;
                        database.query(`UPDATE posts SET post_likes = ${numberOfLikes} WHERE post_id = ${postId}`, (err, result, fields) => {
                            if(err){
                                return res.status(500).json({err});
                            }
                            return res.status(201).json({message: "Post liké !", count: 1});
                        })
                    })
                })
            } else {
                database.query(`DELETE FROM likes WHERE post_id = ${postId} AND user_id = ${userId}`, (err, result, fields) => {
                    if(err){
                        return res.status(500).json({err});
                    }
                    database.query(`SELECT COUNT(*) as likes FROM likes WHERE post_id = ${postId}`, (err, result, fields) => {
                        if(err){
                            return res.status(500).json({err});
                        }
                        const numberOfLikes = result[0].likes;
                        database.query(`UPDATE posts SET post_likes = ${numberOfLikes} WHERE post_id = ${postId}`, (err, result, fields) => {
                            if(err){
                                return res.status(500).json({err});
                            }
                            return res.status(201).json({message: "Like du post annulé !", count: -1});
                        })
                    })
                });
            }
        })
};



exports.postIsLiked = (req, res) => {
    const userId = req.auth.userId;
    const postId = req.params.id;
    database.query(`SELECT * FROM likes WHERE post_id = ${postId} AND user_id = ${userId}`, (err, result) => {
        if(err){
            return res.status(500).json({err});
        }
        if(result.length !== 0){
            return res.status(200).json({message: 'TRUE'})
        } else if (result.length === 0){
            return res.status(200).json({message: 'FALSE'})
        } 
    })
}