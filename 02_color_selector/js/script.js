window.addEventListener('load', start());

textboxRed = document.querySelector('#text-red');
textboxGreen = document.querySelector('#text-green');
textboxBlue = document.querySelector('#text-blue');
colorBox = document.querySelector('#color-box');

function start() {
  const redInput = document.querySelectorAll('input[type=range]');
  redInput.forEach(input => {
    input.addEventListener('change', handleChange);
  });
}

function handleChange(event) {
  const textbox = {
    'range-red': textboxRed,
    'range-green': textboxGreen,
    'range-blue': textboxBlue,
  }[event.target.id];

  textbox.value = event.target.value;

  const color = `rgb(${textboxRed.value},${textboxGreen.value},${textboxBlue.value})`;
  colorBox.style.backgroundColor = color;
}