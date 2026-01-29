import { installerMaker } from '@fake-ui/utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import components from './components'

import '@fake-ui/theme/index.css'

library.add(fas)
const installer = installerMaker(components)

export * from '../components'
export default installer
