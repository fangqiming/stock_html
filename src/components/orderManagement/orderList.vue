<template>
  <div class="orderInfo">
    <!-- 交易计划-->
    <div class="orderItem">
      <el-row class="header" style="margin-bottom: 20px;">
        <el-col :span="24">
          <div class="grid-content title">交易计划</div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">股票代码</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control" @blur="getStockPrice(2)" placeholder="输入股票代码"
                   v-model="fromData0.symbol"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            {{stockPrice0}}
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">账户</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <el-select v-model="fromData0.action" placeholder="请选择">
              <el-option
                v-for="item in tradePlane0"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-select v-model="fromData0.accountId" @change="getAccountInfo(2)" placeholder="请选择">
              <el-option
                v-for="item in tradeAccount"
                :key="item.account"
                :label="item.name"
                :value="item.account">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">委托额/持仓额</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light" style="line-height: 4rem">
            <input type="text" class="form-control" placeholder="交易额"
                   v-model="fromData0.totalAmount"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            {{holdAmount0 |  setNum}}
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">确认</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <el-select v-model="fromData0.strategy" placeholder="请选择">
              <el-option
                v-for="item in stockStrategy"
                :key="item.strategy"
                :label="item.strategy"
                :value="item.strategy">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light" style="line-height: 4rem;">
            <el-button type="primary" size="mini" @click="submitData0">提交订单</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 计划列表-->
    <div class="orderItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">计划列表</div>
        </el-col>
      </el-row>
      <el-row class="table-head">
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">代码</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span>交易金额<br/>已成交</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">账户</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light one-row">操作</div>
        </el-col>
      </el-row>
      <el-row v-if="orderPlanList0.length !== 0" class="table-body" v-for='(item,index) in  orderPlanList0' :key='index'>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem;">
            <span>
              <a>{{item.symbol}}</a><br/>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>
              <a>{{item.totalAmount  | setNum}}</a><br/>
              <a >{{item.filledAmount}}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem;">
          <span>
              <a>{{item.accountId}}</a>
          </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light" style="line-height: 4rem;">
            <el-button type="primary" size="mini" @click="cancleOrder0(item.id)">取消</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row  v-if="orderPlanList0.length === 0" class="table-body" >
        <el-col :span="24">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            暂无数据
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 挂单计划-->
    <div class="orderItem">
      <el-row class="header" style="margin-bottom: 20px;">
        <el-col :span="24">
          <div class="grid-content title">交易计划</div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">股票代码</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control" @blur="getStockPrice(1)" placeholder="输入股票代码"
                   v-model="fromData.symbol"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple" style="line-height: 4rem">
           {{stockPrice}}
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">计划</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <el-select v-model="fromData.action" placeholder="请选择">
              <el-option
                v-for="item in tradePlane"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-select v-model="fromData.account" @change="getAccountInfo(1)" placeholder="请选择">
              <el-option
                v-for="item in tradeAccount"
                :key="item.account"
                :label="item.name"
                :value="item.account">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">委托额/持仓额</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light" style="line-height: 4rem">
            <input type="text" class="form-control" placeholder="挂单总额"
                   v-model="fromData.money"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            {{holdAmount |  setNum}}
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">挂一价/振幅</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control"  placeholder="委托价格"
                   v-model="fromData.price1"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            {{amplitude | toFixed4}}%
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">阶梯数/阶梯</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control"  placeholder="委托数量"
                   v-model="fromData.hangNumber"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-select v-model="fromData.step" placeholder="请选择">
              <el-option
                v-for="item in stepOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">有效期</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <el-select v-model="fromData.type" placeholder="请选择">
              <el-option
                v-for="item in typeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple date-picker">
            <el-date-picker
              v-model="fromData.deadline"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">确认</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light" style="line-height: 4rem;">
            <el-button type="primary" size="mini" @click="submitData">提交订单</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 挂单列表-->
    <div class="orderItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">计划列表</div>
        </el-col>
      </el-row>
      <el-row class="table-head">
        <el-col :span="6">
          <div class="grid-content bg-purple"><span>代码<br/>账户</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"><span>金额<br/>计划</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><span>挂一价<br/>类型</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light one-row">取消</div>
        </el-col>
      </el-row>
      <el-row v-if="orderPlanList.length !== 0" class="table-body" v-for='(item,index) in  orderPlanList' :key='index'>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>
              <a>{{item.symbol}}</a><br/>
              <a >{{item.account}}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span>
              <a>{{item.money  | setNum}}</a><br/>
              <a >{{item.action}}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
          <span>
              <a>{{item.price1  | setNum}}</a><br/>
              <a>{{item.type}}</a>
          </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light" style="line-height: 4rem;">
            <el-button type="primary" size="mini" @click="cancleOrder(item.id)">取消</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row  v-if="orderPlanList.length === 0" class="table-body" >
        <el-col :span="24">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            暂无数据
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- T+0-->
    <div class="orderItem">
      <el-row class="header" style="margin-bottom: 20px;">
        <el-col :span="24">
          <div class="grid-content title">T+0交易计划</div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">股票代码</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light" >
            <input type="text" class="form-control" @blur="getStockPrice(0)" placeholder="输入股票代码"
                   v-model="fromDataTZero.symbol"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            {{TZeroStockPrice}}
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">计划</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <el-select v-model="fromDataTZero.plan" placeholder="请选择">
              <el-option
                v-for="item in tradePlaneTZero"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-select v-model="fromDataTZero.account" @change="getAccountInfo(0)" placeholder="请选择">
              <el-option
                v-for="item in tradeAccount"
                :key="item.account"
                :label="item.name"
                :value="item.account">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">接回幅度</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-select v-model="fromDataTZero.step" placeholder="请选择">
              <el-option
                v-for="item in stepOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple data_box3">
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">挂单价/振幅</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control"  placeholder="委托价格"
                   v-model="fromDataTZero.hangPrice"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            {{TZeroAmplitude  | toFixed4}}%
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">持仓数量</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light" style="line-height: 4rem">
            {{TZeroHoldNumber | setNum}}
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">

          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">做T数量</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control"  placeholder="委托数量"
                   v-model="fromDataTZero.hangQty"/>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple">

          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">盘尾补齐</div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <el-select v-model="fromDataTZero.isCover" placeholder="请选择">
              <el-option
                v-for="item in isCoverOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple date-picker">

          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">确认</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light" style="line-height: 4rem;">
            <el-button type="primary" size="mini" @click="submitDataTZero">提交订单</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- T+0列表-->
    <div class="orderItem tzeroRow">
      <el-row class="header"  style="margin-bottom: 20px;">
        <el-col :span="24">
          <div class="grid-content title">T+0列表</div>
        </el-col>
      </el-row>
      <el-row class="table-head">
        <el-col :span="6">
          <div class="grid-content bg-purple"><span>代码<br/>账户<br/>计划</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light two-row"><span>数量<br/>幅度</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple two-row"><span>挂单价<br/>盘尾补齐</span></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light two-row" style="line-height: 6rem;height: 6rem">取消</div>
        </el-col>
      </el-row>
      <el-row v-if="orderPlanListTZero.length !== 0" class="table-body" v-for='(item,index) in  orderPlanListTZero' :key='index'>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>
              <a>{{item.symbol }}</a><br/>
              <a>{{item.account }}</a><br/>
              <a>{{item.plan}}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light two-row">
            <span>
              <a>{{item.hangQty  | setNum}}</a><br/>
              <a>{{item.step }}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple two-row">
          <span>
            <a>{{item.hangPrice  | setNum}}</a><br/>
            <a v-if="item.isCancel === 0">否</a>
            <a v-else-if="item.isCancel === 1">是</a>
          </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light two-row" style="line-height: 6rem;">
            <el-button type="primary" size="mini" @click="cancleOrderTZero(item.id)">取消</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="orderPlanListTZero.length === 0" class="table-body" >
        <el-col :span="24">
          <div class="grid-content bg-purple" style="line-height: 4rem;height: 4rem">
            暂无数据
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Pagination from "../Pagination"
  import IndexContrast from '../IndexContrast1';
  import {httpUrl} from '../../apiConfig/api';

  export default {
    name: "orderList",
    data() {
      var _this = this
      return {
        // 交易计划
        fromData0:{
          symbol:null,
          action:null,
          accountId:null,
          totalAmount:null,
          strategy:null
        },
        // 交易计划类型
        tradePlane0: [{
          value: 'BUY',
          label: 'BUY'
        }, {
          value: 'SELL',
          label: 'SELL'
        }],
        orderPlanList0:[
        ],
        // 挂单计划
        fromData:{
          symbol:null,
          action:null,
          account:null,
          money:null,
          price1:null,
          hangNumber:null,
          step:null,
          type:null,
          deadline:null,
        },
        stockStrategy:[],// 交易计划策略
        stockPrice0:null, // 交易计划当前股票价格
        stockPrice:null, // 当前股票价格
        tradePlane: [{   // 交易计划类型
          value: 'BUY',
          label: 'BUY'
        }, {
          value: 'SELL',
          label: 'SELL'
        }],
        holdAmount0:null, // 交易计划持仓金额
        tradeAccount: [],   // 挂单账户列表
        holdAmount:null, // 挂单计划持仓金额
        holdNumber:0,    // 持仓数量
        stepOption:[{    // 交易阶梯
          value: '0.005',
          label: '0.5%'
        }, {
          value: '0.01',
          label: '1%'
        }, {
          value: '0.015',
          label: '1.5%'
        }, {
          value: '0.02',
          label: '2%'
        }, {
          value: '0.025',
          label: '2.5%'
        }, {
          value: '0.03',
          label: '3%'
        }, {
          value: '0.05',
          label: '5%'
        }, {
          value: '0.07',
          label: '7%'
        },{
          value: '0.09',
          label: '9%'
        }],
        typeOption:[{   // 交易有效期
          value: '价值',
          label: '价值'
        }, {
          value: '投机',
          label: '投机'
        }],
        orderPlanList:[
        ],
        fromDataTZero:{
          symbol:null,
          plan:null,
          account:null,
          step:null,
          hangPrice:null,
          hangQty:null,
          isCover:null,
        },
        TZeroStockPrice:null, //T+0 股票价格
        tradePlaneTZero: [{   // T+0交易计划类型
          value: 'BUY',
          label: '先买后卖'
        }, {
          value: 'SELL',
          label: '先卖后买'
        }],
        TZeroHoldNumber:0,    // T+0 持仓数量
        doTNumber:0,          // 做T数量
        isCoverOption:[{      // 交易有效期
          value: 1 ,
          label: '是'
        }, {
          value: 0,
          label: '否'
        }],
        orderPlanListTZero:[]
      }
    },
    components: {
    },
    mounted: function () {
      /*获取交易计划*/
      this.findPlan0()
      /*获取交易策略信息*/
      this.getStrategyList()
      /*获取券商列表信息*/
      this.getBrokerList()
      /*获取挂单计划*/
      this.findPlan()
      /*获取T+0交易计划*/
      this.findDayTrade()
    },
    methods: {
      /*获取交易策略信息*/
      getStrategyList(){
        this.$http.get(httpUrl.findStrategyListApi, {
          params: {}
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            console.log(res)
            this.stockStrategy = res.body.data.entities
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },
      /*获取券商列表信息*/
      getBrokerList() {
        this.$http.get(httpUrl.findBrokerApi, {
          params: {}
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            console.log(res)
            this.tradeAccount = res.body.data.entities
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /*获取股票当前价格*/
      getStockPrice(flag) {
        var data = null
        if(flag === 1){
          data = this.fromData.symbol
        }else if(flag === 0){
          data = this.fromDataTZero.symbol
        }else if(flag === 2){
          data = this.fromData0.symbol
        }
        this.$http.get(httpUrl.getStockPriceApi, {
          params: {
            symbol:data
          }
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            console.log(res)
            if(flag === 1) {
              this.stockPrice = res.body.data.price
            }else if(flag === 0){
              this.TZeroStockPrice = res.body.data.price
            }else if(flag === 2){
              this.stockPrice0 = res.body.data.price
            }
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /*获取账户内资金详情*/
      getAccountInfo(flag) {
        console.log('获取账户内资金详情')
        if(flag === 2){
          // 获取交易计划现有金额
          this.getTradeListHoldMoney(flag)
        }else if(flag === 1){
          // 获取挂单计划现有金额
          this.getHoldMoney(flag)
        }else if(flag === 0){
          this.getHoldQty(flag)
        }
      },

      /*获取持仓金额*/
      getTradeListHoldMoney(flag){
        var data = {}
        data.symbol = this.fromData0.symbol
        data.account = this.fromData0.accountId
        this.$http.get(httpUrl.getHoldMoneyApi, {
          params: data
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.holdAmount0 = res.body.data.qty
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /*获取持仓金额*/
      getHoldMoney(flag){
        var data = {}
          data.symbol = this.fromData.symbol
          data.account = this.fromData.account
        this.$http.get(httpUrl.getHoldMoneyApi, {
          params: data
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.holdAmount = res.body.data.qty
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /*获取持仓数量*/
      getHoldQty(flag){
        var data = {}
          data.symbol = this.fromDataTZero.symbol
          data.account = this.fromDataTZero.account
        this.$http.get(httpUrl.getHoldQtyApi, {
          params: data
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.TZeroHoldNumber = res.body.data.qty
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /*提交交易计划订单*/
      submitData0() {
        console.log('提交交易计划订单', this.fromData0)
        var data = this.fromData0
        // 判断是否存在空字符串
        var isExistEmpty = true
        Object.keys(data).forEach(function(x) {
          if(data[x] === null || data[x] === ""){
            isExistEmpty = false;
          }
        });
        if (!isExistEmpty) {
          this.$message({
            message: '请检查订单参数!',
            type: 'warning'
          })
          return false
        }
        this.$http.post(httpUrl.submitAvgPlanApi, data).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.$message({
              message: '提交成功!',
              type: 'success'
            });
            this.reset(2)
            this.findPlan0()
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
          this.$message.error('请求失败');
        });
      },

      /*提交挂单计划订单*/
      submitData() {
        console.log('提交挂单计划订单', this.fromData)
        var data = this.fromData
        data.deadline = this.standardTimeChange(this.fromData.deadline)
        // 判断是否存在空字符串
        var isExistEmpty = true
        Object.keys(data).forEach(function(x) {
          if(data[x] === null || data[x] === ""){
            isExistEmpty = false;
          }
        });
        if (!isExistEmpty) {
          this.$message({
            message: '请检查订单参数!',
            type: 'warning'
          })
          return false
        }
        this.$http.post(httpUrl.submitPlanApi, data).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.$message({
              message: '提交成功!',
              type: 'success'
            });
            this.reset(1)
            this.findPlan()
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
          this.$message.error('请求失败');
        });
      },

      /*获取交易计划列表*/
      findPlan0(){
        this.$http.get(httpUrl.findTradeListApi, {
          params: {}
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.orderPlanList0 = res.body.data.entities
          } else if (res.body.code != 0) {
            this.$message.error(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },
      /*获取挂单交易计划列表*/
      findPlan(){
        this.$http.get(httpUrl.findPlanApi, {
          params: {}
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.orderPlanList = res.body.data.entities
          } else if (res.body.code != 0) {
            this.$message.error(res.body.message)
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

      /*取消交易订单*/
      cancleOrder0(id) {
        console.log('取消订单')
        this.$confirm('是否确定取消该交易记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(httpUrl.cancelAvgPlanApi, {
            params: {
              id:id
            }
          }).then(function (res) {
            console.log(res)
            if (res.body.code == 0) {
              this.findPlan0()
              this.$message({
                message: '提交成功!',
                type: 'success'
              });
            } else if (res.body.code != 0) {
              this.$message.error(res.body.message)
            }
          }, function () {
            console.log("请求失败")
          });
        }).catch(() => {

        });
      },

      /*取消挂单订单*/
      cancleOrder(id) {
        console.log('取消订单')
        this.$confirm('是否确定取消该交易记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(httpUrl.cancelPlanApi, {
            params: {
              planId:id
            }
          }).then(function (res) {
            console.log(res)
            if (res.body.code == 0) {
              this.findPlan()
              this.$message({
                message: '提交成功!',
                type: 'success'
              });
            } else if (res.body.code != 0) {
              this.$message.error(res.body.message)
            }
          }, function () {
            console.log("请求失败")
          });
        }).catch(() => {

        });
      },

      /*提交T0计划*/
      submitDataTZero(){
        console.log('提交交易计划订单', this.fromDataTZero)
        var data = this.fromDataTZero
        // 判断是否存在空字符串
        var isExistEmpty = true
        Object.keys(data).forEach(function(x) {
          if(data[x] === null || data[x] === ""){
            isExistEmpty = false;
          }
        });
        if (!isExistEmpty) {
          this.$message({
            message: '请检查订单参数!',
            type: 'warning'
          })
          return false
        }
        this.$http.post(httpUrl.submitDayTradeApi, data).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.$message({
              message: '提交成功!',
              type: 'success'
            });
            this.reset(0)
            this.findDayTrade()
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
          this.$message.error('请求失败');
        });
      },

      /*获取T+0交易计划列表*/
      findDayTrade(){
        this.$http.get(httpUrl.findDayTradeApi, {
          params: {}
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            this.orderPlanListTZero = res.body.data.entities
          } else if (res.body.code != 0) {
            this.$message.error(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },

      /*取消T+0订单*/
      cancleOrderTZero(id) {
        console.log('取消订单')
        this.$confirm('是否确定取消该交易记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(httpUrl.cancelDayTradeApi, {
            params: {
              id:id
            }
          }).then(function (res) {
            console.log(res)
            if (res.body.code == 0) {
              this.findDayTrade()
              this.$message({
                message: '提交成功!',
                type: 'success'
              });
            } else if (res.body.code != 0) {
              this.$message.error(res.body.message)
            }
          }, function () {
            console.log("请求失败")
          });
        }).catch(() => {

        });
      },

      /*提交订单后清空表单*/
      reset(flag){
        if(flag === 1){
          this.fromData = {
            symbol:null,
              action:null,
              account:null,
              money:null,
              price1:null,
              hangNumber:null,
              step:null,
              type:null,
              deadline:null,
          }
        }else if(flag === 2){
          this.fromData0 = {
            symbol:null,
            action:null,
            accountId:null,
            totalAmount:null,
            strategy:null
          }
        } else {
         this.fromDataTZero = {
            symbol:null,
            plan:null,
            account:null,
            step:null,
            hangPrice:null,
            hangQty:null,
            isCover:null
          }
        }
      }
    },
    computed:{
      amplitude() {
        return (this.fromData.price1 - this.stockPrice)/this.stockPrice*100
      },
      TZeroAmplitude() {
        return (this.fromDataTZero.hangPrice - this.TZeroStockPrice)/this.TZeroStockPrice*100
      },
    },
    watch: {
    },

  }
</script>

<style scoped>
  .orderInfo {
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

  .orderItem {
    margin-bottom: 2rem;
    background: #fff;
    padding-bottom: 20px;
  }

  .orderItem .table-body:last-child .grid-content {
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
    line-height: 2.5rem;
    height: 4rem;
    margin-right: -1px;
  }

  .table-head .one-row {
    padding-top: 10px;
  }

  .table-body .grid-content {
    border-collapse: collapse;
    border: 1px solid #ddd;
    line-height: 2.5rem;
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
  .orderInfo >>> input{
    border:none;
    text-align: center;
    height: 36px;
  }
  .date-picker >>> .el-input{
   width: 100%;
  }
  .tzeroRow >>> .grid-content{
    height: 6rem;
  }
  .tzeroRow >>> .two-row{
    line-height: 4.5rem;
  }
  /*
屏幕兼容(手机)
*/
  @media screen and (max-width: 600px) {
    .data_box3 {
      padding-right: 14%;
      text-align: right;
    }

    .orderInfo .title {
      font-size: 14px;
      font-weight: 700 !important;
    }

    .orderInfo .table-head {
      font-size: 12px;
      font-weight: 700 !important;
    }

    .orderInfo .table-body {
      font-size: 12px;
    }
  }
</style>

