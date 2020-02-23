import i18n from '@/locales/i18n'
export const gender = ['男', '女']
export const resTypes = [
  { id: 0, name: i18n.t('entity.res.type0') },
  { id: 1, name: i18n.t('entity.res.type1') },
  { id: 2, name: i18n.t('entity.res.type2') },
  { id: 3, name: i18n.t('entity.res.type3') }
]

export const grantTypes = [
  { name: i18n.t('entity.client.type.authorizationCode'), value: 'authorization_code' },
  { name: i18n.t('entity.client.type.password'), value: 'password' },
  { name: i18n.t('entity.client.type.refreshToken'), value: 'refresh_token' },
  { name: i18n.t('entity.client.type.sms'), value: 'sms' },
  { name: i18n.t('entity.client.type.email'), value: 'email' }
]
