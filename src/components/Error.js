/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
import { Alert } from 'react-bootstrap'
import React, { useState } from 'react';

const Error = ({ children, variant, ...props }) => {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                {children}
            </Alert>
        );
    }
    return <></>;
}

export default Error
