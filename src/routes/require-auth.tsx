import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    role: string;
}

interface RequireAuthProps {
    allowedRoles: string[];
    children: ReactNode; // Declare children as a prop
}

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
    const authState = useAppSelector((state) => state.auth);
    let role: string | undefined;

    if (!authState.token) {
        return <Navigate to="/login" replace />;
    }

    if (authState.token) {
        const decoded = jwtDecode<DecodedToken>(authState.token);
        role = decoded.role;
    }

    if (role && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />; // Redirect to a default route if not allowed
    }

    return <>{children}</>; // Render children if allowed
};

export default RequireAuth;
