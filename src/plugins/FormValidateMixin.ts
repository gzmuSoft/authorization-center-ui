import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  $refs: {
    form: any
  }
  required (name) {
    return v => (!!v && v.length !== 0) || this.$t('tip.validate.required', [name])
  }
  maxLength (length) {
    return v => (!!v && v.length <= length) || this.$t('tip.validate.maxLength', [length])
  }
  minLength (length) {
    return v => (!!v && v.length >= length) || this.$t('tip.validate.minLength', [length])
  }
  equalsLength (length) {
    return v => (!!v && v.length === length) || this.$t('tip.validate.equalsLength', [length])
  }
  noRequiredRangeLength (min, max) {
    return v => (typeof (v) === 'undefined') || v === null || v.length === 0 ||
      (v.length >= min && v.length <= max) || this.$t('tip.validate.rangeLength', [min, max])
  }
  rangeLength (min, max) {
    return v => (!!v && v.length >= min && v.length <= max) || this.$t('tip.validate.rangeLength', [min, max])
  }
  email () {
    return v => (!!v && /.+@.+\..+/.test(v)) || this.$t('tip.validate.email')
  }
}
