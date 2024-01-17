import React from 'react';
import { LinkIcon } from '@components/Icons/LinkIcon';
import { StarIcon } from '@components/Icons/StarIcon';
import { ForkIcon } from '@components/Icons/ForkIcon';
import './RepositoryInfo.css';
import { SkeletonText } from '@components/SkeletonText/SkeletonText';
import classNames from 'classnames';

interface Props {
  className?: string;
  detailed: boolean;
}
export const RepositoryInfoSkeleton = ({ className, detailed }: Props) => {
  return (
    <div className={classNames('repository-info', className)}>
      <div className="repository-info__info">
        {detailed && (
          <div className="repository-info__author">
            <SkeletonText />
          </div>
        )}
        <div className="repository-info__repo-name">
          <SkeletonText accent />
        </div>
      </div>
      <div className="repository-info__description">
        <SkeletonText rowsCount={2} />
      </div>
      {detailed && (
        <div className="repository-info__text-with-icon">
          <LinkIcon></LinkIcon>
          <a className="repository-info__link" href="#">
            <SkeletonText />
          </a>
        </div>
      )}
      {detailed && (
        <div className="repository-info__tags">
          <SkeletonText />
        </div>
      )}
      <div className="repository-info__statistic">
        <div className="repository-info__text-with-icon repository-info__text-with-icon--skeleton">
          <StarIcon></StarIcon> <SkeletonText />
        </div>
        <div className="repository-info__text-with-icon repository-info__text-with-icon--skeleton">
          <ForkIcon></ForkIcon> <SkeletonText />{' '}
        </div>
      </div>
    </div>
  );
};
