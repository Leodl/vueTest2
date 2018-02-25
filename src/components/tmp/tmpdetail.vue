<template>
    <div class="tmpdetail">
        <p><span>|</span>模板详情</p>
        <h3>
            {{tmpName}}
        </h3>
         <a class="start"  @click="isUse()" v-if="status==1">启用</a>
         <a class="stop" @click="isUse()" v-if="status==0">停用</a>
        <ul>
            <li  v-for="val in tmpinfo">
                {{val.criterionContent}}
              <span>{{val.score}}分</span>
            </li>
        </ul>


    </div>
</template>

<script type="">
    import axios from 'axios';
    import { Toast} from 'mint-ui';
export default {
  name: 'tmpdetail',
  data(){
    return {
      tmpId:"",
        tmpName:"",
        list:"",
        status:"",
        tmpinfo:[]
    }
  },
created(){
    this.tmpId = this.$route.params.templateid;
    this.getlist()
},
methods:{
      getlist(){
        var that = this;
        axios({
            method:'POST',
            url:'/zhitong/meritpay/template/get',
            data:{templateId:that.tmpId},
            headers:{"User-Token":Constants.getsession().token},
            contentType: 'application/json',
            dataType: "json",
        }).then(function(res){
            console.log(res.data.data)
            var data = res.data.data;
            that.tmpName = data[0].templateName
            that.status = data[0].status
            that.list =data;
            var typeNames = data[0].typeNames;
            for(let i = 0;i<typeNames.length;i++){
                var len = typeNames[i].criterions.length;
                for(let j = 0;j<len;j++){
                    that.tmpinfo.push(typeNames[i].criterions[j])
                }
            }
            console.log(that.tmpinfo)
        })
    },

       //启用停用
       isUse(){
      var that = this;
      var Status = that.status==1?0:1;
        axios({
          method:'PUT',
          headers:{"User-Token":Constants.getsession().token},
          url: '/zhitong/meritpay/template/updateStatus/' + that.tmpId + '/'+Status+'',
          contentType: 'application/json',
        }).then(function(res){
          console.log(res.data)
          that.tmpinfo = []
          that.getlist()
          Toast({
            message: res.data.message,
            duration:1000
          })
        })
  }


  }
}

</script>

<style scoped>
    .tmpdetail{
        padding-top: 40px;
    }
    .tmpdetail p {
        margin: 0px;
        float: left;
        padding-top: 5px;
        padding-left: 5px;
    }
    .tmpdetail h3 {
       margin-top: 40px;
    }
    .tmpdetail ul{
        list-style: none;
        padding: 0px;
        margin: 0px;
        padding: 5px;
      margin-top: 60px;
    }
    .tmpdetail ul li{
        background: #F1F1F1;
        margin-bottom: 5px;
        border-radius: 5px;
        font-size: 15px;
        line-height: 30px;
        text-align: left;
       padding-left:5%;
      padding-right: 5%;
    }
    .tmpdetail ul li span {
      float: right;
    }
    .tmpdetail p span{
        color:#EA6F5A;
        font-size: 16px;
    }
  .start{
    float: right;
    display: block;
    font-size: 14px;
    text-decoration: none;
    color: #3c3c3c;
    border-radius: 5px;
    border: 1px solid #2e6da4;
    background: #004190;
    padding: 5px 10px;
    margin-right: 2%;
    color: #ffffff;
  }
    .stop{
      float: right;
      display: block;
      font-size: 14px;
      text-decoration: none;
      color: #3c3c3c;
      border-radius: 5px;
      border: 1px solid #2e6da4;
      background: #004190;
      padding: 5px 10px;
      margin-right: 2%;
      color: #ffffff;
    }
</style>