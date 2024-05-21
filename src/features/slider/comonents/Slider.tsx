import React, { useState } from 'react';
import { useGetRepoQuery } from '@app/api';
import { SliderArrow } from './SliderArrow';

import './Slider.css';
import { RepoInfoModal } from '@features/repoInfoModal/components/RepoInfoModal';
import { StarIcon } from '@images/StarIcon';
import { ForkIcon } from '@images/ForkIcon';
import { SliderSkeleton } from './SliderSkeleton';

const MAX_TITLE_LENGTH = 21;
const MAX_DESC_LENGTH = 80;

export interface RepoItem {
  name: string;
  description: string;
  stargazers_count: number;
  forks: number;
  owner: {
    login: string;
  };
  homepage: string;
  topics: string[];
}

export const Slider = () => {
  const { data, isLoading } = useGetRepoQuery({ limit: 30 });
  const [repoInfoShown, setRepoInfoShown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentItem: RepoItem = data?.items[currentSlide] ?? {};

  const {
    name = '',
    description = '',
    stargazers_count = 0,
    forks = 0,
    owner = { login: '' },
    homepage = '',
    topics = [],
  } = currentItem;

  if (isLoading) {
    return <SliderSkeleton />;
  }

  const handleNextSlide = () => {
    if (data && currentSlide === data.items.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((currentSlide) => currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (data && currentSlide === 0) {
      setCurrentSlide(data.items.length - 1);
    } else {
      setCurrentSlide((currentSlide) => currentSlide - 1);
    }
  };

  return (
    <div className="slider">
      <RepoInfoModal
        shown={repoInfoShown}
        onClose={() => setRepoInfoShown(false)}
        repoData={{ name, description, stargazers_count, forks, owner, homepage, topics }}
      />
      <SliderArrow position={'left'} onClick={handlePrevSlide} />
      <div className="slider__content-wrapper" onClick={() => setRepoInfoShown(true)}>
        <h2 className="slider__title">
          {name && name.length > MAX_TITLE_LENGTH ? `${name.substring(0, MAX_TITLE_LENGTH)}...` : name}
        </h2>
        <div className="slider__description">
          {description && description.length > MAX_DESC_LENGTH
            ? `${description.substring(0, MAX_DESC_LENGTH)}...`
            : description}
        </div>
        <div className="slider__repo_info">
          <div className="slider__repo-elem ">
            <StarIcon />
            {data && stargazers_count}
          </div>
          <div className="slider__repo-elem">
            <ForkIcon />
            {data && forks}
          </div>
        </div>
      </div>
      <SliderArrow onClick={handleNextSlide} />
    </div>
  );
};
