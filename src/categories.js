const fetchCategories = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export default fetchCategories;