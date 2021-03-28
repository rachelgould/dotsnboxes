<template>
  <div :class="[isActive ? activeClass : '', defaultClass]"></div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    defaultClass:
      'rounded-full h-2 w-2 bg-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600',
    activeClass: 'ring-2 ring-offset-2 ring-yellow-600',
  }),
}
</script>

<style lang="scss" scoped></style>
