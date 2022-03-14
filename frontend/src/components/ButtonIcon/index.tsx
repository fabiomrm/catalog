import { ReactComponent as ArrowRight } from 'assets/images/arrow-right.svg';
import './styles.css';

type Props = {
  text: string;
}
export const ButtonIcon = ({text}: Props) => {
  return (
    <div className="btn-container">
        <button className="btn btn-primary">
          <h6>{text}</h6>
        </button>
      <div className="btn-icon-container">
        <ArrowRight />
      </div>
    </div>
  );
};
