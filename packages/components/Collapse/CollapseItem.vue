<script setup lang="ts">
import type { CollapseItemProps } from './types'
import { computed, inject } from 'vue'
import FakeIcon from '../Icon'
import { COLLAPSE_CTX_KEY } from './constants'
import transitionEvents from './transition-events'

defineOptions({ name: 'FakeCollapseItem' })
const props = defineProps<CollapseItemProps>()
const ctx = inject(COLLAPSE_CTX_KEY, void 0)
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name))

function handleClick() {
  if (props.disabled)
    return
  ctx?.handleItemClick(props.name)
}
</script>

<template>
  <div class="fake-collapse-item">
    <div
      class="fake-collapse-item"
      :class="{
        'is-disabled': disabled,
      }"
    >
      <div
        :id="`item-header-${name}`"
        class="fake-collapse-item__header"
        :class="{
          'is-disabled': disabled,
          'is-active': isActive,
        }"
        @click="handleClick"
      >
        <span class="fake-collapse-item__title">
          <slot name="title">{{ title }}</slot>
        </span>
        <FakeIcon icon="angle-right" class="header-angle" />
      </div>
      <transition name="slide" v-on="transitionEvents">
        <div v-show="isActive" class="fake-collapse-item__wrapper">
          <div :id="`item-content-${name}`" class="fake-collapse-item__content">
            <slot />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
@import './style.css';
</style>
