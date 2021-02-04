<template>
  <div class="fixed flex justify-center top-0 right-0 left-0">
    <div
      v-if="message"
      :class="{
        'bg-red-600 text-white': message.type === 'error',
        'bg-green-600 text-white': message.type === 'success'
      }"
      class="rounded-sm shadow-md px-3 py-1 mt-3"
      style="max-width: 240px"
    >
      <div class="flex text-xs items-center">
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: null
    };
  },
  mounted() {
    this.$root.$on("flashmessage", message => {
      this.message = message;
      setTimeout(() => (this.message = null), 3000);
    });
  }
};
</script>
