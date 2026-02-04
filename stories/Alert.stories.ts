import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import type { AlertInstance } from 'fake-ui'
import { FakeAlert } from 'fake-ui'
import { fn } from 'storybook/test'
import { ref, watch } from 'vue'

type Story = StoryObj<typeof FakeAlert> & { argTypes?: ArgTypes }

const meta: Meta<typeof FakeAlert> = {
  title: 'Example/Alert',
  component: FakeAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'info', 'danger'],
    },
    effect: {
      control: 'select',
      options: ['light', 'dark'],
    },
    center: {
      control: 'boolean',
    },
  },
  args: {
    onClose: fn(),
  },
}

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: '标题',
    description: '这是一段描述',
    type: 'success',
    effect: 'light',
    closable: true,
    showIcon: true,
    visible: true,
  },
  render: args => ({
    components: { FakeAlert },
    setup() {
      const alertRef = ref<AlertInstance>()
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open()
          }
          else {
            alertRef.value?.close()
          }
        },
      )
      return { args, alertRef }
    },
    template: `
     <fake-alert ref="alertRef" v-bind="args"></fake-alert>
    `,
  }),
}

export default meta
