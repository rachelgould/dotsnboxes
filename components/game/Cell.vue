<template>
  <div
    @click="changeActiveCell(index)"
    @mouseover="changeHover(true)"
    @mouseleave="changeHover(false)"
  >
    <circle-point :is-active="isActive" :hovered="hovered" />
    <div
      v-if="data.right === 'filled'"
      class="z-10 w-100 h-0.5 bg-yellow-800 relative -top-1.5"
    />
    <div
      v-if="data.bottom === 'filled'"
      class="z-10 h-full w-0.5 bg-yellow-800 relative -top-1.5"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CirclePoint from '@/components/game/CirclePoint'

export default {
  components: { CirclePoint },
  props: {
    data: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    hovered: false,
  }),
  computed: {
    canHover() {
      return true
    },
  },
  methods: {
    changeHover(newVal) {
      if (this.canHover) {
        this.hovered = newVal
      }
    },
    ...mapActions({
      changeActiveCell: 'changeActiveCell',
    }),
  },
}
</script>

<style lang="scss" scoped></style>
