import React from 'react';
import { Drawer, Button, InputNumber, message } from 'antd';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StoreUse from '../Store/StoreUse';
import { toast } from 'react-toastify';

const CartDrawer = () => {
  const navigate = useNavigate();

  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, getCartTotal } = StoreUse();

  const total = getCartTotal();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning('Your cart is empty');
      return;

    }
    setCartOpen(false);
    navigate('/checkout')
  }

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
    // toast.success('Item removed from cart');
  }

  return (
    <Drawer
      title="Shopping Cart"
      placement="right"
      onClose={() => setCartOpen(false)}
      open={isCartOpen}
      width={400}
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 border-b pb-4">
                  <img
                    src={`http://localhost:5000${item.images[0]}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-sm text-gray-500">
                      Size: {item.selectedSize || item.sizes[0]} | Material: {item.material}
                    </div>
                    <div className="font-medium">
                      <div className="font-medium">
                        Rs:{item.price}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="small"
                        icon={<Minus size={14} />}
                        onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                      />
                      <InputNumber
                        min={1}
                        value={item.quantity || 1}
                        onChange={(value) => updateQuantity(item._id, value)}
                        className="w-16"
                      />
                      <Button
                        size="small"
                        icon={<Plus size={14} />}
                        onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                      />
                    </div>
                  </div>
                  <Button
                    type="text"
                    icon={<Trash2 size={18} />}
                    onClick={() => handleRemoveItem(item._id, item.name)}
                    className="text-gray-500 hover:text-red-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="py-4 border-t mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-medium">Rs: {total.toFixed(2)}</span>
            </div>
            <Button
              type="primary"
              block
              className="bg-[#0F172A]"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;