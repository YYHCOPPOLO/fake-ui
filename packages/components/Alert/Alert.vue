<script setup lang="ts">
import type { AlertEmits, AlertInstance, AlertProps } from './types'
import { computed, ref } from 'vue'
import FakeIcon from '../Icon'

defineOptions({
  name: 'FakeAlert',
})

const props = withDefaults(defineProps<AlertProps>(), {
  type: 'info',
  effect: 'light',
  closable: true,
})

const emit = defineEmits<AlertEmits>()

const slots = defineSlots()

const typeIconMap = new Map([
  ['info', 'circle-info'],
  ['success', 'check-circle'],
  ['warning', 'circle-exclamation'],
  ['danger', 'circle-xmark'],
  ['error', 'circle-xmark'],
])

const visible = ref(true)
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
const withDescription = computed(() => props.description || slots.default)

function close() {
  visible.value = false
  emit('close')
}

function open() {
  visible.value = true
}

defineExpose<AlertInstance>({
  open,
  close,
})
</script>

<template>
  <transition name="fake-alert-fade">
    <div
      v-show="visible"
      class="fake-alert"
      :class="{
        [`fake-alert__${type}`]: type,
        [`fake-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <FakeIcon
        v-if="showIcon"
        class="fake-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="fake-alert__content">
        <span
          class="fake-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'block' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="fake-alert__close">
          <slot>{{ description }}</slot>
        </p>
        <div v-if="closable" class="fake-alert__close">
          <FakeIcon icon="xmark" @click.stop="close" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>
