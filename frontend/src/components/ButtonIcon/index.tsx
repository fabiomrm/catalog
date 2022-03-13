import { ReactComponent as ArrowRight } from 'assets/images/arrow-right.svg';
import './styles.css';

export const ButtonIcon = () => {
  return (
    <div className="btn-container">
        <button className="btn btn-primary">
          <h6>inicie agora a sua busca</h6>
        </button>
      <div className="btn-icon-container">
        <ArrowRight />
      </div>
    </div>
  );
};
