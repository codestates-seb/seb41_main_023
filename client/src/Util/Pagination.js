import styled from 'styled-components';

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
};

export default Pagination;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-4);
`;

const Button = styled.button`
  padding: var(--spacing-2) 12px;
  background-color: transparent;
  border-radius: 3px;

  &:hover {
    background-color: var(--light-gray-2);
  }

  &[disabled] {
    background: transparent;
    color: var(--light-gray-5);
    cursor: revert;
    transform: revert;
  }

  &[aria-current='page'] {
    background-color: var(--primary-blue-bright);
    color: white;
    cursor: revert;
    transform: revert;
  }
`;
