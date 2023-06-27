import { Icategory, Ilabel, Ilocation } from './cow.interface';

export const cowLocation: Ilocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const cowLabel: Ilabel[] = ['for sale', 'sold out'];
export const cowCategory: Icategory[] = ['Dairy', 'Beef', 'DualPurpose'];

export const CowSearchableFields = [
  'id',
  'name',
  'location',
  'label',
  'breed',
  'category',
  'minPrice',
  'maxPrice',
  'price',
  'weight',
  'age',
];

export const CowFilterableFields = [
  'searchTerm',
  'id',
  'name',
  'location',
  'label',
  'breed',
  'category',
  'minPrice',
  'maxPrice',
  'price',
  'weight',
  'age',
];
