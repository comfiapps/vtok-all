
const { expect } = require("chai");
const { ethers } = require("hardhat");

async function getCount(counter) {

    var count = await counter.get();
    console.log("current count = " + count);

    return count;
}

describe("Example1", function() {

    it("Example1 Counter", async function() {

        //const [owner] = ethers.getSigners()

        const Counter = await ethers.getContractFactory("Counter");
        const counter = await Counter.deploy()

        await counter.deployed();

        var count = await getCount(counter);
        expect(count).to.equal(0);

        var tx = await counter.inc();
        await tx.wait();

        count = await getCount(counter);
        expect(count).to.equal(1);

        var tx = await counter.inc();
        await tx.wait();

        var tx = await counter.inc();
        await tx.wait();

        count = await getCount(counter);
        expect(count).to.equal(3);

        var tx = await counter.dec();
        await tx.wait();

        count = await getCount(counter);
        expect(count).to.equal(2);
    });

    it("Example1 Variables", async function() {

        const Variables = await ethers.getContractFactory("Variables");
        const variables = await Variables.deploy();

        await variables.deployed();

        await variables.doSomething();

        const value = await variables.MY_CONST_VALUE;
        console.log(value);
    });
});