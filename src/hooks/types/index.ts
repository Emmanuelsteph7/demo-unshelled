import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type QueryOptions<T> = Omit<
  UseQueryOptions<T, AxiosError<any>>,
  "queryKey"
>;
export type MutationOptions<T, Q> = Omit<
  UseMutationOptions<T, AxiosError<any>, Q>,
  "mutationKey" | "mutationFn"
>;

/**
 * Tags for queries and mutations
 */
export enum PostsQueryTag {
  FetchAllPosts = "FetchAllPosts",
  FetchSinglePost = "FetchSinglePost",
  EditPost = "EditPost",
  DeletePost = "DeletePost",
}
