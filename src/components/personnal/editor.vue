<template>
      <div class="editor">
           <div class="headpic">
                 <img :src="headpic">
                 <p>{{userinfodata.username}}</p>
          </div>

          <div class="userinfo">
                 <ul>
                      <li><span>号码：</span><input v-model="userinfodata.mobileno" type="text" name="" ></li>
                      <li><span>性别：</span><select v-model="userinfodata.gender"><option>男</option><option>女</option></select></li>
                      <li><span>出生时间：</span><input type="text" name="" v-model="userinfodata.birthday" @click="openPicker('birthday')"></li>
                      <li><span>入职时间：</span><input type="text" name="" v-model="userinfodata.entrytime" @click="openPicker('entrytime')"></li>
                      <li><span>学历：</span><select v-model="userinfodata.degree">
                        <option>大专</option>
                        <option>本科</option>
                        <option>硕士</option>
                        <option>博士</option>
                        <option>博士后</option>
                        <option>其他</option>
                      </select></li>
                      <li><span>教龄：</span><select v-model="userinfodata.schoolage">
                        <option>不足1年</option>
                        <option>1至3年</option>
                        <option>3至5年</option>
                        <option>5年以上</option>
                      </select></li>
                      <li><span>教师资格证：</span><select v-model="userinfodata.certificate">
                        <option>有</option>
                        <option>无</option>
                      </select></li>
                      <li><span>特长：</span><input type="text" name="" v-model="userinfodata.specialskill"></li>
                     <a href="javascript:;" class="file">修改头像
                      <input type="file" name="" id="imgFile">  
                     </a>
                     
               </ul>
               <div class="loginout">
                <button @click="save()">保存</button>
                <!-- <mt-button @click="" class="primary">保存</mt-button> -->
               </div>
  </div>

  <div>
    <mt-datetime-picker ref="picker" type="date" v-model="pickerValue"  year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"  @confirm="handleConfirm()" v-bind:endDate="endDate" v-bind:startDate="startDate"></mt-datetime-picker>
</div>


</div>




</template>


<script type="ecmascript-6">

import axios from 'axios';
import { DatetimePicker } from 'mint-ui';
import { Button, Cell } from 'mint-ui'
import { Toast} from 'mint-ui';





