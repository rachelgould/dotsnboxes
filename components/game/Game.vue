<template>
  <div>
    <h1
      class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl mb-8"
    >
      <span class="block xl:inline">Dots</span>
      <span class="block text-yellow-600 xl:inline">'n Boxes</span>
    </h1>
    <base-button :click-action="handleStartClick">
      {{ started ? 'New Game' : 'Start Game' }}
    </base-button>
    <p class="m-6">{{ getActivePlayer }}'s Turn!</p>
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
  data: () => ({
    started: false,
  }),
  computed: {
    ...mapGetters(['getActivePlayer']),
  },
  methods: {
    ...mapActions({
      startGame: 'initBoard',
    }),
    handleStartClick() {
      this.started = true
      this.startGame()
    },
  },
}
</script>

<style scoped></style>
