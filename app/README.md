# LA Road Trip Planner

2026.09.19 – 09.26 LA → Grand Canyon → Sedona → Phoenix 여행 플래너. Vite + React + Tailwind CSS.

## 개발

```bash
npm install
npm run dev
```

## 배포 (Vercel)

이 저장소에서 React 프로젝트는 `app/` 하위 폴더에 있습니다. Vercel에서 새 프로젝트를 만들 때:

1. 이 GitHub 저장소를 import
2. **Root Directory**를 `app`으로 설정 (Framework Preset은 Vite로 자동 인식됨)
3. Build Command: `npm run build`, Output Directory: `dist` (기본값 그대로 두면 됨)
4. Deploy

## 데이터 수정

일정/예약/쇼핑/예산 내용은 전부 [src/data/trip.js](src/data/trip.js) 한 파일에 있습니다. 날짜, 장소, 예산 등은 이 파일만 수정하면 반영됩니다.

메모·완료 체크·쇼핑 체크박스는 브라우저 localStorage에 저장됩니다 (기기별로 따로 저장됨, 서버 동기화 없음).
