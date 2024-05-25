import awsIot from "aws-iot-device-sdk";
import path from 'path';

const device = new awsIot.device({
    keyPath: path.join(process.cwd(), "/key/44bdbb017ed61e3180473d7562a7219625694010abfe0315ab96632a7fe8402b-private.pem.key"),
    certPath: path.join(process.cwd(), "/key/44bdbb017ed61e3180473d7562a7219625694010abfe0315ab96632a7fe8402b-certificate.pem.crt"),
    caPath: path.join(process.cwd(), "/key/AmazonRootCA1.pem"),
    clientId: "sveltekit",
    host: "a27eliy2xg4c5e-ats.iot.us-east-1.amazonaws.com",
    port: 8883
});

device.on('connect', function() {
    console.log('connect');
});

export { device };