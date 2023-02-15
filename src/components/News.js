import React from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  //   this.state = {    // This is a state inside a constructor
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalResults: 0,
  //   }
  //   document.title = `${this.capitalize(props.category)} - NewsMonkey`
  // }

  useEffect(() => {
    updateNews();
    // eslint-disable-line
  }, [])

  const capitalize = (string) => {
    let str = string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
    return str;
  }


  // This is the new function that will be called inside each function so tat we can keep the code concise
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);

    document.title = `${capitalize(props.category)} - NewsMonkey`

  }


  // async componentDidMount() {
  //   // let url =`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5a3108f9fbbd4075a6c4ccb1167972a7&page=1&pageSize=${props.pageSize}`;
  //   // this.setState(({loading: true}))
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({articles :  parsedData.articles, loading: false})    // Here, we have used setState() method to change the articles key of the state.

  //   this.updateNews();
  // }


  // const handlePrevClick = async () => {
  //   // console.log(page);
  //   // let url =`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5a3108f9fbbd4075a6c4ccb1167972a7&pageSize=${props.pageSize}&page=${page - 1}`;
  //   // this.setState({loading: true})
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);

  //   // this.setState({
  //   //   page: page-1,
  //   //   articles :  parsedData.articles,
  //   //   loading: false
  //   // })

  //   setPage(page-1)
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   // console.log(page);

  //   // if(!(page + 1 > Math.ceil(totalResults/props.pageSize)))
  //   // {
  //   //   let url =`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5a3108f9fbbd4075a6c4ccb1167972a7&pageSize=${props.pageSize}&page=${page + 1}`;
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   console.log(parsedData);
  //   //   this.setState({
  //   //       page: page+1,
  //   //       articles :  parsedData.articles,
  //   //       totalResults : parsedData.totalResults,
  //   //       loading: false
  //   //     });
  //   // }

  //   setPage(page+1)
  //   updateNews();
  // }

  // Function defined by the InfiniteScroll
  const fetchMoreData = async () => {
    setPage(page+1)
    // Here, inside the url we have made the page=${page + 1} instead of making it just page=${page}. If we have not done this then it would have given us an unique key error and some news would be seen twice. So to fix this we have done this.
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults);
  };

    // Here, row class is used to get everything insdie a row while the column class is used to get everythin inside a column.
    // Hence, insdie a row we will form different columns of card element.
    // col-md-4 means that there will be 3 columns as 3x4 = 12.
    return (
      <>
        <h2 style={{marginTop : "90px", marginBottom: "32px"}} className="text-center">NewsMonkey - Top {capitalize(props.category)} Headlines  &#40; {totalResults} results &#41;</h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className='row'>
              {!loading && articles.map((element) => {
                return <div key={element.url} className="col-md-4">
                  <NewsItem source={element.source.name} author={element.author} date={element.publishedAt} title={element.title.substring(0, 45)} description={element.description ? element.description.substring(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={element.url} />
                </div>
              })}
            </div>
          </div>

        </InfiniteScroll>



        {/* Removing the next and previous button */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark"> &larr; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr; </button>
        </div> */}
      </>
    )
}


export default News


News.defaultProps = {    // This is how we set default proptypes in classbased components
  country: "in",
  pageSize: 5,
}

News.propTypes = {    // This is how we set the data types of proptypes
  country: PropTypes.string,
  pageSize: PropTypes.number
}


