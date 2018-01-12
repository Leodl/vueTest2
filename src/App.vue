<template>
  <div id="app">
  <mt-header title="Leo的小应用" class="head" v-if='style'>
    <mt-button slot="left"  @click="goback()"  icon="back">返回</mt-button>
  <mt-button icon="more" slot="right" @click="ishide()">
  </mt-button>
  </mt-header>

  <div class="more">
    <ul v-show="hide">
    <li @click="ishide()">
      <router-link v-bind="{to:'/personnalLook'}">个人中心</router-link>
  </li>
    <li @click="ishide()" >
      <a href="javascript:;" @click="loginout()">退出</a>
  </li>
    </ul>
  </div>
  
    <div class="tobar" v-if ='style'>
      <router-link v-bind="{to:'/home'}">首页</router-link>
      <router-link v-bind="{to:'/tmp'}">模板</router-link>
      <router-link v-bind="{to:'/search'}">搜索</router-link>
      <router-link v-bind="{to:'/personnalLook'}">个人中心</router-link>
    </div>
    

    <router-view/>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  name: 'app',
 data(){
        return {
        paramsurl:"",
        style:"",
        hide:false
       }
},

created(){
  this.isLogin();
},
watch:{
   "$route": "isLogin"
   // "$route":"ishide"
},
methods:{
     isLogin(){
      this.paramsurl = this.$route.path
      if(this.paramsurl == "/login"){
        console.log(this.paramsurl)
           this.style=false;
      }else{
        this.style = true;
      }
      // window.sessionStorage.removeItem("user")
       var islogin = sessionStorage.getItem("user")
       if(islogin=="null" || islogin==null){
            window.location = "#/login";
        }
        if(this.hide==true){
          this.hide=false;
        }
      
     },
     goback(){
      history.go(-1)
      
     },
     ishide(){
        if(this.hide==false){
            this.hide = true;
        }else{
          this.hide = false;
        }
     },
      loginout(){
        window.sessionStorage.removeItem("user")
       window.location.href = "#/login"
     }
}
}
</script>

<style>
  body{
    margin: 0px;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  #app .head{
    width: 100%;
    height: 40px;
    background: #EA6F5A;
    line-height: 40px;
    position: fixed;
    z-index: 9999999;
  }
  #app .more{
    overflow: hidden;
    float: right;
     padding-top: 40px;

  }
    #app .more ul{
      list-style: none;
      padding: 0px;
      margin: 0px;
      /*float: right;*/
      position: absolute;
      right: 0px;
      padding-right: 5px;
      width: 10%;
      width: 100px;
      height: 100px;
      background: #fffafa;
      z-index: 9999999;
    }
     #app .more ul li{
       margin-top: 20px;

     }
     #app .more ul li a{
      text-decoration: none;
      color: #3c3c3c;
     }

  #app .tobar{
    width: 100%;
    height: 40px;
    background: #EA6F5A;
    position: fixed;
    bottom:0px;
    z-index: 999999999;
  }
  #app .tobar a {
    text-decoration: none;
    display: inline-block;
    line-height: 40px;
    color: #FFFFFF;
    float: left;
    width: 25%;
  }
</style>
