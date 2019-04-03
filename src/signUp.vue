<template>
  <div class="signUpContainer">
    <div class="signUpBox">
      <h3 class="head_title">登录</h3>
      <div class="form-horizontal signUpForm">
        <div class="form-group clearMargin">
          <div class="col-sm-offset-1 col-sm-10">
            <input type="username" class="form-control" id="inputEmail3" placeholder="请输入用户名或手机号" v-model="username">
          </div>
        </div>
        <div class="form-group clearMargin">
          <div class="col-sm-offset-1 col-sm-10">
            <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
          </div>
        </div>
        <div class="form-group clearMargin clearPadding signUpBtnFix">
          <div class="col-sm-12">
            <button type="submit" class="pure-button puree-button-primary puree-spinner-button clearMargin clearPadding" v-on:click="login">登录</button>
            <!--<span >没有帐号？马上注册</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>忘记密码？</span>-->
            <span >
              <span style="color: red">{{msg}}</span><br>
                <router-link :to="{ path: '/Register' }" >
                    没有帐号？马上注册
                </router-link>
                <br>
                <h6 class="bdIntroduction">毕达简介：</h6>
                <h6 class="bdIntroduction">
                    &nbsp; &nbsp;&nbsp; &nbsp;两千五百年前古希腊先贤毕达哥拉斯（Pythagoras）提出“数是万物之本”，提出并证明了直角三角形的毕达哥拉斯定理（勾股定理）。毕达（Pyttatec.com）科学家与人工智能工程师团队经过一年半的研发努力，以美国百年的股票大数据及中国股市有史以来的大数据为本，通过机器深度学习，反复试验，发现了股市的（价值选股+量化风控+机器深度学习交易）勾股算法，并将这一发现反复在美股及A股市场中试验。
                </h6>
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>


</template>

<script>
  import { setSession,getSession } from './apiConfig/cookie.js'
  import {httpUrl} from './apiConfig/api'
  import aa from "./apiConfig/global";
  export default {
    name: "sign-up",
    data(){
      return{
        username: '',
        password: '',
        msg:""
      }
    },
    inject:['reload'],
    mounted(){
      if(getSession('username')&& getSession('username')!=undefined && getSession('username')!=""){
        setSession('username',"");
        setSession('access_code',"");
        setSession('authority',"")
        var tempArr=[
         //  {
         //    title:'A股',
         //    url:'index'
         //  }
         //  ,
         // {
         //   title:'美股',
         //   url:'usStock'
         // }
         // ,
         //  {
         //    title:'讨论区',
         //    url:'Forum'
         //  } ,
         // {
         //    title:'A股诊股',
         //    url:'DiagnosticStocks'
         //  } ,
         //  {
         //    title:'排名',
         //    url:'Rank'
         //  } ,
         //  {
         //    title:'数据区',
         //    url:'DataInquiry'
         //  },
         //  {
         //    title:'物价',
         //    url:'PriceTable'
         //  },
          {
            title:'登录',
            url:'SignUp'
          }
        ];
        this.aa.seturl(tempArr);
        this.reload()
        this.$router.push({path:'sign-up',query:{id:1}})
      }
    },
    methods: {
      login(){
        if(this.username == ""){
          alert("请输入用户名/手机号!")
        }else if(this.password == ""){
          alert("请输入密码!")
        }else{
          let data = {'name':this.username,'password':this.password};
          this.$http.post(httpUrl.userLoginApi,data).then((res)=>{
            if(res.body.code == 0 ){
              this.msg=res.body.message;
              setSession('username',res.body.data.entity.name);
              setSession('access_code',res.body.data.entity.accessCode);
              setSession('authority',res.body.data.entity.authority);
              console.log(res.body.data.entity);
              var tempArr=[
                {
                  title:'每日勾股',
                  url:'DiagnosticStocks'
                },
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
                } ,
                {
                  title:'AI排名',
                  url:'Rank'
                },
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
              setTimeout(function(){
                this.$router.push({path:'index'})
              }.bind(this),1000);
              this.reload();
            }else{
              this.msg=res.body.message
               // alert(res.body.message)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  *
  .signUpContainer{
    margin: 0rem  auto ;
    max-width: 1030px;
    min-width: 320px;
    position: relative;
  }
  .signUpBox {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.3);
    width: 360px;
    right: 0;
    min-height: 380px;
    z-index: 1;
    padding: 35px 5px;
    padding-bottom: 10px;
    border-top: 1px solid #f1f1f5;
    margin: 5rem  auto ;
  }
  .clearMargin{
    margin-left: 0;
    margin-right: 0;
  }
  .clearPadding{
    padding-left: 0;
    padding-right: 0;
  }
  button{
    display:block;
    width:100%;
    height:40px;
    line-height: 40px;
    margin:0 auto;
    border:none;
    background-color:#0275D8;
    color:#fff;
    font-size:16px;
    margin-bottom:5px;
  }
  .textAlignLeft{
    text-align: left;
  }
  .labeAlignText{
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    text-align: left;
    width: 100%;
    font-weight: 700;
  }
  .aRemarks{
    color: red;
    display: inline-block;
  }
  .aRemarks:hover{
    color: red;
    display: inline-block;
    text-decoration: none;
  }
  .signUpForm{
    margin-top: 2rem;
  }
  .signUpBtnFix{
    margin-top: 4rem;
  }

  .head_title {
    text-align: center;
    margin: 0px;
  }
  .signUpBox>h3{
    width: 100%;
    text-align: center;
  }
  .bdIntroduction{
    text-align: left;
    line-height: 1.6rem;
  }

  /*
  屏幕兼容(手机)
   */
  @media screen and (max-width:600px)
  {
    .head_title{
      text-align: center;
      margin: 0px;
    }
    .signUpBox{
      width: 100%;
    }
    .bdIntroductionMb{
      text-align: left;
    }
  }
</style>
