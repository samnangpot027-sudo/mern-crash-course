import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";

const Home = () => {
  const { fetchProduct, product, deleteProduct, updateProduct } =
    useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const result = await deleteProduct(id);
  };

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = async () => {
    if (!selectedProduct) return;

    const res = await updateProduct(selectedProduct._id, {
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
    });

    closeModal();
  };

  return (
    <div className="flex justify-center">
      <div className="text-white mt-6 w-[55%]">
        <h3 className="font-bold text-2xl text-green-600 flex justify-center items-center">
          Current products
        </h3>
        {/* card */}
        <div>
          <div className="grid grid-flow-row md:grid-cols-3 sm:grid-cols-2 gap-6">
            {product.map((e, index) => (
              <div
                key={index}
                className=" md:w-[250px] sm:w-[200px] w-[250px] m-auto bg-gray-600 mt-10 rounded-2xl overflow-hidden"
              >
                <div>
                  <img
                    src={e.image}
                    alt={e.name}
                    className="w-full  h-[150px]"
                  />
                </div>
                <div className="text-[1.2rem] font-bold pl-3">
                  <h1>{e.name}</h1>
                  <p>{e.price}</p>
                  <div className="flex gap-2 justify-start items-start mt-2 mb-3">
                    <button
                      onClick={() => handleEdit(e)}
                      className="cursor-pointer bg-blue-400 text-[1rem] px-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(e._id)}
                      className="cursor-pointer bg-red-500 text-[1rem] px-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* ✅ Modal */}
          {isModalOpen && selectedProduct && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-0">
              <div className="bg-gray-600 rounded-lg w-[400px] text-white p-6 relative">
                <h2 className="text-xl font-bold mb-4">Edit Product</h2>

                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="border rounded w-full p-2 mb-3"
                />

                <label className="block mb-2">Price:</label>
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                  className="border rounded w-full p-2 mb-3"
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-400 cursor-pointer text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 cursor-pointer text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
