import { ReactComponent as ArrowIcon } from 'assets/images/arrow-left.svg';
import ReactPaginate from 'react-paginate';
import './styles.css';

type Props = {
  forcePage?: number;
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
};

export const Pagination = ({
  pageCount,
  range,
  onChange,
  forcePage,
}: Props) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />
        </div>
      }
      nextLabel={
        <div>
          <ArrowIcon />
        </div>
      }
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
    />
  );
};
