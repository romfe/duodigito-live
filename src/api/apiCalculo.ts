import axios from 'axios';

export default axios.create({
  //baseURL: "http://localhost:8080/"
  // link da API rodando no heroku:
  baseURL: "https://heroku-springboot-backend-duo.herokuapp.com/"
});