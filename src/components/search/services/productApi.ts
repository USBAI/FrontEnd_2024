import { Product } from '../types';

interface ProductDetails {
  images: string[];
  description: string;
  sizes: string[];
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response;
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const fetchProductImages = async (productUrl: string): Promise<string[]> => {
  try {
    const response = await fetchWithRetry('https://engine-b37ec1b1fb4e.herokuapp.com/vision/inteligentvision/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: productUrl }),
    });

    const data = await response.json();
    
    // Ensure we have valid image URLs
    const validImages = (data.images || []).filter((url: string) => 
      url && url.startsWith('http') && !url.includes('undefined')
    );

    return validImages;
  } catch (error) {
    console.error('Error fetching product images:', error);
    return [];
  }
};

export const fetchProductDescription = async (productUrl: string, productName: string): Promise<string> => {
  try {
    const response = await fetchWithRetry('https://engine-b37ec1b1fb4e.herokuapp.com/nodesconnections/openai_api_nodesconnections/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: productUrl,
        product_name: productName,
      }),
    });

    const data = await response.json();
    return data.description || '';
  } catch (error) {
    console.error('Error fetching product description:', error);
    return '';
  }
};

export const fetchProductSizes = async (productUrl: string): Promise<string[]> => {
  try {
    const response = await fetchWithRetry('https://engine-b37ec1b1fb4e.herokuapp.com/cloud_network/groq_order/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: productUrl }),
    });

    const data = await response.json();
    return data.sizes || [];
  } catch (error) {
    console.error('Error fetching product sizes:', error);
    return [];
  }
};

export const fetchAiResponse = async (prompt: string, productInfo: { name: string; description: string }): Promise<string> => {
  try {
    const response = await fetchWithRetry('https://engine-b37ec1b1fb4e.herokuapp.com/product_suport_google/userinput/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, product_info: productInfo }),
    });

    const data = await response.json();
    return data.response || '';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw new Error('Failed to get AI response');
  }
};

export const fetchAllProductDetails = async (product: Product, updateCallback: (details: Partial<ProductDetails>) => void) => {
  try {
    const defaultImage = product.cover_image && product.cover_image.startsWith('http') 
      ? product.cover_image 
      : 'https://via.placeholder.com/400';

    fetchProductImages(product.product_page).then((images) => {
      const validImages = images.length > 0 ? images : [defaultImage];
      updateCallback({ images: [...new Set(validImages)] });
    });

    fetchProductDescription(product.product_page, product.name).then((description) => {
      updateCallback({ description });
    });

    fetchProductSizes(product.product_page).then((sizes) => {
      updateCallback({ sizes });
    });
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

