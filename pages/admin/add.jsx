import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { useRouter } from 'next/router';

const Add = (props) => {

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

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState("")
    const [price, setPrice] = useState()
    const [availableQty, setAvailableQty] = useState()
    const [size, setSize] = useState()
    const [color, setColor] = useState("")
    const [category, setCategory] = useState()
    const [slug, setSlug] = useState("")

    const handleChange = (e) => {
        if (e.target.name == 'title') {
            setTitle(e.target.value)
        } else if (e.target.name == 'desc') {
            setDesc(e.target.value)
        } else if (e.target.name == 'img') {
            setImg(e.target.value)
        } else if (e.target.name == 'slug') {
            setSlug(e.target.value)
        } else if (e.target.name == 'price') {
            if (parseInt(e.target.value) <= 0) {
                setPrice("")
            }
            else {
                setPrice(parseInt(e.target.value))
            }
        } else if (e.target.name == 'availableQty') {
            if (parseInt(e.target.value) <= 0) {
                setAvailableQty("")
            }
            else {
                setAvailableQty(parseInt(e.target.value))
            }
        } else if (e.target.name == 'size') {
            setSize(e.target.value)
        } else if (e.target.name == 'color') {
            setColor(e.target.value)
        } else if (e.target.name == 'category') {
            setCategory(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let a = await fetch("/api/admin/addproducts",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([{
                    title, desc, img, category, color, size, price, availableQty,
                    slug, extras: {}
                }])
            })
        let response = await a.json()
        if (!response.success) {
            toast.error("Please Try Again", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                progressStyle: { background: "#f00" }
            })
            return
        }
        else {
            toast.success("Added Successfilly", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
            setTitle("")
            setCategory("")
            setAvailableQty(0)
            setImg("")
            setColor("")
            setPrice(0)
            setDesc("")
            setSize("")
        }
    }

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
                    <h2 className='text-center text-2xl font-bold'>Add a Product</h2>
                    <Grid container spacing={0}>
                        <Grid item xs={12} lg={12}>
                            <BaseCard title="Product Details">
                                <Stack spacing={3}>
                                    <TextField
                                        id="name-basic"
                                        label="Title"
                                        variant="outlined"
                                        name='title'
                                        required
                                        value={title}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        id="name-basic"
                                        label="Slug (Id)"
                                        variant="outlined"
                                        name='slug'
                                        required
                                        value={slug}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        required
                                        name='desc'
                                        value={desc}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        label="Url to Image"
                                        type="text"
                                        variant="outlined"
                                        name='img'
                                        value={img}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        id="pass-basic"
                                        label="Price in ₹"
                                        type="number"
                                        variant="outlined"
                                        name='price'
                                        value={price}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        label="Avaliable Quantity"
                                        type="number"
                                        variant="outlined"
                                        name='availableQty'
                                        value={availableQty}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        label="Size in Short Form"
                                        type="text"
                                        variant="outlined"
                                        name='size'
                                        value={size}
                                        onChange={handleChange}
                                        required
                                    />
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="blue"
                                            name="color"
                                            required
                                            value={color}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                value="blue"
                                                control={<Radio />}
                                                label={<button className="bg-[#00f] rounded-full w-6 h-6 m-2 focus:outline-none mx-1" />}
                                            />
                                            <FormControlLabel
                                                value="green"
                                                control={<Radio />}
                                                label={<button className="border-2 border-black bg-[#0f0] rounded-full w-6 h-6 m-2 focus:outline-none mx-1" />}
                                            />
                                            <FormControlLabel
                                                value="red"
                                                control={<Radio />}
                                                label={<button className="border-2 border-black bg-[#f00] rounded-full w-6 h-6 m-2 focus:outline-none mx-1" />}
                                            />
                                            <FormControlLabel
                                                value="purple"
                                                control={<Radio />}
                                                label={<button className="border-2 border-black bg-purple-600 rounded-full w-6 h-6 m-2 focus:outline-none mx-1" />}
                                            />
                                            <FormControlLabel
                                                value="yellow"
                                                control={<Radio />}
                                                label={<button className="border-2 border-black bg-yellow-500 rounded-full w-6 h-6 m-2 focus:outline-none mx-1" />}
                                            />
                                            <FormControlLabel
                                                value="white"
                                                control={<Radio />}
                                                label={<button className="border-2 border-black bg-white rounded-full w-6 h-6 m-2 focus:outline-none mx-1" />}
                                            />
                                            <FormControlLabel
                                                value="black"
                                                control={<Radio />}
                                                label={<button className="border-2 border-white bg-black rounded-full w-6 h-6 m-2 focus:outline-none mx-1" />}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="category"
                                            required
                                            onChange={handleChange}
                                            value={category}
                                        >
                                            <FormControlLabel
                                                value="tshirt"
                                                control={<Radio />}
                                                label={"Tshirt"}
                                            />
                                            <FormControlLabel
                                                value="hoodie"
                                                control={<Radio />}
                                                label={"Hoodie"}
                                            />
                                            <FormControlLabel
                                                value="Mask"
                                                control={<Radio />}
                                                label={"mask"}
                                            />
                                            <FormControlLabel
                                                value="mug"
                                                control={<Radio />}
                                                label={"Mug"}
                                            />
                                            <FormControlLabel
                                                value="sticker"
                                                control={<Radio />}
                                                label={"Sticker"}
                                            />
                                            <FormControlLabel
                                                value="other"
                                                control={<Radio />}
                                                label={"Other"}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Stack>
                                <br />
                                <Button variant="contained" className='bg-[#049d04] text-black hover:bg-[#0f0]' onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </BaseCard>
                        </Grid>
                    </Grid>
                </FullLayout>
            </div>
        </ThemeProvider>
    )
}

export default Add