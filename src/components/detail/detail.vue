<template>
    <div class="detail">
    <div class="imgshow">
        <img :src="img">
    </div>
        <div class="infoshow">
         <p>{{info}}</p>
        </div>

    </div>
</template>

<script type="">
export default {
  name: 'detail',
  data(){
    return {
      id:0,
        info:"",
        img:""
    }
  },
  beforeCreate(){
     window.removeEventListener("scroll",function(){
      console.log(11)
     })
  },
mounted(){
    this.id = this.$route.params.id;
    this.getdetail()
},
methods:{
    getdetail(){
        var that = this;
        var url =  "https://api.douban.com/v2/movie/subject/" + that.id;
        this.$http.jsonp(url).then(function(res){
            if(res.status==200){
                let data = res.body
                that.info = data.summary;
                that.img = data.images.small;
              
            }

        })
    }
}

}

</script>

<style scoped>
    .detail{
        padding-top: 40px;
        background: #3c3c3c;
    }
    .imgshow{

    }
    .imgshow img{
        width: 100%;
        height: 250px;
    }
  .infoshow p{
    padding: 10px 2%;
    line-height: 26px;
      padding-bottom: 50px;
      text-align: left;
      text-indent:2em;
      color:#FFFFFF;
      font-size: 15px;

  }
</style>