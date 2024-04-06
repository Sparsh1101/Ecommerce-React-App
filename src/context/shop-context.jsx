import React, { createContext, useState } from 'react';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState({});

    // Using Cart Id 1 and User id 1 for dummy API
    const userId = 1;
    const cartId = 1;

    const addToCart = async (itemId, stock) => {
        try {
            let success = false;
            if (Object.keys(cartItems).length === 0) {
                const response = await fetch('https://dummyjson.com/carts/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: userId,
                        products: [{ id: itemId, quantity: 1 }]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("New Cart Created (Add Response)", data);
                    success = true;
                } else {
                    console.error('Error creating new cart:', response.status);
                }

            } else {
                let x = { ...cartItems };
                if (itemId in x) {
                    if (!(x[itemId] + 1 > stock)) {
                        x = { ...x, [itemId]: x[itemId] + 1 };
                    }
                } else {
                    x = { ...x, [itemId]: 1 };
                }

                const response = await fetch('https://dummyjson.com/carts/' + cartId, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        products: Object.entries(x).map(([userId, quantity]) => ({
                            userId,
                            quantity
                        }))
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Added to Cart (Update Response)", data);
                    success = true;
                } else {
                    console.error('Error adding to cart:', response.status);
                }
            }
            if (success) {
                setCartItems(prev => {
                    if (itemId in prev) {
                        if (prev[itemId] + 1 > stock) {
                            return prev;
                        } else {
                            return { ...prev, [itemId]: prev[itemId] + 1 };
                        }
                    } else {
                        return { ...prev, [itemId]: 1 };
                    }
                });
            }

        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };


    const removeFromCart = async (itemId) => {
        try {
            let success = false;
            let x = { ...cartItems };
            if (x[itemId] - 1 <= 0) {
                delete x[itemId];
            } else {
                x = { ...x, [itemId]: x[itemId] - 1 };
            }

            const response = await fetch('https://dummyjson.com/carts/' + cartId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    products: Object.entries(x).map(([userId, quantity]) => ({
                        userId,
                        quantity
                    }))
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Removed from Cart (update response)", data);
                success = true;
            } else {
                console.error('Error removing from cart:', response.status);
            }

            if (success) {
                setCartItems((prev) => {
                    let c = { ...prev }
                    if (prev[itemId] - 1 <= 0) {
                        delete c[itemId];
                        return c;
                    } else {
                        return { ...prev, [itemId]: prev[itemId] - 1 };
                    }
                });
            }

        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    }

    const deleteFromCart = async (itemId) => {
        try {
            let success = false;
            let x = { ...cartItems };
            delete x[itemId];

            const response = await fetch('https://dummyjson.com/carts/' + cartId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    products: Object.entries(x).map(([userId, quantity]) => ({
                        userId,
                        quantity
                    }))
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Deleted from Cart (update response)", data);
                success = true;
            } else {
                console.error('Error deleting from cart:', response.status);
            }

            if (success) {
                setCartItems((prev) => {
                    let c = { ...prev }
                    delete c[itemId];
                    return c;
                });
            }

        } catch (error) {
            console.error('Error deleting from cart:', error);
        }
    }

    const updateCount = async (newCount, itemId, stock) => {
        try {
            let success = false;
            let x = { ...cartItems };

            if (newCount <= 0) {
                x = { ...x, [itemId]: 1 };
            } else if (newCount > stock) {
                x = { ...x, [itemId]: stock };
            } else {
                x = { ...x, [itemId]: newCount };
            }

            const response = await fetch('https://dummyjson.com/carts/' + cartId, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    products: Object.entries(x).map(([userId, quantity]) => ({
                        userId,
                        quantity
                    }))
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Updated count of item in cart (update response)", data);
                success = true;
            } else {
                console.error('Error updating count of item in cart:', response.status);
            }

            if (success) {
                setCartItems((prev) => {
                    if (newCount <= 0) {
                        return { ...prev, [itemId]: 1 };
                    } else if (newCount > stock) {
                        return { ...prev, [itemId]: stock };
                    } else {
                        return { ...prev, [itemId]: newCount };
                    }

                });
            }

        } catch (error) {
            console.error('Error deleting from cart:', error);
        }
    }

    const addToWishlist = (itemId) => {
        setWishlistItems((prev) => {
            return { ...prev, [itemId]: 1 };
        });
    };

    const removeFromWishlist = (itemId) => {
        setWishlistItems((prev) => {
            let w = { ...prev }
            delete w[itemId];
            return w;
        });
    };

    const getCartItemsCount = () => {

        let cartAmount = 0;
        for (let id in cartItems) {
            cartAmount += cartItems[id];
        }
        return cartAmount;
    };


    const contextValue = { cartItems, addToCart, removeFromCart, deleteFromCart, updateCount, getCartItemsCount, wishlistItems, addToWishlist, removeFromWishlist };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
