// vytvorenie canvasu
let canvas = document.createElement('canvas');
canvas.height = 700;
canvas.width = 1200;
let gameName = "FX Run!";
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);