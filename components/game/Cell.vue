<template>
  <div>
    <circle-point :is-active="isActive" />
  </div>
</template>

<script>
import CirclePoint from '@/components/game/CirclePoint'

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  components: { CirclePoint },
}
</script>

<style lang="scss" scoped></style>
