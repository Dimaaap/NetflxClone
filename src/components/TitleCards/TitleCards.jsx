import React, {useRef, useEffect, useState} from 'react'
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from 'react-router-dom';


const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDE1Njc2MGU0YzhhOTEyMmQyMDc2YzA0MWQ2YmZkZiIsInN1YiI6IjY2NmFiNWZiNThjYjkxYzY3ZGE3NGFhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AhH1WJGH4hyGgYuO9W6cOY8Vie7POkAnhyA6z9_82K8'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category: 'now_playing' }?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  }, [])

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    cardsRef.current.addEventListener("wheel", handleWheel)
  }, [])
  return (
    <div className="title-cards">
        <h2>{ title ? title : "Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {
            apiData.map((card, index) => {
              return <Link to={`/player/${card.id}`} 
              className="card" key={index}>
                <img 
                src={
                  `https://image.tmdb.org/t/p/w500` + 
                  card.backdrop_path
                } 
                alt="" />
                <p>{card.original_title}</p>
              </Link>
            })
          }
        </div>
    </div>
  )
}

export default TitleCards
