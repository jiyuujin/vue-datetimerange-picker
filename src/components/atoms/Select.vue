<template>
  <div :style="getWrapperStyles" class="select-wrapper">
    <select
      v-model="newValues"
      :style="getStyles"
      class="atoms-select"
      @input="update"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :tabindex="option.value"
      >
        {{ getText(option.text) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    options: {
      type: Array as PropType<
        Array<{
          text: string
          value: number
        }>
      >,
      required: true
    },
    values: {
      type: Number as PropType<number>,
      required: true
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    width: {
      type: String as PropType<string>,
      default: 'auto'
    },
    size: {
      type: String as PropType<string>,
      default: '',
      validator(val) {
        return ['xs', 'sm', '', 'lg'].includes(val)
      }
    }
  },
  data() {
    return {
      newValues: this.values
    }
  },
  computed: {
    getWrapperStyles() {
      let style = {}
      style = Object.assign(
        {
          width: '100%'
        },
        style
      )
      return style
    },
    getStyles() {
      let style = {}

      style = Object.assign({ width: this.width }, style)

      return style
    }
  },
  methods: {
    getText(text: string) {
      const prefix = this.prefix !== '' ? this.prefix : ''
      const suffix = this.suffix !== '' ? this.suffix : ''
      return `${prefix} ${text} ${suffix}`
    },
    update(event: any) {
      // console.log(this.options[event.target.selectedIndex].value)
      this.$emit('handleSelect', this.options[event.target.selectedIndex].value)
    }
  }
})
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    width: 6px;
    height: 6px;
    border: 0;
    border-bottom: solid 2px #b4b3b3;
    border-right: solid 2px #b4b3b3;
    transform: rotate(45deg);
    position: absolute;
    top: 50%;
    margin-top: -4px;
    margin-left: -24px;
  }
}

.atoms-select {
  appearance: none;
  background: transparent;
  padding: 1rem 2.8rem 1rem 1rem;
  background-color: #fff;
  color: #000;
  position: relative;
  border: 1px solid #b4b3b3;
  border-radius: 2px;
  outline: 0;
  line-height: 1;
}

.atoms-select::-ms-expand {
  display: none;
}
</style>
