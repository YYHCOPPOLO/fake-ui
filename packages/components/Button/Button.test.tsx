import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button.vue'

describe('fake-button', () => {
  describe('基础渲染', () => {
    it('应该正确渲染默认按钮', () => {
      const wrapper = mount(Button)
      expect(wrapper.find('.fake-button').exists()).toBe(true)
      expect(wrapper.find('button').exists()).toBe(true)
    })

    it('应该正确渲染插槽内容', () => {
      const wrapper = mount(Button, {
        slots: { default: '点击我' },
      })
      expect(wrapper.html()).toContain('点击我')
    })

    it('默认 nativeType 应该是 button', () => {
      const wrapper = mount(Button)
      expect(wrapper.find('button').attributes('type')).toBe('button')
    })
  })

  describe('按钮类型', () => {
    it.each([
      'primary',
      'success',
      'danger',
      'warning',
      'info',
    ] as const)('应该正确渲染 %s 类型按钮', (type) => {
      const wrapper = mount(Button, {
        props: { type },
      })
      expect(wrapper.find('.fake-button').classes()).toContain(`fake-button--${type}`)
    })
  })

  describe('按钮尺寸', () => {
    it.each([
      'large',
      'default',
      'small',
    ] as const)('应该正确渲染 %s 尺寸按钮', (size) => {
      const wrapper = mount(Button, {
        props: { size },
      })
      expect(wrapper.find('.fake-button').classes()).toContain(`fake-button--${size}`)
    })
  })

  describe('按钮状态', () => {
    it('禁用状态应该设置 disabled 属性', () => {
      const wrapper = mount(Button, {
        props: { disabled: true },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('加载状态应该设置 disabled 属性', () => {
      const wrapper = mount(Button, {
        props: { loading: true },
      })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('加载状态应该添加 is-loading 类名', () => {
      const wrapper = mount(Button, {
        props: { loading: true },
      })
      expect(wrapper.find('.fake-button').classes()).toContain('is-loading')
    })
  })

  describe('样式变体', () => {
    it('plain 属性应该添加 is-plain 类名', () => {
      const wrapper = mount(Button, {
        props: { plain: true },
      })
      expect(wrapper.find('.fake-button').classes()).toContain('is-plain')
    })

    it('round 属性应该添加 is-round 类名', () => {
      const wrapper = mount(Button, {
        props: { round: true },
      })
      expect(wrapper.find('.fake-button').classes()).toContain('is-round')
    })

    it('circle 属性应该添加 is-circle 类名', () => {
      const wrapper = mount(Button, {
        props: { circle: true },
      })
      expect(wrapper.find('.fake-button').classes()).toContain('is-circle')
    })
  })

  describe('自定义标签', () => {
    it('应该支持渲染为 a 标签', () => {
      const wrapper = mount(Button, {
        props: { tag: 'a' },
      })
      expect(wrapper.find('a.fake-button').exists()).toBe(true)
      expect(wrapper.find('a').attributes('type')).toBeUndefined()
    })

    it('应该支持渲染为自定义组件', () => {
      const CustomComponent = {
        template: '<div class="custom"><slot /></div>',
      }
      const wrapper = mount(Button, {
        props: { tag: CustomComponent },
      })
      expect(wrapper.find('.custom').exists()).toBe(true)
    })
  })

  describe('交互行为', () => {
    it('应该响应点击事件', async () => {
      const onClick = vi.fn()
      const wrapper = mount(Button, {
        props: { onClick },
      })
      await wrapper.find('button').trigger('click')
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('禁用状态下不应触发点击事件', async () => {
      const onClick = vi.fn()
      const wrapper = mount(Button, {
        props: {
          disabled: true,
          onClick,
        },
      })
      await wrapper.find('button').trigger('click')
      expect(onClick).not.toHaveBeenCalled()
    })

    it('加载状态下不应触发点击事件', async () => {
      const onClick = vi.fn()
      const wrapper = mount(Button, {
        props: {
          loading: true,
          onClick,
        },
      })
      await wrapper.find('button').trigger('click')
      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe('nativeType 属性', () => {
    it('应该正确设置 submit 类型', () => {
      const wrapper = mount(Button, {
        props: { nativeType: 'submit' },
      })
      expect(wrapper.find('button').attributes('type')).toBe('submit')
    })

    it('应该正确设置 reset 类型', () => {
      const wrapper = mount(Button, {
        props: { nativeType: 'reset' },
      })
      expect(wrapper.find('button').attributes('type')).toBe('reset')
    })
  })
})
