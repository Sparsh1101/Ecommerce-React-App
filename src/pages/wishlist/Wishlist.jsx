import React, { useContext, useState } from 'react'
import { ShopContext } from '../../context/shop-context';
import { Product } from '../shop/Product';


export const Wishlist = ({ products }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [message, setMessage] = useState("");
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useContext(ShopContext);

  let totalItems = 0;
  for (let i in wishlistItems) {
    totalItems += (wishlistItems[i]);
  }

  const handleAddToWishlist = (id, title) => {
    setMessage(title + " added to wishlist successfully!");
    setAlertType("a");
    addToWishlist(id);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleRemoveFromWishlist = (id, title) => {
    setMessage(title + " removed from wishlist successfully!");
    setAlertType("r");
    removeFromWishlist(id);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleAddToCart = (id, stock, title) => {
    setMessage(title + " added to cart successfully!");
    setAlertType("a");
    addToCart(id, stock);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (

    <div className='shop'>
      <div className='container'>
        {totalItems > 0 ? (
          <h1 className='text-center mb-5 mt-3'>Your Wishlist Items</h1>
        ) : (<h1 className='text-center mb-5 mt-3'>Your Wishlist is Empty</h1>)}

        {showAlert && (
          <div className="d-flex justify-content-center">
            <div className={`alert ${alertType === 'a' ? 'alert-success' : 'alert-danger'} col-10 col-md-6 text-center alert-dismissible fade show`} role="alert">
              {message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
        )}

        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          {totalItems > 0 ? (
            <React.Fragment>
              {products.map((product) => {
                if (product.id in wishlistItems) {
                  return <Product data={product} key={product.id} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist} handleRemoveFromWishlist={handleRemoveFromWishlist} />
                }
              })}
            </React.Fragment>
          ) : (<span></span>)}
        </div>

      </div>
    </div>
  )
}