import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    rules: {
      // 1. 임포트 정렬 규칙
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 익숙한 업무 환경 스타일의 그룹화:
            ['^react', '^@react', '^next', '^@next'], // 1. 리액트 및 넥스트 프레임워크
            ['^@?\\w'], // 2. 기타 외부 라이브러리
            ['^@/'], // 3. 절대 경로 (@/...)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // 4. 상위 폴더 상대 경로 (../)
            ['^\\./(?![^/]*\\.(?!scss|css)$)([^/]*)$'], // 5. 현재 폴더 상대 경로 (./)
            ['^.+\\.s?css$'], // 6. 스타일 파일
          ],
        },
      ],
      'simple-import-sort/exports': 'error', // export 정렬
      'import/first': 'error', // 모든 import는 파일 최상단에
      'import/newline-after-import': 'error', // import 후 한 줄 띄우기
      'import/no-duplicates': 'error', // 중복 import 금지
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**', // 추가해두면 좋습니다
  ]),
]);

export default eslintConfig;
