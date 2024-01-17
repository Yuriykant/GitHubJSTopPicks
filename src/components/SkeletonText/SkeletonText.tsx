import React from 'react';
import classnames from 'classnames';
import './SkeletonText.css';
import { repeat } from '@app/utils';

interface Props {
  rowsCount?: number;
  accent?: boolean;
}

export const SkeletonText = ({ rowsCount = 1, accent = false }: Props) => {
  return (
    <div className={classnames('skeleton-text', { 'skeleton-text--accent': accent })}>
      {repeat(
        (index) => (
          <span key={index} className="skeleton-text__row skeleton-gradient"></span>
        ),
        rowsCount
      )}
    </div>
  );
};
