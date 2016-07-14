import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import SideBar from './sidebar';
var PostData = require('../../data/posts.json');


class Posts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: PostData.posts
    }
    this.sortPosts = this.sortPosts.bind(this);
    this.onePost = this.onePost.bind(this);
  }

  sortPosts(){
      const arr = this.state.posts.sort((a, b)=> b.date - a.date);
      this.setState({
        posts: arr
      })
  }

  onePost(post){
    const postDate = new Date(parseInt(post.date));
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const day = postDate.getDate();
    const monthIndex = postDate.getMonth();
    const year = postDate.getFullYear();
    const date = day + ' ' + monthNames[monthIndex] + ' ' + year;

    const tags = post.tags.map((tag)=>(
      <span>
				<a href="#" className="label label-default">{tag}</a>
			</span>
    ));
    return (
      <article>
        <header>
          <h2>
            <a href="#">{post.title}</a>
          </h2>

          <p>
            <small className="glyphicon glyphicon-user"></small>
            by <a href="#">{post.author}</a>
          </p>
          <p>
            <small className="glyphicon glyphicon-time"></small>
             Posted on {date}
          </p>
        </header>

        <p>{post.description}</p>
        <br/>

          <footer className="clearfix">
            <p className="pull-left">
              <b>Tags:&nbsp;</b>
              {tags}
            </p>

            <a className="btn btn-primary pull-right" href="#">
              Read More <i className="glyphicon glyphicon-chevron-right"></i>
            </a>
          </footer>
        <hr/>
      </article>
    )
  }

  threePosts(page){

  }

  componentWillMount(){
    this.sortPosts()
  }

  render() {
    console.log(this.state.posts);
    return (
      <section className="col-md-8">
        <h2 className="page-header">Showing 8 posts</h2>
        {this.onePost(this.state.posts[0])}
        {this.onePost(this.state.posts[1])}
        {this.onePost(this.state.posts[2])}
        <ul className="pager">
          <li className="previous">
            <a href="#">&larr; Older</a>
          </li>
          <li className="next">
            <a href="#">Newer &rarr;</a>
          </li>
        </ul>
      </section>
  )

  }
}

export default Posts;
