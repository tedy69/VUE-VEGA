import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App.vue'
import VueSmartWidget from 'vue-smart-widget'
import { SmartWidget, SmartWidgetGrid } from 'vue-smart-widget' // 调试开发
// import { SmartWidget, SmartWidgetGrid } from '../lib/vue-smart-widget.min.js' // 调试线上
// import '../lib/vue-smart-widget.css'

// import 've-charts/lib/common'
// import VeBarChart from 've-charts/lib/VeBarChart'
// import VeDonutChart from 've-charts/lib/VeDonutChart'
// import 've-charts/lib/ve-charts.min.css'

import VeCharts from 've-charts'

Vue.use(VeCharts)

import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
Vue.use(VueSmartWidget)

// Vue.component('VeBarChart', VeBarChart)
// Vue.component('VeDonutChart', VeDonutChart)
Vue.component('SmartWidget', SmartWidget)
Vue.component('SmartWidgetGrid', SmartWidgetGrid)

Vue.use(ElementUI, {
  size: 'small'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')