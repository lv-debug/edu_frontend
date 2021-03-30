import request from '@/utils/request'

export default {
    getListChapter(courseId) {
      return request({
        url: `/eduservice/edu-chapter/getChapterVideo/${courseId}`,
        method: 'get'
      })
    },
    addChapter(chapter) {
      return request({
        url: '/eduservice/edu-chapter/addChapter/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : chapter
      })
    },
    updateChapter(chapter) {
      return request({
        url: '/eduservice/edu-chapter/updateChapter/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : chapter
      })
    },
    delChapter(chapterId) {
      return request({
        url: `/eduservice/edu-chapter/delChapter/${chapterId}`,
        method: 'delete'
      })
    },
    getChapter(chapterId) {
      return request({
        url: `/eduservice/edu-chapter/getChapter/${chapterId}`,
        method: 'get'
      })
    },

} 