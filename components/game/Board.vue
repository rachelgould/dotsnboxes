<template>
  <div :class="gridClass">
    <cell
      v-for="(cell, i) in game"
      :key="`gr${i}`"
      :data="cell"
      :is-active="i === activeCell"
      :index="i"
    />
  </div>
</template>

<script>
import Cell from '@/components/game/Cell'

export default {
  name: 'board',
  components: { Cell },
  data: (inst) => ({
    gridClass: `w-80 h-80 mx-auto mt-16 grid grid-cols-${inst.$store.state.settings.columns} grid-rows-${inst.$store.state.settings.rows}`,
  }),
  computed: {
    game() {
      return this.$store.state.board
    },
    activeCell() {
      return this.$store.state.activeCell
    },
  },
}
</script>

<style lang="scss" scoped></style>
