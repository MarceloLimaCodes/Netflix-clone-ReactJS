import React, { useEffect, useState } from 'react'
import './App.css';
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //pegando lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let ramdonChosen = Math.floor(Math.random() * originals[0].items.results.length);
      let chosen = originals[0].items.results[ramdonChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }

    loadAll();

  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);

      } else {
        setBlackHeader(false);

      }
    }

    window.addEventListener('scroll', scrollListener);

  }, []);

  return (
    <div className='page'>

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} /> 
        ))}

      </section>
      
      <footer>
        Direitos de imagem para Netflix <br/>
        Dados pegos do site themoviedb.org <br/>
        Feito por MarceloLimaCodes
      </footer>
    </div>
  );
}