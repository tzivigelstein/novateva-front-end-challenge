# Novateva front end challenge [![wakatime](https://wakatime.com/badge/user/b9d25ba3-da9c-44da-9a0b-bd8bb81c6074/project/ab4cad2c-ffe2-4011-9b32-78503a9f3547.svg)](https://wakatime.com/badge/user/b9d25ba3-da9c-44da-9a0b-bd8bb81c6074/project/ab4cad2c-ffe2-4011-9b32-78503a9f3547)

### Prerequisites

- [`node js`](https://nodejs.org/en/) (`>= 12.22.0`)

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
  The ideal solution to this is to create a server-side socket event, where the `server` will listen to the socket event and then mark the conversation or a single as `read` when the event is received.\
  I came up with an idea after I turned this solution in that might work, but it is not ideal. The client should keep track of the current conversation as something close to a `cache` that is updated when a new message is received and marks it as read. Then the conversation should listen to its changes and mark itself as read when it differs from the last one. Also, the conversation should set an event listener that listens to the tab close in order to mark as read the conversation when the user leaves the app. These events should only be triggered if the user is currently in the conversation.
  To make this last part work, we need to use the `sendBeacon` included in the `navigator` object that allows us to send a message to the server without expecting a response. This would work if this `HTTP` request wasn't sent by the `POST` method, but the `PUT` method is needed in Novateva's server. A workaround for this issue would be, send the beacon to the `Next API`, as something similar to a `proxy` and redirect it to the server with the correct `PUT` method.

  ### Frontend

  ```js
  // url: Next app integrated API route
  // data: Blob containing the room id and the users token.
  navigator.sendBeacon(url, data) // -> Goes to the Next API
  ```

  ### Next API

  ```js
  export default function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }

    const { token, conversationId } = JSON.parse(req.body)

    const url = `http://novateva-codetest.herokuapp.com/room/${conversationId}/mark-read`
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    return fetch(url, {
      method: 'PUT',
      headers
    })
      .catch(error => console.log(error))
      .finally(() => res.status(201))
  }
  ```
