<template>
  <div class="app-container">
    <!--:inline="true":表示在一行显示-->
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="teacherQuery.name" placeholder="讲师名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
                <el-option label="高级讲师" value="1"></el-option>
                <el-option label="首席讲师" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-col :span="11">
                <el-date-picker type="datetime" placeholder="选择开始时间" v-model="teacherQuery.begin" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-date-picker type="datetime" placeholder="选择结束时间" v-model="teacherQuery.end" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="queryData()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form-item>
    </el-form>

    <el-table :data="this.list" style="width: 100%">
        <el-table-column label="序号" width="80">
            <template slot-scope="teacher">
                {{ (page-1)*limit+teacher.$index+1}}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="level" label="级别" width="180">
            <template slot-scope="teacher">
                {{ teacher.row.level === 1?'高级讲师':'首席讲师'}}
            </template>
        </el-table-column>
        <el-table-column prop="career" label="资历" width="280"/>
        <el-table-column prop="intro" label="简介" width="510"/>
        <el-table-column prop="gmtCreate" label="创建时间" width="180"/>
        <el-table-column label="操作" width="280" align="center">
            <template slot-scope="teacher">
                <router-link :to ="'/teacher/edit/'+teacher.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(teacher.row.id)">删除</el-button>
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

import teacher from '@/api/edu/teacher'


export default {

    //定义当前页面使用的变量和初始值
    data() {
        return {
            list : null,
            page : 1,
            limit : 5,
            total : 0,
            teacherQuery : {}
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
            teacher.getTeacherList(this.page,this.limit,this.teacherQuery)
                .then(response  =>{
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log( this.list)
                    console.log( this.total)
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
        //删除讲师
        removeDataById(id) {
            this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                teacher.delTeacher(id)
                    .then(response  =>{
                        //删除成功
                    this.$message({type: 'success',message: '删除成功!'
                    });
                    this.getList()
                })
            })
        }

    }
    
}

</script>