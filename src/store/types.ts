import { UserState } from '@/store/module/user'
import { RouteState } from '@/store/module/route'
import { BaseState } from '@/store/module/base'
import { AuthState } from '@/store/module/auth'

export interface RootState {
  user: UserState,
  route: RouteState,
  base: BaseState,
  auth: AuthState
}
