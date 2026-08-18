// Database type for TypeScript typings
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          first_name: string | null;
          last_name: string | null;
          email: string | null;
          phone: string;
          role: "user" | "admin";
          is_active: boolean;
          last_login: string | null;
          avatar_url: string | null;
          status: "active" | "pending" | "suspended" | "inactive";
          address: string | null;
          location: string | null;
          state_of_origin: string | null;
          monthly_roi: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone: string;
          role?: "user" | "admin";
          is_active?: boolean;
          last_login?: string;
          avatar_url?: string;
          status?: "active" | "pending" | "suspended" | "inactive";
          address?: string;
          location?: string;
          state_of_origin?: string;
          monthly_roi?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          role?: "user" | "admin";
          is_active?: boolean;
          last_login?: string;
          avatar_url?: string;
          status?: "active" | "pending" | "suspended" | "inactive";
          address?: string;
          location?: string;
          state_of_origin?: string;
          monthly_roi?: number;
          updated_at?: string;
        };
      };
      agreements: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          address: string | null;
          phone: string;
          email: string;
          id_type: "nationalId" | "votersCard" | "internationalPassport" | "driversLicense" | null;
          id_number: string | null;
          investment_amount: number;
          monthly_roi: number;
          start_date: string;
          maturity_date: string | null;
          payment_method: string;
          payment_bank_name: string | null;
          payment_account_name: string | null;
          transaction_reference: string | null;
          returns_bank_name: string | null;
          returns_account_number: string | null;
          returns_account_name: string | null;
          returns_phone_number: string | null;
          signature_url: string | null;
          status: "pending" | "approved" | "rejected";
          signed_at: string | null;
          document_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name: string;
          address?: string;
          phone: string;
          email: string;
          id_type?: "nationalId" | "votersCard" | "internationalPassport" | "driversLicense";
          id_number?: string;
          investment_amount: number;
          monthly_roi?: number;
          start_date: string;
          maturity_date?: string;
          payment_method?: string;
          payment_bank_name?: string;
          payment_account_name?: string;
          transaction_reference?: string;
          returns_bank_name?: string;
          returns_account_number?: string;
          returns_account_name?: string;
          returns_phone_number?: string;
          signature_url?: string;
          status?: "pending" | "approved" | "rejected";
          signed_at?: string;
          document_url?: string;
        };
        Update: {
          full_name?: string;
          address?: string;
          phone?: string;
          email?: string;
          id_type?: "nationalId" | "votersCard" | "internationalPassport" | "driversLicense";
          id_number?: string;
          investment_amount?: number;
          monthly_roi?: number;
          start_date?: string;
          maturity_date?: string;
          payment_method?: string;
          payment_bank_name?: string;
          payment_account_name?: string;
          transaction_reference?: string;
          returns_bank_name?: string;
          returns_account_number?: string;
          returns_account_name?: string;
          returns_phone_number?: string;
          signature_url?: string;
          status?: "pending" | "approved" | "rejected";
          signed_at?: string;
          document_url?: string;
        };
      };
      investments: {
        Row: {
          id: string;
          user_id: string;
          investment_name: string;
          description: string | null;
          amount: number;
          current_value: number;
          profit_loss: number;
          monthly_roi: number;
          status: "active" | "completed" | "pending" | "cancelled";
          start_date: string;
          maturity_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          investment_name: string;
          description?: string;
          amount: number;
          current_value?: number;
          profit_loss?: number;
          monthly_roi?: number;
          status?: "active" | "completed" | "pending" | "cancelled";
          start_date?: string;
          maturity_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          investment_name?: string;
          description?: string;
          amount?: number;
          current_value?: number;
          profit_loss?: number;
          monthly_roi?: number;
          status?: "active" | "completed" | "pending" | "cancelled";
          start_date?: string;
          maturity_date?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: "deposit" | "withdrawal" | "profit" | "referral" | "fee" | "adjustment";
          description: string | null;
          amount: number;
          status: "pending" | "completed" | "failed" | "cancelled";
          reference: string | null;
          metadata: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: "deposit" | "withdrawal" | "profit" | "referral" | "fee" | "adjustment";
          description?: string;
          amount: number;
          status?: "pending" | "completed" | "failed" | "cancelled";
          reference?: string;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          type?: "deposit" | "withdrawal" | "profit" | "referral" | "fee" | "adjustment";
          description?: string;
          amount?: number;
          status?: "pending" | "completed" | "failed" | "cancelled";
          reference?: string;
          metadata?: Record<string, unknown> | null;
          updated_at?: string;
        };
      };
      dashboard_metrics: {
        Row: {
          id: string;
          user_id: string | null;
          performance: string | null;
          balance: string | null;
          open_positions: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          performance?: string;
          balance?: string;
          open_positions?: number;
        };
        Update: {
          performance?: string;
          balance?: string;
          open_positions?: number;
        };
      };
      records: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string | null;
          type: string | null;
          amount: number | null;
          date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content?: string;
          type?: string;
          amount?: number;
          date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          content?: string;
          type?: string;
          amount?: number;
          date?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: string | null;
          price: number | null;
          image: string | null;
          roi: string | null;
          min_investment: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          category?: string;
          price?: number;
          image?: string;
          roi?: string;
          min_investment?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string;
          category?: string;
          price?: number;
          image?: string;
          roi?: string;
          min_investment?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      investor_accounts: {
        Row: {
          id: string;
          user_id: string;
          account_number: string;
          status: "active" | "pending" | "suspended" | "inactive";
          available_balance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          account_number: string;
          status?: "active" | "pending" | "suspended" | "inactive";
          available_balance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          account_number?: string;
          status?: "active" | "pending" | "suspended" | "inactive";
          available_balance?: number;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string | null;
          type: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message?: string;
          type?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          title?: string;
          message?: string;
          type?: string;
          is_read?: boolean;
        };
      };
    };
    Views: {};
    Functions: {
      has_role: {
        Args: {
          role_name: string;
        };
        Returns: boolean;
      };
    };
    Storage: {
      Buckets: {
        agreements: {
          id: string;
          name: string;
          owner: string;
          public: boolean;
          file_size_limit: number;
          allowed_mime_types: string[];
        };
      };
    };
  };
};

