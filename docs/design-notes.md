# Дизайн-концепция проекта «МЕТР» (UI/UX Pro Max Skill Notes)

## Стиль и принципы
- **Soft UI Evolution**: улучшенный контраст, мягкие тени, доступность WCAG AA+
- **Minimalism & Swiss Style**: чистая типографика, сетки, воздух
- **Bento Box Grid**: модульные карточки varied sizes
- **Dimensional Layering**: z-index stacking, параллакс
- **Kinetic Typography**: scroll-triggered reveals, анимированный текст

## Палитра
```css
--primary: #F4F4F2;      /* светлый бетон */
--secondary: #141414;    /* графит */
--accent: #FF5A2A;       /* сигнальный оранжевый */
--light: #E8E8E6;        /* бетон светлее */
--success: #22C55E;      /* зелёный успех */
```

## Типографика
- **Заголовки**: Unbounded (Google Fonts, кириллица)
- **Текст**: Manrope (Google Fonts, кириллица)

## Композиция
- Слайдовая навигация (100vh секции)
- Переключение: стрелки, точки, клавиатура (←/→, ↑/↓), колесо с дебаунсом
- Внутренний скролл в слайдах при переполнении

## Фото-ассеты (только Pexels/Pixabay/Wikimedia)
Проверка URL: `curl -s -o /dev/null -w "%{http_code}" "URL"` → только 200

### Hero
- Современный интерьер гостиной/спальни
- Pexels: светлые тона, минимализм

### Портфолио (до/после)
- До: старое покрытие, обои, плитка
- После: свежий ремонт, современные материалы

### Услуги
- Процесс ремонта: шпатлёвка, покраска, укладка пола

## Микро-детали
- Noise/grain текстура (overlay SVG или CSS)
- Бегущая строка (marquee) для преимуществ
- Hover-эффекты: scale(1.02), shadow-lg, transition 200–300ms
- Reveal-анимации: framer-motion variants

## 3D-сцена (лёгкая реализация)
- iframe embed готовой Spline-сцены (без npm-зависимостей)
- Или CSS 3D: transform, perspective, keyframes анимации

## Адаптивность
- Mobile-first подход
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly: кнопки ≥44px, свайпы для слайдеров
