# 一日店长快闪活动平台

一个用于举办一日店长快闪活动和用户报名买票的完整 Web 应用平台。

## 项目简介

「一日店长」是一种品牌邀请网红/明星/KOL 临时担任门店店长的限时营销活动，消费者可以与店长互动、合影，通过消费解锁专属福利。

本平台提供完整的活动发布、店长展示、用户报名购票功能。

## 技术栈

- **前端**: React 18 + Vite + TailwindCSS + React Router v6
- **后端**: Node.js + Express + JSON 文件存储
- **设计**: 移动端优先，小程序风格 UI，玫瑰粉主题

## 功能特性

### 前端页面
1. **首页** - 今日店长横滑卡片 + 分类筛选 + 热门活动列表
2. **活动详情页** - 活动信息 + 店长入口 + 票种选择 + 报名/购票
3. **店长主页** - 店长信息 + 关注 + 「店长动态/往期活动」双 Tab
4. **订单确认页** - 票种信息 + 联系人 + 支付
5. **订单详情页** - 电子票 + 活动信息 + 验票提示
6. **发现页** - 动态瀑布流 + 热门店长排行榜
7. **我的** - 用户信息 + 订单入口 + 菜单列表

### 后端 API
- 活动模块：列表、今日活动、详情、分类筛选
- 店长模块：列表、详情、店长活动、店长动态
- 动态模块：推荐信息流
- 订单模块：创建订单、支付、订单列表、订单详情

## 快速开始

### 安装依赖

```bash
# 后端
cd backend
npm install

# 前端
cd ../frontend
npm install
```

### 启动开发服务

```bash
# 启动后端 (端口 3001)
cd backend
npm start

# 启动前端 (端口 5173)
cd ../frontend
npm run dev
```

访问 http://localhost:5173 查看效果。

### 构建生产版本

```bash
cd frontend
npm run build
```

构建产物在 `frontend/dist/` 目录。

## 项目结构

```
one-day-manager/
├── backend/              # 后端服务
│   ├── server.js         # 主服务器 + API 路由
│   ├── data.js           # 数据存储层
│   ├── mockData.js       # Mock 数据生成
│   └── package.json
├── frontend/             # 前端应用
│   ├── src/
│   │   ├── pages/        # 页面组件
│   │   ├── components/   # 公共组件
│   │   ├── api/          # API 封装
│   │   └── utils/        # 工具函数
│   └── package.json
└── README.md
```

## 部署

### 前端部署到 GitHub Pages

项目已配置好 GitHub Actions 自动部署工作流。推送到 `main` 分支后会自动构建并部署到 GitHub Pages。

### 后端部署

后端可以部署到任意支持 Node.js 的平台（如 Vercel、Render、Railway 等）。

## License

MIT
