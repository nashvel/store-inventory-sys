import React, { useState } from 'react';
import SideMenu from "../../layouts/sidemenu";
import { useNavigate } from 'react-router-dom';

interface ProductData {
  image: File | null;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ProductAdd = () => {
  const [productData, setProductData] = useState<ProductData>({
    image: null,
    name: '',
    price: 0,
    category: '',
    stock: 0,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setProductData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product Data:', productData);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideMenu />
      
      <main className="flex-1 ml-48 p-4 transition-all duration-300">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </button>

        <div className="max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow space-y-4"
          >
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Add New Product</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                  placeholder="e.g. Coca-Cola"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₱)</label>
                <input
                  type="number"
                  value={productData.price}
                  onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-1.5 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                  placeholder="25.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={productData.stock}
                  onChange={(e) => setProductData({ ...productData, stock: parseInt(e.target.value) })}
                  className="w-full px-3 py-1.5 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                  placeholder="100"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={productData.category}
                  onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                  className="w-full px-3 py-1.5 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Toys">Toys</option>
                  <option value="Health & Beauty">Health & Beauty</option>
                  <option value="Furnitures">Furnitures</option>
                  <option value="Clothing">Clothing</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="border border-dashed border-gray-300 rounded-lg p-3 text-center">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center space-y-1"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-xs text-gray-500">Click to upload image</span>
                  </label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 max-w-full h-24 object-contain rounded-lg mx-auto"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProductAdd;
