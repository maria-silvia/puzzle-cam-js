let SLIDER;

function setSlider() {
  SLIDER = document.getElementById("transparencyRange");
  SLIDER.value = TRANSPARENCY * 10;
  SLIDER.addEventListener("input", (event) => {
    TRANSPARENCY = event.target.value / 10;
  });
}
