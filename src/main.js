import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
import router from '@/router/router'
import Vintersection from '@/directives/Vintersection'
import directives from '@/directives/index'
import store from '@/store'


const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})
app.directive('intersection', Vintersection)

app
    .use(store)
    .use(router)
    .mount('#app')
