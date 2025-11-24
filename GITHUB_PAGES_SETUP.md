# GitHub Pages Setup Instructions

## Включение GitHub Pages

Для автоматического деплоя веб-компонента необходимо включить GitHub Pages в настройках репозитория.

### Шаги:

1. Откройте настройки репозитория:
   - Перейдите: https://github.com/ivanneuzorau/next/settings/pages

2. В разделе **"Build and deployment"**:
   - **Source**: Выберите **"GitHub Actions"**
   - Нажмите **"Save"**

3. После этого:
   - GitHub Actions автоматически задеплоит компонент
   - Компонент будет доступен по адресу: `https://ivanneuzorau.github.io/next/sk8-pipelines.js`

### Альтернативный способ (через GitHub CLI):

Если у вас установлен GitHub CLI:

```bash
gh api repos/ivanneuzorau/next/pages -X POST -f source='{"branch":"main","path":"/"}'
```

Но проще всего - включить через веб-интерфейс.

### Проверка:

После включения GitHub Pages:
1. Проверьте Actions: https://github.com/ivanneuzorau/next/actions
2. Дождитесь успешного завершения workflow
3. Компонент будет доступен: https://ivanneuzorau.github.io/next/sk8-pipelines.js

