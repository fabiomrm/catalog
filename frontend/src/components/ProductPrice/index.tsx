import { formatPrice } from 'utils/formatters';
import './styles.css';

type Props = {
    price: number;
}

export const ProductPrice = ({ price }: Props) => {
    return(
        <div className="product-price-container">
            <span>R$</span>
            <h3>{formatPrice(price)}</h3>
        </div>
    )
}