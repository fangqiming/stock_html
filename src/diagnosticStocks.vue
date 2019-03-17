<template>
  <div>
    <div class="diagnosticStock4">
      <div class="diagnosticStockInfo4">
        <div class="diagnosticStockHead3">
          <h3>自选股票</h3>
        </div>
        <div class="row-fluid">
          <div class="span12">
            <div class="list">
              <template>
                <div>
                  <table id="selfStock" class="table table-striped table-bordered table-advance diagnosticStockInfoTb3" contenteditable="false">
                    <thead>
                    <tr class="diagnosticStockTbTh3">
                      <th>股票代码<br>
                        公司名称
                      </th>
                      <th> AI得分 </th>
                      <th> 同花顺得分</th>
                      <th> 综合得分</th>
                      <th>操作</th>
                    </tr>
                    </thead>
                    <tbody v-if="selfChooseStock.length>0" >
                    <tr v-for="(item,index) in  selfChooseStock">
                      <td class="app_td">
                        {{item.code}}<br>{{item.name}}
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
                      <td @click="delSelfStock(item.code)" class="optStyle">
                        删除
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
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="diagnosticStock1">
      <div class="diagnosticStockInfo1">
        <div class="diagnosticStockHead1">
          <h3>毕达诊股(A股)</h3>
        </div>
        <div class="diagnosticStockBar">
          <form class="form-search">
            <input type="text"  class="form-control" placeholder="输入股票代码或公司名称" v-model="searchCode"/>
            <button type="button" class="btn btn-default"  @click="search()">诊股</button>
            <button type="button" class="btn btn-default" @click="addSelfStock()">加入自选股</button>
          </form>

        </div>
        <div class="theComment1">
        <p>注：该股票每天的综合评分会根据行情的变化而做出相应的调整，在一个完整的交易段内，请需要持续关注。</p>
      </div>
      </div>

      <div class="diagnosticStockInfo1_1 diagnosticStockInfo1_1_1">
        <div class="row-fluid">
          <div class="span12">
            <div class="list">
              <template>
                <div  class="left_content_operate diagnosticResult">
                  <table class="table table-striped  diagnosticStockInfoTb1" contenteditable="false" >
                    <tbody>
                    <tr class="">
                        <th class="streatText">{{name}}({{code}})
                        </th>
                    </tr>
                    <template  v-if="aiIndexBo.score!=null">
                      <tr class="">
                        <th class="right_col">诊断日期：{{aiIndexBo.date}}
                        </th>
                      </tr>
                      <tr class="">
                        <th  >AI得分：<span class="streatText3" :class="{Green:resultScore<70,Red:resultScore>=70}">{{aiIndexBo.score | setNum}}分</span>
                        </th>
                      </tr>
                      <tr class="">
                        <th class="right_col" ><span style="font-weight: 700">诊断结果：{{aiIndexBo.result}}</span></th>

                      </tr>
                      <tr class="">
                        <th class="">预期胜率：<span :class="{Green:resultScore<0,Red:resultScore>=0}">{{aiIndexBo.winRate | setNum}}%</span></th>
                      </tr>
                      <tr class="">
                        <th class="right_col" >综合诊断：该股票预期打败 <span :class="{Green:resultScore<0,Red:resultScore>=0}">{{aiIndexBo.beat | setNum}}%</span>的股票</th>
                      </tr>
                      <tr class="">
                        <th class="right_col">该股票持有15天预期收益率范围为 {{aiIndexBo.minProfitRate}}%~ +{{aiIndexBo.maxProfitRate | setNum}}%</th>
                      </tr>
                    </template>
                    <template v-else class="left_content_operate diagnosticResult">
                      <div>
                        暂未对该股票进行AI得分
                      </div>
                     </template>
                    </tbody>
                  </table>
                </div>

                <div class="right_content_finance">
                  <table class="table table-striped table-bordered table-advance diagnosticStockInfoTb1" contenteditable="false" >
                    <tbody>
                    <tr class="">
                      <th class="streatText2">财务风险</th>
                    </tr>
                    <tr class="">
                      <th class="">更新日期为：{{financialRiskBo.date}}</th>
                    </tr>
                    <tr class="">
                      <td class="right_col"><span style="font-weight: 700">该股票质押率为：</span><span :class="{Green:financialRiskBo.pledgeRate<0,Red:financialRiskBo.pledgeRate>=0}">{{financialRiskBo.pledgeRate}}%</span></td>
                    </tr>
                    <tr class="">
                      <td class="right_col"><span style="font-weight: 700">商誉占市值比：</span><span :class="{Green:financialRiskBo.goodwillRate<0,Red:financialRiskBo.goodwillRate>=0}">{{financialRiskBo.goodwillRate}}%</span></td>
                    </tr>
                    <tr class="">
                      <td class="right_col"><span style="font-weight: 700">公司负债率为：</span><span :class="{Green:financialRiskBo.debtRate<0,Red:financialRiskBo.debtRate>=0}">{{financialRiskBo.debtRate}}%</span></td>
                    </tr>
                    <tr class="">
                      <td class="right_col"><span style="font-weight: 700">经营现金流占总资产：</span><span :class="{Green:financialRiskBo.netOperateCashFlowRate<0,Red:financialRiskBo.netOperateCashFlowRate>=0}">{{financialRiskBo.netOperateCashFlowRate}}%</span></td>
                    </tr>
                    </tbody>
                  </table>
              </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="diagnosticStockInfo1_2">
          <div class="row-fluid">
            <div class="span12">
              <div class="list">
                <template>
                  <div class="operate_finance">
                    <div class="left_content_operate">
                      <table class="table table-striped table-bordered table-advance diagnosticStockInfoTb1" contenteditable="false" >
                        <tbody>
                          <tr class="">
                            <th class="streatText2">经营状况(参考 {{operateBo.dateRange}}年财报)</th>
                          </tr>
                          <tr class="">
                            <td class="left_col"><span style="font-weight: 700">近5年来平均毛利率：</span><span :class="{Green:operateBo.grossProfitMarginAvg<0,Red:operateBo.grossProfitMarginAvg>=0}"> {{operateBo.grossProfitMarginAvg | setNum}}%</span>，<span style="font-weight: 700">平均增长速度为：</span><span :class="{Green:operateBo.grossProfitMarginGrowthRate<0,Red:operateBo.grossProfitMarginGrowthRate>=0}">{{operateBo.grossProfitMarginGrowthRate | setNum}}</span></td>
                          </tr>
                          <tr class="">
                            <td class="left_col"><span style="font-weight: 700">近5年来平均ROE：</span><span :class="{Green:operateBo.roeAvg<0,Red:operateBo.roeAvg>=0}"> {{operateBo.roeAvg | setNum}}%</span>，<span style="font-weight: 700">平均增长速度为：</span><span :class="{Green:operateBo.roeGrowthRate<0,Red:operateBo.roeGrowthRate>=0}">{{operateBo.roeGrowthRate | setNum}}</span></td>
                          </tr>
                          <tr class="">
                            <td class="left_col"><span style="font-weight: 700">近5年来平均营收增长：</span><span :class="{Green:operateBo.operatingRevenueAvg<0,Red:operateBo.operatingRevenueAvg>=0}"> {{operateBo.operatingRevenueAvg | setNum}}%</span>，<span style="font-weight: 700">平均增长速度为：</span><span :class="{Green:operateBo.operatingRevenueGrowthRate<0,Red:operateBo.operatingRevenueGrowthRate>=0}">{{operateBo.operatingRevenueGrowthRate | setNum}}</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="right_content_finance">
                      <table class="table table-striped table-bordered table-advance diagnosticStockInfoTb1" contenteditable="false" >
                        <tbody>
                        <tr class="">
                          <th class="streatText2">技术指标</th>
                        </tr>
                        <tr class="" v-for="item2 of chooseStock">
                          <td class="right_col"><span style="font-weight: 700">{{item2.title}}</span><span v-for="item3 of item2.value">{{item3}}&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
      </div>

      <div class="" style="clear:both"></div>
      <div class="theComment2">
        <p>风险提示：诊断结果通过AI模型加工客观数据而成，仅供参考，不构成投资建议</p>
      </div>
  </div>

     <div class="diagnosticStock2">
    <div class="diagnosticStockInfo2">
      <div class="diagnosticStockHead2">
        <h3>近5财务数据详情</h3>
      </div>
      <div class="row-fluid">
        <div class="span12">
          <div class="list list-flex">
            <template>
              <div class="">
                <table class="table table-striped table-bordered table-advance curHoldingTable pc_table" contenteditable="false" >
                  <thead>
                  <tr class="diagnosticStockTbTh2" >
                    <th class="theFirstColumn">
                      <span class="tb_years">科目</span>
                    </th>
                    <th v-for="item of title" >{{item}}</th>
                    <!--<th v-for="item of title" class="head_td_app" >{{item}}</th>-->
                  </tr>
                  </thead>
                  <tbody class="fiveYearsFD">
                  <tr class="tb_tb_tr" v-for="item1 of financial">
                    <th class="mb-th title-app" >{{item1.title}}</th>
                    <td class="mb-td" v-if="item1.k0!=undefined"><div class="data_box2">{{item1.k0 | setNum}}</div></td>
                    <td class="mb-td" v-if="item1.k1!=undefined"><div class="data_box2">{{item1.k1 | setNum}}</div></td>
                    <td class="mb-td" v-if="item1.k2!=undefined"><div class="data_box2">{{item1.k2 | setNum}}</div></td>
                    <td class="mb-td" v-if="item1.k3!=undefined"><div class="data_box2">{{item1.k3 | setNum}}</div></td>
                    <td class="mb-td" v-if="item1.k4!=undefined"><div class="data_box2">{{item1.k4 | setNum}}</div></td>
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



  <!--<div class="diagnosticStock3">-->
    <!--<div class="diagnosticStockInfo3">-->
      <!--<div class="diagnosticStockHead3">-->
        <!--<h3>得分排名{{rankDate}}</h3>-->
      <!--</div>-->
      <!--<div class="row-fluid">-->
        <!--<div class="span12">-->
          <!--<div class="list">-->
            <!--<template>-->
              <!--<div>-->
                <!--<table id="scoreRange" class="table table-striped table-bordered table-advance diagnosticStockInfoTb3" contenteditable="false">-->
                  <!--<thead>-->
                  <!--<tr class="diagnosticStockTbTh3">-->
                    <!--<th>股票代码<br>-->
                      <!--公司名称-->
                    <!--</th>-->
                    <!--&lt;!&ndash;<th>诊断日期</th>&ndash;&gt;-->
                    <!--<th @click="changePXData('ai_score',1)">AI评分<i class="iconfont icon-paixu-jiangxu"  :class="{isActive:isFlag==1}"></i></th>-->
                    <!--<th  @click="changePXData('flush_score',2)">同花顺评分<i class="iconfont icon-paixu-jiangxu" :class="{isActive:isFlag==2}"></i></th>-->
                    <!--<th  @click="changePXData('total_score',3)">综合评分<i class="iconfont icon-paixu-jiangxu" :class="{isActive:isFlag==3}"></i></th>-->
                  <!--</tr>-->
                  <!--</thead>-->

                    <!--<tbody v-if="items.length>0 && hasAuthority" >-->
                    <!--<tr v-for="(item,index) in  items">-->
                      <!--<td class="app_td">-->
                        <!--{{item.code}}<br>{{item.name}}-->
                      <!--</td>-->
                      <!--&lt;!&ndash;<td>&ndash;&gt;-->
                      <!--&lt;!&ndash;{{item.date}}&ndash;&gt;-->
                      <!--&lt;!&ndash;</td>&ndash;&gt;-->
                      <!--<td>-->
                        <!--{{item.aiScore}}-->
                      <!--</td>-->
                      <!--<td>-->
                        <!--{{item.flushScore}}-->
                      <!--</td>-->
                      <!--<td>-->
                        <!--{{item.totalScore}}-->
                      <!--</td>-->
                    <!--</tr>-->
                    <!--</tbody>-->
                    <!--<tbody v-else-if="items.length<=0 && hasAuthority">-->
                    <!--<tr >-->
                      <!--<td colspan="9">暂无数据-->
                      <!--</td>-->
                    <!--</tr>-->
                    <!--</tbody>-->
                    <!--<tbody v-else>-->
                    <!--<tr >-->
                      <!--<td colspan="9">您没有权限查看评分排名-->
                      <!--</td>-->
                    <!--</tr>-->
                    <!--</tbody>-->
                <!--</table>-->
              <!--</div>-->
              <!--<pagination  :perPages="perPages" :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange">-->
              <!--</pagination>-->
            <!--</template>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->



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
        resultScore:88,
        code:"000002",
        financial:[],
        title:[],
        chooseStock:[],
        aiIndexBo:[],
        financialRiskBo:[],
        operateBo:[],
        name:"",
        selfChooseStock:[],
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
       * 获取近五年的财务数据
       */
      this.getFiveYearsData();
       /**
        * 获取诊股排名的第一页数据
        */
       // this.diagnosticStocksData();
      /**
       * 获取根据股票代码获取该股票的技术评分
       */
        this.getFindTechnology();
      /**
       * 获取根据公司名称或者是股票代码获取综合诊断结果
       */
      this.getDiagnosticStocksResult();

      /**
       * 查找自选股
       */
      this.searchSelfStock();

    },

    methods:{
      /**
       * 获取根据股票代码获取该股票的技术评分
       */
      getFindTechnology(){
        this.$http.get(httpUrl.diagnosticStocksFindTechnologyApi, {
          params: {code:this.code}
        }).then(function(res){
          if(res.body.code==0){
            this.chooseStock=res.body.data.entities;
          }else{
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },
      /**
       * 获取根据公司名称或者是股票代码获取综合诊断结果
       */
      getDiagnosticStocksResult(){
        this.$http.get(httpUrl.diagnosticStocksResultApi, {
          params: {code:this.code}
        }).then(function(res){
          if(res.body.code==0){
            console.log(res)
            this.code=res.body.data.entity.code;
            this.aiIndexBo=res.body.data.entity.aiIndexBo;
            this.financialRiskBo=res.body.data.entity.financialRiskBo;
            this.operateBo=res.body.data.entity.operateBo;
            this.name=res.body.data.entity.name;

          }else{
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },
      /**
       * 获取近五年的财务数据
       */
      getFiveYearsData(){
        this.$http.get(httpUrl.diagnosticStocksGetFiveYearsDataApi, {
          params: {code:this.code}
        }).then(function(res){
          if(res.body.code==0){
            this.financial = res.body.data.entity.financial;
            this.title=res.body.data.entity.title;
          }else{
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },


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

      search(){
        this.code=this.searchCode;
        if(this.code!=""){
          this.getFindTechnology();
          this.getDiagnosticStocksResult();
          this.getFiveYearsData();
        }else{
          alert("股票代码不能为空！")
        }

      },


      /**
       * 添加自选股票的数据
       */
      addSelfStock (){
        this.$http.get(httpUrl.diagnosticStocksAddApi, {
          params: {stock:this.searchCode}
        }).then(function(res){
          console.log(res)
          if(res.body.code==0){
            this.searchSelfStock();
            // this.hasAuthority=true;
            // this.count = res.body.data.total;
            // this.items=res.body.data.entity.ranks;
            // this.rankDate=res.body.data.entity.date;
          }else if(res.body.code!=0){
            this.hasAuthority=false;
            alert(res.body.message)
          }
        },function(){
          console.log("请求失败")
        });
      },

      /*查找自选股*/
      searchSelfStock(){
        this.$http.get(httpUrl.diagnosticStocksSearchApi, {
        }).then(function(res){
          console.log(res)
          if(res.body.code==0){
           this.selfChooseStock=res.body.data.entities;
          }else if(res.body.code!=0){
            // alert(res.body.msg)
          }
        },function(){
          console.log("请求失败")
        });
      },

      /*删除自选股*/
      delSelfStock(code){
        console.log(code)
        this.$http.get(httpUrl.diagnosticStocksDelApi, {
          params: {code:code}
        }).then(function(res){
          console.log(res)
          if(res.body.code==0){
            this.searchSelfStock();
          }else if(res.body.code!=0){
            // alert(res.body.msg)
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
