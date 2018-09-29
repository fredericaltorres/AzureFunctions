import axios from 'axios';
import tracer from '../../common/Tracer';

const Config = {
    AZURE : true
};

const serviceUrl = Config.AZURE ?
    "https://azurefunctionsfred.azurewebsites.net/api/todo"
:
    "http://localhost:7071/api/todo"
;

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
    post = async (url, data, options) => {        
        tracer.log(`HTTP POST ${url}`);
        return axios({ url,  method:'post', data, ...options });
    }
    delete = async (url, options) => {        
        tracer.log(`HTTP DELETE ${url}`);
        return axios({ url,  method:'delete', ...options });
    }


    getItem = async () => {
        return this.get(serviceUrl);
    }
    updateItem = async (todoItem) => {
        const url = `${serviceUrl}/${todoItem.id}`;
        return this.put(url, todoItem);
    }
    addItem = async (todoItem) => {
        const url = `${serviceUrl}`;
        return this.post(url, todoItem);
    }
    deleteItem = async (todoItem) => {
        const url = `${serviceUrl}/${todoItem.id}`;
        return this.delete(url, todoItem);
    }
}

export default new TodoService();