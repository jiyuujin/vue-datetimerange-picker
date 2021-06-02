import { storiesOf } from '@storybook/vue'
import dayjs from 'dayjs'

// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

// import JRangePicker from '@/components/modules/RangePicker/JRangePicker.vue'
import VRangePicker from '@/components/VRangePicker.vue'

import { DateRange } from '@/types'

storiesOf('Range Picker', module)
  .add('standard', () => ({
    components: {
      VRangePicker
    },
    template: `
      <div>
        <div style="margin-bottom: 12px;">
          <div style="float: left; margin: 4px;">
            <v-range-picker
              ref="range-picker"
              :single-date-picker="singleDatePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date-range="dateRange"
              opens="right"
              @update="updateValues"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker.startDate }} - {{ picker.endDate }}
              </div>
            </v-range-picker>
          </div>
          <div style="margin: 4px; text-align: right;">
            <v-range-picker
              ref="range-picker"
              button-name="left-bottom-show"
              :single-date-picker="singleDatePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date-range="dateRange"
              opens="left"
              @update="updateValues"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker.startDate }} - {{ picker.endDate }}
              </div>
            </v-range-picker>
          </div>
        </div>

        <div style="margin: 4px;">
          Range Picker with Clear Button
        </div>
        <div style="margin-bottom: 12px;">
          <div style="float: left; margin: 4px;">
            <v-range-picker
              ref="range-picker"
              :single-date-picker="singleDatePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :clear="clear"
              :date-range="dateRange"
              opens="right"
              @update="updateValues"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker.startDate }} - {{ picker.endDate }}
              </div>
            </v-range-picker>
          </div>
          <div style="margin: 4px; text-align: right;">
            <v-range-picker
              ref="range-picker"
              button-name="left-bottom-show"
              :single-date-picker="singleDatePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :clear="clear"
              :date-range="dateRange"
              opens="left"
              @update="updateValues"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker.startDate }} - {{ picker.endDate }}
              </div>
            </v-range-picker>
          </div>
        </div>

        <div style="margin: 4px;">
          Range Picker, select a month by pull-down selection
        </div>
        <div style="margin-bottom: 12px;">
          <div style="float: left; margin: 4px;">
            <v-range-picker
              ref="range-picker"
              :single-date-picker="singleDatePicker"
              :show-dropdown="showDropdown"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date-range="dateRange"
              opens="right"
              @update="updateValues"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker.startDate }} - {{ picker.endDate }}
              </div>
            </v-range-picker>
          </div>
          <div style="margin: 4px; text-align: right;">
            <v-range-picker
              ref="range-picker"
              button-name="left-bottom-show"
              :single-date-picker="singleDatePicker"
              :show-dropdown="showDropdown"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date-range="dateRange"
              opens="left"
              @update="updateValues"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker.startDate }} - {{ picker.endDate }}
              </div>
            </v-range-picker>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        singleDatePicker: false as boolean,
        showDropdown: true as boolean,
        autoApply: true as boolean,
        linkedCalendars: true as boolean,
        clear: true as boolean,
        requestDate: {
          startDate: dayjs().format('YYYY/MM/DD'),
          endDate: dayjs().format('YYYY/MM/DD')
        } as DateRange
      }
    },
    computed: {
      dateRange: {
        get(): DateRange {
          // @ts-ignore
          // prettier/prettier eslint-disable-next-line
          return this.requestDate
        },
        set(values: DateRange): void {
          // @ts-ignore
          // prettier/prettier eslint-disable-next-line
          this.requestDate = { ...values }
        }
      }
    },
    methods: {
      updateValues(values: DateRange): void {
        // @ts-ignore
        // prettier/prettier eslint-disable-next-line
        this.requestDate = { ...values }
      },
      checkOpen(open: any): void {
        // console.log('event: ' + open)
      }
      // dateFormat(classes: any, date: Date) {
      //   // disabledのオプションを付けるなら
      //   let yesterday = dayjs().subtract(1, 'day')
      //   if (!classes.disabled) {
      //       classes.disabled = dayjs(date).isSame(yesterday, 'day')
      //   }
      //   return classes
      // }
    }
  }))
  .add('time', () => ({
    components: {
      VRangePicker
    },
    template: `
      <div>
        <div style="margin-bottom: 12px;">
          <div style="float: left; margin: 4px;">
            <v-range-picker
              ref="range-picker"
              :single-date-picker="singleDatePicker"
              :time-picker="timePicker"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date-range="dateRange"
              opens="right"
              @update="updateValues"
              @toggle="checkOpen"
              >
                <div slot="input" slot-scope="picker" style="min-width: 350px;">
                  {{ picker.startDate }} - {{ picker.endDate }}
                </div>
              </v-range-picker>
            </div>
            <div style="margin: 4px; text-align: right;">
              <v-range-picker
                ref="range-picker"
                button-name="left-bottom-show"
                :single-date-picker="singleDatePicker"
                :time-picker="timePicker"
                :auto-apply="autoApply"
                :linked-calendars="linkedCalendars"
                :date-range="dateRange"
                opens="left"
                @update="updateValues"
                @toggle="checkOpen"
              >
                <div slot="input" slot-scope="picker" style="min-width: 350px;">
                  {{ picker.startDate }} - {{ picker.endDate }}
                </div>
              </v-range-picker>
            </div>
          </div>

          <div style="margin: 4px;">
            Range Time (AM/PM) Picker
          </div>
          <div style="margin-bottom: 12px;">
            <div style="float: left; margin: 4px;">
              <v-range-picker
                ref="range-picker"
                :single-date-picker="singleDatePicker"
                :time-picker="timePicker"
                :time-picker24-hour="timePicker24Hour"
                :auto-apply="autoApply"
                :linked-calendars="linkedCalendars"
                :date-range="dateRange"
                opens="right"
                @update="updateValues"
                @toggle="checkOpen"
              >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker.startDate }} - {{ picker.endDate }}
              </div>
            </v-range-picker>
          </div>
          <div style="margin: 4px; text-align: right;">
            <v-range-picker
              ref="range-picker"
              button-name="left-bottom-show"
              :single-date-picker="singleDatePicker"
              :time-picker="timePicker"
              :time-picker24-hour="timePicker24Hour"
              :auto-apply="autoApply"
              :linked-calendars="linkedCalendars"
              :date-range="dateRange"
              opens="left"
              @update="updateValues"
              @toggle="checkOpen"
            >
              <div slot="input" slot-scope="picker" style="min-width: 350px;">
                {{ picker.startDate }} - {{ picker.endDate }}
              </div>
            </v-range-picker>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        singleDatePicker: false as boolean,
        timePicker: true as boolean,
        timePicker24Hour: false as boolean,
        showDropdown: true as boolean,
        autoApply: true as boolean,
        linkedCalendars: true as boolean,
        clear: true as boolean,
        requestDate: {
          startDate: dayjs().format('YYYY/MM/DD'),
          endDate: dayjs().format('YYYY/MM/DD')
        } as DateRange
      }
    },
    computed: {
      dateRange: {
        get(): DateRange {
          // @ts-ignore
          // prettier/prettier eslint-disable-next-line
          return this.requestDate
        },
        set(values: DateRange): void {
          // @ts-ignore
          // prettier/prettier eslint-disable-next-line
          this.requestDate = { ...values }
        }
      }
    },
    methods: {
      updateValues(values: DateRange): void {
        // @ts-ignore
        // prettier/prettier eslint-disable-next-line
        this.requestDate = { ...values }
      },
      checkOpen(open: any): void {
        // console.log('event: ' + open)
      }
      // dateFormat(classes: any, date: Date) {
      //   // disabledのオプションを付けるなら
      //   let yesterday = dayjs().subtract(1, 'day')
      //   if (!classes.disabled) {
      //       classes.disabled = dayjs(date).isSame(yesterday, 'day')
      //   }
      //   return classes
      // }
    }
  }))
