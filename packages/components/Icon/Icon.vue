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
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => ({ color: props.color ?? void 0 }))
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
