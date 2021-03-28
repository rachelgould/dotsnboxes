<template>
  <div>
    <base-button :click-action="startGame">Hello</base-button>
    <div>
      {{ game }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseButton from '@/components/base/BaseButton'

export default {
  name: 'game',
  components: { BaseButton },
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
