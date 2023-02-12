import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar'

export default class News extends Component {
  static defaultProps = {    // This is how we set default proptypes in classbased components
    country: "in",
    pageSize: 5,
  }

  static propTypes = {    // This is how we set the data types of proptypes
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(props) {    // This is a constructor. Inorder to use the porps we have to define the props parameter inside the constructor.
    super(props);
    console.log("I am a constructor from News component.");

    this.state = {    // This is a state inside a constructor
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      progress: 0
    }
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
  }

  capitalize = (string) => {
    let str = string.slice(0, 1).toUpperCase() + string.slice(1, string.length);
    return str;
  }


  // This is the new function that will be called inside each function so tat we can keep the code concise
  updateNews = async () => {
    this.setState({progress: this.state.progress + 10})
    this.setState({progress: this.state.progress + 20})
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=45198191bad04c7990c6d96643ac2ab6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
      progress: this.state.progress + 100
    })    // Here, we have used setState() method to change the articles key of the state.
  }


  async componentDidMount() {
    // let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5a3108f9fbbd4075a6c4ccb1167972a7&page=1&pageSize=${this.props.pageSize}`;
    // this.setState(({loading: true}))
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({articles :  parsedData.articles, loading: false})    // Here, we have used setState() method to change the articles key of the state.

    this.updateNews();
  }


  // handlePrevClick = async () => {
  //   // console.log(this.state.page);
  //   // let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5a3108f9fbbd4075a6c4ccb1167972a7&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
  //   // this.setState({loading: true})
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page: this.state.page-1,
  //   //   articles :  parsedData.articles,
  //   //   loading: false
  //   // })

  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   // console.log(this.state.page);

  //   // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
  //   // {
  //   //   let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5a3108f9fbbd4075a6c4ccb1167972a7&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
  //   //   this.setState({loading: true});
  //   //   let data = await fetch(url);
  //   //   let parsedData = await data.json();
  //   //   console.log(parsedData);
  //   //   this.setState({
  //   //       page: this.state.page+1,
  //   //       articles :  parsedData.articles,
  //   //       totalResults : parsedData.totalResults,
  //   //       loading: false
  //   //     });
  //   // }

  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews();
  // }

  // Function defined by the InfiniteScroll
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    // Here, inside the url we have made the page=${this.state.page + 1} instead of making it just page=${this.state.page}. If we have not done this then it would have given us an unique key error and some news would be seen twice. So to fix this we have done this.
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=45198191bad04c7990c6d96643ac2ab6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    })
  };

  render() {
    // Here, row class is used to get everything insdie a row while the column class is used to get everythin inside a column.
    // Hence, insdie a row we will form different columns of card element.
    // col-md-4 means that there will be 3 columns as 3x4 = 12.
    return (
      <>
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={() => this.setState({progress: 0})}
      />
        <h2 className="text-center">NewsMonkey - Top {this.capitalize(this.props.category)} Headlines  &#40; {this.state.totalResults} results &#41;</h2>
        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className='row'>
            {!this.state.loading && this.state.articles.map((element) => {
              return <div key={element.url} className="col-md-4">
                <NewsItem source={element.source.name} author={element.author} date={element.publishedAt} title={element.title.substring(0, 45)} description={element.description ? element.description.substring(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} newsUrl={element.url} />
              </div>
            })}
          </div>
        </div>

        </InfiniteScroll>



        {/* Removing the next and previous button */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark"> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr; </button>
        </div> */}
      </>
    )
  }
}
