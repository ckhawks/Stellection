import { Text, Spacer } from '@geist-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';

import { useLocation } from 'react-router-dom'; // NavLink, redirect

const NotFoundPage = () => {
    const [failedUrl, setFailedUrl] = useState();
    const location = useLocation();
    
    useEffect(() => {
        // console.log(location);
        console.log(window.location);
        // setFailedUrl(location.pathname);
        setFailedUrl(window.location.href);
    }, [location]);

    return (
        <>
            <h2>Not Found</h2>
            <Text>Unfortunately, we were not able to find anything for you there.<br/><Spacer/>
            You were looking for <code>{failedUrl}</code>, which does not exist. We think.</Text>
        </>
    );
}

export default NotFoundPage;