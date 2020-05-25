import "./styles.css";

const clockContainer = document.querySelector("js-dday");
const clock = clockContainer.querySelector("h2");
// You're gonna need this
const NINE_HOURS_MILLISECONDS = 32400000;

const getTime = () => {
  // Don't delete this.
  const xmasDay = new Date("2020-12-24:00:00:00+0900");
  const curentTime = new Date();
  const dday = xmasDay.getTime() - curentTime.getTime();
  clock.innerText = dday;
};

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
