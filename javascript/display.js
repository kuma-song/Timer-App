function $id(id) {
  return document.getElementById(id);
}

window.addEventListener("load", function () {
  fullscreenChange();
  setInterval(currentTime, 500);
});

// Fullscreen =========================================
const fullscreen = $id("fullscreen");
const fullscreen_exit = $id("fullscreen_exit");

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

// Controller =======================================================
const open_controller = $id("open_controller");

open_controller.addEventListener("click", openController, false);

function openController() {
  const controller_win = window.open(
    "controller.html",
    "controller_win",
    "top=100,left=100,width=720,height=700"
  );
}

// Current time ========================================
const current_time_hour = $id("current_time_hour");
const current_time_min = $id("current_time_min");
const current_time_colon = $id("current_time_colon");

function currentTime() {
  let hour, min;
  const now = new Date();

  hour = now.getHours();
  min = now.getMinutes();
  min = ("0" + min).slice(-2);
  current_time_hour.innerHTML = hour;
  current_time_min.innerHTML = min;
  current_time_colon.innerHTML = ":";

  current_time_colon.classList.toggle("colon_on");
}
