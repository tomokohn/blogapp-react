import React from 'react';
import {Link} from 'react-router';
import SideBar from './sidebar';
import Footer from './footer'




class Home extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">

          <div className="container">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle">
                <span className="sr-only">Toggle navigation</span>
                <label for="toggle-nav-mobile">
                  <span className="icon-bar"><Link activeClassName="active" to="/posts">posts</Link></span>
                  <span className="icon-bar"><Link activeClassName="active" to="/admin">admin</Link></span>
                </label>
              </button>
              <Link activeClassName="active" className="navbar-brand" to="/posts">Tomer's Blog</Link>
            </div>

            <input type="checkbox" id="toggle-nav-mobile" hidden/>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li><Link activeClassName="active" to="/posts">posts</Link></li>
                  <li><Link activeClassName="active" to="/admin">admin</Link></li>
                </ul>
              </div>

          </div>
        </nav>
        <div className="container">
          {this.props.children}
          <SideBar />
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home;
