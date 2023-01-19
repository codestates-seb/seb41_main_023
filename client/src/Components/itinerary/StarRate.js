import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StarRateWrap = styled.div`
  display: flex;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-3);

  > span {
    color: var(--light);
    font-weight: 400;
  }

  > .star-icon__container {
    display: inline-flex;
    gap: var(--spacing-1);
  }
`;

const StarRate = ({ rating }) => {
  const AVR_RATE = rating * 20;
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  
  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE * 70) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };

  useEffect(() => {
    setRatesResArr(calcStarRates);
  }, []);

  return (
    <StarRateWrap>
      <span>{rating}</span>

      <div className='star-icon__container'>
        {STAR_IDX_ARR.map((item, idx) => {
          return (
            <span className='star-icon' key={`${item}_${idx}`}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='15'
                viewBox='0 0 14 13'
                fill='#cacaca'
              >
                <clipPath id={`${item}StarClip`}>
                  <rect width={`${ratesResArr[idx]}`} height='15' />
                </clipPath>
                <path
                  id={`${item}Star`}
                  d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                  transform='translate(-2 -2)'
                />
                <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='gold' />
              </svg>
            </span>
          );
        })}
      </div>
    </StarRateWrap>
  );
};

export default StarRate;
