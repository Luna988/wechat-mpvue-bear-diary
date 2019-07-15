<template>
    <div class="news">
        <!-- {{count}}
        <button @click="$store.commit('add')">add</button>
        <button @click="$store.commit('reduce')">reduce</button> -->
        <!-- <button open-type="getUserInfo" @getuserinfo="bindgetuserinfo">用户授权</button> -->
        <!-- 文本输入 -->
        <div class="inputBox" v-if="setData.showMode === 'inputText'">
            <div class="txt">
                <input type="text" v-model="words">
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
        <div class="commonBox" v-if="setData.showMode === 'common'">
            <div class="group" v-for="(item,index) in aalist" :key="index">
                <div v-if="item.type == 'TEXT'">
                    {{item.content}}
                </div>
                <div v-if="item.type == 'IMAGE'">
                    <img :src="item.content" alt="">
                </div>
                <div v-if="item.type == 'VIDEO'">
                    <video :src="item.content"></video>
                </div>
            </div>
            <!-- <button @click="modifyAName('A餐馆')">提交数据</button> -->
        </div>

        <!-- <div > -->
        
            <action-sheet :hidden="setData.mediaActionSheetHidden" @click="mediaActionSheetChange">
                <div v-for="(item,index) in mediaActionSheetItems" :key="index">
                    <action-sheet-item class="action-item" @click="mediaActionSheetBinds(index)">
                        {{item}}
                    </action-sheet-item>
                </div>
                <action-sheet-cancel class='action-cacel'>取消</action-sheet-cancel>
            </action-sheet>
            
        <!-- </div> -->
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
import con from '../../utils/con.js';
import {mapState} from 'vuex';
// console.log(util);
// console.log(con);

