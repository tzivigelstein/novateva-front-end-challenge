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
  The ideal solution to this is to create a server-side socket event, where the `server` will listen to the socket event and then mark the conversation or a single as `read` when the event is received.
  I came up with a solution that works, but it is not ideal. The client should keep track of the current conversation as something close to a `cache` that is updated when a new message is received and marks it as read. Then the conversation should listen to its changes and mark itself as read when it differs from the last one. Also, the conversation should set an event listener that listens to the `"beforeunload"` event in order to mark as read the conversation when the user leaves the chat. These events should only be triggered if the user is currently in the conversation.

  The "beforeunload" event looks like this:

  ```js
  useEffect(() => {
    // Keep track of the current conversation id
    let currentConversationId = currentConversation?._id

    window.addEventListener('beforeunload', function markAsRead() {
      const url = `/room/${currentConversationId}/mark-as-read`

      axiosClient.post(url)

      this.removeEventListener('beforeunload', markAsRead)
    })
  }, [])
  ```

  The `conversation cache` looks like this:

  ```js
  // This state handles the current conversation
  const [conversation, setConversation] = useState(null)

  socket.on('new message', ({ message }) => {
    setConversation(prev => {
      if (prev && prev._id === message.chatRoomId) {
        const newReadByRecipients = [...message.readByRecipients]
        newReadByRecipients.push({ readByUserId: localUser._id })

        const newMessage = {
          ...message,
          readByRecipients: [...newReadByRecipients]
        }

        return {
          ...prev,
          messages: [...prev.messages, message]
        }
      }

      return prev
    })
  })
  ```

Then depending on the business logic, we can mark as read the messages under different conditions.
Either when the user reaches the bottom or even when the user joins the conversation.
Whichever is the case, this is a solution that works, but it is not great.
