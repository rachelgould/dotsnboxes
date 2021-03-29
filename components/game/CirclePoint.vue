<template>
  <div
    :class="[
      isActive ? activeClass : '',
      hovered ? hoverClass : '',
      defaultClass,
    ]"
  ></div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    hovered: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    defaultClass:
      'rounded-full h-2 w-2 bg-yellow-500 transition-all z-50 relative',
    activeClass: 'ring-2 ring-offset-2 ring-yellow-600',
    hoverClass: 'ring-2 ring-offset-2 ring-yellow-400',
  }),
}
</script>

<style lang="scss" scoped></style>
