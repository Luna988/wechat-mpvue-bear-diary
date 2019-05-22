<template>
  <div class="mine">
    <!-- 323213213--
    {{resturantName}} -->
    <button @click="modifyAName('A餐馆')">提交数据</button>
    <div class="model" :style="modalShowStyle">
      <div class="dialog">
        <p class="titles">请输入日记标题</p>
        <p class="dialogInput"><input  type="text" v-model="diaryTitle" placeholder="请输入日记标题"></p>
        <p class="dialogBtns">
          <button @click="touchAddNew">确定</button>
          <button @click="touchCancel">取消</button>
        </p>
      </div>
    </div>
    <header>
      <!-- logo部分 -->
      <div class="profile">
        <img class="avatar" :src="mines.userInfo.avatar" alt="">
        <div class="description">
          <p>{{mines.userInfo.nickname}} <span>{{mines.userInfo.sex}}</span></p>
          <p>{{mines.userInfo.meta}}</p>
        </div>
        <img @click="touchAdd" class="add" src="/static/images/icons/add.png" alt="">
      </div>
      <ul class="tablist">
        <li v-for="(items,index) in mines.tabs" :key="index" @click="touchTab(index)" :style="{color : highLightIndex == index ? '#54BFE2' : ''}">
          <img :src="highLightIndex == index ? items.iconActive : items.icon" alt="">
          <p>{{items.title}}</p>
        </li>
      </ul>
    </header>
    
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  name: 'mine',
  data () {
    return {
      highLightIndex: '0',// 高亮的标签索引
      modalShowStyle: "",// 模态对话框样式 
      diaryTitle: '',//待新建的日记标题
    }
  },
  computed: {
    // mines () {
    //   return this.$store.state.mines
    // },
    ...mapState({
      mines: state=>state.mines
    })
  },
  methods: {
    // ...mapActions(
    //         ['modifyAName']
    //     ),
    touchTab (event) {//tab切换
      let tabIndex = parseInt(event);//点击图片当前下标
      this.highLightIndex = tabIndex.toString();
    },
    touchAdd (event) {//添加
      this.modalShowStyle = "opacity:1;pointer-events:auto;";
    },
    hideModal () {//隐藏模态框
      this.modalShowStyle = ''
    },
    titleInput (event) {//标题输入事件
      this.diaryTitle = event.detail.value
    },
    clearTitle() {//清除日记标题
      this.diaryTitle = '';
    },
    touchCancel (event) {//取消标题输入
      this.hideModal();
      this.clearTitle();
    },
    touchAddNew (event) {//新建日记
      this.hideModal();
      // this.clearTitle();
      const url = '../new/main?title=' + this.diaryTitle;
      console.log('传递'+this.diaryTitle);
      // const url = '../new/main';
      wx.navigateTo({url})
    }
  }
}
</script>
<style lang="stylus" scoped>
  .mine{
    // font-size size26;
    header {
      // display none;
      height 130px;
      background whiteColor;
      .profile{
        height 50%;
        .avatar{
          width 50px;
          height 50px;
          float left;
          margin 7.5px 10px;
          border-radius 50%;
        }
        .description{
          display inline-block;
          margin 7.5px auto;
          height 50px;
          font-size size26;
          p{
            height 50%;
          }
        }
        .add{
          float right;
          margin 15px 10px;
          height 35px;
          width 35px;
        }
      }
      .tablist{
        display flex;
        hight 50%;
        // justify-content space-between;
        // align-items center
        font-size size12;
        text-align center;
        li{
          width 25%;
          height 50px;
          border-right 1px solid backColor_01;
          color #B3B3B3;
          img{
            width 25px;
            height 25px;
          }
        }
        li:last-child{
          border-right none;
        }
      }

    }
    .model{
      position fixed;
      top 0;
      left 0;
      bottom 0;
      right 0;
      background rgba(0,0,0,.5);
      z-index 99999;
      opacity 0;
      transition:opacity 400ms ease-in;
      pointer-events:none;
      display flex;
      justify-content center;
      align-items center;
      .dialog{
        width 84%;
        height 28%;
        background-color backColor_02;
        border-radius 4px;
        display flex;
        flex-direction column;
        justify-content space-between;
        .titles{
          display flex;
          justify-content center;
          align-items center;
          height 33%;
          font-size size16;
        }
        .dialogInput {
          padding 0 10px;
          font-size size14;
          // background-color red;
          input {
            background-color whiteColor;
            border-radius 4px;
            padding 10rpx 16rpx;
          }
        }
          
        .dialogBtns{
          display flex;
          justify-content space-between;
          flex-direction row;
          button{
            width 100%;
            border none;
          }
          button:first-child{
            color green;
          }
        }
      }
    }
  }
</style>


