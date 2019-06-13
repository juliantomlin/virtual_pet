import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";


import './Home.css'
import './creatureCard.css'
import Creature from "./CreatureImg.jsx";
import CreatureCard from "./CreatureCard.jsx";


import caculateHungerHappy from "../scripts/caculate_hunger_and_happiness.js";


export default class UserProfile  extends Component {
  constructor() {
    super();
    this.state={
      hostPets: [],
      host: {}
    }
  }

  componentDidMount() {
    fetch("/api/getUsers/"+this.props.match.params.userid)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          hostPets: data.pets.reverse(),
          host: data.host[0]
        });
      });
  }


  render () {


    return (
      <div className="host-profile">
        <div className="host-stats">
          <h2>{this.state.host.name + "'s Pets"}</h2>
          <div className="host-money">
            <h2>{Number(this.state.host.gold).toLocaleString()}</h2>
            <img className="coin" src="../../lib/img/coin3.png" />
          </div>
        </div>
        <div className='creature-menu'>
        {this.state.hostPets.map((pet, index) => {

              return (
                <CreatureCard
                  className="creature-grid-item"
                  key={index}
                  petStatus={pet}
                  time={this.props.time}
                  onSelect={null}
                  editPet={null}
                  deletePet={null}
                  sendToWork={null}
                  feed={null}
                  pet1={null}
                  pet2={null}
                  viewProfile={this.props.viewProfile}
                  owner={false}
                />
              );
            })}

        </div>
      </div>

      )
  }
}