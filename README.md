# Zara Challenge

## Project Overview
This project allows users to browse a list of products (smartphones), view details about each phone, and explore different variations (colors, storage options). Users can also add products to their cart.

## Technologies Used
- **Frameworks:** Next.js 15, TypeScript, CSS Modules
- **Third-party Libraries:** Embla Carousel
- **Additional Tools:** ESLint, Prettier

## Installation
### Prerequisites
- Node.js 18+

### Steps to Install and Run Locally
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd zara-challenge
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create an `.env.local` file and add the following variables:
   ```sh
   API_BASE_URL=<your_api_base_url>
   API_KEY=<your_api_key>
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## API Routes
### `/products`
Returns a list of available products:
```json
{
  "id": "1",
  "brand": "Apple",
  "name": "iPhone 12",
  "basePrice": 909,
  "imageUrl": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg"
}
```

### `/products/{id}`
Returns detailed information about a specific product:
```json
{
  "id": "string",
  "brand": "string",
  "name": "string",
  "description": "string",
  "basePrice": 0,
  "rating": 0,
  "specs": {
    "screen": "string",
    "resolution": "string",
    "processor": "string",
    "mainCamera": "string",
    "selfieCamera": "string",
    "battery": "string",
    "os": "string",
    "screenRefreshRate": "string"
  },
  "colorOptions": [
    {
      "name": "string",
      "hexCode": "string",
      "imageUrl": "string"
    }
  ],
  "storageOptions": [
    {
      "capacity": "string",
      "price": 0
    }
  ],
  "similarProducts": [
    {
      "id": "1",
      "brand": "Apple",
      "name": "iPhone 12",
      "basePrice": 909,
      "imageUrl": "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg"
    }
  ]
}
```

## Features
- **Server-Side Rendering (SSR)** with Next.js 15
- **Filtering Products** by name or brand on the homepage
- **Search Debounce** (300ms, configurable in the `Search` component)
- **Cart Management** using React Context and LocalStorage

## Configuration
### Required Environment Variables
- `.env.local`
- Key configuration files

## Deployment
The project is deployed on **Vercel**: [Live Demo](https://zara-challenge-iota.vercel.app/)

## Testing
- All components are tested using **Jest** and **React Testing Library**.
- Run tests with:
  ```sh
  npm run test
  ```

## Project Structure
```
src/
 ├── api/
 ├── app/
 │   ├── components/
 │   │   ├── layout/
 │   │   ├── sections/
 │   │   ├── ui/
 ├── config/
 ├── context/
 ├── hooks/
 ├── types/
```

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests.

## License
MIT License

