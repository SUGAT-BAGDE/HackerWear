import React, { useEffect, } from "react";

import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";

import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { useRouter } from "next/router";

export default function Index(props) {
  
  const router = useRouter()

  useEffect(() => {
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
              <Grid container spacing={0} >
                <Grid item xs={12} lg={12}>
                  <SalesOverview />
                </Grid>
                {/* ------------------------- row 1 ------------------------- */}
                <Grid item xs={12} lg={4}>
                  <DailyActivity />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ProductPerfomance />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <BlogCard />
                </Grid>
              </Grid>
            </FullLayout>
          </div>
        </ThemeProvider>
  );
}
