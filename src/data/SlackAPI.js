import axios from 'axios';

class SlackAPI {
    constructor(url) {
        this.url = 'https://hooks.slack.com/services/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';
        if (url) {
            this.url = url;
        }
        this.message = undefined;
    }

    send(notificationTitle, channel = 'general', title, message) {
        const content = JSON.stringify({
            title,
            channel,
            text: notificationTitle,
            attachments: { '': { title, text: message } }
        });
        console.log(content);
        return axios({
            method: 'post',
            url: this.url,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            data: `payload=${content}`
        })
            .then(response => {
                console.log(response);
                return response.data;
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }
}

export default SlackAPI;
