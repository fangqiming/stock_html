<template>
  <div class="price-table-content"  >

    <div class="price-table-box">

      <div class="price-table3">
        <div class="price-tableInfo3">
          <div class="price-tableHead3">
            <h3>物料价格{{rankDate}}</h3>
          </div>
          <div class="price-table-Bar">
            <form class="form-search">
              <input type="text"  class="form-control" placeholder="输入物料关键字" v-model="searchName"/>
              <button type="button" class="btn btn-default"  @click="getMaterielList()" >搜索</button>
            </form>
          </div>
          <div class="row-fluid">
            <div class="span12">
              <div class="list">
                <template>
                  <div>
                    <table id="scoreRange" class="table table-striped table-bordered table-advance price-tableInfoTb3" contenteditable="false">
                      <thead>
                      <tr class="price-tableTbTh3 specTable">
                        <th  style="width: 20%;">
                          物料名称
                        </th>
                        <th style="width: 20%">物料价格</th>
                        <!--<th>诊断日期</th>-->
                        <th style="width: 30%">
                          <i @click="changePXData('price_before_week',2,true)" class="iconfont icon-paixu-shengxu"  :class="{isActive:isFlag==2}"></i>
                          较上周初
                          <i @click="changePXData('price_before_week',1,false)" class="iconfont icon-paixu-jiangxu"  :class="{isActive:isFlag==1}"></i>
                        </th>
                        <th  style="width: 30%">
                          <i @click="changePXData('price_before_month',3,true)" class="iconfont icon-paixu-shengxu"  :class="{isActive:isFlag==3}"></i>
                          较上月初
                          <i @click="changePXData('price_before_month',4,false)" class="iconfont icon-paixu-jiangxu" :class="{isActive:isFlag==4}"></i></th>
                      </tr>
                      </thead>

                      <tbody v-if="items.length>0" >
                      <tr v-for="(item,index) in  items">
                        <td class="app_td" @click="metailDetail(item.name)" style="width: 20%;color: rgb(2, 117, 216);cursor: pointer">
                          <u> {{item.name}}</u>
                        </td>
                        <td>
                          <div class="data_box2">
                            {{item.price|setNum1}}
                          </div>
                        </td>
                        <td :class="{Green:item.priceBeforeWeek<0,Red:item.priceBeforeWeek>=0}">
                          {{item.priceBeforeWeek}}<span v-if="item.priceBeforeWeek!=null">%</span>
                        </td>
                        <td :class="{Green:item.priceBeforeMonth<0,Red:item.priceBeforeMonth>=0}">
                          {{item.priceBeforeMonth}}<span v-if="item.priceBeforeMonth!=null">%</span>
                        </td>
                      </tr>
                      </tbody>
                      <tbody v-else>
                      <tr >
                        <td colspan="9">暂无数据
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <pagination  :perPages="perPages" :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange">
                  </pagination>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <macro-index></macro-index>

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
  import Pagination from "./Pagination"
  import MacroIndex from "./macroIndex"
  import {httpUrl} from '../apiConfig/api';
  export default {
    data () {
      return {
        isFlag:0,
        perPages:1,
        pageSize : 20 , //每页显示20条数据
        currentPage : 1, //当前页码
        count : 0, //总记录数
        items:[],
        id:"",
        rankDate:"",
        hasAuthority:false,
        isAsc:false,
        filed:"",
        imgItems:[],
        dialogVisible: false,
        name:"",
        detail:{},
        initUrl:"",
        searchName:""
      }
    },
    components: {
      Pagination,
      MacroIndex
    },
    mounted: function () {

      /**
       * 获取物料的第一页数据
       */
      this.priceTablesData();

      /**
       * 获取初始物料的图片
       */
      this.metailImg();
    },

    methods:{
      /**
       * 获取诊股排名的数据
       */
      priceTablesData(){
        this.$http.get(httpUrl.materialPriceTableApi, {
          params: {pageSize:this.pageSize,pageNo:this.currentPage,filed:this.filed,isAsc:this.isAsc}
        }).then(function(res){
          if(res.body.code==0){
            this.count = res.body.data.entity.total;
            this.items=res.body.data.entity.materials;
            this.rankDate=res.body.data.entity.date;
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },

      changePXData(data,flag,isAsc){
        this.filed=data;
        this.isFlag=flag;
        this.isAsc=isAsc;
        this.priceTablesData();
      },

      /**
       * 从page组件传递过来的当前page
       */
      pageChange (page) {
        this.currentPage = page;
        this.priceTablesData();
      },

      /**
       * 点击货物名称，修改展示的价格名称
       */
      metailImg(name){
        this.id=name;
        this.$http.get(httpUrl.materialPriceImgApi, {
          params: {ids:this.id}
        }).then(function(res){
          if(res.body.code==0){
            this.imgItems=res.body.data.entities;
             sessionStorage.setItem('name',this.id);
            if(name!==undefined){
              this.$router.push({
                name:'Dialog',
                params:{
                  "name":this.id
                }
              })

            }
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },


      metailDetail(name){
        this.id=name;
        this.$http.get(httpUrl.materialPriceImgApi, {
          params: {ids:this.id}
        }).then(function(res){
          if(res.body.code==0){
            this.imgItems=res.body.data.entities;
            this.name=this.id;
            this.dialogVisible = true;
            this.getMetailDetail();
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },
      /**
       * 点击x关闭弹框
       */
      handleClose(done) {
        done();
      },

      /**
       * 点击物料名称，查看物料详情
       */
      getMetailDetail(){
        this.$http.get(httpUrl.materialPriceDetailApi, {
          params: {name:this.name}
        }).then(function(res){
          if(res.body.code==0){
             this.detail=res.body.data.entity;
            this.initUrl=this.detail.industryUrl;
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },

      /**
       * 点击物料名称，查看物料走势图
       */
      showUrl(url){
        console.log(url)
        this.initUrl=url;
      },

      /**
       * 输入物料名称，查询物料
       */
      getMaterielList(){
        this.$http.get(httpUrl.materialPriceTableApi, {
          params: {
            pageSize:this.pageSize,
            pageNo:this.currentPage,
            filed:this.filed,
            isAsc:this.isAsc,
            name:this.searchName
          }
        }).then(function(res){
          console.log(res)
          if(res.body.code==0){

            this.count = res.body.data.entity.total;
            this.items=res.body.data.entity.materials;
            this.rankDate=res.body.data.entity.date;
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      }


    },
    watch:{
      initAmount:function(val, oldVal){
        this.fetchLastRecomData();
        this.getDiagnosticStocksResult()
      }
    },

  }
</script>

<style scoped>
  *
  .price-table-content{
    position: relative;
  }
  .price-table-box{
    overflow: auto;
  }
  .price-table1 {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .price-table-head-box{
    margin: 0 2%;
    width: 96%;
  }
  .metarilImg{
    max-width: 100%;
  }
  .price-table2{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .head-content{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
    /*overflow: auto;*/
  }
  .price-table3{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .price-table4{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .price-tableHead1{
    padding-top: 1rem;
    margin-top: 20px;
  }
  .price-tableHead2{
    padding-top: 1rem;
    margin-top: 20px;
    /*border-bottom: 1px solid #eef1f5;*/
    margin-bottom: 10px;
  }
  .price-tableHead3{
      padding-top: 1rem;
      margin-top: 20px;
      /*border-bottom: 1px solid #eef1f5;*/
      margin-bottom: 10px;
    }
  .price-tableHead4{
    padding-top: 1rem;
    margin-top: 20px;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
  }
  .price-tableHead1 >h3{
    height: 3rem;
    text-align: center;
  }
  .price-tableHead2 >h3{
    height: 3rem;
    text-align: center;
  }
  .price-tableHead3 >h3{
    height: 3rem;
    text-align: center;
  }
  .price-tableHead4 >h3{
    height: 3rem;
    text-align: center;
  }
  .price-tableInfo1{
    width: 96%;
    margin: 0 2%;
  }
  .price-tableInfo1_1{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .price-tableInfo1_1_1{
    float: left;
    margin-top: 50px;
  }
  .price-tableInfo1_2{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .price-tableInfo2{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .price-tableInfo3{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .price-tableInfo4{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .price-tableBar{
    margin-top: 10px;
  }
  .price-tableBar input{
    width: 45%;
    height: 30px;
  }
  .theComment1{
    margin-top: 5px;
    line-height: 25px;
  }
  .theComment2{
    padding-bottom: 5px;
  }
  .price-tableInfoTb1{
    border: none;
  }
  .price-tableInfoTb1 th{
    width: 50%;
    text-align: left;
  }
  .price-tableTbTh2 th{
    text-align: center;
  }
  .price-tableTbTh3 th{
    text-align: center;
  }
  .theFirstColumn{

    width: 15%;
    max-width: 300px;
    /*background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=) no-repeat 100% center;*/
  }
  .tb_project{
    margin-left: 40%;
  }
  .tb_years{
  }
  .right_col{
    text-align: left;
  }
  .left_col{
    text-align: left;
  }
  .companyCodeAndName{
    font-size: large;
  }
  .score{
    font-size: xx-large;
    font-weight: 700;
  }

  .left_content{
    float: left;
    width: 30%;
    margin-left: 15%;
  }
  .left_content td{
    border: none;
  }
  .left_content th{
    border: none;
  }
  .right_content{
    float: left;
    width: 45%;
    margin-left: 5%;
    margin-top: 20px;
  }
  .right_content td{
    border: none;
  }
  .right_content th{
    border: none;
  }
  .left_content_operate{
    width: 47%;
    float: left;
  }
  .right_content_finance{
    width: 49%;
    text-align: center;
    float: right;
  }
  .operate_finance{
    float: left;
    width: 100%;
  }
  .theScore{
    float: left;
    margin-left: 15%;
    background: #e0e0e0;
  }
  .fiveYearsFD th{
    text-align: center;
  }
  .left_content_operate table>tbody>tr>td{
    border: none;
    padding-left: 30%;
  }
  .left_content_operate table>tbody>tr>th{
    border: none;
    padding-left: 30%;
  }
  .right_content_finance table>tbody>tr>td{
    border: none;
    padding-left: 30%;
  }
  .right_content_finance table>tbody>tr>th{
    border: none;
    padding-left: 30%;
  }
  .streatText{
    font-weight: bolder;
    font-size: 32px;
  }
  .streatText2{
    font-weight: bolder;
    font-size: 24px;
  }
  .streatText3{
    font-weight: bolder;
    font-size: 22px;
  }
  .data_box2{
    width: 60%;
    text-align: right;
  }
  .form-search{
    display: flex;
    justify-content: center;
  }
  .form-search input{
    margin-right: 5px;
    height: 34px;
  }
  .form-search button{
    margin-right: 5px;
  }
  .head_td_app{
    display: none;
  }
  .isActive{
    color:#3D77E1;
  }
  .optStyle{
    cursor: pointer;
  }
  .asc{
    display: inline-block;
    position: absolute;
    margin-top: 5px;
    margin-left: -20px;
  }


  .price-table-shadow{
    text-align: center;
    position: fixed;
    height: 100%;
    width: 100%;
   background-color: rgba(90, 90, 90, 0.5);
    z-index: 999;
  }
  .price-table-shadow-detail{
    width: 70%;
    margin-left: 15%;
    background: #ffffff;
    margin-top: 2rem;
    height: auto;
  }

  /*
 屏幕兼容(平板)
  */
  @media screen and (min-width:600px) and (max-width:900px)
  {
    .head_td_app{
      display: none;
    }
  }
  /*
  pc端隐藏
  */
  @media screen and (min-width:601px)
  {
    .head_td_app{
      display: none;
    }
  }
  /*
  屏幕兼容(手机)
   */
  @media screen and (max-width:600px)
  {
    .head_td_pc{
      display: none;
    }
    .head_td_app{
      display: block;
      font-size: 12px;
    }
    .theFirstColumn{
      width: 70px!important;
      max-width: 70px!important;
    }
    .price-table1{
      width: 100%;
      margin-left: 0px;
    }
    .price-table2{
      width: 100%;
      margin-left: 0px;
    }
    .price-table3{
      width: 100%;
      margin-left: 0px;
    }
    .price-table4{
      width: 100%;
      margin-left: 0px;
    }
    .price-tableBar{
      font-size: 1rem;
      float: left;
      margin-bottom: 15px;
      width: 100%;
      text-align: left;
    }
    .price-tableBar input{
      width: 85%;
    }
    .theComment1 p{
      text-align: left;
    }
    .theComment2{
      margin-left: 2%;
    }
    .theComment2 p{
      text-align: left;
    }
    .price-tableInfoTb1{
      border: none;
    }
    .price-tableInfoTb1 th{
      border: none;
    }
    .price-tableInfoTb1 td{
      border: none;
      text-align: left;
    }
    .left_col{
      border-right: 2px solid #ddd !important;
    }
    .right_col{
      text-align: left;
    }
    .tb_project{
      margin-left: -10%;
    }
    .tb_years{
      margin-left: 30%;
    }
    .tb_tb_tr th{
      font-size: 2px;
      padding: 1px;
      width: 70px!important;
    }
    .data_box2{
     width:100%;
      text-align: right;
    }
    .mb-td{
      padding: 0px;
    }
    .mb-th{
      width: 70px!important;
    }
    .list-flex{
      display: flex;
      flex-direction: row;
    }
    .left_content_operate table>tbody>tr>th{
      border: none;
      padding-left: 0%;
    }
    .left_content_operate{
      width: 100%;
      float: left;
    }
    .right_content_finance table>tbody>tr>th{
      border: none;
      padding-left: 0%;
    }
    .right_content_finance table>tbody>tr>td{
      border: none;
      padding-left: 0%;
    }
    .right_content_finance{
      width: 100%;
      float: left;
    }
    .streatText2{
      font-weight: bolder;
      font-size: 20px;
    }
    .left_content_operate table>tbody>tr>td{
      border: none;
      padding-left: 0%;
    }
    .table-bordered {
      border: 0px solid #fff;
    }
    .table>thead:first-child>tr:first-child>th {
      border-top:1px solid #ddd!important;
    }
    .left_col{
      border-right: 0px solid #ddd !important;
    }
    .title-app{
      font-size:12px!important;
    }
    #selfStock>thead>tr>th{
      font-size:12px!important;
    }
    #scoreRange>thead>tr>th{
      font-size:12px!important;
    }
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
.price-table-Bar{
  margin-top: 10px;
  margin-bottom: 20px;
}
  .price-table-Bar input{
    width: 45%;
    height: 30px;
  }
  .form-search input{
    margin-right: 5px;
    height: 34px;
  }
</style>
