import { render } from '@testing-library/react'
import ReportItem from '.'

describe('Report Item', () => {
  const report = {
    createdAt: '2020-04-20T19:00:00.000Z',
    description: 'This is a report'
  }

  test('Should have report date and description', () => {
    const component = render(<ReportItem report={report} />)

    const reportDate = component.getByText('20/4/2020')
    const reportDescription = component.getByText('This is a report')

    expect(reportDate).toBeInTheDocument()
    expect(reportDescription).toBeInTheDocument()
  })
})
