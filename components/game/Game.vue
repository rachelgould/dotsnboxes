<template>
  <div>
    <p>{{ getActivePlayer }}'s Turn!</p>
    <base-button :click-action="startGame">Start Game</base-button>
    <div>
      <board />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/base/BaseButton'
import CirclePoint from '@/components/game/CirclePoint'
import Board from '@/components/game/Board'

export default {
  name: 'game',
  components: { BaseButton, CirclePoint, Board },
  computed: {
    ...mapGetters(['getActivePlayer']),
  },
  methods: {
    ...mapActions({
      startGame: 'initBoard',
    }),
  },
}
</script>

<style scoped></style>
