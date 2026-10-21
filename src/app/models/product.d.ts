interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  // rating: Rating;
  rating: {
    rate: number;
    count: number;
  }
}

// interface Rating {
//   rate: number;
//   count: number;
// }

interface Purchase {
  id: number;
  title: string;
  price: number;
  method: string;
  date: string;
}
