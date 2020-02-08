import lodash from 'lodash'
import { TranslateResult, Values } from 'vue-i18n'
declare module 'vue/types/vue' {

  interface Vue {
    _: typeof lodash,
    $t: { (key: string, values?: Values): TranslateResult; (key: string, locale: string, values?: Values): TranslateResult; }
  }
}
