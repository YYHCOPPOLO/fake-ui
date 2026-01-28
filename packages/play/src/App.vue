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
      <fake-icon icon="bell" />
      <fake-icon icon="heart" />
      <fake-icon icon="star" />
    </section>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>自定义颜色:</h3>
      <fake-icon icon="heart" color="#ff0000" />
      <fake-icon icon="star" color="#f6a23c" />
      <fake-icon icon="check" color="#67c23a" />
    </section>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>动态切换:</h3>
      <fake-icon size="2em" :icon="isHeart ? 'heart' : 'bell'" />
      <fake-button type="primary" @click="toggleIcon">
        切换图标
      </fake-button>
    </section>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>组合属性:</h3>
      <fake-icon size="2em" color="#409eff" icon="bell" />
      <fake-icon size="2.5em" color="#ff0000" icon="heart" />
      <fake-icon size="1.5em" color="#f6a23c" icon="star" />
    </section>

    <section style="display: flex; gap: 16px; align-items: center;">
      <h3>可访问性:</h3>
      <fake-icon icon="circle-info" aria-label="Information" />
      <fake-icon icon="check" aria-hidden="true" />
    </section>
  </div>
</template>
