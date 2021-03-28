<template>
  <div :class="gridClass">
    <div v-for="cell in game" :key="`gr${cell}`">
      <circle-point />
    </div>
  </div>
</template>

<script>
import CirclePoint from '@/components/game/CirclePoint'

export default {
  name: 'board',
  components: { CirclePoint },
  data: (inst) => ({
    gridClass: `w-80 h-80 grid grid-cols-${inst.$store.state.settings.columns} grid-rows-${inst.$store.state.settings.rows}`,
  }),
  computed: {
    game() {
      return this.$store.state.board
    },
    rows() {
      return this.$store.state.settings.rows
    },
    columns() {
      return this.$store.state.settings.columns
    },
  },
}
</script>

<style lang="scss" scoped></style>
