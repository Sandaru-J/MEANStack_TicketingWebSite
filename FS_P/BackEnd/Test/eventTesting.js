const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../server');
const server = require('../app');
const eventSchema = require('../models/event');

chai.use(chaiHttp)

suite("Testing Event Adding",()=>{
    test("Testing Event Adding" ,()=>{
        chai.request(server)
            .post('/api/event')
            .send({
            title: "Test Event",
            description: "Test Event Description",
            date: "2021-05-30T00:00:00.000Z",
            imagePath: "http://localhost:3000/images/1622209810991.jpg",
            category: "Test Category",
            location: "Test Location",
            capacity: 100,
            organization: "Test Organization",
            TicketC1: "Test TicketC1",
            TicketP1: 1000,
            TicketQ1: 100,
    
            })
            .end((err, res) =>{
            chai.assert.equal(res.status, 201);
            chai.expect(res.body).to.have.property(`title`);
            chai.expect(res.body).to.have.property(`description`);
            chai.expect(res.body).to.have.property(`date`);
            chai.expect(res.body).to.have.property(`imagePath`);
            chai.expect(res.body).to.have.property(`category`);
            chai.expect(res.body).to.have.property(`location`);
            chai.expect(res.body).to.have.property(`capacity`);
            chai.expect(res.body).to.have.property(`organization`);
            chai.expect(res.body).to.have.property(`TicketC1`);
            chai.expect(res.body).to.have.property(`TicketP1`);
            chai.expect(res.body).to.have.property(`TicketQ1`);
            });
        });
}
)


