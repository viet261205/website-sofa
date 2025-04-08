import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/carContext';
import { Link } from 'react-router-dom';

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm từ json-server
    fetch('http://localhost:3000/products')  // Đảm bảo URL chính xác
      .then(response => response.json())
      .then(data => {
        setProducts(data.slice(0, 8));  // Chỉ lấy 8 sản phẩm đầu tiên
        setLoading(false);  // Dữ liệu đã được tải xong
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Hiển thị trạng thái loading
  }

  return (
    <section className="product_list section_padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="section_tittle text-center">
              <h2>awesome <span>shop</span></h2>
            </div>
          </div>
        </div>
        <div>
          <div className="col-lg-12">
            <div>
              <div className="single_product_list_slider">
                <div className="row align-items-center justify-content-between">
                  {products.map(product => (
                    <div key={product.id} className="col-lg-3 col-sm-6">
                      <div className="single_product_item">
                       
                          <img src={product.image} alt={product.name} />
                       
                        <div className="single_product_text">
                          <h4>{product.name}</h4>
                          <h3 >${product.price}</h3>
                          <a  href={`/detail/${product.id}`} className="add_cart">
                            + add to cart <i className="ti-heart" />
                          </a>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
