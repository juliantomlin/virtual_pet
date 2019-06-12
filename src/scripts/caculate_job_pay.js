// dynamically calculates how much money a pet has made while they were at work
const caculateHungerHappy = require("./caculate_hunger_and_happiness.js");
const jobPayPerStat = require("./job_pay_per_stat.js");

const caculateJobPay = function(time, payRate, jobStatus) {
  const maxHunger = 200;
  const maxHappy = 200;
  const payModifier = 10

  const [job_multiplier_str, job_multiplier_int] = payRate;

  const [
    job_start_time,
    hunger_at_start,
    happy_at_start,
    intelligence_gene,
    strength_gene
  ] = [
    jobStatus.job_start_time,
    jobStatus.hunger_at_time_last_fed,
    jobStatus.happiness_at_time_last_fed,
    jobStatus.intelligence_gene,
    jobStatus.strength_gene
  ];

  const timer = (time - job_start_time) / 1000;
// payoutRatio is how much money the pet makes per second - when at full happiness/hunger
  const payoutRatio =
    (job_multiplier_str * strength_gene + job_multiplier_int * intelligence_gene) / payModifier;
// calculates each pets hunger and happiness since job start
  const status = caculateHungerHappy(
    time,
    job_start_time,
    hunger_at_start,
    happy_at_start,
    strength_gene,
    intelligence_gene,
    true
  );

  const hunger = status.hunger;
  const happiness = status.happiness;
// payoutHunger accounts for the decrease in efficency based on their increase of hunger
  const payoutHunger = jobPayPerStat(
    timer,
    hunger_at_start,
    strength_gene,
    payoutRatio,
    maxHunger,
    hunger
  );
// payoutHappy accounts for the decrease in efficency based on the decrease of happiness
  const payoutHappy = jobPayPerStat(
    timer,
    happy_at_start,
    intelligence_gene,
    payoutRatio,
    maxHappy,
    happiness
  );
// combines previous two functions
  const payout = payoutHunger[0] + payoutHappy[0];
  const instPayout = payoutHunger[1] + payoutHappy[1]

  return { payout, hunger, happiness, instPayout};
};

module.exports = caculateJobPay;
