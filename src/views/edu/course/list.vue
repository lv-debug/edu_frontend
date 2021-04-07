<template>
  <div class="app-container">
    <!--:inline="true":表示在一行显示-->
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="courseQuery.title" placeholder="课程名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-select v-model="courseQuery.status" placeholder="课程状态">
                <el-option label="已发布" value="Normal"></el-option>
                <el-option label="未发布" value="Draft"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="queryData()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form-item>
    </el-form>

    <el-table :data="this.list" style="width: 100%">
        <el-table-column label="序号" width="80">
            <template slot-scope="course">
                {{ (page-1)*limit+course.$index+1}}
            </template>
        </el-table-column>
        <el-table-column prop="title" label="课程名称" width="180" />
        <el-table-column prop="price" label="课程价格" width="180" />
        <el-table-column prop="lessonNum" label="总课时" width="180" />
        <el-table-column prop="buyCount" label="销售数量" width="180" />
        <el-table-column prop="viewCount" label="浏览数量" width="180" >
            <template slot-scope="course">
                {{ course.row.status === 'Draft'?'未发布':'已发布'}}
            </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间" width="180"/>
        <el-table-column label="操作" width="280" align="center">
            <template slot-scope="teacher">
                <router-link :to ="'/teacher/edit/'+teacher.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(teacher.row.id)">课程删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        background style="padding:30px 0 0 0;float:right"
        layout="prev, pager, next"
        :current-pagee="page"
        :page-size="limit"
        :total="total"
        @current-change="getList">
    </el-pagination>
  </div>
</template>

<script>

import courseApi from '@/api/edu/course'


export default {

    //定义当前页面使用的变量和初始值
    data() {
        return {
            list : null,
            page : 1,
            limit : 5,
            total : 0,
            courseQuery : {}
        }
    },

    //页面渲染之前执行，一般调用methods的方法
    created() {
        //渲染之前调用methods的列表方法
        this.getList()

    },

    //创建具体执行的方法
    methods: {
        //讲师列表
        getList(page = 1) {
            this.page = page
            //执行js里面定义的方法
            courseApi.pageListCourse(this.page,this.limit,this.courseQuery)
                .then(response  =>{
                    this.list = response.data.rows
                    this.total = response.data.total
                })
        },
        //条件查询
        queryData() {
            this.getList()
        },
        //条件清空
        resetData() {
            this.teacherQuery = {}
            this.queryData()
        },
        //删除课程
        removeDataById(id) {
            this.$confirm('此操作将永久删除课程及课程下的数据记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                courseApi.deleteCourse(id)
                    .then(response  =>{
                    //删除成功
                    this.$message({type: 'success',message: '删除成功!'});
                    this.getList()
                })
            })
        }

    }
    
}

</script>