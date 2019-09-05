<style lang="less">
.account-vue {
}
</style>
<template>
    <div>
        <div class="account-vue frame-page">
    <Row :space="30">
        <div class="h-panel frame-page">
            <div class="h-panel-bar">
                <span class="h-panel-title">上传文件</span>
            </div>
            <div class="h-panel-body">
                <form action="files">
               <input type="file" id="exampleInputFile">
               <button type="button" @click="openToview">打开预览</button>
               <button type="button" @click="uploadFile">提交上传</button>
               </form>
            </div>
          </div>
     
        <div class="h-panel">
          <div class="h-panel-tabs-bar">
            <Tabs v-model="tab" :datas="tabs"></Tabs>
          </div>
           <div class="h-panel-body">
          <RichTextEditor v-model="value"></RichTextEditor>
           </div>
        </div>
    </Row>
  </div>

    </div>
  
</template>
<script>

export default {
    data(){
        return{
            tabs: {
                info: '文件预览',
                },
            tab: 'info',
            value:'测试'
        }
    },
    methods:{
        openToview(){
            console.log('openToview')
        },
        uploadFile(){
            console.log('uploadFile')
        }

    }
}
</script>
