import { supabase } from "../lib/supabase";
import type { Database } from "../types";

type Product = Database["public"]["Tables"]["products"]["Row"];

export interface ProductsService {
  getAll: () => Promise<Product[]>;
  getById: (id: string) => Promise<Product | null>;
  create: (data: Partial<Product>) => Promise<Product>;
  update: (id: string, data: Partial<Product>) => Promise<Product>;
  delete: (id: string) => Promise<void>;
}

export const productsService: ProductsService = {
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
    return (data as Product[]) || [];
  },

  getById: async (id: string): Promise<Product | null> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
    return (data as Product) || null;
  },

  create: async (data: Partial<Product>): Promise<Product> => {
    const { data: newProduct, error } = await supabase
      .from("products")
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      throw error;
    }
    return newProduct as Product;
  },

  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const { data: updatedProduct, error } = await supabase
      .from("products")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }
    return updatedProduct as Product;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};

export default productsService;