<template>
  <div class="details">
    <header :style="{backgroundImage: 'url(' + backImg + ')',backgroundSize: '100% 100%' }">
      <!-- 顶部 -->
      <ul class="toolbar">
        <li v-for="(tools,index) in toolbar" :key="index">
          <img :src="tools.tool" alt="">
        </li>
      </ul>
      <div class="titles">
        <img :src="personImg" alt="">
        <div>
          <p>{{title}}</p>
          <p>{{metaTime}}</p>
        </div>
      </div>
    </header>
    <!-- 正文部分 -->
    <ul class="content" v-for="(items,index) in list" :key="index">
      <li class="contentChild">
        <div class="texts" v-if="items.type === 'TEXT'">{{items.content}}</div>
        <div class="imgs" v-if="items.type === 'IMAGE'"><img @click="enterPreviewMode(items.content)" :src="items.content" alt=""></div>
        <!-- <div class="imgs" v-if="items.type === 'IMAGE'">
          <img @click="enterPreviewMode(items.content)" :src="items.content" alt="">
        </div> -->
        <div class="video" v-if="items.type === 'VIDEO'"><video :src="items.content"></video></div>
        <div class="remarks">
          <div class="left">
            <img src="/static/images/icons/poi.png" alt="">
            <p>{{items.poi.name}}</p>
          </div>
          <ul class="right">
            <li>
              <img src="/static/images/icons/like.png" alt="">
              <p>{{items.likeNum}}</p>
            </li>
            <li>
              <img src="/static/images/icons/comment.png" alt="">
              <p>{{items.commentNum}}</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <!-- 图片预览模块 -->
    <div class="swipeContainer" @click="leavePreviewMode" :style="{display : previewMode ? 'block' : 'none'  }">
      <swiper :images="imagesArray" :currentIndex="currentIndex"></swiper>
    </div>
  </div>
</template>
<script>
import swiper from '@/components/swiper';
import {mapState} from 'vuex';
export default {
  components: {swiper},
  name: '',
  data(){
    return {
      diary: '',//当前页面diary数据
      backImg: '',//header部分 背景图片
      personImg: '',//头像icon
      metaTime: null,//记录时间
      title: null,//记录title
      list: null,//正文数据
      toolbar: [//头部toolbar
        {tool:'/static/images/nav/download.png'},
        {tool:'/static/images/nav/fav.png'},
        {tool:'/static/images/nav/share.png'},
        {tool:'/static/images/nav/comment.png'}
      ],
      previewMode: false,// 图片预览模式
      imagesArray: [],//swiper的图片数据
      currentIndex: '',//当前点击图片的索引
    }
  },
  computed: {
    ...mapState({
      diaries: state=>state.diaries
    })
    // diaries () {
    //   return this.$store.state.diaries
    // },
  },
  mounted(){
    this.previewMode = false;
    let id = this.$root.$mp.query.id;//删选数据源（接收上一个页面传来的辨识id）
    this.diary = this.$store.state.diaries[id];//帅选后的数据
    this.backImg = this.diary.meta.img;//背景图片引入
    this.personImg = this.diary.meta.personImg;//头像
    this.title = this.diary.meta.title;// title
    this.metaTime = this.diary.meta.metaTime;//metaTime
    this.list = this.diary.list;//当前对应的详情内容列表
    this.imagesArray = this.list.filter(//过滤页面所包含的所有图片
      content => content.type === 'IMAGE'
    );
  },
  methods: {
    enterPreviewMode(event){
      this.previewMode = !this.previewMode;//是否查看图片
      for (let i=0;i<this.imagesArray.length;i++) {
        if(this.imagesArray[i].content == event){
          this.currentIndex = i;
        }
      }
    },
    leavePreviewMode(){
      this.previewMode = !this.previewMode;
    }
  },
  
}
</script>
<style lang="stylus" scoped>
  mrg_5 = 5rpx;
  .details 
    font-size size26;
    header
      height 400rpx;
      .toolbar{
        height 60rpx;
        position fixed;
        top 0;
        right 0;
        display flex;
        justify-content space-between;
        align-items center;
        li{
          margin 10rpx 20rpx;
          img{
            width 40rpx;
            height 40rpx;
          }
        }
      }
      .titles
        position absolute;
        height 120rpx;
        top 280rpx;
        display flex;
        img   
          width 80rpx;
          height 80rpx;
          border-radius 50%;
          margin 20rpx;
        div
          color whiteColor;
          margin 20rpx 0;
          display flex;
          flex-direction column
          p 
            padding 5rpx 0;
    .content 
      .contentChild
        padding 10rpx;
        border-bottom bottom1;
        .texts 
          margin-top 15px;
          line-height 40rpx;
        .imgs img,.video video
          width 730rpx;
        .remarks{
          height 60rpx;
          margin-top 10rpx;
          font-size 22rpx;
          color darkgrayColor_02;
          display flex;
          justify-content space-between;
          align-items center;
          img{
            width 20rpx;
            height 20rpx;
          }
          .left{
            margin 10rpx 0;
            height 40rpx;
            p{
              margin-left mrg_5;
              display inline-block;
            }
          }
          .right{
            display flex;
            
            font-size 20rpx;
            li{
              padding mrg_5 10rpx;
              margin 0 10rpx;
              background-color backColor_01
              p{
                display inline-block;
                margin-left mrg_5;
              }
            }
          }
        }
    // .swipeContainer{
    //   position fixed;
    //   left 0;
    //   top 0;
    //   width 100%;
    //   height 100%;
    //   background-color #000;
    //   .swiper{
    //     position absolute;
    //     top 50px;
    //   }
    // }



          
     
    

      
</style>
