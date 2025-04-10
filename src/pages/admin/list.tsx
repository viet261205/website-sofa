import { useState, useEffect } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../assets/css/demo.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/light-bootstrap-dashboard.css";
import "../assets/css/animate.min.css";
import "../assets/css/pe-icon-7-stroke.css";

type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
};

function List() {
  const [dataSource, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const getList = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const columns = [
    { 
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img: string) => <img src={img} alt="Product" style={{ width: 50, height: 50,  }} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Product) => (
        <>
          <Button
            type="primary"
            onClick={() => navigate(`/edit/${record.id}`)} // Navigate to edit page
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            typeof="danger"
            onClick={() => deleteProduct(record.id)}
            style={{ background:"red", color:"white"}}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const deleteProduct = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/products/${id}`);
        if (response.status === 200) {
          getList();
          alert("Xóa thành công");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="sidebar" data-color="purple" data-image=" ">
        <div className="sidebar-wrapper" style={{ background:"#6FD3EF"}}>
          <div className="logo" style={{ paddingBottom: '20px' }}>
            
            <a href="/" className="simple-text">
            <i className="pe-7s-science" style={{width:30}} />
            <b>react  </b>
            </a>
          </div>
          <ul className="nav">
            <li>
              <a href="/admin">
                <i className="pe-7s-user" />
                <p>list sản phẩm</p>    
              </a>  
            </li>
            <li>
              <a href="/add">
                <i className="pe-7s-news-paper" />
                <p>thêm sản phẩm</p>
              </a>
            </li>
            
            <li>
            <a href="/admin/orders">
                <i className="pe-7s-bell" />
                <p>orders</p>
              </a>
            </li>
            <li className="active-pro">
              <a href="upgrade.html">
                <i className="pe-7s-rocket" />
                <p>orders</p>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-panel" style={{ background:"#f6f6f6"}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid" >

            <a className="navbar-brand" href="#"><b>Admin</b> </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Nav item "Home" bên trái */}
              <div className="hder">
                <div>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/home"><b>Home</b></a>
                </li>
              </ul>
                </div>
              {/* Nav item "Search" và "Account" bên phải */}
            <div>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="fa fa-search"></i>
                    <span className="d-none d-md-inline">Search</span>
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-user"></i> Account
                  </a>
                </li>

              </ul>
            </div>
            </div>
            </div>
          </div>
        </nav>
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
       
      </div>
    </div>
    
  );
}

export default List;