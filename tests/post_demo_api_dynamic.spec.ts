import { test, expect} from '@playwright/test'

// file system or read data file
import fs from 'fs'

//test block... request feature from playwright
test("Create post api dynamic data", async ({ request }) => {

// read data from json file
const jsonFile="testdata/post_api_demo_data.json";
const requestBody:any=JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  

// send post request(url, {data. dataName}) and store in variable respone. every thing store status code, header etc...
  const respone= await request.post("https://restful-booker.herokuapp.com/booking", {data:requestBody});

  // Extracted respone
  const responeBody=await respone.json();

  console.log(responeBody);

  //Validate data status
  expect(respone.ok()).toBeTruthy();
  expect(respone.status()).toBe(200);

  //Validate Response body
  expect(responeBody).toHaveProperty("bookingid")
  expect(responeBody).toHaveProperty("booking")
  expect(responeBody).toHaveProperty("booking.additionalneeds")

  //Validate booking details
   const booking = responeBody.booking;
  expect(booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: requestBody.depositpaid,
    additionalneeds: requestBody.additionalneeds,
  });

  //Validate Nested json data
  expect(booking.bookingdates).toMatchObject({
      checkin: requestBody.bookingdates.checkin,
      checkout: requestBody.bookingdates.checkout,
   });
});