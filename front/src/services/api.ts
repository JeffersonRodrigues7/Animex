import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use(function (config: AxiosRequestConfig<any>): AxiosRequestConfig<any> {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    config.headers!.Authorization = token;
  }

  return config;
});

//UserController
export const apiRegister = async (username: string, email: string, password: string, access_level: number, biography: string): Promise<AxiosResponse<any, any>> => {
  return api.post("/register", { username, email, password, access_level, biography });
};

export const apiFindUserByUsername = async (username: string): Promise<AxiosResponse<any, any>> => {
  return api.get("/users/username/:username", { params: { username } });
};

export const apiFindUserByEmail = async (email: string): Promise<AxiosResponse<any, any>> => {
  return api.get("/users/email/:email", { params: { email } });
};

export const apiLogin = async (email: string, password: string): Promise<AxiosResponse<any, any>> => {
  return api.post("/login", { email, password });
};

export const apiFindUserById = async (id: number): Promise<AxiosResponse<any, any>> => {
  return api.post("/users/id", { id });
};

export const apiUpdatedProfile = async (profile_image: FormData): Promise<AxiosResponse<any, any>> => {
  return api.patch("/update", profile_image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//TopicController
export const apiCreateTopic = async (title: string, user_id: number, username: string): Promise<AxiosResponse<any, any>> => {
  return api.post("/new-topic", { title, user_id, username });
};

export const apiListTopics = async (offset: number, limit: number): Promise<AxiosResponse<any, any>> => {
  return api.post("/list-topics", { offset, limit });
};

export const apiQtdTopics = async () => {
  return api.post("/qtd-topics");
};

export const apiUpdatedTopic = async (id: number, last_user_comment_name: string): Promise<AxiosResponse<any, any>> => {
  return api.patch("/update-topic", { id, last_user_comment_name });
};

//CommentController
export const apiCreateComment = async (text: string, user_id: number, topic_id: number): Promise<AxiosResponse<any, any>> => {
  return api.post("/new-comment", { text, user_id, topic_id });
};

export const apiListComments = async (id: number, offset: number, limit: number): Promise<AxiosResponse<any, any>> => {
  return api.post("/list-comments", { id, offset, limit });
};

export const apiQtdComments = async (id: number): Promise<AxiosResponse<any, any>> => {
  return api.post("/qtd-comments", { id });
};

export const apiGetTweet = async (url: string): Promise<AxiosResponse<any, any>> => {
  return api.post("/get-tweet", { url });
};
