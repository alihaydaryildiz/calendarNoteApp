import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider } from '@toolpad/core/internal';
import MyCalendar from './Calendar';
import ActivitiesPage from './ActivitiesPage';
import MyProfilePage from './MyProfilePage';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

const NAVIGATION = [
    {
        segment: '/',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: '/activities',
        title: 'Activities',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: '/myProfile',
        title: 'My Profile',
        icon: <BarChartIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function CustomNavigation() {
    const location = useLocation();
    return (
        <Box>
            {NAVIGATION.map((item) => (
                <Box key={item.segment} sx={{ mb: 2 }}>
                    <Link to={item.segment}
                        style={{
                            textDecoration: 'none',
                            color: location.pathname === item.segment ? 'black' : 'black',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                        }}>
                        {item.icon}
                        <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                            {item.title}
                        </Typography>
                    </Link>
                </Box>
            ))}
        </Box>
    );
}

function DashboardLayoutBranding(props) {
    const { window } = props;
    const demoWindow = window !== undefined ? window() : undefined;


    return (
        <DemoProvider window={demoWindow}>
            <AppProvider
                branding={{
                    logo: <img />,
                    title: '',
                }}
                theme={demoTheme}
                window={demoWindow}
            >
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ minWidth: 200, borderRight: '1px solid #eee', p: 2 }}>
                        <CustomNavigation />
                    </Box>
                    <Box sx={{ flex: 1, p: 2 }}>
                        <Routes>
                            <Route path="/" element={<MyCalendar />} />
                            <Route path="/activities" element={<ActivitiesPage />} />
                            <Route path="/myProfile" element={<MyProfilePage />} />
                        </Routes>
                    </Box>
                </Box>
            </AppProvider>
        </DemoProvider>
    );
}

DashboardLayoutBranding.propTypes = {
    window: PropTypes.func,
};
export default DashboardLayoutBranding;