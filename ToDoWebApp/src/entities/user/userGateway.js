import axios from "axios";

export const fetchUsers = params => axios.get("https://randomuser.me/api/", params);
