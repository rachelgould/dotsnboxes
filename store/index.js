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
  getBoard: (state) => state.board,
  getActiveCell: (state) => state.activeCell,
  getCellData: (state) => (id) => state.board[id],
  getActiveCellData: (state, getters) => {
    return state.activeCell !== null
      ? getters.getCellData(state.activeCell)
      : null
  },
  getBorderDir: (state, getters) => (clickedId) => {
    const { columns } = state.settings
    const active = getters.getActiveCellData
    const clicked = getters.getCellData(clickedId)

    if (!active) {
      console.log('no active')
      return
    }

    if (active.index + 1 === clickedId && active.right !== 'illegal') {
      return 'right'
    }
    if (active.index - 1 === clickedId && clicked.right !== 'illegal') {
      return 'left'
    }
    if (
      (clickedId - active.index) % columns === 0 &&
      active.bottom !== 'illegal'
    ) {
      return 'bottom'
    }
    if (
      (active.index - clickedId) % columns === 0 &&
      clickedId.bottom !== 'illegal'
    ) {
      return 'top'
    }
  },
}

export const mutations = {
  updateBoard(state, nextState) {
    state.board = nextState
  },
  updateActive(state, nextState) {
    state.activeCell = nextState
  },
}

export const actions = {
  initBoard({ state, commit }) {
    let board = []
    const { rows, columns } = state.settings
    const totalDots = rows * columns
    for (let i = 0; i < totalDots; i++) {
      board.push({
        index: i,
        bottom: i < totalDots - columns ? null : 'illegal',
        right: (i + 1) % columns !== 0 ? null : 'illegal',
      })
    }
    commit('updateBoard', board)
  },
  changeActiveCell({ commit }, index) {
    commit('updateActive', index)
  },
  addLine({ commit, getters }, index) {
    const borderDirection = getters.getBorderDir(index)
    if (borderDirection) {
      const boardState = [...getters.getBoard]
      if (borderDirection === 'right' || borderDirection === 'bottom') {
        boardState[getters.getActiveCell][borderDirection] = 'filled'
      }
      if (borderDirection === 'left') {
        boardState[index]['right'] = 'filled'
      }
      if (borderDirection === 'top') {
        boardState[index]['bottom'] = 'filled'
      }
      commit('updateBoard', boardState)
      commit('updateActive', null)
    } else {
      // TODO: Add something like error state
    }
  },
  clickCell({ state, dispatch, commit }, index) {
    if (state.activeCell === null) {
      commit('updateActive', index)
    } else {
      dispatch('addLine', index)
    }
  },
}
