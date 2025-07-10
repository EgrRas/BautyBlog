# ─── STAGE 1: build ─────────────────────────────────────────────────────────
FROM node:alpine AS build
WORKDIR /usr/src/app

# 1. Установим зависимости
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2. Скопируем весь код и соберём
COPY . .
RUN yarn run build    # ← Vite по умолчанию кладёт в ./dist

# ─── STAGE 2: nginx ─────────────────────────────────────────────────────────
FROM nginx:stable-alpine AS production
# Сбросим дефолтную статику
RUN rm -rf /usr/share/nginx/html/*

# Скопируем собранные файлы из папки dist
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# (опционально) ваш кастомный nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx слушает 80-й порт
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]