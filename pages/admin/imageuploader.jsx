import React from 'react'

import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { useRouter } from 'next/router';

const Imageuploader = (props) => {

    const router = useRouter()

    React.useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch("/api/admin/verify-admin",
                {
                    headers: { token },
                }).then(a => {
                    a.json().then(response => {
                        if (response.status != "available") {
                            router.back()
                        }
                    })
                })
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
                footer{
                    display:none;
                }
                #hackerwearNav{
                    display:none;
                }                
                `
            }</style>
            <div>
                <FullLayout>
                    Image Uploader
                </FullLayout>
            </div>
        </ThemeProvider>
    )
}

export default Imageuploader