import { ProductCard } from 'components/ProductCard';
import { Product } from 'types/Product';
import { Link } from 'react-router-dom';

export const Catalog = () => {
  const product: Product = {
    id: 3,
    name: 'Macbook Pro',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    price: 1250.0,
    imgUrl:
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg',
    date: '21/06/1996',
    categories: [
      {
        id: 3,
        name: 'Computadores',
      },
    ],
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/products/1">
            <ProductCard product={product} />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/products/1">
            <ProductCard product={product} />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/products/1">
            <ProductCard product={product} />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/products/1">
            <ProductCard product={product} />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/products/1">
            <ProductCard product={product} />
          </Link>
        </div>
      </div>
    </div>
  );
};
