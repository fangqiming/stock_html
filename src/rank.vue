<template>
  <div>
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
                    <tr class="diagnosticStockTbTh3">
                      <th>股票代码<br>
                        公司名称
                      </th>
                      <th>市值<br>TTM
                      </th>
                      <th>毛利率<br>负债率
                      </th>
                      <!--<th>诊断日期</th>-->
                      <th @click="changePXData('ai_score',1)">AI评分<i class="iconfont icon-paixu-jiangxu"  :class="{isActive:isFlag==1}"></i></th>
                      <th  @click="changePXData('flush_score',2)">同花顺评分<i class="iconfont icon-paixu-jiangxu" :class="{isActive:isFlag==2}"></i></th>
                      <th  @click="changePXData('total_score',3)">综合评分<i class="iconfont icon-paixu-jiangxu" :class="{isActive:isFlag==3}"></i></th>
                    </tr>
                    </thead>

                    <tbody v-if="items.length>0 && hasAuthority" >
                    <tr v-for="(item,index) in  items">
                      <td class="app_td">
                         {{item.code}}<br>{{item.name}}
                      </td>
                      <td>
                        <div class="data_box2">
                          {{item.marketCap}}<br>{{item.peRatio}}
                        </div>
                      </td>
                      <td>
                        <div class="data_box2">
                          {{item.grossProfitMargin}}<br>{{item.debtRate}}
                        </div>
                      </td>
                      <td>
                        {{item.aiScore}}
                      </td>
                      <td>
                        {{item.flushScore}}
                      </td>
                      <td>
                        {{item.totalScore}}
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
        isAsc:false,
        filed:"ai_score"
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
  .diagnosticStockInfoTb1{
    border: none;
  }
  .diagnosticStockInfoTb1 th{
    width: 50%;
    text-align: left;
  }
  .diagnosticStockTbTh2 th{
    text-align: center;
  }
  .diagnosticStockTbTh3 th{
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
    padding-right:40%;
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
    #scoreRange>thead>tr>th{
      font-size:12px!important;
    }
  }
</style>
