import "mocha";
import * as sinon from "sinon";
import {expect} from "chai";
import * as admin from "firebase-admin";
import functionsTest from "firebase-functions-test";

// Initialize the test environment
const testEnv = functionsTest();

describe("Auth Functions", () => {
  let adminStub: sinon.SinonStub;

  before(() => {
    adminStub = sinon.stub(admin, "initializeApp");
  });

  after(() => {
    adminStub.restore();
    testEnv.cleanup();
  });

  describe("sendMagicLink", () => {
    let sendMagicLink: any;
    let dbStub: sinon.SinonStub;
    let collectionStub: sinon.SinonStub;
    let docStub: sinon.SinonStub;
    let setStub: sinon.SinonStub;

    beforeEach(() => {
      // Stub Firestore
      setStub = sinon.stub().resolves();
      docStub = sinon.stub().returns({set: setStub});
      collectionStub = sinon.stub().returns({doc: docStub});
      dbStub = sinon.stub(admin, "firestore").get(() => () => ({collection: collectionStub}));

      // Import the function after stubbing
      sendMagicLink = require("../authMagicLink").sendMagicLink;
    });

    afterEach(() => {
      dbStub.restore();
    });

    it("should send a magic link to a valid email", async () => {
      const wrapped = testEnv.wrap(sendMagicLink);
      const data = {email: "test@example.com"};

      const result = await wrapped(data);

      expect(result.success).to.be.true;
      expect(setStub.calledOnce).to.be.true;
      expect(collectionStub.calledWith("magic_links")).to.be.true;
    });

    it("should fail for an invalid email", async () => {
      const wrapped = testEnv.wrap(sendMagicLink);
      const data = {email: "invalid-email"};

      try {
        await wrapped(data);
      } catch (e: any) {
        expect(e.code).to.equal("invalid-argument");
      }
    });
  });
});
