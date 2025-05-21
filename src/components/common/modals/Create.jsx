import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Upload, Row, Col } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react/dist/iconify.js';

const { Option } = Select;
const { TextArea } = Input;

const CreateModal = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="bg-blue-500 py-5 px-8 font-medium rounded-full hover:bg-blue-600"
        onClick={showModal}
      >
        Add Product
      </Button>
      <Modal
        title="Add New Product"
        width={1000}
        className='main-modal'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}

      >
        <Form
          form={form}
          layout="vertical"
        >
          <div className="modal-scroll pe-2">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Product Name"
                >
                  <Input placeholder="e.g., PARADISE EMBROIDERED PANTS" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="sku"
                  label="SKU"
                >
                  <Input placeholder="e.g., WAS25BT197-MED-GRY" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Category"
                >
                  <Select placeholder="Select Category">
                    <Option value="Men">Men</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="subcategory"
                  label="Subcategory"
                >
                  <Select placeholder="Select Subcategory">
                    <Option value="Shirts">Shirts</Option>
                    <Option value="Pants">Pants</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Regular Price"
                >
                  <Input prefix="Rs." type="number" placeholder="e.g., 4950.00" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="description"
                  label="Description"
                >
                  <TextArea
                    rows={2}
                    placeholder="e.g., High-quality product with premium features..."
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="fitType" label="Fit Type">
                  <Select>
                    <Option value="Wide leg">Wide leg</Option>
                    <Option value="Slim">Slim</Option>
                    <Option value="Regular">Regular</Option>
                    <Option value="Loose">Loose</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="stretch" label="Stretch">
                  <Select>
                    <Option value="None">None</Option>
                    <Option value="Low">Low</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="High">High</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="transparency" label="Transparency">
                  <Select>
                    <Option value="None">None</Option>
                    <Option value="Low">Low</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="High">High</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="handFeel" label="Hand Feel">
                  <Select>
                    <Option value="Regular">Regular</Option>
                    <Option value="Soft">Soft</Option>
                    <Option value="Rough">Rough</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="lining" label="Lining">
                  <Select>
                    <Option value="None">None</Option>
                    <Option value="Full">Full</Option>
                    <Option value="Partial">Partial</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="material"
                  label="Material"
                >
                  <Input placeholder="e.g., 100% Cotton" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="size" label="Size">
                  <Select>
                    <Option value="SMALL">SMALL</Option>
                    <Option value="MEDIUM">MEDIUM</Option>
                    <Option value="LARGE">LARGE</Option>
                    <Option value="XL">XL</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="occasion" label="Occasion">
                  <Select>
                    <Option value="Formal Casual">Formal Casual</Option>
                    <Option value="Casual">Casual</Option>
                    <Option value="Formal">Formal</Option>
                    <Option value="Party">Party</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="images"
                  label="Product Images"
                >
                  <div className="relative w-32 h-32">
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer w-32 h-32 border rounded-full bg-gray-100 overflow-hidden block"
                    >
                      <img
                        src='https://via.placeholder.com/150'
                        alt="Profile"
                        className="size-full object-cover"
                        onError={() => console.log('Image failed to load')}
                      />
                      <div className="absolute bottom-0 right-0 z-[11111] bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600">
                        <Icon icon="mdi:camera" width="20" />
                      </div>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="!hidden"
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="designDetails"
                  label="Design Details"
                >
                  <TextArea
                    className='textarea'
                    rows={4}
                    placeholder="e.g., Embroidered wide-leg pants with a scalloped hem..."
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="note" label="Note">
                  <TextArea
                    className='textarea'
                    rows={2}
                    placeholder="e.g., The actual color of the product may vary slightly from the image."
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Form.Item className='m-0'>
            <div className="flex mt-2 gap-3">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-10 border-none text-base font-medium rounded-md bg-blue-500 hover:bg-blue-600"
              >
                Save
              </Button>
              <Button
                className="w-full h-10 border-none text-base !text-white font-medium rounded-md !bg-gray-500 hover:!bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateModal;