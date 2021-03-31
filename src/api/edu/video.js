import request from '@/utils/request'

export default {
    addVideo(video) {
      return request({
        url: '/eduservice/edu-video/addEduVideo/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : video
      })
    },
    updateVideo(video) {
      return request({
        url: '/eduservice/edu-video/updateEduVideo/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : video
      })
    },
    delVideo(videoId) {
      return request({
        url: `/eduservice/edu-video/delEduVideo/${videoId}`,
        method: 'delete'
      })
    },
    getVideo(videoId) {
      return request({
        url: `/eduservice/edu-video/getVideo/${videoId}`,
        method: 'get'
      })
    },

} 