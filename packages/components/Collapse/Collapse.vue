<script setup lang="ts">
import type { CollapseEmits, CollapseItemName, CollapseProps } from './types'
import { debugWarn } from '@fake-ui/utils'
import { provide, ref, watch } from 'vue'
import { COLLAPSE_CTX_KEY } from './constants'

defineOptions({
  name: 'FakeCollapse',
})

const props = defineProps<CollapseProps>()

const emits = defineEmits<CollapseEmits>()

const COMPONENT_NAME = 'FakeCollapse' as const

const activeNames = ref(props.modelValue)

if (props.accordion && activeNames.value.length > 1) {
  debugWarn(COMPONENT_NAME, 'accordion mode only allows one active name')
}

function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]

  if (props.accordion) {
    _activeNames = [_activeNames[0] === item ? '' : item]
    updateActiveName(_activeNames)
    return
  }

  const index = _activeNames.indexOf(item)
  if (index > -1) {
    _activeNames.splice(index, 1)
  }
  else {
    _activeNames.push(item)
  }

  updateActiveName(_activeNames)
}

function updateActiveName(newActiveNames: CollapseItemName[]) {
  activeNames.value = newActiveNames
  emits('update:modelValue', newActiveNames)
  emits('change', newActiveNames)
}

watch(
  () => props.modelValue,
  (newActiveNames) => {
    updateActiveName(newActiveNames)
  },
)

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div class="fake-collapse">
    <slot />
  </div>
</template>

<style scoped>
@import './style.css';
</style>
