import {httpUrl} from "./api";

function setNum(num) {//保留2位小数，如果没小数位自动补全.00
  if (num && num != null) {
    num = String(num);
    var left = num.split('.')[0], right = num.split('.')[1];
    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '';
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
    return (Number(num) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
  } else if (num === 0) {   //注意===在这里的使用，如果传入的num为0,if中会将其判定为boolean类型，故而要另外做===判断
    return '0';
  } else {
    return "";
  }
}

function setNum1(num) {//保留2位小数，如果没小数位自动补全.00
  if (num && num != null) {
    num = String(num);
    var left = num.split('.')[0], right = num.split('.')[1];
    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '00';
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
    return (Number(num) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
  } else if (num === 0) {   //注意===在这里的使用，如果传入的num为0,if中会将其判定为boolean类型，故而要另外做===判断
    return '0';
  } else {
    return "";
  }
}

function setNum4(num) {//保留4位小数，如果没小数位自动补全.00
  if (num && num != null) {
    num = String(num);
    var left = num.split('.')[0],
      right = num.split('.')[1];
    right = right ? (right.length >= 4 ? '.' + right.substr(0, 4) : '.' + right + '0') : '0000';
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
    return (Number(num) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
  } else if (num === 0) {   //注意===在这里的使用，如果传入的num为0,if中会将其判定为boolean类型，故而要另外做===判断
    return '0';
  } else {
    return "";
  }
}

function setNum2(num) {//保留2位小数，如果没小数位自动补全.00
  if (num && num != null) {
    num = String(num);
    var left = num.split('.')[0], right = num.split('.')[1];
    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
    return (Number(num) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
  } else if (num === 0) {   //注意===在这里的使用，如果传入的num为0,if中会将其判定为boolean类型，故而要另外做===判断
    return '0';
  } else {
    return "";
  }
}

function toFixed2(value) {
  return parseFloat(value).toFixed(2);
}

function toFixed4(value) {
  return parseFloat(value).toFixed(4);
}

function toInt(x) {
  var f = 0;
//判断是否是字符串类型
  if (typeof (x) == "string") {
    if (x != null && x != '') {
      f = parseInt(x);
    }
  } else {
    f = x;
  }
  f = Math.round(f);
  return f.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}
function getCommonData(_this,param,url) {
  return new Promise((resolve, reject) => {
    _this.$http.get(url, {
      params: param
    }).then(function (res) {
      resolve(res)
    }).catch(err => {
      reject()
    })
  })
}

function postCommonData(_this,param,url) {
  return new Promise((resolve, reject) => {
    _this.$http.post(url, param).then(function (res) {
      resolve(res)
    }).catch(err => {
      reject()
    })
  })
}
export {setNum, toFixed2, setNum2, toInt, setNum4, toFixed4, setNum1,getCommonData,postCommonData}
