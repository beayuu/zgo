import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AdminStats, Attraction, AttractionInput, AttractionUpdate, Booking, BookingInput, Category, HealthStatus, ListAttractionsParams, ListReviewsParams, ListTransportationParams, MerchantDashboard, PackageInput, Review, ReviewInput, SuccessMessage, TourPackage, Transportation, TransportationInput, User, UserDashboard } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListAttractionsUrl: (params?: ListAttractionsParams) => string;
/**
 * @summary List all attractions
 */
export declare const listAttractions: (params?: ListAttractionsParams, options?: RequestInit) => Promise<Attraction[]>;
export declare const getListAttractionsQueryKey: (params?: ListAttractionsParams) => readonly ["/api/attractions", ...ListAttractionsParams[]];
export declare const getListAttractionsQueryOptions: <TData = Awaited<ReturnType<typeof listAttractions>>, TError = ErrorType<unknown>>(params?: ListAttractionsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAttractions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAttractions>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAttractionsQueryResult = NonNullable<Awaited<ReturnType<typeof listAttractions>>>;
export type ListAttractionsQueryError = ErrorType<unknown>;
/**
 * @summary List all attractions
 */
export declare function useListAttractions<TData = Awaited<ReturnType<typeof listAttractions>>, TError = ErrorType<unknown>>(params?: ListAttractionsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAttractions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateAttractionUrl: () => string;
/**
 * @summary Create an attraction (merchant)
 */
export declare const createAttraction: (attractionInput: AttractionInput, options?: RequestInit) => Promise<Attraction>;
export declare const getCreateAttractionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAttraction>>, TError, {
        data: BodyType<AttractionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAttraction>>, TError, {
    data: BodyType<AttractionInput>;
}, TContext>;
export type CreateAttractionMutationResult = NonNullable<Awaited<ReturnType<typeof createAttraction>>>;
export type CreateAttractionMutationBody = BodyType<AttractionInput>;
export type CreateAttractionMutationError = ErrorType<unknown>;
/**
* @summary Create an attraction (merchant)
*/
export declare const useCreateAttraction: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAttraction>>, TError, {
        data: BodyType<AttractionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAttraction>>, TError, {
    data: BodyType<AttractionInput>;
}, TContext>;
export declare const getListFeaturedAttractionsUrl: () => string;
/**
 * @summary List featured/popular attractions
 */
export declare const listFeaturedAttractions: (options?: RequestInit) => Promise<Attraction[]>;
export declare const getListFeaturedAttractionsQueryKey: () => readonly ["/api/attractions/featured"];
export declare const getListFeaturedAttractionsQueryOptions: <TData = Awaited<ReturnType<typeof listFeaturedAttractions>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFeaturedAttractions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listFeaturedAttractions>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListFeaturedAttractionsQueryResult = NonNullable<Awaited<ReturnType<typeof listFeaturedAttractions>>>;
export type ListFeaturedAttractionsQueryError = ErrorType<unknown>;
/**
 * @summary List featured/popular attractions
 */
export declare function useListFeaturedAttractions<TData = Awaited<ReturnType<typeof listFeaturedAttractions>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFeaturedAttractions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListAttractionCategoriesUrl: () => string;
/**
 * @summary List all attraction categories with counts
 */
export declare const listAttractionCategories: (options?: RequestInit) => Promise<Category[]>;
export declare const getListAttractionCategoriesQueryKey: () => readonly ["/api/attractions/categories"];
export declare const getListAttractionCategoriesQueryOptions: <TData = Awaited<ReturnType<typeof listAttractionCategories>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAttractionCategories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAttractionCategories>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAttractionCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof listAttractionCategories>>>;
export type ListAttractionCategoriesQueryError = ErrorType<unknown>;
/**
 * @summary List all attraction categories with counts
 */
export declare function useListAttractionCategories<TData = Awaited<ReturnType<typeof listAttractionCategories>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAttractionCategories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetAttractionUrl: (id: number) => string;
/**
 * @summary Get a single attraction
 */
export declare const getAttraction: (id: number, options?: RequestInit) => Promise<Attraction>;
export declare const getGetAttractionQueryKey: (id: number) => readonly [`/api/attractions/${number}`];
export declare const getGetAttractionQueryOptions: <TData = Awaited<ReturnType<typeof getAttraction>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAttraction>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAttraction>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAttractionQueryResult = NonNullable<Awaited<ReturnType<typeof getAttraction>>>;
export type GetAttractionQueryError = ErrorType<void>;
/**
 * @summary Get a single attraction
 */
export declare function useGetAttraction<TData = Awaited<ReturnType<typeof getAttraction>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAttraction>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateAttractionUrl: (id: number) => string;
/**
 * @summary Update an attraction
 */
export declare const updateAttraction: (id: number, attractionUpdate: AttractionUpdate, options?: RequestInit) => Promise<Attraction>;
export declare const getUpdateAttractionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAttraction>>, TError, {
        id: number;
        data: BodyType<AttractionUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateAttraction>>, TError, {
    id: number;
    data: BodyType<AttractionUpdate>;
}, TContext>;
export type UpdateAttractionMutationResult = NonNullable<Awaited<ReturnType<typeof updateAttraction>>>;
export type UpdateAttractionMutationBody = BodyType<AttractionUpdate>;
export type UpdateAttractionMutationError = ErrorType<unknown>;
/**
* @summary Update an attraction
*/
export declare const useUpdateAttraction: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAttraction>>, TError, {
        id: number;
        data: BodyType<AttractionUpdate>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateAttraction>>, TError, {
    id: number;
    data: BodyType<AttractionUpdate>;
}, TContext>;
export declare const getDeleteAttractionUrl: (id: number) => string;
/**
 * @summary Delete an attraction
 */
export declare const deleteAttraction: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteAttractionMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAttraction>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteAttraction>>, TError, {
    id: number;
}, TContext>;
export type DeleteAttractionMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAttraction>>>;
export type DeleteAttractionMutationError = ErrorType<unknown>;
/**
* @summary Delete an attraction
*/
export declare const useDeleteAttraction: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAttraction>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteAttraction>>, TError, {
    id: number;
}, TContext>;
export declare const getListPackagesUrl: () => string;
/**
 * @summary List tour packages
 */
export declare const listPackages: (options?: RequestInit) => Promise<TourPackage[]>;
export declare const getListPackagesQueryKey: () => readonly ["/api/packages"];
export declare const getListPackagesQueryOptions: <TData = Awaited<ReturnType<typeof listPackages>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPackages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listPackages>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListPackagesQueryResult = NonNullable<Awaited<ReturnType<typeof listPackages>>>;
export type ListPackagesQueryError = ErrorType<unknown>;
/**
 * @summary List tour packages
 */
export declare function useListPackages<TData = Awaited<ReturnType<typeof listPackages>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPackages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreatePackageUrl: () => string;
/**
 * @summary Create a tour package
 */
export declare const createPackage: (packageInput: PackageInput, options?: RequestInit) => Promise<TourPackage>;
export declare const getCreatePackageMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPackage>>, TError, {
        data: BodyType<PackageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createPackage>>, TError, {
    data: BodyType<PackageInput>;
}, TContext>;
export type CreatePackageMutationResult = NonNullable<Awaited<ReturnType<typeof createPackage>>>;
export type CreatePackageMutationBody = BodyType<PackageInput>;
export type CreatePackageMutationError = ErrorType<unknown>;
/**
* @summary Create a tour package
*/
export declare const useCreatePackage: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPackage>>, TError, {
        data: BodyType<PackageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createPackage>>, TError, {
    data: BodyType<PackageInput>;
}, TContext>;
export declare const getGetPackageUrl: (id: number) => string;
/**
 * @summary Get a single tour package
 */
export declare const getPackage: (id: number, options?: RequestInit) => Promise<TourPackage>;
export declare const getGetPackageQueryKey: (id: number) => readonly [`/api/packages/${number}`];
export declare const getGetPackageQueryOptions: <TData = Awaited<ReturnType<typeof getPackage>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPackage>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getPackage>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetPackageQueryResult = NonNullable<Awaited<ReturnType<typeof getPackage>>>;
export type GetPackageQueryError = ErrorType<unknown>;
/**
 * @summary Get a single tour package
 */
export declare function useGetPackage<TData = Awaited<ReturnType<typeof getPackage>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getPackage>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListTransportationUrl: (params?: ListTransportationParams) => string;
/**
 * @summary List transportation services
 */
export declare const listTransportation: (params?: ListTransportationParams, options?: RequestInit) => Promise<Transportation[]>;
export declare const getListTransportationQueryKey: (params?: ListTransportationParams) => readonly ["/api/transportation", ...ListTransportationParams[]];
export declare const getListTransportationQueryOptions: <TData = Awaited<ReturnType<typeof listTransportation>>, TError = ErrorType<unknown>>(params?: ListTransportationParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTransportation>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listTransportation>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListTransportationQueryResult = NonNullable<Awaited<ReturnType<typeof listTransportation>>>;
export type ListTransportationQueryError = ErrorType<unknown>;
/**
 * @summary List transportation services
 */
export declare function useListTransportation<TData = Awaited<ReturnType<typeof listTransportation>>, TError = ErrorType<unknown>>(params?: ListTransportationParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTransportation>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateTransportationUrl: () => string;
/**
 * @summary Create a transportation service
 */
export declare const createTransportation: (transportationInput: TransportationInput, options?: RequestInit) => Promise<Transportation>;
export declare const getCreateTransportationMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createTransportation>>, TError, {
        data: BodyType<TransportationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createTransportation>>, TError, {
    data: BodyType<TransportationInput>;
}, TContext>;
export type CreateTransportationMutationResult = NonNullable<Awaited<ReturnType<typeof createTransportation>>>;
export type CreateTransportationMutationBody = BodyType<TransportationInput>;
export type CreateTransportationMutationError = ErrorType<unknown>;
/**
* @summary Create a transportation service
*/
export declare const useCreateTransportation: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createTransportation>>, TError, {
        data: BodyType<TransportationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createTransportation>>, TError, {
    data: BodyType<TransportationInput>;
}, TContext>;
export declare const getGetTransportationUrl: (id: number) => string;
/**
 * @summary Get a transportation service
 */
export declare const getTransportation: (id: number, options?: RequestInit) => Promise<Transportation>;
export declare const getGetTransportationQueryKey: (id: number) => readonly [`/api/transportation/${number}`];
export declare const getGetTransportationQueryOptions: <TData = Awaited<ReturnType<typeof getTransportation>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTransportation>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTransportation>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTransportationQueryResult = NonNullable<Awaited<ReturnType<typeof getTransportation>>>;
export type GetTransportationQueryError = ErrorType<unknown>;
/**
 * @summary Get a transportation service
 */
export declare function useGetTransportation<TData = Awaited<ReturnType<typeof getTransportation>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTransportation>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListBookingsUrl: () => string;
/**
 * @summary List user bookings
 */
export declare const listBookings: (options?: RequestInit) => Promise<Booking[]>;
export declare const getListBookingsQueryKey: () => readonly ["/api/bookings"];
export declare const getListBookingsQueryOptions: <TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBookingsQueryResult = NonNullable<Awaited<ReturnType<typeof listBookings>>>;
export type ListBookingsQueryError = ErrorType<unknown>;
/**
 * @summary List user bookings
 */
export declare function useListBookings<TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateBookingUrl: () => string;
/**
 * @summary Create a booking
 */
export declare const createBooking: (bookingInput: BookingInput, options?: RequestInit) => Promise<Booking>;
export declare const getCreateBookingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
    data: BodyType<BookingInput>;
}, TContext>;
export type CreateBookingMutationResult = NonNullable<Awaited<ReturnType<typeof createBooking>>>;
export type CreateBookingMutationBody = BodyType<BookingInput>;
export type CreateBookingMutationError = ErrorType<unknown>;
/**
* @summary Create a booking
*/
export declare const useCreateBooking: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createBooking>>, TError, {
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createBooking>>, TError, {
    data: BodyType<BookingInput>;
}, TContext>;
export declare const getGetBookingUrl: (id: number) => string;
/**
 * @summary Get a booking
 */
export declare const getBooking: (id: number, options?: RequestInit) => Promise<Booking>;
export declare const getGetBookingQueryKey: (id: number) => readonly [`/api/bookings/${number}`];
export declare const getGetBookingQueryOptions: <TData = Awaited<ReturnType<typeof getBooking>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBooking>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getBooking>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetBookingQueryResult = NonNullable<Awaited<ReturnType<typeof getBooking>>>;
export type GetBookingQueryError = ErrorType<unknown>;
/**
 * @summary Get a booking
 */
export declare function useGetBooking<TData = Awaited<ReturnType<typeof getBooking>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBooking>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCancelBookingUrl: (id: number) => string;
/**
 * @summary Cancel a booking
 */
export declare const cancelBooking: (id: number, options?: RequestInit) => Promise<Booking>;
export declare const getCancelBookingMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof cancelBooking>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof cancelBooking>>, TError, {
    id: number;
}, TContext>;
export type CancelBookingMutationResult = NonNullable<Awaited<ReturnType<typeof cancelBooking>>>;
export type CancelBookingMutationError = ErrorType<unknown>;
/**
* @summary Cancel a booking
*/
export declare const useCancelBooking: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof cancelBooking>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof cancelBooking>>, TError, {
    id: number;
}, TContext>;
export declare const getListReviewsUrl: (params?: ListReviewsParams) => string;
/**
 * @summary List reviews for an attraction or package
 */
export declare const listReviews: (params?: ListReviewsParams, options?: RequestInit) => Promise<Review[]>;
export declare const getListReviewsQueryKey: (params?: ListReviewsParams) => readonly ["/api/reviews", ...ListReviewsParams[]];
export declare const getListReviewsQueryOptions: <TData = Awaited<ReturnType<typeof listReviews>>, TError = ErrorType<unknown>>(params?: ListReviewsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listReviews>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listReviews>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListReviewsQueryResult = NonNullable<Awaited<ReturnType<typeof listReviews>>>;
export type ListReviewsQueryError = ErrorType<unknown>;
/**
 * @summary List reviews for an attraction or package
 */
export declare function useListReviews<TData = Awaited<ReturnType<typeof listReviews>>, TError = ErrorType<unknown>>(params?: ListReviewsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listReviews>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateReviewUrl: () => string;
/**
 * @summary Create a review
 */
export declare const createReview: (reviewInput: ReviewInput, options?: RequestInit) => Promise<Review>;
export declare const getCreateReviewMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReview>>, TError, {
        data: BodyType<ReviewInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createReview>>, TError, {
    data: BodyType<ReviewInput>;
}, TContext>;
export type CreateReviewMutationResult = NonNullable<Awaited<ReturnType<typeof createReview>>>;
export type CreateReviewMutationBody = BodyType<ReviewInput>;
export type CreateReviewMutationError = ErrorType<unknown>;
/**
* @summary Create a review
*/
export declare const useCreateReview: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createReview>>, TError, {
        data: BodyType<ReviewInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createReview>>, TError, {
    data: BodyType<ReviewInput>;
}, TContext>;
export declare const getGetCurrentUserUrl: () => string;
/**
 * @summary Get current user profile
 */
export declare const getCurrentUser: (options?: RequestInit) => Promise<User>;
export declare const getGetCurrentUserQueryKey: () => readonly ["/api/users/me"];
export declare const getGetCurrentUserQueryOptions: <TData = Awaited<ReturnType<typeof getCurrentUser>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCurrentUserQueryResult = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;
export type GetCurrentUserQueryError = ErrorType<unknown>;
/**
 * @summary Get current user profile
 */
export declare function useGetCurrentUser<TData = Awaited<ReturnType<typeof getCurrentUser>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCurrentUser>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetUserDashboardUrl: () => string;
/**
 * @summary Get user dashboard stats
 */
export declare const getUserDashboard: (options?: RequestInit) => Promise<UserDashboard>;
export declare const getGetUserDashboardQueryKey: () => readonly ["/api/users/me/dashboard"];
export declare const getGetUserDashboardQueryOptions: <TData = Awaited<ReturnType<typeof getUserDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUserDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getUserDashboard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetUserDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getUserDashboard>>>;
export type GetUserDashboardQueryError = ErrorType<unknown>;
/**
 * @summary Get user dashboard stats
 */
export declare function useGetUserDashboard<TData = Awaited<ReturnType<typeof getUserDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUserDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListFavoritesUrl: () => string;
/**
 * @summary List user favorites
 */
export declare const listFavorites: (options?: RequestInit) => Promise<Attraction[]>;
export declare const getListFavoritesQueryKey: () => readonly ["/api/users/me/favorites"];
export declare const getListFavoritesQueryOptions: <TData = Awaited<ReturnType<typeof listFavorites>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFavorites>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listFavorites>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListFavoritesQueryResult = NonNullable<Awaited<ReturnType<typeof listFavorites>>>;
export type ListFavoritesQueryError = ErrorType<unknown>;
/**
 * @summary List user favorites
 */
export declare function useListFavorites<TData = Awaited<ReturnType<typeof listFavorites>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listFavorites>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAddFavoriteUrl: (attractionId: number) => string;
/**
 * @summary Add to favorites
 */
export declare const addFavorite: (attractionId: number, options?: RequestInit) => Promise<SuccessMessage>;
export declare const getAddFavoriteMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addFavorite>>, TError, {
        attractionId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addFavorite>>, TError, {
    attractionId: number;
}, TContext>;
export type AddFavoriteMutationResult = NonNullable<Awaited<ReturnType<typeof addFavorite>>>;
export type AddFavoriteMutationError = ErrorType<unknown>;
/**
* @summary Add to favorites
*/
export declare const useAddFavorite: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addFavorite>>, TError, {
        attractionId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addFavorite>>, TError, {
    attractionId: number;
}, TContext>;
export declare const getRemoveFavoriteUrl: (attractionId: number) => string;
/**
 * @summary Remove from favorites
 */
export declare const removeFavorite: (attractionId: number, options?: RequestInit) => Promise<void>;
export declare const getRemoveFavoriteMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFavorite>>, TError, {
        attractionId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof removeFavorite>>, TError, {
    attractionId: number;
}, TContext>;
export type RemoveFavoriteMutationResult = NonNullable<Awaited<ReturnType<typeof removeFavorite>>>;
export type RemoveFavoriteMutationError = ErrorType<unknown>;
/**
* @summary Remove from favorites
*/
export declare const useRemoveFavorite: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof removeFavorite>>, TError, {
        attractionId: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof removeFavorite>>, TError, {
    attractionId: number;
}, TContext>;
export declare const getGetMerchantDashboardUrl: () => string;
/**
 * @summary Get merchant dashboard stats
 */
export declare const getMerchantDashboard: (options?: RequestInit) => Promise<MerchantDashboard>;
export declare const getGetMerchantDashboardQueryKey: () => readonly ["/api/merchants/dashboard"];
export declare const getGetMerchantDashboardQueryOptions: <TData = Awaited<ReturnType<typeof getMerchantDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMerchantDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMerchantDashboard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMerchantDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getMerchantDashboard>>>;
export type GetMerchantDashboardQueryError = ErrorType<unknown>;
/**
 * @summary Get merchant dashboard stats
 */
export declare function useGetMerchantDashboard<TData = Awaited<ReturnType<typeof getMerchantDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMerchantDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListMerchantAttractionsUrl: () => string;
/**
 * @summary List merchant's own attractions
 */
export declare const listMerchantAttractions: (options?: RequestInit) => Promise<Attraction[]>;
export declare const getListMerchantAttractionsQueryKey: () => readonly ["/api/merchants/attractions"];
export declare const getListMerchantAttractionsQueryOptions: <TData = Awaited<ReturnType<typeof listMerchantAttractions>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMerchantAttractions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMerchantAttractions>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMerchantAttractionsQueryResult = NonNullable<Awaited<ReturnType<typeof listMerchantAttractions>>>;
export type ListMerchantAttractionsQueryError = ErrorType<unknown>;
/**
 * @summary List merchant's own attractions
 */
export declare function useListMerchantAttractions<TData = Awaited<ReturnType<typeof listMerchantAttractions>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMerchantAttractions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListMerchantBookingsUrl: () => string;
/**
 * @summary List bookings for merchant's attractions
 */
export declare const listMerchantBookings: (options?: RequestInit) => Promise<Booking[]>;
export declare const getListMerchantBookingsQueryKey: () => readonly ["/api/merchants/bookings"];
export declare const getListMerchantBookingsQueryOptions: <TData = Awaited<ReturnType<typeof listMerchantBookings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMerchantBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMerchantBookings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMerchantBookingsQueryResult = NonNullable<Awaited<ReturnType<typeof listMerchantBookings>>>;
export type ListMerchantBookingsQueryError = ErrorType<unknown>;
/**
 * @summary List bookings for merchant's attractions
 */
export declare function useListMerchantBookings<TData = Awaited<ReturnType<typeof listMerchantBookings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMerchantBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetAdminStatsUrl: () => string;
/**
 * @summary Get admin-level platform statistics
 */
export declare const getAdminStats: (options?: RequestInit) => Promise<AdminStats>;
export declare const getGetAdminStatsQueryKey: () => readonly ["/api/admin/stats"];
export declare const getGetAdminStatsQueryOptions: <TData = Awaited<ReturnType<typeof getAdminStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAdminStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getAdminStats>>>;
export type GetAdminStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get admin-level platform statistics
 */
export declare function useGetAdminStats<TData = Awaited<ReturnType<typeof getAdminStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListAdminUsersUrl: () => string;
/**
 * @summary List all users (admin)
 */
export declare const listAdminUsers: (options?: RequestInit) => Promise<User[]>;
export declare const getListAdminUsersQueryKey: () => readonly ["/api/admin/users"];
export declare const getListAdminUsersQueryOptions: <TData = Awaited<ReturnType<typeof listAdminUsers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAdminUsers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAdminUsers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAdminUsersQueryResult = NonNullable<Awaited<ReturnType<typeof listAdminUsers>>>;
export type ListAdminUsersQueryError = ErrorType<unknown>;
/**
 * @summary List all users (admin)
 */
export declare function useListAdminUsers<TData = Awaited<ReturnType<typeof listAdminUsers>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAdminUsers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListAdminBookingsUrl: () => string;
/**
 * @summary List all bookings (admin)
 */
export declare const listAdminBookings: (options?: RequestInit) => Promise<Booking[]>;
export declare const getListAdminBookingsQueryKey: () => readonly ["/api/admin/bookings"];
export declare const getListAdminBookingsQueryOptions: <TData = Awaited<ReturnType<typeof listAdminBookings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAdminBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAdminBookings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAdminBookingsQueryResult = NonNullable<Awaited<ReturnType<typeof listAdminBookings>>>;
export type ListAdminBookingsQueryError = ErrorType<unknown>;
/**
 * @summary List all bookings (admin)
 */
export declare function useListAdminBookings<TData = Awaited<ReturnType<typeof listAdminBookings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAdminBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map