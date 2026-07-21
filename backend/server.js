const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const { db, saveData, generateId } = require('./data');
const { initMockData } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

initMockData();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '一日店长平台服务运行中' });
});

app.get('/api/activities', (req, res) => {
  const { status, category, page = 1, pageSize = 10 } = req.query;
  
  let activities = [...db.activities];
  
  if (status) {
    activities = activities.filter(a => a.status === status);
  }
  
  if (category && category !== 'all') {
    activities = activities.filter(a => a.category === category);
  }
  
  activities.sort((a, b) => {
    if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
    if (b.status === 'ongoing' && a.status !== 'ongoing') return 1;
    return b.hot - a.hot;
  });
  
  const total = activities.length;
  const start = (page - 1) * pageSize;
  const list = activities.slice(start, start + parseInt(pageSize)).map(activity => {
    const manager = db.managers.find(m => m.id === activity.managerId);
    return {
      ...activity,
      manager: manager ? {
        id: manager.id,
        name: manager.name,
        avatar: manager.avatar,
        level: manager.level,
        tags: manager.tags
      } : null
    };
  });
  
  res.json({
    code: 0,
    data: {
      list,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    }
  });
});

app.get('/api/activities/today', (req, res) => {
  const today = dayjs().format('YYYY-MM-DD');
  const todayActivities = db.activities.filter(a => a.date === today);
  
  const list = todayActivities.map(activity => {
    const manager = db.managers.find(m => m.id === activity.managerId);
    return {
      ...activity,
      manager: manager ? {
        id: manager.id,
        name: manager.name,
        avatar: manager.avatar,
        level: manager.level,
        tags: manager.tags
      } : null
    };
  });
  
  res.json({
    code: 0,
    data: list
  });
});

app.get('/api/activities/:id', (req, res) => {
  const { id } = req.params;
  const activity = db.activities.find(a => a.id === id);
  
  if (!activity) {
    return res.status(404).json({ code: 1, message: '活动不存在' });
  }
  
  const manager = db.managers.find(m => m.id === activity.managerId);
  const tickets = db.tickets.filter(t => t.activityId === id);
  
  res.json({
    code: 0,
    data: {
      ...activity,
      manager: manager || null,
      tickets
    }
  });
});

app.get('/api/managers', (req, res) => {
  const { page = 1, pageSize = 10, level } = req.query;
  
  let managers = [...db.managers];
  
  if (level && level !== 'all') {
    managers = managers.filter(m => m.level === level);
  }
  
  managers.sort((a, b) => b.followers - a.followers);
  
  const total = managers.length;
  const start = (page - 1) * pageSize;
  const list = managers.slice(start, start + parseInt(pageSize));
  
  res.json({
    code: 0,
    data: {
      list,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    }
  });
});

app.get('/api/managers/:id', (req, res) => {
  const { id } = req.params;
  const manager = db.managers.find(m => m.id === id);
  
  if (!manager) {
    return res.status(404).json({ code: 1, message: '店长不存在' });
  }
  
  const activities = db.activities.filter(a => a.managerId === id);
  const upcomingCount = activities.filter(a => a.status === 'upcoming').length;
  const ongoingCount = activities.filter(a => a.status === 'ongoing').length;
  
  res.json({
    code: 0,
    data: {
      ...manager,
      stats: {
        totalActivities: activities.length,
        upcomingCount,
        ongoingCount
      }
    }
  });
});

app.get('/api/managers/:id/activities', (req, res) => {
  const { id } = req.params;
  const { status, page = 1, pageSize = 10 } = req.query;
  
  let activities = db.activities.filter(a => a.managerId === id);
  
  if (status && status !== 'all') {
    activities = activities.filter(a => a.status === status);
  }
  
  activities.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const total = activities.length;
  const start = (page - 1) * pageSize;
  const list = activities.slice(start, start + parseInt(pageSize));
  
  res.json({
    code: 0,
    data: {
      list,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    }
  });
});

app.get('/api/managers/:id/posts', (req, res) => {
  const { id } = req.params;
  const { page = 1, pageSize = 10 } = req.query;
  
  let posts = db.posts.filter(p => p.managerId === id);
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const total = posts.length;
  const start = (page - 1) * pageSize;
  const list = posts.slice(start, start + parseInt(pageSize));
  
  res.json({
    code: 0,
    data: {
      list,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    }
  });
});

