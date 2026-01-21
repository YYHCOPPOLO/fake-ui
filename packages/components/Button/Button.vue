<script setup lang='ts'>
import type { ButtonEmits, ButtonInstance, ButtonProps } from './types'
import { throttle } from 'lodash-es'
import { computed, ref } from 'vue'
import FakeIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'FakeButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDelay: 600,
})

const emit = defineEmits<ButtonEmits>()

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()
const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : '0px',
}))
function handleClick(e: MouseEvent) {
  emit('click', e)
}

const handleThrottleClick = throttle(handleClick, props.throttleDelay)

defineExpose<ButtonInstance>({
  ref: _ref,
})
</script>

<template>
  <component
    :is="tag"
    ref="_ref"
    :autofocus="autoFocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    class="fake-button"
    :class="{
      [`fake-button--${type}`]: type,
      [`fake-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-loading': loading,
    }"
    @click="(e: MouseEvent) => useThrottle ? handleThrottleClick(e) : handleClick(e)"
  >
    <template v-if="loading">
      <slot name="loading">
        <FakeIcon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <FakeIcon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    />
    <slot />
  </component>
</template>

<style scoped>
@import './style.css';
</style>
