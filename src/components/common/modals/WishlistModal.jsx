import React from 'react';
import { Modal, Button } from 'antd';
import { Trash2, ShoppingCart } from 'lucide-react';
import StoreUse from '../../Store/StoreUse';

const WishlistModal = () => {
  const { favorites, isWishlistOpen, setWishlistOpen, toggleFavorite, addToCart, setCartOpen } = StoreUse();

  const handleAddToCart = (item) => {
    addToCart(item);
    setCartOpen(true);
  };

  return (
    <Modal
      title="Wishlist"
      open={isWishlistOpen}
      onCancel={() => setWishlistOpen(false)}
      footer={null}
      width={800}
    >
      <div className="space-y-4">
        {favorites.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your wishlist is empty
          </div>
        ) : (
          favorites.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                <div className="font-medium mt-2">
                  {item.onSale ? (
                    <>
                      <span className="text-red-600">${item.salePrice}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${item.price}
                      </span>
                    </>
                  ) : (
                    <span>${item.price}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="text"
                  icon={<Trash2 size={18} />}
                  onClick={() => toggleFavorite(item)}
                  className="text-gray-500 hover:text-red-500"
                />
                <Button
                  type="primary"
                  icon={<ShoppingCart size={18} />}
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#0F172A] hover:bg-[#1E293B]"
                  disabled={!item.inStock}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default WishlistModal;