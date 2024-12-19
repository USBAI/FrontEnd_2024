/// <reference types="vite/client" />

interface Window {
  Klarna?: {
    Payments: {
      init: (options: { client_token: string }) => void;
      load: (options: { container: HTMLElement; payment_method_category: string }) => void;
      authorize: (options: { payment_method_category: string }) => Promise<{
        approved: boolean;
        error?: string;
      }>;
    };
  };
}