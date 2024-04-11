<template>
  <el-button
    ref="buttonRef"
    v-click-outside="onClickOutside"
    style="color: var(--color); border: 0; padding: 0"
    plain
  >
    <common-icon
      :key="modelValue"
      :name="modelValue || 'el-Plus'"
      :size="24"
    />
  </el-button>

  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    trigger="click"
    width="306"
    :hide-after="50"
    virtual-triggering
  >
    <el-scrollbar max-height="300px">
      <div style="display: flex; flex-flow: wrap; max-width: 400px">
        <div
          class="icon-li"
          @click="() => handleClick('')"
        >
          空
        </div>
        <div
          v-for="item in icons"
          :key="item"
          :class="['icon-li', { 'icon-lineheight': modelValue === item }]"
          @click="() => handleClick(item)"
        >
          <common-icon
            :name="item"
            :size="28"
          />
        </div>
      </div>
    </el-scrollbar>
  </el-popover>
</template>

<script setup lang="ts">
const components = import.meta.glob('@/assets/svg/**.svg');

import { ClickOutside as vClickOutside } from 'element-plus';

const buttonRef = ref();
const popoverRef = ref();
let icons = ref<string[]>([]);

const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};

const init = () => {
  for (const key in components) {
    let start = key.substring(16, key.length - 4);
    icons.value.push(start);
  }
};
init();

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const { modelValue } = toRefs(props);

const handleClick = (item: string) => {
  emit('update:modelValue', item);
};
</script>

<style lang="scss" scoped>
.icon-li {
  width: 40px;
  height: 40px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #eee;
    border-radius: 4px;
    color: var(--color) !important;
  }
}
.icon-lineheight {
  background-color: var(--el-color-primary);
  border-radius: 4px;
  color: #fff !important;
}
</style>
