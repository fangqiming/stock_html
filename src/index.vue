<template>
  <div class="recommend">
    <div class="paperTrading">
      <virtual-account :todayAccountBo="todayAccountBo" :operatorVo="operatorVo"
                       :totalAccountBo="totalAccountBo"></virtual-account>
    </div>
    <div class="latest_recommend_list">
      <latest-recommendation heading="勾A股系统业绩总览" :recommendations="recommendationsList"></latest-recommendation>
    </div>
    <div class="index_contrast">
      <index-contrast heading="勾A股系统盈亏率对比" @filterIndexCurImg="filterIndexCurImg($event)" :GainInfo="GainInfo"
                      :select="curTime"></index-contrast>
    </div>

    <div class="paperTrading">
      <current-holding :holding="holding" :holdingCode="holdingCode"></current-holding>
    </div>
    <div class="index_recommend">
      <div class="recommendRow1 recommendRownew">
        <div class="recommendHeader">
          <h3 style="width: 100%;text-align: center">勾A股系统交易计划<span class="recommentTime">{{holding.length ? holding[0].newDate : ''}}<span
            class="timeArea">(北京时间)</span></span></h3>
          <!--<h3 style="width: 100%;text-align: center">最新推荐 <span class="recommentTime">{{recommends.length>0 ? recommends[0].newDate : ""}}</span></h3>-->
        </div>
        <div class="recomment_row">
          <div class="row-fluid">
            <div class="span12">
              <table class="table table-striped table-bordered table-advance recomment_tb">
                <thead>
                <tr class="recommend-thead-tr">
                  <th>股票代码<br/>公司名称</th>
                  <th>计划操作</th>
                  <th>计划操作比<br>计划操作额(￥)</th>
                  <th>备注</th>
                </tr>
                </thead>
                <tbody v-if="recommends.length>0 && recommendsCode != '11090010' && recommendsCode != '11090012'">
                <tr v-for="(item,index) in recommends">
                  <td>
                    <a :href="item.url" class="strongText blockA" target="_blank" rel="noopener noreferrer"
                       style="display: block!important;text-align: center;color: rgb(2, 117, 216)!important;cursor: pointer"><u>{{item.name}}</u></a>
                    {{item.stockName}}
                  </td>
                  <td :class="{Green:item.action=='卖出',Red:item.action=='买入'}">{{item.action}}</td>
                  <td>{{item.investmentRatio*100 |toFixed2 }}%<br>{{item.amount |setNum}}</td>
                  <td>{{item.note}}</td>
                </tr>
                </tbody>
                <tbody
                  v-else-if="recommends.length == 0 && recommendsCode != '11090010' && recommendsCode != '11090012'">
                <tr>
                  <td colspan="7">当天无推荐</td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                  <td colspan="7">此信息仅限合作伙伴；如需帮助，请参考页面底部的联系方式。</td>
                </tr>
                </tbody>
              </table>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="showTransactionRecord showTransaction_Record">
          <a class="recommend_info">
          </a>
        </div>
      </div>

    </div>
    <!--实盘账户一览表-->
    <!--    <div class="index_recommend">-->
    <!--      <div class="recommendRow1 recommendRownew">-->
    <!--        <div class="recommendHeader">-->
    <!--          <h3 style="width: 100%;text-align: center">勾A股系统实盘展示<span class="recommentTime">{{holding.length ? fundList.date : ''}}<span class="timeArea">(周更)</span></span></h3>-->
    <!--        </div>-->
    <!--        <div class="recomment_row">-->
    <!--          <div class="row-fluid">-->
    <!--            <div class="span12">-->
    <!--              <table class="table table-striped table-bordered table-advance recomment_tb" >-->
    <!--                <thead>-->
    <!--                <tr class="recommend-thead-tr">-->
    <!--                  <td class="font-weight-bold">账户</td>-->
    <!--                  <td class="font-weight-bold">初始日期</td>-->
    <!--                  <td class="font-weight-bold">总资产</td>-->
    <!--                  <td class="font-weight-bold">初始净值<br>当前净值</td>-->
    <!--                  <td class="font-weight-bold">最大回撤</td>-->
    <!--                </tr>-->
    <!--                </thead>-->
    <!--                <tbody >-->
    <!--                <tr v-for="(item,index) in fundList.list">-->
    <!--                  <td class="routerStyle" @click="showFundDetail(item.name)">-->
    <!--                       <u>{{item.name}}</u>-->
    <!--                  </td>-->
    <!--                  <td >{{item.startDate}}</td>-->
    <!--                  <td  ><div class="data_box1">{{item.marketCap | setNum}}</div></td>-->
    <!--                  <td  ><div class="data_box1">{{item.initNetWorth | toFixed4}}<br>{{item.netWorth}}</div></td>-->
    <!--                  <td ><div class="data_box1">{{item.withdrawal|toFixed2}}%</div></td>-->
    <!--                </tr>-->
    <!--                </tbody>-->
    <!--              </table>-->
    <!--              <div class="clear"></div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="showTransactionRecord showTransaction_Record">-->
    <!--          <a class="recommend_info">-->
    <!--          </a>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--实盘账户一览表-->
    <!--<div class="sysRegulation">
      <div class="sysRegulationHead">
        <h3 style="width: 100%; text-align: center">系统规则</h3>
      </div>
      <div class="sysRegulationInfo">
        <div class="row-fluid">
          <div class="span12">
            <div class="sysRegulationInfoContent">
              <p>
                <b>【交易规则】</b>每个交易收盘后，系统自动学习更新，并作出第二天交易的推荐。买入卖出的股票价格以第二天的收盘价计。如果推荐股票在第二天涨停或跌停，系统将认为此股不可操作。
              </p>
              <p>
                <b>【资金使用】</b>系统保留一定的仓位，在极个别情况下，系统将融资买入，最大融资额度不超过账户总值的25%。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>-->


    <div class="feature">
      <div class="row_top">
        <div class="row row_about">
          <div class="col-md-12 col-md-6_about">
            <div class="icon_title">
              <div class="icon"><i class="iconfont icon-zhinengsuanfa iconfont-icon"></i></div>
              <div class="title">勾股公告</div>
            </div>
            <div class="desc">
              勾股系统于2018/8/1正式上线测试。
              测试期间，账号免费公开。
              系统业绩透明。欢迎批评指导。
              也可以参考或跟随勾股系统交易。
              勾股定理科技不做任何承诺
              （包括系统的稳定性，推荐的正确性与数据的及时性），
              盈亏用户自负。请用户根据自身财力与风险承受力合理理财。
            </div>
          </div>
          <div class="col-md-12 col-md-6_about">
            <div class="icon_title">
              <div class="icon">
                <i class="iconfont icon-tuandui-tianchong iconfont-icon"></i>
              </div>
              <div class="title">关于我们</div>
            </div>
            <div class="desc">
              勾股定理科技的核心团队由硅谷资深人工智能专家，
              及股票投资资深人士领头创建。主要开发人员分布于硅谷，北京，上海三地。
              勾股系统是由勾股定理科技公司（Pyttatec.com）的科学家及人工智能工程师
              为中国股市量身打造的股票交易系统。
              勾股系统的交易算法集巴菲特的价值投资，
              华尔街的量化风控策略，
              及机器深度学习于一身。
              勾股交易属于低频，稳健，长短结合型的价值投资。
            </div>
          </div>
          <div class="col-md-12 col-md-6_about">
            <div class="icon_title">
              <div class="icon">
                <i class="iconfont icon-taolun iconfont-icon"></i>
              </div>
              <div class="title">合作交流</div>
            </div>
            <div class="desc">
              勾股定理科技正在策划私募基金，
              希望能与您共赢。与此同时，
              也愿与大资金机构或个人合作
              （5000万元资本以上），
              为您量身制定交易策略。
              有意者请与bd@pyttatec.com联系。
              如对我们的产品系统等有建议，
              请联系tec@pyttatec.com。
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="contentFooter">
        <div class="row">
          <div class="col-md-12">
            <span>Copyright</span>
            <span>©2018 pyttatec All Rights Reserved</span>
            <a href="http://www.beian.miit.gov.cn"><u>赣ICP备18004847号</u></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LatestRecommendation from './components/LatestRecommendation';
  import Recommend from './components/Recommend';
  import MarketTrend from './components/MarketTrend';
  import CurrentHolding from './components/CurrentHolding';
  import IndexContrast from './components/IndexContrast';
  import VirtualAccount from "./components/VirtualAccount";
  import {setSession, getSession} from './apiConfig/cookie.js';
  import {httpUrl} from './apiConfig/api'

  export default {
    data() {
      return {
        todayAccountBo: {},
        operatorVo: {},
        totalAccountBo: {},
        virtualEmpPresent: 0,
        recommendationsList: [],
        indexCompare: [],
        recommends: [],
        recommendsCode: '',
        trend: {},
        holding: [],
        holdingCode: '',
        record: {},
        curAmount: '',
        totalAmount: '',
        curTime: "-1",
        pageSize: 100,
        currentPage: 1,
        indexContract: {},
        GainInfo: {},
        userAccount: {},
        stockMoney: [
          {
            "id": 1,
            "value": "10万"
          },
          {
            "id": 2,
            "value": "20万"
          },
          {
            "id": 3,
            "value": "50万"
          },
          {
            "id": 4,
            "value": "100万"
          },
          {
            "id": 5,
            "value": "200万"
          },
          {
            "id": 6,
            "value": "500万"
          },
          {
            "id": 7,
            "value": "1000万"
          }
        ],
        stockNum: [5, 10],
        initAmount: "1000万",
        // initNum:10,
        isLogin: true,
        type: 'CN',
        fundList: ""
      }
    },
    components: {
      MarketTrend,
      'virtual-account': VirtualAccount,
      'v-recommend': Recommend,
      'market-trend': MarketTrend,
      'current-holding': CurrentHolding,
      "latest-recommendation": LatestRecommendation,
      "index-contrast": IndexContrast
    },
    mounted: function () {
      if (getSession('Amount-Share')) {
        var str = getSession('Amount-Share');
        this.initAmount = str;
      }
      if (getSession('username')) {
        this.isLogin = false;
        var tempArr = [
          {
            title: 'A股',
            url: 'index'
          }
          ,
          {
            title: '美股',
            url: 'usStock'
          }
          ,
          {
            title: '讨论区',
            url: 'Forum'
          },
          {
            title: 'A股诊股',
            url: 'DiagnosticStocks'
          },
          {
            title: '退出',
            url: 'SignUp'
          }
        ];
        if (getSession('authority') != null && getSession('authority') != '') {
          if (getSession('authority').search('US') == -1) {
            tempArr.splice(1, 1);
            if (getSession('authority').search('AD') == -1) {
              tempArr.splice(2, 1);
            }
          } else if (getSession('authority').search('AD') == -1) {
            tempArr.splice(3, 1);
          }
        } else {
          tempArr.splice(1, 1);
          tempArr.splice(2, 1);
        }
        this.aa.seturl(tempArr);
      }
      this.getGainInfo();
      /**
       * 获取首页的最新推荐赢亏数据
       */
      this.newSearchLastGainApi();
      /**
       * 获取上证指数与毕达指数的对比
       */
      this.fetchTrendData();


      /**
       * 获取用户账户信息数据
       */
      this.getVirtualAccount();


      /**
       * 获取操作统计数据
       */
      this.getOperatorSummary();

      /**
       *获取当前持股
       */
      this.fetchCurStockeData();


      /**
       * 获取推荐信息
       */
      this.fetchLastRecomData();

      /**
       * 获取基金信息列表
       */
      this.getFundList();
    },

    methods: {
      newSearchLastGainApi() {
        this.$http.get(httpUrl.newSearchLastGainApi
        ).then(function (res) {
          if (res.body.code == 0) {
            this.recommendationsList = res.body.data.entities;
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },


      filterTrendByTime(time) {
        this.curTime = time;
        this.fetchTrendData();
      },

      filterIndexCurImg(obj) {
        this.curTime = obj.id;
        this.getGainInfo();
      },
      /**
       * 获取当前持股信息
       */
      fetchCurStockeData() {
        this.$http.get(httpUrl.tradeFindStockApi).then(function (res) {
          this.holdingCode = res.body.code;
          if (res.body.code == 0) {
            this.holding = res.body.data.entities;
          } else {
            //alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /**
       * 获取用户账户信息数据
       */
      getVirtualAccount: function () {
        this.$http.get(httpUrl.getUserAccoutInfoApi).then(function (res) {
          if (res.body.code == 0) {
            this.todayAccountBo = res.body.data.entity.todayAccountBo;
            this.totalAccountBo = res.body.data.entity.totalAccountBo;
            this.operatorVo = res.body.data.entity.operatorVo;
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },


      filterTrendByTime(time) {
        this.curTime = time;
        this.fetchTrendData();
      },

      /**
       * 获取大盘与走势AI的数据
       */
      fetchTrendData() {
        this.$http.get(httpUrl.GetContrastApi, {
          params: {step: this.curTime}
        }).then(function (res) {
          if (res.body.code == 0) {
            this.trend = res.body.data.entity;
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      getGainInfo: function () {
        this.$http.get(httpUrl.getGainInfoApi, {
          params: {diff: this.curTime}
        }).then(function (res) {
          if (res.body.code == 0) {
            this.GainInfo = res.body.data.entity;
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },


      /**
       * 获取操作统计数据
       */
      getOperatorSummary: function () {
        this.$http.get(httpUrl.getOperatorSummaryApi).then(function (res) {
          if (res.body.code == 0) {
            this.userAccount = res.body.data.entity;
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /**
       * 获取最新推荐的数据
       */
      fetchLastRecomData() {
        this.$http.get(httpUrl.lastRecommendationApi).then(function (res) {
          this.recommendsCode = res.body.code;
          if (res.body.code == 0) {
            if (res.body.data.entities[0] == null) {
              this.recommends = [];
            } else {
              this.recommends = res.body.data.entities;
            }
          } else {
            //alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      getFundList() {
        this.$http.get(httpUrl.getFundListApi, {
          params: {type: this.type}
        }).then(function (res) {
          if (res.body.code == 0) {
            this.fundList = res.body.data.entity;
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      showFundDetail(name) {
        sessionStorage.setItem('fundName', name);
        sessionStorage.setItem('fundFlag', "CN");
        this.$router.push({
          name: 'RealFund',
          params: {
            "fundName": name
          }
        })
      }
    },
    watch: {
      initAmount: function (val, oldVal) {
        //var AmountShare=this.initAmount.split("万")[0]+"0000";
        setSession('Amount-Share', this.initAmount);
        this.getVirtualAccount();
        this.fetchLastRecomData();
        this.fetchCurStockeData();
        this.getOperatorSummary();
        this.fetchTrendData();
        this.getGainInfo();
        this.newSearchLastGainApi();
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *
  .font-weight-bold {
    font-weight: bolder;
  }

  .routerStyle {
    color: rgb(2, 117, 216);
    cursor: pointer
  }

  .recommentTip {
    text-align: left;
    /*color: red;*/
    font-size: 1.2rem;
  }

  .sysRegulationInfoContent {
    text-align: left;
    font-size: 1.5rem;
    color: #595959;
  }

  .item {
    height: 520px;
  }

  img {
    width: 100% !important;
    height: 100% !important;
  }

  li {
    background: #0c203a;
  }

  /*.active{
    background: #0c91e5;
  }*/
  .recommend {
    background: #ECECEC;
  }

  .carousel-control {

    opacity: 0;
  }

  .carousel-control:focus, .carousel-control:hover {
    color: transparent;
    text-decoration: none;
    outline: 0;
    opacity: .9;
  }

  .feature {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 2rem 2%;
    padding: 0 0 3rem 0;
  }

  .featureTitle {
    padding: 1rem;
    text-align: center;
  }

  .featureTitle > h3 {
    padding: 0rem;
    text-align: center;
  }

  .ant-row {
    position: relative;
    margin-left: 0;
    margin-right: 0;
    height: auto;
    zoom: 1;
    display: block;
    padding-bottom: 100px;
  }

  .icon {
    padding: 0rem 0rem 0rem 15%;
    font-size: 50px;
  }

  .title {
    padding: 0rem 0rem 0rem 2%;
    font-size: 2rem;
    line-height: 300%;
    font-weight: bold;
    color: #595959;
  }

  .desc {
    padding: 0rem 15%;
    text-align: left;
    line-height: 200%;
    font-size: 1.5rem;
    text-indent: 2.8rem;
    color: #595959;
  }

  .row_top {
    padding-top: 2rem;
    padding-bottom: 100px;
  }

  .iconfont-icon {
    font-size: 5rem;
    color: #00add2;
  }

  .footer {
    width: 100%;
    height: 4rem;
    background: #FD0000;
  }

  .footer a {
    color: #00ADD2;
    line-height: 4rem;
    font-size: 1rem;
  }

  .footer span {
    color: #ffffff;
    line-height: 4rem;
    font-size: 1rem;
  }

  .operationAccount {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 0 2%;
  }

  .operationAccountRow {
    width: 96%;
    margin: 0 2%;
  }

  .showTransactionRecord {
    padding-bottom: 2rem;
  }

  .currentHoldingHeader {
    width: 96%;
    border-bottom: 1px solid #EEF1F5;
    margin: 0 2%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .currentHoldingHeader h3 {
    width: 100%;
    text-align: center;
  }

  .recommendRow1 {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin-top: 1rem;
  }

  .recommendRownew {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 0 2%;
    margin-top: 1.5rem;
  }

  .recommendHeader {
    width: 96%;
    border-bottom: 1px solid #EEF1F5;
    margin: 0 2%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .row-fluid {
    padding-top: 20px;
    width: 96%;
    margin: 0 2%;
    padding-bottom: 5px;
  }

  .recommend-thead-tr th {
    text-align: center;
  }


  .table-striped > tbody > tr:nth-of-type(odd) {
    background-color: #fbfcfd;
  }

  .recommendComponents {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .current-holding-thead-tr th {
    text-align: center;
    width: 50%;
  }

  .icon_title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .col-md-6_about {

  }

  a:hover {
    text-decoration: none;
  }

  .paperTrading {
    /*margin-top: 2rem;*/
  }

  .sysRegulation {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
    border: 1px solid transparent;
  }

  .sysRegulationHead {
    width: 96%;
    border-bottom: 1px solid #EEF1F5;
    margin: 0 2%;
  }

  .sysRegulationHead h3 {
    text-align: center;
  }

  .sysRegulationInfo {
    width: 100%;
  }

  .SettingUpAssets {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
    border: 1px solid transparent;
  }

  .SettingUpAssetsHead {
    width: 96%;
    border-bottom: 1px solid #EEF1F5;
    margin: 0 2%;
  }

  SettingUpAssetsHead h3 {
    text-align: center;
  }

  .SettingUpAssetsInfo {
    width: 100%;
  }

  .SettingUpAssetsInfoItem {
    display: flex;
    flex-direction: row;
    padding: 1rem 30%;
    height: 5rem;
  }

  .SettingUpAssetsItemName {
    height: 3rem;
    line-height: 3rem;
    width: 50%;
    text-align: center;
  }

  .SettingUpAssetsItemValue {
    text-align: center;
  }

  td > select, td > input {
    height: 3rem;
    width: 15rem;
  }

  .data_box1 {
    width: 63%;
    text-align: right;
  }

  /*
 屏幕兼容(平板)
  */
  @media screen and (min-width: 600px) and (max-width: 900px) {
    img {
      width: 30%;
      height: 30%;
    }

    .feature {
      margin: auto;
      width: 100%;

    }

    .col-md-4 {
      float: left;
      width: 30%;
      font-size: x-small;
    }


    /*.carousel-inner {*/
    /*display: none;*/
    /*}*/


  }

  /*
  pc端隐藏
  */
  @media screen and (min-width: 601px) {
    .head_td_app {
      display: none;
    }
  }

  /*
  屏幕兼容(手机)
   */
  @media screen and (max-width: 600px) {
    /*.carousel-inner {
      display: none;
    }*/
    .head_td_pc {
      display: none;
    }

    .sysRegulationInfoContent {
      font-size: 1.2rem;
    }

    .item {
      height: 18rem;
    }

    .feature {
      margin: 20px auto;
      /*width: 96%;*/
      width: 100%;
    }

    .latest_recommend_list {
      margin-bottom: 1rem;
    }

    img {
      width: 100% !important;
      height: 18rem !important;
    }

    .ant-row {
      width: 120%;
      position: relative;
      margin-left: -20px;
      height: auto;
      zoom: 1;
      display: block;
      padding-bottom: 100px;
    }

    .col-md-4 {
      float: left;
      width: 30%;
    }

    .icon {
      font-size: 30px;
    }

    .title {
      /* font-size: 1.5rem;*/
      font-size: 14px;
      line-height: 200%;
      font-weight: bold;
      color: #595959;
    }

    .desc {
      /*text-align: center;*/
      line-height: 100%;
      /*font-size:0.5rem;*/
      font-size: 1.2rem;
      width: 100%;
      margin: auto;
      padding-right: 5%;
      padding-left: 10%;
      color: #595959;
    }

    .iconfont-icon {
      font-size: 3rem;
    }

    .row {
      margin: 20px 0;
    }

    .head_td {
      width: 70%;
      text-align: left;
      border: none;
    }

    .data_box {
      text-align: right;
      vertical-align: middle;
    }

    tr {
      font-size: 1.2rem;
    }

    .row_top {
      padding-bottom: 0px;
    }

    .row_about {
      margin-top: 0px;
      display: flex;
      flex-direction: column;
    }

    .col-md-6_about {
      width: 96%;
      margin-left: 5%;
    }

    .icon {
      float: left;
      /*margin-left: 1%;*/
      margin-top: 20px;
      padding: 0rem 0rem 0rem 11%;
    }

    .title {
      float: left;
      margin: 27px 5%;
    }

    .desc {
      float: left;
      text-align: left;
      margin-top: -20px;
      border-left: 0.5px outset #b0c3e3;
    }

    .col-md-12 {
      padding: 0px;
    }

    .table {
      font-size: 1.2rem;
      border: none;
      margin-bottom: 0px;
    }

    .table_now {
      border-right: 2px solid #ddd;
    }

    .table td {
      border: none;
      /*border-right: 3px solid #b20030;*/
      padding: 5px;
    }

    .recomment_tb {
      border: 1px solid #ddd;
    }

    .recomment_tb td {
      border: 1px solid #ddd;
    }

    .now_tb {
      width: 50%;
      float: left;
      padding: 0px;
    }

    .now_tb th {
      width: 50%;
    }

    .operationAccountRow {
      margin: 0 1%;
    }

    .recomment_row {
      margin-bottom: 20px;
      /*float: left;*/
    }

    .recommend_info {
      font-size: 14px;
    }

    .showTransaction_Record {
      margin-top: -2rem;
    }

    .current-holding-thead-tr th {
      text-align: left;
    }

    .recommendRownew {
      width: 100%;
      margin-left: 0px;
    }

    .operationAccount {
      width: 100%;
      margin-left: 0px;
    }

    .sysRegulation {
      width: 100%;
      margin: 2rem 0 0 0;
    }

    .SettingUpAssets {
      width: 100%;
      margin: 2rem 0 0 0;
    }

    .SettingUpAssetsItemName {
      text-align: left;
      font-weight: bold;
    }

    .help-block {
      text-align: left;
      font-size: 1.2rem;
    }

    .timeArea {
      /* font-size: 2rem;*/
    }

    .recommentTime {
      font-size: 14px;
    }
  }

  a {
    color: rgb(2, 117, 216) !important;
    font-weight: 400;
  }
</style>
