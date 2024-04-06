import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context';

export const CartItem = (props) => {
    function formatPrice(price) {
        return parseFloat(price).toFixed(Math.min(2, Math.max(0, price % 1 === 0 ? 0 : 2)));
    }

    const { id, title, price, discountPercentage, brand, thumbnail, stock } = props.data;
    const { cartItems, addToCart, removeFromCart, deleteFromCart, updateCount } = useContext(ShopContext);

    return (

        <div className="row my-4">
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                    <img src={thumbnail} className="img-fluid rounded-3" alt="..." style={{ height: '110px', width: '160px' }} />
                    <a href="#!">
                        <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                    </a>
                </div>
            </div>

            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                <h5><strong>{title}</strong></h5>
                <h6>{brand}</h6>
                <div className='mb-2'><strong>Price: ${formatPrice(price * (100 - discountPercentage) / 100)}</strong></div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                <div className="d-flex align-items-start justify-content-start">
                    <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                        <button className="btn px-3 me-2" style={{ backgroundColor: 'rgb(250, 235, 212)' }} onClick={() => removeFromCart(id)}>
                            <i className="fas fa-minus"></i>
                        </button>
                        <div className="form-outline col-3" style={{ minWidth: '70px' }}>
                            <input id="form1" min="1" name="quantity" value={cartItems[id]} type="number" className="form-control" onChange={(e) => updateCount(Number(e.target.value), id, stock)} />
                        </div>
                        <button className="btn px-3 ms-2" style={{ backgroundColor: 'rgb(250, 235, 212)' }} onClick={() => addToCart(id, stock)}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <button type="button" className="btn btn-danger btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item" onClick={() => deleteFromCart(id)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>

                <div className="d-flex flex-column">
                    <strong>SubTotal: ${formatPrice(price * ((100 - discountPercentage) / 100) * cartItems[id])}</strong>
                </div>

            </div>
        </div>
    )
}