import styled from 'styled-components';

const Category = ({setCategory, handleCategory}) => {
    //카테고리 목록
    const categoryList = [
        '항공',
        '숙박',
        '자동차 렌탈',
        '교통비',
        '음식',
        '음료',
        '관광',
        '횔동',
        '쇼핑',
        '유류비',
        '식재료비',
        '기타',
    ];

    return (
        <CategoryDropdown defaultValue={'default'} onChange={(e) => handleCategory(e.target.value)}>
            <option value='default' disabled>
                항목을 선택하세요
            </option>
            {categoryList.map((el, idx) => (
                <option key={idx} className='category_item'>
                    {el}
                </option>
            ))}
        </CategoryDropdown>
    );
};

export default Category;

const CategoryDropdown = styled.select`
  padding: 10px 14px;
  width: 100%;
  background-color: white;
  border: 1px solid var(--light-gray-4);
  border-radius: 3px;
  cursor: pointer;

  > option[value=''][disabled] {
    display: none;
  }
`;