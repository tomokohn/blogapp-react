import React from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import SideBar from './sidebar';
var PostData = require('../../data/posts.json');


class Posts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: PostData.posts,
      newer:'',
      older:''
    }
    this.sortPosts = this.sortPosts.bind(this);
    this.onePost = this.onePost.bind(this);
    this.threePosts = this.threePosts.bind(this);
    this.postsChange = this.postsChange.bind(this);
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
      const tPosts =[];
      if (page === undefined) {
        for (var i = 0; i < 3; i++) {
          if (this.state.posts[i] === undefined) {
            return tPosts;
          }
          tPosts.push(this.onePost(this.state.posts[i]));
        }
      } else {
        for (var i=(page*3)-3 ; i<page*3; i++ ){
          if (this.state.posts[i] === undefined) {
            return tPosts;
          }
          tPosts.push(this.onePost(this.state.posts[i]));
        }
      }

    return tPosts
  }

  postsChange(direction){
    const pageNum = this.props.params.page;
      if (pageNum === undefined) {
        return 'posts/2'
      } else if(pageNum === 1){
        return 'posts'
      } else {
        return `posts/${parseInt(pageNum)+direction}`
      }
  }

  componentWillMount(){
    this.sortPosts()
    // removes pager if less then 4 posts
    if (this.state.posts.length <= 3) {
      this.setState({
        newer:'hidden',
        older:'hidden'
      })
    }
  }

  componentDidMount(){
    if (this.props.params.page === undefined){
      this.setState({
        newer:'hidden'
      })
    } else {
      this.setState({
        newer:''
      })
    }
  }


  render() {
    return (
      <section className="col-md-8">
        <h2 className="page-header">Showing {this.state.posts.length} posts</h2>
        {this.threePosts(this.props.params.page)}
        <ul className="pager">
          <li className="previous">
            <Link className={this.state.older} to={this.postsChange(1)}>&larr; Older</Link>
          </li>
          <li className="next">
            <Link className={this.state.newer} to={this.postsChange(-1)}>Newer &rarr;</Link>
          </li>
        </ul>
      </section>
  )

  }
}

export default Posts;
