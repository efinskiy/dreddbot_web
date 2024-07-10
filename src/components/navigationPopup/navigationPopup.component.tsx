import css from './navigationPopup.module.css';
import { PopupItemComponent } from './popupItem/popupItem.component.tsx';
import Popup from 'reactjs-popup';
import React from 'react';
import { FaAnchor, FaBook, FaGitAlt, FaUser, FaUsers } from 'react-icons/fa';
import { IoMdHelpBuoy } from 'react-icons/io';
import { FaBucket } from 'react-icons/fa6';
import { SiGrafana } from 'react-icons/si';
import { AiOutlineFileSearch } from 'react-icons/ai';

interface Props {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // ref: any;
}

export const NavigationPopupComponent = ({ isOpen, setOpen }: Props) => {
    return (
        <Popup
            open={isOpen}
            closeOnDocumentClick={true}
            onClose={() => setOpen(false)}
            position={'top left'}
            arrow={true}
            className={'pheader'}
        >
            <div className={css.popup}>
                <div className={css.popup_wrapper}>
                    <PopupItemComponent
                        title={'Пользователи'}
                        Icon={FaUser}
                        link={'/user'}
                    />
                    <PopupItemComponent
                        title={'Реестры'}
                        Icon={FaBook}
                        link={'/registries'}
                    />
                    <PopupItemComponent
                        title={'Отделы'}
                        Icon={FaUsers}
                        link={'/department'}
                    />
                    <PopupItemComponent
                        title={'Поддержка'}
                        Icon={IoMdHelpBuoy}
                        link={'/support'}
                    />
                    <PopupItemComponent
                        title={'Трекер'}
                        Icon={FaAnchor}
                        link={'/tracker'}
                    />
                    <PopupItemComponent
                        title={'Git'}
                        Icon={FaGitAlt}
                        link={'http://git.vak.cr911'}
                    />
                    <PopupItemComponent
                        title={'Хранилище'}
                        Icon={FaBucket}
                        link={'https://s3.vak.cr911:9901'}
                    />
                    <PopupItemComponent
                        title={'Grafana'}
                        Icon={SiGrafana}
                        link={'http://grafana.vak.cr911'}
                    />
                    <PopupItemComponent
                        title={'Лиды'}
                        Icon={SiGrafana}
                        link={'/leads'}
                    />
                    <PopupItemComponent
                        title={'ФССП'}
                        Icon={SiGrafana}
                        link={'/personal_search'}
                    />
                    <PopupItemComponent
                        title={'Поисковые'}
                        Icon={AiOutlineFileSearch}
                        link={'/personal_search'}
                    />
                </div>
            </div>
        </Popup>
    );
};
