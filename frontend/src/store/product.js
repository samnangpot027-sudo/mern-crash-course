import { create } from "zustand";

export const useProductStore = create((set) => ({
  product: [],
  setProduct: (product) => set({ product }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }
    const res = await fetch("/api/product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ product: [...state.product, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProduct: async () => {
    const res = await fetch("/api/product");
    const data = await res.json();
    set({ product: data.data });
  },
  deleteProduct: async (id) => {
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update state: remove the deleted product
      set((state) => ({
        product: state.product.filter((item) => item._id !== id),
      }));

      console.log("Deleted product with ID:", id);
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Something went wrong while deleting" };
    }
  },
  updateProduct: async (id, updatedData) => {
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      // ✅ Update the product inside the Zustand store
      set((state) => ({
        product: state.product.map((item) =>
          item._id === id ? { ...item, ...updatedData } : item
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Something went wrong while updating" };
    }
  },
}));
