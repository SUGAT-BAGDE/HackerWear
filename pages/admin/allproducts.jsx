import React, { useState, useEffect } from 'react'

import { Grid, Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Box, Switch } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import Product from '../../Models/Product';
import mongoose from 'mongoose'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BaseCard from '../../src/components/baseCard/BaseCard';

const Allproducts = (props) => {

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

  const [layout, setLayout] = useState(false)

  const changeLayout = () => {
    setLayout(!layout)
    localStorage.setItem("layout", !layout)
  }

  useEffect(() => {
    try {
      if (localStorage.getItem('layout')) {
        let layout = JSON.parse(localStorage.getItem('layout'));
        setLayout(layout)
      }
      else {
        setLayout(false)
      }
    } catch (error) {
      console.error(error)
      localStorage.removeItem('layout')
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
      <FullLayout>
        <div className='flex items-center justify-center'>
          List
          <Switch onChange={changeLayout} checked={layout}/>
          Block
        </div>

        {layout && <Grid container>
          {props.products.map((product, index) => (
            <Grid
              key={index}
              item
              xs={6}
              lg={4}
              sx={{
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Link href={`/admin/product/${product.slug}`}>
                <Card
                  sx={{
                    p: 0,
                    width: "100%",
                  }}
                  className="bg-black shadow-lg shadow-black"
                >
                  {/* <Image src={product.img} alt="img" width={500} height={500}/> */}
                  <img src={product.img} alt={product.img} className={"h-72 w-full object-contain"} />
                  <CardContent
                    sx={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "h4.fontSize",
                        fontWeight: "500",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      {product.desc}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      Available Quantity : {product.availableQty}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      <h2>{product.size.toUpperCase()}</h2>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "h5.fontSize",
                        fontWeight: "400",
                        mt: 1,
                      }}
                    >
                      <h2>₹ {product.price}</h2>
                    </Typography>
                    <div className="text-slate-400 text-base my-1">
                      {(product.color.toLowerCase() == "blue") && <button className="border-2 border-gray-700 bg-[#00f] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                      {(product.color.toLowerCase() == "green") && <button className="border-2 border-gray-700 bg-[#0f0] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                      {(product.color.toLowerCase() == "purple") && <button className="border-2 border-gray-700 bg-purple-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                      {(product.color.toLowerCase() == "yellow") && <button className="border-2 border-gray-700 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                      {(product.color.toLowerCase() == "pink") && <button className="border-2 border-gray-700 bg-pink-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                      {(product.color.toLowerCase() == "white") && <button className="border-2 border-gray-700 bg-white rounded-full w-6 h-6 focus:outline-none mx-1" />}
                      {(product.color.toLowerCase() == "black") && <button className="border-2 border-gray-700 bg-black rounded-full w-6 h-6 focus:outline-none mx-1" />}
                      {(product.color.toLowerCase() == "red") && <button className="border-2 border-gray-700 bg-[#f00] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
        }

        {!layout &&
          <BaseCard title="Product Perfomance">
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
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Slug
                    </Typography>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Color
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Size
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography color="textSecondary" variant="h6">
                      Price
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.products.map((product) => (
                  <Link href={`/admin/product/${product.slug}`} key={product.slug}>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {product.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          {product.slug}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <img src={product.img} alt="" width={50} />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "500",
                          }}
                        >
                          <div className="text-slate-400 text-base my-1">
                            {(product.color.toLowerCase() == "blue") && <button className="border-2 border-gray-700 bg-[#00f] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            {(product.color.toLowerCase() == "green") && <button className="border-2 border-gray-700 bg-[#0f0] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            {(product.color.toLowerCase() == "purple") && <button className="border-2 border-gray-700 bg-purple-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            {(product.color.toLowerCase() == "yellow") && <button className="border-2 border-gray-700 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            {(product.color.toLowerCase() == "pink") && <button className="border-2 border-gray-700 bg-pink-600 rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            {(product.color.toLowerCase() == "white") && <button className="border-2 border-gray-700 bg-white rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            {(product.color.toLowerCase() == "black") && <button className="border-2 border-gray-700 bg-black rounded-full w-6 h-6 focus:outline-none mx-1" />}
                            {(product.color.toLowerCase() == "red") && <button className="border-2 border-gray-700 bg-[#f00] rounded-full w-6 h-6 focus:outline-none mx-1" />}
                          </div>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            fontWeight: "bold",
                          }}
                        >
                          {product.size.toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6">₹ {product.price}</Typography>
                      </TableCell>
                    </TableRow>
                  </Link>
                ))}
              </TableBody>
            </Table>
          </BaseCard>
        }

      </FullLayout>
    </ThemeProvider>
  )
}

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let products = JSON.parse(JSON.stringify(await Product.find({})))
  return {
    props: { products }, // will be passed to the page component as props
  }
}

export default Allproducts