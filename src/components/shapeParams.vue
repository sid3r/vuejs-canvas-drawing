<template>
  <div>
    <div v-if="shape" class="flex items-center justify-start">
      <!-- Layer name -->
      <!-- <span class="w-auto text-xs mx-2 text-gray-700"></span> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        wi10h="10"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-auto text-xs mx-2 text-gray-700"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
      <input
        v-model="shape.config.name"
        type="text"
        class="w-24 bg-transparent border border-gray-900 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
      />
      <!-- Fill dropdown -->
      <div class="relative ml-2">
        <button
          class="flex items-center px-2 text-sm text-gray-700 h-12 overflow-hidden focus:outline-none"
          :class="[activeDropdown === 'fill' ? 'bg-gray-900' : '']"
          @click="setDropdown('fill')"
        >
          Fill
        </button>
        <div
          v-if="activeDropdown === 'fill'"
          class="absolute z-50 left-0 w-56 mt-0 py-2 bg-gray-900 shadow-xl"
        >
          <div class="flex items-center px-2 mb-2">
            <span class="w-1/2 text-xs text-gray-700">Enabled</span>
            <input
              v-model="shape.config.fillEnabled"
              class="leading-tight h-3 w-3 text-indigo-600"
              type="checkbox"
            />
          </div>
          <div class="flex items-center px-2">
            <span class="w-1/2 text-xs text-gray-700">Color</span>
            <input
              v-model="shape.config.fill"
              type="color"
              class="w-1/2 h-8 apprearance-none bg-transparent rounded-xs focus:outline-none"
            />
          </div>
        </div>
      </div>
      <!-- Border Dropdown -->
      <div class="relative">
        <button
          class="block text-sm px-2 text-gray-700 h-12 overflow-hidden focus:outline-none"
          :class="[activeDropdown === 'border' ? 'bg-gray-900' : '']"
          @click="setDropdown('border')"
        >
          Border
        </button>
        <div
          v-if="activeDropdown === 'border'"
          class="absolute z-50 left-0 w-56 mt-0 py-2 bg-gray-900 shadow-xl"
        >
          <div class="flex items-center px-2 mb-2">
            <span class="w-1/2 text-xs text-gray-700">Enabled</span>
            <input
              v-model="shape.config.strokeEnabled"
              class="leading-tight h-3 w-3 text-indigo-600"
              type="checkbox"
            />
          </div>
          <div class="flex items-center px-2">
            <span class="w-1/2 text-xs text-gray-700">Color</span>
            <input
              v-model="shape.config.stroke"
              type="color"
              class="w-1/2 h-8 apprearance-none bg-transparent rounded-xs focus:outline-none"
            />
          </div>
          <div class="flex items-center px-2">
            <span class="w-1/2 text-xs text-gray-700">Width</span>
            <input
              v-model="strokeWidth"
              type="number"
              step="1"
              min="0"
              class="w-1/2 h-8 bg-transparent border border-gray-800 rounded-sm text-left text-gray-600 text-xs px-2 py-1 focus:outline-none"
            />
          </div>
          <div v-if="cornerRadius" class="flex flex-col px-2">
            <span class="w-1/2 text-xs text-gray-700">Radius</span>
            <div class="flex items-center mt-1">
              <input
                v-model="cornerRadius[0]"
                type="number"
                min="0"
                class="w-1/4 bg-transparent border border-gray-800 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
              />
              <input
                v-model="cornerRadius[1]"
                type="number"
                min="0"
                class="w-1/4 bg-transparent border border-gray-800 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
              />
              <input
                v-model="cornerRadius[2]"
                type="number"
                min="0"
                class="w-1/4 bg-transparent border border-gray-800 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
              />
              <input
                v-model="cornerRadius[3]"
                type="number"
                min="0"
                class="w-1/4 bg-transparent border border-gray-800 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- star options -->
      <div v-if="shape.type == 'star'" class="relative">
        <span class="w-auto text-xs mx-2 text-gray-700">Points</span>
        <input
          v-model="shape.config.numPoints"
          type="number"
          class="w-16 bg-transparent border border-gray-900 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
        />
        <span class="w-auto text-xs mx-2 text-gray-700">Inner radius</span>
        <input
          v-model="shape.config.innerRadius"
          type="number"
          class="w-16 bg-transparent border border-gray-900 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
        />
        <span class="w-auto text-xs mx-2 text-gray-700">Outer radius</span>
        <input
          v-model="shape.config.outerRadius"
          type="number"
          class="w-16 bg-transparent border border-gray-900 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
        />
      </div>
      <!-- text options -->
      <div v-if="shape.type == 'text'" class="relative">
        <span class="w-auto text-xs mx-2 text-gray-700">Font</span>
        <input
          v-model="shape.config.fontFamily"
          type="text"
          class="w-24 bg-transparent border border-gray-900 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
        />
        <select
          v-model="shape.config.fontStyle"
          class="w-24 bg-transparent border border-gray-900 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="italic">Italic</option>
        </select>
        <span class="w-auto text-xs mx-2 text-gray-700">Size</span>
        <input
          v-model="shape.config.fontSize"
          type="number"
          class="w-16 bg-transparent border border-gray-900 rounded-xs text-gray-600 text-xs px-2 py-1 focus:outline-none"
        />
      </div>
    </div>
    <div v-else class="flex items-center">
      <div class="ml-2 text-gray-500 text-xs">
        {{ document.name }}
      </div>
      <div class="ml-3 text-gray-500 text-xs">
        {{ document.width + "x" + document.height + "px" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { shape: Object, document: Object, activeDropdown: String },
  computed: {
    comphape() {
      return this.shape;
    },
    strokeWidth: {
      get() {
        return this.shape.config.strokeWidth;
      },
      set(newval) {
        this.shape.config.strokeWidth = Number(newval);
      }
    },
    cornerRadius() {
      return this.shape.config.cornerRadius;
    }
  },
  watch: {
    shape: {
      deep: true,
      handler() {
        this.$emit("shape-edit");
      }
    }
  },
  methods: {
    setDropdown(item) {
      this.$emit("dropdown-toggle", item);
    },
    normalizeKey(key) {
      this.shape.config[key] = Number(this.shape.config[key]);
    }
  }
};
</script>

<style></style>
