import request from '@/utils/request'

export default {
  // 添加课程
  addCourse(course) {
    return request({
      url: '/eduservice/edu-course/addCourseInfo/',
      method: 'post',
      //data:表示转换为json数据传递,和后台requestBody对应
      data : course
    })
  },

  // 查询所有讲师
  getListTeacher() {
    return request({
      url: '/eduservice/edu-teacher/findAllTeacher/',
      method: 'get'
    })
  },

  //根据id查询课程基本信息
  getCourseInfoByCourseId(courseId) {
    return request({
      url: `/eduservice/edu-course/getCourseInfo/${courseId}`,
      method: 'get'
    })
  },

  //修改课程
  updateCourse(course) {
    return request({
      url: '/eduservice/edu-course/updateCourseInfo/',
      method: 'post',
      //data:表示转换为json数据传递,和后台requestBody对应
      data : course
    })
  },

} 