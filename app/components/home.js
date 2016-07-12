import React from 'react';
import {Link} from 'react-router';




class Home extends React.Component {
  render() {
    return (
      <div>
        <nav classNmae="navbar ">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link  className="navbar-brand" activeClassName="active" to="/posts">Tomer's Blog</Link>
            </div>
            <ul className="nav navbar-nav">
              <li><Link activeClassName="active" to="/posts">posts</Link></li>
              <li><Link activeClassName="active" to="/admin">admin</Link></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

export default Home;
