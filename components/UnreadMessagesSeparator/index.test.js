import UnreadMessagesSeparator from '.'
import { render } from '@testing-library/react'

describe('Unread Messages Separator', () => {
  test("Should have text 'Unread'", () => {
    const component = render(<UnreadMessagesSeparator />)

    const text = component.getByText('Unread')
    expect(text).toBeInTheDocument()
  })
})
