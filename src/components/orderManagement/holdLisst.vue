<template>
  <div class="orderInfo">
    <!-- 美股交易时间-->
    <div class="orderItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">美股交易时间</div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple">市场状态</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-select v-model="USAFromData.isClose" placeholder="请选择">
              <el-option
                v-for="item in marketState"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            收盘回补
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-select v-model="USAFromData.closeCovering" placeholder="请选择">
              <el-option
                v-for="item in closeCovering"
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
          <div class="grid-content bg-purple">开盘时间</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-select v-model="USAFromData.openTime" placeholder="请选择">
              <el-option
                v-for="item in openTime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            收盘勾股
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-select v-model="USAFromData.closeGougu" placeholder="请选择">
              <el-option
                v-for="item in closeGougu"
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
          <div class="grid-content bg-purple">收盘时间</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-select v-model="USAFromData.closeTime" placeholder="请选择">
              <el-option
                v-for="item in closeTime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            提交
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light" style="line-height: 4rem;">
            <el-button type="primary" size="mini" @click="confirmEditUSA">确认修改</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 资金策略分配-->
    <div class="orderItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">资金策略分配</div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple" >账户名</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            Tiger
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            账户名
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            Snowball
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple">勾股资金量</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control"  v-model="TigerPlan.total" placeholder="请输入勾股资金量"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            勾股资金量
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control"  v-model="snowballPlan.total" placeholder="请输入勾股资金量"/>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple">股票配额</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <input type="text" class="form-control" v-model="TigerPlan.rate"  placeholder="请输入股票配额"/>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            股票配额
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light" style="line-height: 4rem;">
            <input type="text" class="form-control" v-model="snowballPlan.rate" placeholder="请输入股票配额"/>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="6">
          <div class="grid-content bg-purple">提交</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-button type="primary" size="mini" @click="comfirmTigerPlan">确认修改</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            提交
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light" style="line-height: 4rem;">
            <el-button type="primary" size="mini" @click="comfirmSnowballPlan">确认修改</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 勾股交易计划-->
    <div class="orderItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">勾股交易计划</div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="4">
          <div class="grid-content bg-purple">代码</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">类型</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">交易金额</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">交易账户</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">操作</div>
        </el-col>
      </el-row>
      <el-row class="table-body" v-for='(item,index) in  goStockPlan' :key='index' >
        <el-col :span="4">
          <div class="grid-content bg-purple one-row">{{item.name}}</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            {{item.action}}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple" style="line-height: 4rem">
            <input type="text" class="form-control"  v-model="item.tradeValue" placeholder="请输入勾股资金量"/>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light" v-if="item.broker === 'U10177011'" >
            tiger
          </div>
          <div class="grid-content bg-purple-light" v-else="item.broker === 'U10177011'" >
            tiger
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <el-button type="primary" size="mini" @click="confirmGoStockPlan(item.id,item.tradeValue)">确认修改</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="table-body" >
        <el-col :span="18">
          <div class="grid-content bg-purple">
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" size="mini" @click="resetGoStockPlan">&nbsp&nbsp&nbsp重置&nbsp&nbsp&nbsp</el-button>
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
  import {getCommonData,postCommonData } from '../../apiConfig/filters';
  export default {
    name: "orderList",
    data() {
      var _this = this
      return {
        USAFromData:{
          id: null,
          isClose: null, //0表示开盘,1表示收盘
          openTime: null, //开盘时间
          closeTime: null, //收盘时间
          closeCovering: null, //收盘回补时间
          closeGougu: null //收盘勾股时间
        },
        marketState:[
          {
          value: 0,
          label: '开盘'
        },{
          value: 1,
          label: '收盘'
        },{
          value: 2,
          label: '半开'
        }],
        openTime:[
          {
          value: '21:30',
          label: '21:30'
        },{
          value: '22:30',
          label: '22:30'
        }],
        closeTime:[
          {
          value: '04:00',
          label: '04:00'
        },{
          value: '03:00',
          label: '03:00'
        },{
          value: '01:00',
          label: '01:00'
        },{
          value: '00:00',
          label: '00:00'
        }],
        closeCovering:[
          {
          value: 59,
          label: ':59'
        },{
          value: 58,
          label: ':58'
        },{
          value: 57,
          label: ':57'
        },{
          value: 56,
          label: ':56'
        },{
          value: 55,
          label: ':55'
        }],
        closeGougu:[
          {
          value: 59,
          label: ':59'
        },{
          value: 58,
          label: ':58'
        },{
          value: 57,
          label: ':57'
        },{
          value: 56,
          label: ':56'
        },{
          value: 55,
          label: ':55'
        }],
        TigerPlan: {
          id: null,  //主键,前端页面不需要此字段
          broker: "U10177011", //账户表示,传递用
          brokerName: "tiger", //账户名称,显示用
          total: null, //勾股资金量
          rate: null //股票配额
        },
        snowballPlan: {
          id: null,  //主键,前端页面不需要此字段
          broker: "U10177011", //账户表示,传递用
          brokerName: "tiger", //账户名称,显示用
          total: null, //勾股资金量
          rate: null //股票配额
        },
        goStockPlan:[]
      }
    },
    components: {
    },
    mounted: function () {
      /*查询美股交易时间信息*/
      this.getUSAInfpData()
      /*获取老虎资金策略分配*/
      this.getPlanInfpData({broker:'U10177011 '},1)
      /*获取雪盈资金策略分配*/
      this.getPlanInfpData({broker:'U9626351  '},2)
      /*勾股交易计划*/
      this.getGoStockPlay()
    },
    methods: {
      /*查询美股交易时间信息*/
      getUSAInfpData(){
        var param = {}
        var url = httpUrl.getMarketInfoAPi
        getCommonData(this,param,url).then(res => {
          this.USAFromData = res.data.data.entity
        })
      },
      /*确认修改美股交易时间信息*/
      confirmEditUSA(){
        var param = {...this.USAFromData}
        var url = httpUrl.updateMarketInfoAPi
        postCommonData(this,param,url).then(res => {
          if( res.data.code=== 0){
            this.USAFromData = res.data.data.entity
            this.$message({
              message: '修改成功!',
              type: 'success'
            });
          } else {
            this.$message.error(this.data.message);
          }
        })
      },
      /*查询略执行的资金信息*/
      getPlanInfpData(param,flag){
        var url = httpUrl.getGoStockAccount
        getCommonData(this,param,url).then(res => {
          if(flag === 1){
            this.TigerPlan = res.data.data.entity
          }else{
            this.snowballPlan = res.data.data.entity
          }
        })
      },
      /*确认修改老虎策略执行的资金信息*/
      comfirmTigerPlan(){
        var param = {...this.TigerPlan}
        var url = httpUrl.updateGoStockAccount
        postCommonData(this,param,url).then(res => {
          if( res.data.code=== 0){
            this.TigerPlan = res.data.data.entity
            this.$message({
              message: '修改成功!',
              type: 'success'
            });
          } else {
            this.$message.error(this.data.message);
          }
        })
      },
      /*确认修改雪盈策略执行的资金信息*/
      comfirmSnowballPlan(){
        var param = {...this.snowballPlan}
        var url = httpUrl.updateGoStockAccount
        postCommonData(this,param,url).then(res => {
          if( res.data.code=== 0){
            this.snowballPlan = res.data.data.entity
            this.$message({
              message: '修改成功!',
              type: 'success'
            });
          } else {
            this.$message.error(this.data.message);
          }
        })
      },
      /*获取勾股交易计划*/
      getGoStockPlay(){
        var param = {}
        var url = httpUrl.findGoStockPlan
        getCommonData(this,param,url).then(res => {
          this.goStockPlan = res.data.data.entities
        })
      },
      /*获取更新交易计划*/
      confirmGoStockPlan(id,tradeValue){
        var param = {
          id:id,
          tradeValue:tradeValue
        }
        var url = httpUrl.updateGoStockPlan
        getCommonData(this,param,url).then(res => {
          this.goStockPlan = res.data.data.entities
        })
      },
      resetGoStockPlan(){
        var param = {}
        var url = httpUrl.resetGoStockPlan
        this.$confirm('是否确认重置', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getCommonData(this,param,url).then(res => {
            this.goStockPlan = res.data.data.entities
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
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
    line-height: 4rem;
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

