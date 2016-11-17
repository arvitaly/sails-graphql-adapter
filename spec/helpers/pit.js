// tslint:disable:no-string-literal
global["pit"] = (expectation, assertion) => {
    it(expectation, (done) => {
        Promise.resolve(assertion()).then(() => {
            done();
        }).catch((e) => {
            fail(e);
            done();
        });
    });
};
