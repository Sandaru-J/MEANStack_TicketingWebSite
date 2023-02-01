const chai = require('chai');
const chaiHttp = require('chai-http');
// const server = require('../server');
const server = require('../app');
const customer = require('../models/cutomer');

chai.use(chaiHttp)

suite("Testing Customer",()=>{
    test('Testing Customer Adding',(done)=>{
        chai.request(server)
        .post('/api/booking')
        .send({
            name: "Test Name",
            email: "testCusmail@gmail.com",
            nic:"Test NIC",
            telephone: 777
    })
    .end((err,res)=>{
        chai.assert.equal(res.status,500);
        done()
    })
    });
    test('Testing Customer Required',(done)=>{
        chai.request(server)
        .post('/api/booking')
        .send({
            name: "",
            email: "testCusmail@gmail.com",
            nic:"Test NIC",
            telephone: 777
    })
    .end((err,res)=>{
        chai.assert.equal(res.status,500);
        done()
    })
    });

    suiteTeardown(async()=>{
        await customer.deleteMany({});
    })
})