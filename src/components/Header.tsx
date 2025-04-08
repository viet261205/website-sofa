import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Menu } from "antd";
import { useUser } from "../contexts/useContext";  // Giả sử bạn đã có context cho user
import { useCart } from "../contexts/carContext";

export default function Header() {
  const { user, logout } = useUser();
  const { getCartCount } = useCart();  // Lấy số lượng sản phẩm trong giỏ hàng từ context

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="main_menu home_menu">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <a className="navbar-brand" href="index.html"><img src="/img/product/logo.png" alt="logo" /></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="menu_icon"><i className="fas fa-bars" /></span>
              </button>
              <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                  <li className="nav-item"><a className="nav-link" href="/detail">Sản phẩm</a></li>
                  <li className="nav-item"><a className="nav-link" href="/login">Giới Thiệu</a></li>
                  <li className="nav-item"><a className="nav-link" href="/home">Liên hệ</a></li>
                </ul>
              </div>

              <div className="hearer d-flex">
                <a id="search_1" href="javascript:void(0)"><i className="ti-search" /></a>
                <a href=""><i className="ti-heart" /></a>
                <Link to="/cart">
                  <Badge count={getCartCount()} overflowCount={99}>
                    <ShoppingCartOutlined style={{ fontSize: "20px", marginLeft: 20 }} />
                  </Badge>
                </Link>

                <div className="dropdown">
                  {user ? (
                    <Dropdown overlay={userMenu} trigger={["click"]}>
                      <div style={{ paddingLeft: 10 }}>
                        <i className="fas fa-user" />
                      </div>
                    </Dropdown>
                  ) : (
                    <div style={{ display: "flex", gap: "20px" }}>
                      <Link to="/login" style={{ color: "white" }}>Login</Link>
                      <Link to="/register" style={{ color: "white" }}>Register</Link>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
