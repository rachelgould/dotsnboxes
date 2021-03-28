<template>
  <div @click="makeActive(index)">
    <circle-point :is-active="isActive" />
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
  },
}
</script>

<style lang="scss" scoped></style>
