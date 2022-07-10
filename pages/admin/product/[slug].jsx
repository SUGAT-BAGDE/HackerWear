import React,{ useState } from 'react'
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
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import theme from "../../../src/theme/theme";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import mongoose from 'mongoose';
import Product from '../../../Models/Product';
import { toast } from 'react-toastify';

const Slug = (props) => {

    const [desc, setDesc] = useState(props.product.desc)
    const [price, setPrice] = useState(props.product.price)
    const [availableQty, setAvailableQty] = useState(props.product.availableQty)
    const [size, setSize] = useState(props.product.size)
    const [color, setColor] = useState(props.product.color.toLowerCase())

    const handleChange = (e) =>{
        if (e.target.name == 'img') {
            setImg(e.target.value)
        } else if (e.target.name == 'price') {
            if (parseInt(e.target.value)<=0) {
                setPrice("")
            }
            else {
                setPrice(parseInt(e.target.value))
            }
        } else if (e.target.name == 'availableQty') {
            if (parseInt(e.target.value)<=0) {
                setAvailableQty("")
            }
            else {
                setAvailableQty(parseInt(e.target.value))
            }
        } else if (e.target.name == 'size') {
            setSize(e.target.value)
        } else if (e.target.name == 'color') {
            setColor(e.target.value)
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        let a = await fetch("/api/admin/updateproduct",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({desc, color, size, price, availableQty, slug: props.product.slug})
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
            setAvailableQty(0)
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
            `}</style>
            <div>
                <FullLayout>
                    <BaseCard title={props.product.title}>
                        <div className='flex justify-center m-5'>
                            <div className='rounded-lg shadow-lg bg-slate-900 shadow-black h-72 w-72 flex items-center justify-center'>
                                <img src={props.product.img} className="rounded-lg object-contain"/>
                            </div>
                        </div>
                        <Grid container spacing={0}>
                            <Grid item xs={12} lg={12}>
                                    <Stack spacing={3}>
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
                                            label="Add Avaliable Quantity"
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
                                    </Stack>
                                    <br />
                                    <Button variant="contained" className='bg-[#049d04] text-black hover:bg-[#0f0]' onClick={handleSubmit}>
                                        Save Changes
                                    </Button>
                            </Grid>
                        </Grid>
                    </BaseCard>
                </FullLayout>
            </div>
        </ThemeProvider>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let product = JSON.parse(JSON.stringify(await Product.findOne({ slug: context.params.slug })))

    return {
        props: { product, }, // will be passed to the page component as props
    }
}

export default Slug