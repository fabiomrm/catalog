import './styles.css';
import { ProductPrice } from 'components/ProductPrice';
import { CategoryBadge } from '../CategoryBadge';
import { Product } from 'types/Product';

type Props = {
  product: Product;
};

export const ProductCrudCard = ({ product }: Props) => {
  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-top-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div>
        <div className="product-crud-card-bottom-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>
        <div className="product-crud-categories-container">
          {product.categories.map((cat) => (
            <CategoryBadge name={cat.name} key={cat.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
