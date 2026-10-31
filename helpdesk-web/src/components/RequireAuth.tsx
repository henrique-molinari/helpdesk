import { Navigate, Outlet, useLocation } from 'react-router'

import { authService } from '../services/authService'

export function RequireAuth(){

    const location = useLocation()

    if(!authService.isAuthenticated()){
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <Outlet />

}
