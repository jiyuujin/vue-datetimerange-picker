<template>
  <div @click.stop="clickIgnore">
    <button-comp
      :id="id !== '' ? `${id}-button` : 'button'"
      :text="rangeText"
      fill="text"
      size="sm"
      :icons-before="['fa', 'calendar']"
      :icons-after="['fa', 'angle-down']"
      @handleClick="togglePicker(null, true)"
    />

    <transition name="slide-fade" mode="out-in">
      <div
        v-if="isOpen"
        :class="pickerClasses"
        :style="pickerStyles"
        class="vue-range-picker ltr"
      >
        <div class="drp-header">
          <slot
            v-if="ranges !== false"
            :startDate="start"
            :endDate="end"
            :ranges="ranges"
            name="ranges"
          >
            <calendar-ranges
              :ranges="ranges"
              :selected="{ startDate: start, endDate: end }"
              @clickRange="clickRange"
            />
          </slot>
          <!--
          <span class="header-close-btn" @click="clickAway">
            ×
          </span>
          -->
        </div>

        <div class="drp-buttons">
          <div style="margin-right: 12px" class="input-group start">
            <label>開始日</label>
            <input
              :value="startText"
              :style="!inSelection ? 'border: 1px solid #0084cf;' : ''"
              @blur="updateStartText"
            />
          </div>
          <!--
          <div style="margin-right: 12px;">
            -
          </div>
          -->
          <div style="margin-right: 12px" class="input-group end">
            <label>終了日</label>
            <input
              :value="endText"
              :style="inSelection ? 'border: 1px solid #0084cf;' : ''"
              @blur="updateEndText"
            />
          </div>
          <!--
          {{ rangeText }}
          -->
          <button-comp
            :disabled="inSelection"
            text="日付を変更"
            style="display: block !important"
            :style="
              clear ? 'margin-right: 12px;' : '' + !isIe11 ? 'width: 100%;' : ''
            "
            @handleClick="clickedApply"
          />
          <button-comp
            v-if="clear"
            text="クリア"
            fill="text"
            style="display: block !important"
            :style="!isIe11 ? 'width: 100%;' : ''"
            @handleClick="clickAway"
          />
        </div>

        <div class="drp-calendar col left">
          <div class="calendar-table">
            <calendar
              :month-date="monthDate"
              :locale-data="locale"
              :start="start"
              :end="end"
              :min-date="min"
              :max-date="max"
              :is-current="Boolean(true)"
              :show-dropdown="showDropdown"
              :show-operation="Boolean(true)"
              :single-date-picker="false"
              @change-month="changeLeftMonth"
              @dateClick="dateClick"
              @hoverDate="hoverDate"
            />
          </div>

          <calendar-time
            v-if="timePicker"
            :miniute-increment="timePickerIncrement"
            :hour24="timePicker24Hour"
            :second-picker="timePickerSeconds"
            :current-time="start"
            @update="onUpdateStartTime"
          />
        </div>

        <div class="drp-calendar col right">
          <div class="calendar-table">
            <calendar
              :month-date="nextMonthDate"
              :locale-data="locale"
              :start="start"
              :end="end"
              :min-date="min"
              :max-date="max"
              :show-dropdown="showDropdown"
              :show-operation="Boolean(true)"
              position="right"
              @change-month="changeRightMonth"
              @dateClick="dateClick"
              @hoverDate="hoverDate"
            />
          </div>

          <calendar-time
            v-if="timePicker"
            :miniute-increment="timePickerIncrement"
            :hour24="timePicker24Hour"
            :second-picker="timePickerSeconds"
            :current-time="end"
            @update="onUpdateEndTime"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ButtonComp from './atoms/Button.vue'
import Calendar from './presentational/Calendar.vue'
import CalendarRanges from './presentational/CalendarRanges.vue'
import CalendarTime from './presentational/CalendarTime.vue'

import CustomUtil from '@/utils/custom'
import DateUtil from '@/utils/native'
import { isIe11 } from '@/utils/ua'

