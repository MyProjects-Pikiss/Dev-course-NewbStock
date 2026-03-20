# NewbStock

> 주가 변동, 관련 뉴스, 시장 지표를 한 흐름에서 보여주기 위해 실시간 스트리밍과 배치 ETL을 결합한 주식 데이터 프로젝트

## 소개

NewbStock은 변동성이 큰 종목의 가격 변화와 관련 뉴스를 함께 확인하고, 한국/미국 시장 데이터와 일부 시장 지표, 과거 시점 기준 수익률 계산까지 한 화면 흐름에서 볼 수 있도록 구성한 서비스입니다.

실시간으로 반응이 필요한 주가 데이터는 Kafka 기반 스트리밍으로 처리하고, 뉴스·시장 지표·과거 데이터처럼 주기 수집이 필요한 항목은 Airflow 기반 배치 ETL로 분리했습니다. 이후 가공한 데이터를 S3, RDS, Redshift에 적재하고, Django API와 웹 프론트엔드에서 조회할 수 있도록 연결했습니다.

## 주요 기능

- 급등 / 급락 종목 조회
- 종목 관련 뉴스 조회
- 한국 / 미국 시장 전환
- 시가총액 상위 종목 데이터 조회
- 금리, 환율, 지수, 뉴스심리지수 등 시장 지표 조회
- 과거 시점 투자 금액 기준 수익률 계산

## 시스템 구성

```text
외부 데이터 소스
 ├─ 한국투자증권 API
 ├─ Naver News API
 ├─ ECOS / FinanceDataReader / yfinance
        ↓
데이터 수집
 ├─ 실시간 처리: Kafka
 └─ 배치 처리: Airflow
        ↓
저장 계층
 ├─ S3
 ├─ RDS
 └─ Redshift
        ↓
서비스 계층
 ├─ Django API
 └─ Web Frontend
```

실시간 데이터와 주기 수집 데이터를 분리해 처리함으로써, 빠르게 반응해야 하는 정보와 누적·가공이 필요한 정보를 각각 다른 흐름으로 다룰 수 있도록 구성했습니다.

## 구현 포인트

### 1. 실시간 가격 변화와 뉴스 흐름 연결
주가 데이터만 따로 보여주기보다, 변동성이 큰 종목에 대해 관련 뉴스를 함께 제공할 수 있도록 흐름을 구성했습니다.

### 2. 실시간 / 배치 처리 분리
빠른 반응이 필요한 데이터는 Kafka 스트리밍으로, 정기 수집이 적합한 데이터는 Airflow DAG로 분리해 파이프라인을 구성했습니다.

### 3. 저장 계층 분리
수집한 데이터를 성격에 따라 S3, RDS, Redshift에 나누어 적재하고, 웹 서비스와 분석 조회에 맞게 활용할 수 있도록 구성했습니다.

### 4. 웹에서 확인 가능한 결과물 연결
데이터 수집과 적재에 그치지 않고, Django API와 프론트엔드를 통해 차트, 뉴스, 지표, 수익률 계산 결과를 직접 확인할 수 있도록 연결했습니다.

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
- **Backend**: Django, Django REST Framework, Gunicorn, Nginx
- **Data Pipeline**: Apache Kafka, Apache Airflow
- **Database / Storage**: PostgreSQL(RDS), Redshift, S3
- **Infra**: Docker, AWS EC2, AWS Load Balancer, AWS Route53, AWS Lambda
- **Data Sources**: 한국투자증권 OpenAPI, Naver News API, ECOS, FinanceDataReader, yfinance

## 참고

- 프로젝트는 외부 API, AWS 리소스, 데이터베이스 설정에 의존하는 부분이 있습니다.
- 실시간 처리, 배치 처리, API 서버, 웹 프론트엔드가 디렉터리별로 분리되어 있습니다.
