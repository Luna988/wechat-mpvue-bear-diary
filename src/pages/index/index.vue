<template>
  <!-- <div @click="clickHandle">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>
  </div> -->
  <div>
    {{diaries[0].list[0].type}}
    <ul class="content" v-for="(items,index) in diaries" :key="index">
      <li @click="details" :id="index"> 
        <!-- {{items.list}} -->
        {{index}}
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
import card from '@/components/card'

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
    diaries () {
      return this.$store.state.diaries
    }
  },
  components: {
    card
  },

  methods: {
    //跳转至日记详情页
    details (event) {
      const url = '../mine/main?id=' + event.currentTarget.id
      wx.navigateTo({url})
    },

    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
  }
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
        border-radius 30rpax;

</style>

