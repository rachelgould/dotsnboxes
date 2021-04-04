export const state = () => ({
  settings: {
    rows: 3,
    columns: 4,
  },
  players: [{ name: '😍' }, { name: '😂' }],
  board: [],
  activeCell: null,
  activePlayer: 0,
})

export const getters = {
  getBoard: (state) => state.board,
  getActivePlayer: (state) => state.players[state.activePlayer].name,
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
      return
    }

    if (active.index + 1 === clickedId && active.right !== 'illegal') {
      return 'right'
    }
    if (active.index - 1 === clickedId && clicked.right !== 'illegal') {
      return 'left'
    }
    if (
      clickedId < active.index &&
      (active.index - clickedId) % columns === 0 &&
      clickedId.bottom !== 'illegal'
    ) {
      return 'top'
    }
    if (
      (clickedId - active.index) % columns === 0 &&
      active.bottom !== 'illegal'
    ) {
      return 'bottom'
    }
  },
}

export const mutations = {
  updateBoard(state, nextState) {
    state.board = nextState
  },
  updateCell(state, { index, direction }) {
    let nextState = [...state.board]
    let nextChangedCell = { ...state.board[index] }
    nextChangedCell[direction] = 'filled'
    nextState[index] = nextChangedCell
    state.board = nextState
  },
  updateActive(state, nextState) {
    state.activeCell = nextState
  },
  flipActivePlayer(state) {
    state.activePlayer = state.activePlayer ? 0 : 1
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
  endTurn({ commit }) {
    commit('flipActivePlayer')
  },
  addLine({ commit, getters }, index) {
    const borderDirection = getters.getBorderDir(index)
    const changePayload = {}
    if (borderDirection) {
      if (borderDirection === 'right' || borderDirection === 'bottom') {
        changePayload.index = getters.getActiveCell
        changePayload.direction = borderDirection
      }
      if (borderDirection === 'left' || borderDirection === 'top') {
        changePayload.index = index
        changePayload.direction =
          borderDirection === 'left' ? 'right' : 'bottom'
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
      dispatch('endTurn')
      // TODO: detect new boxes and put player icon inside it
    }
  },
}
