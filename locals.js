var locals = {
  info: {
    addresses: {
      redmond: {
        title: "Redmond",
        line1: "16563 Redmond Way",
        line2: "Suite D",
        city: "Redmond",
        state: "WA",
        zip: "98052"
      },
      snohomish: {
        title: "Snohomish",
        line1: "1830 Bickford Avenue",
        line2: "Suite 201",
        city: "Snohomish",
        state: "WA",
        zip: "98290"
      }
    },
    phone: "4252985366",
    phoneFormatted: "(425) 298-5366",
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
    description: "Dr. Jennifer S Read ND LAc of Dynamic Natural Medicine, naturopathic doctor/acupuncturist in Seattle WA, specializes in pediatrics, fertility, women's health",
    image: "http://www.dynamicnaturalmedicine.com/assets/images/DNM_Logo_Flower_Color_HR_Fin_052014.png",
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
      url: "https://plus.google.com/+Dynamicnaturalmedicine"
    }
  }
};

function oneLineAddress(address) {
  return address.line1 + " | " + address.line2 + ", " + address.city + ", " + address.state + ", " + address.zip;
}

locals.info.addresses.redmond.oneline = oneLineAddress(locals.info.addresses.redmond);
locals.info.addresses.snohomish.oneline = oneLineAddress(locals.info.addresses.snohomish);

module.exports = locals;