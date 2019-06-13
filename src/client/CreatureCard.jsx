import React, { Component } from "react";
import {Link} from "react-router-dom";
import Creature from "./CreatureImg.jsx";
import HoverOver from "./HoverOver.jsx"

import caculateHungerHappy from "../scripts/caculate_hunger_and_happiness.js";

class CreatureCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isDeleting: false,
      isHovering: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onKeyPressEnter = this.onKeyPressEnter.bind(this);
    this.handleHoverChange = this.handleHoverChange.bind(this);
  }

  // doesn't re-render elements that are off screen
  cardRef = React.createRef();

  shouldComponentUpdate() {
    const rect = this.cardRef.current.getBoundingClientRect();
    return (
      rect.left < window.innerWidth &&
      rect.right > 0 &&
      rect.bottom > 0 &&
      rect.top < window.innerHeight
    );
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    alert("A name wasn't submitted, please " + this.state.name);
    event.preventDefault();
  }

  onKeyPressEnter(event) {
    if (event.key === "Enter") {
      this.props.editPet({ ...petAssign, name: this.state.name });
      this.setState({ isEditing: false });
    }
  }

  handleHoverChange() {
    this.setState({isHovering : false})
  }

  render() {

    const petAssign = (this.props.petStatus.pet_id ? this.props.petStatus : Object.assign(this.props.petStatus, {pet_id: this.props.petStatus.id}))


    let working = false
    if (petAssign.job_start_time && !petAssign.job_end_time){
      working = true
    }

    let breeding = false
    if (this.props.pet1) {
      if (this.props.pet1.id === petAssign.id){
        breeding = true
      }
    }

    let lastInteraction = petAssign.time_last_fed_or_work
    if (petAssign.job_end_time > lastInteraction){
          lastInteraction = petAssign.job_end_time
        } else if (petAssign.job_start_time > lastInteraction) {
          lastInteraction = petAssign.job_start_time
        }


    let status = caculateHungerHappy(
      this.props.time,
      lastInteraction,
      petAssign.hunger_at_time_last_fed,
      petAssign.happiness_at_time_last_fed,
      petAssign.strength_gene,
      petAssign.intelligence_gene,
      working
    );

    const happinessBar = {width: `${Math.round(status.happiness)}px`}
    const hungerBar = {width: `${Math.round(status.hunger)}px`}


    return (

      <div ref={this.cardRef} onMouseEnter={() => {
        // if (!working) {
        this.setState ({ isHovering: true })
        // }
      }}
        onMouseLeave={() => this.setState ({ isHovering: false })}>
        <div className={(working && this.state.isHovering) ? "workingBackground animate" : (working ? "workingBackground" : (breeding ? "breedingBackground animate" : (this.state.isHovering ? "selectedBackground animate" : "cardBackground")))}>
          <div className="nameContainer">
            <h2 className="name" />

              <h2 className="name">
               <Link to={"/petprofile/" + petAssign.pet_id} className="name-link"> {" "}
                {petAssign.name}{" "}</Link>
              </h2>

            <div className="nameBackground" />
          </div>
          <div className="creatureWindow">
            <Creature
              petStatus={petAssign}
              happyStatus={status.happyId}
            />
          </div>
          <div className="creatureStats">
            <div className="happinessGague">
              <img className="happiness" src="../../lib/img/noun_Heart.svg" />
              <p>{status.happiness.toFixed(2)}%</p>
              {(!this.state.isHovering || working) &&
                <div className="status-bar">
                  <div className="filled" style={happinessBar}></div>
              </div> }
              <h4>Int: {petAssign.intelligence_gene}</h4>
            </div>
            <div className="hungerGague">
              <img
                className="hunger"
                src="../../lib/img/noun_Bitten_Apple.svg"
              />
              <p>{status.hunger.toFixed(2)}%</p>
              {(!this.state.isHovering || working) &&
                <div className="status-bar">
                   <div className="filled" style={hungerBar}></div>
                </div> }
              <h4>Str: {petAssign.strength_gene}</h4>
            </div>
            {this.state.isHovering && !working && this.props.owner && (
              <HoverOver
                onSelect={this.props.onSelect}
                petStatus={petAssign}
                sendToWork={this.props.sendToWork}
                pet={petAssign}
                deletePet={this.props.deletePet}
                feed={this.props.feed}
                pet1={this.props.pet1}
                handleHoverChange={this.handleHoverChange}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CreatureCard;
