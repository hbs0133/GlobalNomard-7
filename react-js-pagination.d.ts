declare module 'react-js-pagination' {
  import React from 'react';

  interface PaginationProps {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    pageRangeDisplayed: number;
    onChange: (pageNumber: number) => void;
    itemClass?: string;
    linkClass?: string;
    activeClass?: string;
    hideDisabled?: boolean;
    hideFirstLastPages?: boolean;
    prevPageText?: React.ReactNode;
    nextPageText?: React.ReactNode;
    disabledClass?: string;
  }

  const Pagination: React.FC<PaginationProps>;

  export default Pagination;
}
