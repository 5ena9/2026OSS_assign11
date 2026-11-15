import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="topline">2026 FALL SEMESTER · OSS</p>
          <h1>나만의 수강 과목 플래너</h1>
          <p className="subtitle">전공 및 교양 과목 이수 현황 관리 앱</p>
        </div>
        <span className="tag">MY STUDY TRACKER</span>
      </header>
      <CourseList />
      <footer className="bottom">
        <span>OSS Assignment 4-3 · React</span>
        <span>Local state only · Refresh resets data</span>
      </footer>
    </main>
  );
}