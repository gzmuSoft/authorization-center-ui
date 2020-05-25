<template lang="pug">
  #center-index
    v-menu(offset-y, top, :close-on-content-click="false", v-if="isAdmin")
      template(v-slot:activator="{ on }")
        v-btn(v-on="on", absolute, color="primary", bottom, right, dark, fab)
          v-icon mdi-eye
      v-card
        v-card-text
          v-checkbox(v-model="show", v-for="(value, key, index) in data", :key="key", :label="$t(`tip.dashboard.${key}`)"
            :value="index", dense, :data-value="value")
    v-row
      template(v-for="chart in charts")
        v-col.my-3(cols="12", sm="6", :key="chart.title")
          v-skeleton-loader.ma-3.mt-9(:loading="loading", type="card", transition="slide-y-transition")
            chart-card(:title="$t(`tip.dashboard.${chart.name}`)", :subTitle="$t(`tip.dashboard.subTitle.${chart.name}`)", :icon="chart.icon",
              :description="$t(`tip.dashboard.description.${chart.name}`)", :value="chart.value", :labels="chart.labels",
              :color="chart.color")
      template(v-for="(value, key, index) in data")
        v-col.my-3(cols="12", sm="6", md="3", :key="key", v-if="show.indexOf(index) !== -1")
          v-skeleton-loader.ma-3.mt-9(:loading="loading", type="image", :max-height="150", transition="slide-y-transition")
            data-card(:iconColor="icons[index].iconColor",
              :icon="icons[index].icon", :subTitle="$t(`tip.dashboard.${key}`)",
              :main="`${value}`", :actionIcon="icons[index].icon", :action="$t(`tip.dashboard.description.${key}`)")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataCard from '@/components/DataCard.vue'
import { Getter, State } from 'vuex-class'
import ChartCard from '@/components/ChartCard.vue'
import { dashboard, dashboardDate } from '@/api/dashboard'
const namespace = 'auth'
@Component({ components: { ChartCard, DataCard } })
export default class Index extends Vue {
  @Getter('isAdmin', { namespace }) protected isAdmin!: Boolean
  @State('isStudent', { namespace }) protected isStudent!: Boolean
  @State('isTeacher', { namespace }) protected isTeacher!: Boolean
  loading = true
  show = [0, 1, 4, 5]
  icons = [
    { icon: 'mdi-football-australian', iconColor: 'light-blue darken-1' },
    { icon: 'mdi-security', iconColor: 'deep-purple' },
    { icon: 'mdi-account-check', iconColor: 'light-green darken-1' },
    { icon: 'mdi-account-key', iconColor: 'deep-orange ' },
    { icon: 'mdi-login-variant', iconColor: 'success' },
    { icon: 'mdi-logout-variant', iconColor: 'error' },
    { icon: 'mdi-account-multiple-outline', iconColor: 'indigo darken-1' },
    { icon: 'mdi-account-network', iconColor: 'teal darken-1' },
    { icon: 'mdi-school', iconColor: 'yellow darken-2' },
    { icon: 'mdi-ninja', iconColor: 'pink lighten-1' },
    { icon: 'mdi-security-network', iconColor: 'deep-orange lighten-1' }
  ]
  data = {
    apiNumber: 0,
    authorizationServerApiNumber: 0,
    userSuccessLogin: 0,
    userFailureLogin: 0,
    loginSuccess: 0,
    loginFailure: 0,
    userCount: 0,
    studentCount: 0,
    teacherCount: 0,
    clientCount: 0,
    roleCount: 0
  }
  charts = [
    {
      name: 'dateApi',
      icon: 'mdi-star-face',
      color: 'success',
      value: [],
      labels: []
    },
    {
      name: 'loginDateApi',
      icon: 'mdi-star-face',
      color: 'info',
      value: [],
      labels: []
    }
  ]
  async created () {
    if (this.isAdmin) this.show = [0, 1, 4, 5]
    else this.show = [2, 3, 7, 8]
    try {
      const [dashboardRes, dashboardDateRes] = await Promise.all([
        dashboard(), dashboardDate()
      ])
      this.data = dashboardRes.data
      this.chartDate(dashboardDateRes.data.dateApi, 0)
      this.chartDate(dashboardDateRes.data.loginDateApi, 1)
    } finally {
      this.loading = false
    }
  }
  chartDate (res, num) {
    let date = new Date()
    this.charts[num].labels = []
    this.charts[num].value = []
    for (let i = 1; i <= 7; i++) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
      const day = date.getDate()
      const key = `${year}-${month}-${day}`
      this.charts[num].labels.unshift(key.substr(5))
      if (res.hasOwnProperty(key)) this.charts[num].value.unshift(res[key])
      else this.charts[num].value.unshift(0)
      date = new Date(date.valueOf() - 1000 * 60 * 60 * 24)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
