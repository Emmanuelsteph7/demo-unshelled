import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deletePostService,
  editPostService,
  fetchAllPostsService,
  fetchSinglePostService,
} from "../../services/posts-service";
import { Api } from "../../types";
import { MutationOptions, PostsQueryTag, QueryOptions } from "../types";
import { AxiosError } from "axios";
import { DURATION_5_MIN } from "../../constants";

export const useFetchAllPosts = (
  options?: QueryOptions<Api.Posts.FetchAllPosts.Response>
) => {
  return useQuery<Api.Posts.FetchAllPosts.Response, AxiosError<any>>({
    queryKey: [PostsQueryTag.FetchAllPosts],
    queryFn: () => fetchAllPostsService(),
    staleTime: DURATION_5_MIN,
    ...options,
  });
};

export const useFetchSinglePost = (
  payload: Api.Posts.FetchSinglePost.Request,
  options?: QueryOptions<Api.Posts.FetchSinglePost.Response>
) => {
  return useQuery<Api.Posts.FetchSinglePost.Response, AxiosError<any>>({
    queryKey: [PostsQueryTag.FetchAllPosts, payload.id],
    queryFn: () => fetchSinglePostService(payload),
    staleTime: DURATION_5_MIN,
    ...options,
  });
};

export const useEditPost = (
  options?: MutationOptions<
    Api.Posts.EditPost.Response,
    Api.Posts.EditPost.Request
  >
) => {
  return useMutation<
    Api.Posts.EditPost.Response,
    AxiosError<any>,
    Api.Posts.EditPost.Request
  >({
    mutationFn: editPostService,
    mutationKey: [PostsQueryTag.EditPost],
    ...options,
  });
};

export const useDeletePost = (
  options?: MutationOptions<
    Api.Posts.DeletePost.Response,
    Api.Posts.DeletePost.Request
  >
) => {
  return useMutation<
    Api.Posts.DeletePost.Response,
    AxiosError<any>,
    Api.Posts.DeletePost.Request
  >({
    mutationFn: deletePostService,
    mutationKey: [PostsQueryTag.DeletePost],
    ...options,
  });
};
