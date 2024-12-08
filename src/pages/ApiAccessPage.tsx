import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Shield, ArrowRight, Terminal, Database, Cloud, CheckCircle2, X } from 'lucide-react';
import Globe3D from '../components/animations/Globe3D';

const ApiAccessPage = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '250',
      description: 'Perfect for accessing a single product category',
      features: [
        'Access to 1 product category',
        '100,000 API calls per month',
        'Real-time product updates',
        'Basic support',
        'API documentation access'
      ]
    },
    {
      name: 'Professional',
      price: '600',
      description: 'Full access to all product categories',
      features: [
        'Access to all product categories',
        '500,000 API calls per month',
        'Real-time product updates',
        'Priority support',
        'Advanced analytics',
        'Custom integration support'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solution for large businesses',
      features: [
        'Custom category selection',
        'Unlimited API calls',
        'Dedicated support team',
        'Custom features development',
        'Service Level Agreement (SLA)',
        'On-premise deployment option'
      ]
    }
  ];

  const codeExamples = [
    {
      language: 'JavaScript',
      icon: Terminal,
      code: `const response = await fetch('https://api.kluret.com/v1/products/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'Nike shoes',
    filters: {
      price_range: { min: 500, max: 2000 },
      categories: ['footwear', 'sports']
    }
  })
});

const results = await response.json();`
    },
    {
      language: 'Python',
      icon: Terminal,
      code: `import requests

response = requests.post(
    'https://api.kluret.com/v1/products/search',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'query': 'Nike shoes',
        'filters': {
            'price_range': {'min': 500, 'max': 2000},
            'categories': ['footwear', 'sports']
        }
    }
)

results = response.json()`
    },
    {
      language: 'PHP',
      icon: Terminal,
      code: `$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.kluret.com/v1/products/search",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer YOUR_API_KEY",
        "Content-Type: application/json"
    ],
    CURLOPT_POSTFIELDS => json_encode([
        "query" => "Nike shoes",
        "filters" => [
            "price_range" => ["min" => 500, "max" => 2000],
            "categories" => ["footwear", "sports"]
        ]
    ])
]);

$response = curl_exec($curl);
$results = json_decode($response, true);`
    },
    {
      language: 'Ruby',
      icon: Terminal,
      code: `require 'net/http'
require 'json'

uri = URI('https://api.kluret.com/v1/products/search')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri)
request['Authorization'] = 'Bearer YOUR_API_KEY'
request['Content-Type'] = 'application/json'
request.body = {
  query: 'Nike shoes',
  filters: {
    price_range: { min: 500, max: 2000 },
    categories: ['footwear', 'sports']
  }
}.to_json

response = http.request(request)
results = JSON.parse(response.body)`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.history.back()}
        className="fixed top-8 right-8 z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="h-6 w-6 text-white/70 hover:text-white" />
      </motion.button>

      {/* Hero Section with Globe */}
      <div className="pt-32 pb-20 relative overflow-hidden">
        <Globe3D />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm mb-8"
              >
                <Code className="h-8 w-8 text-blue-400" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Access{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  Kluret's B2B API
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-12"
              >
                Integrate our powerful product search capabilities into your systems with flexible pricing plans
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium flex items-center gap-2 mx-auto hover:from-blue-600 hover:to-purple-600 transition-all group"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Flexible Pricing Plans</h2>
            <p className="text-xl text-gray-400">Choose the plan that best fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    {plan.price !== 'Custom' && <span className="text-sm">kr</span>}
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
                  </div>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Easy Integration</h2>
            <p className="text-xl text-gray-400">Simple API calls in your favorite programming language</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {codeExamples.map((example, index) => (
              <motion.div
                key={example.language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <example.icon className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">{example.language}</span>
                    </div>
                    <button className="text-sm text-blue-400 hover:text-blue-300">Copy</button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the growing number of businesses using Kluret's API to power their product search
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium flex items-center gap-2 mx-auto hover:from-blue-600 hover:to-purple-600 transition-all group"
          >
            Start Building
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ApiAccessPage;