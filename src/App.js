import React, {useState, useEffect} from 'react';
import './App.css';
import Article from './components/Article';

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('Rabbits');

  useEffect( () => {
    fetch("https://www.reddit.com/r/"+ subreddit +".json").then(Response => {
      if (Response.status !== 200) {
        console.log('Fetch Error');
        return;
      }
      Response.json().then(Response => {
        if (Response != null) {
          setArticles(Response.data.children);
        }
      })
    })
  }, [subreddit]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" className="input" value={subreddit} onChange={e => setSubreddit(e.target.value)}></input>
      </header>
      <div className="articles">
        {
          (articles !== null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : '' 
        }
      </div>
    </div>
  );
}

export default App;
