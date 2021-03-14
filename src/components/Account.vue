<template>
  <div class="accountInfo">
    <div class="accountItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">A股{{accountCnDate}}账户对比</div>
        </el-col>
      </el-row>
      <el-row class="table-head">
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">账户名</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span>净资产<br/>净值(￥)</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><span>收益率<br/>收益差</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span>仓位<br/>等仓位跑赢</span></div>
        </el-col>
      </el-row>
      <el-row class="table-body" v-for='(item,index) in  accountCn' :key='index'>
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">{{item.name}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light data_box3">
           <span>
              <a>{{item.asset  | setNum}}</a><br/>
              <a>{{item.net  | toFixed4}}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple data_box3">
            <span>
              <a :class="{Green:item.gain<0,Red:item.gain>=0}"
                 v-if="item.gain>=0">+{{item.gain*100  | toFixed2}}%</a><br v-if="item.gain>=0"/>
              <a :class="{Green:item.gain<0,Red:item.gain>=0}" v-if="item.gain <0">{{item.gain*100  | toFixed2}}%</a><br
              v-if="item.gain <0"/>
              <a :class="{Green:item.gainDiff<0,Red:item.gainDiff>=0}" v-if="item.gainDiff>=0">+{{item.gainDiff*100  | toFixed2}}%</a>
              <a :class="{Green:item.gainDiff<0,Red:item.gainDiff>=0}" v-if="item.gainDiff <0">{{item.gainDiff*100  | toFixed2}}%</a>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light data_box3">
          <span>
            <a>{{item.position*100 | toFixed2}}%</a><br/>
            <a :class="{Green:item.beta<0,Red:item.beta>=0}" v-if="item.beta>=0">+{{item.beta*100 | toFixed2}}%</a>
            <a :class="{Green:item.beta<0,Red:item.beta>=0}" v-if="item.beta <0">{{item.beta*100 | toFixed2}}%</a>
          </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="index_contrast">
      <index-contrast heading="账户收益对比" :GainInfo="CnGainInfo" :title="titleCn" :series="CnSeries"></index-contrast>
    </div>
    <div class="accountItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">美股{{accountUsDate}}账户对比</div>
        </el-col>
      </el-row>
      <el-row class="table-head">
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">账户名</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span>净资产<br/>净值($)</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><span>收益率<br/>收益差</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span>仓位<br/>等仓位跑赢</span></div>
        </el-col>
      </el-row>
      <el-row class="table-body" v-for='(item,index) in  accountUs' :key='index'>
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">{{item.name}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light data_box3">
            <span>
              <a>{{item.asset  | setNum}}</a><br/>
              <a>{{item.net  | toFixed4}}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple data_box3">
          <span>
              <a :class="{Green:item.gain<0,Red:item.gain>=0}"
                 v-if="item.gain>=0">+{{item.gain*100  | toFixed2}}%</a><br v-if="item.gain>=0"/>
              <a :class="{Green:item.gain<0,Red:item.gain>=0}" v-if="item.gain <0">{{item.gain*100  | toFixed2}}%</a><br
            v-if="item.gain <0"/>
              <a :class="{Green:item.gainDiff<0,Red:item.gainDiff>=0}" v-if="item.gainDiff>=0">+{{item.gainDiff*100  | toFixed2}}%</a>
              <a :class="{Green:item.gainDiff<0,Red:item.gainDiff>=0}" v-if="item.gainDiff <0">{{item.gainDiff*100  | toFixed2}}%</a>
          </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light data_box3">
           <span>
            <a>{{item.position*100  | toFixed2}}%</a><br/>
            <a :class="{Green:item.beta<0,Red:item.beta>=0}" v-if="item.beta>=0">+{{item.beta*100  | toFixed2}}%</a>
            <a :class="{Green:item.beta<0,Red:item.beta>=0}" v-if="item.beta <0">{{item.beta*100  | toFixed2}}%</a>
          </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="index_contrast">
      <index-contrast heading="账户收益对比" :GainInfo="UsGainInfo" :title="titleUs" :series="UsSeries"></index-contrast>
    </div>
    <div class="accountItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">{{accountDiffDate}}账户跟踪误差</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :lg="8">
          <div class="grid-content bg-purple content-padding-2">
            <label>开始时间</label>
            <el-date-picker
              v-model="startTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :xs="24" :lg="8">
          <div class="grid-content bg-purple content-padding-2">
            <label>结束时间</label>
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :xs="24" :lg="8">
          <div class="grid-content bg-purple-light content-padding-2">
            <el-select v-model="rangeValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-head">
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">账户名</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span>收益率<br/>收益差</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><span>平均仓位<br/>等仓位跑赢</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span>最大回撤<br/>回撤差</span></div>
        </el-col>
      </el-row>
      <el-row class="table-body" v-for='(item,index) in  accountDiffRange' :key='index'>
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">{{item.account}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light data_box3">
          <span>
              <a :class="{Green:item.gain<0,Red:item.gain>=0}"
                 v-if="item.gain>=0">+{{item.gain*100  | toFixed2}}%</a><br v-if="item.gain>=0"/>
              <a :class="{Green:item.gain<0,Red:item.gain>=0}" v-if="item.gain <0">{{item.gain *100 | toFixed2}}%</a><br
            v-if="item.gain <0"/>
              <a :class="{Green:item.gainDiff<0,Red:item.gainDiff>=0}" v-if="item.gainDiff>=0">+{{item.gainDiff*100  | toFixed2}}%</a>
              <a :class="{Green:item.gainDiff<0,Red:item.gainDiff>=0}" v-if="item.gainDiff <0">{{item.gainDiff*100  | toFixed2}}%</a>
          </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple data_box3">
           <span>
              <a>{{item.position*100  | toFixed2}}%</a><br/>
              <a :class="{Green:item.beta<0,Red:item.beta>=0}" v-if="item.beta>=0">+{{item.beta  | toFixed2}}%</a>
              <a :class="{Green:item.beta<0,Red:item.beta>=0}" v-if="item.beta <0">{{item.beta  | toFixed2}}%</a>
          </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light data_box3">
           <span>
              <a>{{item.drawdown*100  | toFixed2}}%</a><br/>
              <a :class="{Red:item.drawdownDiff<0,Green:item.drawdownDiff>=0}" v-if="item.drawdownDiff>=0">+{{item.drawdownDiff*100  | toFixed2}}%</a>
              <a :class="{Red:item.drawdownDiff<0,Green:item.drawdownDiff>=0}" v-if="item.drawdownDiff <0">{{item.drawdownDiff*100  | toFixed2}}%</a>
          </span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Pagination from "./Pagination"
  import IndexContrast from './IndexContrast1';
  import {httpUrl} from '../apiConfig/api';

  export default {
    name: "Account",
    data() {
      var _this = this
      return {
        startTime: null,
        endTime: null,
        accountCnDate: null,
        accountCn: [],
        accountUsDate: null,
        accountUs: [],
        tradeContrast: [],
        options: [{
          value: 'w',
          label: '近一周'
        }, {
          value: 'm',
          label: '近一月'
        }, {
          value: 'q',
          label: '近一季'
        }, {
          value: 'y',
          label: '近一年'
        }],
        rangeValue: 'w',
        accountDiffDate: null,
        accountDiffRange: [],
        CnGainInfo: {},
        UsGainInfo: {},
        titleCn: [
          '勾A股',
          '上证',
          '迎春',
          '刘桥',
          '君合'
        ],
        titleUs: [
          '勾美股',
          '标普',
          '雪盈',
          '嘉信',
          '老虎',
          'IRA'
        ],
        CnSeries: [],
        UsSeries: []
      }
    },
    components: {
      Pagination,
      "index-contrast": IndexContrast
    },
    mounted: function () {
      this.startTime = null;// 默认显示为当天时间
      this.endTime = new Date();

      /**
       * 获取A股最新的账户对比
       */
      this.getAccountCnData();

      /**
       * 获取A股账户收益对比
       */
      this.getChGainInfo();

      /**
       * 获取美股最新的账户对比,
       */
      this.getAccountUsData();

      /**
       * 获取美股账户收益对比
       */
      this.getUsGainInfo();

      /**
       * 获取交易对比
       */
      // this.tradeContrastData();

      /**
       * 获取账户的误差
       */
      this.getAccountDiff();

    },

    methods: {
      // 格式化时间，获取当前时间的一个月后的时间值
      convertToLateDate() {
        var data = new Date();
        var Da = new Date(data.getTime() + 24 * 60 * 60 * 1000 * 30);
        // 以上两行代码为关键代码，若想要返回一天后的时间，则可以将第二行代码更换为下面代码
        // var Da = new Date(data.getTime() + 24 * 60 * 60 * 1000);
        // 若是想要返回值为当前时间，则上面两行代码可以直接修改为下面代码即可。
        // var Da = new Date()
        var y = Da.getFullYear();
        var m = Da.getMonth() + 1;
        var d = Da.getDate();
        var H = Da.getHours();
        var mm = Da.getMinutes();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        H = H < 10 ? "0" + H : H;
        return y + "-" + m + "-" + d + " " + H + ":" + mm;
      },


      /**
       * 获取A股最新的账户对比
       */
      getAccountCnData() {
        this.$http.get(httpUrl.getAccountCnApi, {
          params: {}
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            console.log(res)
            this.hasAuthority = true;
            this.accountCnDate = res.body.data.date
            this.accountCn = res.body.data.entities;
          } else if (res.body.code != 0) {
            this.hasAuthority = false;
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      // 获取美股最新的账户对比
      getAccountUsData() {
        this.$http.get(httpUrl.getAccountUsApi, {
          params: {}
        }).then(function (res) {
          if (res.body.code == 0) {
            this.hasAuthority = true;
            this.accountUsDate = res.body.data.date
            this.accountUs = res.body.data.entities;
          } else if (res.body.code != 0) {
            this.hasAuthority = false;
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /**
       * 获取A股账户收益对比
       */
      getChGainInfo() {
        this.$http.get(httpUrl.getChGainInfoApi, {
          params: {}
        }).then(function (res) {
          if (res.body.code == 0) {
            this.CnGainInfo = res.body.data.entity;
            this.CnSeries = [
              {
                symbol: "none",
                name: '勾A股',
                type: 'line',
                data: this.CnGainInfo.gag,
              },
              {
                symbol: "none",
                name: '上证',
                type: 'line',
                data: this.CnGainInfo.szzs,
              },
              {
                symbol: "none",
                name: '迎春',
                type: 'line',
                data: this.CnGainInfo.yczh,
              },
              {
                symbol: "none",
                name: '刘桥',
                type: 'line',
                data: this.CnGainInfo.lqjj,
              },
              {
                symbol: "none",
                name: '君合',
                type: 'line',
                data: this.CnGainInfo.jhai,
              }
            ]
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },
      /**
       * 获取美股账户收益对比
       */
      getUsGainInfo() {
        this.$http.get(httpUrl.getUsGainInfoApi, {
          params: {}
        }).then(function (res) {
          if (res.body.code == 0) {
            this.UsGainInfo = res.body.data.entity;
            this.UsSeries = [
              {
                symbol: "none",
                name: '勾美股',
                type: 'line',
                data: this.UsGainInfo.gmg,
              },
              {
                symbol: "none",
                name: '标普',
                type: 'line',
                data: this.UsGainInfo.sp,
              },
              {
                symbol: "none",
                name: '雪盈',
                type: 'line',
                data: this.UsGainInfo.xyzq,
              },
              {
                symbol: "none",
                name: '嘉信',
                type: 'line',
                data: this.UsGainInfo.jxzq,
              }, {
                symbol: "none",
                name: '老虎',
                type: 'line',
                data: this.UsGainInfo.lhzq,
              }, {
                symbol: "none",
                name: 'IRA',
                type: 'line',
                data: this.UsGainInfo.jxira,
              }
            ]
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },
      /**
       * 获取账户的误差
       */
      getAccountDiff(code) {
        if (this.startTime !== null && this.endTime !== null) {
          this.getAccountDiffByDate()
        } else {
          this.getAccountDiffBySelector()
        }
      },
      /**
       * 由时间范围获取账户的跟踪误差
       */
      getAccountDiffByDate() {
        let start = this.standardTimeChange(this.startTime)
        let end = this.standardTimeChange(this.endTime)
        if (end == null || start == null) {
          return false
        }
        this.$http.get(httpUrl.getAccountDiffDataApi, {
          params: {
            start: start,
            end: end,
          }
        }).then(function (res) {
          if (res.body.code == 0) {
            this.accountDiffDate = res.body.data.date;
            this.accountDiffRange = res.body.data.entities;
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      // 标准时间转化
      standardTimeChange(value) {
        var date_value = null
        if (value) {
          var date = new Date(value);
          var Month = date.getMonth() > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
          var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
          date_value = date.getFullYear() + '-' + Month + '-' + day;
          return date_value
        } else {
          return date_value
        }
      },
      /**
       * 由下拉选择获取账户的跟踪误差
       */
      getAccountDiffBySelector() {
        this.$http.get(httpUrl.getAccountDiffRangeApi, {
          params: {
            diff: this.rangeValue
          }
        }).then(function (res) {
          if (res.body.code == 0) {
            this.accountDiffDate = res.body.data.date;
            this.accountDiffRange = res.body.data.entities;
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

    },
    watch: {
      startTime: function (val, oldVal) {
        if (val !== null) {
          this.getAccountDiffByDate()
        }
      },
      endTime: function (val, oldVal) {
        if (val !== null) {
          this.getAccountDiffByDate()
        }
      },
      rangeValue: function (val, oldVal) {
        this.getAccountDiffBySelector()
      }
    },

  }
</script>

<style scoped>
  .accountInfo {
    width: 96%;
    height: auto;
    /*background: #ffffff;*/
    margin: 2rem 2% 3rem 2%;
  }

  .header {
    display: flex;
    margin: 2rem 0px 0px;
    justify-content: center;
    /* height: 4rem; */
    width: 100%;
    line-height: 4rem;
    border-bottom: 1px solid #ECECEC;
  }

  .title {
    font-size: 20px;
    /* font-weight: bold; */
    color: #333;
  }

  .accountItem {
    margin-bottom: 2rem;
    background: #fff;
    padding-bottom: 20px;
  }

  .accountItem .table-body:last-child .grid-content {
    border-bottom: 1px solid #ddd !important;
  }

  .table-head {
    width: 96%;
    margin: 20px 2% 0px;
    /* padding-bottom: 5px; */
    /* border: 1px; */
    font-weight: bolder;
    font-size: 14px;
    color: #333;
  }

  .table-body {
    width: 96%;
    margin: 0 2%;
  }

  .table-head .grid-content {
    border-collapse: collapse;
    border: 1px solid #ddd;
    line-height: 3rem;
    height: 4rem;
    margin-right: -1px;
  }

  .table-head .one-row {
    padding-top: 10px;
  }

  .table-body .grid-content {
    border-collapse: collapse;
    border: 1px solid #ddd;
    line-height: 3rem;
    height: 4rem;
    margin-right: -1px;
    margin-top: -1px;
  }

  .table-body .one-row {
    padding-top: 10px;
  }

  .el-col {
    border-radius: 4px;
    height: 100%;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .content-padding-2 {
    padding: 12px 0px;
  }

  .bg-purple, .bg-purple-light {
    /*background: #d3dce6;*/
    border-bottom: 0px solid #ddd !important;
  }

  .bg-purple-light {
    /*background: #e5e9f2;*/
  }

  .grid-content {
    /*border-radius: 4px;*/
    min-height: 36px;
  }

  .grid-content span {
    line-height: 18px;
    display: inline-table;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .data_box3 {
    padding-right: 44%;
    text-align: right;
  }

  .Green {
    color: #0B9F91 !important;
  }

  .Red {
    color: #E9531E !important;
  }

  a {
    color: #333 !important;
  }

  /*
屏幕兼容(手机)
*/
  @media screen and (max-width: 600px) {
    .data_box3 {
      padding-right: 14%;
      text-align: right;
    }

    .accountInfo .title {
      font-size: 14px;
      font-weight: 700 !important;
    }

    .accountInfo .table-head {
      font-size: 12px;
      font-weight: 700 !important;
    }

    .accountInfo .table-body {
      font-size: 12px;
    }
  }
</style>
