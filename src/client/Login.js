import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from "axios";


import './Home.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""

    }
  }

  componentDidMount() {
    const userName = this.props.location.search.split("=")[1]
    this.props.login(userName)
  }

onClickLogin = () => {
  axios.post("/api/login", {username: this.state.username, password: this.state.password})
    .catch(function(err){
      if (err.response){
        alert("incorrect username or password")
      }
    })
    .then(response => {
      if (response) {
        this.props.login(response.data)
        return this.props.history.push('/')
      }
    })
}

onClickRegister = () => {
  axios.post("/api/register", {username: this.state.username, password: this.state.password})
    .catch(function(err){
      if (err.response){
        alert("username already exists")
      }
    })
    .then(response => {
      if (response) {
        this.props.login(response.data)
        return this.props.history.push('/')
      }
  })
}
  // if successful then do this stuff
  // this.props.login(this.state.username)
  // this.props.history.push('/')


onChangeUsername = (e) => {
  if (e.target.value) {
    this.setState({username: e.target.value})
  }
}

onChangePassword = (e) => {
  if (e.target.value) {
    this.setState({password: e.target.value})
  }
}

  render () {
    return (
      <div className="box">
        <h2>Welcome to Selection!</h2>
        <br />
        Username <input type="username" name="username" className="email" onChange={this.onChangeUsername}/>
        password <input type="password" name="password" className="email" onChange={this.onChangePassword}/><br /><br />
        <button className="login-button" onClick={this.onClickLogin}>Login</button>
        <button className="login-button" onClick={this.onClickRegister}>Register</button>
      </div>
    )
  }
}

export default withRouter(Login)


