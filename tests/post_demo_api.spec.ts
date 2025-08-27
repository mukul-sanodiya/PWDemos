import { test, expect} from '@playwright/test';

//test block... request feature from playwright
test("Create Post request using static body", async ({ request }) => {

    // request body and pass static data
  const resquestBody = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01",
    },
    additionalneeds: "Breakfast",
  }

// send post request(url, {data. dataName}) and store in variable respone. every thing store status code, header etc...
  const respone= await request.post("https://restful-booker.herokuapp.com/booking", {data:resquestBody});

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
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    additionalneeds: "Breakfast",
  });

  //Validate Nested json data
  expect(booking.bookingdates).toMatchObject({
      checkin: "2018-01-01",
      checkout: "2019-01-01",
   });
})