import request from '@/utils/request'

export default {
    getAllsubject() {
        return request({
          url: `/eduservice/edu-subject/getAllsubject`,
          method: 'get'
        })
    }
} 
