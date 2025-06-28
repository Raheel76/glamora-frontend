import React from 'react';
import { Modal, Button, message } from 'antd';
import { Trash2, ShoppingCart } from 'lucide-react';
import StoreUse from '../../Store/StoreUse';
import { toast } from 'react-toastify';

const WishlistModal = () => {
  const { favorites, isWishlistOpen, setWishlistOpen, toggleFavorite, addToCart, setCartOpen } = StoreUse();

  const handleAddToCart = (item) => {
    addToCart(item);
    setCartOpen(true);
    setWishlistOpen(false);
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (item) => {
    toggleFavorite(item);
    // toast.success(`${item.name} removed from wishlist`);
  };

  return (
    <Modal
      title="Wishlist"
      open={isWishlistOpen}
      onCancel={() => setWishlistOpen(false)}
      footer={null}
      width={800}
      centered
    >
      <div className="space-y-4 modal-scroll pe-2 ">
        {favorites.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your wishlist is empty
          </div>
        ) : (
          favorites.map((item) => (
            <div key={item._id} className="flex gap-4 border-b pb-4">
              <img
                src={`http://localhost:5000${item.images[0]}`}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                <div className="font-medium mt-2">
                  <span>Rs:{item.price}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="text"
                  icon={<Trash2 size={18} />}
                  onClick={() => handleRemoveFromWishlist(item)}
                  className="text-gray-500 hover:text-red-500"
                />
                <Button
                  type="primary"
                  icon={<ShoppingCart size={18} />}
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#0F172A] hover:bg-[#1E293B]"
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