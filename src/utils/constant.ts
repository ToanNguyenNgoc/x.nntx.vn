export class CONST {
  static key = {
    pusher_key: import.meta.env.VITE_REACT_APP_PUSHER_KEY || ''
  }
  static queryKey = {
    users: 'users',
    user: 'user',
    follows: 'follows'
  }
}