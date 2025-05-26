export interface ReqLogin {
  email: string;
  password: string
}
//
export interface ResLogin extends ResUser {
  token: string
}
export interface ResRolePivot {
  model_type: string;
  model_id: number;
  role_id: number;
}

export interface ResRole {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: ResRolePivot;
}

export interface ResUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  telephone: string | null;
  active: boolean;
  birthday: string;
  gender: number; // 1 might represent male; consider using enum
  created_at: string;
  updated_at: string;
  roles: ResRole[];
  avatar: string;
}
