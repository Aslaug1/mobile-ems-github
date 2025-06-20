import axios from 'axios'

const API_URL = 'https://em2w.azurewebsites.net/api/'

// Set default axios settings
axios.defaults.baseURL = API_URL
axios.defaults.headers.common.Accept = 'application/json'

export default axios