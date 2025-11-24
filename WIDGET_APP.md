# Widget App - Embeddable SK8 Pipelines Widget

Отдельное приложение для встраивания компонента Pipelines как виджета.

## Описание

Widget App - это минималистичное Next.js приложение, которое:
- Загружает веб-компонент из CDN
- Принимает параметры через URL query string
- Может быть встроено как iframe или использовано как отдельный сервис
- Деплоится отдельно от основных приложений

## Использование

### Параметры URL

Приложение принимает параметры через query string:

- `mode` - `"admin"` или `"embedded"` (по умолчанию: `"embedded"`)
- `theme` - `"green"` или `"blue"` (по умолчанию: `"blue"`)
- `tenant-id` - ID тенанта (обязательно для `embedded` режима)
- `api-base-url` - Базовый URL для API (опционально, по умолчанию использует относительный путь)

### Примеры использования

#### 1. Embedded режим (Blue theme)

```
https://your-widget-app.vercel.app/?mode=embedded&theme=blue&tenant-id=xxx-ten-1
```

#### 2. Admin режим (Green theme)

```
https://your-widget-app.vercel.app/?mode=admin&theme=green
```

#### 3. С кастомным API URL

```
https://your-widget-app.vercel.app/?mode=embedded&theme=blue&tenant-id=xxx-ten-1&api-base-url=https://your-api.com
```

### Встраивание как iframe

```html
<iframe 
  src="https://your-widget-app.vercel.app/?mode=embedded&theme=blue&tenant-id=xxx-ten-1"
  width="100%" 
  height="600px"
  frameborder="0">
</iframe>
```

### Прямое использование

Просто откройте URL в браузере или используйте как отдельный сервис.

## API

Приложение включает API route `/api/pipelines`, который проксирует запросы к внешнему API, решая проблемы с CORS.

## Деплой

### Vercel

1. Создайте новый проект в Vercel
2. Импортируйте репозиторий
3. Настройте:
   - **Framework Preset**: Next.js
   - **Root Directory**: (оставьте пустым)
   - **Build Command**: `npx nx build widget-app`
   - **Output Directory**: `apps/widget-app/.next`
   - **Install Command**: `npm install`
4. Деплой

### Локальный запуск

```bash
npx nx dev widget-app
```

Откройте http://localhost:3000 (или указанный порт)

## Преимущества

✅ **Отдельный деплой** - независим от других приложений  
✅ **Гибкая настройка** - параметры через URL  
✅ **Легкое встраивание** - можно использовать как iframe  
✅ **API Proxy** - встроенный прокси для решения CORS  
✅ **Минималистичный** - только необходимый функционал  

## Структура

```
apps/widget-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── pipelines/
│   │   │       └── route.ts    # API proxy
│   │   ├── layout.tsx          # Layout с Tailwind
│   │   ├── page.tsx             # Главная страница виджета
│   │   └── global.css           # Стили
│   └── types/
│       └── web-components.d.ts # Типы для веб-компонента
├── tailwind.config.js
├── postcss.config.js
└── vercel.json                  # Конфигурация для Vercel
```

