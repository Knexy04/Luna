import https from "https";

export const wakeServer = () => {

    function sendRequestToServer() {
        const options = {
            hostname: process.env.HOST,
            port: 443,
            path: '/phonecodes',
            method: 'DELETE',
        };

        const req = https.request(options, (res) => {
            console.log(`Status code: ${res.statusCode}`);
        });


        req.on('error', (error) => {
            console.error(`Error sending request: ${error}`);
        });

        req.end();
    }

    setInterval(sendRequestToServer, 200000);

}