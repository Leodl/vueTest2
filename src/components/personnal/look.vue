<template>
       <div class="look">
           <div class="headpic">
                  <img :src="headpic">
                  <p>{{userinfodata.username}}</p>
                     <router-link v-bind="{to:'/personnaleditor'}">修改个人信息</router-link>
           </div>

           <div class="userinfo">
                  <ul>
                         <li>号码：{{userinfodata.mobileno}}</li>
                         <li>性别：{{userinfodata.gender}}</li>
                         <li>出生时间：{{userinfodata.birthday}}</li>
                         <li>入职时间：{{userinfodata.entrytime}}</li>
                         <li>学历：{{userinfodata.degree}}</li>
                         <li>教龄：{{userinfodata.schoolage}}</li>
                         <li>教师资格证：{{userinfodata.certificate}}</li>
                         <li>特长：{{userinfodata.specialskill}}</li>
                  </ul>
           </div>
       </div>
</template>




<script type="ecmascript-6">
import axios from 'axios';
export default{
      name:'',
      data(){
            return {
              headpic:"",
              userid:"",
              userinfodata:"",

       }
},

created(){
   this.getsession();
    this.getlist();
},
methods:{
     getlist(){
      var that = this;
        var url = "/zhitong/meritpay/roster/getDetail/"+this.userid+"";
         var token = Constants.getsession().token;
         $.ajax({
          url:url,
           headers:{"User-Token":token},
            contentType: 'application/json',
            dataType: "json",
            success:function(res){
               console.log(res)
                   res.data.gender =Constants.genderObj[res.data.gender];
                   res.data.degree =Constants.degreeObj[res.data.degree];
                   res.data.schoolage =Constants.schoolageObj[res.data.schoolage];
                   res.data.certificate =Constants.certificateObj[res.data.certificate]

                  that.userinfodata =res.data;

            }
         })
       
     },
     getsession(){
       var url = this.HOST;
       console.log(url)
       var QINIU_URL = 'http://os4skw475.bkt.clouddn.com/'
       var session = sessionStorage.getItem("user");
       var info =eval('(' + session + ')');
       console.log(info)
       this.headpic = QINIU_URL+info.headpic;
       this.userid=info.userid;
     }
}

}


</script>



<style scoped>
.look{
       padding-top: 40px;
}
.look .headpic{
       width: 100%;
       height: 200px;
       background:#F5F5F5;
}
.look .headpic img{
       width: 80px;
       height: 80px;
       border-radius: 50%;
       margin: 0 auto;
       margin-top: 30px;
}
.look .headpic a{
       font-size: 14px;
       text-decoration: none;
}
.userinfo ul{
       list-style: none;
       padding: 0px;
}
.userinfo ul li{
       text-align: left;
       padding-left: 5%;
       margin-bottom: 20px;
}
.loginout{
       margin-top:50px;
}
.loginout button{
        outline: none;
       border:none;
       border-radius: 5px;
       padding:5px;
       width: 50%;
       height: 30px;
       color: #fff;
       background:#EA6F5A;
}




</style>