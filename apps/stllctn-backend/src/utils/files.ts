export const getFileLocationStringFromHashString = (hash_string: string) => {
  return hash_string.substring(0, 2) + "/"
    + hash_string.substring(2, 4) + "/"
    + hash_string.substring(4, 6) + "/"
    // + hash_string
}