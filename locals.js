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
  },
  meta: {
    title: "Dynamic Natural Medicine",
    description: "",
    image: "http://www.dynamicnaturalmedicine.com/assets/images/headshot.png",
    keywords: "",
    twitter: {

    },
    facebook: {
      page_id: "585338738223450",
      type: "business.business",
      site_name: "Dynamic Natural Medicine",
      street_address: "",
      locality: "",
      postal_code: "",
      country_name: "US",
      image: ""
    },
    googleplus: {

    }
  }
};

function oneLineAddress(address) {
  return address.line1 + " | " + address.line2 + ", " + address.city + ", " + address.state + ", " + address.zip;
}

locals.info.address.oneline = oneLineAddress(locals.info.address);

module.exports = locals;