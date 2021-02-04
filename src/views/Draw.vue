<template>
  <div class="draw-layout">
    <!-- logo -->
    <div class="logo bg-indigo-600"><span>D</span></div>
    <!-- navbar -->
    <div class="navbar p-1 flex justify-between items-center">
      <!-- flash message -->
      <flash-message></flash-message>
      <!-- shape options -->
      <div class="w-4/6">
        <shapeParams
          :document="document"
          :shape="selectedShape"
          :activeDropdown="activeDropdown"
          @dropdown-toggle="toggleDropdown"
          @shape-edit="redrawShape"
        />
      </div>
      <!-- actions -->
      <div class="w-2/6 text-right">
        <button
          class="appearance-none rounded-sm bg-gray-700 text-gray-400 text-sm hover:bg-indigo-600 focus:outline-none px-3 py-1 mr-2 "
        >
          Export
        </button>
        <button
          class="appearance-none rounded-sm bg-indigo-700 text-gray-400 text-sm hover:bg-indigo-600 focus:outline-none px-3 py-1 mr-2 "
        >
          Save
        </button>
      </div>
    </div>
    <!-- toolbar -->
    <div class="toolbar">
      <Toolbar @new-shape="insertShape" />
    </div>
    <!-- stage -->
    <div
      class="main"
      ref="main"
      @mousedown.self="resetSelect"
      @touchstart.self="resetSelect"
    >
      <v-stage
        :config="document"
        @mousedown="handleStageMouseDown"
        @touchstart="handleStageMouseDown"
        ref="stage"
        class="stage"
      >
        <!-- bg layer -->
        <v-layer ref="bg">
          <v-rect
            :config="{
              x: 0,
              y: 0,
              width: document.width,
              height: document.height,
              fill: document.bg,
              shadowBlur: 0,
              name: 'Bg',
              draggable: false
            }"
          />
          <v-group v-if="document.grid.show" ref="grid">
            <v-line
              v-for="i in document.width"
              :key="i"
              :config="{
                x: 0,
                y: 0,
                points: [
                  i * document.grid.size,
                  0,
                  i * document.grid.size,
                  document.height
                ],
                stroke: document.grid.color,
                strokeWidth: 0.5
              }"
            />
            <v-line
              v-for="k in document.height"
              :key="k + 9000"
              :config="{
                x: 0,
                y: 0,
                points: [
                  0,
                  k * document.grid.size,
                  document.height,
                  k * document.grid.size
                ],
                stroke: document.grid.color,
                strokeWidth: 0.5
              }"
            />
          </v-group>
        </v-layer>
        <!-- drawing layer -->
        <v-layer ref="drawLayer">
          <!-- loop shapes -->
          <v-group v-for="shape in shapes" :key="shape.id">
            <v-rect
              v-if="shape.type === 'rectangle'"
              :config="shape.config"
              @dragstart="handleDragStart"
              @dragend="handleDragEnd"
              @transformend="handleTransformEnd"
            />
            <v-circle
              v-if="shape.type === 'circle'"
              :config="shape.config"
              @dragstart="handleDragStart"
              @dragend="handleDragEnd"
              @transformend="handleTransformEnd"
            />
            <v-star
              v-if="shape.type === 'star'"
              :config="shape.config"
              @dragstart="handleDragStart"
              @dragend="handleDragEnd"
              @transformend="handleTransformEnd"
            />
            <v-text
              v-if="shape.type === 'text'"
              :config="shape.config"
              @dragstart="handleDragStart"
              @dragend="handleDragEnd"
              @transformstart="handleTransformStart"
              @transformend="handleTransformEnd"
              @dblclick="toggleTextEdit()"
            />
          </v-group>
          <!-- transformer -->
          <v-transformer ref="transformer" />
        </v-layer>
      </v-stage>
    </div>
    <!-- aside -->
    <div class="aside">
      <Tabs
        :shapes="shapes"
        :styles="styles"
        :config="document"
        :selected="selectedShape"
        @shape-select="selectShape"
        @param-toggle="toggleShape"
        @style-apply="applyStyle"
        @shapes-reorder="reorderShapes"
      />
    </div>
    <!-- footer -->
    <div class="footer flex items-center justify-between">
      <div class="flex items-center">
        <input
          class="w-24 ml-2 mr-2 h-2 rounded-lg overflow-hidden appearance-none bg-gray-900 focus:outline-none"
          min="2"
          max="18"
          v-model="zoom"
          step="1"
          @change="toggleZoom"
          type="range"
        />
        <span>{{ zoomScale * 100 }} %</span>
      </div>
      <span class="mr-4">Copyrights 2020</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from "@/components/toolBar.vue";
import Tabs from "@/components/drawTabs.vue";
import shapeParams from "@/components/shapeParams.vue";
import styles from "./../json/colors.json";

