import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Shop } from './pages/shop/Shop';
import { Cart } from './pages/cart/Cart';
import { Wishlist } from './pages/wishlist/Wishlist';
import { ShopContextProvider } from './context/shop-context';
import fetchProducts from './products';
import fetchCategories from './categories';
import React, { useState, useEffect } from 'react';


function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    fetchData();
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(['All', ...categoriesData]);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ShopContextProvider>
        <Router>
          <div className='conDiv'>
            <Navbar />
            <div className='home'>
              <Routes>
                <Route path='/' element={<Shop products={products} categories={categories} />} />
                <Route path='/cart' element={<Cart products={products} />} />
                <Route path='/wishlist' element={<Wishlist products={products} />} />
              </Routes>
            </div>
            <Footer className='foot' />
          </div>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
