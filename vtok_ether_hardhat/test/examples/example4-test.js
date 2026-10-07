const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Example4 Event", () => {

    var event;

    beforeEach(async () => {
        const Event = await ethers.getContractFactory("Event");
        event = await Event.deploy();

        await event.deployed();
    });

    describe("Event Test", async () => {
        
        it("emit Text", async () => {

            const [onwer] = await ethers.getSigners();

            // chai test 환경에서 emit event 테스트하기
            await expect(event.test())
                .to.emit(event, "Log")
                .withArgs(onwer.address, "Hello world!")
                .to.emit(event, "Log")
                .withArgs(onwer.address, "Hello EVM!!");

        });
    });

});