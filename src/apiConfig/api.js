let localhostDev = false;
let localhostDevOA = false;
//如果是本地开发，就把localhostDev 设置成true，连接就是拼成‘http://localhost:8080/api/test’
//生产环境，就把localhostDev 设置成false，连接就是拼成‘http://xxx.com/api/test’
//let _host = localhostDev ? 'http://fqm0925.vicp.io:11336' : 'http://www.1000stock.com';
let _host = localhostDev ? 'http://127.0.0.1:8082' : 'http://www.1000stock.com';
let _hostOA = localhostDevOA ? 'http://127.0.0.1:8887' : 'http://www.1000stock.com';

let httpUrl = {
  // 'newSearchLastGainApi': _host + '/trade/find_gain',//首页0331修改后获取最新赢利数据接口
  'newSearchLastGainApi': _host + '/trade/find_history_gain',//首页0331修改后获取最新赢利数据接口
  'searchLastGainApi': _host + '/trade/search_gain',//首页获取最新赢利数据接口npm npn
  'lastRecommendationApi': _host + '/recommend/find',//获取推荐信息中的最新推荐
  'GetContrastApi': _host + '/trade/get_index_contrast',//获取推荐信息中的大盘与引擎的走势
  'recommendFindApi': _host + '/recommend/find',//获取推荐信息中的最新推荐
  'recommendHistoryFindApi': _host + '/recommend/search',//获取推荐信息中的历史推荐
  'tradeGetLatelyApi': _host + '/trade/get_lately',//获取最近的交易记录
  'tradeSearchApi': _host + '/trade/find_trade',//分页获取交易记录 此处的分页是按照的 天 分页
  'tradeFindStockApi': _host + '/trade/find_stock',//获取当前持股，url似乎不太合理，有交易才有持有股票，暂时放在此处
  'createTopicApi': _host + '/topic/create',//创建新话题
  'getTopicListApi': _host + '/topic/search',//获取分页话题记录
  'getCurCommentListApi': _host + '/reply/search',//获取当前话题的回复详情
  'createFirstApi': _host + '/reply/createFirst',//对话题的评论调用的是
  'createReplyApi': _host + '/reply/createReply',// 对评论进行评论或是回复调用的是

  'getTotalProfitLineApi': _host + '/trade/get_contrast',//总的收益率曲线
  'userLoginApi': _host + '/userInfo/login', //用户登录接口
  'userRegisterApi': _host + '/userInfo/register', //用户注册接口
  'getEmptyPresentApi': _host + '/trade/get_idle_rate', //获取闲置率
  /*年化收益率*/
  'getYearRateApi': _host + '/trade/get_year_rate', //获取闲置率
  'getGainInfoApi': _host + '/trade/get_gain_contrast',//各指数收益对比曲线
  "getUserAccoutInfoApi": _host + '/trade/get_asset_summary', // 用户账户信息总览
  "getOperatorSummaryApi": _host + '/trade/get_operator_summary', // 操作统计
  'getTradeRecordApi': _host + '/trade/search_trade',//查找交易记录
  'getRecomendationApi': _host + '/recommend/get_info',//
  'getDataInquriyInfoApi': _host + '/data/search',//
  'search_reverse_repoApi': _host + '/trade/search_reverse_repo',//获取逆回购记录信息

  ///////////////////////////////////////////美股接口////////////////////////////////////
  //'newSearchLastGainApiUs': _host + '/trade_us/find_gain',//首页0331修改后获取最新赢利数据接口
  'newSearchLastGainApiUs': _host + '/trade_us/find_history_gain',//首页0331修改后获取最新赢利数据接口
  'searchLastGainApiUs': _host + '/trade_us/search_gain',//首页获取最新赢利数据接口
  'lastRecommendationApiUs': _host + '/trade_us/find_plan',//获取推荐信息中的最新推荐
  'GetContrastApiUs': _host + '/trade_us/get_index_contrast',//获取推荐信息中的大盘与引擎的走势
  'recommendFindApiUs': _host + '/recommend_us/find',//获取推荐信息中的最新推荐
  'recommendHistoryFindApiUs': _host + '/recommend_us/search',//获取推荐信息中的历史推荐
  'tradeGetLatelyApiUs': _host + '/trade_us/get_lately',//获取最近的交易记录
  'tradeSearchApiUs': _host + '/trade_us/find_trade',//分页获取交易记录 此处的分页是按照的 天 分页
  'tradeFindStockApiUs': _host + '/trade_us/find_stock',//获取当前持股，url似乎不太合理，有交易才有持有股票，暂时放在此处
  'createTopicApiUs': _host + '/topic_us/create',//创建新话题
  'getTopicListApiUs': _host + '/topic_us/search',//获取分页话题记录
  'getCurCommentListApiUs': _host + '/reply_us/search',//获取当前话题的回复详情
  'createFirstApiUs': _host + '/reply_us/createFirst',//对话题的评论调用的是
  'createReplyApiUs': _host + '/reply_us/createReply',// 对评论进行评论或是回复调用的是

  'getTotalProfitLineApiUs': _host + '/trade_us/get_contrast',//总的收益率曲线
  'userLoginApiUs': _host + '/userInfo_us/login', //用户登录接口
  'userRegisterApiUs': _host + '/userInfo_us/register', //用户注册接口
  'getEmptyPresentApiUs': _host + '/trade_us/get_idle_rate', //获取闲置率
  /*年化收益率*/
  'getYearRateApiUs': _host + '/trade_us/get_year_rate', //获取闲置率
  'getGainInfoApiUs': _host + '/trade_us/get_gain_contrast',//各指数收益对比曲线
  "getUserAccoutInfoApiUs": _host + '/trade_us/get_asset_summary', // 用户账户信息总览
  "getOperatorSummaryApiUs": _host + '/trade_us/get_operator_summary', // 操作统计
  'getTradeRecordApiUs': _host + '/trade_us/search_trade',//查找交易记录
  'getRecomendationApiUs': _host + '/recommend_us/get_info',//
  'getDataInquriyInfoApiUs': _host + '/data_us/search',//
  'search_reverse_repoApiUs': _host + '/trade_us/search_reverse_repo',//获取逆回购记录信息


///////////////////////////////////////////诊股接口////////////////////////////////////
  'diagnosticStocksRankApi': _host + '/diagnosis/search_rank',//获取诊股排名接口
  'diagnosticStocksGetFiveYearsDataApi': _host + '/diagnosis/find_financial',//获取诊股排名接口
  'diagnosticStocksFindTechnologyApi': _host + '/diagnosis/find_technology',//获取根据股票代码获取该股票的技术评分
  'diagnosticStocksResultApi': _host + '/diagnosis/get',//根据公司名称或者是股票代码获取综合诊断结果
  'diagnosticStocksAddApi': _host + '/diagnosis/add_stock',//添加自选股
  'diagnosticStocksDelApi': _host + '/diagnosis/delete_stock',//删除自选股
  'diagnosticStocksSearchApi': _host + '/diagnosis/find_stock',//查找自选股

///////////////////////////////////////////物料价格接口////////////////////////////////////
  'materialPriceImgApi': _host + '/material/find_main',//查找主要的物料价格曲线
  'materialPriceTableApi': _host + '/material/search',//查找价格曲线排名
  'materialPriceDetailApi': _host + '/material/get_detail',//查找物料详情曲线排名

//////////////////////////////////////////基金接口////////////////////////////////////
  'getFundListApi': _host + '/trade_us/find_actual_list',//查找主要的基金列表
  'getFundListDetailApi': _host + '/trade_us/search_actual_detail',//查找主要的基金详情
  'getFundListLineApi': _host + '/trade_us/get_actual_line',//查找主要的基金详情

//////////////////////////////////////////每日勾股////////////////////////////////////
  'getEveryStockApi': _host + '/diagnosis/find_everyday_stock',//查找每日勾股列表

//////////////////////////////////////////投资人列表接口////////////////////////////////////
  'getInvestorListApi': _host + '/data/find_investor_summary',//查找投资人列表列表
  'getInvestorDetailApi': _host + '/data/find_detail',//查找投资人详情列表

//////////////////////////////////////////排名接口////////////////////////////////////
  'getProductPriceApi': _host + '/material/find_material_by_code',//根据股票代码获取公司的物料价格信息列表列表
  'getShowNoticeApi': _host + '/material/find_notice_by_code',//根据股票代码获取公司公告
  'getStockPoolApi': _host + '/material/find_stock_pool',//股池公告信息
  'getcoreStatisticsApi': _host + '/diagnosis/find_rank_scatter',//得分统计
  'getFemoralPoolScoreApi': _host + '/diagnosis/find_focus',//小股池技术得分

//////////////////////////////////////////宏观指数////////////////////////////////////
  'getPmiIndexApi': _host + '/material/find_pmi',//获取PMI指数
  'getPpiIndexApi': _host + '/material/find_ppi',//获取PPI指数
  'getCpiIndexApi': _host + '/material/find_cpi',//查找CPI指数
  'getStockAccountApi': _host + '/material/find_new_stock_account',//全国新开股票账户

//////////////////////////////////////////账户总览////////////////////////////////////
  'getAccountCnApi': _host + '/account/get_cn',//获取A股最新的账户对比
  'getAccountUsApi': _host + '/account/get_us',//获取美股最新的账户对比
  'getChGainInfoApi': _host + '/account/get_cn_pictrue',//获取A股账户收益对比
  'getUsGainInfoApi': _host + '/account/get_us_pictrue',//获取美股账户收益对比
  'getAccountDiffDataApi': _host + '/account/get_diff_by_date',//由时间范围获取账户的跟踪误差
  'getAccountDiffRangeApi': _host + '/account/get_diff_by_range',//由下拉选择获取账户的跟踪误差

  //////////////////////////////////////////OA管理////////////////////////////////////
  'submitPlanApi':_hostOA + '/plan/submit_plan', //提交交易计划
  'findPlanApi':_hostOA + '/plan/find_plan',  //查找交易计划
  'cancelPlanApi':_hostOA + '/plan/cancel_plan', //取消交易计划
  'getStockPriceApi':_hostOA + '/plan/get_price', //获取股价
  'getHoldQtyApi':_hostOA + '/plan/get_hold_qty', //获取持仓数量
  'getHoldMoneyApi':_hostOA + '/plan/get_hold_amount', //获取持仓金额
  'findBrokerApi':_hostOA + '/plan/find_broker', //查找券商
  'submitDayTradeApi':_hostOA + '/day_trade/submit_day_trade', //提交T0计划
  'findDayTradeApi':_hostOA + '/day_trade/find_day_trade', //查找日内交易计划
  'cancelDayTradeApi':_hostOA + '/day_trade/cancel_day_trade', //取消日内交易计划
  'submitAvgPlanApi':_hostOA + '/plan/submit_avg_plan', //提交交易计划
  'findTradeListApi':_hostOA + '/plan/find_avg_plan', //查询交易计划
  'findStrategyListApi':_hostOA + '/plan/find_strategy', //查询交易策略
  'findPositionListApi':_hostOA + '/focus/find_focus', //查询关注股票
  'cancelAvgPlanApi':_hostOA + '/plan/cancel_avg_plan', //取消交易计划
  'deleteFocusApi':_hostOA + '/focus/delete_focus', //删除关注股票
  'addFocusApi':_hostOA + '/focus/add_focus', //追加关注股票
  'updataFocusApi':_hostOA + '/focus/update_focus', //手动触发更新关注股票列表的数据
  'getMarketInfoAPi':_hostOA + '/config/get_market_info', //获取市场的开收盘时间信息
  'updateMarketInfoAPi':_hostOA + '/config/update_market_info', //更新市场的开盘收盘时间信息
  'getGoStockAccount':_hostOA + '/config/get_gougu_account', //获取账户跟随勾股策略执行的资金信息
  'updateGoStockAccount':_hostOA + '/config/update_gougu_account', //更新账户跟随勾美股操作的资金量分配信息
  'findGoStockPlan':_hostOA + '/config/find_gougu_plan', //获取跟随勾美股操作的具体计划
  'updateGoStockPlan':_hostOA + '/config/update_gougu_plan', //更新跟随勾美股策略的某只股票的交易金额
  'resetGoStockPlan':_hostOA + '/config/reset_gougu_plan', //重置勾股的交易计划





















};
export {httpUrl}
