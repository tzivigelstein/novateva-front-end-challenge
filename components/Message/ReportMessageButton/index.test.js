import ReportMessageButton from '.'
import { render } from '@testing-library/react'

describe('Report Message Button', () => {
  test("Should have text equal to 'Report' and flag icon", () => {
    const component = render(<ReportMessageButton />)
    component.getByText('Report')
    component.getByTestId('flag-icon')
  })

  test('Should have execute handler on click', () => {
    const EXPECTED_HANDLER_CALL_COUNT = 1
    const mockHandler = jest.fn().mockReturnValue()

    const component = render(<ReportMessageButton handleReportMessage={mockHandler} />)
    const reportMessageButton = component.getByText('Report')

    reportMessageButton.click()

    expect(mockHandler).toHaveBeenCalledTimes(EXPECTED_HANDLER_CALL_COUNT)
  })
})
