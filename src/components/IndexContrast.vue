<template>
  <div id="indexContrastContent" class="indexContrastComponents">
    <div class="indexContrastRow">
      <div class="indexContrastHeader">
        <h3>{{heading}}</h3>
      </div>
      <div class="row-fluid">
        <div class="span6">
          <div class="" style="">
            <div :style="{height:height,width:width}" ref="myEchart1"></div>
          </div>
        </div>
        <div class="clear"></div>

      </div>
      <div class="btn-group" role="group" style="margin-bottom: 20px;display: flex;padding-bottom: 2rem;">
        <button style="color: #fff;background-color: #0275d8;" v-for="btn in dataArray" @click="changeCurImg(btn.id)"
                type="button" class="btn btn-default" :class="btn.id==select ? 'activeBtn':''">{{btn.time}}
        </button>
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
      GainInfo: {
        type: Object,
        required: true
      },
      heading: {
        type: String,
        default: ""
      },
      width: {
        type: String,
        default: (window.width * 90) + "%"
      },
      height: {
        type: String,
        default: 400 + "px"
      },
      select: String
    },
    data() {
      return {
        dataArray: [
          {
            id: '7',
            time: "近一周"
          }, {
            id: '30',
            time: "近一月"
          }, {
            id: '90',
            time: "近一季"
          }, {
            id: '0',
            time: "今年"
          }, {
            id: '-1',
            time: "上线"
          }
        ]
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
            data: ['勾股指数', '上证指数', '创业板指', '沪深300指']
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
            data: this.GainInfo.time
          },
          yAxis: {
            type: 'value',
            min: this.min,
            max: this.max,
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [
            {
              symbol: "none",
              name: '勾股指数',
              type: 'line',
              data: this.GainInfo.stockGain,
            },
            {
              symbol: "none",
              name: '上证指数',
              type: 'line',
              data: this.GainInfo.szGain,
            },
            {
              symbol: "none",
              name: '创业板指',
              type: 'line',
              data: this.GainInfo.cybGain,
            },
            {
              symbol: "none",
              name: '沪深300指',
              type: 'line',
              data: this.GainInfo.hsGain,
            }
          ]
        })

      },
      changeCurImg(e) {
        var obj = {};
        obj.id = e;
        obj.index = this.index;
        console.log(e)
        console.log(this.index)
        this.$emit('filterIndexCurImg', obj)
      }
    },
    watch: {
      GainInfo: function () {
        this.initChart();
      }
    }
  }
</script>


<style>

  *
  #indexContrastContent {
    background: #ffffff;
  }

  .indexContrastComponents {
    margin-top: 2rem;
    margin-left: 2%;
    /* width: 80%; */
    width: 96%;
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

  .indexContrastRow {
    width: 96%;
    height: auto;
    background: #ffffff;
    margin: 0 2%;
  }

  .indexContrastHeader {
    width: 96%;
    border-bottom: 1px solid #EEF1F5;
    margin: 0 2%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .btn-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  button {
    background-color: #ffffff;
  }

  .activeBtn {
    background-color: #0275d8;
    color: #fff;
    position: relative;
    z-index: 1;
    border-color: #0275d8;
  }

  /*
 屏幕兼容(手机)
  */
  @media screen and (max-width: 600px) {
    .indexContrastComponents {
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

    .indexContrastRow {
      width: 96%;
      height: auto;
      background: #ffffff;
      margin: 0 2%;
    }

    .indexContrastHeader {
      width: 96%;
      border-bottom: 1px solid #EEF1F5;
      margin: 0 2%;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .btn-group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
    }

    button {
      background-color: #ffffff;
    }

    .activeBtn {
      background-color: #0275d8;
      color: #fff;
      position: relative;
      z-index: 1;
      border-color: #0275d8;
    }

  }
</style>

