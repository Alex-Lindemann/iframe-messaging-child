import { Route, Routes, useSearchParams } from "react-router-dom";
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

    const sendToCallingApp = () => {
        if (window.location.pathname.startsWith('/iframe')) {
            window.parent.postMessage({ type: 'message-to-parent', data: { fieldValues: data } }, '*');
        } else {
            window.location.href = `${getReturnUrlBase()}?fieldValues=${encodeURIComponent(JSON.stringify(data))}`
        }
    }

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
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
                                <Button variant="outlined" onClick={sendToCallingApp}>Send To App One</Button>
                            </Box>
                        </>
                    }
                />
                <Route path="/nested" element={<>This is nested</>} />
            </Routes>

        </>
    )
}