<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布"/>
    </el-steps>
    <!-- 章节 -->
    <el-button type="text" @click="openChapterDialog">添加章节</el-button>
    
    <ul class="chanpterList">
        <li
            v-for="chapter in chapterVideoList"
            :key="chapter.id">
            <p>
                {{ chapter.title }}
                <span class="acts">
                  <el-button type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
                  <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
                </span>
            </p>
            <ul class="chanpterList videoList">
                <li
                    v-for="video in chapter.children"
                    :key="video.id">
                    <p>{{ video.title }}
                    </p>
                </li>
            </ul>
        </li>
    </ul>

    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
            <el-form-item label="章节标题">
                <el-input v-model="chapter.title"/>
            </el-form-item>
            <el-form-item label="章节排序">
                <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>

import chapterApi from '@/api/edu/chapter'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      chapterVideoList:[],
      courseId:'',
      dialogChapterFormVisible:false,
      chapter: {
        title: '',
        sort:0
      }
    }
  },
  
  created() {
    if(this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getChapterVideo()
    }
  },
  methods: {
    previous() {
      this.$router.push({ path: '/course/info/'+this.courseId })
    },
    getChapterVideo() {
      chapterApi.getListChapter(this.courseId)
        .then(response =>{
          this.chapterVideoList = response.data.chapterVos
        })
    },
    next() {
      console.log('next')
      this.$router.push({ path: '/course/publish/'+this.courseId })
    },
    //弹出添加章节
    openChapterDialog() {
      this.chapter = {}
      this.dialogChapterFormVisible = true
    },
    //弹出修改章节
    openEditChapter(chapterId) {
      this.dialogChapterFormVisible = true
      chapterApi.getChapter(chapterId)
        .then(response =>{
          this.chapter = response.data.eduChapter
        })
    },
    deleteChapter(chapterId) {
      this.$confirm('此操作将永久删除章节记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                chapterApi.delChapter(chapterId)
                  .then(response =>{
                    this.$message({type: 'success',message: '删除成功!'})
                  this.getChapterVideo()
                })
            })
      },
    //添加章节
    saveOrUpdate() {
      this.chapter.courseId = this.courseId
      if(this.chapter.id){
        chapterApi.updateChapter(this.chapter)
          .then(response =>{
            this.dialogChapterFormVisible = false
            this.$message({type: 'success',message: '修改成功!'});
            this.getChapterVideo()
          })
      }else{
        chapterApi.addChapter(this.chapter)
          .then(response =>{
            this.dialogChapterFormVisible = false
            this.$message({type: 'success',message: '添加成功!'});
            this.getChapterVideo()
          })
      }

      
    }
  }
}
</script>


<style scoped>
  .chanpterList{
      position: relative;
      list-style: none;
      margin: 0;
      padding: 0;
  }
  .chanpterList li{
    position: relative;
  }
  .chanpterList p{
    float: left;
    font-size: 20px;
    margin: 10px 0;
    padding: 10px;
    height: 70px;
    line-height: 50px;
    width: 100%;
    border: 1px solid #DDD;
  }
  .chanpterList .acts {
      float: right;
      font-size: 14px;
  }
  .videoList{
    padding-left: 50px;
  }
  .videoList p{
    float: left;
    font-size: 14px;
    margin: 10px 0;
    padding: 10px;
    height: 50px;
    line-height: 30px;
    width: 100%;
    border: 1px dotted #DDD;
  }
</style>