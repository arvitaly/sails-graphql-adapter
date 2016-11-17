declare var pit: (expectation: string, assertion: () => any) => void;
// tslint:disable:no-string-literal
global["pit"] = (expectation: string, assertion: () => any) => {
    it(expectation, (done) => {
        Promise.resolve(assertion()).then(() => {
            done();
        }).catch((e) => {
            fail(e);
            done();
        });
    });
};
