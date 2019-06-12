import React, { Component } from 'react';
import {Link} from "react-router-dom";

import './Home.css'

export default class BrowseUsers extends Component {
  constructor() {
    super()
    this.state={
      userList: []
    }
  }

  componentDidMount() {
    fetch("/api/getUsers/")
      .then(res => res.json())
      .then(users => {
        console.log(users)
        this.setState({
          userList: users,
        });
      });
  }

  render () {
    return (
    <div className="col-xs-12 bg-3 text-center">
      <div className="row">
      <div className="col-sm-6">
      <div align="left">
      <h2 className="title-username">USERNAMES</h2>
      <br />
    <div className="username-list">
    {this.state.userList.map((user, index) => {
      return (
        <Link to={"/users/" + user.id} key={"user" + index} className="user-names"><h4>{(index + 1) + " - " + user.name + " | " + (Number(user.gold).toLocaleString())}</h4></Link>
        )
    })}
    </div></div></div></div>
  </div>
  )
}

}