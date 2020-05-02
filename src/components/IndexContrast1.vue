<template>
  <div id="indexContrastContent" class="indexContrastComponents1">
    <div class="indexContrastRow">
      <div class="indexContrastHeader">
        <h3>{{heading}}</h3>
      </div>
      <div class="row-fluid">
        <div class="span6">
          <div class="" style="">
            <div  :style="{height:height,width:width}" ref="myEchart1"></div>
          </div>
        </div>
        <div class="clear"></div>

      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {httpUrl} from '../apiConfig/api'
  export default {
    name: "index-contrast",
    props: {
      GainInfo:{
        type:Object,
        required:true
      },
      heading:{
        type: String,
        default: ""
      },
      width: {
        type: String,
        default: (window.width*90)+"%"
      },
      height: {
        type: String,
        default: 400+"px"
      },
      title:{
        type:Array,
        required:true
      },
      series:{
        type:Array,
        required:true
      },
    },
    data(){
      return{
      }
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.myEchart1, 'macarons');
        // 把配置和数据放这里
        this.chart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          /*  color: ['blue', 'red','#5AB1EF','black'],*/
          legend: {
            x: 'center',
            data:this.title
          },
          toolbox: {
            show: false,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            axisTick: {
              show: false
            },
            type: 'category',
            boundaryGap: false,
            data:this.GainInfo.date
          },
          yAxis: {
            type: 'value',
            min: this.min,
            max:this.max,
            axisLabel:{
              formatter:'{value}%'
            }
          },
          series: this.series
        })

      },
      changeCurImg(e) {
        var obj={};
        obj.id=e;
        obj.index=this.index;
        console.log(e)
        console.log(this.index)
        this.$emit('filterIndexCurImg', obj)
      }
    },
    watch:{
      GainInfo:function(){
        this.initChart();
      }
    }
  }
</script>


<style>

  *
  #indexContrastContent{
    background: #ffffff;
  }
  .indexContrastComponents1{
    margin-top: 2rem;
    /* width: 80%; */
    /*padding: 20px 0;*/
    padding-bottom: 20px;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  .indexContrastRow{
    width: 96%;
    height: auto;
    background: #ffffff;
    margin:0 2%;
  }
  .indexContrastHeader{
    width: 96%;
    border-bottom: 1px solid #EEF1F5;
    margin: 0 2%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .btn-group{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  button{
    background-color: #ffffff;
  }
  .activeBtn{
    background-color: #0275d8;
    color: #fff;
    position: relative;
    z-index: 1;
    border-color: #0275d8;
  }

  /*
 屏幕兼容(手机)
  */
  @media screen and (max-width:600px){
    .indexContrastComponents1{
      /*margin-left: 2%;*/
      /*width: 96%;*/
      margin-left: 0px;
      width: 100%;
      /*padding: 20px 0;*/
      padding-bottom: 20px;
    }
    h1, h2 {
      font-weight: normal;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    .indexContrastRow{
      width: 96%;
      height: auto;
      background: #ffffff;
      margin:0 2%;
    }
    .indexContrastHeader{
      width: 96%;
      border-bottom: 1px solid #EEF1F5;
      margin: 0 2%;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .btn-group{
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
    }
    button{
      background-color: #ffffff;
    }
    .activeBtn{
      background-color: #0275d8;
      color: #fff;
      position: relative;
      z-index: 1;
      border-color: #0275d8;
    }

  }
</style>

