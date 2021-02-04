<template>
  <div>
    <nav class="flex flex-col sm:flex-row mb-3">
      <button
        @click="setActiveTab('shapes')"
        :class="[
          activeTab == 'shapes'
            ? 'text-indigo-600 border-b-2 font-medium border-indigo-600'
            : 'text-gray-600 border-b-2 border-transparent text-xs hover:text-indigo-600'
        ]"
        class="mr-2 px-2 py-2 block focus:outline-none"
      >
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
        >
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      </button>
      <button
        @click="setActiveTab('images')"
        :class="[
          activeTab == 'images'
            ? 'text-indigo-600 border-b-2 font-medium border-indigo-600'
            : 'text-gray-600 border-b-2 border-transparent text-xs hover:text-indigo-600'
        ]"
        class="mr-2 px-2 py-2 block focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </button>
      <button
        @click="setActiveTab('styles')"
        :class="[
          activeTab == 'styles'
            ? 'text-indigo-600 border-b-2 font-medium border-indigo-600'
            : 'text-gray-600 border-b-2 border-transparent text-xs hover:text-indigo-600'
        ]"
        class="mr-2 px-2 py-2 block focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
      </button>
      <button
        @click="setActiveTab('config')"
        :class="[
          activeTab == 'config'
            ? 'text-indigo-600 border-b-2 font-medium border-indigo-600'
            : 'text-gray-600 border-b-2 border-transparent text-xs hover:text-indigo-600'
        ]"
        class="mr-2 px-2 py-2 block focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg>
      </button>
    </nav>
    <div class="mb-2">
      <!-- shapes tab -->
      <div v-if="activeTab == 'shapes'" class="flex flex-col">
        <draggable
          v-model="shapesList"
          draggable=".layer"
          @change="reorderEvent"
        >
          <div
            v-for="(shape, index) in shapesList"
            :key="index"
            class="layer flex items-center mb-1"
            :class="[
              selected && selected.config.name === shape.config.name
                ? 'bg-gray-800'
                : 'bg-gray-900 '
            ]"
          >
            <span
              class="w-1/2 p-1 ml-1 cursor-pointer text-gray-500 text-xs flex-grow"
              @mousedown.self="selectEvent(shape)"
              @touchstart.self="selectEvent(shape)"
              >{{ shape.config.name }}
            </span>
            <button
              class="text-sm p-1 focus:outline-none"
              :class="[
                shape.config.visible ? 'text-gray-500' : 'text-gray-700'
              ]"
              @click="toggleParam(shape, 'visible')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button
              class="text-sm p-1 mr-1 focus:outline-none"
              :class="[
                shape.config.draggable ? 'text-gray-500' : 'text-gray-700'
              ]"
              @click="toggleParam(shape, 'draggable')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="5 9 2 12 5 15"></polyline>
                <polyline points="9 5 12 2 15 5"></polyline>
                <polyline points="15 19 12 22 9 19"></polyline>
                <polyline points="19 9 22 12 19 15"></polyline>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="12" y1="2" x2="12" y2="22"></line>
              </svg>
            </button>
          </div>
        </draggable>
      </div>
      <!-- styles tab -->
      <div v-if="activeTab == 'styles'" class="grid gap-2 grid-cols-8">
        <div
          v-for="(style, index) in styles"
          :key="index"
          @click="applyStyle(style)"
        >
          <div
            class="w-6 h-6 cursor-pointer rounded-full"
            :style="{
              background: style.fillEnabled ? style.fill : ''
            }"
          ></div>
        </div>
      </div>
      <!-- config tab -->
      <div v-if="activeTab == 'config'">
        <span class="text-sm block mb-2 text-gray-500">Document</span>
        <div class="flex items-center mt-2">
          <span class="w-1/2 text-xs text-gray-700">Title</span>
          <input
            v-model="docConfig.name"
            type="text"
            class="w-1/2 bg-transparent border border-gray-900 rounded-sm text-gray-600 text-xs px-2 py-1 focus:outline-none"
          />
        </div>
        <div class="flex items-center mt-2">
          <span class="w-1/2 text-xs text-gray-700">Width</span>
          <input
            v-model="docConfig.width"
            type="number"
            class="w-1/2 bg-transparent border border-gray-900 rounded-sm text-right text-gray-600 text-xs px-2 py-1 focus:outline-none"
          />
        </div>
        <div class="flex items-center mt-2">
          <span class="w-1/2 text-xs text-gray-700">Height</span>
          <input
            v-model="docConfig.height"
            type="number"
            class="w-1/2 bg-transparent border border-gray-900 rounded-sm text-right text-gray-600 text-xs px-2 py-1 focus:outline-none"
          />
        </div>
        <div class="flex items-center mt-2">
          <span class="w-1/2 text-xs text-gray-700">Background</span>
          <input
            type="color"
            v-model="docConfig.bg"
            class="w-1/2 h-8 bg-transparent text-gray-600 focus:outline-none"
          />
        </div>
        <!-- grid -->
        <span class="text-sm block mt-4 mb-2 text-gray-500">Grid</span>
        <div class="flex items-center">
          <span class="w-1/2 text-xs text-gray-700">
            Show grid
          </span>
          <input
            class="leading-tight h-3 w-3 text-indigo-600"
            type="checkbox"
            v-model="docConfig.grid.show"
          />
        </div>
        <div class="flex mt-1 items-center">
          <span class="w-1/2 text-xs text-gray-700">
            Snap to grid
          </span>
          <input
            class="leading-tight h-3 w-3 text-indigo-600"
            type="checkbox"
            v-model="docConfig.grid.snap"
          />
        </div>
        <div class="flex mt-1 items-center">
          <span class="w-1/2 text-xs text-gray-700">
            Grid size
          </span>
          <input
            type="number"
            v-model="docConfig.grid.size"
            class="w-1/2 bg-transparent border border-gray-900 rounded-sm text-gray-600 text-right text-xs px-2 py-1 focus:outline-none"
          />
        </div>
        <div class="flex items-center mt-2">
          <span class="w-1/2 text-xs text-gray-700">Grid color</span>
          <input
            type="color"
            v-model="docConfig.grid.color"
            class="w-1/2 h-8 bg-transparent text-gray-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: { shapes: Array, styles: Array, config: Object, selected: Object },
  components: { draggable },
  data() {
    return {
      activeTab: "shapes",
      docConfig: this.config,
      shapesData: this.shapes
    };
  },
  computed: {
    shapesList: {
      get() {
        return this.shapesData.slice().reverse();
      },
      set(newList) {
        this.shapesData = newList.slice().reverse();
      }
    }
  },
  methods: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
    toggleParam(shape, param) {
      this.$emit("param-toggle", { shape, param });
    },
    selectEvent(shape) {
      this.$emit("shape-select", shape);
    },
    applyStyle(style) {
      this.$emit("style-apply", style);
    },
    reorderEvent() {
      this.$emit("shapes-reorder", this.shapesData);
    }
  }
};
</script>

<style></style>
