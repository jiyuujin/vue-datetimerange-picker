import { DateRange, Ranges } from '@/types'

export const DAY_OF_WEEKS = [
  { value: 1, text: '日' },
  { value: 2, text: '月' },
  { value: 3, text: '火' },
  { value: 4, text: '水' },
  { value: 5, text: '木' },
  { value: 6, text: '金' },
  { value: 7, text: '土' }
]

export const MONTH_LIST = [
  { value: 1, text: 'Jan' },
  { value: 2, text: 'Feb' },
  { value: 3, text: 'Mar' },
  { value: 4, text: 'Apr' },
  { value: 5, text: 'May' },
  { value: 6, text: 'Jun' },
  { value: 7, text: 'Jul' },
  { value: 8, text: 'Aug' },
  { value: 9, text: 'Sep' },
  { value: 10, text: 'Oct' },
  { value: 11, text: 'Nov' },
  { value: 12, text: 'Dec' }
]

const CustomUtil = {
  setDefaultDateRange() {
    return {
      startDate: '',
      endDate: ''
    } as DateRange
  },
  setDefaultRanges() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const result: Ranges = {}
    result['今日'] = [today, today]
    result['昨日'] = [yesterday, yesterday]
    result['今月'] = [thisMonthStart, thisMonthEnd]
    result['先月'] = [
      new Date(today.getFullYear(), today.getMonth() - 1, 1),
      new Date(today.getFullYear(), today.getMonth(), 0)
    ]
    result['今年'] = [
      new Date(today.getFullYear(), 0, 1),
      new Date(today.getFullYear(), 11, 31)
    ]
    result['昨年'] = [
      new Date(today.getFullYear() - 1, 0, 1),
      new Date(today.getFullYear() - 1, 11, 31)
    ]
    return result
  }
}

export default CustomUtil
