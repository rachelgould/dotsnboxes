<script>
export default {
  props: {
    clickAction: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<template>
  <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="clickAction">
    <slot />
  </button>
</template>

<style scoped>

</style>