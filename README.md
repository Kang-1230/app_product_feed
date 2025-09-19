# 📦 app_product_feed

React Native + Expo 환경에서 구현한 상품 피드 애플리케이션입니다.  
상품 리스트를 **무한 스크롤**로 노출하고, 각 아이템 클릭 시 **상세 페이지**로 이동할 수 있습니다.  
실제 서버 API 없이 주어진 `products.json` mock 데이터를 기반으로 **실제 서비스와 동일한 UX**를 구현했습니다.

## 🎯 프로젝트 개요

**목표**: React Native 기술 역량 검증을 위한 상품 피드 앱 구현  
**기간**: 7일 (총 26시간 소요)  
**핵심 기능**: 무한 스크롤 상품 리스트 + 상세 페이지 이동  

## 🚀 실행 방법

### 필수 요구사항
- Node.js 16 이상
- Expo CLI (`npm install -g @expo/cli`)
- iOS 시뮬레이터 또는 Android 에뮬레이터 (또는 Expo Go 앱)

### 로컬 실행
```bash
# 프로젝트 클론
git clone https://github.com/Kang-1230/app_product_feed.git
cd app_product_feed

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npx expo start

# 터미널에서 실행 후, iOS/Android 에뮬레이터나 Expo Go 앱으로 열기
```

### 빌드
```bash
# Android APK 빌드
eas build -p android --profile preview

# iOS 빌드
eas build -p ios --profile preview
```

## 📂 프로젝트 구조

```
app_product_feed/
├── app/                 # Expo Router 기반 라우팅
│   ├── index.tsx        # 상품 피드 홈 화면
│   ├── product/[id].tsx # 동적 라우팅으로 상품 상세 화면
│   └── _layout.tsx      # 전역 레이아웃 및 네비게이션
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── ProductCard.tsx  # 상품 카드 (이미지, 정보, 클릭 이벤트)
│   └── ProductList.tsx  # 무한 스크롤 리스트 (FlatList 기반)
├── hooks/               # 커스텀 훅
├── utils/               # 유틸리티 함수
├── assets/              # 이미지, 폰트 등 정적 자원
├── data/                # mock 데이터
│   └── products.json    # 100개 상품 mock 데이터
├── package.json
└── README.md
```

## ⚙️ 기술 스택

| 분야 | 기술 | 선택 이유 |
|------|------|-----------|
| **Framework** | React Native + Expo | 크로스 플랫폼 개발 + 빠른 프로토타이핑 |
| **Navigation** | Expo Router | 파일 기반 라우팅으로 직관적 구조 |
| **Styling** | NativeWind (Tailwind CSS) | 빠른 개발 + 일관된 디자인 시스템 |
| **State Management** | Zustand | 가벼운 전역 상태 관리 + AsyncStorage 연동 |
| **Build & Deploy** | Expo EAS Build | 클라우드 빌드로 배포 간소화 |
| **Data Fetching** | Axios | HTTP 요청 처리 |

## 🛠️ 핵심 기능 구현

### 1. 무한 스크롤 구현
**문제 상황**
- 실제 서버가 없어 페이지네이션 처리를 어떻게 할지 고민
- mock 데이터 100개를 어떻게 10개씩 나누어 로딩할지 결정 필요
 -> axios는 무조건 써야 하니 API를 흉내 내서 axios 요청 → 전체 데이터 가져오기 → slice로 페이징으로 결정
**해결 과정**
```typescript
// 전체 mock 데이터는 한 번만 불러와서 allProducts에 저장
const [allProducts, setAllProducts] = useState<Product[]>([]);
// 화면에 보여줄 데이터만 별도로 관리
const [products, setProducts] = useState<Product[]>([]);
const [page, setPage] = useState(0);

// 무한 스크롤 시 10개씩 추가
const loadMoreProducts = () => {
  const startIndex = page * 10;
  const endIndex = startIndex + 10;
  const newProducts = allProducts.slice(startIndex, endIndex);
  
  setProducts(prev => [...prev, ...newProducts]);
  setPage(prev => prev + 1);
};
```

**기술적 의사결정**
- 서버 API가 있다면 서버에서 페이지네이션 처리가 맞지만, mock 데이터 환경에서는 **클라이언트에서 slice로 나누는 방식**이 더 현실적
- 전체 데이터를 `allProducts`에 캐싱하고, 보여줄 데이터만 `products`에서 관리하는 **분리된 상태 관리** 채택

