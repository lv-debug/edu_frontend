<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileOss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'


export default {

    //定义当前页面使用的变量和初始值
    data() {
        return {
            teacher : {
              name:'',
              sort:0,
              level:1,
              career:'',
              intro:'',
              avatar:''
            },
            //获取dev.env.js的BASE_API值
            BASE_API:process.env.BASE_API,
            imagecropperShow:false,
            imagecropperKey:0,
            saveBtnDisabled:false
        }
    },

    //页面渲染之前执行，一般调用methods的方法
    created() {
      this.init()
    },

    //监听
    watch: {
      //$route监听路由发生变化
      $route(to ,from) {
        this.init()
      }
    },

    //创建具体执行的方法
    methods: {
      //this.saveBtnDisabled = true
      //获取路由的参数
      init() {
        if(this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getTeacherInfo(id)
        }else{
          //多次路由跳转到同一个页面，created只会执行一次
          this.teacher={}
        }
      },

      saveOrUpdate() {
        debugger
        //判断是修改还是添加
        if(!this.teacher.id) {
          this.saveTable()
        }else{
          this.updateTable()
        }
      },

      saveTable() {
        teacherApi.addTeacher(this.teacher)
          .then(response =>{
          this.$message({type: 'success',message: '添加成功!'});
          this.$router.push({path:'/teacher/list'})
        })
      },

      //根据讲师Id查询讲师
      getTeacherInfo(id) {
          teacherApi.getTeacherById(id)
            .then(response  =>{
                this.teacher = response.data.resTeacher
            });
      },

      //修改讲师
      updateTable() {
        teacherApi.updTeacher(this.teacher)
          .then(response =>{
            this.$message({type: 'success',message: '修改成功!'});
            this.$router.push({path:'/teacher/list'})
          })
      },

      //关闭上传弹框
      close() {
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey+1
      },

      //上床保存成功
      cropSuccess(data) {
        this.teacher.avatar = data.url
        this.imagecropperShow = false
        this.imagecropperKey = this.imagecropperKey+1

      }
    },
    
    components : {
      ImageCropper,
      PanThumb
    },
    
}

</script>