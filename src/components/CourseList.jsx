import { useState } from "react";
import CourseItem from "./CourseItem.jsx";
import { initialCourses } from "../data/courses.js";

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState("");

  //[추가] 카테고리 선택, 빈 입력 에러 메시지, 검색어, 필터 상태 State
  const [newCategory, setNewCategory] = useState('Major');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'DONE'
  
  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm("이 과목을 삭제하시겠습니까?")) return;
    setCourses((previous) => previous.filter((course) => course.id !== id));
  }

  // TODO 1 (필수): 과목 추가 기능을 구현하세요.
  function handleAdd(event) {
    event.preventDefault();
    const trimmedName = newName.trim();

    if (!trimmedName) {
      setError('과목명을 입력해 주세요.');
      return;
    }

    const nextId =
      courses.length > 0 ? Math.max(...courses.map(course => course.id)) + 1 : 1;

    const newCourse = {
      id: nextId,
      name: trimmedName,
      category: newCategory,
      completed: false,
    };

    setCourses(previous => [...previous, newCourse]);
    setNewName('');
    setError('');
  }

  // TODO 2 (필수): 완료 상태 변경 기능을 구현하세요.
  function handleToggle(id) {
    setCourses(previous =>
      previous.map(course =>
        course.id === id ? { ...course, completed: !course.completed } : course
      )
    );
  }

  //[추가]
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    if (filterStatus === 'DONE') return matchesSearch && course.completed;
    if (filterStatus === 'ACTIVE') return matchesSearch && !course.completed;
    return matchesSearch;
  });

  const doneCount = courses.filter((course) => course.completed).length;

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat">
          <span>전체 과목</span>
          <strong>{courses.length}</strong>
        </div>
        <div className="stat">
          <span>완료</span>
          <strong className="green">{doneCount}</strong>
        </div>
        <div className="stat">
          <span>진행 중</span>
          <strong className="blue">{courses.length - doneCount}</strong>
        </div>
      </section>
      <section className="panel">
        <div className="panel-header">
          <span className="small-note">{courses.length} courses</span>
        </div>

          실습 과제: 아래 Add 버튼과 완료 체크박스의 기능을 직접 구현하세요.
        
        <form className="add-form" onSubmit={handleAdd}>
          <input
            className="input"
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
              if (error) setError(""); // [추가] 다시 입력할 때 에러 문구 지우기
            }}
            placeholder="새 과목명을 입력하세요"
            aria-label="새 과목명"
          />

          {/* [추가] 카테고리 선택 드롭다운.*/}
          <select
            className="input select"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            aria-label="이수 구분 선택"
          >
            <option value="Major">Major</option>
            <option value="Elective">Elective</option>
          </select>

          <button className="btn primary" type="submit">
            + Add Course
          </button>
        </form>
        {error && <p className="error">{error}</p>}

        <div className="tools">
          <input
            className="input"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="과목명으로 검색..."
            aria-label="과목명 검색"
          />
          <select
            className="input select"
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
            aria-label="완료 상태 필터"
          >
            <option value="ALL">전체 보기</option>
            <option value="ACTIVE">진행 중</option>
            <option value="DONE">완료됨</option>
          </select>
        </div>

        <div className="list-head">
          <span>COURSE</span>
          <span>CATEGORY</span>
          <span>ACTIONS</span>
        </div>
        {filteredCourses.length === 0 && (
          <div className="empty">표시할 과목이 없습니다.</div>
        )}
        {filteredCourses.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </section>
    </>
  );
}
