const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../server');
const server = require('../app');
const eventSchema = require('../models/booking');

chai.use(chaiHttp)

suite("Testing Booking",()=>{  
    test("Testing Booking Adding" ,(done)=>{
        chai.request(server)
            .post('/api/booking')
            .send({
                name: "Test Name",
                email: "test@gmail.com",
                nic:"Test NIC",
                address: "Test Address",
                telephone: 777,
                eventID: "Test Event",
                total: 1000,
                eventName: "Test Event Name",
            })
            .end((err, res) =>{
            chai.assert.equal(res.status, 201);
            chai.assert.equal(res.body.message, "Booking Addeded Successfully");
            done()
            });
        });
        test("Testing Booking requird" ,(done)=>{
            chai.request(server)
                .post('/api/booking')
                .send({
                    name: "",
                    email: "test@gmail.com",
                    nic:"Test NIC",
                    address: "Test Address",
                    telephone: 777,
                    eventID: "Test Event",
                    total: 1000,
                    eventName: "Test Event Name",
                })
                .end((err, res) =>{
                chai.assert.equal(res.status, 500);
                
                done()
                });
            });
        test('Testing Booking Fetching',()=>{
            chai.request(server)
            .get('/api/booking')
            .end((err,res)=>{
                chai.assert.equal(res.status,200);
                chai.expect(res.body.booking).to.be.an('array');
            })
    });
    test('Booking Load Testing',async()=>{
        for(let i=0;i<20;i++){
            chai.request(server)
            .get('/api/booking')
            .end((err,res)=>{
                chai.assert.equal(res.status,200);
                chai.expect(res.body.booking).to.be.an('array');
            })
        }
    })
});