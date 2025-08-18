import "mocha";
import * as sinon from "sinon";
import { expect } from "chai";
import * as admin from "firebase-admin";
import functionsTest from "firebase-functions-test";
import { sendMagicLink } from "../auth/sendMagicLink";

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
    let dbStub: sinon.SinonStub;
    let collectionStub: sinon.SinonStub;
    let docStub: sinon.SinonStub;
    let setStub: sinon.SinonStub;

    beforeEach(() => {
      // Stub Firestore
      setStub = sinon.stub().resolves();
      docStub = sinon.stub().returns({ set: setStub });
      collectionStub = sinon.stub().returns({ doc: docStub });
      dbStub = sinon
        .stub(admin, "firestore")
        .get(() => () => ({ collection: collectionStub }));
    });

    afterEach(() => {
      dbStub.restore();
    });

    it("should send a magic link to a valid email", async () => {
      const wrapped = testEnv.wrap(sendMagicLink);
      const data = { email: "test@example.com" };

      const result = await wrapped(data);

      expect(result.success).to.be.true;
      expect(setStub.calledOnce).to.be.true;
      expect(collectionStub.calledWith("magic_links")).to.be.true;
    });

    it("should fail for an invalid email", async () => {
      const wrapped = testEnv.wrap(sendMagicLink);
      const data = { email: "invalid-email" };

      try {
        await wrapped(data);
        // Should not reach here
        expect.fail("Expected function to throw an error");
      } catch (e: unknown) {
        const error = e as { code: string };
        expect(error.code).to.equal("invalid-argument");
      }
    });
  });
});
