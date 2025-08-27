import { test, expect} from '@playwright/test'
import {faker} from "@faker-js/faker"
import {DateTime} from "luxon"

//test block... request feature from playwright
test("Create post api dynamic data", async ({ request }) => {


  //data generation by faker
  const firstname=faker.person.firstName();
  const lastname=faker.person.lastName();
  const totalprice=faker.number.int({min:100, max:10000});
  const depositpaid=faker.datatype.boolean();

  const checkindate=DateTime.now().toFormat("yyyy-MM-dd");
  const checkoutdate=DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");

  const additionalneeds="super bowls";

// Random and dynamic data (faker)
// and install faker  npm install @faker-js/faker
// and for data install luxon lib.   npm install luxon  for data

  const requestBody = {
    firstname: firstname,
    lastname: lastname,
    totalprice: totalprice,
    depositpaid: depositpaid,
    bookingdates: {
      checkin: checkindate,
      checkout: checkoutdate,
    },
    additionalneeds: additionalneeds,
  }
  

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