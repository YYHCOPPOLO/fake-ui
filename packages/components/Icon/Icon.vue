<script setup lang="ts">
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'
import { computed } from 'vue'

defineOptions({
  name: 'FakeIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()

// 检测是否为 CSS 单位格式（包含数字和单位）
function isCssSize(size: string | undefined): boolean {
  if (!size) return false
  // 匹配数字后跟单位的模式，如 "2em", "1.5rem", "16px" 等
  return /^\d+(?:\.\d+)?(?:px|em|rem|%|ch|ex|vw|vh|vmin|vmax|cm|mm|in|pt|pc)$/.test(size)
}

// 过滤传递给 FontAwesome 的 props
const filterProps = computed(() => {
  const filtered = omit(props, ['type', 'color', 'size']) as Omit<IconProps, 'type' | 'color' | 'size'>
  // 如果 size 不是 CSS 单位格式，则传递给 FontAwesome
  if (props.size && !isCssSize(props.size)) {
    (filtered as any).size = props.size
  }
  return filtered
})

// 计算样式，包含 color 和可能的 fontSize
const customStyles = computed(() => ({
  color: props.color ?? void 0,
  fontSize: isCssSize(props.size) ? props.size : void 0,
}))
</script>

<template>
  <i
    class="fake-icon"
    :class="[`fake-icon-${type}`, `fake-icon-${color}`]"
    :style="customStyles"
    v-bind="$attrs"
  >
    <FontAwesomeIcon
      v-bind="filterProps"
    />
  </i>
</template>

<style scoped>
@import './style.css';
</style>
