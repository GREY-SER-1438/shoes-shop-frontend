import heroSneaker from "@/assets/sneakerImage.png";

export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  brand: string;
  colors: string[];
  rating: number;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 12990,
    oldPrice: 14990,
    image:
      "https://i.pinimg.com/736x/a2/0a/9d/a20a9d7202898eef8b362148e3e5e78d.jpg",
    brand: "Nike",
    colors: ["#000000", "#FF3366", "#FFFFFF"],
    rating: 4.8,
    isNew: true,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    price: 15990,
    image:
      "https://i.pinimg.com/736x/70/e2/f4/70e2f4b7307a9306729257e91b1e0336.jpg",
    brand: "Adidas",
    colors: ["#000000", "#0C4A8A"],
    rating: 4.9,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Reebok Classic Leather",
    price: 8990,
    image:
      "https://i.pinimg.com/736x/51/94/99/51949996a7415c002eac40a13b500c95.jpg",
    brand: "Reebok",
    colors: ["#FFFFFF", "#E41E26"],
    rating: 4.5,
  },
  {
    id: 4,
    name: "Converse Chuck Taylor",
    price: 5990,
    oldPrice: 7990,
    image:
      "https://i.pinimg.com/736x/6b/2e/97/6b2e9708d4d5cb9c188d28b97c20df7a.jpg",
    brand: "Converse",
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    rating: 4.7,
  },
  {
    id: 5,
    name: "Puma RS-X3",
    price: 9990,
    image:
      "https://i.pinimg.com/736x/0a/2d/ae/0a2dae5a0b23e985c241bbc8ae2d2b82.jpg",
    brand: "Puma",
    colors: ["#333333", "#FF9900"],
    rating: 4.3,
  },
  {
    id: 6,
    name: "New Balance 997H",
    price: 10990,
    image:
      "https://i.pinimg.com/736x/8b/1b/6f/8b1b6fd84a0f3f067689a6333e98ca21.jpg",
    brand: "New Balance",
    colors: ["#888", "#004080"],
    rating: 4.6,
    isBestSeller: true,
  },
  {
    id: 7,
    name: "Nike Blazer Mid",
    price: 8490,
    oldPrice: 9490,
    image:
      "https://i.pinimg.com/736x/72/ad/87/72ad87d04cc61040619b5a8410227422.jpg",
    brand: "Nike",
    colors: ["#FFFFFF", "#FF5733"],
    rating: 4.4,
  },
  {
    id: 8,
    name: "Adidas Yeezy Boost 350",
    price: 22990,
    image:
      "https://i.pinimg.com/736x/0e/3b/4f/0e3b4fdc6ec706d2943928e3dc8481b2.jpg",
    brand: "Adidas",
    colors: ["#E0E0E0", "#333333"],
    rating: 4.9,
  },
  {
    id: 9,
    name: "Nike Air Force 1",
    price: 9990,
    image:
      "https://i.pinimg.com/736x/32/ad/d0/32add06d05698c44a19f416ff3e1f116.jpg",
    brand: "Nike",
    colors: ["#FFFFFF"],
    rating: 4.7,
  },
  {
    id: 10,
    name: "Vans Old Skool",
    price: 7490,
    image:
      "https://i.pinimg.com/736x/8a/69/6d/8a696dac71dedde0a64b2b77938f0723.jpg",
    brand: "Vans",
    colors: ["#000000", "#FFFFFF"],
    rating: 4.5,
  },
  {
    id: 11,
    name: "Reebok Zig Kinetica",
    price: 11290,
    image:
      "https://i.pinimg.com/736x/94/20/c9/9420c987c7ef1e04f619bc45e51a76d0.jpg",
    brand: "Reebok",
    colors: ["#FF0000", "#000000"],
    rating: 4.6,
  },
  {
    id: 12,
    name: "Puma Cali Sport",
    price: 8690,
    image:
      "https://i.pinimg.com/736x/df/55/17/df551753b17180fc508223bdcbaf9f16.jpg",
    brand: "Puma",
    colors: ["#FFF", "#FFC0CB"],
    rating: 4.2,
  },
];

export const heroImage = heroSneaker;

export const testimonials = [
  {
    id: 1,
    name: "Иван Петров",
    role: "Коллекционер",
    text: "Нашел редкие Nike Dunk, которые искал два года. Проверили подлинность перед отправкой - это круто! Буду заказывать еще.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Анна Смирнова",
    role: "Streetwear-блогер",
    text: "Каждая пара - как произведение искусства! Это не просто покупка, а настоящий опыт для ценителя стиля.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Максим Волков",
    role: "Баскетболист",
    text: "Игровые кроссовки соответствуют описанию на 100%. Теперь только здесь покупаю обувь для игры и повседневной носки.",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];