### 2. 상세 페이지 데이터 전달
**문제 상황**
- 상세 페이지에서 상품 데이터를 어떻게 가져올 것인가?
  1. ID로 매번 새로 fetch -> 비효율적
  2. 목록에서 이미 받아둔 데이터 재사용 -> 상태 관리/데이터 전달 -> 한번만 하기 때문에 id만 params로 받기로

**최종 해결책**
```typescript
// 라우팅: ID만 param으로 전달
const router = useRouter();
router.push(`/product/${product.id}`);

// 상세 페이지: 전역 상태에서 데이터 조회
const { id } = useLocalSearchParams();
const product = useProductStore(state => 
  state.allProducts.find(p => p.id === Number(id))
);
```

**선택 이유**
- mock 데이터 특성상 전체 데이터를 이미 메모리에 보유하고 있음
- **불필요한 네트워크 요청을 줄이고, 전역 상태를 효율적으로 활용**

## 🚧 트러블슈팅 과정

### 1. 상태 관리 도구 선택의 고민

**문제 상황**  
앱에서 ProductList, ProductDetail, 장바구니 등 여러 화면이 모두 Product 데이터를 사용하는데, "데이터를 어디에 어떻게 관리할 것인가?"에 대한 고민 생김

**고민한 포인트들**
- **React Query vs Zustand + AsyncStorage**
  - React Query: 서버 데이터 캐싱, 자동 동기화, 무효화 지원이 강력하지만 로컬 상태만 필요한 장바구니에는 과도한 도구
  - Zustand: 단순하고 가볍게 로컬 상태 관리 가능, AsyncStorage 연동으로 앱 재시작 후에도 데이터 복원 가능

**최종 결정**
- **서버 데이터**: 실제 프로젝트라면 React Query 사용 (캐싱 + 무효화 패턴)
- **클라이언트 상태**: Zustand + AsyncStorage persist 채택
- 장바구니는 사용자 개인 디바이스에만 필요한 데이터이므로 로컬 상태 관리가 더 적합

### 2. 무한 스크롤 페이지 상태 관리

**문제**: 초기 로드 후 page 상태가 0으로 유지되어 무한 스크롤이 동작하지 않음

**원인 분석**
```typescript
// 문제가 된 코드
const [page, setPage] = useState(0);
const loadProducts = async () => {
  // 첫 번째 로드 후 page가 여전히 0
  const products = allProducts.slice(0, 10);  // 항상 첫 10개만
};
```

**해결 과정**
```typescript
// 해결된 코드
const loadProducts = async () => {
  const products = allProducts.slice(0, 10);
  setProducts(products);
  setPage(1); // 다음 로드를 위해 페이지를 1로 설정
};
```

이로써 두 번째 스크롤부터는 page * 10 인덱스부터 정상적으로 다음 데이터를 가져올 수 있게 되었음.

## 🔄 UX 설계 의사결정

### 목록 → 상세 → 장바구니 흐름 설계
1. **목록 페이지**: 상품 카드 클릭 시 상세 페이지 이동
2. **상세 페이지**: 상품 정보 확인 후 장바구니 담기  
3. **장바구니**: 담긴 상품 목록 확인 및 총합 계산

**모바일 UX 고려사항**
- 상품명 클릭 = 상세 페이지 이동 (정보 확인 목적)
- 담기 버튼 = 장바구니 추가 (액션 목적)
- 역할 분리로 사용자 혼동 최소화

### 장바구니 뱃지 시스템 구현
**문제 상황**
- 초기에는 단순히 장바구니 아이콘만 표시
- 사용자가 상품을 담았는지, 몇 개나 담았는지 직관적으로 알기 어려움
- 같은 상품을 여러 번 담으면 배열에 중복 상품이 쌓여 혼동 발생

**UX 개선 아이디어**
- **중복 상품 → 수량 관리**: 동일 상품 재추가시 quantity 증가로 처리
- **시각적 피드백**: 장바구니 아이콘에 빨간 뱃지 표시
- **즉시 반응**: 담기 버튼 클릭 시 뱃지 숫자가 실시간으로 업데이트

**구현 결과**
```typescript
// 장바구니 총 수량 계산
const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

// 뱃지 표시 조건
{totalQuantity > 0 && (
  <View className="absolute -top-1 -right-1 bg-red-500 rounded-full">
    <Text className="text-white text-xs px-1">{totalQuantity}</Text>
  </View>
)}
```

