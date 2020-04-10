const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req,res) => {

    // mongoDB에서 favorite 숫자 가져오기
    Favorite.find({"movieId" : req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            // 그 다음 프론트에서 다시 숫자 정보를 보내주기.
            res.status(200).json({ success : true, favoriteNumber : info.length })
        })
})

router.post('/favorited', (req,res) => {

    // mongoDB에서 favorite list에 넣었는지 정보를 DB에서 가져오기.
    Favorite.find({"movieId" : req.body.movieId , "userFrom" : req.body.userFrom })
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            // 그 다음 프론트에서 다시 정보를 보내주기.
            // result 기본값(info.length가 0인 것이 기준)을 false로 주고 info.length가 0이 아니면 true로 바꿔준다.
            let result = false ;
            if(info.length !== 0){
                result = true;
            }

            res.status(200).json({ success : true, favorited : result })
        })
})

// favorite button
// add to favorite list
router.post('/addToFavorite', (req,res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success : true })
    })
    
})
// remove from favorite list
router.post('/removeFromFavorite', (req,res) => {

    Favorite.findOneAndDelete({movieId : req.body.movieId , userFrom : req.body.userFrom })
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success : true , doc})
        })
})

// get Favorite Movie Info for FavoriteMovie List 
router.post('/getFavoritedMovie', (req, res) => {
    
    Favorite.find({'userFrom' : req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)

                    return res.status(200).json({ success : true, favorites })
                            
        })
})


module.exports = router;
