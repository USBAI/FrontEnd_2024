import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  price: string;
  sizes: string[];
  discount?: string;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  onAddToCart: () => void;
  isAddingToCart: boolean;
  isLoading: { sizes?: boolean };
}

const ProductInfo = ({
  name,
  price,
  sizes,
  discount,
  selectedSize,
  onSizeSelect,
  onAddToCart,
  isAddingToCart,
  isLoading,
}: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 
          className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer"
          onClick={(e) => {
            const target = e.currentTarget;
            if (target.textContent === name) {
              target.textContent = name.slice(0, 70) + "...";
            } else {
              target.textContent = "";
              let i = 0;
              const interval = setInterval(() => {
                if (i < name.length) {
                  target.textContent += name[i];
                  i++;
                } else {
                  clearInterval(interval);
                }
              }, 5);
            }
          }}
        >
          {name.length > 20 ? name.slice(0, 70) + "..." : name}
        </h1>
        <div>
        <br /><br />
        </div>     
        <div className='flex items-center justify-between gap-2'>
        <div className="text-3xl font-bold text-gray-900">
          {price.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          {discount && (
            <span className="text-lg text-red-500 ml-2">(-{discount}%)</span>
          )}
        </div>

          <div className="flex items-center gap-4 text-gray-900">
            <span className="flex-shrink-0">
              <img
                src="https://www.svgrepo.com/show/508697/klarna.svg"
                width="40px"
                alt="Klarna Logo"
              />
            </span>
            <div>
              <span className="text-[16px]">SEK {(parseFloat(price.replace(/[^0-9.-]+/g, '')) / 26).toFixed(2)} /m</span>
            </div>
          </div>
        </div>
        
      </div>

      {isLoading.sizes ? (
        <div
          className="animate-pulse"
          onAnimationEnd={(e) => {
            setTimeout(() => {
              document.getElementById('loading-div')?.remove();
            }, 5000); // Remove after 5 seconds
          }}
          id="loading-div"
        >
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : sizes.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-3">Select Size</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onSizeSelect(size)}
                className={`py-3 rounded-lg border transition-all ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-black text-gray-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="animate-pulse"
          id="loading-div"
        >
          <div className="h-0 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {[...Array(0)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-pink-600 rounded"
              ></div>
            ))}
          </div>
        </div>
      )}


      <div>
        
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddToCart}
        className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2"
      >
        {isAddingToCart ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </>
        )}
      </motion.button>

      
      <div className="flex items-center aline-center justify-center gap-4 text-gray-900">
          <span className="flex-shrink-0">
            <img
              src="https://sportamore.com/cdn/shop/files/amex.svg?v=1681309504&width=40"
              width="40px"
              alt="Amex Logo"
              style={{ 
                border: 'solid 1px #000'
              }}
            />
          </span>
          <span className="flex-shrink-0">
            <img
              src="https://sportamore.com/cdn/shop/files/apple-pay.svg?v=1681309502&width=40"
              width="40px"
              alt="ApplePay Logo"
              style={{ 
                border: 'solid 1px #000'
              }}
            />
          </span>
          <span className="flex-shrink-0">
            <img
              src="https://sportamore.com/cdn/shop/files/klarna.svg?v=1681309511&width=40"
              width="40px"
              alt="Klarna Logo"
              style={{ 
                border: 'solid 1px #000'
              }}
            />
          </span>
          <span className="flex-shrink-0">
            <img
              src="https://sportamore.com/cdn/shop/files/swish.svg?v=1681309505&width=40"
              width="40px"
              alt="Swish Logo"
              style={{ 
                border: 'solid 1px #000'
              }}
            />
          </span>
          <span className="flex-shrink-0">
            <img
              src="https://sportamore.com/cdn/shop/files/google-pay.svg?v=1681309501&width=40"
              width="40px"
              alt="GooglePay Logo"
              style={{ 
                border: 'solid 1px #000'
              }}
            />
          </span>
          
        </div>
        <div>
          <div>
            <span className="">
              <div className='flex items-center gap-4 pb-2'>
                <svg fill="#000000" width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>store</title> <path d="M16 5l-12 12v11h24v-11l-12-12zM24 24h-16v-4h16v4z"></path> </g></svg>
                <span>In stock / Ships within 4 hours</span>
              </div>
              <div className='flex items-center gap-4 pb-2'>
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 6H3V17.25H3.375H4.5H4.52658C4.70854 18.5221 5.80257 19.5 7.125 19.5C8.44743 19.5 9.54146 18.5221 9.72342 17.25H15.0266C15.2085 18.5221 16.3026 19.5 17.625 19.5C18.9474 19.5 20.0415 18.5221 20.2234 17.25H21.75V12.4393L18.3107 9H16.5V6ZM16.5 10.5V14.5026C16.841 14.3406 17.2224 14.25 17.625 14.25C18.6721 14.25 19.5761 14.8631 19.9974 15.75H20.25V13.0607L17.6893 10.5H16.5ZM15 15.75V9V7.5H4.5V15.75H4.75261C5.17391 14.8631 6.07785 14.25 7.125 14.25C8.17215 14.25 9.07609 14.8631 9.49739 15.75H15ZM17.625 18C17.0037 18 16.5 17.4963 16.5 16.875C16.5 16.2537 17.0037 15.75 17.625 15.75C18.2463 15.75 18.75 16.2537 18.75 16.875C18.75 17.4963 18.2463 18 17.625 18ZM8.25 16.875C8.25 17.4963 7.74632 18 7.125 18C6.50368 18 6 17.4963 6 16.875C6 16.2537 6.50368 15.75 7.125 15.75C7.74632 15.75 8.25 16.2537 8.25 16.875Z" fill="#000000"></path> </g></svg>               
                <span>3-4 Days</span>
              </div>
            </span>
            <span className="">
              <span className='flex iterms-center gap-4 pb-2'> 
                <svg width="25px" height="25px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z" stroke="#000000" stroke-width="1.344" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <span><span className='text-pink-600'>Free</span> Shipping</span>
              </span>
              <span className='flex iterms-center gap-4 pb-2'> 
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10L20.7071 10.7071L21.4142 10L20.7071 9.29289L20 10ZM3 18C3 18.5523 3.44772 19 4 19C4.55229 19 5 18.5523 5 18L3 18ZM15.7071 15.7071L20.7071 10.7071L19.2929 9.29289L14.2929 14.2929L15.7071 15.7071ZM20.7071 9.29289L15.7071 4.29289L14.2929 5.70711L19.2929 10.7071L20.7071 9.29289ZM20 9L10 9L10 11L20 11L20 9ZM3 16L3 18L5 18L5 16L3 16ZM10 9C6.13401 9 3 12.134 3 16L5 16C5 13.2386 7.23858 11 10 11L10 9Z" fill="#33363F"></path> </g></svg>
                <span><span className='text-pink-600'>Free</span> Return 30 Days</span>
              </span>
            </span>
            <span className='flex iterms-center gap-4 pb-2'>
              <svg width="25px" height="25px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>service_line</title> <g id="页面-1" stroke-width="0.00024000000000000003" fill="none" fill-rule="evenodd"> <g id="Media" transform="translate(-1536.000000, 0.000000)"> <g id="service_line" transform="translate(1536.000000, 0.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero"> </path> <path d="M5,9 C5,5.13401 8.13401,2 12,2 C15.866,2 19,5.13401 19,9 L19,10.0354 C20.6961,10.2781 22,11.7368 22,13.5 L22,13.75 C22,15.5449 20.5449,17 18.75,17 C18.7224,17 18.695,16.9994 18.6678,16.9981 C17.9274,19.118 16.0464,20.5467 14.0149,20.9093 C13.5456,21.0808 12.9889,21 12.5,21 C11.6716,21 11,20.3284 11,19.5 C11,18.6716 11.6716,18 12.5,18 L13.5,18 C13.9946,18 14.4333,18.2394 14.7065,18.6086 C16.0035,17.9919 17,16.6885 17,15 L17,9 C17,6.23858 14.7614,4 12,4 C9.23858,4 7,6.23858 7,9 L7,15.25 C7,16.2165 6.2165,17 5.25,17 C3.45507,17 2,15.5449 2,13.75 L2,13.5 C2,11.7368 3.30385,10.2781 5,10.0354 L5,9 Z M5,12.0854 C4.4174,12.2913 4,12.8469 4,13.5 L4,13.75 C4,14.3547 4.42944,14.8592 5,14.975 L5,12.0854 Z M19,12.0854 L19,14.975 C19.5706,14.8592 20,14.3547 20,13.75 L20,13.5 C20,12.8469 19.5826,12.2913 19,12.0854 Z" id="形状" fill="#000000"> </path> </g> </g> </g> </g></svg>
              <span>Support Available 24/7</span>
            </span>
          </div>
        </div>
    </div>
  );
};

export default ProductInfo;