app.get('/api/posts', (req, res) => {
  const { page = 1, pageSize = 10, managerId } = req.query;
  
  let posts = [...db.posts];
  
  if (managerId) {
    posts = posts.filter(p => p.managerId === managerId);
  }
  
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const total = posts.length;
  const start = (page - 1) * pageSize;
  const list = posts.slice(start, start + parseInt(pageSize)).map(post => {
    const manager = db.managers.find(m => m.id === post.managerId);
    return {
      ...post,
      manager: manager ? {
        id: manager.id,
        name: manager.name,
        avatar: manager.avatar,
        level: manager.level
      } : null
    };
  });
  
  res.json({
    code: 0,
    data: {
      list,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    }
  });
});

app.post('/api/orders', (req, res) => {
  const { activityId, ticketId, quantity = 1, name, phone } = req.body;
  
  const activity = db.activities.find(a => a.id === activityId);
  if (!activity) {
    return res.status(404).json({ code: 1, message: '活动不存在' });
  }
  
  const ticket = db.tickets.find(t => t.id === ticketId);
  if (!ticket && ticketId) {
    return res.status(404).json({ code: 1, message: '票种不存在' });
  }
  
  const ticketPrice = ticket ? ticket.price : activity.price;
  const totalPrice = ticketPrice * quantity;
  
  const order = {
    id: generateId(),
    orderNo: 'ODM' + Date.now(),
    activityId,
    ticketId: ticketId || null,
    ticketName: ticket ? ticket.name : '入场券',
    quantity,
    unitPrice: ticketPrice,
    totalPrice,
    name: name || '用户',
    phone: phone || '',
    status: 'pending',
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    paidAt: null
  };
  
  db.orders.unshift(order);
  saveData();
  
  res.json({
    code: 0,
    data: order
  });
});

app.post('/api/orders/:id/pay', (req, res) => {
  const { id } = req.params;
  const order = db.orders.find(o => o.id === id);
  
  if (!order) {
    return res.status(404).json({ code: 1, message: '订单不存在' });
  }
  
  if (order.status !== 'pending') {
    return res.status(400).json({ code: 1, message: '订单状态异常' });
  }
  
  order.status = 'paid';
  order.paidAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
  
  const activity = db.activities.find(a => a.id === order.activityId);
  if (activity) {
    activity.soldTickets += order.quantity;
  }
  
  saveData();
  
  res.json({
    code: 0,
    data: order
  });
});

app.get('/api/orders', (req, res) => {
  const { status, page = 1, pageSize = 10 } = req.query;
  
  let orders = [...db.orders];
  
  if (status && status !== 'all') {
    orders = orders.filter(o => o.status === status);
  }
  
  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const total = orders.length;
  const start = (page - 1) * pageSize;
  const list = orders.slice(start, start + parseInt(pageSize)).map(order => {
    const activity = db.activities.find(a => a.id === order.activityId);
    const manager = activity ? db.managers.find(m => m.id === activity.managerId) : null;
    return {
      ...order,
      activity: activity ? {
        id: activity.id,
        title: activity.title,
        coverImage: activity.coverImage,
        date: activity.date,
        startTime: activity.startTime,
        storeName: activity.storeName
      } : null,
      manager: manager ? {
        id: manager.id,
        name: manager.name,
        avatar: manager.avatar
      } : null
    };
  });
  
  res.json({
    code: 0,
    data: {
      list,
      total,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    }
  });
});

app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = db.orders.find(o => o.id === id);
  
  if (!order) {
    return res.status(404).json({ code: 1, message: '订单不存在' });
  }
  
  const activity = db.activities.find(a => a.id === order.activityId);
  const manager = activity ? db.managers.find(m => m.id === activity.managerId) : null;
  
  res.json({
    code: 0,
    data: {
      ...order,
      activity,
      manager
    }
  });
});

app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'all', name: '全部', icon: '🔥' },
    { id: '餐饮奶茶', name: '餐饮奶茶', icon: '🧋' },
    { id: '咖啡饮品', name: '咖啡饮品', icon: '☕' },
    { id: '潮玩手办', name: '潮玩手办', icon: '🎎' },
    { id: '潮流服饰', name: '潮流服饰', icon: '👕' },
    { id: '美妆护肤', name: '美妆护肤', icon: '💄' },
    { id: '运动户外', name: '运动户外', icon: '🏃' }
  ];
  
  res.json({
    code: 0,
    data: categories
  });
});

app.listen(PORT, () => {
  console.log(`🚀 一日店长平台后端服务已启动`);
  console.log(`📍 服务地址: http://localhost:${PORT}`);
  console.log(`📊 健康检查: http://localhost:${PORT}/api/health`);
});
