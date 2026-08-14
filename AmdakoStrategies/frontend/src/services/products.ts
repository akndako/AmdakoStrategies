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

// Mock products data for development until Supabase is set up
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Web3 Index Fund",
    description: "Diversified exposure to top Web3 protocols",
    category: "fund",
    price: 1000,
    image: "/assets/btc.png",
    roi: "8-12% annually",
    min_investment: 100,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "DeFi Yield Strategy",
    description: "Automated yield farming across multiple protocols",
    category: "strategy",
    price: 500,
    image: "/assets/eth.png",
    roi: "6-10% annually",
    min_investment: 50,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const productsService: ProductsService = {
  getAll: async (): Promise<Product[]> => {
    // Try Supabase first, fall back to mock data
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn("Supabase products unavailable, using mock data:", error);
      return mockProducts;
    }
  },

  getById: async (id: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data || null;
    } catch (error) {
      console.warn("Supabase product lookup unavailable, using mock data:", error);
      return mockProducts.find((p) => p.id === id) || null;
    }
  },

  create: async (data: Partial<Product>): Promise<Product> => {
    try {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return newProduct;
    } catch (error) {
      console.warn("Supabase product creation unavailable, using mock data:", error);
      const mockProduct: Product = {
        id: String(mockProducts.length + 1),
        name: data.name || "",
        description: data.description || null,
        category: data.category || null,
        price: data.price || null,
        image: data.image || null,
        roi: data.roi || null,
        min_investment: data.min_investment || null,
        is_active: data.is_active ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockProducts.push(mockProduct);
      return mockProduct;
    }
  },

  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    try {
      const { data: updatedProduct, error } = await supabase
        .from("products")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return updatedProduct;
    } catch (error) {
      console.warn("Supabase product update unavailable, using mock data:", error);
      const index = mockProducts.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...data };
      }
      return mockProducts[index] || { id, ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Product;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.warn("Supabase product deletion unavailable, using mock data:", error);
      const index = mockProducts.findIndex((p) => p.id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
      }
    }
  },
};

export default productsService;
