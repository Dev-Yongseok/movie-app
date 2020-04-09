import React, {useEffect, useState} from 'react'

import axios from 'axios';

import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config'
import MainImage from "../LandingPage/Sections/MainImage";
import GridCards from '../commons/GridCards';

import MovieInfo from "./Sections/MovieInfo";
import Favorite from "./Sections/Favorite";

import {Row, Button} from 'antd';


function MovieDetail(props) {
    
    let movieId = props.match.params.movieId
   
    const [MainMovieImage, setMainMovieImage] = useState(0);
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US&page=1`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        console.log(props.match)
        
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
                setMainMovieImage(response)
            })
        

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('resoponseForCrew', response)
                setCasts(response.cast)
            })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div style={{}} >
            {/* Header = Main Image */}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }


            {/* Body */}
            <div style={{ width : '85%', margin : '1rem auto '}}>
                {/* Favorite Button */}
                
                <Favorite
                    movieInfo = {Movie} 
                    movieId = {movieId}
                    userFrom = {localStorage.getItem('userId')}
                />

                {/* Movie Info */}
                <MovieInfo 
                    movie = {Movie}
                />

                <br />
                {/* Actor Grid */}
                <div style={{ display : 'flex', justifyContent : 'center', margin : '2rem'}}>
                    <Button onClick={toggleActorView}> Toggle Actor View </Button>
                </div>

                {ActorToggle && 
                    <Row gutter={[16,16]}>
                        {Casts && Casts.map((cast, index) =>(
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    castId={cast.id}
                                    castName={cast.name}
                                    characterName={cast.character}
                                />
                            </React.Fragment>

                        ))}    
                    </Row>      
                }  

            </div>



        </div>
    )
}

export default MovieDetail