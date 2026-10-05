# 🐍 python_rest_api_practice (Python Flask REST API 및 Producer/Consumer 예제)

Python Flask 및 Requests 모듈을 이용하여 REST API 구축, HTTP JSON 통신 및 데이터 생산자/소비자 패턴을 실습하는 디렉토리입니다.

---

## 🛠️ 주요 스크립트 역할 (Script Breakdown)

- **`main.py`**: Flask 기반의 REST API 웹 서버 실행 파일 (`@app.route('/api', ...)`).
- **`produce.py`**: 생성된 JSON 데이터를 REST 엔드포인트로 전송하는 생산자(Producer) 스크립트.
- **`consume.py`**: 엔드포인트로부터 수신된 반응 데이터를 파싱하여 처리하는 소비자(Consumer) 스크립트.

---

## 🚀 실행 방법 (Execution Guide)

```bash
# 1. 서버 실행
python main.py

# 2. 메시지 생산 및 소비 테스트 (별도 터미널)
python produce.py
python consume.py
```
