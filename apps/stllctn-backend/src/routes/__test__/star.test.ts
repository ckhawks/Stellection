import request from 'supertest';

import { app } from '../../index.js';

describe("star", () => {
  describe("POST /v1/stars", () => {
    it("should create a star", async () => {
      const star_title = "hello!!!";

      const response = await request(app)
        .post('/v1/stars')
        .send({"star_title": star_title});
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({data: { star_title: star_title }});
    })
  })

  // describe("GET /v1/stars", () => {
  //   it("should return all stars", async () => {
  //     const star1 = {
  //       "star_title": "hello"
  //     }
  //     const star2 = {
  //       "star_title": "hello2"
  //     }
      
  //     // write stars to db

  //     const response = await request(app)
  //       .get('/v1/stars')
  //       .send();
  //     expect(response.status).toEqual(200);
  //     expect(response.body).toMatchObject([star1, star2]) // change expected format
  //   })
  // })
})