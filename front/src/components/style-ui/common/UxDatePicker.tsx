import { memo } from 'react';
import DatePicker from 'react-datepicker';

import { ko } from 'date-fns/locale'; // 한국어 로케일

import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/styles/common/UxDatePicker.module.scss';

interface DatePickerProps {
  date: Date | null;
  onChange: (date: Date | null) => void;
}

const UxDatePicker = ({ date, onChange }: DatePickerProps) => {
  return (
    <div className={styles.datePickerWrapper}>
      {/* <div> */}
      <DatePicker
        locale={ko} // 한글 설정
        selected={date} // 현재 날짜 값
        onChange={onChange} // 날짜 변경 함수
        dateFormat="yyyy.MM.dd" // 표시 형식
        //   className={styles.customInput} // 입력창에 우리 스타일 입히기
        autoComplete="off"
        placeholderText="날짜를 선택하세요"
      />
    </div>
  );
};

export default memo(UxDatePicker);
