const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../server');
const server = require('../app');
const eventSchema = require('../models/event');

chai.use(chaiHttp)
suite("Testing Event",()=>{
    let event
    suiteSetup(async()=>{
        
         event=await eventSchema.create({
            title: "Test Event new",
            description: "Test Event Description",
            date: "2021-05-30T00:00:00.000Z",
            category: "Test Category",
            location: "Test Location",
            capacity: 100,
            organization: "Test Organization",
            TicketC1: "Test TicketC1",
            TicketP1: 1000,
            TicketQ1: 100,
         })

}
)
    test("Testing Event Adding" ,()=>{
        chai.request(server)
            .post('/api/event')
            .send({
            title: "Test Event",
            description: "Test Event Description",
            date: "2021-05-30T00:00:00.000Z",
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
            chai.assert.equal(res.body.message, "Event Addeded Successfully");
            });
        });
        test('Testing Event Fetching',()=>{
            chai.request(server)
            .get('/api/event')
            .end((err,res)=>{
    
                chai.assert.equal(res.status,200);
                chai.expect(res.body.event).to.be.an('array');
                
            })
        });
        test('Testing Event Deletion',()=>{
            chai.request(server)
            .delete('/api/event/'+event._id)
            .end((err,res)=>{

                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('object');
            
            })
        })

        test('Testing Event Updating',async()=>{   
           
            chai.request(server)
            .put('/api/event/'+event._id)
            .send({
                title: "Test Evdsfent",
                description: "Test Efsvent Description",
                date: "2021-05-30T00:00:00.000Z",
                category: "Test Catedfgory",
                location: "Test Locastion",
                capacity: 100,
                organization: "Test Orgafsnization",
                TicketC1: "Test TickeasfdtC1",
                TicketP1: 10300,
                TicketQ1: 1400,
            })
            .end((err,res)=>{

                chai.expect(res).to.have.status(200);
                //chai.expect(res.body).to.be.an('object');
            })

    })

    suiteTeardown(async()=>{
        await eventSchema.deleteMany({});
    })

});
