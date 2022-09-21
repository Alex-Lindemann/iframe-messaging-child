import { useSearchParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";

function getReturnUrlBase() {
    if (window.location.origin === "http://localhost:3001") {
        return 'http://localhost:3000';
    }
    return 'https://iframe-messaging-parent.herokuapp.com';
}

export default function Body() {
    const [data, setData] = useState({ fieldOne: '' })
    let [searchParams] = useSearchParams();
    let params = {};

    for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        params[param] = value;
    }

    const sendToParent = () => {
        if (window.location.pathname === '/') {
            window.location.href = `${getReturnUrlBase()}?fieldValues=${encodeURIComponent(JSON.stringify(data))}`
        } else {
            window.parent.postMessage({ type: 'message-to-parent', data: { fieldValues: data } }, '*');
        }
    }

    return (
        <>
            Incoming Data: {JSON.stringify(params)}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="filled-basic" label="Field One" variant="filled" onChange={(e) => setData({ fieldOne: e.target.value })} />
                <br />
                <Button variant="outlined" onClick={sendToParent}>Send To App One</Button>
            </Box>
        </>
    )
}