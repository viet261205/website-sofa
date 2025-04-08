import { Button, Image, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { useDelete, useList } from "../../hooks";

function ProductList() {
  const { data, isLoading } = useList({ resource: "products" });
  const { mutate } = useDelete({ resource: "products" });

  const columns = [
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
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} width={100} />;
      },
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Actions",
      render: (product: any) => {
        return (
          <Space>
            <Button type="primary">
              <Link to={`/admin/product/${product.id}/edit`}>Edit</Link>
            </Button>
            <Button type="primary" onClick={() => mutate(product.id)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return <Table dataSource={data} columns={columns} loading={isLoading} />;
}

export default ProductList;
