import React from 'react';
import { PopupWrapper } from '@components/PopupWrapper/PopupWrapper';
import './RepositoryInfoPopup.css';
import { CrossIcon } from '@components/Icons/CrossIcon';
import { RepositoryInfo } from '@features/repositories/components/RepositoryInfo/RepositoryInfo';
import { useSelector } from 'react-redux';
import { getCurrentRepoIndex, getRepositories } from '@features/repositories/selectors';
import { RepositoryInfoSkeleton } from '@features/repositories/components/RepositoryInfo/RepositoryInfoSkeleton';
interface Props {
  shown: boolean;
  onClose: VoidFunction;
}
export const RepositoryInfoPopup = ({ shown, onClose }: Props) => {
  const repositories = useSelector(getRepositories);
  const currentRepoIndex = useSelector(getCurrentRepoIndex);

  return (
    <PopupWrapper shown={shown} onClose={onClose}>
      <div className="repository-info-popup">
        {currentRepoIndex === null ? (
          <RepositoryInfoSkeleton detailed={true} />
        ) : (
          <RepositoryInfo detailed repository={repositories[currentRepoIndex]} />
        )}
        <button onClick={onClose} className="repository-info-popup__close">
          <CrossIcon></CrossIcon>
        </button>
      </div>
    </PopupWrapper>
  );
};
