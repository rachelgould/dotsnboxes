<template>
  <div>
    <circle-point />
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
  },
  components: { CirclePoint },
}
</script>

<style lang="scss" scoped></style>
