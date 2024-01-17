import React, { useEffect, useState } from 'react';
import { ArrowIcon } from '@components/Icons/ArrowIcon';
import './RepositoryGallery.css';
import { RepositoryInfoSkeleton } from '@features/repositories/components/RepositoryInfo/RepositoryInfoSkeleton';
import { RepositoryInfo } from '@features/repositories/components/RepositoryInfo/RepositoryInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentRepoIndex, getRepositories } from '@features/repositories/selectors';
import { fetchRepositories } from '@features/repositories/actions';
import { Dispatch } from '@app/store';
import { setCurrentRepoIndex } from '@features/repositories/slice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { RepositoryInfoPopup } from '@features/repositories/components/RepositoryInfoPopup/RepositoryInfoPopup';

enum Direction {
  forward = 'forward',
  backward = 'backward',
}

export const RepositoryGallery = () => {
  const repositories = useSelector(getRepositories);
  const currentRepoIndex = useSelector(getCurrentRepoIndex);
  const dispatch = useDispatch<Dispatch>();
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(Direction.forward);
  const [animationFinished, setAnimationFinished] = useState(true);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const animationTimeoutMs = 300;
  const touchDelta = 5;

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchDown = touchPosition;
    if (touchDown === null || !animationFinished) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > touchDelta) {
      moveSlide(Direction.forward);
    }
    if (diff < -touchDelta) {
      moveSlide(Direction.backward);
    }
    setTouchPosition(null);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchRepositories()).then(() => setLoading(false));
  }, []);

  const moveSlide = (direction: Direction) => {
    if (currentRepoIndex === null) {
      return;
    }
    setDirection(direction);
    switch (direction) {
      case Direction.forward:
        dispatch(setCurrentRepoIndex(currentRepoIndex === repositories.length - 1 ? 0 : currentRepoIndex + 1));
        break;
      case Direction.backward:
        dispatch(setCurrentRepoIndex(currentRepoIndex === 0 ? repositories.length - 1 : currentRepoIndex - 1));
        break;
    }
  };

  return (
    <div className="repository-gallery">
      <button
        className="repository-gallery__arrow repository-gallery__arrow--left"
        onClick={() => moveSlide(Direction.backward)}
        disabled={loading || !animationFinished}
      >
        <ArrowIcon />
      </button>
      {loading || !repositories || repositories.length === 0 ? (
        <RepositoryInfoSkeleton className="repository-gallery__slide" detailed={false} />
      ) : (
        <div
          className="repository-gallery__content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onClick={() => {
            if (!loading) {
              setIsPopupOpened(true);
            }
          }}
        >
          <TransitionGroup className={classNames('carousel__slides', `carousel__slides--${direction}`)}>
            <CSSTransition
              classNames="slide"
              key={currentRepoIndex}
              timeout={animationTimeoutMs}
              onEntering={() => setAnimationFinished(false)}
              onExited={() => setAnimationFinished(true)}
            >
              <RepositoryInfo
                className="repository-gallery__slide"
                detailed={false}
                repository={repositories[currentRepoIndex ?? 0]}
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}
      <button
        className="repository-gallery__arrow repository-gallery__arrow--right"
        onClick={() => moveSlide(Direction.forward)}
        disabled={loading || !animationFinished}
      >
        <ArrowIcon />
      </button>
      <RepositoryInfoPopup shown={isPopupOpened} onClose={() => setIsPopupOpened(false)} />
    </div>
  );
};
