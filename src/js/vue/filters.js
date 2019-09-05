import Vue from 'vue';
import manba from 'manba';


// vue的过滤器声明定义，独立封装方便使用，在本文件进行自定义自己需要的过滤器

Vue.filter('format', (value, format) => {
  if (value) {
    return Manba(value).format(format || 'l');
  }
  return '';
});

//用于显示首页三个面板处获取的websocket的时间数据格式的过滤器
Vue.filter('dataFormat', function(dataStr, pattern){
  var dt = new Date(dataStr)
  var y = dt.getFullYear()
  var m = dt.getMonth() + 1
  var d = dt.getDate()

  if(pattern.toLowerCase() === 'yyyy-mm-dd-hh'){
    return `${y}-${m}-${d}`
  }else{
    var hh = dt.getHours()
    var mn = dt.getMinutes()
    var ss = dt.getSeconds()
    return `${y}-${m}-${d} ${hh}:${mn}:${ss}`
  }
});

Vue.filter('distance', (date) => {
  const hours = manba().distance(date, manba.HOUR);
  if (hours == 0) {
    const mins = manba().distance(date, manba.MINUTE);
    return `${mins}分钟`;
  } else if (hours < 24) {
    return `${hours}小时`;
  } else {
    const days = manba().distance(date, manba.DAY);
    return `${days}天`;
  }
});
