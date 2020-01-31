<template lang="pug">
  #auth-login.fill-height.mx-auto.justify-center.align-center.d-flex.flex-column
    .loading
      .loading-show
        div
        div
        div
          div
        div
          div
    p.blue--text(style="width:300px") {{$t(tipI18n)}}{{last}}
    v-progress-linear(indeterminate, rounded, height="6", striped)
    v-expand-transition
      v-btn.mt-6(color="primary", outlined, v-show="show", @click="handleBack") {{$t("tip.login.again")}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUrlParams } from '@/utils'
import { AuthModule } from '@/store'
import { oauthToken } from '@/api/oauth'

@Component
export default class Login extends Vue {
  private tipI18n: string = 'tip.login.loading'
  private last: String = '.'
  private show: Boolean = false
  created () {
    this.showLast()
    this.showBack()
    const code = getUrlParams('code')
    oauthToken(code).then(res => {
      AuthModule.oauthToken(res.data)
      this.tipI18n = 'tip.login.success'
      setTimeout(() => {
        this.handleBack()
      }, 1000)
    }).catch(error => {
      this.$toast.error(this.$t('tip.login.fail'))
      this.tipI18n = `tip.error.${error.response.status}`
    })
  }
  showLast () {
    setInterval(() => {
      this.last += '.'
      if (this.last.length > 3) this.last = ''
    }, 500)
  }
  showBack () {
    setTimeout(() => {
      this.show = true
    }, 6000)
  }
  handleBack () {
    this.$router.push({ name: 'home' })
  }
}
</script>

<style scoped>
@keyframes loading-show {
  0% { transform: rotate(0) }
  100% { transform: rotate(360deg) }
}
.loading-show div { box-sizing: border-box!important }
.loading-show > div {
  position: absolute;
  width: 144px;
  height: 144px;
  top: 28px;
  left: 28px;
  border-radius: 50%;
  border: 16px solid #000;
  border-color: #e15b64 transparent #e15b64 transparent;
  animation: loading-show 1s linear infinite;
}

.loading-show > div:nth-child(2), .loading-show > div:nth-child(4) {
  width: 108px;
  height: 108px;
  top: 46px;
  left: 46px;
  animation: loading-show 1s linear infinite reverse;
}
.loading-show > div:nth-child(2) {
  border-color: transparent #f8b26a transparent #f8b26a
}
.loading-show > div:nth-child(3) { border-color: transparent }
.loading-show > div:nth-child(3) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}
.loading-show > div:nth-child(3) div:before, .loading-show > div:nth-child(3) div:after {
  content: "";
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -16px;
  left: 48px;
  background: #e15b64;
  border-radius: 50%;
  box-shadow: 0 128px 0 0 #e15b64;
}
.loading-show > div:nth-child(3) div:after {
  left: -16px;
  top: 48px;
  box-shadow: 128px 0 0 0 #e15b64;
}

.loading-show > div:nth-child(4) { border-color: transparent; }
.loading-show > div:nth-child(4) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}
.loading-show > div:nth-child(4) div:before, .loading-show > div:nth-child(4) div:after {
  content: "";
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -16px;
  left: 30px;
  background: #f8b26a;
  border-radius: 50%;
  box-shadow: 0 92px 0 0 #f8b26a;
}
.loading-show > div:nth-child(4) div:after {
  left: -16px;
  top: 30px;
  box-shadow: 92px 0 0 0 #f8b26a;
}
.loading {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
}
.loading-show {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.loading-show div { box-sizing: content-box; }
</style>
