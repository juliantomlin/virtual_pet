  import React, { Component } from 'react';
  import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";


  import './Home.css'
  import './creatureCard.css'
  import Creature from "./CreatureImg.jsx";


  import caculateHungerHappy from "../scripts/caculate_hunger_and_happiness.js";


  export default class PetProfile extends Component {
    state={
      pet: {}
    }
    componentDidMount() {
      fetch("/api/getPets/"+this.props.match.params.petid)
        .then(res => res.json())
        .then(pet => {

          this.setState({
            pet: pet.pet[0],
            isEditing: false,
            name: ""
          });
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.onKeyPressEnter = this.onKeyPressEnter.bind(this);
        });
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
        const newName = this.state.pet
        newName.name = this.state.name
        this.props.editPet({ ...this.state.pet, name: this.state.name });
        this.setState({ isEditing: false, pet: newName });
        }
      }


    render () {

      let working = false
      if (this.state.pet.job_start_time && !this.state.pet.job_end_time){
        working = true
      }

      let lastInteraction = this.state.pet.time_last_fed_or_work
      if (this.state.pet.time_last_fed_or_work < this.state.pet.job_start_time) {
        lastInteraction = this.state.pet.job_start_time
        if (this.state.pet.job_start_time < this.state.pet.job_end_time) {
          lastInteraction = this.state.pet.job_end_time
        }
      }

      let status = caculateHungerHappy(
        this.props.time,
        lastInteraction,
        this.state.pet.hunger_at_time_last_fed,
        this.state.pet.happiness_at_time_last_fed,
        this.state.pet.strength_gene,
        this.state.pet.intelligence_gene,
        working
      );

      const hungerBar =  {
        width: status.hunger * 3
      }

      const happinessBar = {
        width: status.happiness * 3
      }

      return (

    <div className='petProfile'>
      <div className="back-button"><button onClick={this.props.history.goBack} className="breed-button">Back</button><br /><br /><br /><br /></div>
        <div className="pet-profile-content">
          <div className="pet-profile-creature-image animate">
                    <Creature
                    petStatus={this.state.pet}
                    happyStatus={status.happyId}
                  />
          </div>

        <div className="pet-profile-info">

          <div className="pet-profile-name">{this.state.isEditing ? (
            <label className="edit-name-field">
              <input
                value={this.state.name}
                onChange={this.handleChange}
                onKeyPress={this.onKeyPressEnter}
              />
            </label>
          ) : (
            <div className='name-and-edit'>
              <h2 className="name">{this.state.pet.name}</h2>
              <button
                className="edit-name-button"
                type="submit"
                name="Edit Name"
                onClick={() => this.setState({ isEditing: true })}>
              </button>
            </div>
          )}
          </div>


          <div className="pet-profile-stats">
            <ul> Strength: {this.state.pet.strength_gene}</ul><br />
            <ul><div className="hunger">Hunger: {(status.hunger).toFixed(2)}
              <div className="status-bar"><div className="filled" style={hungerBar}></div></div></div></ul><br />
            <ul> Intelligence: {this.state.pet.intelligence_gene}</ul><br />
            <ul><div className="happiness">Happiness: {(status.happiness).toFixed(2)}
            <div className="status-bar"><div className="filled" style={happinessBar}></div></div></div></ul><br />
          </div>


          {!working && (
            <div className="pet-profile-buttons">
              <div className="petcare-buttons">

                {/*<button
                  className="breed-button"
                  value={this.state.pet}
                  onClick={() => {
                    this.props.sendToWork(this.state.pet.id);
                    window.location.reload();
                  }}
                >
                  Send to Work
                </button>*/}

                {/*<button
                  className="breed-button"
                  onClick={() => {
                    this.props.feed(this.state.pet.id, 1)
                    window.location.reload();
                  }}

                >
                  Feed
                </button>*/}
              </div>

              <button className="breed-button set-free" onClick={() => {
                alert("By pressing ok you will permanently delete this pet!");
                this.props.deletePet(this.props.match.params.petid);
                this.props.history.replace('/');}} >
                Set Free
              </button>
            </div>
            )}
        </div>
      </div>
    </div>







        )
    }
  }