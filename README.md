
#  Fitness Steps Tracker

A simple fitness tracking web app built with **Create React App (CRA)**, **TypeScript**, **React Context**, and **Chart.js (react-chartjs-2)**.  
This project was developed by **Aryan Singh** specifically for the **ResMed interview**.

The app demonstrates clean UI design, local JSON data integration, React state management, and data visualization using charts.  
It tracks user exercise metrics such as **steps, calories burned, and workout duration**, stored locally without APIs.

---

##  Features

-  Load static JSON exercise data (`exerciseData.json`)  
-  Display data in a React table (date, calories, steps, duration)  
-  Visualize calories & steps over time using Chart.js  
-  Clean, responsive styling with CSS  
-  Local storage support for persistence  
-  About page with project details and interview context  
-  Modular file structure for maintainability  
-  Unit tests & E2E tests (bonus setup-ready)  

---

## 📂 Project Structure

Below is the **detailed file structure** and description of each part of the app:

```

src/
│
├── App.tsx
├── index.tsx
├── styles/
│   └── globals.css
│
├── data/
│   └── exerciseData.json
│
├── context/
│   └── AppProvider.tsx
│
├── hooks/
│   └── useApp.ts
│
├── utils/
│   ├── dates.ts
│   ├── stats.ts
│   └── storage.ts
│
├── components/
│   ├── AppHeader.tsx
│   ├── StatCard.tsx
│   ├── ChartCard.tsx
│   ├── DataTable.tsx
│   ├── MetricInput.tsx
│   └── EmptyState.tsx
│
├── charts/
│   ├── chartSetup.ts
│   ├── Sparkline.tsx
│   ├── WeeklyComboChart.tsx
│   ├── TrendMultiLine.tsx
│   └── DayVsAverageBar.tsx
│
├── pages/
│   ├── Dashboard.tsx
│   └── About.tsx
│
├── tests/
│   ├── App.test.tsx
│   └── e2e/
│       └── basic.spec.ts
│
└── README.md   <-- this file



---

##  File Breakdown

###  Core
- **`App.tsx`** → Root component, defines main routes and wraps everything in context.  
- **`index.tsx`** → CRA entry point, renders `<App />` to the DOM.  

###  Styles
- **`globals.css`** → Global theme variables, light/dark theme support, base typography.  

###  Data
- **`exerciseData.json`** → Local dataset (no API). Example entry:
  ```json
  {
    "date": "2025-08-01",
    "calories": 450,
    "durationMinutes": 40
  }
````

###  Context & Hooks

* **`AppProvider.tsx`** → Provides global state (data, filters, selected date).
* **`useApp.ts`** → Custom hook to consume app context in components.

###  Utilities

* **`dates.ts`** → Helpers for date slicing, ranges, and formatting.
* **`stats.ts`** → Stats calculations (averages, totals, comparisons).
* **`storage.ts`** → LocalStorage persistence helpers.

###  Components

* **`AppHeader.tsx`** → Top navigation/header with title.
* **`StatCard.tsx`** → Small metric cards (steps, calories, duration).
* **`ChartCard.tsx`** → Wrapper for charts with titles and consistent layout.
* **`DataTable.tsx`** → Displays exercise data in a clean, responsive table.
* **`MetricInput.tsx`** → Input form to add new data points (date, steps, calories).
* **`EmptyState.tsx`** → Placeholder UI when no data is present.

###  Charts

* **`chartSetup.ts`** → Configures Chart.js defaults (colors, fonts, tooltips).
* **`Sparkline.tsx`** → Mini inline chart for step trends.
* **`WeeklyComboChart.tsx`** → Line + bar combo chart (steps & calories vs. time).
* **`TrendMultiLine.tsx`** → Multi-line chart showing steps vs. averages.
* **`DayVsAverageBar.tsx`** → Bar chart comparing daily steps vs. average.

###  Pages

* **`Dashboard.tsx`** → Main app page showing summary cards, charts, and table.
* **`About.tsx`** → Project description page:

  > “Built by Aryan Singh for the ResMed Interview. CRA + TypeScript + React Context + Chart.js.”

###  Tests

* **`App.test.tsx`** → Jest + React Testing Library unit tests.
* **`basic.spec.ts`** → Playwright/Cypress-style E2E smoke test.

---

##  Setup & Running

### 1. Clone & Install

```bash
git clone https://github.com/aryansingh920/resmed-fitness-tracker.git
cd resmed-fitness-tracker
npm install
```

### 2. Run App

```bash
npm start
```

Runs on `http://localhost:3000/`.

### 3. Run Tests

```bash
npm test
```

---

## AI Usage

AI assistance was used for:

* Generating the initial React + TS + Chart.js scaffold.
* Creating utility functions for date/stat handling.
* Suggesting chart configuration (Chart.js dataset options).
* Improving README clarity and project documentation.

---


## Author

**Aryan Singh**
 Dublin, Ireland
[LinkedIn](https://www.linkedin.com/in/aryansingh920) | [GitHub](https://github.com/aryansingh920)

---
