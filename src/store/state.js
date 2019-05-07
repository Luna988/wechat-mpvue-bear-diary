const state = {
    userId: 'gsgedfg', //用户ID
    nihs: '一血',
    diaries: [//日记
        {
          meta: {
            img: '/static/images/imgs/banner_01.jpg',
            personImg: '/static/images/imgs/own.jpg',
            personName: '多多益善',
            title: '我是个老中医',
            metaTime: '2016.4.4',
            createTime: '2016.4.5 11:20:20'
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
              {
                  type: "IMAGE",
                  content: 'http://p.chanyouji.cn/1473699595/1740E45C-D5AF-497E-A351-06E5BA22B1A3.jpg',
                  poi: {
                      longitude: 117.2,
                      latitude: 37.5,
                      name: "深圳市",
                  },
                  description: "深圳宝安国际机场",
                  id: 2,
                  commentNum: 1,
                  likeNum: 5,
              },
              {
                type: "IMAGE",
                content: 'http://p.chanyouji.cn/1473699603/7C3B253F-0A31-4754-B042-E04115F2C931.jpg',
                poi: {
                  longitude: 117.2,
                  latitude: 37.5,
                  name: "丽江三义机场",
                },
                description: "丽江三义机场",
                id: 2,
                commentNum: 1,
                likeNum: 5,
              },
              {
                type: "TEXT",
                content: ' 玉水寨在白沙溪镇，是纳西族中部地区的东巴圣地，是丽江古城的溯源。\n\nTips:门票50元/人，游玩时间2小时。',
                poi: {
                  longitude: 117.2,
                  latitude: 37.5,
                  name: "玉水寨",
                },
                description: "",
                id: 1,
                commentNum: 0,
                likeNum: 0,
              },
              {
                type: "IMAGE",
                content: 'http://p.chanyouji.cn/1473685830/2A48B40F-1F11-498D-ABD2-B0EDCD09F776.jpg',
                poi: {
                  longitude: 117.2,
                  latitude: 37.5,
                  name: "玉水寨",
                },
                description: "阳光下的玉水寨",
                id: 2,
                commentNum: 1,
                likeNum: 5,
              },
              {
                type: "VIDEO",
                content: 'http://flv.bn.netease.com/videolib3/1605/22/auDfZ8781/HD/auDfZ8781-mobile.mp4',
                poi: {
                  longitude: 117.2,
                  latitude: 37.5,
                  name: "深圳宝安国际机场",
                },
                description: "",
                id: 2,
                commentNum: 10,
                likeNum: 200,
              },
          ]
        },
        {
          meta: {
            img: '/static/images/imgs/banner_02.jpg',
            personImg: '/static/images/imgs/own.jpg',
            personName: '多多益善',
            title: '专治老中医',
            metaTime: '2016.4.4',
            createTime: '2016.4.5 11:20:20'
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
              {
                  type: "IMAGE",
                  content: 'http://p.chanyouji.cn/1473699595/1740E45C-D5AF-497E-A351-06E5BA22B1A3.jpg',
                  poi: {
                      longitude: 117.2,
                      latitude: 37.5,
                      name: "深圳市",
                  },
                  description: "深圳宝安国际机场",
                  id: 2,
                  commentNum: 1,
                  likeNum: 5,
              },
              {
                type: "IMAGE",
                content: 'http://p.chanyouji.cn/1473699603/7C3B253F-0A31-4754-B042-E04115F2C931.jpg',
                poi: {
                  longitude: 117.2,
                  latitude: 37.5,
                  name: "丽江三义机场",
                },
                description: "丽江三义机场",
                id: 2,
                commentNum: 1,
                likeNum: 5,
              },
              {
                type: "TEXT",
                content: ' 玉水寨在白沙溪镇，是纳西族中部地区的东巴圣地，是丽江古城的溯源。\n\nTips:门票50元/人，游玩时间2小时。',
                poi: {
                  longitude: 117.2,
                  latitude: 37.5,
                  name: "玉水寨",
                },
                description: "",
                id: 1,
                commentNum: 0,
                likeNum: 0,
              },
              {
                type: "IMAGE",
                content: 'http://p.chanyouji.cn/1473685830/2A48B40F-1F11-498D-ABD2-B0EDCD09F776.jpg',
                poi: {
                  longitude: 117.2,
                  latitude: 37.5,
                  name: "玉水寨",
                },
                description: "阳光下的玉水寨",
                id: 2,
                commentNum: 1,
                likeNum: 5,
              },
              {
                type: "VIDEO",
                content: 'http://flv.bn.netease.com/videolib3/1605/22/auDfZ8781/HD/auDfZ8781-mobile.mp4',
                poi: {
                  longitude: 117.2,
                  latitude: 37.5,
                  name: "深圳宝安国际机场",
                },
                description: "",
                id: 2,
                commentNum: 10,
                likeNum: 200,
              },
          ]
        }
      ],
};
export default state;