import DeleteMessageButton from '.'
import { render } from '@testing-library/react'

describe('Delete Message Button', () => {
  test("Should have text equal to 'Delete' and trash icon", () => {
    const EXPECTED_TEXT = 'Delete'

    const component = render(<DeleteMessageButton />)
    const deleteMessageButton = component.getByText(EXPECTED_TEXT)

    expect(deleteMessageButton).toHaveTextContent(EXPECTED_TEXT)

    const trashIcon = component.getByTestId('trash-icon')
    expect(trashIcon).toBeInTheDocument()
  })

  test('Should have execute handler on click', () => {
    const EXPECTED_HANDLER_CALL_COUNT = 1

    const mockHandler = jest.fn().mockReturnValue()

    const component = render(<DeleteMessageButton handleDeleteMessage={mockHandler} />)
    const deleteMessageButton = component.getByText('Delete')

    deleteMessageButton.click()

    expect(mockHandler).toHaveBeenCalledTimes(EXPECTED_HANDLER_CALL_COUNT)
  })
})
