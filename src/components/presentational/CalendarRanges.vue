<template>
  <div class="ranges">
    <ul v-if="ranges">
      <li
        v-for="(value, key) in ranges"
        :key="key"
        :data-range-key="key"
        :class="rangeClass(value)"
        @click="$emit('clickRange', value)"
      >
        {{ key }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import DateUtil from '@/utils/native'

export default Vue.extend({
  props: {
    ranges: {
      type: Object as PropType<object>,
      required: true
    },
    selected: {
      type: Object as PropType<{
        startDate: string
        endDate: string
      }>,
      required: true
    }
  },
  methods: {
    rangeClass(range: Date[]) {
      return {
        active:
          DateUtil.isSame(this.selected.startDate, range[0], 'date') &&
          DateUtil.isSame(this.selected.endDate, range[1], 'date')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.ranges {
  float: none;
  text-align: left;
  padding: 12px;

  ul {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    width: 100%;
  }

  li {
    font-size: 12px;
    padding: 8px 16px;
    cursor: pointer;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;

    &:first-child {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      border-left: 1px solid #ddd;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    &:hover {
      background-color: #eee;
    }

    &.active {
      background-color: #4392f5;
      color: #fff;
    }

    &:not(.active) {
      background-color: #fff;
      color: #000;
    }
  }
}

@media (min-width: 564px) {
  .ranges ul {
    width: 140px;
  }
}

@media (min-width: 730px) {
  .ranges {
    width: auto;
  }
}
</style>
