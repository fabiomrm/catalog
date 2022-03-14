import './styles.css';
import { ReactComponent as ArrowLeft } from 'assets/images/arrow-left.svg';
import { ProductPrice } from 'components/ProductPrice';
import { Link } from 'react-router-dom';

export const ProductDetails = () => {
  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <Link to="/products">
          <div className="goback-container">
            <ArrowLeft />
            <h2>VOLTAR</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg"
                alt=""
              />
            </div>
            <div className="name-price-container">
              <h1>Nome do Producot</h1>
              <ProductPrice price={20} />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição do Produto</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                nam!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
