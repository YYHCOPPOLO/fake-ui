import FakeUI from 'fake-ui'
import { createApp } from 'vue'
import App from './App.vue'

import 'fake-ui/dist/index.css'

createApp(App).use(FakeUI).mount('#app')
