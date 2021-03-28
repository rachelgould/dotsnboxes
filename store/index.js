export const state = () => ({
  settings: {
    rows: 3,
    columns: 4,
  },
  players: [{ name: '😍' }, { name: '😂' }],
  board: [],
})

export const mutations = {
  updateBoard(state, nextState) {
    state.board = nextState
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
        top: i > columns - 1 ? null : 'illegal',
        bottom: i < totalDots - columns ? null : 'illegal',
        left: i !== 0 && i % columns !== 0 ? null : 'illegal',
        right: (i + 1) % columns !== 0 ? null : 'illegal',
      })
    }
    commit('updateBoard', board)
  },
}
