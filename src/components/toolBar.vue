<template>
  <div class="flex flex-col items-center mt-4 justify-center">
    <!-- square -->
    <button
      @click="newShape('rectangle')"
      class="appearance-non p-2 mb-2 text-gray-800 focus:outline-none hover:text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      </svg>
    </button>
    <!-- circle -->
    <button
      @click="newShape('circle')"
      class="appearance-non p-2 mb-2 text-gray-800 focus:outline-none hover:text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    </button>
    <!-- star -->
    <button
      @click="newShape('star')"
      class="appearance-non p-2 mb-2 text-gray-800 focus:outline-none hover:text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 64 64"
        fill="currentColor"
        stroke="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M62.7 23.2l-20-3.2-9-18.9c-.5-1.3-2.4-1.3-2.9 0L21.4 20l-20 2.9c-1.3.3-2.1 2.1-.8 3.2L15.1 41l-3.5 20.8c-.3 1.3 1.1 2.7 2.7 1.9l17.8-9.8 17.8 9.8c1.1.8 2.7-.5 2.4-1.9L48.9 41l14.4-14.9c1.3-1 .7-2.9-.6-2.9z"
        />
      </svg>
    </button>
    <!-- image -->
    <!-- <button
      @click="newShape('image')"
      class="appearance-non p-2 mb-2 text-gray-800 focus:outline-none hover:text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    </button> -->
    <!-- text -->
    <button
      @click="newShape('text')"
      class="appearance-non p-2 mb-2 text-gray-800 focus:outline-none hover:text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 64 64"
        fill="currentColor"
        stroke="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M41.6 64H21.23V17.3H0V0h62.77v17.3H41.6V64z" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    newShape(shape) {
      this.$emit("new-shape", shape);
    }
  }
};
</script>

<style></style>
