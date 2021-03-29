export const state = () => ({
  settings: {
    rows: 3,
    columns: 4,
  },
  players: [{ name: '😍' }, { name: '😂' }],
  board: [],
  activeCell: null,
})

export const getters = {
  getActiveCellData: (state) =>
    state.activeCell ? state.board[state.activeCell] : null,

  cellIsClickable: (state, getters) => (index) => {
    const active = getters['getActiveCellData']
    if (
      (active.bottom === 'illegal' || active.bottom === 'filled') &&
      (active.right === 'illegal' || active.right === 'filled')
    ) {
      return false
    }
    // Todo: logic here
    return true
  },
}

export const mutations = {
  updateBoard(state, nextState) {
    state.board = nextState
  },
  updateActive(state, nextState) {
    state.activeCell = nextState
  },
  addLine(state, index, direction) {
    console.log('Add line!')
  },
  // add(state, text) {
  //   state.list.push({
  //     text,
  //     done: false,
  //   })
  // },
  // remove(state, { todo }) {
  //   state.list.splice(state.list.indexOf(todo), 1)
  // },
  // toggle(state, todo) {
  //   todo.done = !todo.done
  // },
}

export const actions = {
  initBoard({ state, commit }) {
    let board = []
    const { rows, columns } = state.settings
    const totalDots = rows * columns
    for (let i = 0; i < totalDots; i++) {
      board.push({
        index: i,
        top: i > columns - 1 ? null : 'illegal',
        bottom: i < totalDots - columns ? null : 'illegal',
        left: i !== 0 && i % columns !== 0 ? null : 'illegal',
        right: (i + 1) % columns !== 0 ? null : 'illegal',
      })
    }
    commit('updateBoard', board)
  },
  changeActiveCell({ commit }, index) {
    commit('updateActive', index)
  },
  clickCell({ state, commit, getters }, index) {
    if (state.activeCell === null) {
      commit('updateActive', index)
    } else if (getters['cellIsClickable'](index)) {
      // Todo: fill in right or bottom!
      let direction = 'dunno'
      commit('addLine', index, direction)
    }
  },
}
