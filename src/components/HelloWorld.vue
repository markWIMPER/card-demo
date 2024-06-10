<script setup lang="ts">
import LineCharts from "./LineCharts.vue";
import { useSetComponentRefs } from "./utils";
import { Budget, Pie, Stacked } from "./options";
import { nextTick } from "vue";

const layout = [
  { x: 0, y: 0, w: 4, h: 8, i: "1", option: Budget },
  { x: 2, y: 0, w: 4, h: 8, i: "2", option: Pie },
  { x: 4, y: 0, w: 4, h: 8, i: "3", option: Stacked },
];

const { setItemRef, formRefs } = useSetComponentRefs({});

const setAutoChange = async (id: string) => {
  await nextTick();
  formRefs[id].setChange();
};
</script>

<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="12"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[10, 10]"
    :use-css-transforms="true"
    :auto-size="true"
  >
    <grid-item
      v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      @resized="setAutoChange(item.i)"
    >
      <LineCharts :ref="(el) => setItemRef(el, item.i)" :option="item.option" />
    </grid-item>
  </grid-layout>
</template>

<style scoped>
.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: rgb(255, 255, 255);
  border: 1px solid black;
  box-sizing: border-box;
  overflow: hidden;
  padding: 20px;
}
.vue-grid-item .static {
  background: #efefef;
}

/* :deep(.vue-grid-item > .vue-resizable-handle) {
  background-color: #6db3f2;
} */
</style>
