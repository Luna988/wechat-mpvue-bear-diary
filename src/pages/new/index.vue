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
            
            diary: {// 日记对象
                meta: {},
                list: [],
            },
            showMode: 'common',// 页面所处模式
            // show: false,
            // onClose() {
            //     this.setData({ show: false });
            // }
            
            showTab: true,// 是否显示底部tab栏
        }
    },
    
    mounted(){
        wx.setNavigationBarTitle({ title: '编辑日记' });//设置当前页面title
        let title = this.$root.$mp.query.title;//接收传递来的日记title
        console.log('接收传递来的日记title::'+title);
        this.init();
    },
    
    methods: {
       
        setMeta() { // 构造日记meta信息
            var that = this;
            console.log('11231213')
            // app.getUserInfo(info => {
            //     that.setData.diary.meta.avatar = info.avatarUrl;
            //     that.setData.diary.meta.nickName = info.nickName;
            //     console.log('构造日记meta信息setData：：'+this.setData);
            //     // that.setData({
            //     //     'diary.meta.avatar': info.avatarUrl,
            //     //     'diary.meta.nickName': info.nickName,
            //     // })
            // })
        },
        
        inputTouch(event) {// 进入文本编辑模式
            // this.setData.showMode = 'inputText'
            
            // this.setData({ showMode: 'inputText' });
            this.setData('showMode','inputText');
            console.log('进入文本编辑模式时的setData：：'+this.setData);
        },
         
        showTab() {// 显示底部tab
            // this.setData({ showTab: true });
            console.log('显示底部tabsetData：：'+this.setData);
        },
        init(){//数据初始化
            this.setMeta();
            console.log('init函数执行了')
        }
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
