<template>
  <div class="investorRelationBox">
    <div class="investorRelation">
      <div class="investorRelationContent">
        <div class="investorRelationTitle">
          <h3>投资人表</h3>
        </div>
        <div class="row-fluid">
          <div class="span12">
            <div class="list">
              <template>
                <div >
                  <table  class="table table-striped table-bordered table-advance diagnosticStockInfoTb3" contenteditable="false">
                    <thead>
                    <tr class="investorRelationTr">
                      <th>
                        姓名
                      </th>
                      <th>
                        总股份数
                      </th>
                      <th>
                        投入总金额
                      </th>
                    </tr>
                    </thead>
                    <tbody v-if="investorList.length>0" >
                    <tr v-for="(item,index) in  investorList">
                      <td class="app_td" @click="showDetail(item.name)">
                        <u> {{item.name}}</u>
                      </td>
                      <td>
                        <div class="data_box2">
                          {{item.share|setNum}}
                        </div>
                      </td>
                      <td>
                        <div class="data_box2">
                          {{item.amount|setNum}}
                        </div>
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
    <div class="investorRelation">
      <div v-if="name!=''" class="investorRelationContent">
        <div class="investorRelationTitle">
          <h3>{{name}}详情</h3>
        </div>
        <div class="row-fluid">
          <div class="span12">
            <div class="list">
              <template>
                <div >
                  <table  class="table table-striped table-bordered table-advance diagnosticStockInfoTb3" contenteditable="false">
                    <thead>
                    <tr class="investorDetailTr">
                      <th>
                        日期
                      </th>
                      <th>
                        类型
                      </th>
                      <th>
                        股份数
                      </th>
                      <th>
                        金额
                      </th>
                      <th>
                        备注
                      </th>
                    </tr>
                    </thead>
                    <tbody v-if="investorDetailList.length>0" >
                    <tr v-for="(item,index) in  investorDetailList">
                      <td >
                        {{item.date}}
                      </td>
                      <td :class="{Red:item.type=='投资'}">
                        {{item.type}}
                      </td>
                      <td>
                        <div class="data_box2">
                          {{item.share|setNum}}
                        </div>
                      </td>
                      <td>
                        <div class="data_box2">
                          {{item.amount|setNum}}
                        </div>
                      </td>
                      <td>
                        {{item.remark}}
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
  </div>
</template>

<script>
  import {httpUrl} from '../apiConfig/api';
  export default {
        name: "investorRelation",
        data(){
          return {
            investorList:"",
            investorDetailList:"",
            name:""
          }
        },
        mounted: function () {
          this.getInvestorList()
        },
        methods:{
          /*获取投资人列表*/
          getInvestorList(){
            this.$http.get(httpUrl.getInvestorListApi).then(function(res){
              console.log(res)
              if(res.body.code==0){
                this.investorList=res.body.data.entities;
              }else{
                alert(res.body.message)
              }
            },function(){
              console.log("请求失败")
            });
          },

          showDetail(name){
            this.name=name;
            this.$http.get(httpUrl.getInvestorDetailApi,{
              params: {name:this.name}
              }).then(function(res){
              console.log(res)
              if(res.body.code==0){
                this.investorDetailList=res.body.data.entities;
              }else{
                alert(res.body.message)
              }
            },function(){
              console.log("请求失败")
            });
          }
        }
    }
</script>

<style  scoped>
  .investorRelation{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 2rem 2% 3rem 2%;
  }
  .investorRelationContent{
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    width: 96%;
    margin: 0 2%;
    margin-top: 20px;
    background: #ffffff;
    overflow: auto;
  }
  .investorRelationTitle>h3{
    height: 3rem;
    text-align: center;
    border-bottom: 1px solid #EEF1F5;
  }
  .investorRelationTr th{
    text-align: center;
    width:33.3%;
  }
  .investorDetailTr th{
    width:20%;
    text-align: center;

  }
  .data_box2{
    padding-right:40%;
    text-align: right;
  }
  .app_td{
    width: 20%;
    color: rgb(2, 117, 216);
    cursor: pointer;
  }
  @media screen and (max-width:600px)
  {
    .data_box2{
      padding-right:20%;
      text-align: right;
    }
  }
</style>
