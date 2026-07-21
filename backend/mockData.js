const { db, saveData, generateId } = require('./data');
const dayjs = require('dayjs');

function initMockData() {
  if (db.managers.length > 0) {
    console.log('数据已存在，跳过初始化');
    return;
  }

  const managers = [
    {
      id: generateId(),
      name: '林星瑶',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20young%20asian%20woman%20portrait%20kpop%20idol%20style%20soft%20lighting%20professional%20photo&image_size=square_hd',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20store%20interior%20modern%20clothing%20boutique%20warm%20lighting%20aesthetic&image_size=landscape_16_9',
      bio: '人气短剧女主 | 甜系天花板 | 一日店长常驻嘉宾',
      followers: 125800,
      following: 328,
      tags: ['甜妹', '短剧演员', '时尚达人'],
      level: '金牌店长',
      totalActivities: 24,
      rating: 4.9
    },
    {
      id: generateId(),
      name: '顾言琛',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handsome%20young%20asian%20man%20portrait%20korean%20actor%20style%20professional%20photo%20soft%20lighting&image_size=square_hd',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20shop%20cafe%20interior%20modern%20minimalist%20warm%20atmosphere&image_size=landscape_16_9',
      bio: '颜值博主 | 咖啡爱好者 | 手冲咖啡师',
      followers: 89600,
      following: 215,
      tags: ['帅哥', '咖啡', '生活方式'],
      level: '人气店长',
      totalActivities: 18,
      rating: 4.8
    },
    {
      id: generateId(),
      name: '苏沐橙',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20young%20asian%20girl%20cosplay%20anime%20style%20pink%20hair%20kawaii%20portrait&image_size=square_hd',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20merchandise%20store%20colorful%20cute%20aesthetic%20pop%20culture%20shop&image_size=landscape_16_9',
      bio: '二次元Coser | 动漫博主 | 潮玩收藏家',
      followers: 156000,
      following: 412,
      tags: ['Cosplay', '二次元', '潮玩'],
      level: '金牌店长',
      totalActivities: 31,
      rating: 4.95
    },
    {
      id: generateId(),
      name: '陈亦辰',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handsome%20young%20chinese%20man%20fashion%20model%20street%20wear%20style%20portrait&image_size=square_hd',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=streetwear%20fashion%20store%20urban%20style%20sneakers%20display%20modern&image_size=landscape_16_9',
      bio: '潮流穿搭博主 | 球鞋收藏家 | 街头文化爱好者',
      followers: 203000,
      following: 189,
      tags: ['潮流', '球鞋', '街头文化'],
      level: '顶流店长',
      totalActivities: 42,
      rating: 4.92
    },
    {
      id: generateId(),
      name: '周若汐',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20young%20asian%20woman%20beauty%20influencer%20makeup%20professional%20portrait&image_size=square_hd',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beauty%20cosmetics%20store%20luxury%20makeup%20display%20pink%20elegant%20interior&image_size=landscape_16_9',
      bio: '美妆博主 | 彩妆师 | 护肤达人',
      followers: 178000,
      following: 256,
      tags: ['美妆', '护肤', '彩妆'],
      level: '金牌店长',
      totalActivities: 28,
      rating: 4.88
    },
    {
      id: generateId(),
      name: '张一凡',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sporty%20young%20asian%20man%20fitness%20trainer%20athletic%20healthy%20portrait&image_size=square_hd',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sports%20store%20gym%20equipment%20sneakers%20athletic%20wear%20modern%20interior&image_size=landscape_16_9',
      bio: '健身达人 | 运动博主 | 篮球爱好者',
      followers: 95000,
      following: 178,
      tags: ['运动', '健身', '篮球'],
      level: '人气店长',
      totalActivities: 15,
      rating: 4.75
    }
  ];

  db.managers = managers;

  const today = dayjs();
  const activities = [
    {
      id: generateId(),
      managerId: managers[0].id,
      title: '林星瑶の甜心奶茶店一日店长',
      description: '甜系女神林星瑶空降「蜜雪时光」，亲手为你调制专属奶茶！\n\n活动亮点：\n✨ 星瑶亲手调制限定款奶茶\n📸 一对一合影机会（消费满99元）\n🎁 限量签名周边免费送\n💬 近距离互动聊天',
      storeName: '蜜雪时光 · 南京东路旗舰店',
      storeAddress: '上海市黄浦区南京东路300号恒基名人购物中心1层',
      category: '餐饮奶茶',
      date: today.format('YYYY-MM-DD'),
      startTime: '10:00',
      endTime: '18:00',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20milk%20tea%20shop%20pink%20aesthetic%20kawaii%20bubble%20tea%20storefront&image_size=landscape_16_9',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bubble%20tea%20pink%20strawberry%20latte%20cute%20aesthetic%20drink&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kawaii%20cafe%20interior%20pastel%20pink%20white%20decor&image_size=square_hd'
      ],
      price: 0,
      originalPrice: 0,
      totalTickets: 200,
      soldTickets: 156,
      minConsumption: 39,
      perks: ['免费入场', '消费满99元合影', '限量周边'],
      status: 'ongoing',
      hot: 9876
    },
    {
      id: generateId(),
      managerId: managers[1].id,
      title: '顾言琛手冲咖啡品鉴会',
      description: '颜值咖啡博主顾言琛亲临「漫咖啡」，带你品鉴精品手冲的魅力！\n\n活动内容：\n☕ 精选三款单品豆品鉴\n🎯 手冲咖啡教学体验\n📷 专属合影打卡\n📝 咖啡知识分享',
      storeName: 'M Stand Coffee · 静安寺店',
      storeAddress: '上海市静安区南京西路1788号国际中心1层',
      category: '咖啡饮品',
      date: today.format('YYYY-MM-DD'),
      startTime: '14:00',
      endTime: '20:00',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=specialty%20coffee%20shop%20aesthetic%20latte%20art%20cozy%20cafe%20interior&image_size=landscape_16_9',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pour%20over%20coffee%20hand%20drip%20specialty%20aesthetic&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=latte%20art%20heart%20pattern%20cappuccino%20coffee&image_size=square_hd'
      ],
      price: 99,
      originalPrice: 158,
      totalTickets: 50,
      soldTickets: 42,
      minConsumption: 0,
      perks: ['手冲教学', '三款品鉴', '专属礼品', '合影机会'],
      status: 'ongoing',
      hot: 6543
    },
    {
      id: generateId(),
      managerId: managers[2].id,
      title: '苏沐橙の二次元潮玩店长日',
      description: '超人气Coser苏沐橙空降「泡泡玛特」门店！\n\n活动亮点：\n🎎 沐橙当天Cosplay神秘角色\n🎁 限定盲盒抽选活动\n📸 Coser合影互动\n✍️ 签名会（消费满199元）',
      storeName: 'POPMART泡泡玛特 · 陆家嘴中心店',
      storeAddress: '上海市浦东新区陆家嘴环路1000号恒生银行大厦1层',
      category: '潮玩手办',
      date: today.add(1, 'day').format('YYYY-MM-DD'),
      startTime: '11:00',
      endTime: '19:00',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=anime%20toy%20store%20colorful%20pop%20mart%20style%20cute%20figures%20display&image_size=landscape_16_9',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20anime%20figure%20collectible%20toy%20pink%20aesthetic&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=blind%20box%20toys%20colorful%20display%20collection&image_size=square_hd'
      ],
      price: 0,
      originalPrice: 0,
      totalTickets: 300,
      soldTickets: 245,
      minConsumption: 99,
      perks: ['免费入场', '限定盲盒', '消费合影', '签名会'],
      status: 'upcoming',
      hot: 12350
    },
    {
      id: generateId(),
      managerId: managers[3].id,
      title: '陈亦辰潮牌穿搭分享会',
      description: '顶流潮流博主陈亦辰带你解锁秋冬穿搭密码！\n\n活动内容：\n👟 秋冬新品首发预览\n💡 一对一穿搭建议\n🛍️ 专属折扣福利\n📸 合影打卡',
      storeName: 'BASMENT FG · 新天地旗舰店',
      storeAddress: '上海市黄浦区兴业路123弄新天地时尚II期1层',
      category: '潮流服饰',
      date: today.add(2, 'day').format('YYYY-MM-DD'),
      startTime: '13:00',
      endTime: '21:00',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=streetwear%20fashion%20store%20urban%20style%20clothing%20display%20modern%20interior&image_size=landscape_16_9',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=streetwear%20outfit%20urban%20fashion%20sneakers%20hoodie&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sneaker%20collection%20display%20shoes%20streetwear%20style&image_size=square_hd'
      ],
      price: 199,
      originalPrice: 299,
      totalTickets: 80,
      soldTickets: 67,
      minConsumption: 0,
      perks: ['入场券', '专属85折', '限定周边', '穿搭建议'],
      status: 'upcoming',
      hot: 15680
    },
    {
      id: generateId(),
      managerId: managers[4].id,
      title: '周若汐美妆课堂 · 秋日妆容',
      description: '金牌美妆店长周若汐亲授秋日氛围感妆容！\n\n课程内容：\n💄 秋日枫叶妆教学\n🧴 换季护肤攻略\n🎁 美妆礼盒一份\n📸 课后合影',
      storeName: 'WOW COLOUR · 五角场店',
      storeAddress: '上海市杨浦区邯郸路600号万达广场1层',
      category: '美妆护肤',
      date: today.add(3, 'day').format('YYYY-MM-DD'),
      startTime: '14:00',
      endTime: '17:00',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=makeup%20masterclass%20beauty%20cosmetics%20pink%20elegant%20studio&image_size=landscape_16_9',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=autumn%20makeup%20look%20warm%20tones%20eyeshadows%20lipstick&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=skincare%20products%20luxury%20beauty%20serum%20cream%20aesthetic&image_size=square_hd'
      ],
      price: 299,
      originalPrice: 499,
      totalTickets: 30,
      soldTickets: 28,
      minConsumption: 0,
      perks: ['美妆课', '产品试用', '礼盒一份', '合影'],
      status: 'upcoming',
      hot: 8920
    },
    {
      id: generateId(),
      managerId: managers[5].id,
      title: '张一凡运动潮流日',
      description: '健身达人张一凡带你解锁运动时尚！\n\n活动亮点：\n🏀 篮球互动挑战\n👟 新品球鞋试穿\n💪 健身知识分享\n🎁 运动周边抽奖',
      storeName: '李宁运动 · 南京东路旗舰店',
      storeAddress: '上海市黄浦区南京东路100号',
      category: '运动户外',
      date: today.add(5, 'day').format('YYYY-MM-DD'),
      startTime: '10:00',
      endTime: '18:00',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sports%20store%20athletic%20wear%20sneakers%20modern%20fitness%20interior&image_size=landscape_16_9',
      images: [
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=basketball%20court%20sports%20sneakers%20athletic%20fitness&image_size=square_hd',
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sportswear%20collection%20athletic%20outfit%20gym%20wear&image_size=square_hd'
      ],
      price: 0,
      originalPrice: 0,
      totalTickets: 150,
      soldTickets: 89,
      minConsumption: 199,
      perks: ['免费入场', '互动挑战', '抽奖活动', '满减优惠'],
      status: 'upcoming',
      hot: 5430
    }
  ];

  db.activities = activities;

  const posts = [];
  const postContents = [
    { content: '今天的店长活动圆满结束啦！感谢每一位来支持我的小伙伴们，你们的笑容是我最大的动力～明天继续加油！💪', images: 2 },
    { content: '准备中！明天就要和大家见面了，好激动～给大家准备了小惊喜哦，期待和你们的相遇！✨', images: 1 },
    { content: '今日份店长打卡！店里的新品也太好看了吧，你们最喜欢哪一件？评论区告诉我～', images: 3 },
    { content: '收到了好多粉丝的来信和礼物，真的太感动了，爱你们！❤️ 下次活动见！', images: 2 },
    { content: '店长日常vlog来啦～带你们看看幕后的故事 #一日店长 #店长日常', images: 1 },
    { content: '今日限定特调「星桃气泡」，灵感来源于你们的笑容！🍑 快来店里找我喝一杯～', images: 2 }
  ];

  managers.forEach((manager, mIdx) => {
    for (let i = 0; i < 5; i++) {
      const postContent = postContents[(mIdx + i) % postContents.length];
      const postImages = [];
      for (let j = 0; j < postContent.images; j++) {
        postImages.push(`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(['cute girl selfie', 'fashion outfit', 'cafe aesthetic', 'makeup look', 'street style', 'anime cosplay'][j % 6])}&image_size=square_hd`);
      }
      posts.push({
        id: generateId(),
        managerId: manager.id,
        content: postContent.content,
        images: postImages,
        likes: Math.floor(Math.random() * 5000) + 500,
        comments: Math.floor(Math.random() * 300) + 20,
        shares: Math.floor(Math.random() * 100) + 10,
        createdAt: today.subtract(i + mIdx, 'day').format('YYYY-MM-DD HH:mm:ss')
      });
    }
  });

  db.posts = posts;

  db.users = [
    {
      id: generateId(),
      phone: '13800138000',
      nickname: '小星星',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cat%20avatar%20cartoon%20kawaii&image_size=square_hd',
      createdAt: today.subtract(30, 'day').format('YYYY-MM-DD HH:mm:ss')
    }
  ];

  db.tickets = [
    {
      id: generateId(),
      activityId: activities[0].id,
      name: '免费入场券',
      price: 0,
      description: '免费入场，可自由逛店',
      perks: ['免费入场']
    },
    {
      id: generateId(),
      activityId: activities[0].id,
      name: '互动合影券',
      price: 99,
      description: '含饮品一杯 + 一对一合影机会',
      perks: ['饮品一杯', '一对一合影', '限量周边']
    },
    {
      id: generateId(),
      activityId: activities[1].id,
      name: '咖啡品鉴券',
      price: 99,
      description: '三款精品咖啡品鉴 + 手冲教学',
      perks: ['三款品鉴', '手冲教学', '专属礼品', '合影机会']
    },
    {
      id: generateId(),
      activityId: activities[3].id,
      name: '潮流分享会门票',
      price: 199,
      description: '穿搭分享会 + 专属折扣 + 限定周边',
      perks: ['入场券', '专属85折', '限定周边', '穿搭建议']
    },
    {
      id: generateId(),
      activityId: activities[4].id,
      name: '美妆课堂门票',
      price: 299,
      description: '秋日妆容教学 + 美妆礼盒',
      perks: ['美妆课', '产品试用', '礼盒一份', '合影']
    }
  ];

  saveData();
  console.log('Mock数据初始化完成！');
  console.log(`店长: ${db.managers.length}人`);
  console.log(`活动: ${db.activities.length}场`);
  console.log(`动态: ${db.posts.length}条`);
  console.log(`票种: ${db.tickets.length}种`);
}

module.exports = { initMockData };
