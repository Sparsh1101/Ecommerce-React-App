import React, { useContext } from 'react';
import StarRating from './StarRating';
import './Product.css';
import { ShopContext } from '../../context/shop-context';

function formatPrice(price) {
    return parseFloat(price).toFixed(Math.min(2, Math.max(0, price % 1 === 0 ? 0 : 2)));
}

export const Product = (props) => {
    const { id, title, price, discountPercentage, rating, brand, thumbnail, stock } = props.data;
    const { cartItems, wishlistItems } = useContext(ShopContext);


    let cartItemAmount = 0;
    if (id in cartItems) {
        cartItemAmount = cartItems[id];
    }

    let wishlistItemAmount = 0;
    if (wishlistItems && id in wishlistItems) {
        wishlistItemAmount = wishlistItems[id];
    }


    return (

        <div className="col">
            <div className="card">

                <img src={thumbnail} className="card-img-top" alt="..." />
                <div className='tags d-flex'>
                    {discountPercentage !== 0 ? (
                        <div class="discount-tag bg-danger text-white me-2">{discountPercentage.toFixed(0)}% OFF</div>
                    ) : (
                        <span></span>
                    )}
                    {/* <div class="category-tag">{category}</div> */}
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between m-0 p-0">
                        <h6 className="m-0 p-0 card-title">{brand}</h6>
                        <button type="button" class="btn btn-sm m-0 p-0" data-mdb-toggle="tooltip"
                            title={wishlistItemAmount > 0 ? "Remove From Wishlist" : "Add To Wishlist"} onClick={wishlistItemAmount > 0 ? () => props.handleRemoveFromWishlist(id, title) : () => props.handleAddToWishlist(id, title)}>
                            {wishlistItemAmount > 0 ? (<i class="fa-solid fa-heart text-danger fa-xl"></i>) : (<i class="fa-xl fa-regular fa-heart text-danger"></i>)}
                        </button>
                    </div>

                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"><StarRating rating={rating} /></p>
                    {discountPercentage === 0 ? (
                        <React.Fragment>
                            <p className="card-text" style={{ fontSize: "20px" }}>${formatPrice(price)}</p>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <p className="card-text"><b style={{ fontSize: "20px" }} className='me-2'>${formatPrice(price * (100 - discountPercentage) / 100)}</b><del className='text-muted'>${formatPrice(price)}</del></p>
                        </React.Fragment>
                    )}

                    {/* <p className="card-text">category</p> */}
                    {cartItemAmount > 0 ? (
                        <a className="btn btn-warning btn-sm me-2" onClick={() => props.handleAddToCart(id, stock, title)}>Add To Cart ({cartItemAmount})</a>
                    ) : (
                        <a className="btn btn-warning btn-sm me-2" onClick={() => props.handleAddToCart(id, stock, title)}>Add To Cart</a>
                    )}
                </div>
            </div>
        </div>
    )
};