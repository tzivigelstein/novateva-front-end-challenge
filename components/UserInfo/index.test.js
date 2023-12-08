import UserInfo from '.'
import { render } from '@testing-library/react'
import stc from 'string-to-color'

describe('User Info', () => {
  const user = {
    id: '5f4b8a9b9c7d4d0017d8b0c1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'testing@novateva.com'
  }

  test("Should have user picture, user's name, and user's last name", () => {
    const userColor = stc(user.id)

    const component = render(<UserInfo user={user} />)

    const picture = component.getByTestId('user-profile-picture')
    expect(picture).toHaveStyle(`background-color: ${userColor}`)

    const fullName = component.getByText('John Doe')
    expect(fullName).toBeInTheDocument()
  })

  test("Should have deafult user picture and name equals to 'deleted user'", () => {
    const DEFAULT_USERid = 'DEFAULT'
    const EMPTY_USER = {}

    const userColor = stc(DEFAULT_USERid)

    const component = render(<UserInfo user={EMPTY_USER} />)

    const picture = component.getByTestId('user-profile-picture')
    expect(picture).toHaveStyle(`background-color: ${userColor}`)

    const fullName = component.getByText('Deleted user')
    expect(fullName).toBeInTheDocument()
  })

  test('Should have user info with bold full name', () => {
    const component = render(<UserInfo user={user} bold={true} />)

    const fullName = component.getByText('John Doe')
    expect(fullName).toBeInTheDocument()
    expect(fullName).toHaveStyle('font-weight: bold')
  })

  test('Should have user info with status online', () => {
    const component = render(<UserInfo user={user} status={true} />)

    const status = component.getByTestId('user-status')
    expect(status).toBeInTheDocument()
  })

  test('Should have user info with short id', () => {
    const component = render(<UserInfo user={user} showId={true} />)

    const userId = component.getByTestId('user-id')
    expect(userId).toBeInTheDocument()
    expect(userId).toHaveTextContent(`#${user.id.slice(0, 4)}`)
  })
})
