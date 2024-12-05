import axios from "axios"

let ip = "192.168.97.225";

export async function getPeso() {
  try {
    let peso = await axios.get(`http://${ip}/peso`);
    return Number(peso.data);
  }
  catch (e) {
    console.log(e);
    return 0;
  }
}