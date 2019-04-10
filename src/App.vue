<template>
  <div id="app">
    <div id="header">
      <nav class="navbar navbar-fixed-top my-navbar" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <img class="logoimg" src="https://aisharev1.oss-cn-beijing.aliyuncs.com/share/logo.png"/>
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#example-navbar-collapse">
              <span class="sr-only">切换导航</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class="collapse navbar-collapse justify-content-end" id="example-navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
              <li v-for="(item,index) in items" v-on:click="addClass(index)" >
                <router-link :to="{ name :item.url }" data-toggle="collapse"  data-target="#example-navbar-collapse">
                  {{item.title}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import './assets/css/iconfont/iconfont.css';
  import { setSession,getSession } from './apiConfig/cookie.js'
export default {
  name: 'App',
  data () {
    return{
      items:this.aa.url
    }

  },
  provide:function(){
    return {
      reload:this.reload
    }
  },
  mounted: function () {
    if(getSession('username')){
      var tempArr=[
        {
          title:'每日勾股',
          url:'DiagnosticStocks'
        } ,
        {
          title:'A股公告',
          url:'index'
        }
        ,
        {
          title:'美股公告',
          url:'usStock'
        },
        {
          title:'参考指标',
          url:'PriceTable'
        },
        {
          title:'账户管理',
          url:'InvestorRelation'
        } ,{
          title:'AI排名',
          url:'Rank'
        } ,
        {
          title:'工具栏',
          url:'DataInquiry'
        },
        {
          title:'退出',
          url:'SignUp'
        }
      ];
      if (getSession('authority') != null && getSession('authority') != '') {
        if(getSession('authority').search('AR') == -1){
          tempArr.splice(4,2);
        }

      } else {
        tempArr.splice(4,2);
      }
      this.aa.seturl(tempArr);
      this.items=this.aa.url;
    }
  },
  methods:{
    addClass:function(index){
      this.current=index;
    },
    reload(){
      this.$nextTick(function () {
        this.items=this.aa.url;
      })
    }
  },
  watch: {
    items:function () {
      this.items=this.aa.url;
    }
  }

}
</script>

<style>
  ::-webkit-scrollbar{
    width: 0px;
    height: 0px;
  }
  html,body{
    height: 100%!important;
    background: #E9ECF3!important;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#header{
  width: 100%;
  margin: 0;
  border: 0;
  padding: 0;
  height: 50px;
  filter: none;
  background-image: none;
}
nav ul{
  /*padding-top: 10px;
  padding-bottom: 10px;*/
}
.content{
  background: #E9ECF3;
  padding-top: 0.1rem;
}
.nav>li>a:focus, .nav>li>a:hover {
  text-decoration: none;
  background-color: #0275D8!important;
  color: #FFFFFF!important;
}
.
a {
  color:#FFFFFF!important;
  font-weight: bolder;
  cursor: pointer;
}
.my-navbar{
  background: #1369BF;
  color: #ffffff;
  font-family: 'Biaodian Pro Sans GB',"Helvetica Neue",Helvetica,Arial,"pingfang sc","Hiragino Sans GB","Microsoft YaHei","微软雅黑",STHeiti,SimSun,sans-serif;
}
.icon-bar{
  background: #8C95A5;
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
a {
  color: #FFFFFF!important;
  font-weight: bolder;
}
a:hover{
  text-decoration: none;
}
.logoimg{
  height: 50px;
  margin: 0px 10px;
}
.footer{
  width: 100%;
  height: 6rem;
  background: #404040;
}
  .footer a{
    color: #00ADD2;
    line-height: 6rem;
    font-size: 1rem;
  }
.footer span{
  color: #ffffff;
  line-height: 6rem;
  font-size: 1rem;
}
  .active{
    text-decoration: none;
    background-color: #0275D8!important;
    color: #FFFFFF!important;
  }
  .active>a{
    color: #FFFFFF!important;
  }
  .Green{
    color: #0B9F91;
  }
  .SomeGreen
  {
    color: #09cbba;
  }
  .Red{
    color: #E9531E;
  }
  .SomeRed{
    color: #dc8495;
  }
  .navbar {
    margin-bottom: 0px;
  }
  .table-striped>tbody>tr:nth-of-type(odd) {
    background-color: #fbfcfd;
  }
  .activeBtn{
    background-color: #0275d8;
    color: #fff;
    position: relative;
    z-index: 1;
    border-color: #0275d8;
  }
  .btn-default:hover {
    background-color: #0275d8;
    color: #fff;
    position: relative;
    z-index: 1;
    border-color: #0275d8;
  }
  .btn-default:focus {
    background-color: #0275d8;
    color: #fff;
    position: relative;
    z-index: 1;
    border-color: #0275d8;
  }
  .btn-default.active.focus, .btn-default.active:focus, .btn-default.active:hover, .btn-default:active.focus, .btn-default:active:focus, .btn-default:active:hover, .open>.dropdown-toggle.btn-default.focus, .open>.dropdown-toggle.btn-default:focus, .open>.dropdown-toggle.btn-default:hover {
    color: #fff;
    background-color: #0275d8;
    border-color: #0275d8;
  }
  .clearPadLeft{
    padding-left: 0px;
  }
  .clearPadRig{
    padding-right: 0px;
  }
  th,td{
    vertical-align: middle!important;
  }
  .h3, h3 {
    font-size: 20px;
  }
  /*
屏幕兼容(手机)
*/
  @media screen and (max-width:600px)
  {
    .logoimg {
      height: 40px;
      -webkit-box-sizing: content-box;
      box-sizing: content-box;
      padding: 5px 0;
      position: absolute;
      left: 0px;
      overflow: auto;
      /* box-sizing: content-box; */
      margin: 0;
    }
    .h3, h3 {
      font-size: 15px;
    }
  }
</style>
