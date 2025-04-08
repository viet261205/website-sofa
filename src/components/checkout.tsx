import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
    calculateTotalPrice(cartData);

    // Lấy thông tin người dùng từ localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUserId(userData.id); // Lưu userId riêng
      setUserInfo((prev) => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || '',
      }));
    }
  }, []);

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const saveOrderToDB = () => {
    const orderData = {
      userId,           
      userInfo,
      cartItems,
      totalPrice,
      shipping: 50,
      grandTotal: totalPrice + 50,
      date: new Date().toISOString(),
    };

    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Đơn hàng đã được lưu:', data);
        alert('Đơn hàng đã được lưu thành công!');
        localStorage.removeItem('cart'); // Xoá giỏ hàng sau khi checkout
        navigate('/');
      })
      .catch((error) => {
        console.error('Lỗi khi lưu đơn hàng:', error);
        alert('Đã có lỗi xảy ra khi lưu đơn hàng!');
      });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    if (!userId) {
      alert('Bạn cần đăng nhập trước khi thanh toán.');
      return;
    }

    saveOrderToDB();
  };

  return (
    <section className="checkout_area padding_top">
      <div className="container">
        <div className="billing_details">
          <div className="row">
            <div className="col-lg-8">
              <h3>Nhập thông tin thanh toán</h3>
              <form className="row contact_form">
                <div className="col-md-6 form-group p_star">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Họ tên"
                    value={userInfo.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 form-group p_star">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-12 form-group p_star">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Địa chỉ"
                    value={userInfo.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <div className="creat_account">
                    <h3>Chọn phương thức thanh toán</h3>
                    <input type="checkbox" id="f-option3" name="selector" />
                    <label htmlFor="f-option3">Thanh toán khi nhận hàng</label>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-4">
              <div className="order_box">
                <h2>Đơn hàng đã đặt</h2>
                <ul className="list">
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <a href="#">
                        {item.name}
                        <span className="middle">x {item.quantity}</span>
                        <span className="last">${(item.price * item.quantity).toFixed(2)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="list list_2">
                  <li>
                    <a href="#">Tổng tiền hàng
                      <span>${totalPrice.toFixed(2)}</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">Shipping
                      <span>$50.00</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">Tổng tiền phải trả
                      <span>${(totalPrice + 50).toFixed(2)}</span>
                    </a>
                  </li>
                </ul>
                <a className="btn_3" onClick={handleCheckout}>
                  Thanh toán
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCheckout;
