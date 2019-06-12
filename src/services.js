import axios from "axios";


export const breedNewPet = (pet1, pet2, callback) => {
    // event.preventDefault();
    //const breedData = new FormData(event.target);

    // fetch("/api/breed", {
    //   method: "POST",
    //   body: breedData
    // });
    axios
      .post("/api/breed", {
        pet1,
        pet2
      })
      .catch(function(err){
        if(err.response){
          alert("You must own both pets to breed them")
        }
      })
      .then(response => {
        if (response){
          callback(response.data)
        }
      });
  };

export const makeNewJob = (pet, callback) => {
  axios
    .post(`/api/pets/${pet.pet_id}/work`, {
    })
    .catch(function(err){
      if(err.response){
        alert("Only the owner can send a pet to work")
      }
    })
    .then(response => {
      if (response){
        callback(response.data)
      }
    })
}

export const endJob = (job, callback) => {
  axios
    .post(`/api/jobs/${job.id}`, {
    })
    .catch(function(err){
      if (err.response){
        alert("Only the owner can recall a pet from work")
      }
    })
    .then(response => {
      if(response){
        callback(response.data)
      }
    })
}

export const newFeedEvent = (pet, foodType, callback) => {
  axios
    .post(`/api/pets/${pet.pet_id}/feed/${foodType}`, {
    })
    .catch(function(err){
      if (err.response){
        alert("Only the owner can feed his own pets")
      }
    })
    .then(response => {
      if (response){
        callback(response.data)
      }
    })
}

export const buyPetRequest = (user, callback) => {
  axios
    .post(`/api/users/${user}/buypet`, {})
    .then(response => {
      callback(response.data)
    })
}