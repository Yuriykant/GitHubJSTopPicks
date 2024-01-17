import React from 'react';
import { LinkIcon } from '@components/Icons/LinkIcon';
import { StarIcon } from '@components/Icons/StarIcon';
import { ForkIcon } from '@components/Icons/ForkIcon';
import classNames from 'classnames';
import './RepositoryInfo.css';
import { IRepository } from '@features/repositories/types';

interface Props {
  className?: string;
  detailed: boolean;
  repository?: IRepository;
  onClick?: VoidFunction;
}
export const RepositoryInfo = ({ className, detailed, repository, onClick }: Props) => {
  if (!repository) {
    return null;
  }

  return (
    <div className={classNames('repository-info', className)} onClick={onClick}>
      <div className="repository-info__info">
        {detailed && <p className="repository-info__author">{repository.owner.login}</p>}
        <p className={classNames('repository-info__repo-name', { 'repository-info__repo-name--accent': !detailed })}>
          {repository.name}
        </p>
      </div>
      {repository.description && <p className="repository-info__description">{repository.description}</p>}
      {detailed && repository.homepage && (
        <div className="repository-info__text-with-icon">
          <LinkIcon></LinkIcon>
          <a className="repository-info__link" href={repository.homepage}>
            {new URL(repository.homepage).host}
          </a>
        </div>
      )}
      {detailed && repository.topics.length > 0 && (
        <div className="repository-info__tags">
          {repository.topics.map((tag) => (
            <div key={tag} className="repository-info__tag">
              {tag}
            </div>
          ))}
        </div>
      )}
      <div className="repository-info__statistic">
        <div className="repository-info__text-with-icon">
          <StarIcon></StarIcon> <span>{repository.stargazers_count}</span>
        </div>
        <div className="repository-info__text-with-icon">
          <ForkIcon></ForkIcon> <span>{repository.forks_count}</span>
        </div>
      </div>
    </div>
  );
};
