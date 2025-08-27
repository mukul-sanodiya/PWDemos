import {test, expect} from "@playwright/test"

test("Get Booking details by path-param", async({request})=>{

    // By passing path param
    const bookingId=1;

    //sending get response
    const response=await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);

    //parse the response and print
    const responeBody=await response.json();
    //console.log(responeBody);

    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);

});