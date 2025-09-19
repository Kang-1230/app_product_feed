

````markdown
# 📦 app_product_feed

React Native + Expo 환경에서 구현한 상품 피드 애플리케이션입니다.  
상품 리스트를 **무한 스크롤**로 노출하고, 각 아이템 클릭 시 **상세 페이지**로 이동할 수 있습니다.  
실제 서버 API는 없고, 주어진 `products.json` mock 데이터를 기반으로 구현했습니다.

---

## 🚀 실행 및 빌드 방법

### 1. 프로젝트 설치
```bash
git clone https://github.com/Kang-1230/app_product_feed.git
cd app_product_feed
npm install
# 또는
yarn install
````

### 2. 로컬 실행

```bash
npx expo start
# 터미널에서 실행 후, iOS/Android 에뮬레이터나 Expo Go 앱으로 열기
```

### 3. Android 빌드 (APK)

```bash
eas build -p android --profile preview
```

### 4. iOS 빌드

```bash
eas build -p ios --profile preview
```

---

## 📂 폴더 구조

```bash
app_product_feed/
├── app/                 
│   ├── index.tsx        # 상품 피드 홈 화면
│   ├── product/[id].tsx # 상품 상세 화면
│   └── _layout.tsx      # 전역 레이아웃
├── components/          
│   ├── ProductCard.tsx
│   └── ProductList.tsx
├── hooks/               
├── utils/               
├── assets/              
├── package.json
└── README.md
```

---

## ⚙️ 기술 스택

* **Framework**: React Native + Expo
* **Navigation**: Expo Router (파일 기반 라우팅)
* **Styling**: NativeWind (Tailwind in React Native)
* **State Management**: Zustand (전역 상태 관리 + 데이터 공유)
* **빌드/배포**: Expo EAS Build
* **데이터 요청**: Axios (mock JSON fetch)

---

## 🔀 트레이드오프

1. **페이지네이션 처리**

   * 실제라면 서버에서 페이지네이션을 처리하는 것이 맞지만, mock JSON 환경에서는 클라이언트에서 slice로 나누는 방식이 더 단순하고 확실했습니다.

2. **데이터 전달 방식**

   * 상세 페이지 접근 시 매번 fetch를 반복하기보다는, 최초에 불러온 mock 데이터를 **Zustand 전역 상태에 저장**해두고 id만 param으로 전달하는 구조를 택했습니다.
   * 이렇게 하면 불필요한 네트워크 요청을 줄이고, 전체 mock 데이터를 한 번만 관리할 수 있습니다.

3. **상태 관리 선택**

   * Redux나 React Query 같은 라이브러리 대신 Zustand를 사용했습니다.
   * 실제 서비스라면 캐싱/무효화가 필요하지만, 과제 범위에서는 가볍게 유지하는 것이 더 적합했습니다.

---

## 🚧 미구현 항목

* 검색 / 정렬 기능
* 뷰 모드 전환 (리스트 ↔ 그리드)

과제 범위와 시간 제약으로 제외하고, 핵심 기능(무한 스크롤 + 상세 페이지)에 집중했습니다.

---

## 🛠️ 개발 과정 및 트러블슈팅

### 1) 무한 스크롤 구현

* **문제**: 서버가 없어서 페이지네이션을 어떻게 처리할지 고민.
* **해결 과정**:

  * mock JSON 전체를 한 번만 불러오고(`allProducts`),
  * 보여줄 리스트(`products`)만 slice로 잘라서 관리.
  * 스크롤 끝에서 `onEndReached`가 호출되면 10개씩 추가 append.
* **문제점 & 수정**

  * `keyExtractor`를 안 써서 key 중복 경고 발생 → `item.id.toString()`으로 해결
  * 초기 로드 후 `setPage(1)` 누락으로 무한 스크롤이 멈춤 → 초기 페이지 상태 보정

➡️ 결과적으로 mock JSON 기반에서도 **서버 페이지네이션을 흉내내는 UX**를 구현할 수 있었습니다.

---

### 2) 상세 페이지 구현

* **문제**: 어떤 방식으로 상세 데이터를 가져올지 결정 필요

  1. id로 다시 fetch
  2. 목록에서 이미 받아둔 데이터를 재사용
* **최종 결정**:

  * id는 `useLocalSearchParams`로 받아오고,
  * 실제 데이터는 Zustand 전역 상태(`allProducts`)에서 조회하는 방식 채택
* **이유**: mock 데이터 특성상 전체 데이터를 이미 메모리에 들고 있기 때문에, 재요청보다는 전역 상태를 재사용하는 게 더 합리적임.

---

### 3) 스타일링

* NativeWind를 적용해 빠르고 일관되게 스타일링.
* 기본적인 레이아웃 및 카드 컴포넌트 정도만 스타일을 입히고, 화려한 디자인보다는 기능 구현에 집중했습니다.

---

### 4) 빌드

* Expo EAS Build를 사용해 Android APK 빌드 진행.
* AAB 대신 APK로 빌드해야 실제 단말/에뮬레이터에서 바로 실행 가능하다는 점을 학습했습니다.

---

## 🤔 배운 점

* mock 데이터만 있어도 **slice + append** 구조로 무한 스크롤을 충분히 흉내낼 수 있다는 점.
* FlatList의 `keyExtractor`, `onEndReachedThreshold` 같은 세부 옵션이 UX에 큰 영향을 준다는 점.
* 전역 상태(Zustand)와 param 전달을 조합하면 **불필요한 중복 fetch를 줄이고도 라우팅 구조를 유지**할 수 있다는 점.
* Expo EAS Build 과정을 통해 실제 배포 단계를 경험할 수 있었습니다.

---

## ⏱️ 소요 시간

* 환경 세팅 및 구조 설계: 6h
* 목록 + 무한 스크롤 구현: 10h
* 상세 페이지 구현: 4h
* 스타일링(NativeWind): 3h
* 빌드 및 디버깅: 3h

👉 **총합 약 26시간**
