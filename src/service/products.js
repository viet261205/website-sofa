import instance from "./config";

async function getProducts() {
  const res = await instance.get("/products");
  return res.data;
}

async function getProductDetail(id) {
  const res = await instance.get(`/products/${id}`);
  return res.data;
}

export { getProducts, getProductDetail };
