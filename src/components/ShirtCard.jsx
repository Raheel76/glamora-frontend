import { Button, Badge, Rate, message } from 'antd';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StoreUse from './Store/StoreUse';
import { toast } from 'react-toastify';

const ShirtCard = ({ shirt }) => {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites, setCartOpen } = StoreUse();

  const {
    _id,
    name,
    description,
    price,
    images,
    category,
    subcategory,
    sizes,
    fitType,
    material,
    occasion
  } = shirt;

  const isFavorite = favorites.some(fav => fav._id === _id);

  const handleViewDetails = () => {
    navigate(`/product/${_id}`);
  };

  const handleAddToCart = () => {
    addToCart(shirt);
    setCartOpen(true);
    toast.success('Product added to cart!');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(shirt);
    toast.success(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[125%] overflow-hidden">
        <img
          src={`http://localhost:5000${images[0]}`}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />

        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart
            size={20}
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>

        {/* Category badge */}
        <div className="absolute top-2 left-[14%]">
          <Badge.Ribbon text={subcategory} color="#0F172A" className="font-medium" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
          <div className="flex items-center">
            <Rate disabled defaultValue={4.5} count={1} className="text-amber-500" />
            <span className="ml-1 text-sm text-gray-600">4.5</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3 h-10">{description}</p>
        
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-medium">Material:</span> {material}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-gray-900">Rs:{price}</span>
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