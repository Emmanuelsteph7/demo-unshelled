import { AxiosResponse } from "axios";
import { AxiosConfig, RequestConfig } from "../../config/axiosConfig";
import { Api } from "../../types";

export const fetchAllPostsService = async (
  config?: RequestConfig<any>
): Promise<Api.Posts.FetchAllPosts.Response> => {
  return AxiosConfig.get<
    Api.Posts.FetchAllPosts.Response,
    AxiosResponse<Api.Posts.FetchAllPosts.Response>
  >("/objects", config).then((res) => res.data);
};

export const fetchSinglePostService = async (
  payload: Api.Posts.FetchSinglePost.Request,
  config?: RequestConfig<any>
): Promise<Api.Posts.FetchSinglePost.Response> => {
  return AxiosConfig.get<
    Api.Posts.FetchSinglePost.Response,
    AxiosResponse<Api.Posts.FetchSinglePost.Response>
  >(`/objects/${payload.id}`, config).then((res) => res.data);
};

export const editPostService = async (
  payload: Api.Posts.EditPost.Request,
  config?: RequestConfig<any>
): Promise<Api.Posts.EditPost.Response> => {
  return AxiosConfig.put<
    Api.Posts.EditPost.Response,
    AxiosResponse<Api.Posts.EditPost.Response>
  >(`/objects/${payload.id}`, payload.data, config).then((res) => res.data);
};

export const deletePostService = async (
  payload: Api.Posts.DeletePost.Request,
  config?: RequestConfig<any>
): Promise<Api.Posts.DeletePost.Response> => {
  return AxiosConfig.delete<
    Api.Posts.DeletePost.Response,
    AxiosResponse<Api.Posts.DeletePost.Response>
  >(`/objects/${payload.id}`, config).then((res) => res.data);
};
