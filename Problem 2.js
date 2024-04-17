function Distance (pointA, pointB) {
    let sum = 0
    if (!pointA || !pointB || pointA.length !== pointB.length) {
      return 'Invalid input points'
    }
    for (let i = 0; i < pointA.length; i++) {
      sum += Math.pow(pointA[i] - pointB[i], 2)
    }
    return Math.sqrt(sum)
  }
  
  function buildNodeTree (points) {
    const stack = [{ points, axis: 0 }]
    const dimensions = points[0].length
  
    const root = { points, axis: 0 }
  
    stack.push(root)
  
    while (stack.length) {
      const node = stack.pop()
  
      const { points, axis } = node
  
      const length = points.length
  
      if (length <= 1) {
        node.point = points[0]
        node.left = null
        node.right = null
        continue
      }
  
      points.sort((a, b) => a[axis] - b[axis])
  
      const medianIndex = Math.floor(length / 2)
  
      const medianPoint = points[medianIndex]
  
      node.point = medianPoint
  
      node.left = { axis: (axis + 1) % dimensions }
      node.right = { axis: (axis + 1) % dimensions }
  
      stack.push({ points: points.slice(0, medianIndex), ...node.left })
      stack.push({ points: points.slice(medianIndex + 1), ...node.right })
    }
    return root
  }
  
  function findNearestData (tree, point) {
    const data = point
    let best = null
    let bestDist = Infinity
    const stack = [tree]
  
    while (stack.length) {
      const node = stack.pop()
  
      if (!node) continue
  
      const { point, axis, left, right } = node
  
      const dist = Distance(data, point)
      if (dist < bestDist) {
        best = point
  
        bestDist = dist
      }
  
      const planeDist = data[axis] - point !== undefined ? 0 : point[axis]
  
      const closest = planeDist < 0 ? left : right
      const farthest = planeDist < 0 ? right : left
  
      stack.push(closest)
      if (Math.abs(planeDist) < bestDist) {
        stack.push(farthest)
      }
    }
  
    return best
  }
  
  function findPairsWithDistanceLessThanEpsilon (setA, setB, epsilon) {
    const kdTreeB = buildNodeTree(setB)
    const pairs = []
  
    for (const pointA of setA) {
      const nearestNeighborB = findNearestData(kdTreeB, pointA)
      const distance = Distance(pointA, nearestNeighborB)
      if (distance < epsilon) {
        pairs.push({ pointA, pointB: nearestNeighborB, distance })
      }
    }
  
    return pairs
  }
  
  const setA = [
    [1, 2],
    [3, 4],
    [5, 6]
  ]
  
  const setB = [
    [2, 3],
    [4, 5],
    [6, 7]
  ]
  const epsilon = 2
  
  const pairs = findPairsWithDistanceLessThanEpsilon(setA, setB, epsilon)
  console.log('Pairs with distance less than epsilon:', pairs)