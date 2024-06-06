import './App.css';
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from 'react-router-dom';
import { Layout } from './pages/layout/layout.component.tsx';
import { Login } from './pages/login/login.component.tsx';
import Cookies from 'js-cookie';
import { UserContainerComponent } from './components/user-container/user-container.component.tsx';
import { UsersComponent } from './pages/users/users.component.tsx';
import { DepartmentComponent } from './pages/department/department.component.tsx';
import { AdministrationComponent } from './pages/administration/administration.component.tsx';
import { DepartmentInfoComponent } from './components/departmentInfo/departmentInfo.component.tsx';
import { EmptyOutletComponent } from './components/emptyOutlet/emptyOutlet.component.tsx';
import { DepartmentObjectEditUsersComponent } from './components/departmentObjectsEdit/departmentObjectEditUsers.component.tsx';
import { DepartmentObjectEditManageablesComponent } from './components/departmentObjectsEdit/departmentObjectEditManageables.component.tsx';
import { ManageableComponent } from './pages/manageable/manageable.component.tsx';
import { ManageableContentComponent } from './components/manageableContent/manageableContent.component.tsx';
import { RegistryComponent } from './components/registry/registry.component.tsx';
import { PermissionsComponent } from './pages/administration/permissionsComponent/permissions.component.tsx';
// import {useEffect} from "react";
// import {get_users} from "./api/users.ts";
// import {writeUsers} from "./stores/users.store.ts";
// import {useAuthState} from "./stores/auth.store.ts";

const loader = async () => {
    if (Cookies.get('at')) {
        const valid_until: number = Number(Cookies.get('vu'));
        const unix_now: number = Date.now() / 1000;
        if (valid_until <= unix_now || isNaN(valid_until)) {
            return redirect('../login');
        }
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        loader: loader,
        children: [
            {
                path: '/',
                element: <EmptyOutletComponent />,
            },
            {
                path: '/user',
                element: <UsersComponent />,
                children: [
                    {
                        path: '/user',
                        element: <EmptyOutletComponent />,
                    },
                    {
                        path: '/user/:id',
                        element: <UserContainerComponent />,
                    },
                ],
            },
            {
                path: '/department',
                element: <DepartmentComponent />,
                children: [
                    {
                        path: '/department',
                        element: <EmptyOutletComponent />,
                    },
                    {
                        path: '/department/:id',
                        element: <DepartmentInfoComponent />,
                    },
                    {
                        path: '/department/:id/users',
                        element: <DepartmentObjectEditUsersComponent />,
                    },
                    {
                        path: '/department/:id/manageables',
                        element: <DepartmentObjectEditManageablesComponent />,
                    },
                ],
            },
            {
                path: '/manageable',
                element: <ManageableComponent />,
                children: [
                    {
                        path: '/manageable',
                        element: <EmptyOutletComponent />,
                    },
                    {
                        path: '/manageable/:id',
                        element: <ManageableContentComponent />,
                    },
                ],
            },
            {
                path: '/administration',
                element: <AdministrationComponent />,
                children: [
                    {
                        path: '/administration',
                        element: <EmptyOutletComponent />,
                    },
                    {
                        path: '/administration/matrix',
                        element: <PermissionsComponent />,
                    },
                ],
            },
            {
                path: '/registries',
                element: <RegistryComponent />,
                children: [],
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
