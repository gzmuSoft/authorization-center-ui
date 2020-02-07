import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { oauthMe } from '@/api/oauth'

export interface IUser {
  name: String,
  email: String,
  avatar: String,
  image: String,
  phone: String
}

@Module({ namespaced: true, name: 'user' })

export default class User extends VuexModule implements IUser {
  avatar: String = null;
  email: String = null;
  image: String = null;
  name: String = null;
  phone: String = null;

  @Mutation
  SET_USER (user) {
    this.avatar = user.avatar
    this.email = user.email
    this.image = user.image
    this.name = user.name
    this.phone = user.phone
  }

  @Action
  getUser () {
    oauthMe().then(res => {
      this.SET_USER(res.data)
    })
  }
}
