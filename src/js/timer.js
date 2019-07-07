export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      days: document.querySelector('span[data-value="days"]'),
      hours: document.querySelector('span[data-value="hours"]'),
      minutes: document.querySelector('span[data-value="mins"]'),
      seconds: document.querySelector('span[data-value="secs"]'),
      fields: document.querySelectorAll(".field")
    };
    this.addColons();
    setInterval(() => this.calculateDeltaTime(), 1000);
  }

  addColons() {
    const colon = '<span class="colon">:</span>';

    for (let i = 0; i < this.refs.fields.length - 1; i++) {
      this.refs.fields[i].insertAdjacentHTML("afterend", colon);
    }
  }

  calculateDeltaTime() {
    let time = 0;
    if (this.targetDate > Date.now()) {
      time = this.targetDate - Date.now();
    }
    this.updateClockface(time);
  }

  updateClockface(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const minutes = this.pad(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    );
    const seconds = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.refs.days.textContent = days;
    this.refs.hours.textContent = hours;
    this.refs.minutes.textContent = minutes;
    this.refs.seconds.textContent = seconds;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}
