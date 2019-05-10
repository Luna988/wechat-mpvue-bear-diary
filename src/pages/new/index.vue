<template>
    <div>
        <div>新增title页面-</div>
    </div>
</template>
<script>
export default {
    name: 'new',
    data () {
        return {
            // title: '',
        }
    },
    mounted(){
        // debugger
        wx.setNavigationBarTitle({ title: '编辑日记' });//设置当前页面title
        this.title = this.$root.$mp.query.title;//接收传递来的日记title
        console.log(title);
        this.init();
    },
    methods: {
        getPoi() {// 获得当前位置信息
        console.log()
            var that = this;
            wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                geo.mapRequest(
                'geocoder',
                { 'location': geo.formatLocation(res) },
                loc => {
                    let poi = {
                    'latitude': res.latitude,
                    'longitude': res.longitude,
                    'name': loc.result.address,
                    };
                    that.setData({ poi: poi });
                })
            }
            })
        },
        init() {// 数据初始化
        console.log('页面初始化。。。。。。')
            this.getPoi();
            // this.setMeta();
        },
    }
}
</script>
