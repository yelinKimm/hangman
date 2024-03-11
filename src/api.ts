import axios from "axios";

const BASE_URL = 'https://random-word-api.herokuapp.com';

export async function getRandomWords(count: number) {
  return fetch(`${BASE_URL}/word?number=${count}`)
  .then(response => response.json());
}