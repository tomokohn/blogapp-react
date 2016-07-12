import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import SideBar from './sidebar';
import PostsData from '../../data/posts.json';



class Posts extends React.Component {
  constructor(props){
    super(props)
    this.setstate = ({
      posts: PostsData
    })
  }

  render() {
    console.log(this.state.posts);
    return (
      <div>
        <h2>posts page</h2>
        <SideBar />
      </div>
  )

  }
}

export default Posts;
