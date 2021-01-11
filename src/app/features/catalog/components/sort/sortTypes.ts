import { SortType } from '@core/enums/sort-type';

export const sort = [
  { value: SortType.Default, text: 'по умолчанию' },
  { value: SortType.PriceAsc, text: 'по возрастанию цены' },
  { value: SortType.PriceDesc, text: 'по убыванию цены' }
];
