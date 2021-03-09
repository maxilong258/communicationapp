export default {
  friends() {
    const friendarr = [
      {
        id: 1,
        imgUrl: '12.png',
        tip: 1,
        name: '大海',
        email: '1121@nl.com',
        time: new Date(),
        message: 'lofi hiphop是伴随过我无数夜晚的音乐'
      },
      {
        id: 2,
        imgUrl: '1.png',
        tip: 1,
        name: '星空',
        email: '23123@nl.com',
        time: new Date(),
        message: 'Could not load content for http'
      },
      {
        id: 3,
        imgUrl: '2.png',
        tip: 1,
        name: '山川',
        email: '42134@nl.com',
        time: new Date(),
        message: '有时候写页面的过程中,会看到图片和内容之间有一定的间距'
      },
      {
        id: 4,
        imgUrl: '3.png',
        tip: 1,
        name: '河流',
        email: '2222@nl.com',
        time: new Date(),
        message: '可能是最适合学生党的大屏全能本！小米Redmibook Pro 15 上手体验'
      },
      {
        id: 5,
        imgUrl: '4.png',
        tip: 999,
        name: '白云',
        email: '6666@nl.com',
        time: new Date(),
        message: '如何在AWS上免费构建网站'
      },
      {
        id: 6,
        imgUrl: '5.png',
        tip: 1,
        name: '蓝天',
        email: '@nl.com',
        time: new Date(),
        message: '写作方式灵活的记叙类文学体裁'
      },
      {
        id: 7,
        imgUrl: '6.png',
        tip: 999,
        name: '街道',
        email: '7777@nl.com',
        time: new Date(),
        message: '线看《最后一课》被刀'
      },
      {
        id: 8,
        imgUrl: '7.png',
        tip: 999,
        name: '杨树',
        email: '525223528@nl.com',
        time: new Date(),
        message: '资本家秦公主榨干打工龟龟'
      },
      {
        id: 9,
        imgUrl: '8.png',
        tip: 0,
        name: '红花',
        email: '5423542@nl.com',
        time: new Date(),
        message: '明白'
      },
      {
        id: 10,
        imgUrl: '9.png',
        tip: 999,
        name: '树叶',
        email: 'ddf3@nl.com',
        time: new Date(),
        message: '您好'
      },
      {
        id: 11,
        imgUrl: '10.png',
        tip: 999,
        name: '溪流',
        email: '542352341fd@nl.com',
        time: new Date(),
        message: 'shaka surf'
      },
      {
        id: 12,
        imgUrl: '11.png',
        tip: 999,
        name: '沙滩',
        email: '45245r3@nl.com',
        time: new Date(),
        message: 'summer is hot same without you'
      }
    ]
    return friendarr
  },
  //好友关系
  isFriend() {
    const friend = [
      {
        userid: 1,
        friend: 2
      },
      {
        userid: 1,
        friend: 5
      },
      {
        userid: 1,
        friend: 6
      },
      {
        userid: 1,
        friend: 8
      }
    ]
    return friend
  }
}