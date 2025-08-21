/* eslint-disable @typescript-eslint/no-useless-constructor */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// Jest DOM matchers
// src/setupTests.ts
import "@testing-library/jest-dom";

// Mock Chart.js to avoid ES module issues in tests
jest.mock("chart.js", () => ({
  Chart: class MockChart {
    static register = jest.fn();
    static defaults: {
      font: { family: string };
      responsive: boolean;
      maintainAspectRatio: boolean;
    } = {
      font: { family: "" },
      responsive: true,
      maintainAspectRatio: false,
    };
    constructor() {}
    destroy = jest.fn();
    update = jest.fn();
  },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  LineElement: {},
  PointElement: {},
  Tooltip: {},
  Legend: {},
  TimeScale: {},
  Filler: {},
}));

// Mock the chart adapter to avoid ES module circular dependency
jest.mock("chartjs-adapter-date-fns", () => ({}));

// Mock localStorage for tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;
