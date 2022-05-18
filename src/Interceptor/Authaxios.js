import axios from "axios";
import { baseURL } from "./baseURL";

const Authaxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authentication: "Empty",
  },
});

export default Authaxios;
