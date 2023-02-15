import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, source, author, date } = props;    // This is how we use props in class based compoenents.    // Here, the newsUrl will uniqely identify the particular news because for every new it will be unique    // This is called destructuring in javascript. Hence, the value of this.props.title is given to variable title and we can use title directly without using this.props.title
    return (
      <div>
        <div className="card my-2">
          <div>
            <span className="badge rounded-pill bg-danger z-1" style={{
              position: "absolute",
              right: "0px"
            }}>
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem