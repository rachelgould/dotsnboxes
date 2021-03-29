<template>
  <div
    @click="makeActive(index)"
    @mouseover="changeHover(true)"
    @mouseleave="changeHover(false)"
  >
    <circle-point :is-active="isActive" :hovered="hovered" />
    <div
      v-if="data.right === null"
      class="z-10 w-100 h-0.5 bg-black relative -top-1.5"
    />
    <div
      v-if="data.bottom === null"
      class="z-10 h-full w-0.5 bg-black relative -top-1.5"
    />
  </div>
</template>

<script>
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
    makeActive: {
      type: Function,
      default: () => {},
    },
    activeCell: {
      required: true,
    },
  },
  data: () => ({
    hovered: false,
  }),
  computed: {
    canHover() {
      return false
    },
  },
  methods: {
    changeHover(newVal) {
      if (this.canHover) {
        this.hovered = newVal
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
