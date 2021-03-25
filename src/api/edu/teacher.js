import request from '@/utils/request'

export default {
    getTeacherList(current, limit, teacherQuery) {
        return request({
          url: `/eduservice/edu-teacher/pageTeacherQuery/${current}/${limit}`,
          method: 'post',
          //data:表示转换为json数据传递,和后台requestBody对应
          data : teacherQuery
        })
    },
    //删除讲师
    delTeacher(id) {
      return request({
        url: `/eduservice/edu-teacher/${id}`,
        method: 'delete',
      })
    },
    //添加讲师
    addTeacher(teacher) {
      return request({
        url: '/eduservice/edu-teacher/addTeacher/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : teacher
      })
    },
    //根据id获取讲师
    getTeacherById(id) {
      return request({
        url: `/eduservice/edu-teacher/getTeacher/${id}`,
        method: 'get'
      })
    },
    //修改讲师
    updTeacher(teacher) {
      return request({
        url: '/eduservice/edu-teacher/updTeacher/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : teacher
      })
    }
    

} 
