export default function smallestEnclosingCircle(coordinates) {
  const copiedCoordinates = coordinates.slice();
  shuffle(copiedCoordinates);
  return welzl(copiedCoordinates, coordinates.length, [], 0);
}

function shuffle(arr) {
  let i, j, temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function welzl(points, n, boundary, b) {
  let localCircle = null;

  if (b === 3) {
    localCircle = calcMinimalCircleFor3(boundary[0], boundary[1], boundary[2]);
  } else if (n === 1 && b === 0) {
    localCircle = { x: points[0].x, y: points[0].y, r: 0 };
  } else if (n === 0 && b === 2) {
    localCircle = calcMinimalCircleFor2(boundary[0], boundary[1]);
  } else if (n === 1 && b === 1) {
    localCircle = calcMinimalCircleFor2(boundary[0], points[0]);
  } else {
    localCircle = welzl(points, n - 1, boundary, b);
    if (!isInCircle(points[n - 1], localCircle)) {
      boundary[b++] = points[n - 1];
      localCircle = welzl(points, n - 1, boundary, b);
    }
  }

  return localCircle;
}

function calcMinimalCircleFor2(p1, p2) {
  const p1x = p1.x,
    p1y = p1.y,
    p2x = p2.x,
    p2y = p2.y,
    cx = 0.5 * (p1x + p2x),
    cy = 0.5 * (p1y + p2y);

  return {
    x: cx,
    y: cy,
    r: Math.sqrt((p1x - cx) * (p1x - cx) + (p1y - cy) * (p1y - cy)),
  };
}

function calcMinimalCircleFor3(p1, p2, p3) {
  const p1x = p1.x,
    p1y = p1.y,
    p2x = p2.x,
    p2y = p2.y,
    p3x = p3.x,
    p3y = p3.y,
    a = p2x - p1x,
    b = p2y - p1y,
    c = p3x - p1x,
    d = p3y - p1y,
    e = a * (p2x + p1x) * 0.5 + b * (p2y + p1y) * 0.5,
    f = c * (p3x + p1x) * 0.5 + d * (p3y + p1y) * 0.5,
    det = a * d - b * c,
    cx = (d * e - b * f) / det,
    cy = (-c * e + a * f) / det;

  return {
    x: cx,
    y: cy,
    r: Math.sqrt((p1x - cx) * (p1x - cx) + (p1y - cy) * (p1y - cy)),
  };
}

function isInCircle(p, c) {
  return (c.x - p.x) * (c.x - p.x) + (c.y - p.y) * (c.y - p.y) <= c.r * c.r;
}
