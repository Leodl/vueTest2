import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login.vue'
import home from '@/components/home/home.vue'
import detail from '@/components/detail/detail.vue'
import tmp from '@/components/tmp/tmp.vue'
import tmpdetail from '@/components/tmp/tmpdetail.vue'
import search from '@/components/search/search.vue'
import personnalLook from '@/components/personnal/look.vue'
import personnaleditor from '@/components/personnal/editor.vue'







import vueResource from 'vue-resource';
//import axios  from 'axios';


import Mint from 'mint-ui';
import 'mint-ui/lib/style.min.css'
import VueScroller from 'vue-scroller'

Vue.use(Mint);
Vue.use(Router)
Vue.use(vueResource);
Vue.use(VueScroller)

//Vue.prototype.$ajax = axios



export default new Router({
  routes: [
  {
      path: '/',
      redirect:'/login',
  },
  {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path: '/tmp',
      name: 'tmp',
      component: tmp
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
     {
      path:'/personnalLook',
      name:'personnalLook',
      component:personnalLook
    },
    {
      path:'/personnaleditor',
      name:'personnaleditor',
      component:personnaleditor
    },
    {
      path: '/tmp/:templateid',
      name: 'tmpdetail',
      component: tmpdetail,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    }
   

  ]
})
