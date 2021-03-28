<template>
  <div>
    <base-button :click-action="startGame">Hello</base-button>
    <div>
      {{ game }}
      <board />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseButton from '@/components/base/BaseButton'
import CirclePoint from '@/components/game/CirclePoint'
import Board from '@/components/game/Board'

export default {
  name: 'game',
  components: { BaseButton, CirclePoint, Board },
  computed: {
    game() {
      return this.$store.state.board
    },
  },
  methods: {
    ...mapActions({
      startGame: 'initBoard',
    }),
  },
}
</script>

<style scoped></style>
