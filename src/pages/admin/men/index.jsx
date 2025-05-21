import React from 'react';
import { Table, Empty, Space, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateModal from '../../../components/common/modals/Create'; 
const Men = () => {
    // Dummy data for shirts
    const shirtsData = [
        {
            id: '1',
            images: [{ url: '/assets/shirt1.jpg' }],
            name: 'Classic White Shirt',
            category: 'Men',
            subcategory: 'Shirts',
            price: '29.99',
            description: 'Premium quality white shirt for formal occasions'
        },
        {
            id: '2',
            images: [{ url: '/assets/shirt2.jpg' }],
            name: 'Blue Denim Shirt',
            category: 'Men',
            subcategory: 'Shirts',
            price: '34.99',
            description: 'Casual denim shirt for everyday wear'
        }
    ];

    // Dummy data for pants
    const pantsData = [
        {
            id: '3',
            images: [{ url: '/assets/pants1.jpg' }],
            name: 'Black Formal Pants',
            category: 'Men',
            subcategory: 'Pants',
            price: '49.99',
            description: 'Slim fit black pants for office wear'
        },
        {
            id: '4',
            images: [{ url: '/assets/pants2.jpg' }],
            name: 'Khaki Chinos',
            category: 'Men',
            subcategory: 'Pants',
            price: '39.99',
            description: 'Comfortable khaki pants for casual outings'
        }
    ];

    // Define table columns
    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'images',
            width: 160,
            className: "center-column",
            render: (images) => (
                <div className='flex justify-center'>
                    <div className=' w-14 h-14'>
                        <img
                            src={images[0]?.url || '/assets/image.png'}
                            alt="product"
                            className=' size-full rounded-md object-cover '
                        />
                    </div>
                </div>
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            width: 240,
            className: "center-column",
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 240,
            className: "center-column",
        },
        {
            title: 'Subcategory',
            dataIndex: 'subcategory',
            key: 'subcategory',
            width: 240,
            className: "center-column",
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `Rs.${Number(price).toFixed(2)}`,
            width: 240,
            className: "center-column",
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 240,
            className: "center-column  ",
            render: (description) => (
                <div className=' flex flex-col text-center items-center h-full justify-center'>
                    <Tooltip title={description} placement="topLeft">
                        <div className="truncate  ">
                            {description}
                        </div>
                    </Tooltip>
                </div>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            className: "center-column",
            render: (_, record) => (
                <Space size="middle">
                    <EyeOutlined className=' text-green-600 text-lg' />
                    <EditOutlined className='text-blue-600 text-lg' />
                    <DeleteOutlined className=' text-red-600 text-lg' />
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between mb-8">
                <h2 className="text-3xl font-bold">Men Products</h2>
                <CreateModal/>
            </div>
            {/* Men Shirts Section */}
            <div>
                <h1 className="text-3xl font-bold my-8 text-center">Men Shirts</h1>
            </div>
            {shirtsData.length === 0 ? (
                <Empty description="No Men Shirts Available" />
            ) : (
                <div className='product-table py-4'>
                    <Table
                        columns={columns}
                        dataSource={shirtsData}
                        rowKey="id"
                        pagination={{ pageSize: 8 }}
                    />
                </div>
            )}

            {/* Men Pants Section */}
            <div>
                <h1 className="text-3xl font-bold my-8 text-center">Men Pants</h1>
            </div>
            {pantsData.length === 0 ? (
                <Empty description="No Men Pants Available" />
            ) : (
                <div className='product-table'>
                    <Table
                        columns={columns}
                        dataSource={pantsData}
                        rowKey="id"
                        className=" custom-table"
                        rowClassName={() => "custom-row"}
                        scroll={{ xs: "100%" }}
                        pagination={{ pageSize: 8 }}
                    />
                </div>
            )}
        </div>
    );
};

export default Men;