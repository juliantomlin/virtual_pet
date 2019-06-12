import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Link, Redirect, withRouter} from "react-router-dom";
import axios from "axios";

import "./Home.css";

import Creature from "./CreatureImg.jsx";
import CreatureCard from "./CreatureCard.jsx";
import CreatureContainer from "./CreatureContainer";
import MateFound from "./MateFound";
import CurrentJobs from "./CurrentJobs.js";

class Home extends Component {
  componentDidMount() {
    const userName = this.props.location.search.split("=")[1]
  }



  render() {
    return (
      <div>
        <div className="header-container">
          <div className="header">

              <div className="user-info"> {this.props.username.name}

                <img className="avatar-img" src="../../lib/img/avatar-black.png" />


            <div className="new-pet-button-container">
              <button onClick={() => this.props.handleBuying()} className="new-pet-button">
                Buy New Pet
              </button>
            </div>
          </div>
          </div>
        </div>
        <div className="flex-home-page-elements-container">


            <CreatureContainer
              petlist={this.props.petlist}
              time={this.props.time}
              editPet={this.props.editPet}
              deletePet={this.props.deletePet}
              sendToWork={this.props.sendToWork}
              feed={this.props.feed}
              onSelect={this.props.breed}
              pet1={this.props.pet1}
              pet2={this.props.pet2}
              viewProfile={this.props.viewProfile}
            />

          <div className="current-job-container">
          <div className="job-items">
            { this.props.pet1 === '' &&
             <div className='no-breeding'>
              <div className="job-card-title">
                <h4>Current Jobs</h4>
              </div>
              <div className="job-menu">
                <CurrentJobs time={this.props.time} returnFromWork={this.props.returnFromWork} jobList={this.props.jobList} />
              </div>
             </div>
            }
            { this.props.pet1 != '' &&
             <div>
              <div className="job-card-title">
                <h4>Breeding Selected</h4>
              </div>
              <div className="job-menu">
                <CreatureCard
                  onSelect={this.props.breed}
                  petStatus={this.props.pet1}
                  time={this.props.time}
                  pet1={this.props.pet1}
                  viewProfile={this.props.viewProfile}
                />
              </div>
             </div>
            }
          </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-item footer-one" />
        </div>
      </div>
    );
  }
}

export default withRouter(Home)