import BaseLayout from "../BaseLayout";

import { Text } from '@geist-ui/core';

const NotFoundPage = () => {
    return (
        <>
            <BaseLayout>
            <h2>Not found.</h2>
            <Text>Unfortunately, we weren't able to find anything for you there.</Text>
            </BaseLayout>
        </>
    );
}

export default NotFoundPage;