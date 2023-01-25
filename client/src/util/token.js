import { getIdRandom } from "./idGenerator";

export const generateToken = () => {
  let random = getIdRandom() + "";
  random = random.replace(".", "");
  random = random.split("");

  random = random.map((item, index) => {
    return index % 2 === 0 ? item : item + "d";
  });

  random = random.join("");

  console.log(random);
};
