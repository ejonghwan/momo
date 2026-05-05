export interface Banks {
  id: string;
  icon: string;
  bank: string;
  code: string;
}

export interface Assets {
  id: string;
  name: string;
  default: boolean;
  bank: Banks;
}

export interface Categorys {
  id: string;
  name: string;
  default: boolean;
}

export interface UserType {
  id: string;
  email: string;
  nickname: string;
  avatar_url: string;
  provider: string;
  role: 'admin' | 'manager' | 'user';
  self_categorys: Categorys[]; // 자주 쓰는 카테고리 추가. 글 작성 시 category를 합성해서 화면에 뿌린다음 유저가 선택한 글category db에 저장
  assets: Assets[]; // 자산. 카드 or 계좌
  default_asset: string; // 기본선택한 카드 or 계좌

  last_sign_in: string;
  created_at: string;
  updated_at: string;
}

// export interface UserProfile {
//   self_categorys: string[] | null;
//   assets: string[];
//   default_asset: string | null;
// }

// export type FullUser = User & UserProfile;
