// Get element by id
function $id(id, target_window = window) {
  return target_window.document.getElementById(id);
}
// Display window - variable
const display_win = window.opener;

class Clock {
  constructor(name) {
    this.name = name;
    this.interv_id;
    this.time;
    if (name === "main") {
      this.form = document.forms.main_form;
    } else {
      this.form = document.forms.sub_form;
    }
    this.clock = $id(`${name}_clock`, display_win);
    this.preview = $id(`${name}_preview`);
    this.timer_mode = $id(`${name}_timer_mode`);
    this.alarm_mode = $id(`${name}_alarm_mode`);
    if (this.timer_mode.checked === true) {
      this.mode = "timer";
    } else {
      this.mode = "alarm";
    }
    this.timer_inputs = $id(`${name}_timer_inputs`);
    this.alarm_inputs = $id(`${name}_alarm_inputs`);
    this.start_btn = $id(`${name}_start`);
    this.stop_btn = $id(`${name}_stop`);
    this.timer_select = $id(`${name}_timer_select`);
    this.timer_matched = $id(`${name}_timer_matched`);
    this.timer_reload = $id(`${name}_timer_reload`);
  }

  switchMode() {
    if (this.timer_mode.checked === true) {
      this.mode = "timer";
      this.timer_inputs.classList.remove("disabled");
      this.alarm_inputs.classList.add("disabled");
    } else {
      this.mode = "alarm,";
      this.timer_inputs.classList.add("disabled");
      this.alarm_inputs.classList.remove("disabled");
    }
    this.timer_inputs.disabled = !this.timer_inputs.disabled;
    this.alarm_inputs.disabled = !this.alarm_inputs.disabled;
  }

  start() {
    const clock_type = this.name;
    const clock = this.clock;
    let hour, min, sec, time;
    const now = new Date();
    let now_total_second, alerm_total_second;

    this.ending_time = new Date();

    this.stop(true);

    if (this.mode === "timer") {
      hour = 0;
      min = Number(this.form.timer_min.value);
      sec = Number(this.form.timer_sec.value);
      time = min * 60 + sec;
    } else {
      hour = Number(this.form.alarm_hour.value);
      min = Number(this.form.alarm_min.value);
      sec = 0;
      now_total_second =
        now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
      alerm_total_second = hour * 60 * 60 + min * 60;
      if (alerm_total_second < now_total_second) {
        alerm_total_second += 24 * 60 * 60;
      }
      time = alerm_total_second - now_total_second;
    }
    this.time = time;

    this.ending_time.setSeconds(this.ending_time.getSeconds() + this.time);
    const ending_time = this.ending_time;
    this.interv_id = setInterval(this.updateClock.bind(this), 100);
  }

  stop(restart = false) {
    const clock = this.clock;

    clearInterval(this.interv_id);
    clock.classList.remove("over");

    if (!restart) {
      clock.classList.add("stop");
      clock.innerHTML = "00:00";
    }
    this.preview.innerHTML = clock.innerHTML;
  }

  updateClock(ending_time) {
    const now = new Date();
    ending_time = this.ending_time;
    const remaining_time = ending_time.getTime() - now.getTime();
    const clock = this.clock;
    const preview = this.preview;
    var hour, min, sec;

    this.time = Math.ceil(remaining_time / 1000);
    this.time = Math.floor(this.time);

    const time = this.time;
    let coefficient, prefix;
    if (time >= 0) {
      clock.classList.remove("stop");
      coefficient = 1;
      prefix = "";
    } else {
      // Less than 0
      clock.classList.add("over");
      coefficient = -1;
      prefix = "-";
    }
    hour = parseInt(time / (60 * 60), 10) * coefficient;
    min = parseInt((time - hour * 3600) / 60, 10) * coefficient;
    sec = (time % 60) * coefficient;
    min = ("0" + min).slice(-2);
    sec = ("0" + sec).slice(-2);
    if (hour === 0) {
      clock.innerHTML = prefix + min + ":" + sec;
    } else {
      clock.innerHTML = prefix + hour + ":" + min + ":" + sec;
    }
    preview.innerHTML = clock.innerHTML;
  }

  alarmMode() {
    const now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();

    if (min % 5 < 3) {
      min = min + (5 - (min % 5)) + 10;
    } else {
      min = min + (5 - (min % 5)) + 15;
    }
    if (min >= 60) {
      min -= 60;
      hour += 1;
      if (hour >= 24) {
        hour -= 24;
      }
    }
    this.form.alarm_hour.value = hour;
    this.form.alarm_min.value = ("0" + min).slice(-2);
  }

  timerMatchCheck() {
    if (
      this.form.timer_min.value === this.timer_select.value &&
      this.form.timer_sec.value == "0"
    ) {
      this.timer_matched.style.display = "";
      this.timer_reload.style.display = "none";
    } else {
      this.timer_matched.style.display = "none";
      this.timer_reload.style.display = "";
    }
  }

  timerReload() {
    const clock = this.name;
    // const timer_min = $id(`${clock}_timer_min`);
    // const timer_sec = $id(`${clock}_timer_sec`);
    // const timer_select = $id(`${clock}_timer_select`);

    this.form.timer_min.value = this.timer_select.value;
    this.form.timer_sec.value = "0";

    this.timerMatchCheck();
  }

  zeroFill() {
    let min = this.form.alarm_min.value;
    min = ("0" + min).slice(-2);
    this.form.alarm_min.value = min;
    console.log("*")
  }
}

export default Clock;
