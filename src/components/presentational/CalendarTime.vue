<template>
  <div class="calendar-time">
    <select-comp :options="hours" :values="hour" @handleSelect="updateHour" />
    :
    <select-comp
      :options="minutes"
      :values="minute"
      @handleSelect="updateMinute"
    />
    <template v-if="secondPicker">
      :
      <select-comp
        :options="seconds"
        :values="second"
        @handleSelect="updateSecond"
      />
    </template>
    <select-comp
      v-if="!hour24"
      :options="ampms"
      :values="ampm"
      @handleSelect="updateAmpm"
    />
  </div>
</template>

<script>
import SelectComp from '@/components/atoms/Select.vue'

export default {
  components: {
    SelectComp
  },
  filters: {
    formatNumber: (value) => {
      if (value < 10) {
        return '0' + value.toString()
      }
      return value.toString()
    }
  },
  props: {
    minuteIncrement: {
      type: Number,
      default: 5
    },
    hour24: {
      type: Boolean,
      default: true
    },
    secondPicker: {
      type: Boolean,
      default: false
    },
    currentTime: {
      type: Date,
      default() {
        return new Date()
      }
    }
  },
  data() {
    const current = this.currentTime ? this.currentTime : new Date()
    const hours = current.getHours()

    return {
      hour: this.hour24 ? hours : hours % 12 || 12,
      minute:
        current.getMinutes() - (current.getMinutes() % this.minuteIncrement),
      second: current.getSeconds(),
      ampm: hours < 12 ? 1 : 2
    }
  },
  computed: {
    hours() {
      const values = []
      const max = this.hour24 ? 24 : 12
      for (let i = 0; i < max; i++) {
        values.push({
          value: this.hour24 ? i : i + 1,
          text: this.hour24 ? i : (i + 1) | this.formatNumber
        })
      }
      return values
    },
    minutes() {
      const values = []
      const max = 60
      for (let i = 0; i < max; i = i + this.minuteIncrement) {
        values.push({
          value: i,
          text: i | this.formatNumber
        })
      }
      return values
    },
    seconds() {
      const values = []
      const max = 60
      for (let i = 0; i < max; i = i + 1) {
        values.push({
          value: i,
          text: i | this.formatNumber
        })
      }
      return values
    },
    ampms() {
      return [
        {
          value: 1,
          text: 'am'
        },
        {
          value: 2,
          text: 'pm'
        }
      ]
    }
  },
  watch: {
    hour() {
      this.onChange()
    },
    minute() {
      this.onChange()
    },
    second() {
      this.onChange()
    },
    ampm() {
      this.onChange()
    }
  },
  methods: {
    getHour() {
      if (this.hour24) {
        return this.hour
      } else {
        if (this.hour === 12) {
          return this.ampm === 1 ? 0 : 12
        } else {
          return this.hour + (this.ampm === 2 ? 12 : 0)
        }
      }
    },
    updateHour(value) {
      this.hour = value
      this.onChange()
    },
    updateMinute(value) {
      this.minute = value
      this.onChange()
    },
    updateSecond(value) {
      this.second = value
      this.onChange()
    },
    updateAmpm(value) {
      this.ampm = value
      this.onChange()
    },
    onChange() {
      this.$emit('update', {
        hours: this.getHour(),
        minutes: this.minute,
        seconds: this.second
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-time {
  text-align: center;
  margin: 4px auto 0 auto;
  line-height: 30px;
  position: relative;
  display: flex;
  justify-content: center;

  select.disabled {
    color: #ccc;
    cursor: not-allowed;
  }
}

select .hourselect,
select .minuteselect,
select .secondselect,
select .ampmselect {
  width: 50px;
  margin: 0 auto;
  background: #eee;
  border: 1px solid #eee;
  padding: 2px;
  outline: 0;
  font-size: 12px;
}
</style>