export default{
     name:'editor',
     data(){
          return {
               headpic:"",
               headpickey:"",
               userid:"",
               userinfodata:"",
               userinfodatatwo:"",
               pickerValue:"",
               flag:"",
               startDate:new Date('1970-01-01'),
               endDate:new Date()
        }
 },

 created(){
    this.getsession();
    this.getlist();
},
mounted (){
  this.upfile();
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
           res.data.certificate =Constants.certificateObj[res.data.certificate];
           that.headpickey = res.data.headpic;
           var QINIU_URL = 'http://os4skw475.bkt.clouddn.com/'
           that.userinfodata =res.data;
           that.headpic = QINIU_URL+res.data.headpic;

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
         //this.headpic = QINIU_URL+info.headpic;
         this.userid=info.userid;
  },
  openPicker(flag) {
      this.flag = flag;
      this.pickerValue = this.userinfodata[flag]
      this.$refs.picker.open();
},
handleConfirm(){
      let date = this.$refs.picker.value;
      let year = date.getFullYear();
      let month= date.getMonth()+1;
      let day = Number(JSON.stringify(date).split("-")[2].substring(0,2))+1;
      if(month<10 || day<10){
          month = 0+""+month+"";
          day = 0+""+day+""
   }
   if(this.flag=="birthday"){
     this.userinfodata.birthday= year+"-"+month+"-"+day;
}else{
    this.userinfodata.entrytime= year+"-"+month+"-"+day;
}

},
upfile(){
       var that = this;
      var token="eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTc5ODI1NzQsInVzZXJJZCI6MTAwMzIwLCJ1c2VyVHlwZSI6MSwidXNlck5hbWUiOiLlpZXpo54ifQ.jSP8QmFqKikyK2NdUrJSPgD2HGQe0rjOTeKurQmd5D0"
      var qiniudata = {
        bucketname: "forchild-user-dev"
      //bucketname: "forchild-user"
}
var data = JSON.stringify(qiniudata)

var token2 = null;
var domain = "http://os4skw475.bkt.clouddn.com";
$.ajax({
     type:"post",
     url:"http://106.15.137.203/meritpay/qiniu/getauth",
     data:data,
     beforeSend: function(request) {
         request.setRequestHeader("User-Token", token);
  },
  contentType:"application/json",
  async:false,
  success:function(res){
   console.log(res);
   token2 = res.data;
}
});

   var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',      // 上传模式,依次退化
        browse_button: 'imgFile',         // 
        uptoken : token2, // uptoken 是上传凭证，由其他程序生成
    
        get_new_uptoken: false,             // 
        domain: 'http://os4skw475.bkt.clouddn.com',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
        //container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
        max_file_size: '100mb',             // 最大文件体积限制
        //flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入 flash,相对路径
        max_retries: 3,                     // 上传失败最大重试次数
        dragdrop: true,                     // 开启可拖曳上传
        //drop_element: 'container',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                  // 分块上传时，每块的体积
        auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
    
        init: {
            'FilesAdded': function(up, files) {
                plupload.each(files, function(file) {
                    // 文件添加进队列后,处理相关的事情

                });

            },
            'BeforeUpload': function(up, file) {
                // 每个文件上传前,处理相关的事情
            },
            'UploadProgress': function(up, file) {
                // 每个文件上传时,处理相关的事情
            },
            'FileUploaded': function(up, file, info) {
            
                var res = JSON.parse(info);
                var sourceLink = domain +"/"+ res.key
                console.log(res)
                console.log(sourceLink)
                that.headpickey = res.key;
                that.headpic = sourceLink;

             
            },
            'Error': function(up, err, errTip) {
                //上传出错时,处理相关的事情
            },
            'UploadComplete': function() {
                //队列文件处理完毕后,处理相关的事情
            }
        }
    });

},

save(){

  var that = this;
        var url = "/zhitong/zhitong/service/user/teacher/update";
        var token = Constants.getsession().token;
  var data = {
    mobileno:this.userinfodata.mobileno,
    certificate:Number(Constants.certificateObj[this.userinfodata.certificate]),
    degree:Number(Constants.degreeObj[this.userinfodata.degree]),
    gender:Number(Constants.genderObj[this.userinfodata.gender]),
    entrytime:this.userinfodata.entrytime,
    birthday:this.userinfodata.birthday,
    gartenid:Constants.getsession().gartenid,
    schoolage:Number(Constants.schoolageObj[this.userinfodata.schoolage]),
    specialskill:this.userinfodata.specialskill,
    headpic:this.headpickey,
    userid:Constants.getsession().userid,
    username:Constants.getsession().username,
    usertype:1,
    stationsId:"8ff94df2d3374414aaecb1533ed87e86"


  }
  console.log(data)
  var datas = JSON.stringify(data);

  $.ajax({
      url:"/zhitong/zhitong/service/user/teacher/update",
      type:"POST",
      headers:{"User-Token":token},
      contentType: 'application/json',
      dataType: "json",
      data:datas,
      success:function(res){
           that.getlist();
            Toast({
            message: res.message,
            duration:1000
          })
      }
  })
 
}


}

}


</script>

<style scoped>
.editor{
      padding-top: 40px;
}
.editor .headpic{
      width: 100%;
      height: 200px;
      background:#F5F5F5;
}
.editor .headpic img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: 30px;
}
.editor .headpic a{
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
.userinfo ul li input{
     border:none;
     border:1px solid #c3c3c3;
     padding-left:5px;
     outline: none;
     height: 20px;
     border-radius: 5px;
}
.userinfo ul li select{
     border:none;
     border:1px solid #c3c3c3;
     padding-left:5px;
     outline: none;
     height: 20px;
     border-radius: 5px;
}
.userinfo ul li span{
     display: inline-block;
     width: 30%;
}
.loginout{
 margin-bottom: 60px;
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

.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}



</style>