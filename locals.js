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
    description: "Dr. Jennifer S Read ND LAc, naturopathic doctor and acupuncturist in Seattle, WA, specializes in naturopathic pediatrics, fertility and women's health",
    image: "http://www.dynamicnaturalmedicine.com/assets/images/headshot.png",
    //keywords: "Dynamic Natural Medicine,Jennifer Read,Naturopath,Acupuncture,ND,LAc,Pediatric,Fertility,Women's Health",
    keywords: "",
    author: "Dr. Jennifer S Read ND LAc",
    twitter: {

    },
    facebook: {
      admins: "13804384,13801828",
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
      url: "https://plus.google.com/+DynamicNaturalMedicine"
    }
  }
};

function oneLineAddress(address) {
  return address.line1 + " | " + address.line2 + ", " + address.city + ", " + address.state + ", " + address.zip;
}

locals.info.address.oneline = oneLineAddress(locals.info.address);

module.exports = locals;