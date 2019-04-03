<template>
    <div class="test">
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

          <el-dialog
            title="物料详情"
            :visible.sync="dialogVisible"
            width="90%"
            :before-close="handleClose">
            <div class="row">
              <div class="col-md-12" >
                <img class="dialogImg" alt="物价走势图" :src="detail.priceUrl">
              </div>
            </div>
            <div class="price-dialog-content">
              <p>生产商：
                <span class="dialog-product" v-for="item of detail.producer" @click="showUrl(item.v)"><u>{{item.k}}</u>&nbsp;&nbsp;&nbsp;</span>
              </p>
              <p>下游用户：
                <span class="dialog-user" v-for="item1 of detail.user" @click="showUrl(item1.v)"><u>{{item1.k}}</u>&nbsp;&nbsp;&nbsp;</span>
              </p>
            </div>
            <div class="price-dialog-cyl">
              <img  class="dialogImg" :src="initUrl"/>
            </div>

      </el-dialog>

    </div>
</template>

<script>
  import {httpUrl} from './apiConfig/api';
  export default {
    data() {
      return {
        dialogVisible: false,
        name:sessionStorage.getItem('name'),
        detail:{},
        initUrl:"",
      };
    },
    mounted(){
      console.log(this.name)
      this.getMetailDetail()
    },
    methods: {
      handleClose(done) {
          done();
      },
      getMetailDetail(){
        this.$http.get(httpUrl.materialPriceDetailApi, {
          params: {name:this.name}
        }).then(function(res){
          if(res.body.code==0){
            console.log(res)
            this.detail=res.body.data.entity;
            this.initUrl=this.detail.industryUrl;
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },
      showUrl(url){
        console.log(url)
        this.initUrl=url;
      }
    }
  };
</script>

<style scoped>
.test{
  margin-top: 100px;
  padding-top: 100px;
  background: red;
}
.price-dialog{
  width: 96%;
  height: auto;
  background: #ffffff;
  margin: 2rem 2% 3rem 2%;
}
.price-tableHead3{
  padding-top: 1rem;
  margin-top: 20px;
  border-bottom: 1px solid #eef1f5;
  margin-bottom: 10px;
}
.price-dialog-img{
  min-height: 300px;
}
.dialog-product{
  cursor: pointer;
  color: rgb(2, 117, 216)
}
.dialog-user{
  cursor: pointer;
  color: rgb(2, 117, 216)
}
.price-dialog-content{
  padding: 30px 0;
}
.price-dialog-content p{
  text-align: left;
  padding: 0% 2% ;
}
.price-dialog img{
  max-width: 100%;
}
.price-dialog-cyl{
  padding: 20px 0;
}
  .dialogImg{
    max-width: 100%;
  }

</style>
