# OSS Week 11 — React Course Manager (Student Starter)

React + Vite 기반 학생 배포용 Sample Project입니다. **조회와 삭제는 완성**, 등록 및 완료 변경은 학생이 직접 구현하도록 `TODO`로 남겨두었습니다.

## 실행 방법

Node.js 20.19+ 또는 22.12+ 권장.

```bash
npm install
npm run dev
```

브라우저에 표시되는 Local URL에 접속하세요. 빌드 테스트: `npm run build`.

## 소스 구조

- `src/App.jsx`: 페이지 전체 레이아웃
- `src/components/CourseList.jsx`: State 및 목록, 삭제 로직, **TODO 1/2**
- `src/components/CourseItem.jsx`: Props로 데이터를 받고 이벤트 콜백 호출
- `src/data/courses.js`: 초기 과목 데이터
- `src/App.css`: 전체 디자인

## 수행 내용

1. 코드를 실행하고 목록 조회·삭제를 확인합니다.
2. 초기 과목 5개 이상, 제목, CSS 3곳 이상 변경합니다.
3. `CourseList.jsx`의 **TODO 1**: 과목 등록 (빈 값 입력 방지, 고유 id 지정, State 업데이트).
4. `CourseList.jsx`의 **TODO 2**: 완료 체크박스 클릭 시 `completed` 상태 변경.
5. 선택: 검색/필터, 이름 수정 기능 추가.
6. GitHub에 Commit/Push 후 Vercel에 배포합니다.
7. README에 프로젝트 소개, 주요 코드 분석 2개, 변경 내용, Weekly Review, GitHub URL, Vercel URL을 정리합니다.

## 확인할 질문

- `CourseList`와 `CourseItem`의 역할은?
- 왜 `courses`를 직접 수정하지 않고 `setCourses()`를 사용할까요?
- `map()`과 `filter()`는 각각 어떤 목적인가요?
- `course`, `onDelete`, `onToggle` Props는 어디에서 전달되나요?
- 브라우저 새로고침 시 데이터가 초기화되는 이유는? (DB/localStorage 없음)

> 교육 목적의 로컬 State 앱입니다. 서버 API 및 데이터베이스는 사용하지 않습니다.


# WEEK 11 OSS REVIEW

## 1. Project Structure:
- src/App.jsx: 앱의 최상위 컴포넌트. 상단 header, 하단 footer, 그리고 CourseList를 배치함.
- src/components/CourseList.jsx: 실질적 데이터와 로직을 담당하는 컴포넌트. useState로 과목 목록 관리, 전체/완료/진행 중을 계산, 삭제 추가 완료 토글 함수를 정의해 자식에게 전달.
- src/components/CourseItem.jsx: Row의 UI만 담당하는 자식 컴포넌트. 부모에게 받은 과목 정보를 화면에 표시, 체크박스나 삭제 버튼 클릭 시 부모의 함수를 호출.
## 2. Component & Props: CourseList와 CourseItem의 관계 및 Props 전달 방식
- 관계: CourseList가 부모, CourseItem 자식.
- 전달 방식: CourseList 내부에서 courses.map으로 배열 순회, course와 onDelete,onToggle을 HTML 속성처럼 태그에 적어 자식으로 내려줌.

## 3. State & Event: useState를 이용한 상태 관리 및 삭제 버튼의 동작 원리
- 상태 선언
- 삭제 동작 순서 및 원리: CourseItem의 Delete 버튼을 클릭하면 onClick={() => onDelete(course.id)} 실행, 부모 handleDelete(id) 호출 -> window.confirm()으로 삭제 여부 확인 -> setCourses(previous => previous.filter(course => course.id !== id)) 실행
기존 배열에서 요소를 직접 지우지 않고, filter() 메서드로 클릭된 id와 다른 과목들만 모든 new 배열을 만들어 setCourses에 전달. React는 new 배열로 교체된 것 감지 후 목록과 통계를 다시 렌더링.
## 4. Code Analysis: 주요 코드 2개(각 5~15줄)를 선택하여 동작 원리 설명
- 1. function handleDelete(id) {
if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
  setCourses(previous => previous.filter(course => course.id !== id));
}
const doneCount = courses.filter(course => course.completed).length;
설명 포인트: filter로 특정 id를 제외한 새 배열을 만들어 상태를 갱신하는 원리와, 별도의 State 없이 기존 courses 배열에서 completed === true인 개수만 계산해 통계를 내는 방식.
- 2. <input
  className="check"
  type="checkbox"
  checked={course.completed}
  onChange={() => onToggle(course.id)}
  aria-label={`${course.name} 완료 여부`}
/>
<div>
  <div className={`course-title ${course.completed ? "done" : ""}`}>
    {course.name}
  </div>
  <div className="course-id">Course #{course.id}</div>
</div>
설명 포인트: course.completed 불리언 값에 따라 체크박스 체크 여부가 결정되고, 삼항 연산자(? "done" : "")를 이용해 완료된 과목에만 취소선 스타일 클래스(done)가 동적으로 붙는 원리.