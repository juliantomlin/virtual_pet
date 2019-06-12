const caculateHungerHappy = function(
  timeNow,
  timeLast,
  hungerStart,
  happyStart,
  str,
  int,
  working
) {
  // how much time since the last feeding or job in seconds
  let timer = (timeNow - timeLast) / 1000;


  let maxHunger = 200;
  let maxHappy = 200;
  let statusSpeed = 1000;
// calculates how much hunger was lost either at end of a job or the last feeding
  let hunger = ((hungerStart - (str / statusSpeed) * timer) / maxHunger) * 100;
// when hunger is 50%, returns the time
  let time_at_half_hunger
  if (hungerStart > maxHunger * .5){
    time_at_half_hunger =
      (-(0.5 * maxHunger - hungerStart) / (str / statusSpeed)) * 1000 + parseInt(timeLast);
  } else {
    time_at_half_hunger = timeLast;
  }

  if (hunger < 0) {
    hunger = 0;
  }

  // calculates how happy the pet is when it reaches 50% hunger which tells us it's peak happiness

  let happiness_at_half =
    ((time_at_half_hunger - timeLast) / 1000) * (maxHappy / 3600) + happyStart;
  if (happiness_at_half > maxHappy) {
    happiness_at_half = maxHappy;
  }
// happiness increases by a set value when hunger is above 50%, and decreases by a factor of their intelligence - when they are hungry/at work
  let happiness;
  if (hunger > 50 && !working) {
    happiness = ((timer * (maxHappy / 3600) + happyStart) / maxHappy) * 100;
  } else if (working) {
    happiness = ((-(timer * (int / statusSpeed)) + happyStart) / maxHappy) * 100;
  } else {
    happiness = ((-(((timeNow - time_at_half_hunger) / 1000) * (int / statusSpeed)) + happiness_at_half) / maxHappy) * 100;
  }

  if (happiness > 100) {
    happiness = 100;
  }
// happyId controls the mouth graphic
  let happyId = 1;

  if (happiness > 50) {
    happyId = 1;
  } else if (happiness > 0) {
    happyId = 2;
  } else {
    happyId = 3;
    happiness = 0;
  }

  return { hunger, happiness, happyId };
};

module.exports = caculateHungerHappy;
