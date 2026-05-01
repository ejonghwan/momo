// export interface appMetadata {
//    provider: string;
// }

// export interface UserMetaData {
//    avatar_url: string;
//    email: string;
//    email_verified: boolean;
//    full_name: string;
//    iss: string;
//    name: string;
//    phone_verified: boolean
//    picture: string;
//    provider_id: string;
//    sub: string;
// }

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar_url: string;
  provider: string;
  class: string; // 1: 관리자, 2: ??, 3: 유저
  self_categorys: string[]; // 자주 쓰는 카테고리 추가. 글 작성 시 category를 합성해서 화면에 뿌린다음 유저가 선택한 글category db에 저장
  assets: string[]; // 자산. 카드 or 계좌
  default_asset: string; // 기본선택한 카드 or 계좌

  last_sign_in: string;
  created_at: string;
  updated_at: string;
}
