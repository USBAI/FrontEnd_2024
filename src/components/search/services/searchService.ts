import { Product } from '../types';

interface SearchResponse {
  products: Product[];
  error?: string;
}

const getCSRFToken = () => {
  // Get CSRF token from cookie if needed
  return '';
};

export const searchProducts = async (
  productName: string,
  pageIndex: string = '1',
  priceRange: { min: number; max: number }
): Promise<SearchResponse> => {
  try {
    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('page_index', pageIndex);
    formData.append('min_price', priceRange.min.toString());
    formData.append('max_price', priceRange.max.toString());

    const response = await fetch('https://engine1-f36f7fb18f56.herokuapp.com/openai_google_computing/jdb/', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': getCSRFToken(),
      },
    });

    if (!response.ok) {
      throw new Error(`Search failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform and validate the API response
    const transformedProducts: Product[] = data
      .filter((product: any) => 
        product.name && 
        product.price && 
        product.cover_image_url &&
        product.product_page_url
      )
      .map((product: any) => ({
        id: product.product_id || Math.random().toString(36).substr(2, 9),
        name: product.name,
        price: product.price,
        product_page: product.product_page_url,
        cover_image: product.cover_image_url,
        discount: product.discount_percentage || null, // Include discount if available
      }));

    return { products: transformedProducts };
  } catch (error) {
    console.error('Search error:', error);
    return {
      products: [],
      error: 'Failed to fetch search results. Please try again.'
    };
  }
};