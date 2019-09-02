module.exports.tests = function() {
  describe('check if exist specific ids', function () {
    it('should find header with id="name"', function () {
        let element = document.querySelector("#name");
        chai.assert.isNotNull(element);
    });
    it('should find header with id="contacts"', function () {
        let element = document.querySelector("#contacts");
        chai.assert.isNotNull(element);
    });
    it('should find header with id="summary"', function () {
        let element = document.querySelector("#summary");
        chai.assert.isNotNull(element);
    });
    it('should find header with id="skills"', function () {
        let element = document.querySelector("#skills");
        chai.assert.isNotNull(element);
    });
    it('should find header with id="experience"', function () {
        let element = document.querySelector("#experience");
        chai.assert.isNotNull(element);
    });
    it('should find header with id="education"', function () {
        let element = document.querySelector("#education");
        chai.assert.isNotNull(element);
    });
    it('should find header with id="english-level"', function () {
        let element = document.querySelector("#english-level");
        chai.assert.isNotNull(element);
    });
    it('should find header with id="experience"', function () {
        let element = document.querySelector("#experience");
        chai.assert.isNotNull(element);
    });

  });
  /*
  describe('sum', function () {
    it('should return sum of arguments', function () {
      chai.expect(sum(1,2)).to.equal(3);
    });
  });
  describe('mul', function () {
    it('should return multiplication of arguments', function () {
      chai.expect(mul(2,2)).to.equal(4);
    });
  });
  describe('one paragraph', function () {
    it('should find one <p> tag', function () {
        let element = document.getElementById("firstHeading");
        chai.assert.isNotNull(element);
    });
  });
  */

}  

