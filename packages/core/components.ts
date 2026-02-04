import type { Plugin } from 'vue'

import {
  FakeAlert,
  FakeButton,
  FakeButtonGroup,
  FakeCollapse,
  FakeCollapseItem,
  FakeIcon,
} from '@fake-ui/components'

export default [
  FakeButton,
  FakeButtonGroup,
  FakeIcon,
  FakeCollapse,
  FakeCollapseItem,
  FakeAlert
] as Plugin[]
