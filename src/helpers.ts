export function validURL(str: string): boolean {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain
      "((\\d{1,3}\\.){3}\\d{1,3}))" + //ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port & path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // querystring
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment
  return !!pattern.test(str);
}

