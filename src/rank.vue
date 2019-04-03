<template>
  <div>
    <div v-show="detailFlag" class="diagnosticStock3">
      <div class="diagnosticStockInfo3">
        <div class="diagnosticStockHead3">
          <h3>公告</h3>
        </div>
        <table class="table table-bordered">
          <thead>
          <tr class="diagnosticStockPool">
            <th class="StockPoolText">
              栏目
            </th>
            <th class="StockPoolTime" style="text-align: center">公告时间</th>
          </tr>
          </thead>

          <tbody v-if="notice.length>0" >
          <tr v-for="(item,index) in  notice">
            <td class="StockPoolText">
              <a :href="item.url" class="strongText" target="_blank" rel="noopener noreferrer"><u>{{item.noticetitle}}</u></a>
            </td>
            <td class="StockPoolTime">
              {{item.noticedate}}
            </td>
          </tr>
          </tbody>
          <tbody v-else-if="notice.length<=0 && hasAuthority">
          <tr >
            <td colspan="9">暂无数据
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-show="detailFlag" class="diagnosticStock3">
      <div class="diagnosticStockInfo3">
        <div class="diagnosticStockHead3">
          <h3>主营产品价格</h3>
        </div>
        <div class="row-fluid">
          <div class="span12">
            <div class="list">
              <template>
                <div>
                  <table  class="table table-striped table-bordered table-advance diagnosticStockInfoTb3" contenteditable="false">
                    <thead>
                    <tr class="diagnosticStockTbTh3" >
                      <th >
                        物料名称
                      </th>
                      <th>较上周初</th>
                      <th >较上月初</th>
                    </tr>
                    </thead>

                    <tbody v-if="productPrice.length>0" >
                    <tr v-for="(item,index) in  productPrice">
                      <td class="app_td" @click="showDiaglog(item.name)" style="width: 20%;color: rgb(2, 117, 216);cursor: pointer">
                        <u >{{item.name}}</u>
                      </td>
                      <td :class="{Green:item.priceBeforeWeek<0,Red:item.priceBeforeWeek>=0}">
                        <div class="data_box2">
                        {{item.priceBeforeWeek |toFixed2}}%
                        </div>
                      </td>

                      <td :class="{Green:item.priceBeforeMonth<0,Red:item.priceBeforeMonth>=0}">
                        <div class="data_box2">
                        {{item.priceBeforeMonth |toFixed2}}%
                        </div>
                      </td>
                    </tr>
                    </tbody>
                    <tbody v-else-if="productPrice.length<=0 && hasAuthority">
                    <tr >
                      <td colspan="9">暂无数据
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="diagnosticStock3">
      <div class="diagnosticStockInfo3">
        <div class="diagnosticStockHead3">
          <h3>得分排名{{rankDate}}</h3>
        </div>
        <div class="row-fluid">
          <div class="span12">
            <div class="list">
              <template>
                <div>
                  <table id="scoreRange" class="table table-striped table-bordered table-advance diagnosticStockInfoTb3" contenteditable="false">
                    <thead>
                    <tr class="diagnosticStockTbTh3 font14">
                      <th>
                        股票代码
                      </th>
                      <th>公司名称</th>
                      <th @click="changePXData('score',1)">AI评分<i class="iconfont icon-paixu-jiangxu"  :class="{isActive:isFlag==1}"></i></th>
                    </tr>
                    </thead>

                    <tbody v-if="items.length>0 && hasAuthority" >
                    <tr v-for="(item,index) in  items">
                      <td class="app_td" @click="showDetail(item.code)" style="width: 20%;color: rgb(2, 117, 216);cursor: pointer">
                        <u>{{item.code}}</u>
                      </td>
                      <td>
                        <a :href="item.url" class="strongText blockA" target="_blank" rel="noopener noreferrer" style="display: block!important;text-align: center"><u>{{item.name}}</u></a>
                      </td>

                      <td>
                        <div  class="data_box2">
                          {{item.aiScore | toFixed4}}
                        </div>
                      </td>
                    </tr>
                    </tbody>
                    <tbody v-else-if="items.length<=0 && hasAuthority">
                    <tr >
                      <td colspan="9">暂无数据
                      </td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr >
                      <td colspan="9">您没有权限查看评分排名
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

    <div  class="diagnosticStock3">
      <div class="diagnosticStockInfo3">
        <div class="diagnosticStockHead3">
          <h3>AI得分统计</h3>
        </div>
        <div class="row-fluid">
          <div class="span12">
            <div class="list">
              <template>
                <div>
                  <table  class="table table-striped table-bordered table-advance diagnosticStockInfoTb3" contenteditable="false">
                    <thead>
                    <tr class="diagnosticStockTbTh3">
                      <th style="width: 33.3%">
                        范围
                      </th>
                      <th style="width: 33.3%">数量</th>
                      <th style="width: 33.3%">占比</th>
                    </tr>
                    </thead>

                    <tbody v-if="scoreStatistics.length>0" >
                    <tr v-for="(item,index) in  scoreStatistics">
                      <td  class="app_td" >
                        {{item.name}}
                      </td>
                      <td >
                        <div  class="data_box2">
                          {{item.score }}
                        </div>
                      </td>

                      <td >
                        <div v-if="item.rate!=null" class="data_box2">
                          {{item.rate |toFixed2}}%
                        </div>
                      </td>
                    </tr>
                    </tbody>
                    <tbody v-else-if="scoreStatistics.length<=0 && hasAuthority">
                    <tr >
                      <td colspan="9">暂无数据
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="diagnosticStock3">
      <div class="diagnosticStockInfo3">
        <div class="diagnosticStockHead3">
          <h3>小股池最新公告展示</h3>
        </div>
        <table class="table table-bordered">
          <thead>
            <tr class="diagnosticStockPool">
              <th class="StockPoolText">
                栏目
              </th>
              <th class="StockPoolTime" style="text-align: center">公告时间</th>
            </tr>
          </thead>

          <tbody v-if="newNotice.length>0" >
            <tr v-for="(item,index) in  newNotice">
              <td class="StockPoolText">
                <a :href="item.url" class="strongText" target="_blank" rel="noopener noreferrer"><u>{{item.noticetitle}}</u></a>
              </td>
              <td class="StockPoolTime">
                {{item.noticedate}}
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="newNotice.length<=0 && hasAuthority">
            <tr >
              <td colspan="9">暂无数据
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


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
  import Pagination from "./components/Pagination"
  import {httpUrl} from './apiConfig/api';
  export default {
    data () {
      return {
        isFlag:1,
        searchCode:"",
        isLogin:true,
        perPages:1,
        pageSize : 20 , //每页显示20条数据
        currentPage : 1, //当前页码
        count : 0, //总记录数
        items:[],
        name:"",
        rankDate:"",
        hasAuthority:false,
        isAsc:true,
        filed:"score",
        notice:[],
        newNotice:[],
        productPrice:[],
        detailFlag:false,
        dialogVisible: false,
        name:"",
        detail:{},
        initUrl:"",
        scoreStatistics:[]
      }
    },
    components: {
      Pagination
    },
    mounted: function () {

      /**
       * 获取诊股排名的第一页数据
       */
      this.diagnosticStocksData();

      /**
       * 获取AI得分统计
       */
      this.getScoreStatistics();

      /**
       * 获取小股池最新公告数据
       */
      this.getStockPoolNotice();

    },

    methods:{




      /**
       * 获取诊股排名的数据
       */
      diagnosticStocksData (){
        this.$http.get(httpUrl.diagnosticStocksRankApi, {
          params: {pageSize:this.pageSize,pageNo:this.currentPage,filed:this.filed,isAsc:this.isAsc}
        }).then(function(res){
          console.log(res)
          if(res.body.code==0){
            this.hasAuthority=true;
            this.count = res.body.data.entity.total;
            this.items=res.body.data.entity.ranks;
            this.rankDate=res.body.data.entity.date;
          }else if(res.body.code!=0){
            this.hasAuthority=false;
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },

      changePXData(data,flag){
        this.filed=data;
        this.isFlag=flag;
        this.diagnosticStocksData();
      },

      /**
       * 从page组件传递过来的当前page
       */
      pageChange (page) {
        this.currentPage = page;
        this.diagnosticStocksData();
      },

      /***
       * 点击排名的code,响应的方法
       *
       */
      showDetail(code){
        this.detailFlag=true;
        this.showNotice(code);
        this.showProductPrice(code);
      },

      /**
       * 点击排名的code,显示公告
       */
      showNotice(code){
        this.$http.get(httpUrl.getShowNoticeApi, {
          params: {
           code:code
          }
        }).then(function(res){
          if(res.body.code==0){
            this.notice=res.body.data.entities;
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },
      /**
       * 点击排名的code,显示主营产品
       */
      showProductPrice(code){
        this.$http.get(httpUrl.getProductPriceApi,{
          params: {
           code:code
          }
        }).then(function(res){
          if(res.body.code==0){
            this.productPrice=res.body.data.entities;
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },
      showDiaglog(id){
        this.id=id;
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

      getStockPoolNotice(){
        this.$http.get(httpUrl.getStockPoolApi).then(function(res){
          if(res.body.code==0){
            this.newNotice=res.body.data.entities;
          }else if(res.body.code!=0){
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },

      getScoreStatistics(){
        this.$http.get(httpUrl.getcoreStatisticsApi).then(function(res){
          if(res.body.code==0){
            this.scoreStatistics=res.body.data.entities;
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
  .strongText{
    color: rgb(2, 117, 216)!important;
    cursor: pointer;
    overflow: hidden;
    display: -webkit-box;
    display: -moz-box;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
  }
  .diagnosticStock1 {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .diagnosticStock2{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .diagnosticStock3{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .diagnosticStock4{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .diagnosticStockHead1{
    padding-top: 1rem;
    margin-top: 20px;
  }
  .diagnosticStockHead2{
    padding-top: 1rem;
    margin-top: 20px;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
  }
  .diagnosticStockHead3{
    padding-top: 1rem;
    margin-top: 20px;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
  }
  .diagnosticStockHead4{
    padding-top: 1rem;
    margin-top: 20px;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
  }
  .diagnosticStockHead1 >h3{
    height: 3rem;
    text-align: center;
  }
  .diagnosticStockHead2 >h3{
    height: 3rem;
    text-align: center;
  }
  .diagnosticStockHead3 >h3{
    height: 3rem;
    text-align: center;
  }
  .diagnosticStockHead4 >h3{
    height: 3rem;
    text-align: center;
  }
  .diagnosticStockInfo1{
    width: 96%;
    margin: 0 2%;
  }
  .diagnosticStockInfo1_1{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .diagnosticStockInfo1_1_1{
    float: left;
    margin-top: 50px;
  }
  .diagnosticStockInfo1_2{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .diagnosticStockInfo2{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .diagnosticStockInfo3{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .diagnosticStockInfo4{
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }
  .diagnosticStockBar{
    margin-top: 10px;
  }
  .diagnosticStockBar input{
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
  .diagnosticStockTbTh3 th{
    text-align: center;
    width: 33.3%;
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
    padding-right:45%;
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
    .diagnosticStock1{
      width: 100%;
      margin-left: 0px;
    }
    .diagnosticStock2{
      width: 100%;
      margin-left: 0px;
    }
    .diagnosticStock3{
      width: 100%;
      margin-left: 0px;
    }
    .diagnosticStock4{
      width: 100%;
      margin-left: 0px;
    }
    .diagnosticStockBar{
      font-size: 1rem;
      float: left;
      margin-bottom: 15px;
      width: 100%;
      text-align: left;
    }
    .diagnosticStockBar input{
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
    .diagnosticStockInfoTb1{
      border: none;
    }
    .diagnosticStockInfoTb1 th{
      border: none;
    }
    .diagnosticStockInfoTb1 td{
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
      padding-right:0%;
      text-align: center;
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
    .StockPoolText{
      width: 75%;
      text-align: center;
     }
    .StockPoolTime{
      width: 25%;
      text-align: center;
    }
    /*.StockPoolText a{*/
      /*display:block;*/
      /*width: 80%;*/
    /*}*/
    .noticeText{
      max-width: 300px!important;
    }
    #scoreRange>thead>tr>th{
      font-size: 12px!important;
    }
    .data_box2{
      padding-right:40%;
      text-align: right;
    }
  }
  .StockPoolText{
    text-align: center;
  }
  a{
    display: block!important;
    text-align: center;
    font-weight: 400!important;
  }


</style>
