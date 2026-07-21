# Docker 部署指南

## 快速开始

### 前置要求
- Docker 20.10+
- Docker Compose v2+

### 一键启动

```bash
# 克隆项目
git clone https://github.com/KimWang-00/one-day-manager.git
cd one-day-manager

# 构建并启动
docker compose up -d --build
```

### 访问地址
- **前端页面**: http://localhost:8080
- **后端 API**: http://localhost:3001
- **健康检查**: http://localhost:3001/api/health

## 常用命令

```bash
# 查看日志
docker compose logs -f

# 查看指定服务日志
docker compose logs -f backend
docker compose logs -f frontend

# 重启服务
docker compose restart

# 停止服务
docker compose stop

# 启动服务
docker compose start

# 停止并移除容器
docker compose down

# 停止并移除容器和数据卷（清空数据）
docker compose down -v
```

## 使用 Makefile

```bash
# 构建镜像
make build

# 启动服务
make up

# 停止服务
make down

# 查看日志
make logs

# 重启服务
make restart

# 清理（删除镜像和数据）
make clean
```

## 架构说明

```
┌─────────────────────────────────────────────────┐
│                   Nginx (前端)                   │
│  端口: 80 → 8080                                 │
│  - 提供静态页面                                  │
│  - /api 反向代理到后端                            │
└───────────────────┬─────────────────────────────┘
                    │ /api
                    ▼
┌─────────────────────────────────────────────────┐
│               Node.js (后端 API)                  │
│  端口: 3001                                      │
│  - Express 服务器                                │
│  - JSON 文件存储数据                              │
│  - 数据持久化到 Docker Volume                     │
└─────────────────────────────────────────────────┘
```

## 数据持久化

后端数据存储在 Docker Volume `one-day-manager_backend-data` 中，包含：
- 活动数据
- 店长数据
- 订单数据
- 用户数据

即使删除容器，数据也会保留。如需清空数据：

```bash
docker compose down -v
```

## 环境变量

可在 `docker-compose.yml` 中配置：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `NODE_ENV` | `production` | Node 运行环境 |
| `PORT` | `3001` | 后端服务端口 |

## 自定义配置

### 修改前端端口
编辑 `docker-compose.yml`：
```yaml
ports:
  - "8080:80"  # 左边是宿主机端口，可修改
```

### 修改后端端口
编辑 `docker-compose.yml`：
```yaml
ports:
  - "3001:3001"  # 左边是宿主机端口，可修改
environment:
  - PORT=3001    # 容器内端口
```

### 修改 Nginx 配置
编辑 `frontend/nginx.conf`，然后重新构建：
```bash
docker compose build frontend
docker compose up -d frontend
```

## 故障排查

### 前端页面无法访问
```bash
# 检查前端容器状态
docker compose ps frontend

# 查看前端日志
docker compose logs frontend
```

### 后端 API 报错
```bash
# 检查后端容器状态
docker compose ps backend

# 查看后端日志
docker compose logs backend
```

### 数据丢失？
检查数据卷是否存在：
```bash
docker volume ls | grep one-day-manager
```
