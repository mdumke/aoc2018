/*
 * Graph helper class that manages assembly order computation
 *
 */

class Graph {
  constructor (edges, numTypes) {
    this.n = numTypes
    this.matrix = this.buildAdjacencyMatrix(edges, numTypes)
  }

  // returns the total time in which the assembly is finished
  assemble (numWorkers, getTaskTime) {
    const getAvailableTasks = () => this.unblockedNodes()
      .filter(task => !ongoing.includes(task) && !done.includes(task))

    let completed, ongoing, waitingTime
    let available = this.unblockedNodes()
    let workers = []
    let done = []
    let time = 0

    while (available.length || workers.length) {
      // distribute tasks to available workers
      while (available.length && workers.length < numWorkers) {
        const task = available.shift()
        workers.push({ task, busy: getTaskTime(task) })
      }

      // find next finished task(s)
      waitingTime = workers.reduce((min, { busy }) => {
        return Math.min(min, busy)
      }, Infinity)

      time += waitingTime

      workers = workers.map(({ task, busy }) => ({
        task, busy: busy - waitingTime
      }))

      completed = workers
        .filter(({ busy }) => busy === 0)
        .map(({ task }) => task)

      workers = workers.filter(({ busy }) => busy > 0)
      ongoing = workers.map(({ task }) => task)

      // mutate matrix-state to free blocked tasks
      this.freeAll(completed)

      // recompute available tasks
      done = [...done, ...completed]

      available = getAvailableTasks()
    }

    return time
  }

  // returns a valid processing order as an array of nodes
  findProcessingOrder () {
    let result = []
    let fringe = new Set(this.unblockedNodes())

    while (fringe.size) {
      let current = this.selectNextNode(fringe)
      fringe.delete(current)

      let freed = this.free(current)
      freed.forEach(node => fringe.add(node))

      result.push(current)
    }

    return result
  }

  // returns the smallest unblocked item on the fringe
  selectNextNode (fringe) {
    let nodes = Array.from(fringe).sort(ascending)

    for (let node of nodes) {
      if (!this.isBlocked(node)) return node
    }

    throw new Error('No unblocked node found')
  }

  // clears and returns all tasks waiting for the given tasks to finish
  freeAll (tasks) {
    return tasks.reduce((freed, task) => {
      return [...freed, ...this.free(task)]
    }, [])
  }

  // clears nodes waiting for this task to finish, returns freed tasks
  free (task) {
    let freed = []

    for (let col = 0; col < this.n; col++) {
      if (!this.matrix[task][col]) continue

      freed = [...freed, col]
      this.matrix[task][col] = null
    }

    return freed
  }

  // returns true if any previous step is still required
  isBlocked (node) {
    for (let row = 0; row < this.n; row++) {
      if (this.matrix[row][node]) return true
    }

    return false
  }

  // returns a list of all currently unblocked nodes
  unblockedNodes () {
    const unblocked = []

    for (let node = 0; node < this.n; node++) {
      if (!this.isBlocked(node)) unblocked.push(node)
    }

    return unblocked
  }

  // returns an nxn null-matrix with an entry for each edge
  buildAdjacencyMatrix (edges, n) {
    const matrix = Array.from(Array(n), () => Array(n).fill(null))
    edges.forEach(([ i, j ]) => { matrix[i][j] = 1 })

    return matrix
  }
}

// helper function for array sort
const ascending = (a, b) => a - b

module.exports = Graph
