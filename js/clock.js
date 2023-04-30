const secondsHand = document.getElementById("seconds-hand");
const minutesHand = document.getElementById("minutes-hand");
const hoursHand = document.getElementById("hours-hand");

function getTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const timeInterval = 6;

  console.log(seconds);

  secondsHand.style.transform = "rotate(" + (seconds * timeInterval) + "deg)";
  minutesHand.style.transform =
    "rotate(" + (minutes * timeInterval + seconds / 1000) + "deg)";
  hoursHand.style.transform = "rotate(" + (hours * 30 + minutes / 2) + "deg)";
}

setInterval(getTime, 100);

const btnShow = document.querySelector("button");
const output = document.querySelector(".date");
const time = document.querySelector(".time");

const today = new Date();

const month = today.getMonth() + 1;
const year = today.getFullYear();
const date = today.getDate();

const current_date = `${month}/${date}/${year}`;
output.innerHTML = current_date;

const hours = today.getHours();
const minutes = String
(today.getMinutes()).padStart(2, "0");

const current_time = `${hours}:${minutes}`;
time.innerHTML = current_time;
