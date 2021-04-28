<template>
  <div class="orderInfo">
    <!-- 交易计划-->
    <div class="orderItem holdStocks">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">关注股票</div>
        </el-col>
      </el-row>
      <div class="focusStockBar">
        <form class="form-search">
          <input type="text" class="form-control" v-on:keyup.enter="addFocus" placeholder="输入股票代码"
                 v-model="focusSymbol"/>
          <button type="button" class="btn btn-default" @click="addFocus()">添加关注</button>
          <button type="button" class="btn btn-default" @click="resetFocus()">重置数据</button>
        </form>
      </div>
      <el-row class="table-head">
        <el-col :span="4">
          <div class="grid-content bg-purple"><span>股票名称<br/>财报</span></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"><span>持仓金额<br/>最大回撤</span></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"><span>PEG<br/>RSI</span></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"><span>现价<br/>最高价</span></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple  one-row">操作</div>
        </el-col>
      </el-row>
      <el-row v-if="holdList.length !== 0" class="table-body" v-for='(item,index) in  holdList' :key='index'>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>
              <a v-if="item.exchange === 'us'" >{{item.name}}</a><br v-if="item.exchange === 'us'"/>
              <a v-if="item.exchange === 'hk'" style="color: #4e6ef2!important">{{item.name}}</a><br v-if="item.exchange === 'hk'"/>
              <a v-if="item.exchange === 'cn'" style="color: #e10602!important">{{item.name}}</a><br v-if="item.exchange === 'cn'"/>
              <a >{{item.financialDate}}</a>
            </span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="data_box3">
              <a >{{item.holdMoney  | setNum}}</a><br/>
              <a :class="{Red:item.maxDown < -0.25 || item.maxDown > 0.25}"> {{item.maxDown*100  | setNum}}%</a>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="data_box3">
              <a :class="{Red:item.peg < 1.2}">{{item.peg  | setNum}}</a><br/>
              <a > {{item.rsi  | setNum}}</a>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <div class="data_box3">
              <a >{{item.price  | setNum}}</a><br/>
              <a> {{item.high  | setNum}}</a>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <a class="opreatBtn" @click="addTPlusZeroOrder(item.symbol)">T</a>
            <a class="opreatBtn" @click="addDayPlanOrder(item.symbol)">日</a>
            <a class="opreatBtn" @click="hangOrder(item.symbol)">挂</a>
            <a class="opreatBtn" @click="deleteFocus(item.id)">删</a>
<!--          <span>-->

