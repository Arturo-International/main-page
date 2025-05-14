const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "arturointernational01@gmail.com", //Cambiar por el verdadero correo origen
        pass: "yufj cful hdxx znqa", //cambiar por la contraseña del origen
    },
});

app.post('/send-cart', (req, res) => {
    const { cart, userMail } = req.body;

    if (!userMail || !cart){
        return res.status(400).json({ success: false, message: "Datos Insuficientes" });
    }

    const mailOptions = {
        from: "arturointernational01@gmail.com", //Cambiar por el verdadero correo origen
        to: ["arturointernational01@gmail.com", userMail], //Cambiar por el verdadero correo origen
        subject: "Resumen de tu Carrito de Compras",
        text: `Aquí está el resumen de tu carrito de compras:\n\n${cart}\n\nGracias Por Su compra!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false });
        }
        console.log("Correo Enviado: " + info.response);
        res.status(200).json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server Listening at http://localhost:${port}`)
})