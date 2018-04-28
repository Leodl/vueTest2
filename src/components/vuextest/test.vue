<template>
       <div class="vuex">
         <p>{{$store.state.count}}----{{count}}---{{id}}---{{b}}</p>
         <button @click="add(10)">+</button>
         <button @click="reduce(10)">-</button>
         <button @click="a()">点击</button>
         <button @click="addAction">+</button>
         <button @click="reduceAction">-</button>
       </div>
</template>




<script type="ecmascript-6">

import store from '@/store/store'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'

export default{
      name:'',
      data(){
            return {
              msg:"ddddd"
       }
},
store,

created(){
  store.dispatch('addAction').then(()=>{console.log("触发actions后执行的事件")})
},
methods:{
   a(){
       alert(2)
  },
  ...mapMutations(["add","reduce"]),
  ...mapActions(["addAction","reduceAction"])

},

// computed:mapState({
//     //count:state=>state.count
// })
computed:{
       b(){
              return 2222
       },
  ...mapState(["count","id"]),
  ...mapGetters(["count","id"])

},



       


}


</script>



<style scoped>
.vuex{
       padding-top:60px;
}




</style>