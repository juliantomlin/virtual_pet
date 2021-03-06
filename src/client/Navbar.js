import React, { Component } from "react";
import "./styles/nav.css";
import Odometer from 'react-odometerjs';
import {Link} from "react-router-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';





class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {

  }

  onClickLogout = () => {
    axios.post("/api/logout", {}).then(response => {
        this.props.logout()
        return this.props.history.push('/login')
    })
  }


  render() {

    let gold = null
    let user = null

    if (this.props.user) {
      gold = this.props.user.gold
      user = this.props.user.name
    }


    const money  = Number(gold).toLocaleString()

    return (
          <div className="menu-container">
            <Link to="/" className="selection">Selection</Link>
            {this.props.user &&
              <div className="nav-links">
                <Link to="/users"><h4>Browse Users</h4></Link>
                <Link to="/about"><h4>About</h4></Link>
                <Link to="/"><h4>{user} | </h4><div className='money-counter'><Odometer  value={money} format="(,ddd)" /></div><img className="coin" src="../../lib/img/coin3.png" /></Link>
                <a onClick={() => {this.onClickLogout()}}> <h4>Logout</h4></a>
              </div>
            }
            {!this.props.user &&
              <div className="nav-links">
                <Link to="/users"><h4>Browse Users</h4></Link>
                <Link to="/about"><h4>About</h4></Link>
                <Link to="/login"> <h4>Login</h4></Link>
              </div>
            }
          </div>
    );
  }
}

export default withRouter(Navbar)
