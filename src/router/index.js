import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import state from '../service'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true,
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue'),
    props: true,
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// Guard routes
router.beforeEach((to, from, next) => {

  // if not admin send back
  if (to.name === 'admin' && !state.user.isAdmin && !state.user.isAuth) {
    // send back to home view 
    console.log('redirect back home')
    next({ name: 'home', params: { name: state.user.name, auth: state.user.isAuth } })

  }
  // Let them pass if admin
  if (to.name === 'admin' && state.user.isAdmin && state.user.isAuth) {

    // Admin view
    next({ params: { name: state.user.name } })
  }
  if (to.name === 'home') {

    next({ params: { name: state.user.name, auth: state.user.isAuth } })
  }
});

export default router;
