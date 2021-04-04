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
  updateCell(state, { index, direction }) {
    console.log(index, direction)
    let nextState = [...state.board]
    let nextChangedCell = { ...state.board[index] }
    nextChangedCell[direction] = 'filled'
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
  addLine({ commit, getters }, index) {
    const borderDirection = getters.getBorderDir(index)
    const changePayload = {}
    if (borderDirection) {
      if (borderDirection === 'right' || borderDirection === 'bottom') {
        changePayload.index = getters.getActiveCell
        changePayload.direction = borderDirection
        console.log('changePayload', changePayload)
      }
      if (borderDirection === 'left') {
        changePayload.index = index
        changePayload.direction = 'right'
      }
      if (borderDirection === 'top') {
        changePayload.index = index
        changePayload.direction = 'bottom'
      }
      commit('updateCell', changePayload)
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
