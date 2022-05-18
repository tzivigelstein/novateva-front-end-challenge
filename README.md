# Novateva front end challenge [![wakatime](https://wakatime.com/badge/user/b9d25ba3-da9c-44da-9a0b-bd8bb81c6074/project/ab4cad2c-ffe2-4011-9b32-78503a9f3547.svg)](https://wakatime.com/badge/user/b9d25ba3-da9c-44da-9a0b-bd8bb81c6074/project/ab4cad2c-ffe2-4011-9b32-78503a9f3547)

## Getting Started

First, install the dependencies:

```bash

npm install

```

Then, run the development server:

```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

###

```bash

npm run build

```

This will generate a distribution version of the site.

```bash

npm run start

```

This will run the previously generated build version.

## Technologies

- Next

- React Context

- Axios

- Socket.io

- CSS Modules

## Considerations

Be aware that the environment variables have been uploaded on purpose because this is a private repository. It should be avoided in other kinds of repos.

### Mandatory environment variables

```bash

NEXT_PUBLIC_BACKEND_BASE_URL

NEXT_PUBLIC_SOCKET_URL

```

## Requirements

The main idea is to create a simple `chat application` where users can `send` messages to each other, `delete` conversations and `see` their chats.
A user can also create a `report` over an inadequate message. This report will be sent to the `server` and there needs to be a way to see the reports.

## Topics to discuss

- Login process\
  The `login` process needs to make 2 (two) `requests` to the `server` to finally log in the user successfully. The first request retrieves a `JWT token` for the user, which I used to `decode` in order to get the user `ID` and then make a new request to get the user's personal data such as `names` and `email`.

- Mark as read process\
  The `mark as read` process needs to make a `request` to the `server` to mark the whole conversation as `read`. This is not ideal because there is a desynchronization between the read messages and the incoming messages via `Socket.io`.
  The ideal solution to this is to create a server-side socket event, where the `server` will listen to the socket event and then mark the conversation or a single as `read` when the event is received.
