import makeColorGradient from "./colorGradient.js";

let distance = 0;
let rate = 18;
let velocity = 2;
let colorFrequency = 1.5;

let shapes = [];

const cycle = (function () {
  let count = 0;
  return () => {
    count++;
    return count;
  };
})();

let frequency = (2 * Math.PI) / (rate * colorFrequency);
const colorGradient = makeColorGradient(
  frequency,
  frequency,
  frequency,
  0,
  2,
  4
);

class Circle {
  constructor(color = "purple", x = 0, y = 0) {
    this.radius = 0;
    this.color = color;
    this.x = x;
    this.y = y;
    this.update = () => (this.radius += velocity);
    this.draw = (ctx) => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
      ctx.strokeStyle = this.color;
      ctx.stroke();
    };
  }
}

const addNewShape = () => {
  if (distance % rate === 0 || distance === 0) {
    let color = colorGradient[cycle() % colorGradient.length];
    shapes.push(new Circle(color));
  }
};

const removeBreachedShape = (width, height) => {
  // checks if the oldest shape has breached the canvas edge and removes it
  if (shapes[0].radius > width / 2 || shapes[0].radius > height / 2) {
    shapes.shift();
  }
};

function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  ctx.translate(width / 2, height / 2);

  shapes.forEach((shape) => {
    shape.draw(ctx);
    shape.update();
  });

  addNewShape();
  removeBreachedShape(width, height);
  distance += velocity;

  window.requestAnimationFrame(draw);
}

draw();
