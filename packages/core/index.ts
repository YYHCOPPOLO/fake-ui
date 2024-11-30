import { installerMaker } from '@fake-ui/utils'
import '@fake-ui/theme/index.css'

import components from './components'

const installer = installerMaker(components)

export * from '@fake-ui/components'
export default installer