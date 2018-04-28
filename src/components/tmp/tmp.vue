<template>
    <div class="search">
        <p class="tt">模板管理</p>
        <span>{{fff}}</span>
        <ul>
            <li v-for="val in list">
                <router-link v-bind="{to:'/tmp/'+val.templateId}"><h5>{{val.templateName}}</h5></router-link>
                <p>自定义模板</p>
                <span v-if="val.status==0" class="yiqiyong"></span>
            </li>
        </ul>
    </div>
</template>

<script type="">
    import axios from 'axios';
    var instance = axios.create({
        baseURL:'https://api.douban.com/v2/movie/top250'
    })
export default {
  name: 'tmp',
   props:['fff','tmpid'],

  data(){
    return {
      list: "",
      ownlist:'',
      id:4
    }
  },

created(){
 this.getdata()
},
methods:{
   getdata(){
    console.log(this.tmpid)
        var that = this;
        axios({
            method:'POST',
            url:'/zhitong/meritpay/template/get',
            data:{gartenId:that.tmpid==undefined?that.id:that.tmpid},
            headers:{"User-Token":Constants.getsession().token},
            contentType: 'application/json',
            dataType: "json",
        }).then(function(res){
            console.log(res.data)
            that.list = res.data.data;
                })
        this.$emit('changedata',"子组件传来的值")
    },
}
}

</script>

<style scoped>
    .search{
        padding-top: 60px;;
    }
    .search p{
        margin: 0px;
        margin-bottom: 20px;
    }
    .search ul{
        display: block;
        padding: 0px 0px;
        margin: 0px;
        list-style: none;
    }
    .search ul li {
        width: 45%;
        height: 60px;
        border: 1px solid #c3c3c3;
        border-radius: 5px;
        float: left;
        margin-left: 10px;
        margin-bottom: 10px;
        background:#f4f4f4;
        position: relative;
    }
    .search ul li a{
        text-decoration: none;
        display: block;
        height: 100%;
        line-height: 60px;
        color: #3c3c3c;
    }
    .search ul li a h5{
      z-index: 99999;
      position: absolute;
      left: 36%;
      margin: 0px;
    }
    .search ul li p {
        margin-bottom: 0px;
        position: absolute;
        bottom:0px;
        padding-left: 5px;
        font-size: 14px;
        color: #c3c3c3;
    }
    .search .yiqiyong{
        background:url(../../assets/yiqiyong.png) no-repeat;
        display: inline-block;
        width: 51px;
        height: 50px;
        position: absolute;
        bottom:0px;
        right: -1px;
    }
</style>