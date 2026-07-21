.PHONY: help build up down restart logs clean backend frontend

help:
	@echo "一日店长平台 Docker 部署命令"
	@echo ""
	@echo "可用命令:"
	@echo "  make build      - 构建所有镜像"
	@echo "  make up         - 启动所有服务（后台运行）"
	@echo "  make down       - 停止并移除所有服务"
	@echo "  make restart    - 重启所有服务"
	@echo "  make logs       - 查看所有服务日志"
	@echo "  make backend    - 仅构建后端镜像"
	@echo "  make frontend   - 仅构建前端镜像"
	@echo "  make clean      - 清理镜像和数据卷"
	@echo ""
	@echo "访问地址:"
	@echo "  前端: http://localhost:8080"
	@echo "  后端: http://localhost:3001"

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

backend:
	docker compose build backend

frontend:
	docker compose build frontend

clean:
	docker compose down -v
	docker rmi one-day-manager-backend one-day-manager-frontend 2>/dev/null || true