// ===== Domain Types =====

export type Profile = {
  id: string;
  full_name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string;
  role: "user" | "admin";
  is_active: boolean;
  last_login: string | null;
  avatar_url: string | null;
  status: "active" | "pending" | "suspended" | "inactive";
  address: string | null;
  location: string | null;
  state_of_origin: string | null;
  monthly_roi: number;
  created_at: string;
  updated_at: string;
};

export type Investment = {
  id: string;
  user_id: string;
  investment_name: string;
  description: string | null;
  amount: number;
  current_value: number;
  profit_loss: number;
  monthly_roi: number;
  status: "active" | "completed" | "pending" | "cancelled";
  start_date: string;
  maturity_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  type: "deposit" | "withdrawal" | "profit" | "referral" | "fee" | "adjustment";
  description: string | null;
  amount: number;
  status: "pending" | "completed" | "failed" | "cancelled";
  reference: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export type Agreement = {
  id: string;
  user_id: string;
  full_name: string;
  address: string | null;
  phone: string;
  email: string;
  id_type: "nationalId" | "votersCard" | "internationalPassport" | "driversLicense" | null;
  id_number: string | null;
  investment_amount: number;
  monthly_roi: number;
  start_date: string;
  maturity_date: string | null;
  payment_method: string;
  payment_bank_name: string | null;
  payment_account_name: string | null;
  transaction_reference: string | null;
  returns_bank_name: string | null;
  returns_account_number: string | null;
  returns_account_name: string | null;
  returns_phone_number: string | null;
  signature_url: string | null;
  status: "pending" | "approved" | "rejected";
  signed_at: string | null;
  document_url: string | null;
  created_at: string;
  updated_at: string;
};

export type DashboardSummary = {
  totalInvested: number;
  currentValue: number;
  profitLoss: number;
  performance: number;
  openInvestments: number;
};

export type AuthUser = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  stateOfOrigin: string;
  monthlyRoi: number;
  avatar_url: string | null;
};

export type AuthState = {
  token: string;
  user: AuthUser;
} | null;

export type InvestorAccount = {
  id: string;
  user_id: string;
  account_number: string;
  status: "active" | "pending" | "suspended" | "inactive";
  available_balance: number;
  created_at: string;
  updated_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
};