<!--             <el-button type="primary" size="mini" @click="addTPlusZeroOrder(item.symbol)">T</el-button>-->
<!--             <el-button type="primary" size="mini" @click="addDayPlanOrder(item.symbol)">日</el-button>-->
<!--             <el-button type="primary" size="mini" @click="hangOrder(item.symbol)">挂</el-button>-->
<!--             <el-button type="primary" size="mini" @click="deleteFocus(item.id)">删</el-button>-->
<!--          </span>-->
          </div>
        </el-col>
      </el-row>
      <el-row  v-if="holdList.length === 0" class="table-body" >
        <el-col :span="24">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            暂无数据
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- T+0弹出框-->
    <el-dialog title="T+0列表" :visible.sync="dialogTPlusZeroVisible" :before-close="handleClose">
      <div class="orderItem">
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">股票代码/价格</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content  bg-purple" style="line-height: 4rem">
              {{fromDataTZero.symbol}}
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
            </div>
          </el-col>
        </el-row>
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">账户/持仓</div>
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
          <el-col :span="9">
            <div class="grid-content bg-purple-light" style="line-height: 4rem">
              {{TZeroHoldNumber | setNum}}
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
    </el-dialog>
    <!-- T+0弹出框-->

    <!-- 日计划弹出框-->
    <el-dialog title="日计划列表" :visible.sync="dialogDayPlanVisible"  :before-close="handleClose">
      <div class="orderItem">
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">股票代码/价格</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content  bg-purple" style="line-height: 4rem">
              {{fromData0.symbol}}
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
            <div class="grid-content bg-purple one-row">账户/持仓</div>
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
          <el-col :span="9">
            <div class="grid-content bg-purple" style="line-height: 4rem">
              {{holdAmount0}}
            </div>
          </el-col>
        </el-row>

        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">挂单量</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light" style="line-height: 4rem">
              <input type="text" class="form-control" placeholder="挂单量"
                     v-model="fromData0.totalAmount"/>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple" style="line-height: 4rem">
              {{tradeAmount0 |  setNum}}
            </div>
          </el-col>
        </el-row>
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">策略</div>
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
            </div>
          </el-col>
        </el-row>
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">计划</div>
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
            </div>
          </el-col>
        </el-row>
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">确认</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light" style="line-height: 4rem;">
              <el-button type="primary" size="mini" @click="submitData0">提交订单</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <!-- 日计划弹出框-->

    <!-- 挂单计划弹出框-->
    <el-dialog title="挂单计划" :visible.sync="dialogHangOrderVisible" :before-close="handleClose" >
      <div class="orderItem">
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">股票代码</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content  bg-purple" style="line-height: 4rem">
              {{fromData.symbol}}
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
            <div class="grid-content bg-purple one-row">账户/持仓</div>
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
          <el-col :span="9">
            <div class="grid-content bg-purple" style="line-height: 4rem">
              {{holdAmount |  setNum}}
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
            </div>
          </el-col>
        </el-row>
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">挂单量</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light" style="line-height: 4rem">
              <input type="text" class="form-control" placeholder="挂单量"
                     v-model="fromData.number"/>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple" style="line-height: 4rem">
              {{tradeAmount |  setNum}}
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
            <div class="grid-content bg-purple one-row">挂单数</div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple-light">
              <input type="text" class="form-control"  placeholder="委托数量"
                     v-model="fromData.hangNumber"/>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">
            </div>
          </el-col>
        </el-row>
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">步长</div>
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
          <el-col :span="9">
            <div class="grid-content bg-purple-light">
            </div>
          </el-col>
        </el-row>
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">类型</div>
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
            </div>
          </el-col>
        </el-row>
        <el-row class="table-body" >
          <el-col :span="6">
            <div class="grid-content bg-purple one-row">有效期</div>
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
          <el-col :span="9">
            <div class="grid-content bg-purple-light">
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
    </el-dialog>
    <!-- 挂单计划弹出框-->

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

    <!-- 日计划列表-->
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

  </div>
</template>

