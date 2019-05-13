<template>
    <div class="news">
        
        <scroll-view class="box">
            <div>
                <ul>
                    <li></li>
                </ul>
            </div>
            
        </scroll-view>
        <ul class="tabbar">
            <li @click="inputTouch">
                <img src="/static/images/tabbar/text.png" alt="">
            </li>
            <li>
                <img src="/static/images/tabbar/image.png" alt="">
            </li>
            <li>
                <img src="/static/images/tabbar/more.png" alt="">
            </li>
        </ul>
    </div>
</template>
<script>
import util from '../../utils/index.js';

export default {
    name: 'new',
    data () {
        return {
            setData: '',
            
            showMode: 'common',// 页面所处模式
            // show: false,
            // onClose() {
            //     this.setData({ show: false });
            // }
        }
    },
    
    mounted(){
        debugger
        wx.setNavigationBarTitle({ title: '编辑日记' });//设置当前页面title
        this.title = this.$root.$mp.query.title;//接收传递来的日记title
        console.log(title);
        
    },
    methods: {
        
        // 进入文本编辑模式
        inputTouch(event) {
            this.setData({ showMode: 'inputText' });
        },
        
    }
}
</script>
<style lang="stylus">
page {
    height 100%;
    width 100%;
    background-color backColor_02;
    .news{
        .box{
            width 100%;
            height 91%;
        }
        .tabbar{
            display flex;
            position fixed;
            bottom 0;
            left 0;
            right 0;
            flex-direction row;
            justify-content space-between;
            width 100%;
            height 8%;
            background-color whiteColor;
            li{
                display flex;
                justify-content center;
                align-items center;
                width 33.3%;
                img {
                    width 50rpx;
                    height 50rpx;
                }
            }
        }
    }
}
    
</style>
