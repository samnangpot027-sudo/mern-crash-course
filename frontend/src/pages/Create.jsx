import { useState } from "react";
import { useProductStore } from "../store/product";

const Create = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    console.log("success:", success);
    console.log("message:", message);
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="md:w-[40%] w-[35%] m-auto bg-gray-600 py-8 px-4 rounded-2xl mt-10">
      <div className="flex justify-center text-center font-bold text-3xl text-gray-300">
        Create New Product
      </div>
      <div className="flex flex-col gap-4 my-6">
        <input
          className="w-full p-1.5 border-2 text-gray-400 border-gray-400 outline-none rounded"
          type="text"
          name="name"
          placeholder="Product name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          className="w-full p-1.5 border-2 text-gray-400 border-gray-400 outline-none rounded"
          type="number"
          name="price"
          placeholder="Product price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          className="w-full p-1.5 border-2 text-gray-400 border-gray-400 outline-none rounded"
          placeholder="Product image URL"
          name="image"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <button
          onClick={handleAddProduct}
          className="block border text-gray-700 cursor-pointer bg-blue-300 rounded border-white py-1 hover:bg-blue-400 transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default Create;