**효과**
- 사용자 혼란 감소 (중복 상품 제거 → 리스트 단순화)
- 직관적 피드백 제공 (뱃지 숫자로 장바구니 상태 한눈에 확인)
- 상품 담기 액션에 대한 즉각적인 시각적 반응

## 🎨 스타일링 전략

**NativeWind 채택 이유**
- Tailwind CSS의 유틸리티 클래스를 React Native에서 사용
- 빠른 프로토타이핑과 일관된 디자인 시스템 구축
- 웹 개발 경험을 모바일로 자연스럽게 확장

**디자인 철학**
- 화려한 디자인보다 **기능 구현과 사용성**에 집중
- 기본적인 카드 레이아웃과 버튼 스타일로 깔끔한 UI 구성

## 📊 성능 최적화

### 1. 메모리 관리
- 전체 mock 데이터를 한 번만 로드하여 메모리 효율성 확보
- 필요한 데이터만 slice하여 FlatList 렌더링 최적화

### 2. 상태 최적화
- 필요한 컴포넌트만 리렌더링되도록 Zustand 선택적 구독 활용
- AsyncStorage 비동기 처리로 UI 블로킹 방지

## 📈 배운 점 및 개선사항

### 기술적 학습
- **Mock 데이터로도 실제 API와 유사한 UX 구현 가능** (slice + append 전략)
- **전역 상태와 라우팅 파라미터의 적절한 조합**으로 성능과 구조 모두 확보
- **서버 상태 vs 클라이언트 상태 구분**의 중요성과 각각에 맞는 관리 도구 선택

### 아키텍처 결정
- 상태 관리 도구 선택 시 데이터의 성격(서버 원본 vs 클라이언트 전용)을 먼저 분석하는 것이 중요
- 캐싱 전략과 상태 관리의 역할 분리를 통한 명확한 책임 구조
- Expo EAS Build를 통한 실제 배포 프로세스 경험

### 미구현 기능 (시간 제약으로 인한 우선순위 조정)

**핵심 로직은 구현, UI 반영 부족**
- 장바구니 상품 삭제 및 수량 조절 함수는 구현했으나 시간상 UI에 완전히 반영하지 못함
- 상품 수량 증가/감소 버튼과 삭제 버튼의 시각적 피드백 개선 필요

**UI 디자인 완성도**
- 기본적인 레이아웃 구성에 집중, 시간 부족으로 세련된 UI 디자인은 미완성
- 핵심 기능(무한 스크롤, 상세 페이지, 장바구니 뱃지) 구현을 우선시

**제외 이유**: 과제의 핵심 요구사항에 집중하여 **동작하는 프로토타입** 완성을 우선시

## ⏱️ 개발 시간 분석

| 단계 | 소요 시간 | 주요 작업 |
|------|----------|-----------|
| **환경 설정 및 구조 설계** | 6시간 | Expo 프로젝트 생성, 라이브러리 설치, 폴더 구조 설계 |
| **무한 스크롤 구현** | 10시간 | FlatList 설정, 페이지네이션 로직, 상태 관리 |
| **상세 페이지 구현** | 4시간 | 동적 라우팅, 데이터 전달, UI 구성 |
| **스타일링** | 3시간 | NativeWind 설정, 컴포넌트 스타일링 |
| **빌드 및 디버깅** | 3시간 | EAS Build 설정, 에러 수정, 최적화 |
| **총 소요 시간** | **26시간** | **3일간 집중 개발** |

## 🚀 추가 개선 계획

### 단기 개선사항
- 이미지 레이지 로딩 및 캐싱 시스템
- 에러 바운더리 및 로딩 상태 개선
- 접근성(Accessibility) 가이드라인 준수

### 장기 확장 가능성
- 실제 API 서버 연동 시 React Query 도입
- 상품 검색 및 필터링 기능 추가
- 오프라인 모드 지원 (AsyncStorage 확장)

---

## 🔗 관련 링크

- **GitHub Repository**: [https://github.com/Kang-1230/app_product_feed](https://github.com/Kang-1230/app_product_feed)
- **APK Download**: https://drive.google.com/file/d/1rA1NPsgEFBXdYHk5YBOcZzPckcvtkEjY/view?usp=sharing
