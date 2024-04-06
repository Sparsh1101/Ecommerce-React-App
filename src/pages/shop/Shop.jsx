import React, { useState, useEffect, useContext } from 'react';
import { Product } from './Product';
import { ShopContext } from '../../context/shop-context';


export const Shop = ({ products, categories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [message, setMessage] = useState("");
  const { addToCart, addToWishlist, removeFromWishlist } = useContext(ShopContext);

  function capitalizeHyphenatedWords(str) {
    return str.replace(/(^|-)([a-z])/g, function (match, p1, p2) {
      return p1 + p2.toUpperCase();
    });
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


  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const search = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=0`);
        const data = await response.json();
        setCurrentPage(1);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setCurrentPage(1);
        setFilteredProducts(products);
      }
    };

    search();
  }, [searchTerm, products]);

  useEffect(() => {
    const startIndex = (currentCategoryPage - 1) * 3;
    const remainingCategories = categories.length - startIndex;
    const endIndex = Math.min(startIndex + 3, categories.length);
    setVisibleCategories(categories.slice(startIndex, endIndex));

    if (currentCategoryPage < 1) {
      setCurrentCategoryPage(1);
    }

    if (remainingCategories < 3 && currentCategoryPage > 1) {
      setCurrentCategoryPage(Math.ceil(categories.length / 3));
    }
  }, [currentCategoryPage, categories]);



  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginateProducts = (pageNumber) => setCurrentPage(pageNumber);

  const paginateCategories = (pageNumber) => setCurrentCategoryPage(pageNumber);

  const filterProducts = async (category) => {
    setSearchTerm('');
    if (category === 'All') {
      setCurrentPage(1);
      setFilteredProducts(products);
    } else {
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=0`);
        const data = await response.json();
        setCurrentPage(1);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setCurrentPage(1);
        setFilteredProducts(products);
      }
    }
  };

  return (
    <div className='shop'>
      <div className='container'>
        <h1 className='text-center mt-3'>Products List</h1>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-10">
              <div className="input-group my-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search your favorite product!"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: '1px solid black' }}
                />
                <button className="btn btn-outline-dark" onClick={() => filterProducts('All')}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {showAlert && (
          <div className="d-flex justify-content-center">
            <div className={`alert ${alertType === 'a' ? 'alert-success' : 'alert-danger'} col-10 col-md-6 text-center alert-dismissible fade show`} role="alert">
              {message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>
        )}

        <div className="carousel-container d-flex justify-content-center align-items-center mb-3">
          <i class="fa-solid fa-angle-left me-2" role="button" onClick={() => paginateCategories(currentCategoryPage - 1)} disabled={currentCategoryPage === 1}></i>
          {visibleCategories.map(category => (
            <button className='btn m-1' style={{ backgroundColor: "rgb(250, 235, 212)", color: 'black', fontWeight: '500' }} onClick={() => filterProducts(category)} key={category}>
              {capitalizeHyphenatedWords(category)}
            </button>
          ))}
          <i class="ms-2 fa-solid fa-angle-right" role="button" onClick={() => paginateCategories(currentCategoryPage + 1)} disabled={currentCategoryPage * 3 >= categories.length}></i>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {currentProducts.map(product =>
            product.stock > 0 ? <Product data={product} key={product.id} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist} handleRemoveFromWishlist={handleRemoveFromWishlist} /> : null
          )}
        </div>
        <div className="pagination d-flex justify-content-center my-5" style={{ width: "100%" }}>
          <button className="btn btn-dark mx-4" onClick={() => paginateProducts(currentPage - 1)} disabled={currentPage === 1}><i class="fa-solid fa-angle-left"></i></button>
          <button className="btn btn-dark mx-4" onClick={() => paginateProducts(currentPage + 1)} disabled={indexOfLastProduct >= filteredProducts.length}><i class="fa-solid fa-angle-right"></i></button>
        </div>

      </div>
    </div>
  )
}
