import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Index from '@/Index'
import UsStock from '@/UsStock'
import Forum from '@/Forum'
import Login from '@/Login'
import Register from '@/Register'
import SignUp from '@/signUp'
import DiagnosticStocks from '@/DiagnosticStocks'
import Rank from '@/rank'


import RecommendInfo from '@/RecommendInfo'
import DataInquiry   from "@/DataInquiry"
import Recommend from '../components/Recommend'
import TransactionRecord from '../components/TransactionRecord'
import PriceTable from '../components/priceTable'
import UsTransactionRecord from '../components/UsTransactionRecord'
import VueResource from 'vue-resource'
import {getCookie} from "../apiConfig/cookie";
Vue.use(Router)
Vue.use(VueResource);

export default new Router({
  routes: [
   {
      path: '/',
     name: 'SignUp',
     component: SignUp
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/us-stock',
      name: 'usStock',
      component: UsStock
    },
    {
      path: '/recommend-info',
      name: 'RecommendInfo',
      component: RecommendInfo
    },
    {
      path: '/forum',
      name: 'Forum',
      component: Forum
    },
    {
      path: '/data-inquiry',
      name: 'DataInquiry',
      component: DataInquiry
    },
    {
      path: '/diagnostic-stocks',
      name: 'DiagnosticStocks',
      component: DiagnosticStocks
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/components/transaction-record',
      name: 'TransactionRecord',
      component: TransactionRecord
    },
    {
      path: '/components/us-transaction-record',
      name: 'UsTransactionRecord',
      component: UsTransactionRecord
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/price-table',
      name: 'PriceTable',
      component: PriceTable
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    }
  ]

})

