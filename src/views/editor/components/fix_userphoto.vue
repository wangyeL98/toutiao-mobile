<template>
  <div class="photo-container">
    <img :src="imgUrl" class="img" ref="img" />
    <div class="footer">
      <span class="text" @click="$emit('close')">取消</span>
      <span class="text" @click="finished">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { fixUserPhoto } from '@/api/user'
export default {
  name: 'PhotoIndex',
  props: {
    imgUrl: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    // console.log(cropper)
  },
  methods: {
    finished () {
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await fixUserPhoto(formData)
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
      })
    }
  }
}
</script>

<style scoped lang="less">
.photo-container {
  height: 100%;
  .img {
    max-width: 100%;
    display: block;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 30px;
    .text {
      padding: 20px;
    }
  }
}
</style>
