import React from 'react';
import {Router,Route,hashHistory} from 'react-router';
import SideBar from './sidebar';



class Admin extends React.Component {
  render() {
    return (
      <div>
        <h2>asmin page</h2>
        <SideBar />
      </div>
  )

  }
}

export default Admin;
