

  import React, { useState, useEffect } from 'react';
  interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  export default function ProductCart1() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
          setProducts(data.slice(0, 4)); // 🔴 Chỉ lấy 4 sản phẩm
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <section className="product_list section_padding">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <div className="col-lg-12">
              <div className="section_tittle text-center">
                <h2>awesome <span>shop</span></h2>
              </div>
            </div>
          </div>
  
          {/* Chỉ hiển thị 1 hàng ngang 4 sản phẩm */}
          <div className="row justify-content-center">
            {products.map(product => (
              <div key={product.id} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="single_product_item">
                  <img src={product.image} alt={product.name} className="img-fluid" />
                  <div className="single_product_text">
                    <h4>{product.name}</h4>
                    <h3>${product.price}</h3>
                    <a href={`/detail/${product.id}`} className="add_cart">
                      + add to cart<i className="ti-heart" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  