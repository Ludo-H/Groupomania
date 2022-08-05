// On pourra utiliser directement database.query(...)
const database = require("../database/database").getDatabase();


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


//********************************************************************/
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
//********************************************************************/


//********************************************************************/
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
//********************************************************************/