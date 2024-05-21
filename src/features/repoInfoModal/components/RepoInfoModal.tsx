import React, { FC } from 'react';
import { ModalWrapper } from '@Components/ModalWrapper/ModalWrapper';
import './RepoInfoModal.css';
import { RepoItem } from '@features/slider/comonents/Slider';
import { CrossIcon } from '@images/CrossIcon';
import { LinkIcon } from '@images/LinkIcon';
import { StarIcon } from '@images/StarIcon';
import { ForkIcon } from '@images/ForkIcon';

interface RepoInfoProps {
  onClose: VoidFunction;
  shown: boolean;
  repoData: RepoItem;
}

export const RepoInfoModal: FC<RepoInfoProps> = ({ onClose, shown, repoData }: RepoInfoProps) => {
  const { name, description, stargazers_count, forks, owner, homepage, topics } = repoData;

  const _onClose = () => {
    onClose();
  };

  return (
    <ModalWrapper shown={shown} onClose={_onClose}>
      <div className="info-modal container">
        <button className="info-modal__close" onClick={_onClose}>
          <CrossIcon />
        </button>
        <h3 className="info-modal__logo">{owner.login}</h3>
        <h2 className="info-modal__name"> {name} </h2>
        <p className="info-modal__desc">{description}</p>
        <div className="info-modal__homepage">
          {homepage && (
            <>
              <LinkIcon />
              <a href={homepage}>{homepage}</a>
            </>
          )}
        </div>
        <div className="info-modal__topics">
          {topics.map((elem, i) => {
            return (
              <div key={i} className="info-modal__topic">
                {elem}
              </div>
            );
          })}
        </div>
        <div className="slider__repo_info">
          <div className="slider__repo-elem ">
            <StarIcon />
            {stargazers_count}
          </div>
          <div className="slider__repo-elem">
            <ForkIcon />
            {forks}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
