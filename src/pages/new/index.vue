<template>
    <div class="news">
        <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo">用户授权</button>
        <!-- 文本输入 -->
        <!-- <ul class="box" v-if="setData.showMode === 'inputText'">
            <li class="txt" >
                文本输入
                <input type="text">
            </li>
            <li v-if="setData.showMode === 'IMAGE'">
                插入图片
            </li>
            <li v-if="setData.showMode === 'VIDEO'">
                video
            </li>
        </ul> -->
        <div class="inputBox" v-if="setData.showMode === 'inputText'">
            <div class="txt">
                <input type="text">
            </div>
            <ul class="tabbar">
                <li style="width:50%" @click="inputCancel">
                    <img src="/static/images/tabbar/cancel.png" alt="">
                </li>
                <li style="width:50%" @click="inputDone">
                    <img src="/static/images/tabbar/ok.png" alt="">
                </li>
            </ul>
        </div>
        <!-- 拍照, 选择照片, 选择视频 -->
        <div >
            拍照, 选择照片, 选择视频
            <action-sheet :hidden="mediaActionSheetHidden" @click="mediaActionSheetChange">
                <div v-for="(item,index) in mediaActionSheetItems" :key="index">
                    <action-sheet-item class="action-item" @click="mediaActionSheetBinds[index]">
                        {{item}}
                    </action-sheet-item>
                </div>
                <action-sheet-cancel class='action-cacel'>取消</action-sheet-cancel>
            </action-sheet>
        </div>
        <!-- 刚进入页面的tabbar选择 -->
        <ul class="tabbar" :style="{display : setData.isShowTab ? 'flex' : 'none'}">
            <li @click="inputTouch">
                <img src="/static/images/tabbar/text.png" alt="">
            </li>
            <li @click="mediaTouch">
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
console.log(util)
export default {
    name: 'new',
    data () {
        return {
            // showLoading: true,//显示loading提示
            setData: {//数据
                showMode: 'common',// 页面所处模式
                isShowTab: true,//显示底部tab
                // showLoading: true,//显示loading提示
                diary: { //日记数据
                    meta: {
                        title: '',//日记标题
                        create_time: '',//创建时间
                        cover: '',//日记封面
                        avatar: '',
                        nickName: ''
                    }
                },
                layoutList: [],// 日记内容布局列表（2x2矩阵）
                inputStatus: {//正在输入的文本
                    row: 0,
                    common: 0,
                    lines: [''],
                    mode: 'INPUT',
                    auto: false,
                },
                // inputStatus: {//输入模式
                //     lines: lines,
                //     row: row,
                //     mode: 'INPUT',
                //     auto: true,  // // 自动换行的则处于输入模式
                // },
                poi: null,
                // mediaActionSheetHidden: true,//点击多媒体插入按钮
                mediaActionSheetHidden: false,//点击多媒体插入按钮
                
            }, 
            
            // 多媒体文件插入action-sheet
            mediaActionSheetItems: ['拍照', '选择照片', '选择视频'],
        }
    },
    
    mounted(){
        wx.setNavigationBarTitle({ title: '编辑日记' });//设置当前页面title
        let title = this.$root.$mp.query.title;//接收传递来的日记title
        console.log('接收传递来的日记title::'+title);
        this.setData.diary.meta.title = title;//日记数据title
        this.setData.diary.meta.create_time = util.formatNumber(new Date());;//日记数据创建时间
        console.log(this.setData)
        this.init();
    },
    
    methods: {
        bindgetuserinfo(event){//用户授权
            this.setData.diary.meta.avatar = event.target.userInfo.avatarUrl;//日记数据头像地址
            this.setData.diary.meta.nickName = event.target.userInfo.nickName;//日记数据昵称
            console.log(this.setData);
            console.log(event);
            // console.log(event.target.userInfo.avatarUrl);//获取头像地址
            // console.log(event.target.userInfo.nickName);//获取昵称
            // console.log(event.target.userInfo.gender);//获取性别（2：女；）
            // console.log(event.target.userInfo.country);//获取国家
            // console.log(event.target.userInfo.province);//获取省份
            // console.log(event.target.userInfo.city);//获取城市
        },
        inputTouch(event) {// 进入文本编辑模式
            this.setData.showMode = 'inputText';
            this.setData.isShowTab = false;
            console.log('进入文本编辑模式时的setData：：'+this.setData);
            
        },
        
        mediaTouch() {// 点击多媒体插入按钮
            // this.setData.mediaActionSheetHidden = true;
            this.setData.isShowTab = false;
            this.setData.mediaActionSheetHidden = true;
            console.log('点击多媒体插入按钮时的setData：：'+this.setData);
        },
        
        setDiary(diary) {// 设置日记数据
            let layout = util.listToMatrix(diary.list, layoutColumnSize);
            this.setData.diary = diary;
            this.setData.layoutList = layout;
            this.saveDiary(diary);
            // this.setData({diary: diary, layoutList: layout});
            
        },
        
        saveDiary(diary) {// 保存日记
        console.log('保存日记')
            // const key = config.storage.diaryListKey;

            // app.getLocalDiaries(diaries => {
            // diaries[diary.meta.title] = diary;
            // wx.setStorage({key: key, data: diaries});
            // })
        },
        clearInput() {// 清除正在输入文本
            this.setData.inputStatus.row = 0;
            this.setData.inputStatus.common = 0;
            this.setData.inputStatus.lines = [''];
            this.setData.inputStatus.mode = 'INPUT';
            this.setData.inputStatus.auto = false;
        },
        setMeta() { // 构造日记meta信息

        },
        init(){//数据初始化
            this.setMeta();
            console.log('init函数执行了')
        },
        
        showTab() {// 显示底部tab
            this.setData.isShowTab = true;
        },
        hideTab() {// 隐藏底部tab
            this.setData.isShowTab = false;
        },
        
        inputCancel() {// 取消文本编辑
            this.setData.isShowTab = true;
            this.setData.showMode = 'common';
            this.clearInput();
        },
        
        inputDone() {// 结束文本输入
            let text = this.setData.inputStatus.lines.join('\n');
            let diary = this.setData.diary;
            if (text) {
                diary.list.push(this.makeContent(TEXT, text, ''));
                this.setDiary(diary);
            }

            console.log(this.setData);
            this.inputCancel();
        },
    }
}
</script>
<style lang="stylus">
// page {
    // height 100%;
    // width 100%;
    // background-color backColor_02;
    .news{
        height 100%;
        width 100%;
        background-color backColor_02;
        .inputBox{
            height: 80%;
            background-color: backColor_02;
            background-image: linear-gradient(#E1E6EA .1em, transparent .1em);
            background-size: 100% 48rpx;
            padding: 0;
            box-sizing: border-box;
            margin: 0 10rpx;

            .txt{
                height 23px;
                input {
                    height: 47rpx;
                    max-height: 47rpx;
                    font-size: 28rpx;
                    margin: 0px;
                }
            } 
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
// }
    
</style>
