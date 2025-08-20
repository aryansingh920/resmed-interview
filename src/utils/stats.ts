import type { Day } from '../context/AppProvider';

export const sum = (values: (number | undefined)[]): number => {
  return values.reduce((acc: number, val) => acc + (val ?? 0), 0);
};

export const average = (values: (number | undefined)[]): number => {
  const validValues = values.filter((v): v is number => v !== undefined);
  return validValues.length ? sum(validValues) / validValues.length : 0;
};

export const movingAverage = (arr: number[], windowSize: number): number[] => {
  const result: number[] = [];
  let runningSum = 0;

  for (let i = 0; i < arr.length; i++) {
    runningSum += arr[i];
    
    if (i >= windowSize) {
      runningSum -= arr[i - windowSize];
    }
    
    if (i >= windowSize - 1) {
      result.push(runningSum / windowSize);
    } else {
      result.push(NaN);
    }
  }
  
  return result;
};

export const findBestDay = (data: Day[], key: keyof Day): Day | null => {
  let bestDay: Day | null = null;
  let bestValue = -Infinity;

  for (const day of data) {
    const value = day[key] as number;
    if (typeof value === 'number' && value > bestValue) {
      bestValue = value;
      bestDay = day;
    }
  }

  return bestDay;
};

export const calculateStreak = (data: Day[], predicate: (d: Day) => boolean): number => {
  let streak = 0;
  
  for (let i = data.length - 1; i >= 0; i--) {
    if (predicate(data[i])) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};
