<style lang='less'>
.icons-vue {
  .h-row>div>div {
    background: rgb(240, 246, 255);
    border-radius: 3px;
    padding: 20px 5px;
    text-align: center;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    [class^="icon-"], [class*=" icon-"]{
        font-size: 28px;
    }
    p{
        margin: 10px 0px;
    }
  }
}
.cellcontainer{
  display: flex;
  justify-content: space-around;
  .card1{
    background-color:lightseagreen;
    border-radius: 20px;
  }
  .card2{
    background-color:salmon;
    border-radius: 20px;
  }
  .card3{
    background-color:cornflowerblue;
    border-radius: 20px; 
  }

}

</style>

<template>
<div>
<div class="icons-vue h-panel frame-page">
    <div class="h-panel-bar">
      <span class="h-panel-title">websocket</span>
    </div>
    <div class="h-panel-body">
      <Row :space="25">
        <div class="cellcontainer">
       <Cell :xs='12' :sm='12' :md='6' :lg='4' :xl='3' class="card1">
         <span class="icon-air-play"></span>
            在线终端数：<h2>{{onlineDev}}</h2>{{stimes | dataFormat('yyyy-mm-dd')}}
       </Cell>
        <Cell :xs='12' :sm='12' :md='6' :lg='4' :xl='3' class="card2">
          <span class="icon-bell"></span>
            紧急事件：<h2>{{emergency}}</h2>{{stimes | dataFormat('yyyy-mm-dd')}}
       </Cell>
       <Cell :xs='12' :sm='12' :md='6' :lg='4' :xl='3' class="card3">
         <span class="icon-clock"></span>
            超时设备数：<h2>{{outtime}}</h2>{{stimes | dataFormat('yyyy-mm-dd')}}
       </Cell> 
       </div>
      </Row>

    </div>
  </div>

<div class="icons-vue h-panel frame-page">
<div class="h-panel-bar">
      <span class="h-panel-title">客户端详情</span>
    </div>
<div class="h-panel-body">
  <div class="common-filter-bar">
    <div class="float-right">
          <Select class="common-filter-select" autosize v-width="160" v-model="sort" :datas="sortList" :no-border="true" @input="getData(true)" :null-option="false" placeholder="请选择您的内容"></Select>
        </div>
  </div>
  <Table :loading="loading" :datas="devDetail">
    <TableItem title="序号">
          <template slot-scope="{index}">{{index+1}} </template>
        </TableItem>
        <TableItem :width="200" prop="SessionID" title="SessionID"></TableItem>
        <TableItem :width="200" prop="ClientEndPoint" title="客户端地址"></TableItem>
        <TableItem :width="200" prop="CommunicateSituation" title="连接情况"></TableItem>
        <TableItem :width="200" prop="ConnectOrDisTime" title="连接/断开时间"></TableItem>
        <TableItem :width="200" title="更多操作"></TableItem>
        
  </Table>

<p></p>
      <Pagination v-if="pagination.total>0"  align="right" v-model="pagination" @change="changePage" />
</div>

</div>

<div class="frame-page">
<div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">一周内接入设备数量历史数据</span>
      </div>
      <div class="h-panel-body">
        <Chart :options="chartdata"></Chart>
      </div>
    </div>
</div>


<div class="h-panel frame-page">
<div class="h-panel-bar">
      <span class="h-panel-title">客户端定位信息</span>
    </div>
    <div class="h-panel-bar">
      <Search type="text" v-model="loc" placeholder="输入地址定位" showSearchButton @search="search" />
    </div>
    <div class="h-panel-body">
      <BaiduMap @load="initMap"></BaiduMap>
    </div>
</div>


  </div>  
</template>

<script>
import chartdata from './chartdata'

export default {
    name:'controlPanel',
    data(){
        return{
          // 面板三个websocket数据
            onlineDev:0,
            emergency:0,
            outtime:0,
            // 显示时间
            stimes:null,
            // 地图数据loc是输入搜索，map是地图初始化的数据
            loc: null,
            map: null,
            // 客户端详情数据数组
            devDetail:[
              // {ID:1,address:'南岸区',station:true,onoffTime:'2019-04-24'}
              ],
            // 表格右边选择排序方式栏的配置数据
            keyword: '',
            sort: 'updatedAt:desc',
            sortList: {
              'updatedAt:desc': '更新时间倒序','updatedAt:asc': '更新时间正序',
              'createdAt:desc': '创建时间倒序','createdAt:asc': '创建时间正序'
              },
              // 表格下方分页显示控制数据
              pagination: {
                page: 1,size: 20,total: 0
                },

      loading: false,
      //图表数据
      chartdata
        }
	},
	methods:{
    // 页面初始化执行的初始化函数
    init() {
      // 获取表格数据
      this.getData();  
    },
    // 数据页面切换获取新的数据
    changePage() {
      this.getData(true);
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      this.pagination.total = 100;
      this.loading = false;
      },

      // 地图初始化，map是初始化配置信息
    initMap(map) {
      this.map = map;
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      map.centerAndZoom("重庆",15);
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    },
    //输入数据查询地图
    search() {
      let map = this.map;
      var local = new BMap.LocalSearch(map, {      
        renderOptions:{map: map}      
      });  
      local.search(this.loc);
    },

//加载组件时从服务器端获取数据
		getMsg(){
            // this.$Loading('加载中');
            R.Home1.getMessageList().then(resp=>{
              console.log(resp);
            });
    },
      
    toastactive(){
      console.log('选择条目')
    },
    

		// websocket服务函数，包括建立连接，接受和发送数据
		initWebScoket(){//初始化websocket
			const wsuri="ws://172.33.24.243:17865";
			this.websocket = new WebSocket(wsuri);
			this.websocket.onmessage = this.websocketonmessage;
			this.websocket.onopen = this.websocketonopen;
			this.websocket.onerror = this.websocketonerror;
			this.websocket.onclose = this.websocketonclose;
		},
     websocketonopen(){ //连接建立之后执行send方法发送数据
     let actions = {"test":"12345"};  //发送的数据，要根据后台程序写的格式进行设定      
		 this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){//连接建立失败重连
      this.initWebScoket();
    },
    websocketonmessage(e){ //数据接收
    const redata = JSON.parse(e.data);
    console.log('redata', redata);
    if(redata.Type=='newWebSocketConnect'){
    this.onlineDev= redata.clientCount;
    this.emergency=redata.emegencyEvent;
    this.outtime=redata.outTimeClient;
    this.stimes=redata.datetime;
    this.devDetail=redata.clientList;
    }else if(redata.Type=='socketConnect'){
    this.onlineDev= redata.clientCount;
    this.outtime=redata.outTimeClient;
    this.stimes=redata.datetime;
    this.devDetail=redata.clientList;
    }else if(redata.Type=='healthyCheck'){
    this.outtime=redata.outTimeClient;
    this.stimes=redata.datetime;
    this.devDetail=redata.clientList;
    }

      },
    websocketsend(Data){//数据发送
    this.websock.send(Data);
      },
    websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
  },
  
  // 生命周期的钩子函数
	created(){
		this.getMsg();
		this.initWebScoket();
	},
	destroyed(){
    //切换时关闭websocket连接
		this.websocket.close();
  },
  mounted() {
    this.init();
  },   
}
</script>



