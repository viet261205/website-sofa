import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/carContext';

const ProductDetails = () => {
  const { id } = useParams(); // Lấy id sản phẩm từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Quản lý số lượng
  const [user, setUser] = useState(null); // Người dùng đang đăng nhập
  const navigate = useNavigate();
  const { addToCart } = useCart();
  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage (hoặc từ Context API nếu sử dụng)
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser)); // Giả sử bạn lưu thông tin người dùng trong localStorage
    } else {
      setUser(null); // Nếu không có người dùng, không cho phép đặt hàng
    }
  }, []);

  useEffect(() => {
    // Lấy dữ liệu chi tiết sản phẩm từ API
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity((prev) => (prev < 10 ? prev + 1 : prev)); // Tăng số lượng nhưng không vượt quá 10
    } else if (action === 'decrement') {
      setQuantity((prev) => (prev > 1 ? prev - 1 : prev)); // Giảm số lượng nhưng không dưới 1
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert('đăng nhập để thêm vào giỏ hàng');
      navigate('/login');
      return;
    }

    // Tạo đối tượng sản phẩm
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    };
    addToCart(cartItem)

    // Lấy giỏ hàng hiện tại từ localStorage (nếu có)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      // Nếu có, cập nhật số lượng
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Nếu chưa có, thêm mới
      cart.push(cartItem);
    }

    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Hiển thị thông báo và điều hướng người dùng
    alert('thêm thành công ');
    // Điều hướng đến trang giỏ hàng
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product_image_area section_padding">
      <div className="container">
        <div className="row s_product_inner justify-content-between">
          <div className="col-lg-7 col-xl-7">
            <div className="product_slider_img">
              <div id="vertical">
                <div >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '500px',
                      objectFit: 'contain',
                      marginLeft: '-50px', // dịch sang trái 20px
                      marginTop: '-50px' // dịch sang trái 20px
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-xl-4">
            <div className="s_product_text">
              <h5>
                previous <span>|</span> next
              </h5>
              <h3>{product.name}</h3>
              <h2>${product.price}</h2>
              <ul className="list">
                <li>
                  <a className="active" href="#">
                    <span>loại hàng:</span> {product.category}
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>kho :</span> {product.availability ? 'còn hàng' : 'Hết hàng'}
                  </a>
                </li>
              </ul>
              <p>{product.desc}</p>
              <div className="card_area d-flex justify-content-between align-items-center">
                <div className="product_count">
                  <span className="inumber-decrement" onClick={() => handleQuantityChange('decrement')}>
                    <i className="ti-minus" />
                  </span>
                  <input className="input-number" type="text" value={quantity} readOnly />
                  <span className="number-increment" onClick={() => handleQuantityChange('increment')}>
                    <i className="ti-plus" />
                  </span>
                </div>
                <button className="btn_3" onClick={handleAddToCart}>
                  thêm vào giỏ hàng
                </button>
                <a href="#" className="like_us">
                  <i className="ti-heart" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
