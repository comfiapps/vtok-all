# 📂 src/page - 어드민 대시보드 페이지 명세

백오피스의 메인 화면 페이지 디렉토리입니다.

---

## 📄 파일 명세

- **`CategoryPage.js`**: 계층형 카테고리 트리 대시보드. N자리 단위(`strings.codeLength = 2`) 서브스트링으로 트리 계층 노드를 생성하고, 삭제 시 이관 모달(`HierarcialCategory`)을 제공합니다.
- **`FilePage.js`**: 파일 라이브러리 목록, 업로드, 수정 및 삭제 관리 대시보드.
- **`FileHistoryPage.js`**: 파일 작업 이력(Audit Log) 시간순 데이터그리드 모니터링 페이지.
