<template>
  <div class="details">
    <header :style="{backgroundImage: 'url(' + img + ')',backgroundSize: '100% 100%' }">
      <ul class="toolbar">
        <li v-for="(tools,index) in toolbar" :key="index">
          <img :src="tools.tool" alt="">
        </li>
      </ul>
      <!-- <div class="toolbar"><p v-for="(tools,index) in toolbar" :key="index"><img :src="tools.tool" alt=""></p></div> -->
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
    <!-- <div>
      <swiper
        :current="curr"
        display-multiple-items="1"
        next-margin="0rpx"
        class="fl prossgg marbtn50"
        v-if="urls.length > 0"
        @change='onSlideChangeEnd'
      >
      
          <block v-for="(item,ind) in urls" :key="ind+1">
          <swiper-item class="widssgg fl">
            <div class="dja" style="height:100%"><img  @click="previewImg(ind)" :src="item.img" :style="{'width':width || '750rpx','height':height || '420rpx'}" class="img" >

  </div>
            <div class="fixbt">
              <span class="fl">{{curr+1}}/{{urls.length}}</span>
              <span class="fr font28 dja closes"><i v-show="item.shoucan"><img src="/static/images/yishoucan.png" style="width:38rpx;height:38rpx;margin-right:5rpx;"/>收藏图片</i></span>
              <span class="fr font28 dja"><i v-show="!item.shoucan"><img src="/static/images/weishoucan.png" style="width:38rpx;height:38rpx;margin-right:5rpx;"/>收藏图片</i></span>
            </div>
          </swiper-item>
        </block>

      </swiper>
    </div> -->
  </div>
</template>
<script>
export default {
  name: '',
  data(){
    return {
      diary: '',
      img: '',
      personImg: '',
      metaTime: null,
      title: null,
      list: null,
      //图片预览模式
      previewMode: false,
      // 当前预览索引
      previewIndex: 0,
      toolbar: [
        {tool:'/static/images/nav/download.png'},
        {tool:'/static/images/nav/fav.png'},
        {tool:'/static/images/nav/share.png'},
        {tool:'/static/images/nav/comment.png'}
      ],
    }
  },
  computed: {
    diaries () {
      return this.$store.state.diaries
    },
  },
  mounted(){
    // console.log(this.$store.state.nihs);
    // console.log(this.id)
    let id = this.$root.$mp.query.id;
    this.diary = this.$store.state.diaries[id]
    // console.log(this.diary);
    //背景图片引入
    this.img = this.diary.meta.img;
    //头像
    this.personImg = this.diary.meta.personImg;
    // title
    this.title = this.diary.meta.title;
    //metaTime
    this.metaTime = this.diary.meta.metaTime;
    //当前对应的详情内容列表
    this.list = this.diary.list;
  },
  methods: {
    enterPreviewMode(event){
      console.log(event)
      // WeixinJSBridge.invoke('imagePreview', {
      //   'urls': [value],
      //   'current': value
      // });
    },
    // 过滤出预览图片列表
    // getMediaList() {
    //   if (typeof this.data.diary !== 'undefined' &&
    //     this.data.diary.list.length) {
    //     this.setData({
    //       mediaList: this.data.diary.list.filter(
    //         content => content.type === 'IMAGE'),
    //     })
    //   }
    // },
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


          
     
    

      
</style>
