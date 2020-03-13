const R = 0;
const G = 1;
const B = 2;
const A = 3;

let fs = require('fs');
let path = require('path');

function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp, index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function randomPoints(rgbMatrix, n = 30) {
  let points = [];
  let h = rgbMatrix.length;
  let w = rgbMatrix[0].length;
  for (let i = 0; i < h * w; i++) {
    let y = parseInt(i / w);
    let x = parseInt(i % w);
    if (rgbMatrix[y][x][A] === 255) {
      points.push({ i: i, y, x, rgba: rgbMatrix[y][x] });
    }
  }
  points = getRandomArrayElements(points, n).filter(p => !!p);
  return points;
}

function getH(res) {
  return res.length;
}

function getW(res) {
  return res[0].length;
}

function getSimilarRate(bgData, y, x, points) {
  // 点差和
  return points.map(p => {
      // rgb和
      return [R, G, B].map((i) => Math.abs(bgData[y + p.y][x + p.x][i] - p.rgba[i])).reduce((a, b) => a + b)
    })
    .reduce((a, b) => a + b, 0);
}

function getMostPoint(bgData, res) {
  let maxh = bgData.length - res.h;
  let maxw = bgData[0].length - res.w;
  let mostPoint = [0, 0, Infinity];
  for (let y = 0; y < maxh; y++) {
    for (let x = 0; x < maxw; x++) {
      let r = getSimilarRate(bgData, y, x, res.points);
      // console.log(r);
      if (r < mostPoint[2]) { mostPoint = [y, x, r]; }
    }
  }
  return { y: mostPoint[0], x: mostPoint[1], w: res.w, h: res.h, disparity: mostPoint[2] }
}


module.exports = {
  getRandomArrayElements,
  randomPoints,
  getSimilarRate,
  getMostPoint,
}