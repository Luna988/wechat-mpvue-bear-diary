<template>
  <div class="details">
    <header :style="{backgroundImage: 'url(' + img + ')',backgroundSize: '100% 100%' }">
      <div>toolbar</div>
      <div class="titles">
        <img :src="personImg" alt="">
        <div>
          <p>{{title}}</p>
          <p>{{metaTime}}</p>
        </div>
      </div>
    </header>
    <ul>
      列表详情
      <li>{{list}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: '',
  data(){
    return {
      diary: '',
      img: null,
      personImg: null,
      metaTime: null,
      title: null,
      list: null,
    }
  },
  computed: {
    diaries () {
      return this.$store.state.diaries
    },
  },
  mounted(){
    console.log(this.$store.state.nihs);
    // console.log(this.id)
    let id = this.$root.$mp.query.id;
    this.diary = this.$store.state.diaries[id]
    console.log(this.diary);
    //背景图片引入
    this.img = this.diary.meta.img;
    //头像
    this.personImg = this.diary.meta.personImg;
    // title
    this.title = this.diary.meta.title;
    //metaTime
    this.metaTime = this.diary.meta.metaTime;
    //当前对应的详情内容列表
    this.list = this.diary.list[0].type
  }
}
</script>
<style lang="stylus" scoped>
  .details 
    header 
      .titles
        img   
          width 60rpx;
          height 60rpx;
          border-radius 30rpax;
      
</style>
