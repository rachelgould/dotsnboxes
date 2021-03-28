export const state = () => ({
  settings: {
    rows: 3,
    columns: 3,
  },
  players: [{ name: '😍' }, { name: '😂' }],
  board: false,
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
    for (let i = 0; i < rows; i++) {
      let thisRow = []
      for (let z = 0; z < columns; z++) {
        thisRow.push({
          top: null,
          bottom: null,
          left: null,
          right: null,
        })
      }
      board.push(thisRow)
    }
    commit('updateBoard', board)
  },
}