export default {
    name: 'new',
    data () {
        return {
            aalist: [],
            words: '',
            IMAGE: 'IMAGE',
            VIDEO: 'VIDEO',
            // showLoading: true,//显示loading提示
            layoutColumnSize: 3,
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
                        nickName: '',
                    },
                    list: [
                        {
                            type: "TEXT",
                            content: '9月11日，15年的911事件使这天蒙上了特殊的意义。2016年的这一天，怀着激动的心情，开启了高原寻秘之旅，向着那圣洁之地出发。全程自驾近2000公里，雨崩徒步80公里，完成觐见之旅。',
                            poi: {
                                longitude: 117.2,
                                latitude: 37.5,
                                name: "北京市",
                            },
                            description: "",
                            id: 1,
                            commentNum: 0,
                            likeNum: 0,
                        },
                    ],
                },
                mediaActionSheetHidden: true,//点击多媒体插入按钮
                
            }, 
            
            // 多媒体文件插入action-sheet
            mediaActionSheetItems: ['拍照', '选择照片', '选择视频'],
            // mediaActionSheetBinds: [chooseImage, chooseImage, chooseVideo],
        }
    },
    mounted(){
        wx.setNavigationBarTitle({ title: '编辑日记' });//设置当前页面title
        let title = this.$root.$mp.query.title;//接收传递来的日记title
        this.setData.diary.meta.title = title;//日记数据title
        this.setData.diary.meta.create_time = util.formatNumber(new Date());//日记数据创建时间
        this.setData.diary.meta.cover = '';
        console.log(this.setData.diary);
        this.init();
    },
    computed: {

        ...mapState({
            count: state=>state.count
        })
    },
    
    methods: {
        // ...mapActions(
        //     ['modifyAName']
        // ),
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
        // 构造日记内容对象
        makeContent(type, content, description) {
            
            return  {
                type,
                content,
                description,
            }
        },
        
        mediaTouch() {// 点击多媒体插入按钮
            this.setData.isShowTab = false;
            this.setData.mediaActionSheetHidden = !this.setData.mediaActionSheetHidden;
            console.log(this.setData);
        },
        
        setDiary(diary) {// 设置日记数据
            let layout = util.listToMatrix(diary.list, this.layoutColumnSize);
            this.setData.diary = diary;
            this.setData.layoutList = layout;
            console.log('设置日记数据');
            console.log(this.setData.layoutList);
            this.saveDiary(diary);
            // this.setData({diary: diary, layoutList: layout});
            
        },
        
        saveDiary(diary) {// 保存日记
        console.log('保存日记');
            const key = con.storage.diaryListKey;
            app.getLocalDiaries(diaries => {
                diaries[diary.meta.title] = diary;
                wx.setStorage({key: key, data: diaries});
            })
        },
        clearInput() {// 清除正在输入文本
            this.words = '';
        },

        inputDone() {// 结束文本输入
            console.log(this.words);
            this.aalist.push(this.makeContent('TEXT', this.words, ''));
            this.setData.showMode = 'common';
            this.inputCancel();
        },

        inputTouch(event) {// 进入文本编辑模式
            this.setData.showMode = 'inputText';
            this.setData.isShowTab = false;
            console.log('进入文本编辑模式时的setData：：'+this.setData);
            
        },

        inputCancel() {// 取消文本编辑
            this.setData.isShowTab = true;
            this.setData.showMode = 'common';
            this.clearInput();
        },

        // 文本输入
        textInput(event) {
            console.log(event);
        },

        // 文本框获取到焦点
        focusInput(event) {
            console.log(event)
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
        
        
        mediaActionSheetChange(){
            this.setData.mediaActionSheetHidden = !this.setData.mediaActionSheetHidden;
            this.setData.isShowTab = true;
        },
        mediaActionSheetBinds(index){
            console.log(index);
            if(index == 0 || index == 1){
                this.chooseImage();
            }
            if(index == 2){
                this.chooseVideo();
            }
        },
        // 从相册选择照片或拍摄照片
        chooseImage() {
            console.log('从相册选择照片或拍摄照片')
            let that = this;
            wx.chooseImage({
                count: 9,  // 最多选9张
                sizeType: ['origin', 'compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    console.log(res)
                    // this.setData.mediaActionSheetHidden = true;
                    // this.showLoading('图片处理中...');
                    that.writeContent(res, this.IMAGE);
                }
            })
        },

        // 从相册选择视频文件
        chooseVideo() {
            console.log('从相册选择视频文件');
            let that = this;
            wx.chooseVideo({
                sourceType: ['album'],  // 仅从相册选择
                success: (res) => {
                    console.log(res)
                    // this.setData({ mediaActionSheetHidden: true });
                    // this.setData.mediaActionSheetHidden = true;
                    // this.showLoading('视频处理中...');
                    that.writeContent(res, this.VIDEO);
                }
            })
        },
        // 将图片或视频内容写入至日记对象
        writeContent(res, type) {
            let diary = this.setData.diary;
            console.log(diary);
            console.log('将图片或视频内容写入至日记对象');
            console.log(res);
            console.log(type);
            // console.log(res,type);
            // console.log(this.setData)
            // let diary = this.data.diary;

            if (type === 'IMAGE') {
                console.log('类型是图片');
                res.tempFilePaths.forEach((element, index, array) => {
                    // console.log(element);
                    // console.log(index);
                    // console.log(array);

                    // TODO 内容上传至服务器
                    // this.setData.diary.list.push(this.makeContent(type, element, ''))
                    this.aalist.push(this.makeContent(type, element, ''))
                console.log(this.aalist);

                });
            }

            if (type === 'VIDEO') {
                console.log('类型是视频');
                // TODO 内容上传至服务器
                // this.setData.diary.list.push(this.makeContent(type, res.tempFilePath, ''))
                this.aalist.push(this.makeContent(type, res.tempFilePath, ''))
                console.log(this.aalist);
            }

            // // 设置日记封面
            if (type === 'IMAGE' && !this.setData.diary.meta.cover) {
                console.log('封面');

                // this.seatData.diary.meta.cover = res.tempFilePaths[0];
                // this.setData({ 'diary.meta.cover': res.tempFilePaths[0] });
            }
            console.log(diary);
            // this.setDiary(diary);
            // this.hideLoading();
            // this.showTab();
        },
    }
}
</script>
<style lang="stylus">
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
    .commonBox{
        display flex;
        flex-wrap wrap;
        margin 10rpx;
        .group{
            display flex;
            width 230rpx;
            height 230rpx;
            background-color whiteColor;
            justify-content center;
            align-items center;
            margin 6rpx;
            div{
                width 230rpx;
                height 230rpx;

                image{
                    width 230rpx;
                    height 230rpx;
                }

            }
            
        }
    }

}
</style>
