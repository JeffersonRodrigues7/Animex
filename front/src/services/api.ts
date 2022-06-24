import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers!.Authorization = token;
  }

  return config;
});

//UserController
export const apiLogin = async (email: string, password: string) => {
  return api.post("/login", { email, password });
};

export const apiRegister = async (userName: string, email: string, password: string, userLevel: number, biography: string, profileImage: string) => {
  return api.post("/register", { userName, email, password, userLevel, biography, profileImage });
};

export const apiFindUserByUserName = async (userName: string) => {
  return api.get("/users/userName/:userName", { params: { userName: userName } });
};

export const apiFindUserByEmail = async (email: string) => {
  return api.get("/users/email/:email", { params: { email: email } });
};

export const apiFindUserById = async (id: number) => {
  return api.post("/users/id", { id });
};

export const apiUpdatedProfile = async (profileImage: FormData) => {
  return api.patch("/update", profileImage, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//PostController
export const apiCreatePost = async (title: string, text: string, creatorId: number, creatorName: string) => {
  return api.post("/newpost", { title, text, creatorId, creatorName });
};

export const apiListPosts = async (offset: number, limit: number) => {
  return api.post("/listPosts", { offset, limit });
};

export const apiQtdPosts = async () => {
  return api.post("/qtdPosts");
};

export const apiUpdatedPost = async (id: number, lastUserPostName: string) => {
  return api.patch("/updatePost", { id, lastUserPostName });
};

//CommentController
export const apiCreateComment = async (text: string, postId: number, userId: number) => {
  return api.post("/newcomment", { text, postId, userId });
};

export const apiListComments = async (id: number, offset: number, limit: number) => {
  return api.post("/listComments", { id, offset, limit });
};

export const apiQtdComments = async (id: number) => {
  return api.post("/qtdComments", { id });
};
