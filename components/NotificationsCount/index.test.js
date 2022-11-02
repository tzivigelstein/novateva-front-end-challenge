import { render } from '@testing-library/react'
import NotificationsCount from '.'

describe('Notifications Count', () => {
  test('Should have count number equal to 0 if no number is passed', () => {
    const EXPECTED_NOTIFICATION_COUNT = '0'

    const component = render(<NotificationsCount />)
    const notificationsCount = component.getByTestId('notification-count')

    expect(notificationsCount).toHaveTextContent(EXPECTED_NOTIFICATION_COUNT)
  })

  test('Should have count number equal to 5', () => {
    const EXPECTED_NOTIFICATION_COUNT = '5'

    const component = render(<NotificationsCount number={5} />)

    const notificationsCount = component.getByTestId('notification-count')

    expect(notificationsCount).toHaveTextContent(EXPECTED_NOTIFICATION_COUNT)
  })
})
