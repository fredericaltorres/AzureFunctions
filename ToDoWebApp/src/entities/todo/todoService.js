import axios from 'axios';
import tracer from '../../common/Tracer';

const serviceUrl = "http://localhost:7071/api/todo";

// https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
class TodoService {

    constructor() {
        this.name = "TodoService";
    }
    get = async (url, options) => {
        tracer.log(`HTTP GET ${url}`);
        return axios({ url, ...options });
    }
    put = async (url, data, options) => {        
        tracer.log(`HTTP PUT ${url}`);
        return axios({ url,  method:'put', data, ...options });
    }
    getItem = async () => {
        return this.get(serviceUrl);
    }
    updateItem = async (todoItem) => {
        const url = `${serviceUrl}/${todoItem.id}`;
        return this.put(url, todoItem);
    }
}

export default new TodoService();