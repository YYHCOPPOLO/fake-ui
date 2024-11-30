import { installerMaker } from '@fake-ui/utils'
import components from './components'

const installer = installerMaker(components)

export * from '@fake-ui/components'
export default installer