import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';


export const Cart = ({ products }) => {
  function formatPrice(price) {
    return parseFloat(price).toFixed(Math.min(2, Math.max(0, price % 1 === 0 ? 0 : 2)));
  }

  const today = new Date();
  const fourDaysLater = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000);
  const sixDaysLater = new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatted4Date = fourDaysLater.toLocaleDateString('en-US', options);
  const formatted6Date = sixDaysLater.toLocaleDateString('en-US', options);

  const { cartItems, getCartItemsCount } = useContext(ShopContext);

  let totalAmount = 0;
  for (let i in cartItems) {
    totalAmount += ((products[i - 1].price * (100 - products[i - 1].discountPercentage) / 100) * cartItems[i]);
  }

  return (

    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - {getCartItemsCount()} items</h5>
              </div>
              {totalAmount > 0 ? (<div className="card-body">
                {products.map((product) => {
                  if (product.id in cartItems) {
                    return <CartItem data={product} />
                  }
                })}
              </div>) : (<h3 className='text-center py-5' style={{ height: '281px' }}>Your Cart is Empty</h3>)}

            </div>
            {totalAmount > 0 ? (
              <div className="card mb-4">
                <div className="card-body">
                  <p><strong>Expected shipping delivery</strong></p>
                  <p className="mb-0">{formatted4Date} - {formatted6Date}</p>
                </div>
              </div>
            ) : (
              <span></span>
            )}
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p><strong>We accept</strong></p>
                <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg" alt="Visa" />
                <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg" alt="American Express" />
                <img className="me-2" width="45px" src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg" alt="Mastercard" />              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    SubTotal
                    <span>${formatPrice(totalAmount)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>${totalAmount < 50 && totalAmount > 0 ? 20 : 0}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(Incl. taxes)</p>
                      </strong>
                    </div>
                    <span><strong>${totalAmount < 50 && totalAmount > 0 ? formatPrice(totalAmount + 20) : formatPrice(totalAmount)}</strong></span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-lg btn-block btn-warning"
                  disabled={totalAmount <= 0}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



