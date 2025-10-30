export interface Employee {
  id: string;
  name: string;
  plan: number;
  fact: number;
  percentage: number;
  rating: number;
  additionalMetrics: AdditionalMetric[];
  perishableProducts: ProductTable[];
  urgentSales: ProductTable[];
}

export interface AdditionalMetric {
  id: string;
  name: string;
  plan: number;
  fact: number;
  percentage: number;
}

export interface ProductTable {
  id: string;
  tableName: string;
  items: ProductItem[];
  totalPercentage: number;
}

export interface ProductItem {
  id: string;
  name: string;
  plan: number;
  fact: number;
  percentage: number;
}
