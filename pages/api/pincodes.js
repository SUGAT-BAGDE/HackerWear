// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

    let pincodes = {
        421004 : ["Ulhasnagar", "Maharashtra"],
        110001 : ["Delhi", "Delhi"],
        230532 : ["Ulhasnagar", "Maharashtra"],
        721301 : ["Ulhasnagar", "Maharashtra"],
        530068 : ["Ulhasnagar", "Maharashtra"],
    }

    res.status(200).json(pincodes)
}
