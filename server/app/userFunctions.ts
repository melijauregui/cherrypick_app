import { ErrorResponseSchemaType } from "@/schemas/standar-response";

export async function UpdateBrand(
  email: string,
  description: string,
  url: string
): Promise<ErrorResponseSchemaType> {
  // let res: CreateAccountSchemaResType;
  // const [existing]: any[] = await db.query(
  //   "SELECT * FROM brands WHERE email = ?",
  //   [email]
  // );
  // if (existing.length === 0) {
  //   res = {
  //     error: true,
  //     details: "Email not registered",
  //   };
  //   return res;
  // }

  // const parsedFormUpdate = QueryDbSchemaBrand.parse(existing);
  // if (description === undefined) {
  //   description = parsedFormUpdate[0].description;
  // }
  // if (url === undefined) {
  //   url = parsedFormUpdate[0].url;
  // }

  // const [result]: any = await db.query(
  //   "UPDATE brands SET description = ?, url = ? WHERE email = ?",
  //   [description, url, email]
  // );
  // console.log("brand updated");
  // res = {
  //   error: false,
  // };
  // return res;
  return { error: true, details: "Error updating brand" };
}
