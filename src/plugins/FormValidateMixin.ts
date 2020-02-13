import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  $refs: {
    form: any
  }
  required (name) {
    return v => (!!v && v.length !== 0) || this.$t('tip.validate.required', [this.$t(name)])
  }
  max (number) {
    return v => (!!v && v <= number) || this.$t('tip.validate.max', [number])
  }
  min (number) {
    return v => (!!v && v >= number) || this.$t('tip.validate.min', [number])
  }
  maxLength (length) {
    return v => !v || (!!v && v.length <= length) || this.$t('tip.validate.maxLength', [length])
  }
  minLength (length) {
    return v => !v || (!!v && v.length >= length) || this.$t('tip.validate.minLength', [length])
  }
  equalsLength (length) {
    return v => (!!v && v.length === length) || this.$t('tip.validate.equalsLength', [length])
  }
  noRequiredRangeLength (min, max) {
    return v => !v || (v.length >= min && v.length <= max) || this.$t('tip.validate.rangeLength', [min, max])
  }
  rangeLength (min, max) {
    return v => (!!v && v.length >= min && v.length <= max) || this.$t('tip.validate.rangeLength', [min, max])
  }
  email () {
    return v => (!!v && /.+@.+\..+/.test(v)) || this.$t('tip.validate.email')
  }
}
