import { render } from '@testing-library/react'
import MessageTimeAndSender from '.'

describe('Message Time And Sender', () => {
  test('Should be aligned to the end if sent by local user', () => {
    const sender = 'Me'
    const timeago = '1 hour ago'

    const component = render(<MessageTimeAndSender senderAndTime={`${sender}, ${timeago}`} sentByLocalUser={true} />)
    const messageTimeAndSender = component.getByText(`${sender}, ${timeago}`)

    expect(messageTimeAndSender).toHaveStyle('align-self: flex-end')
  })

  test('Should be aligned to the start if not sent by local user', () => {
    const sender = 'John Doe'
    const timeago = '1 hour ago'

    const component = render(<MessageTimeAndSender senderAndTime={`${sender}, ${timeago}`} />)
    const messageTimeAndSender = component.getByText(`${sender}, ${timeago}`)

    expect(messageTimeAndSender).toHaveStyle('align-self: flex-start')
  })
})
