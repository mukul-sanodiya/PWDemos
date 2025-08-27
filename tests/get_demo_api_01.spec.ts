import {test, expect} from "@playwright/test"

test("Get Booking details by path-param", async({request})=>{

    // By passing Query  param
    const firstname="Jim";
    const lastname="Brown";

    //sending get response
    const response=await request.get("https://restful-booker.herokuapp.com/booking", 
        {params:{firstname, lastname}});

    //parse the response and print
    const responeBody=await response.json();
    console.log(responeBody);

    // check and status code
    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);

    for(const item of responeBody)
    {
        expect(item).toHaveProperty("bookingid");
        expect(typeof item.bookingid).toBe("number");
        expect(item.bookingid).toBeGreaterThan(0);
    }

})