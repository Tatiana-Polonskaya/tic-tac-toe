<picture>
 <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Tatiana-Polonskaya/tic-tac-toe/assets/112598242/c1debc9e-d8e4-4f5d-bfd8-01c132e2a716">
 <source media="(prefers-color-scheme: light)" srcset="https://github.com/Tatiana-Polonskaya/tic-tac-toe/assets/112598242/65c49beb-c9ae-4730-806e-9c1149155269">
 <img alt="screen main page" src="https://github.com/Tatiana-Polonskaya/tic-tac-toe/assets/112598242/65c49beb-c9ae-4730-806e-9c1149155269">
</picture>

# Веб-игра Крестики-нолики на React+TS 

**О проекте:**\
  Игра со стандартными правилами базовой версии, расширенная количеством игроков и включающая выбор темы.

**Функционал:**
- Главная страница:
  - Выбор клетки - игровое действие.
  - Смена игрока и смена оформления согласно порядку игроков.
  - Проверка выигрыша при клике на клетку, согласно правилам по диагонали и по линиям (вертикальным и горизонтальным).
  - Объявление победы N-ого игрока или ничьей.
- Меню:
  - Смена количества игроков с 2 до 4.
  - Смена сложности игры, которая увеличивает размер игрового поля.
  - Смена темы интерфейса.

**Соответствие игровому полю и уровню сложности:**
 - Легко: - 3x3
 - Средне: - 4x4
 - Сложно: - 5x5

*Количество игроков не влияет на уровень сложности.*

**Темы интерфейса:**
 - Светлая.
 - Темная.

~~Поиграть в~~ протестировать приложение можно [здесь](https://tatiana-polonskaya.github.io/tic-tac-toe/).

----
## Содержание
- [Запуск проекта](#запуск-проекта)
- [Roadmap](#roadmap)
- [Технологии](#технологии)

## Запуск проекта

- `npm install` - Установка зависимостей
- `npm run dev` - Запуск проекта для разработки
- `npm run build` - Сборка проекта


## Roadmap

- [x] Переместить цвета в переменные CSS.
- [x] Добавить темную тему.
- [x] Адаптировать для мобильных устройств.
- [x] Опубликовать в открытый доступ GitHub Pages.
- [ ] Добавить космическую тему.
- [ ] Оптимизировать рендер компонентов. 
- [ ] Добавить выбор фигур для игроков.
- [ ] Добавить ввод имен для игроков.
- [ ] Добавить stylelint.
- [ ] Добавить husky и precommit.
      
## Технологии

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/blog/2023/03/16/introducing-react-dev)
- [TypeScript](https://www.typescriptlang.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router DOM 6](https://reactrouter.com/en/main)
