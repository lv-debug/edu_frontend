import request from '@/utils/request'

export default {
    getListChapter(courseId) {
      return request({
        url: `/eduservice/edu-chapter/getChapterVideo/${courseId}`,
        method: 'get'
      })
    }

} 