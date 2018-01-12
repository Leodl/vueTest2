<template>
  <div class="search">
   <input v-model="typeMessage" type="text">
   <button @click="clickSearch()">搜索</button>
   <div class="type">
    <span @click="clickType(val)" v-for="val in type">{{val}}</span>   
  </div>
  <ul class="infoul">
   <li v-for="(val,index) in info">
    <router-link v-bind="{to:'/detail/'+val.id}">
      <img :src="val.images.small">
      <div class="describe">
        <p>影名:{{val.title}}</p>
        <p>评分:{{val.rating.average}}</p>
        <p>主演：
         <span v-for="(role,index) in val.casts">{{role.name}}<i>、</i></span>
       </p>
       <!-- <p>导演:{{val.directors[0].name}}</p> -->
     </div>
   </router-link>



 </li>
</ul>
</div>
</template>




<script type="ecmascript-6">


export default{
 name:'',
 data(){
  return {
   type:["喜剧","动作","爱情","恐怖","悬疑"],
   typeMessage:'动作',
   info:''
 }
},
created(){
 this.getsession()
},

mounted(){
 this.clickSearch()
},
methods:{
  clickType(type){
   this.typeMessage=type;
 },
 clickSearch(){
   var that = this;
   var url = "https://api.douban.com/v2/movie/search?q="+this.typeMessage+""
   this.$http.jsonp(url).then(function(res){
     console.log(res.data)
     that.info = res.data.subjects;
     sessionStorage.setItem("type",that.typeMessage)
   })
 },
 getsession(){
  if(sessionStorage.type){
    this.typeMessage=sessionStorage.getItem("type")
    this.clickSearch()
  }
  
}

}

}


</script>



<style scoped>

.search{
 padding-top: 60px;
}

.search input{
 width: 60%;
 height: 20px;
 outline:none;
 border-radius: 5px;
 border:1px solid #c3c3c3;
 padding-left: 10px;
}
.search button{
  float: right;
  display: block;
  font-size: 14px;
  text-decoration: none;
  color: #3c3c3c;
  border-radius: 5px;
  border: none;
  background: #EA6F5A;
  padding: 3px 10px;
  margin-right: 2%;
  color: #ffffff;
  outline: none;
  margin-right: 15%;
}
.type{
 padding-top: 20px;
 padding-left:5%;
 text-align: left;
}
.type span {
 display: inline-block;
 padding: 3px;
 border-radius: 5px;
 background: #33cc99;
 color: #ffffff;
 margin-right: 5px;
}
.search .infoul{
  overflow: hidden;
  list-style: none;
  padding: 0px;
  margin: 10px 0px;

}

.infoul li{
  overflow: hidden;
  background: #3c3c3c;
  padding: 10px;
  border-bottom: 1px solid #c3c3c3;
}

.infoul li img{
  width: 150px;
  height: 200px;
  float: left;
}
.describe{
 float: left;
 margin-left: 5px;
 height: 200px;
}
.describe p {
 margin: 0px;
 margin-bottom: 5px;
 text-align: left;
 color: #FFFFFF;
 font-size: 14px;
 width: 140px;
}

</style>