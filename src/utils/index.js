function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  
  return `${t1} ${t2}`
}

function aaa () {
  console.log('引用util.js')
}
function strlen(str) {// 输入框相关处理函数
  // 计算字符串长度（英文占一个字符，中文汉字占2个字符）
  var len = 0;
  for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++;
      } else {
      len += 2;
      }
  }
  return len;
}

function listToMatrix(list, elementPerSubArray) {// 将一维数组转为二维数组
  let matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i += 1) {
    if (i % elementPerSubArray === 0) {
      k += 1;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}
var obj = {
  formatNumber,
  formatTime,
  aaa,
  strlen,
  listToMatrix
}

export default obj

