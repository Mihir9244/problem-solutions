const pairs = []
const setA = []
const setB = []
const threshold = 0.5 
const m = 5
const n = 7

for (let i = 0; i < m; i++) {
  setA.push({ x: Math.random(), y: Math.random() })
}

for (let i = 0; i < n; i++) {
  setB.push({ x: Math.random(), y: Math.random() })
}


for (const pointA of setA) {
  for (const pointB of setB) {
    const distance = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2))
    if (distance < threshold) {
      pairs.push({ pointA, pointB, distance })
    }
  }
}
console.log(pairs)