<script>
  import Pagination from "../Pagination"
  import IndexContrast from '../IndexContrast1';
  import {httpUrl} from '../../apiConfig/api';
  import {getCommonData} from '../../apiConfig/filters';
  export default {
    name: "orderList",
    data() {
      var _this = this
      return {
        focusSymbol:null,
        // 交易计划
        holdList:[],
        /*查询持仓*/
        dialogTPlusZeroVisible:false,
        dialogDayPlanVisible:false,
        dialogHangOrderVisible:false,
        holdAmount0:null, // 交易计划持仓金额
        holdAmount:null, // 交易计划持仓金额
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
          number:null,
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
        tradeAccount: [],   // 挂单账户列表
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
      /*查询持仓*/
      this.getHoldingList()
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
      /*添加T+0的交易计划*/
      addTPlusZeroOrder(symbol){
        this.dialogTPlusZeroVisible = true
        this.fromDataTZero.symbol = symbol
        this.getStockPrice(0)
      },
      /*添加日计划交易计划*/
      addDayPlanOrder(symbol){
        this.dialogDayPlanVisible = true
        this.fromData0.symbol = symbol
        this.getStockPrice(2)
      },
      /*添加挂单计划*/
      hangOrder(symbol){
        this.dialogHangOrderVisible = true
        this.fromData.symbol = symbol
        this.getStockPrice(1)
      },
      /*删除关注股票*/
      deleteFocus(id){
        var param = {id :id}
        var url = httpUrl.deleteFocusApi
        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getCommonData(this,param,url).then(res => {
            this.holdList = res.data.data.entities
          })
        }).catch(() => {

        });
      },
      /*添加关注股票*/
      addFocus(){
        var param = {symbol : this.focusSymbol}
        var url = httpUrl.addFocusApi
        getCommonData(this,param,url).then(res => {
          if( res.data.code=== 0){
            this.holdList = res.data.data.entities
            this.$message({
              message: '添加关注成功!',
              type: 'success'
            });
          } else {
            this.$message.error(this.data.message);
          }
        })
      },
      /*添加关注股票*/
      resetFocus(){
        var param = {}
        var url = httpUrl.updataFocusApi
        this.$confirm('此操作较为耗时,请谨慎选择', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getCommonData(this,param,url).then(res => {
            this.holdList = res.data.data.entities
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
      /*获取交易策略信息*/
      getHoldingList(){
        this.$http.get(httpUrl.findPositionListApi, {
          params: {}
        }).then(function (res) {
          if (res.body.code == 0) {
            this.holdList = res.body.data.entities
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },
      /*获取交易策略信息*/
      getStrategyList(){
        this.$http.get(httpUrl.findStrategyListApi, {
          params: {}
        }).then(function (res) {
          if (res.body.code == 0) {
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
          if (res.body.code == 0) {
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
          if (res.body.code == 0) {
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
        this.$http.get(httpUrl.getHoldQtyApi, {
          params: data
        }).then(function (res) {
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
        this.$http.get(httpUrl.getHoldQtyApi, {
          params: data
        }).then(function (res) {
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
        var data = this.fromData0
        data.money = (this.stockPrice0 * this.fromData0.totalAmount)
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
          if (res.body.code == 0) {
            this.$message({
              message: '提交成功!',
              type: 'success'
            });
            this.reset(2,this.fromData0.symbol)
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
        var data = this.fromData
        data.money = this.stockPrice * this.fromData.number
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
          if (res.body.code == 0) {
            this.$message({
              message: '提交成功!',
              type: 'success'
            });
            this.reset(1,this.fromData.symbol)
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
          if (res.body.code == 0) {
            this.$message({
              message: '提交成功!',
              type: 'success'
            });
            this.reset(0,this.fromDataTZero.symbol)
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
      reset(flag,symbol){
        if(flag === 1){
          this.fromData = {
              symbol:symbol,
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
            symbol:symbol,
            action:null,
            accountId:null,
            totalAmount:null,
            strategy:null
          }
        } else {
          this.TZeroHoldNumber = null
         this.fromDataTZero = {
            symbol:symbol,
            plan:null,
            account:null,
            step:null,
            hangPrice:null,
            hangQty:null,
            isCover:null
          }
        }
      },
      handleClose(){
        var symbol = ''
        var flag = ''
        if(this.dialogTPlusZeroVisible){
          symbol = this.fromDataTZero.symbol
          flag = 0
          this.reset(flag,symbol)
          this.dialogTPlusZeroVisible = false
        }else if(this.dialogHangOrderVisible) {
          symbol = this.fromData.symbol
          flag = 1
          this.reset(flag,symbol)
          this.dialogHangOrderVisible = false
        }else if(this.dialogDayPlanVisible) {
          symbol = this.fromData0.symbol
          flag = 2
          this.reset(flag,symbol)
          this.dialogDayPlanVisible = false
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
      tradeAmount0() {
        return this.stockPrice0 * this.fromData0.totalAmount
      },
      tradeAmount() {
        return this.stockPrice * this.fromData.number
      }
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
  .holdStocks .table-body .grid-content{
    line-height: 2rem;
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
  .focusStockBar{
    margin-top: 10px;
  }
  .form-search {
    display: flex;
    justify-content: center;
  }
  .form-search button {
    margin-right: 5px;
  }
  .form-search input {
    margin-right: 5px;
    height: 34px;
    border:1px solid #ccc;
  }
  .focusStockBar input {
    width: 45%;
    height: 36px;
  }
.opreatBtn{
    padding: 0 6px;
    line-height: 4rem;
    color: #337ab7!important;
    text-decoration: underline;
    cursor: pointer;
}
  /*
屏幕兼容(手机)
*/
  @media screen and (max-width: 600px) {
    .orderInfo >>> .el-dialog{
      width: 100%;
    }
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

