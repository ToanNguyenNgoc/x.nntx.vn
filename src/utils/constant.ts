export enum NOTI_TYPE {
  FOLLOW = 1,
  CHAT = 2
}
export class CONST {
  static isDev = window.location.hostname === 'localhost'
  static key = {
    pusherKey: import.meta.env.VITE_REACT_APP_PUSHER_KEY || ''
  }
  static queryKey = {
    users: 'users',
    user: 'user',
    follows: 'follows',
    topics: 'topics',
    messages:'messages'
  }
}