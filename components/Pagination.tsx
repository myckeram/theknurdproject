export interface PaginationProps {
  currPage: number;
  numPages: number;
}

export default function Pagination(props: PaginationProps) {
  const currPage = parseInt(props.currPage);
  const pages = [];
  let i = 0;
  while (++i <= props.numPages) pages.push(i);

  const prevPage = currPage - 1;
  const nextPage = currPage + 1;

  if (props.numPages > 1) {
    return (
      <div class="pagination">
        {prevPage > 0 && (
          <a href={"?page=" + prevPage}>&laquo;</a>
        )}
        {pages.map(pageNum => (
          <a className={pageNum == props.currPage ? 'active' : ''} href={"?page=" + pageNum}>{pageNum}</a>
        ))}
        {nextPage <= props.numPages && (
          <a href={"?page=" + nextPage}>&raquo;</a>
        )}
      </div>
    );
  }

  return null;
}


