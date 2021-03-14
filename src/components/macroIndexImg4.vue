<template>
  <div class="box">
    <div :style="{height:height,width:width}" ref="myEchart2"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "macroIndexImg",
    props: {
      infoData4: {
        type: Object,
        required: true
      },
      title4: {
        type: Array,
        required: true
      },
      width: {
        type: String,
        default: (window.width * 40) + "%"
      },
      height: {
        type: String,
        default: 400 + "px"
      },
      select: String
    },
    data() {
      return {}
    },
    mounted() {
      this.initChart();
      console.log(this.title)
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
        this.chart = echarts.init(this.$refs.myEchart2, 'macarons');
        // 把配置和数据放这里
        this.chart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            x: 'center',
            data: this.infoData4.legendTitle
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
            data: this.infoData4.date
          },
          yAxis: {
            name: this.infoData4.title,
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value}万'
            }
          },
          series: [
            {
              symbol: "none",
              name: this.title4[0],
              type: 'line',
              data: this.infoData4.amount,
            }
          ]
        })

      }
    },
    watch: {
      infoData4: function () {
        this.initChart();
      }
    }
  }
</script>

<style scoped>
  .box {
    padding: 10px;
  }

  /*
 屏幕兼容(手机)
  */
  @media screen and (max-width: 600px) {
    .box {
      padding: 10px 0px;
    }
  }
</style>
