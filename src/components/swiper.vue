<template>
    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :current="currentIndex">
        <block v-for="(item, index) in images" :key="index">
            <swiper-item>
                <image :src="item.content" class="slide-image" mode="aspectFill"/>
            </swiper-item>
        </block>
    </swiper> 
</template>

<script>
export default {
  props: {
    //接收的图片数组
    images: {
      type: Array
    },
    //当前预览索引
    currentIndex: ''
  },
  watch:{
    currentIndex: function(value,oldValue){
      console.log('swiper里面的'+value+oldValue);
    }
  },
  data() {
    return {
      indicatorDots: true,
      autoplay: false,
      interval: 3000,
      duration: 500
    };
  }
};
</script>

<style lang="stylus" scoped>
.swiper {
    position fixed;
    left 0;
    top 0;
    width 100%;
    height 100%;
    background-color #000;
    ._swiper-item{
        top 50% !important ;
        margin-top -120px !important;
        .slide-image{
          width 100%;
        }
    }
}

</style>