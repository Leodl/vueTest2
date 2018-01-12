<template>
    <scroller :on-infinite="infinite" ref="myscroller" class="scroller">
  <div class="home">
    <div class="swipe-wrapper">
      <mt-swipe :auto="3000" ref="swipeWrapper">
        <mt-swipe-item v-for="val in img" :key="val">
          <img :src="val">
        </mt-swipe-item>

      </mt-swipe>
    </div>
  
    <ul>
      <li v-for="(val,index) in moviedata">
        <router-link v-bind="{to:'/detail/'+val.id}">
          <img :src="val.images.small">
          <div class="describe">
            <p>影名:{{val.title}}</p>
            <p>类型:{{type[index][0]}}</p>
            <p>主演:{{roles[index][0]}}</p>
            <p>导演：{{val.directors[0].name}}</p>
          </div>
        </router-link>

      </li>
      
    </ul>
    
  </div>
  </scroller>
</template>




<script type="">
import { Toast} from 'mint-ui';

export default {
  name: 'home',
  data(){
    return {
      start:0,
      moviedata:[],
      type:[],
      roles:[],
      img:[],
      noData: '',
    }
  },
  created(){
   this.getlist();
  },
  methods:{
   getlist(){
    var that = this;
    var url = "https://api.douban.com/v2/movie/top250?start="+this.start+"&count=20"
    this.$http.jsonp(url).then(function(res){
     if(res.status==200){
       let data = res.body.subjects
       console.log(data)
       if(that.img.length<=4){
         for(let i=0;i<=4;i++){
           that.img.push(data[i].images.medium)
         }
       }
       for(let i =0;i<data.length;i++){
         that.moviedata.push(data[i])
         var genresStr = ""
         var genresArr = []
         for(var k=0;k<data[i].genres.length;k++){
           genresStr+=data[i].genres[k]+"/";
         }
         genresArr.push(genresStr)
         that.type.push(genresArr)

         var castsStr = "";
         var castsArr = [];
         for(var j =0;j<data[i].casts.length;j++){
           castsStr+=data[i].casts[j].name+"/"
         }
         castsArr.push(castsStr);
         that.roles.push(castsArr)


       }
     }

     })
       },
        infinite(done) {
                // if(this.noData) {
                // setTimeout(()=>{
                //     this.$refs.myscroller.finishInfinite(2);
                // })
                // return;
                // }
                let that = this;
               // let start = this.moveList.length;

                setTimeout(() => {
                    // for(let i = start + 1; i < start + 10; i++) {
                    //     that.moveList.push(i)
                    // }
                    // if(start > 30) {
                    //     that.noData = "没有更多数据"
                    // }
                    
                    that.start +=20;
                    that.getlist();
                    that.$refs.myscroller.resize();
                    done()

                }, 1000)

            },
            refresh() {
                console.log('refresh')
            }

         }


          
            }

              
             
            </script>

            <style scoped>
            .home ul{
              overflow: hidden;
              list-style: none;
              padding: 0px;
              margin: 0px;
            }
            .home ul li{
              overflow: hidden;
              background: #3c3c3c;
              padding: 10px;
              border-bottom: 1px solid #c3c3c3;
            }
            .home ul li img{
              width: 150px;
              height: 200px;
              float: left;
            }

            .home ul li .describe p{
              margin: 0px;
              margin-bottom: 5px;
              text-align: left;
              color: #FFFFFF;
              font-size: 14px;
              width: 140px;
            }
            .home ul li .describe{
              float: left;
              margin-left: 5px;
              height: 200px;
            }
            .swipe-wrapper{
              width: 100%;
              height: 150px;
              padding-top: 40px;
              z-index: 0;
            }
            .swipe-wrapper img{
              width: 100%;
              height: 150px;
            }


            </style>