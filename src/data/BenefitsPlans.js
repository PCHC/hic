const BenefitsPlans = [
  {
    "key": "ppohome",
    "name": "PPO Home Plan",
    "isHSA": false,
    "costs": {
      "fullTime": {
        "employee": 88.60,
        "spouse": 90.15,
        "children": 318.65,
        "family": 18.43
      },
      "partTime": {
        "employee": 252.06,
        "spouse": 195.92,
        "children": 424.42,
        "family": 28.04
      },
    },
  },
  {
    "key": "ppochoice",
    "name": "PPO Choice Plan",
    "isHSA": false,
    "costs": {
      "fullTime": {
        "employee": 110.75,
        "spouse": 112.68,
        "children": 398.31,
        "family": 23.04
      },
      "partTime": {
        "employee": 274.21,
        "spouse": 218.45,
        "children": 504.08,
        "family": 32.66
      },
    },
  },
  {
    "key": "hsahome",
    "name": "HDHP/HSA Home Plan",
    "isHSA": true,
    "costs": {
      "fullTime": {
        "employee": 40.29,
        "spouse": 48.17,
        "children": 265.47,
        "family": 16.94
      },
      "partTime": {
        "employee": 203.75,
        "spouse": 153.94,
        "children": 371.24,
        "family": 26.55
      },
    },
  },
  {
    "key": "hsachoice",
    "name": "HSHP/HSA Choice Plan",
    "isHSA": true,
    "costs": {
      "fullTime": {
        "employee": 15.00,
        "spouse": 19.88,
        "children": 145.78,
        "family": -16.91
      },
      "partTime": {
        "employee": 178.46,
        "spouse": 125.65,
        "children": 251.55,
        "family": -7.29
      },
    },
  },
]

export default BenefitsPlans;
