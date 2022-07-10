import React, { useEffect } from 'react'

import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import mongoose from 'mongoose'
import Link from 'next/link';
import BaseCard from '../../src/components/baseCard/BaseCard';
import Order from "../../Models/Order";
import { useRouter } from 'next/router';

const Allorders = (props) => {

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
            `}</style>
      <div>
        <FullLayout>
          <BaseCard title="order Perfomance">
            <Table
              aria-label="simple table"
              sx={{
                mt: 3,
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Order Id
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Address
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Contact
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Pincode
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="textSecondary" variant="h6">
                      Amount
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.orders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order._id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order.address.substr(0, 20)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order.phone}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {order.pinCode}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          <Chip
                            sx={{
                              pl: "4px",
                              pr: "4px",
                              backgroundColor: order.status == "shipped" ? "green" : "red",
                              color: "#000",
                            }}
                            size="small"
                            label={order.status}
                          ></Chip>
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6">₹ {order.amount}</Typography>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </BaseCard>
        </FullLayout>
      </div>
    </ThemeProvider>
  )
}

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let orders = JSON.parse(JSON.stringify(await Order.find({})))
  return {
    props: { orders }, // will be passed to the page component as props
  }
}

export default Allorders