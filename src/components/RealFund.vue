<template>
  <div class="RealFundContent">
    <div class="index_contrast">
      <fund-contrast :heading="heading" @filterIndexCurImg="filterIndexCurImg($event)" :GainInfo="GainInfo"
                     :select="curTime"></fund-contrast>
    </div>

    <div class="price-table3">
      <div class="price-tableInfo3">
        <div class="price-tableHead3">
          <h3>{{title}}详情</h3>
        </div>
        <div class="row-fluid">
          <div class="span12">
            <div class="list">
              <template>
                <div>
                  <table id="scoreRange" class="table table-striped table-bordered table-advance price-tableInfoTb3"
                         contenteditable="false">
                    <thead>
                    <tr class="price-tableTbTh3 specTable">
                      <th style="width:25%;">
                        日期
                      </th>
                      <th style="width: 30%">
                        总资产
                      </th>
                      <th style="width: 20%">
                        当前净值
                      </th>
                      <th style="width: 25%">
                        周收益率
                      </th>
                    </tr>
                    </thead>
                    <tbody v-if="items.length>0">
                    <tr v-for="(item,index) in  items">
                      <td class="app_td">
                        {{item.date}}
                      </td>
                      <td>
                        <div class="data_box2">
                          {{item.marketCap|setNum}}
                        </div>
                      </td>
                      <td>
                        <div class="data_box3">
                          {{item.netWorth | toFixed4}}
                        </div>
                      </td>
                      <td :class="{Green:item.weekRate<0,Red:item.weekRate>=0}">
                        {{item.weekRate *100 |toFixed2}}
                        <span v-if="item.weekRate!=null">%</span>
                      </td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr>
                      <td colspan="9">暂无数据
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <pagination :perPages="perPages" :page-index="currentPage" :total="count" :page-size="pageSize"
                            @change="pageChange">
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
  import FundContrast from './fundContrast';
  import IndexContrast from './IndexContrast';
  import Pagination from "./Pagination"
  import {httpUrl} from '../apiConfig/api';

  export default {
    name: "RealFund",
    components: {
      Pagination,
      FundContrast
    },
    data() {
      return {
        heading: sessionStorage.getItem("fundName") + '盈亏率对比',
        perPages: 1,
        pageSize: 20, //每页显示20条数据
        currentPage: 1, //当前页码
        count: 0, //总记录数
        title: sessionStorage.getItem("fundName"),
        items: [],
        GainInfo: {},
        curTime: "-1",
      }
    },
    mounted() {
      this.fundListDeatial();
      this.getGainInfo();
    },
    methods: {
      /**
       * 从page组件传递过来的当前page
       */
      pageChange(page) {
        this.currentPage = page;
        this.fundListDeatial();
      },

      fundListDeatial() {
        this.$http.get(httpUrl.getFundListDetailApi, {
          params: {
            pageSize: this.pageSize,
            pageNo: this.currentPage,
            name: sessionStorage.getItem("fundName")
          }
        }).then(function (res) {
          if (res.body.code == 0) {
            console.log(res)
            this.count = res.body.data.entity.total;
            this.items = res.body.data.entity.list;
          } else {
            alert(res.body.message)
          }
        }, function () {
          console.log("请求失败")
        });
      },


      filterIndexCurImg(obj) {
        console.log(obj)
        this.curTime = obj.id;
        this.getGainInfo();
      },

      getGainInfo: function () {
        this.$http.get(httpUrl.getFundListLineApi, {
          params: {name: sessionStorage.getItem("fundName")}
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

    },

  }
</script>

<style scoped>
  *
  .price-table1 {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }

  .price-table-head-box {
    margin: 0 2%;
    width: 96%;
  }

  .metarilImg {
    max-width: 100%;
  }

  .price-table2 {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }

  .head-content {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }

  .price-table3 {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }

  .price-table4 {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }

  .price-tableHead1 {
    padding-top: 1rem;
    margin-top: 20px;
  }

  .price-tableHead2 {
    padding-top: 1rem;
    margin-top: 20px;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
  }

  .price-tableHead3 {
    padding-top: 1rem;
    margin-top: 20px;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
  }

  .price-tableHead4 {
    padding-top: 1rem;
    margin-top: 20px;
    border-bottom: 1px solid #eef1f5;
    margin-bottom: 10px;
  }

  .price-tableHead1 > h3 {
    height: 3rem;
    text-align: center;
  }

  .price-tableHead2 > h3 {
    height: 3rem;
    text-align: center;
  }

  .price-tableHead3 > h3 {
    height: 3rem;
    text-align: center;
  }

  .price-tableHead4 > h3 {
    height: 3rem;
    text-align: center;
  }

  .price-tableInfo1 {
    width: 96%;
    margin: 0 2%;
  }

  .price-tableInfo1_1 {
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }

  .price-tableInfo1_1_1 {
    float: left;
    margin-top: 50px;
  }

  .price-tableInfo1_2 {
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }

  .price-tableInfo2 {
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }

  .price-tableInfo3 {
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }

  .price-tableInfo4 {
    padding-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
  }

  .price-tableBar {
    margin-top: 10px;
  }

  .price-tableBar input {
    width: 45%;
    height: 30px;
  }

  .theComment1 {
    margin-top: 5px;
    line-height: 25px;
  }

  .theComment2 {
    padding-bottom: 5px;
  }

  .price-tableInfoTb1 {
    border: none;
  }

  .price-tableInfoTb1 th {
    width: 50%;
    text-align: left;
  }

  .price-tableTbTh2 th {
    text-align: center;
  }

  .price-tableTbTh3 th {
    text-align: center;
  }

  .theFirstColumn {

    width: 15%;
    max-width: 300px;
    /*background: #fff url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=) no-repeat 100% center;*/
  }

  .tb_project {
    margin-left: 40%;
  }

  .tb_years {
  }

  .right_col {
    text-align: left;
  }

  .left_col {
    text-align: left;
  }

  .companyCodeAndName {
    font-size: large;
  }

  .score {
    font-size: xx-large;
    font-weight: 700;
  }

  .left_content {
    float: left;
    width: 30%;
    margin-left: 15%;
  }

  .left_content td {
    border: none;
  }

  .left_content th {
    border: none;
  }

  .right_content {
    float: left;
    width: 45%;
    margin-left: 5%;
    margin-top: 20px;
  }

  .right_content td {
    border: none;
  }

  .right_content th {
    border: none;
  }

  .left_content_operate {
    width: 47%;
    float: left;
  }

  .right_content_finance {
    width: 49%;
    text-align: center;
    float: right;
  }

  .operate_finance {
    float: left;
    width: 100%;
  }

  .theScore {
    float: left;
    margin-left: 15%;
    background: #e0e0e0;
  }

  .fiveYearsFD th {
    text-align: center;
  }

  .left_content_operate table > tbody > tr > td {
    border: none;
    padding-left: 30%;
  }

  .left_content_operate table > tbody > tr > th {
    border: none;
    padding-left: 30%;
  }

  .right_content_finance table > tbody > tr > td {
    border: none;
    padding-left: 30%;
  }

  .right_content_finance table > tbody > tr > th {
    border: none;
    padding-left: 30%;
  }

  .streatText {
    font-weight: bolder;
    font-size: 32px;
  }

  .streatText2 {
    font-weight: bolder;
    font-size: 24px;
  }

  .streatText3 {
    font-weight: bolder;
    font-size: 22px;
  }

  .data_box2 {
    padding-right: 40%;
    text-align: right;
  }

  .data_box3 {
    padding-right: 40%;
    text-align: right;
  }

  .form-search {
    display: flex;
    justify-content: center;
  }

  .form-search input {
    margin-right: 5px;
    height: 34px;
  }

  .form-search button {
    margin-right: 5px;
  }

  .head_td_app {
    display: none;
  }

  .isActive {
    color: #3D77E1;
  }

  .optStyle {
    cursor: pointer;
  }

  .asc {
    display: inline-block;
    position: absolute;
    margin-top: 5px;
    margin-left: -20px;
  }

  /*
 屏幕兼容(平板)
  */
  @media screen and (min-width: 600px) and (max-width: 900px) {
    .head_td_app {
      display: none;
    }
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
    .data_box3 {
      padding-right: 20%;
      text-align: right;
    }

    .head_td_pc {
      display: none;
    }

    .head_td_app {
      display: block;
      font-size: 12px;
    }

    .theFirstColumn {
      width: 70px !important;
      max-width: 70px !important;
    }

    .price-table1 {
      width: 100%;
      margin-left: 0px;
    }

    .price-table2 {
      width: 100%;
      margin-left: 0px;
    }

    .price-table3 {
      width: 100%;
      margin-left: 0px;
    }

    .price-table4 {
      width: 100%;
      margin-left: 0px;
    }

    .price-tableBar {
      font-size: 1rem;
      float: left;
      margin-bottom: 15px;
      width: 100%;
      text-align: left;
    }

    .price-tableBar input {
      width: 85%;
    }

    .theComment1 p {
      text-align: left;
    }

    .theComment2 {
      margin-left: 2%;
    }

    .theComment2 p {
      text-align: left;
    }

    .price-tableInfoTb1 {
      border: none;
    }

    .price-tableInfoTb1 th {
      border: none;
    }

    .price-tableInfoTb1 td {
      border: none;
      text-align: left;
    }

    .left_col {
      border-right: 2px solid #ddd !important;
    }

    .right_col {
      text-align: left;
    }

    .tb_project {
      margin-left: -10%;
    }

    .tb_years {
      margin-left: 30%;
    }

    .tb_tb_tr th {
      font-size: 2px;
      padding: 1px;
      width: 70px !important;
    }

    .data_box2 {
      padding-right: 0%;
      text-align: center;
    }

    .mb-td {
      padding: 0px;
    }

    .mb-th {
      width: 70px !important;
    }

    .list-flex {
      display: flex;
      flex-direction: row;
    }

    .left_content_operate table > tbody > tr > th {
      border: none;
      padding-left: 0%;
    }

    .left_content_operate {
      width: 100%;
      float: left;
    }

    .right_content_finance table > tbody > tr > th {
      border: none;
      padding-left: 0%;
    }

    .right_content_finance table > tbody > tr > td {
      border: none;
      padding-left: 0%;
    }

    .right_content_finance {
      width: 100%;
      float: left;
    }

    .streatText2 {
      font-weight: bolder;
      font-size: 20px;
    }

    .left_content_operate table > tbody > tr > td {
      border: none;
      padding-left: 0%;
    }

    .table-bordered {
      border: 0px solid #fff;
    }

    .table > thead:first-child > tr:first-child > th {
      border-top: 1px solid #ddd !important;
    }

    .left_col {
      border-right: 0px solid #ddd !important;
    }

    .title-app {
      font-size: 12px !important;
    }

    #selfStock > thead > tr > th {
      font-size: 12px !important;
    }

    #scoreRange > thead > tr > th {
      font-size: 12px !important;
    }
  }
</style>
