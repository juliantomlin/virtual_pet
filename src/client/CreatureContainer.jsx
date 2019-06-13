import React, { Component } from "react";

import "./Home.css";
import CreatureCard from "./CreatureCard";

export default class CreatureContainer extends Component {
  render() {
    return (
      <div className="title-align">
        <div className="creature-card-title">
          <br />
          <div className="your-pets-title">{/*<h4>Your Pets</h4>*/}</div>
        </div>
        <div className="creature-card-container">
        <div className="creature-menu">
          {this.props.petlist.map((pet, index) => {

            return (
              <CreatureCard
                className="creature-grid-item"
                key={index}
                petStatus={pet}
                time={this.props.time}
                onSelect={this.props.onSelect}
                editPet={this.props.editPet}
                deletePet={this.props.deletePet}
                sendToWork={this.props.sendToWork}
                feed={this.props.feed}
                pet1={this.props.pet1}
                pet2={this.props.pet2}
                viewProfile={this.props.viewProfile}
                owner={true}
              />
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}
