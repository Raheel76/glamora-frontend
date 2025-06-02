import { Button, Badge, Rate } from 'antd';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StoreUse from './Store/StoreUse';

const ShirtCard = ({ shirt }) => {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites, setCartOpen } = StoreUse();

  const {
    id,
    title,
    description,
    price,
    images,
    isNew,
    rating,
    onSale,
    salePrice,
    inStock
  } = shirt;

  const isFavorite = favorites.some(fav => fav.id === id);

  const handleViewDetails = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = () => {
    addToCart(shirt);
    setCartOpen(true);
  };

  return (
    <div className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[125%] overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />

        <button
          onClick={() => toggleFavorite(shirt)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart
            size={20}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{title}</h3>
          <div className="flex items-center">
            <Rate disabled defaultValue={rating} count={1} className="text-amber-500" />
            <span className="ml-1 text-sm text-gray-600">{rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3 h-10">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            {onSale ? (
              <>
                <span className="text-lg font-bold text-red-600">${salePrice}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">${price}</span>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="default"
              icon={<Eye size={16} />}
              onClick={handleViewDetails}
              className="flex items-center hover:bg-gray-50"
            >
              <span className="ml-1">View</span>
            </Button>
            <Button
              type="primary"
              icon={<ShoppingCart size={16} />}
              onClick={handleAddToCart}
              className="flex items-center bg-[#0F172A] hover:bg-[#1E293B] border-0"
              disabled={!inStock}
            >
              <span className="ml-1">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtCard;