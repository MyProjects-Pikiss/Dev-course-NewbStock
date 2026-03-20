# NewbStock

> 주식 데이터를 수집·가공하고, 웹에서 함께 탐색할 수 있도록 구성한 프로젝트

## 소개

NewbStock은 한국/미국 주식 데이터, 관련 뉴스, 일부 시장 지표를 한 흐름에서 확인할 수 있도록 구성한 웹 프로젝트입니다.

실시간으로 반응이 필요한 데이터와 주기적으로 수집하는 데이터를 분리해 처리하고, 가공된 결과를 API와 웹 화면으로 연결했습니다.  
주가 변화만 따로 보여주기보다, 뉴스와 지표를 함께 확인할 수 있도록 구성한 점에 초점을 두었습니다.

## 주요 기능

- 한국 / 미국 시장 전환
- 종목별 가격 흐름과 시계열 차트
- 급등 / 급락 종목 조회
- 종목 관련 뉴스 조회
- 일부 시장 지표 조회
- 과거 시점 기준 수익률 계산

## 전체 구성

```text
외부 데이터 소스
 ├─ 주식 가격 데이터
 ├─ 뉴스 데이터
 └─ 시장 지표 데이터
        ↓
실시간 처리: Kafka
배치 처리: Airflow
        ↓
저장 계층: S3 / RDS / Redshift
        ↓
Django API
        ↓
Web UI
```

실시간 데이터는 Kafka 기반으로 처리하고,  
주기 수집이 필요한 데이터는 Airflow 기반 ETL로 분리했습니다.  
이후 저장 계층에 적재한 데이터를 Django API가 가공해 웹 화면에 제공합니다.

## 저장소 구조

```text
.
├─ NewbStock_Airflow/   # 배치 ETL 및 적재 작업
├─ NewbStock_kafka/     # 실시간 스트리밍 producer / consumer
├─ NewbStock_Server/    # Django API 서버
└─ NewbStock_Web/       # 웹 프론트엔드
```

## 기술 스택

- **Frontend**: Next.js, React, Chart.js
- **Backend**: Django, Django REST Framework
- **Database / Storage**: PostgreSQL(RDS), Redshift, S3
- **Data Pipeline**: Apache Kafka, Apache Airflow
- **Infra**: Docker Compose, AWS
- **External APIs / Data Sources**: 한국투자 OpenAPI, Naver News API, ECOS, FinanceDataReader, yfinance

### Data Pipeline

- `NewbStock_kafka/`: producer / consumer 및 Kafka 실행 구성
- `NewbStock_Airflow/`: 배치 수집 및 적재용 DAG / 스크립트

## 참고

- 일부 기능은 외부 API 및 클라우드 자원 설정이 완료되어야 정상 동작합니다.
- 데이터 파이프라인과 웹 구성은 디렉터리별로 분리되어 있어 각 영역을 개별적으로 확인할 수 있습니다.
