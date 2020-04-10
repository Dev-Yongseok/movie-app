import React,{ useEffect , useState} from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber ] = useState(0)
    const [Favorited, setFavorited ] = useState(false)

    let variables = {
        userFrom : userFrom,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRuntime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Error : Favorite Count 정보를 가져오는데 실패 했습니다.')
                }
            })


        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                } else {
                    alert('Error : 정보를 가져오는데 실패 했습니다.')
                }
            })
        
    }, [])

    const onClickFavorite = () => {
        
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber ( FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite List에서 지우는 것을 실패 했습니다.');
                    } 
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber( FavoriteNumber + 1 )
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite List에서 추가하는 것에 실패 했습니다.');
                    } 
                })
        }
    }

    return (
        <div style={{ display : 'flex', justifyContent : 'flex-end'}}>
            <Button onClick={onClickFavorite}>Favorite : {FavoriteNumber} ({Favorited ? "Not Favorite" : "Add to Favorite"})</Button>
        </div>
    )
}

export default Favorite
