<template>
  <div>
    {{count}}
    <button @click="axiosPost">发送https请求</button>
    <ul class="content" v-for="(items,index) in diaries" :key="index">
      <li @click="details" :id="index"> 
        <div>
          <img :src="items.meta.img" background-size="cover" alt="">
        </div>
        <div class="box">
          <div class="left">
            <p>{{items.meta.title}}</p>
            <p>{{items.meta.metaTime}}</p>
          </div>
          <div class="right">
            <p><img :src="items.meta.personImg" background-size="cover" alt=""></p>
            <p>{{items.meta.personName}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },
  computed: {
    ...mapState({
      diaries: state=>state.diaries,
      count: state=>state.count
    })
    // diaries () {
    //   return this.$store.state.diaries
    // }
  },
  methods: {
    axiosPost(){
      console.log(2222)
      wx.request({
        // url: 'http://localhost/getMeta1',
        url: 'https://elm.cangdu.org/v1/pois?city_id=1&keyword=迪士尼&type=search',

        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        data: {
          // meta: '23213'
        },
        success: function(res){
          console.log(res)
        },
        fail: function(err){

        }
      })
      
    },
    //跳转至日记详情页
    details (event) {
      // const url = '../mine/main?id=' + event.currentTarget.id
      const url = '../details/main?id=' + event.currentTarget.id
      wx.navigateTo({url})
    },
  },
}
</script>
<style lang="stylus" scoped>
.content
  width 100%;
  display flex;
  flex-direction column;
  align-items center;
  li
    margin 10rpx 20rpx;
  .box
    display flex;
    justify-content space-between;
    padding-bottom 20rpx;
    border-bottom bottom1;
    .left
      p:nth-child(1)
        font-size size16
        margin 5px 0
      p:nth-child(2)
        font-size size12
        color darkgrayColor
    .right
      display flex;
      flex-direction column;
      align-items center;
      font-size size12;
      color darkgrayColor
      img
        width 60rpx;
        height 60rpx;
        border-radius 50%;

</style>

