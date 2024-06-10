<script lang="ts" setup>
import { markRaw, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { useDebounceFn } from "@vueuse/core";
import type { IChartViewProps } from "./types";
import type { EChartsType } from "echarts/core";

// 注册必要组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

const chartRef = ref<HTMLDivElement>();
const chartInstance = ref<EChartsType>();

const props = withDefaults(defineProps<IChartViewProps>(), {
  width: "100%",
  height: "100%",
  autoResize: true,
  chartOption: {
    title: {
      text: "Basic Radar Chart",
    },
    legend: {
      data: ["Allocated Budget", "Actual Spending"],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "Sales" },
        { name: "Administration" },
        { name: "Information Technology" },
        { name: "Customer Support" },
        { name: "Development" },
        { name: "Marketing" },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "Actual Spending",
          },
        ],
      },
    ],
  },
  type: "canvas",
});

const clearChart = () => {
  chartInstance.value && chartInstance.value.clear();
};

const resizeHandler = () => {
  chartInstance.value && chartInstance.value?.resize();
};

const setOptions = (option: any) => {
  clearChart();
  resizeHandler();
  if (chartInstance.value) {
    chartInstance.value && chartInstance.value.setOption(option);
  }
};

const initChart = () => {
  if (!chartRef.value) return;

  // 校验dom节点上是否挂载ECharts实例，单例模式
  if (!chartInstance.value) {
    chartInstance.value = markRaw(echarts.init(chartRef.value));

    setOptions(props.chartOption);
  }
};

const resize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize({ animation: { duration: 300 } });
  }
};

/* 自适应防抖 */
const debouncedResize = useDebounceFn(resize, 500, { maxWait: 800 });

watch(
  () => props.chartOption,
  (newVal) => {
    setOptions(newVal);
  }
);

onMounted(async () => {
  await nextTick();
  initChart();
  window.addEventListener("resize", debouncedResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedResize);
  chartInstance.value && chartInstance.value.dispose();
});
</script>

<template>
  <div ref="chartRef" :style="{ width: '100%', height: '100%' }"></div>
</template>

<style scoped></style>