export default {
  name: "Home",
  components: { Toolbar, Tabs, shapeParams },
  data() {
    return {
      activeTab: "layers",
      activeDropdown: "",
      zoom: 10,
      zoomScale: 1,
      document: {
        name: "New document",
        width: 400,
        height: 400,
        bg: "#ffffff",
        grid: {
          show: false,
          snap: false,
          size: 10,
          color: "#ABE3FA"
        }
      },
      shapes: [
        {
          type: "rectangle",
          config: {
            name: "rectangle.1",
            x: 150,
            y: 150,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            visible: true,
            draggable: true,
            fillEnabled: true,
            strokeEnabled: false,
            strokeScaleEnabled: false,
            shadowEnabled: false,
            fill: "#5A67D8",
            stroke: "#000000",
            strokeWidth: 2,
            width: 100,
            height: 100,
            cornerRadius: [0, 0, 0, 0]
          }
        }
      ],
      styles: styles,
      selectedShape: null,
      selectedShapeName: "",
      isDragging: false
    };
  },
  mounted() {
    this.stage = this.$refs.stage.getNode();
    this.drawlayer = this.$refs.drawLayer.getNode();

    this.bg = this.$refs.bg.getNode();
    this.transformerNode = this.$refs.transformer.getNode();
  },
  methods: {
    insertShape(shape) {
      const num = this.shapes.filter(item => item.type === shape).length + 1;
      // console.log(num);
      let newShape = {
        type: shape,
        config: {
          name: shape + "." + num,
          x: 100,
          y: 100,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          visible: true,
          draggable: true,
          fillEnabled: true,
          strokeEnabled: true,
          strokeScaleEnabled: false,
          shadowEnabled: false,
          fill: "#5A67D8",
          stroke: "#000000",
          strokeWidth: 2
        }
      };
      if (shape === "rectangle") {
        newShape.config.rotation = 0;
        newShape.config.width = 100;
        newShape.config.height = 100;
        newShape.config.cornerRadius = [0, 0, 0, 0];
      } else if (shape === "circle") {
        newShape.config.radius = 50;
      } else if (shape === "star") {
        newShape.config.numPoints = 5;
        newShape.config.innerRadius = 20;
        newShape.config.outerRadius = 50;
      } else if (shape === "text") {
        newShape.config.text = "Lorem ipsum";
        newShape.config.fontSize = 18;
        newShape.config.fontFamily = "Arial";
        newShape.config.fontStyle = "normal";
        newShape.config.align = "center";
        newShape.config.strokeEnabled = false;
        newShape.config.width = 200;
      }
      this.shapes.push(newShape);
      this.selectedShape = newShape;
      this.selectedShapeName = newShape.config.name;
      setTimeout(() => {
        const selectedNode = this.stage.findOne("." + this.selectedShapeName);
        // console.log(selectedNode);
        this.transformerNode.nodes([selectedNode]);
        this.transformerNode.getLayer().batchDraw();
      }, 50);
    },
    selectShape(shape) {
      this.selectedShape = shape;
      this.selectedShapeName = shape.config.name;
      const selectedNode = this.stage.findOne("." + this.selectedShapeName);

      if (selectedNode === this.transformerNode.node()) {
        return;
      }
      if (selectedNode) {
        this.transformerNode.nodes([selectedNode]);
      }
      this.transformerNode.getLayer().batchDraw();
    },
    redrawStage() {
      // console.log("reorder event");
      if (this.selectedShapeName) {
        setTimeout(() => {
          this.drawlayer.draw();
        }, 50);
      }
    },
    redrawShape(shape) {
      if (shape) {
        // this.shapes = shapes;
        this.redrawStage();
      }
    },
    reorderShapes(shapes) {
      if (shapes) {
        this.shapes = shapes;
        this.redrawStage();
      }
    },
    resetSelect() {
      this.selectedShape = null;
      this.selectedShapeName = "";
      this.activeDropdown = "";
      this.transformerNode.nodes([]);
      this.transformerNode.getLayer().batchDraw();
    },
    toggleTextEdit() {
      let textNode = this.stage.findOne("." + this.selectedShapeName);
      let textPosition = textNode.getAbsolutePosition();
      let stageBox = this.stage.container().getBoundingClientRect();

      var areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y
      };

      let textarea = document.createElement("textarea");
      this.$refs["main"].appendChild(textarea);

      textNode.hide();
      let tr = this.transformerNode;
      tr.hide();
      // console.log(tr);
      this.transformerNode.forceUpdate();
      textNode.getLayer().draw();

      textarea.value = textNode.text();
      textarea.style.position = "absolute";
      textarea.style.top = areaPosition.y + "px";
      textarea.style.left = areaPosition.x + "px";
      textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
      textarea.style.height =
        textNode.height() - textNode.padding() * 2 + 5 + "px";
      textarea.style.fontSize = textNode.fontSize() + "px";
      textarea.style.border = "none";
      textarea.style.padding = "0px";
      textarea.style.margin = "0px";
      textarea.style.overflow = "hidden";
      textarea.style.background = "none";
      textarea.style.outline = "none";
      textarea.style.resize = "none";
      textarea.style.lineHeight = textNode.lineHeight();
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.transformOrigin = "left top";
      textarea.style.textAlign = textNode.align();
      textarea.style.color = textNode.fill();
      let rotation = textNode.rotation();
      let transform = "";
      if (rotation) {
        transform += "rotateZ(" + rotation + "deg)";
      }
      textarea.style.transform = transform;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 3 + "px";

      textarea.focus();

      textarea.addEventListener("keydown", function(e) {
        // hide on enter
        if (e.keyCode === 13) {
          textNode.text(textarea.value);
          // textNode.getLayer().draw();
          textarea.remove();
          textNode.show();
          textNode.getLayer().draw();
          tr.show();
          tr.getLayer().batchDraw();
        }
      });
    },
    toggleDropdown(item) {
      if (this.activeDropdown === item) {
        this.activeDropdown = "";
      } else {
        this.activeDropdown = item;
      }
    },
    toggleShape(data) {
      this.shapes.forEach(shape => {
        if (shape.config.name === data.shape.config.name) {
          if (data.param === "draggable") {
            shape.config.draggable = !shape.config.draggable;
          } else {
            shape.config.visible = !shape.config.visible;
          }
        }
      });
    },
    applyStyle(style) {
      if (this.selectedShape) {
        // console.log(style);
        for (let key in style) {
          this.selectedShape.config[key] = style[key];
        }
      } else {
        this.$root.$emit("flashmessage", {
          text: "Select shape first",
          type: "error"
        });
      }
    },
    handleDragStart() {
      this.isDragging = true;
    },
    handleDragEnd(e) {
      const shape = this.shapes.find(
        r => r.config.name === this.selectedShapeName
      );
      this.selectedShape = shape;
      // update shape
      const grid = this.document.grid.size;
      if (this.document.grid.snap) {
        shape.config.x = Math.round(e.target.x() / grid) * grid;
        shape.config.y = Math.round(e.target.y() / grid) * grid;
      } else {
        shape.config.x = e.target.x();
        shape.config.y = e.target.y();
      }
      this.isDragging = false;
    },
    handleTransformStart(e) {
      if (e.target.attrs.text) {
        const shape = this.selectedShape;
        console.log("Object is text");
        shape.config.width = Number(e.target.width() * e.target.scaleX());
        shape.config.height = Number(e.target.height() * e.target.scaleY());
        shape.config.scaleX = 1;
        shape.config.scaleY = 1;

        e.target.setAttrs({
          width: e.target.width() * e.target.scaleX(),
          height: e.target.height() * e.target.scaleY(),
          scaleX: 1,
          scaleY: 1
        });
        // e.target.getLayer().draw();
      }
    },
    handleTransformEnd(e) {
      const shape = this.selectedShape;
      const gridSize = this.document.grid.size;
      if (this.document.grid.snap) {
        shape.config.x = Math.round(e.target.x() / gridSize) * gridSize;
        shape.config.y = Math.round(e.target.y() / gridSize) * gridSize;
        shape.config.rotation = Number(e.target.rotation().toFixed(0));
      } else {
        shape.config.x = e.target.x();
        shape.config.y = e.target.y();
        shape.config.rotation = Number(e.target.rotation());
      }
      // if text
      if (!e.target.attrs.text) {
        shape.config.width = Number(e.target.width());
        shape.config.height = Number(e.target.height());
        shape.config.scaleX = Number(e.target.scaleX());
        shape.config.scaleY = Number(e.target.scaleY());
      }
      e.target.getLayer().draw();
      this.updateTransformer();
    },
    handleStageMouseDown(e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = "";
        this.selectedShape = null;
        this.updateTransformer();
        return;
      }
      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      const name = e.target.name();
      const shape = this.shapes.find(s => s.config.name === name);

      if (shape) {
        this.selectedShapeName = name;
        this.selectedShape = shape;
      } else {
        this.resetSelect();
      }
      this.stage.draw();
      this.updateTransformer();
    },
    updateTransformer() {
      const { selectedShapeName } = this;
      const selectedNode = this.stage.findOne("." + selectedShapeName);
      if (selectedNode === this.transformerNode.node()) {
        return;
      }
      if (selectedNode) {
        this.transformerNode.nodes([selectedNode]);
      } else {
        this.transformerNode.nodes([]);
      }
      this.transformerNode.getLayer().batchDraw();
    },
    toggleZoom() {
      this.zoomScale = Number(this.zoom) / 10;
      this.zoomEl(this.zoomScale, document.getElementsByClassName("stage")[0]);
    },
    zoomEl(zoom, el) {
      let p = ["webkit", "moz", "ms", "o"],
        s = "scale(" + zoom + ")",
        oString = 50 + "% " + 50 + "%";

      for (let i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;
      }
      el.style["transform"] = s;
      el.style["transformOrigin"] = oString;
    }
  }
};
</script>
