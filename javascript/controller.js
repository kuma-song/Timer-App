// Get element by id
function $id(id, target_window = window) {
  return target_window.document.getElementById(id);
}

let main, sub;
import Clock from "./clock.js";

createSubSection();

main = new Clock("main");
console.log("main was created");
sub = new Clock("sub");
console.log("sub was created");
console.log(sub.preview);

window.addEventListener(
  "load",
  function () {
    main.timerMatchCheck();
    main.alarmMode();
    sub.timerMatchCheck();
    sub.alarmMode();
  },
  false
);

// Create sub section
function createSubSection() {
  const main_clock_copy = $id("main_section").cloneNode(true);
  let attr;

  main_clock_copy.id = "sub_section";
  main_clock_copy.querySelectorAll("*").forEach(function (elem, num) {
    if (elem.innerHTML === "MAIN") {
      elem.innerHTML = replaceMainWithSub(elem.innerHTML);
    }
    if (elem.id) {
      elem.id = replaceMainWithSub(elem.id);
    }
    attr = elem.getAttribute("for");
    if (attr) {
      elem.setAttribute("for", replaceMainWithSub(attr));
    }
    attr = elem.getAttribute("name");
    if (attr) {
      elem.setAttribute("name", replaceMainWithSub(attr));
    }
  });

  console.log(main_clock_copy);
  $id("wrapper").appendChild(main_clock_copy);
}
function replaceMainWithSub(str) {
  str = str.replace("main", "sub");
  str = str.replace("MAIN", "SUB");
  return str;
}

// Add event listener ==========================================

const all_start_btn = $id("all_start");
const all_stop_btn = $id("all_stop");

const clocks = [main, sub];
clocks.forEach(function (clock) {
  // START / STOP Button clicked event
  all_start_btn.addEventListener(
    "click",
    function () {
      clock.start();
    },
    false
  );
  all_stop_btn.addEventListener(
    "click",
    function () {
      clock.stop();
    },
    false
  );
  clock.start_btn.addEventListener(
    "click",
    function () {
      clock.start();
    },
    false
  );
  clock.stop_btn.addEventListener(
    "click",
    function () {
      clock.stop();
    },
    false
  );

  // TIMER / ALARM Button clicked event
  clock.timer_mode.addEventListener(
    "change",
    function () {
      clock.switchMode();
    },
    false
  );
  clock.alarm_mode.addEventListener(
    "change",
    function () {
      clock.switchMode();
    },
    false
  );
  clock.alarm_mode.addEventListener(
    "click",
    function () {
      clock.alarmMode();
      console.log(clock.timer_mode.checked);
      console.log(clock.alarm_mode.checked);
    },
    false
  );

  // TIMER select changed event
  clock.timer_select.addEventListener(
    "change",
    function () {
      const selected_min = clock.timer_select.value;
      clock.form.timer_min.value = selected_min;
      clock.form.timer_sec.value = "0";
      clock.timer_matched.style.display = "";
      clock.timer_reload.style.display = "none";
    },
    false
  );

  // TIMER inputs changed event
  clock.form.timer_min.addEventListener(
    "change",
    function () {
      clock.timerMatchCheck();
    },
    false
  );
  clock.form.timer_sec.addEventListener(
    "change",
    function () {
      clock.timerMatchCheck();
    },
    false
  );

  // TIMER reload event
  clock.timer_reload.addEventListener(
    "click",
    function () {
      clock.timerReload();
    },
    false
  );

  // ALARM sec changed event
  clock.form.alarm_min.addEventListener(
    "change",
    function () {
      clock.zeroFill();
    },
    false
  );
});
