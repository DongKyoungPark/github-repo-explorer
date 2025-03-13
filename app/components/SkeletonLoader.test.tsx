import React from 'react';
import { render } from '@testing-library/react';
import SkeletonLoader from './SkeletonLoader';

describe('SkeletonLoader 컴포넌트', () => {
  it('기본값으로 스켈레톤 로더 1개가 렌더링됩니다', () => {
    render(<SkeletonLoader />);

    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBe(1);
  });

  it('지정된 개수만큼 스켈레톤 로더가 렌더링됩니다', () => {
    const count = 3;
    render(<SkeletonLoader count={count} />);

    const skeletonElements = document.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBe(count);
  });
});
