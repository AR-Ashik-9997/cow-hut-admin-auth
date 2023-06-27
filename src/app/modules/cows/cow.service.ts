import { SortOrder } from 'mongoose';
import { PaginationHelper } from '../../../helper/paginationCalculate';
import { IGenerickResponse } from '../../../interfaces/common';
import { IPagination } from '../../../interfaces/pagination';
import { CowSearchableFields } from './cow.constant';
import { ICow, ICowFilter } from './cow.interface';
import { Cow } from './cow.model';
import httpStatus from 'http-status';
import ApiError from '../../../eroors/apiErrorHandler';

const createCow = async (payload: ICow): Promise<ICow> => {
  const result = await Cow.create(payload);
  return result;
};
const getAllCows = async (
  filters: ICowFilter,
  paginationOptions: IPagination
): Promise<IGenerickResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: CowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    const filterConditions = Object.entries(filtersData).map(
      ([field, value]) => {
        if (field === 'minPrice') {
          return {
            price: {
              $gte: value,
            },
          };
        }
        if (field === 'maxPrice') {
          return {
            price: {
              $lte: value,
            },
          };
        }
        return {
          [field]: value,
        };
      }
    );

    andConditions.push({
      $and: filterConditions,
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelper.paginationCalculate(paginationOptions);
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const WhereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Cow.find(WhereCondition)
    .populate('seller')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const count = await Cow.countDocuments();
  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!');
  }
  const { ...cowData } = payload;
  const updateCowData: Partial<ICow> = { ...cowData };

  const result = await Cow.findOneAndUpdate({ _id: id }, updateCowData, {
    new: true,
  });

  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id).populate('seller');
  return result;
};
export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
