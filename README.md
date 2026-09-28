# MAX Chat

Веб-интерфейс для отправки и получения текстовых сообщений в MAX через [GREEN-API](https://green-api.com/max). Внешний вид — по мотивам [web.max.ru](https://web.max.ru/).

Стек: React 19, TypeScript, Vite, Tailwind CSS v4, axios, zustand, @tanstack/react-query, react-router-dom.

## Запуск

```bash
npm install
npm run dev
```

## Как пользоваться

1. Создайте инстанс MAX в [личном кабинете GREEN-API](https://console.green-api.com) и авторизуйте его.
2. Введите `idInstance` и `apiTokenInstance`. `apiUrl` по умолчанию строится как `https://{первые 4 цифры idInstance}.api.green-api.com` — если в кабинете указан другой хост, введите его.
3. Нажмите «+» и введите номер получателя — создастся чат.
4. Отправьте сообщение — ответ получателя появится в чате автоматически.

## Как это работает

- **Отправка** — [SendMessage](https://green-api.com/v3/docs/api/sending/SendMessage/) с `chatId` вида `79991234567@c.us`.
- **Получение** — [HTTP API](https://green-api.com/v3/docs/api/receiving/technology-http-api/): бесконечный long polling `receiveNotification` (`receiveTimeout=20`) → обработка → `deleteNotification`. Для этого у инстанса должен быть пустой `webhookUrl` и включены входящие уведомления.
- В MAX входящие сообщения приходят с числовым `chatId`, поэтому ответ сопоставляется с чатом по `senderData.senderPhoneNumber`, после чего числовой id запоминается. Сообщения от новых собеседников создают новый чат.
- Учётные данные, чаты и история хранятся в `localStorage` и очищаются при выходе.

## Архитектура (Feature-Sliced Design)

```
src/
├── app/            # провайдеры, роутер, глобальные стили
├── pages/          # login, chat
├── widgets/        # chat-sidebar, chat-window
├── features/       # auth, create-chat, send-message, receive-messages
├── entities/       # session, chat, message
└── shared/         # api (axiosInstance, green-api), ui, lib, config
```

Слои импортируют только нижележащие слои через публичный API (`index.ts`). Алиас `@/` → `src/`.
