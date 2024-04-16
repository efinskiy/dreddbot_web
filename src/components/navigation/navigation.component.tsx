import css from './navigation.module.css';
import classNames from 'classnames';
import {SearchBlockComponent} from "../search-block/search-block.component.tsx";

import {SearchItemsComponent} from "../search-items/search-items.component.tsx";

export const NavigationComponent = (() => {
    return (
        <div className={classNames(css.nav_main)}>
            {<SearchBlockComponent/>}
            {<SearchItemsComponent/>}


        </div>
    )
})