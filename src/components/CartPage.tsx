import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart1 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null); // User info
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    // Lấy cart từ localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
    calculateTotalPrice(cartData);

    // Đồng bộ với backend khi load trang
    fetch('http://localhost:3000/carts')
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          syncCartWithBackend(cartData, userData);
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu giỏ hàng từ backend:', error);
      });
  }, []);

  // Tính tổng tiền
  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Đồng bộ giỏ hàng lên backend (POST)
  const syncCartWithBackend = (cartData, userData) => {
    const payload = {
      user: userData,
      cartItems: cartData,
    };

    fetch('http://localhost:3000/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log('Đã đồng bộ giỏ hàng lên backend:', data))
      .catch((error) => console.error('Lỗi khi đồng bộ giỏ hàng:', error));
  };

  // Cập nhật giỏ hàng (PUT)
  const updateCartInBackend = (updatedCart) => {
    const payload = {
      user,
      cartItems: updatedCart,
    };

    fetch('http://localhost:3000/carts/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log('Đã cập nhật giỏ hàng trên backend:', data))
      .catch((error) => console.error('Lỗi khi cập nhật giỏ hàng:', error));
  };

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (id, action) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        if (action === 'increment' && item.quantity < 10) {
          item.quantity += 1;
        } else if (action === 'decrement' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartInBackend(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  // Xử lý xóa sản phẩm
  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartInBackend(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  // Xử lý xóa tất cả
  const handleClearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', '[]');
    updateCartInBackend([]);
    setTotalPrice(0);
  };

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống!');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <section className="cart_area padding_top">
      <div className="container">
        <div className="cart_inner">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Số tiền</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="media">
                        <div className="d-flex">
                          <img src={item.image} alt={item.name} width="60px" />
                        </div>
                        <div className="media-body">
                          <p>{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h5>${item.price}</h5>
                    </td>
                    <td>
                      <div className="product_count">
                        <span
                          className="input-number-decrement"
                          onClick={() => handleQuantityChange(item.id, 'decrement')}
                        >
                          <i className="ti-angle-down" />
                        </span>
                        <input
                          className="input-number"
                          type="text"
                          value={item.quantity}
                          readOnly
                        />
                        <span
                          className="input-number-increment"
                          onClick={() => handleQuantityChange(item.id, 'increment')}
                        >
                          <i className="ti-angle-up" />
                        </span>
                      </div>
                    </td>
                    <td>
                      <h5>${(item.price * item.quantity).toFixed(2)}</h5>
                    </td>
                    <td>
                      <button className="btn_1" onClick={() => handleRemoveFromCart(item.id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}

                <tr className="bottom_button">
                  <td>
                    <button className="btn_1" onClick={handleClearCart}>
                      Xóa tất cả
                    </button>
                  </td>
                  <td />
                  <td />
                  <td>
                    <h5>Tổng tiền</h5>
                  </td>
                  <td>
                    <h5>${totalPrice.toFixed(2)}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="checkout_btn_inner float-right">
              <button className="btn_1 checkout_btn_1" onClick={handleCheckout}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart1;
