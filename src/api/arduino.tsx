import axios from "axios"

const ip = "192.168.97.225";

export async function getPeso() {
  try {
    const peso = await axios.get(`http://${ip}/peso`);
    return Number(peso.data);
  }
  catch (e) {
    console.log(e);
    return 0;
  }
}