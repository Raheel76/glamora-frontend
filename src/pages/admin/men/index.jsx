import React, { useState, useEffect } from 'react';
import { Table, Empty, Space, Tooltip, Popconfirm } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CreateModal, ViewModal } from '../../../components/common';

const Men = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = (product) => {
    setProducts([...products, product]);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map(product =>
      product._id === updatedProduct._id ? updatedProduct : product
    ));
    setEditProduct(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  const handleView = (product) => {
    setViewProduct(product);
  };

  const handleViewModalClose = () => {
    setViewProduct(null);
  };

  const shirtsData = products.filter(product => product.subcategory === 'Shirts' && product.category === 'Men');
  const pantsData = products.filter(product => product.subcategory === 'Pants' && product.category === 'Men');

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      width: 160,
      render: (images) => (
        <div className='w-14 h-14'>
          <img
            src={images && images[0] ? `http://localhost:5000${images[0]}` : 'https://via.placeholder.com/300'}
            alt="product"
            className='size-full rounded-md object-cover'
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300' }}
          />
        </div>
      ),
    },
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      width: 100,
      className: 'center-column',
      render: (id) => id.slice(-6),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      width: 240,
      className: 'center-column',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 240,
      className: 'center-column',
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'subcategory',
      width: 240,
      className: 'center-column',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 240,
      className: 'center-column',
      render: (price) => `Rs.${Number(price).toFixed(2)}`,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 240,
      className: 'center-column',
      render: (description) => (
        <div className='flex flex-col text-center items-center h-full justify-center'>
          <Tooltip title={description} placement="topLeft">
            <div className="truncate">{description}</div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Sizes',
      dataIndex: 'sizes',
      key: 'sizes',
      width: 300,
      className: 'center-column',
      render: (sizes) => (sizes && sizes.length > 0 ? sizes.join(', ') : 'N/A'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      className: 'center-column',
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            className="text-green-600 text-lg"
            onClick={() => handleView(record)}
          />
          <EditOutlined
            onClick={() => setEditProduct(record)}
            className="text-blue-600 text-lg"
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <DeleteOutlined className="text-red-600 text-lg" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto  md:px-4">
      <div className="flex xs:flex-col gap-3 justify-between mb-8">
        <h2 className="text-3xl font-bold">Men Products</h2>
        <CreateModal
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          editProduct={editProduct}
          category="Men"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold my-8 text-center">Men Shirts</h1>
      </div>
      {shirtsData.length === 0 ? (
        <Empty description="No Men Shirts Available" />
      ) : (
        <div className="product-table overflow-hidden py-4">
          <Table
            columns={columns}
            dataSource={shirtsData}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            className='customs-table  overflow-x-auto'
          />
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold my-8 text-center">Men Pants</h1>
      </div>
      {pantsData.length === 0 ? (
        <Empty description="No Men Pants Available" />
      ) : (
        <div className="product-table  overflow-hidden ">
          <Table
            columns={columns}
            dataSource={pantsData}
            rowKey="_id"
            className="customs-table  overflow-x-auto "
            rowClassName={() => "custom-row"}
            scroll={{ xs: "100%" }}
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
      <ViewModal
        visible={!!viewProduct}
        product={viewProduct}
        onCancel={handleViewModalClose}
      />
    </div>
  );
};

export default Men;