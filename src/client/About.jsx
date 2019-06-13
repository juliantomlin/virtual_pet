import React, { Component } from "react";

import "./app.css";



class About extends Component {
  render(){
    return (
      <div className="about-page">
        <h1>How to play</h1>
        <ul>- buy pets with gold</ul>
        <ul>- send them to work to make money</ul>
        <ul>- pets with more str and int make more money</ul>
        <ul>- pets with more happiness and hunger make more money</ul>
        <ul>- hunger drops continually</ul>
        <ul>- happiness drops while below 50% hunger or while working</ul>
        <ul>- feeding a pet spends gold but increases hunger</ul>
        <ul>- while above 50% hunger happiness will slowly increase</ul>
        <ul>------------</ul>
        <ul>- spend gold to breed 2 pets together</ul>
        <ul>- children will inheret traits of their parents</ul>
        <ul>------------</ul>
        <ul>- try to make more money than everyone else!</ul>
        <ul>- what cool looking pets can you breed?</ul>
      </div>
    )
  }

}
export default About
