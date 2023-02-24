import Vue from 'vue'
import App from './App.vue'
import router from './router'
import STATE from './service'
Vue.config.productionTip = false
//Temp global state
//eslint-disable-next-line
const init = () => {
  console.log('init')
  STATE.getUserInfo(() => {
    console.log('init has finished')
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  });
}
init();




