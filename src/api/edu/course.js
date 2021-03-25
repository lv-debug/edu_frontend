import request from '@/utils/request'

export default {
    addCourse(course) {
      return request({
        url: '/eduservice/edu-course/addCourseInfo/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : course
      })
    },
    getListTeacher() {
      return request({
        url: '/eduservice/edu-teacher/findAllTeacher/',
        method: 'get'
      })
    }

} 