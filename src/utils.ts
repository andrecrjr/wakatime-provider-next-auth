import { TokenSet } from "next-auth";

export const tokenConverter = (tokenString:string):TokenSet =>{

    let tokenArray = tokenString.split("&");
    let tokenObject:TokenSet = {}
    // Itera sobre o array de substrings
    for (let tokenParam of tokenArray) {
    // Divide cada substring em um array de duas partes, usando o caractere = como separador
        let [key, value] = tokenParam.split("=");
        // Atribui o valor ao objeto do tipo TokenSetParameters, usando a chave correspondente
        tokenObject[key] = value;
    }
    return tokenObject
}