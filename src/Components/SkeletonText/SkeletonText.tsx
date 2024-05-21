import React, { FC } from 'react';
import classNames from 'classnames';
import './SkeletonText.css';

interface SkeletonTextProps {
  rowsCount?: number;
  short?: boolean;
  accent?: boolean;
}

export function repeat<T>(cb: (i: number) => T, times = 1): T[] {
  const res = [];
  for (let i = 0; i < times; i++) {
    res.push(cb(i));
  }
  return res;
}

export const SkeletonText: FC<SkeletonTextProps> = ({
  rowsCount = 1,
  short = false,
  accent = false,
}: SkeletonTextProps) => {
  return (
    <span className="skeleton-text">
      {repeat((i) => {
        return (
          <span
            key={i}
            className={classNames('skeleton-gradient', {
              'skeleton-text__row-short': short,
              'skeleton-text__row': !short,
              'skeleton-gradient': !accent,
              'skeleton-accent': accent,
              'skeleton-gradient-accent': accent,
            })}
          />
        );
      }, rowsCount)}
    </span>
  );
};
