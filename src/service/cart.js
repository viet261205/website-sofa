import instance from './config';

/**
 * Lấy giỏ hàng theo userId
 */
async function getCart(userId) {
  try {
    if (userId) {
      const { data } = await instance.get(`/cart`, { params: { userId } });
      return data.length > 0 ? data[0].products || [] : [];
    }
  } catch (error) {
    console.error('❌ Lỗi khi lấy giỏ hàng:', error);
    throw error;
  }
}

/**
 * Xóa một sản phẩm khỏi giỏ hàng
 */
async function deleteProduct(userId, productId) {
  try {
    let products = await getCart(userId);

    // Lọc bỏ sản phẩm cần xóa
    const updatedProducts = products.filter((p) => p.id !== productId);

    return updatedProducts.length > 0
      ? updateCart(userId, updatedProducts)
      : deleteCart(userId);
  } catch (error) {
    console.error('❌ Lỗi khi xóa sản phẩm:', error);
    throw error;
  }
}

/**
 * Thêm sản phẩm vào giỏ hàng
 */
async function addProductService(userId, product) {
  try {
    // **Không gọi getCart ở đây**
    // Thay vào đó, tạo một giỏ hàng mới trực tiếp
    return updateCart(userId, product); // product đã là array
  } catch (error) {
    console.error('❌ Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    throw error;
  }
}

/**
 * Edit sản phẩm vào giỏ hàng
 */
async function editProductService(userId, products) {
  try {
    return updateCart(userId, products);
  } catch (error) {
    console.error('❌ Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    throw error;
  }
}

/**
 * Cập nhật giỏ hàng
 */
async function updateCart(userId, products) {
  try {
    const { data } = await instance.get(`/cart`, { params: { userId } });
    if (data.length > 0) {
      return (await instance.put(`/cart/${data[0].id}`, { userId, products }))
        .data;
    } else {
      return await instance.post(`/cart`, { userId, products });
    }
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật giỏ hàng:', error);
    throw error;
  }
}

/**
 * Xóa toàn bộ giỏ hàng của userId
 */
async function deleteCart(userId) {
  try {
    const { data } = await instance.get(`/cart`, { params: { userId } });
    if (data.length > 0) {
      await instance.delete(`/cart/${data[0].id}`);
      return [];
    }
    return [];
  } catch (error) {
    console.error('❌ Lỗi khi xóa giỏ hàng:', error);
    throw error;
  }
}

export {
  getCart,
  deleteProduct,
  addProductService,
  updateCart,
  deleteCart,
  editProductService,
};
