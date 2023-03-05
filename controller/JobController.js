import axios from "axios";

export class JobController {
    async job(req, res) {
        let param = '';
        let count = 0;
        for (const propName in req.query) {
            if (req.query.hasOwnProperty(propName)) {
                if(count > 0) {
                    param += '&' + propName + '=' + req.query[propName];
                }else{
                    param += '?' + propName + '=' + req.query[propName];
                }
                count++;
            }
        }

        try {
            const headers = {'User-Agent': 'axios/0.21.4'};
            const url = process.env.ENDPOINT_URL + '.json' + param;
            const response = await axios.get(url, {headers});

            res.status(200).json(response.data);
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }

    async getJob(req, res) {
        try {
            const jobId = req.params.id;
            const url = process.env.ENDPOINT_URL + '/' + jobId;
            const headers = { 'User-Agent': 'axios/0.21.4' };
            const response = await axios.get(url, { headers });

            // Send the job detail data as a response payload
            res.json(response.data);
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
}