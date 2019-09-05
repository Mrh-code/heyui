<style lang="less">

.assign_container{
  display: flex;
  padding:20px 20px;
  .leftlist{
    flex: 2;
    border-radius: 5px;
    padding: 10px 35px;
    background-color:rgb(100, 94, 94);
    color: rgb(212, 206, 206);
    margin-right: 10px;
  }
  .rightlist{
    flex: 8;
    .formstyle{
      padding-left: 35px;
      padding-top: 30px;
      
    }
  }

}
</style>
<template>
    <div class="assign_container">
      <div class="leftlist">
        <h3>后台进程通信情况</h3>
        <hr>
        <div class="menucard">
          <label v-for="item in menulist" :key="item.id">
            <h5>
              {{ item.projname }}:
            </h5>
            <h1>
               {{ item.station }}
            </h1>
            </label>
          
        </div>

        </div>

      <div class="rightlist">
      <Cell :xs='24' :sm='24' :md='24' :lg='16' :xl='16'>
        <div class="h-panel">
          <div class="relative">
            <Tabs class="common-panel-tabs" v-model="type" :datas="{type1: '基本信息', type2: '参数配置',}"></Tabs>
            <div class="middle-right" style="right: 25px;"><span class="text-hover" @click="openMore">查看更多</span></div>
          </div>
          <div class="home-part-body">
            
            <Chart :options="data3" v-if="type=='type2'" key="type2"></Chart>
            <div v-if="type=='type1'" key="type1" class="formstyle">
              <!-- 按下提交将数据提交至action="demo-form.php" -->
              <form action="demo-form.php">
                First name : <input type="text" v-model="fname"><br>
                Last name : <input type="text" v-model="lname"><br>
                address : <select v-model="area">
                  <option value="china">china</option>
                  <option value="japan">japan</option>
                  <option value="america">america</option>
                  </select><br>
                  <input type="checkbox" v-model="accept">已阅读相关条例并同意条例规定<br>
                  
                <input type="submit"  value="提交">
                
                </form>
            </div>
          </div>
        </div>
      </Cell>
        
      </div>
    </div>
</template>
<script>
import data1 from './data1';
import data3 from './data3';

export default {
  data(){
    return{
      
      data1,
      data3,
      //设置选中展示的组件，默认为type1
      type: 'type1',
      menulist:[{id:1, projname:'MYSQL连接状态',station:'waiting'},
      {id:2,projname:'REDIS连接状态',station:'waiting'},
      {id:3,projname:'MONGODB连接状态',station:'waiting'},
      {id:4,projname:'RABBITMQ连接状态',station:'waiting'}
      ],
      fname:'mike',lname:'mouse',area:'china',accept:false
    }
  },
  methods:{
    // 查看更多跳转到另一页面，其路由替换为‘Chart’
    openMore() {
      this.$router.push({ name: 'Chart' });
    }
  }

    }
</script>