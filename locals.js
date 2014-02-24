var locals = {
  info: {
    address: {
      line1: "3216 NE 45th PL",
      line2: "Suite 212",
      city: "Seattle",
      state: "WA",
      zip: "98105"
    },
    phone: "2065188938",
    phoneFormatted: "(206) 518-8938",
    email: "info@dynamicnaturalmedicine.com",

    links: {
      patient: {
        portal: "//charmphr.com/login.sas?FACILITY=G08677zx67020x6702cax771PI703mc0880kx6700kx7875m",
        dispensary: "//www.healthwavehq.com/welcome/jread"
      }
    }
  }
};

function oneLineAddress(address) {
  return address.line1 + " | " + address.line2 + ", " + address.city + ", " + address.state + ", " + address.zip;
}

locals.info.address.oneline = oneLineAddress(locals.info.address);

module.exports = locals;