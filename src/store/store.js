import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
	count:3,
	id:11
}

const mutations = {
    add(state,n){
       state.count+=n;
    },
    reduce(state,n){
      if(state.count==0){
         state.count=0;
      }else{
      	state.count-=n;
      }
    }
}

//getters计算过滤操作
const getters = {
	count:state=>state.count+=100,
	id:state=>state.id+=100
		
}

//actions异步修改状态
const actions = {
	addAction(context){
        context.commit('add',10);
        setTimeout(()=>{context.commit('reduce',10)},3000)
        console.log("我比reduce先执行了")
	},
	reduceAction({commit}){
        commit('reduce',110)
	}
}




export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})

