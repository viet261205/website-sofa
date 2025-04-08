import instance from "./config";

async function loginAccount(data) {
  const res = await instance.post("/login", data);
  return res.data;
}

async function registerAccount(data) {
  const res = await instance.post("/register", data);
  return res.data;
}

async function profile(id) {
  const res = await instance.get(`/users/${id}`);
  return res.data;
}

export { loginAccount, registerAccount, profile };
