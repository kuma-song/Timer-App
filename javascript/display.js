window.onload = function () {
  fullscreenChange();

  let timeIntervId = setInterval(currentTime, 500);
};

let fullscreen = $id("fullscreen");
let fullscreen_exit = $id("fullscreen_exit");

fullscreen.addEventListener(
  "click",
  function () {
    document.body.webkitRequestFullscreen();
  },
  false
);
fullscreen_exit.addEventListener(
  "click",
  function () {
    document.webkitExitFullscreen();
  },
  false
);

document.addEventListener("webkitfullscreenchange", fullscreenChange, false);

function fullscreenChange() {
  if (document.fullscreenElement) {
    fullscreen.style.display = "none";
    fullscreen_exit.style.display = "";
  } else {
    fullscreen.style.display = "";
    fullscreen_exit.style.display = "none";
  }
}

let open_controller = $id("open_controller")

open_controller.addEventListener("click", openController, false);

function openController() {
  let controller_win;
  controller_win = window.open(
    "html/controller.html",
    "controller_win",
    "top=100,left=100,width=720,height=700"
  );
}

function $id(id) {
  return document.getElementById(id);
}

// 現在時刻
function currentTime() {
  var hour, min;
  var current_time_hour = $id("current_time_hour");
  var current_time_min = $id("current_time_min");
  var current_time_colon = $id("current_time_colon");
  var now = new Date();

  hour = now.getHours();
  min = now.getMinutes();
  min = ("0" + min).slice(-2);
  current_time_hour.innerHTML = hour;
  current_time_min.innerHTML = min;
  current_time_colon.innerHTML = ":";

  current_time_colon.classList.toggle("colon_on");
}
