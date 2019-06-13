import React, { Component } from 'react';
import {Link} from "react-router-dom";

import './app.css'

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
    <div className="about-page">
      <h1 className="title-username">USERNAMES</h1>
    {this.state.userList.map((user, index) => {
      return (
        <Link to={"/users/" + user.id} key={"user" + index} className="user-names">
          <h4>{(index + 1) + " - " + user.name + " | " + (Number(user.gold).toLocaleString())}</h4>
        </Link>
        )
    })}
    </div>
  )
}

}