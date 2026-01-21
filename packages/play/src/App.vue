<script setup lang="ts">
import { ref } from 'vue'

const isHeart = ref(false)

function toggleIcon() {
  isHeart.value = !isHeart.value
}
</script>

<template>
  <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
    <h1>Fake-UI Icon 组件测试</h1>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>基础使用:</h3>
      <fake-icon><BellIcon /></fake-icon>
      <fake-icon><HeartIcon /></fake-icon>
      <fake-icon><StarIcon /></fake-icon>
    </section>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>自定义颜色:</h3>
      <fake-icon color="#ff0000">
        <HeartIcon />
      </fake-icon>
      <fake-icon color="#f6a23c">
        <StarIcon />
      </fake-icon>
      <fake-icon color="#67c23a">
        <CheckIcon />
      </fake-icon>
    </section>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>动态切换:</h3>
      <fake-icon size="2em">
        <BellIcon v-if="!isHeart" />
        <HeartIcon v-else />
      </fake-icon>
      <fake-button type="primary" @click="toggleIcon">
        切换图标
      </fake-button>
    </section>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>组合属性:</h3>
      <fake-icon size="2em" color="#409eff">
        <BellIcon />
      </fake-icon>
      <fake-icon size="2.5em" color="#ff0000">
        <HeartIcon />
      </fake-icon>
      <fake-icon size="1.5em" color="#f6a23c">
        <StarIcon />
      </fake-icon>
    </section>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>可访问性:</h3>
      <fake-icon aria-label="Information">
        <InfoIcon />
      </fake-icon>
      <fake-icon aria-hidden="true">
        <CheckIcon />
      </fake-icon>
    </section>
  </div>
</template>
