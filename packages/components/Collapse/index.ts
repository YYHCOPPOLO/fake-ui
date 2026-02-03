import { withInstall } from '@fake-ui/utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

export const FakeCollapse = withInstall(Collapse)
export const FakeCollapseItem = withInstall(CollapseItem)

export * from './types'