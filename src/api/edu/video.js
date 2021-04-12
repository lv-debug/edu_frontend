import request from '@/utils/request'

export default {
    //新增小节
    addVideo(video) {
      return request({
        url: '/eduservice/edu-video/addEduVideo/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : video
      })
    },
    //修改小节
    updateVideo(video) {
      return request({
        url: '/eduservice/edu-video/updateEduVideo/',
        method: 'post',
        //data:表示转换为json数据传递,和后台requestBody对应
        data : video
      })
    },
    //删除小节
    delVideo(videoId) {
      return request({
        url: `/eduservice/edu-video/delEduVideo/${videoId}`,
        method: 'delete'
      })
    },
    //根据小节id查询
    getVideo(videoId) {
      return request({
        url: `/eduservice/edu-video/getVideo/${videoId}`,
        method: 'get'
      })
    },
    //删除阿里云视频
    removeAliyVod(videoId) {
      return request({
        url: `/eduvod/video/removeAliyVod/${videoId}`,
        method: 'delete'
      })
    },

} 