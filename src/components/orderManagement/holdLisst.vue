<template>
  <div class="orderInfo">
    <!-- 持仓股票-->
    <div class="orderItem">
      <el-row class="header">
        <el-col :span="24">
          <div class="grid-content title">持仓股票</div>
        </el-col>
      </el-row>
      <el-row class="table-head">
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">代码</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">金额</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple  one-row">RSI</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple one-row">财报</div>
        </el-col>
      </el-row>
      <el-row v-if="holdList.length !== 0" class="table-body" v-for='(item,index) in  holdList' :key='index'>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>
             {{item.security}}
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <div class="data_box3">
             {{item.amount  | setNum}}
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
          <span>
             {{item.rsi  | setNum}}
          </span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
          <span>
             {{item.date}}
          </span>
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
        holdList:[]
      }
    },
    components: {
    },
    mounted: function () {
      /*查询持仓*/
      this.getHoldingList()
    },
    methods: {
      /*获取交易策略信息*/
      getHoldingList(){
        this.$http.get(httpUrl.findPositionListApi, {
          params: {}
        }).then(function (res) {
          console.log(res)
          if (res.body.code == 0) {
            console.log(res)
            this.holdList = res.body.data.entities
          } else if (res.body.code != 0) {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
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

