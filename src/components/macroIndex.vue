<template>
    <div class="content">
        <div class="head">
          <h3>宏观指标</h3>
        </div>
        <div class="center">
          <div class="row">
            <div class="col-md-6 col-sm-12">
                <macro-img :infoData="infoData" :title="title"></macro-img>
            </div>
            <div class="col-md-6 col-sm-12">
                <macro-img2 :infoData2="infoData2" :title2="title2"></macro-img2>
            </div>
            <div class="col-md-6 col-sm-12">
              <macro-img3 :infoData3="infoData3" :title3="title3"></macro-img3>
            </div>
            <div class="col-md-6 col-sm-12">
              <macro-img4 :infoData4="infoData4" :title4="title4"></macro-img4>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import {httpUrl} from '../apiConfig/api';
  import MacroImg from  './macroIndexImg'
  import MacroImg2 from  './macroIndexImg2'
  import MacroImg3 from  './macroIndexImg3'
  import MacroImg4 from  './macroIndexImg4'

  export default {
        name: "macroIndex",
        components:{
          MacroImg,
          MacroImg2,
          MacroImg3,
          MacroImg4
        },
        data(){
              return{
                infoData:{},
                title:[],
                infoData2:{},
                title2:[],
                infoData3:{},
                title3:[],
                infoData4:{},
                title4:[],
              }
        },
        mounted(){
          this.getPmiIndexApi();

          this.getPpiIndexApi();

          this.getCpiIndexApi();

          this.getStockAccountApi();

        },
        methods:{
          getPmiIndexApi(){
            this.$http.get(httpUrl.getPmiIndexApi).then(function(res){
              if(res.body.code==0){
                console.log(res)
                this.infoData=res.body.data.entity;
                this.title=this.infoData.legendTitle;
              }else if(res.body.code!=0){
                alert(res.body.message)
              }
            },function(){
              console.log("请求失败")
            });
          },

          getPpiIndexApi(){
            this.$http.get(httpUrl.getPpiIndexApi).then(function(res){
              if(res.body.code==0){
                console.log(res)
                this.infoData2=res.body.data.entity;
                this.title2=this.infoData2.legendTitle;
                console.log(this.infoData2)
              }else if(res.body.code!=0){
                alert(res.body.message)
              }
            },function(){
              console.log("请求失败")
            });
          },

          getCpiIndexApi(){
            this.$http.get(httpUrl.getCpiIndexApi).then(function(res){
              if(res.body.code==0){
                console.log(res)
                this.infoData3=res.body.data.entity;
                this.title3=this.infoData3.legendTitle;
              }else if(res.body.code!=0){
                alert(res.body.message)
              }
            },function(){
              console.log("请求失败")
            });
          },

          getStockAccountApi(){
            this.$http.get(httpUrl.getStockAccountApi).then(function(res){
              if(res.body.code==0){
                console.log(res)
                this.infoData4=res.body.data.entity;
                this.title4=this.infoData4.legendTitle;
              }else if(res.body.code!=0){
                alert(res.body.message)
              }
            },function(){
              console.log("请求失败")
            });
          },
        }
    }
</script>

<style scoped>
.content{
  width: 96%;
  height: auto;
  background: #ffffff;
  margin: 0rem 2% 3rem 2%;
  overflow: auto;
}
.head{
  padding-top: 1rem;
  margin-bottom: 10px;
}
.head >h3{
  height: 3rem;
  text-align: center;
}
</style>