export default {
  components: {
    ButtonComp,
    Calendar,
    CalendarRanges,
    CalendarTime
  },
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: ''
    },
    minDate: {
      type: Date,
      default() {
        return null
      }
    },
    maxDate: {
      type: Date,
      default() {
        return null
      }
    },
    linkedCalendars: {
      type: Boolean,
      default: true
    },
    showDropdown: {
      type: Boolean,
      default: false
    },
    autoApply: {
      type: Boolean,
      default: false
    },
    dateRange: {
      type: Object,
      default: function () {
        return CustomUtil.setDefaultDateRange()
      }
    },
    ranges: {
      type: Object,
      default: function () {
        return CustomUtil.setDefaultRanges()
      }
    },
    opens: {
      type: String,
      default: 'center'
    },
    clear: {
      type: Boolean,
      default: false
    },
    timePicker: {
      type: Boolean,
      default: false
    },
    timePickerIncrement: {
      type: Number,
      default: 5
    },
    timePicker24Hour: {
      type: Boolean,
      default: true
    },
    timePickerSeconds: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {}

    const startDate = this.dateRange.startDate
    const endDate = this.dateRange.endDate

    data.nextMonthDate = new Date(startDate)
    data.monthDate = DateUtil.prevMonth(new Date(startDate))
    data.start = new Date(startDate)
    data.end = new Date(endDate)

    data.inSelection = false
    data.isOpen = false

    data.locale = DateUtil.localeData()
    if (data.locale.firstDay !== 0) {
      let iterator = data.locale.firstDay
      while (iterator > 0) {
        // data.locale.daysOfWeek.push(data.locale.daysOfWeek.shift())
        iterator--
      }
    }

    return data
  },
  computed: {
    startText() {
      if (DateUtil.isNullDate(this.start)) {
        return ''
      }
      return this.start ? DateUtil.format(this.start, 'YYYY/MM/DD') : ''
    },
    endText() {
      if (DateUtil.isNullDate(this.end)) {
        return ''
      }
      return this.end ? DateUtil.format(this.end, 'YYYY/MM/DD') : ''
    },
    rangeText() {
      let range = this.startText

      if (this.timePicker) {
        range += ' ' + DateUtil.format(this.start, 'hh:mm')
      }
      range += '-' + this.endText
      if (this.timePicker) {
        range += ' ' + DateUtil.format(this.end, 'hh:mm')
      }

      return range
    },
    min() {
      return this.minDate ? DateUtil.format(this.minDate, 'YYYY/MM/DD') : null
    },
    max() {
      return this.maxDate ? DateUtil.format(this.maxDate, 'YYYY/MM/DD') : null
    },
    pickerClasses() {
      return {
        'show-calendar': this.isOpen,
        'show-ranges': !!this.ranges,
        'opens-right': this.opens === 'right',
        'opens-left': this.opens === 'left',
        'opens-center': this.opens === 'center',
        linked: this.linkedCalendars
      }
    },
    pickerStyles() {
      let yPos = 0

      if (document.getElementById('left-bottom-show') != null) {
        const el = document.getElementById('left-bottom-show')
        const rect = el.getBoundingClientRect()
        yPos = window.innerWidth - rect.left - rect.width
      }

      return {
        right: this.opens === 'left' ? `${yPos}px` : '',
        'margin-left': this.opens === 'left' ? '-400px' : ''
      }
    },
    isClear() {
      return !this.dateRange.startDate || !this.dateRange.endDate
    },
    isIe11() {
      return isIe11()
    }
  },
  watch: {
    minDate() {
      const dt = DateUtil.validateDateRange(
        this.monthDate,
        this.minDate || new Date(),
        this.maxDate
      )
      this.changeLeftMonth({
        year: dt.getFullYear(),
        month: dt.getMonth()
      })
    },
    maxDate() {
      const dt = DateUtil.validateDateRange(
        this.nextMonthDate,
        this.minDate,
        this.maxDate || new Date()
      )
      this.changeRightMonth({
        year: dt.getFullYear(),
        month: dt.getMonth()
      })
    },
    'dateRange.startDate'(value) {
      this.start = !!value && !this.isClear ? new Date(value) : null

      if (this.isClear) {
        this.start = null
        this.end = null
        return
      }

      this.start = new Date(this.dateRange.startDate)
      this.end = new Date(this.dateRange.endDate)
    },
    'dateRange.endDate'(value) {
      this.end = !!value && !this.isClear ? new Date(value) : null
      this.nextMonthDate = new Date(value || new Date())
      this.monthDate = DateUtil.prevMonth(this.nextMonthDate)
      if (this.isClear) {
        this.start = null
        this.end = null
        return
      }

      this.start = new Date(this.dateRange.startDate)
      this.end = new Date(this.dateRange.endDate)
    },
    isOpen: {
      handler(value) {
        if (typeof document === 'object')
          this.$nextTick(() => {
            value
              ? document.body.addEventListener('click', this.clickAway)
              : document.body.removeEventListener('click', this.clickAway)
          })
      },
      immediate: true
    }
  },
  methods: {
    changeLeftMonth(value) {
      const newDate = new Date(value.year, value.month, 1)
      this.monthDate = newDate
      if (
        this.linkedCalendars ||
        DateUtil.yearMonthFormat(this.monthDate) >=
          DateUtil.yearMonthFormat(this.nextMonthDate)
      ) {
        this.nextMonthDate = DateUtil.validateDateRange(
          DateUtil.nextMonth(newDate),
          this.minDate,
          this.maxDate
        )
        if (
          DateUtil.yearMonthFormat(this.monthDate) ===
          DateUtil.yearMonthFormat(this.nextMonthDate)
        ) {
          this.monthDate = DateUtil.validateDateRange(
            DateUtil.prevMonth(this.monthDate),
            this.minDate,
            this.maxDate
          )
        }
      }
    },
    changeRightMonth(value) {
      const newDate = new Date(value.year, value.month, 1)
      this.nextMonthDate = newDate
      if (
        this.linkedCalendars ||
        DateUtil.yearMonthFormat(this.nextMonthDate) <=
          DateUtil.yearMonthFormat(this.monthDate)
      ) {
        this.monthDate = DateUtil.validateDateRange(
          DateUtil.prevMonth(newDate),
          this.minDate,
          this.maxDate
        )
        if (
          DateUtil.yearMonthFormat(this.monthDate) ===
          DateUtil.yearMonthFormat(this.nextMonthDate)
        ) {
          this.nextMonthDate = DateUtil.validateDateRange(
            DateUtil.nextMonth(this.nextMonthDate),
            this.minDate,
            this.maxDate
          )
        }
      }
    },
    updateStartText(e) {
      const value = e.target.value
      this.start = DateUtil.updateDate(value, this.start)
    },
    updateEndText(e) {
      const value = e.target.value
      this.end = DateUtil.updateDate(value, this.end)
    },
    dateClick(value) {
      if (this.inSelection) {
        // 開始日の前に入力された場合は、その入力値を開始日に入れてリセットする
        if (DateUtil.isBefore(this.start, value, 'day') === 0) {
          this.start = new Date(value)
          this.end = new Date(value)
          return
        }

        this.inSelection = false

        // 開始日と終了日が同じ場合は、共に入力値を同日にした上でリセットする
        if (DateUtil.isSame(this.start, value, 'day') === 0) {
          return
        }

        this.end = DateUtil.updateTime(value, this.end, this.timePicker)

        if (this.end < this.start) {
          this.inSelection = true
          this.start = DateUtil.updateTime(value, this.start, this.timePicker)
        }

        // if (!this.inSelection && this.autoApply) {
        //     this.clickedApply()
        // }
      } else {
        this.start = DateUtil.updateTime(value, this.start, this.timePicker)
        this.end = DateUtil.updateTime(value, this.end, this.timePicker)
        this.inSelection = true
        // if (this.autoApply) {
        //   this.clickedApply()
        // }
      }
    },
    hoverDate(value) {
      const dt = DateUtil.updateTime(value, this.end, this.timePicker)
      if (this.inSelection && dt >= this.start) this.end = dt
    },
    togglePicker(value, event) {
      if (typeof value === 'boolean') {
        this.isOpen = value
      } else {
        this.isOpen = !this.isOpen
      }

      if (event === true) this.$emit('toggle', this.isOpen, this.togglePicker)
    },
    clickedApply() {
      this.togglePicker(false, true)
      this.$emit('update', {
        startDate: this.start,
        endDate: this.end
      })
      this.nextMonthDate = new Date(this.end)
      this.monthDate = DateUtil.prevMonth(this.nextMonthDate)
    },
    clickAway() {
      if (this.isOpen) {
        const startDate = !this.clear ? this.dateRange.startDate : ''
        const endDate = !this.clear ? this.dateRange.endDate : ''
        this.start = startDate ? new Date(startDate) : null
        this.end = endDate ? new Date(endDate) : null
        this.togglePicker(false, true)
      }
    },
    clickIgnore() {
      if (!this.isOpen) {
        const startDate = !this.clear ? this.dateRange.startDate : ''
        const endDate = !this.clear ? this.dateRange.endDate : ''
        this.start = startDate ? new Date(startDate) : null
        this.end = endDate ? new Date(endDate) : null
      }
    },
    clickRange(values) {
      this.start = new Date(values[0])
      this.end = new Date(values[1])
      this.changeLeftMonth({
        month: this.start.getMonth() + 1,
        year: this.start.getFullYear()
      })
      if (this.autoApply) {
        this.clickedApply()
      }
    },
    onUpdateStartTime(value) {
      this.start = DateUtil.setTime(value)
    },
    onUpdateEndTime(value) {
      this.end = DateUtil.setTime(value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/picker';

.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
