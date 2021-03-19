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
  },
  fmessage() {
    const msgs = [
      {
        id: 'a',
        imgUrl: '5.png',
        message: { voice: 'a', time: 60 },
        types: 2,
        time: new Date(),
        tip: 15
      },
      {
        id: 'b',
        imgUrl: '7.png',
        message: { voice: 'a', time: 20 },
        types: 2,
        time: new Date(),
        tip: 16
      },
      {
        id: 'a',
        imgUrl: '5.png',
        message: 'lofi/jazz hiphop chillhop和一些爵士纯音都有',
        types: 0,
        time: new Date() - 1000,
        tip: 0
      },
      {
        id: 'a',
        imgUrl: '5.png',
        message: '不要为自己设置不可能完成的任务',
        types: 0,
        time: new Date() - 1000 * 16,
        tip: 1
      },
      {
        id: 'b',
        imgUrl: '7.png',
        message: '您的日常工作会变得越来越忙，您会陷入激烈的竞争中，并耗尽自己的能量',
        types: 0,
        time: new Date() - 1000 * 60,
        tip: 2
      },
      {
        id: 'a',
        imgUrl: '5.png',
        message: 'hello',
        types: 0,
        time: new Date() - 1000 * 60 * 36,
        tip: 3
      },
      {
        id: 'a',
        imgUrl: '5.png',
        message: '古人说，活到老，学到老。终身学习应该是您的座右铭。',
        types: 0,
        time: new Date() - 1000 * 60 * 40,
        tip: 4
      },
      {
        id: 'b',
        imgUrl: '7.png',
        message: '12.png',
        types: 1,
        time: new Date() - 1000 * 60 * 57,
        tip: 5
      },
      {
        id: 'a',
        imgUrl: '5.png',
        message: '您只有保证了足够的技能储备，才能确保能够得到一份足够满意的工作',
        types: 0,
        time: new Date() - 1000 * 60 * 58,
        tip: 6
      },
      {
        id: 'b',
        imgUrl: '7.png',
        message: '3.png',
        types: 1,
        time: new Date() - 1000 * 60 * 60,
        tip: 7
      },
      {
        id: 'b',
        imgUrl: '7.png',
        message: '从现在做起，做好当前的工作, 一定要确定你目前所做的工作不是因假设得来的。那样会浪费您很多时间和才华',
        types: 0,
        time: new Date() - 1000 * 60 * 58 * 24,
        tip: 8
      },
      {
        id: 'a',
        imgUrl: '5.png',
        message: '超过50%的工作都是通过关系网络获得的',
        types: 0,
        time: new Date() - 1000 * 60 * 56 * 24,
        tip: 9
      },
      {
        id: 'a',
        imgUrl: '5.png',
        message: '1.png',
        types: 1,
        time: new Date() - 1000 * 60 * 56 * 240,
        tip: 10
      },
      {
        id: 'b',
        imgUrl: '7.png',
        message: '目标',
        types: 0,
        time: new Date() - 1000 * 60 * 56 * 241,
        tip: 11
      },
      {
        id: 'b',
        imgUrl: '7.png',
        message: '定期持续对其更新',
        types: 0,
        time: new Date() - 1000 * 60 * 56 * 243,
        tip: 12
      },
      {
        id: 'a',
        imgUrl: '5.png',
        message: '不要让繁忙的工作扼杀您的梦想',
        types: 0,
        time: new Date() - 1000 * 60 * 60 * 244,
        tip: 13
      },
      {
        id: 'b',
        imgUrl: '7.png',
        message: '假如您有着更高远的目标，请现在就付诸行动吧',
        types: 0,
        time: new Date() - 1000 * 60 * 60 * 248,
        tip: 14
      }
    ]
    return msgs
  }
}