<template>
       <div class="login" v-bind:style="style">

              <form>
                <h3>用户登录</h3>
                <input type="text" name="" placeholder="用户名" v-model="userName">
                <input type="password" name="" placeholder="密码" v-model="userPassword">
              </form>
              <button @click="login()">登录</button>
       </div>
</template>




<script type="ecmascript-6">
import axios from 'axios';
import { Toast} from 'mint-ui';

export default{
      name:'',
      data(){
            return {
              style:"",
              userName:"13912900000",
              userPassword:"123456"
       }
},

created(){
     this.height()
     this.list()
},
methods:{
      height(){
       var height = document.documentElement.clientHeight+"px;"
       this.style = "height:"+height+""
      },
      list(){
        var url= "http://106.15.137.203:8012/book/booklist";
          axios({
            method:'GET',
            url:url,
            //data: data,
            contentType: 'application/json',
            dataType: 'json',
        }).then(function(res){
            console.log(res.data)

                })
      },
      login(){
       var data = {
              "mobileno":""+this.userName+"",
              "password":""+this.userPassword+"",
       }

        var that = this;
        axios({
            method:'POST',
            url:'/zhitong/zhitong/service/user/teacher/login',
            data: data,
            contentType: 'application/json',
            dataType: 'json',
        }).then(function(res){
            console.log(res.data)
             if(res.data.result==0){
                 var data = res.data.data;
                sessionStorage.setItem("user",JSON.stringify(data));
                window.location.href = "#/home";
             }else{

                 Toast({
                  message: res.data.message,
                  duration:2000
          })
             }



                })
      }
}

}


</script>



<style scoped>
  .login{
       background:url(../../assets/loginbg.jpg) no-repeat;
       width: 100%;
       height:100%;
       background-size: 100% 100%;
  }

  .login form{
     margin: 0 auto;
     padding-top: 40%;
 }
   .login form h3{
       margin: 0px;
       margin-bottom: 20px;

   }
  .login input{
       margin: 0 auto;
       display: block;
       height: 30px;
       width: 50%;
       border:none;
       border:1px solid #c3c3c3;
       outline: none;
       border-radius: 5px;
       padding-left: 5px;
       margin-bottom: 30px;
  }
  .login button{
       outline: none;
       border:none;
       border-radius: 5px;
       padding:5px;
       width: 50%;
       height: 30px;
       color: #fff;
       background:#50e3ce;

  }



</style>
