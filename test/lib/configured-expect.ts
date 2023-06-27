import * as chai from "chai";
import chaiPromise from "chai-as-promised";
import sinonChai from "sinon-chai";

chai.use(chaiPromise);
chai.use(sinonChai);

export const expect = chai.expect;
