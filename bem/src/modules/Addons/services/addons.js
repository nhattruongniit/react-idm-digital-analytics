import requestAddon from '../../../services/requestAddon';

export const getMyAddons = () => {
  return requestAddon.get('/add-ons', {
    showSpinner: true
  })
}

export const getAddonsInstalled = userId => {
  return requestAddon.get(`/user/add-ons/application/${userId}`, {
    showSpinner: true
  })
}

export const getAllAddons = userId => {
  return requestAddon.get(`/add-ons/application/${userId}`, {
    showSpinner: true
  })
}

export const installAddon = id => {
  return requestAddon.post('/add-ons/install', 
    {
      id
    }, 
    {
      showSpinner: true
    }
  )
}


export async function fetchAddons() {

  // Make API call here

  // https://api-dashboard.dev.usonia.io/docs/




  return [
    {
      id: 1,
      name: 'Thermal',
      usageStatus: 'beta',
      // url: "http://localhost:1337/",
      url: "https://thermal.addons.usonialabs.com/",
      contexts: [
        "idf-api",
        "idf-pusher",
        "idf-document",
        "3d-editor"
      ],
      size: { "width": 350 + 315, "height": 650 },
      isRunning: true,
      isActive: false
    },
    {
      id: 2,
      name: 'RunSimulation',
      usageStatus: 'beta',
      url: "https://idf-simulations.addons.usonialabs.com/",
      // url: "http://localhost:1337/",
      contexts: [
        "idf-api",
        "idf-pusher",
        "idf-document"
      ],
      size: { "width": 637, "height": 545 },
      isRunning: true,
      isActive: false
    },
    // {
    //   id: 3,
    //   name: 'Optimizer',
    //   usageStatus: 'beta',
    //   url: "https://idf-simulations.addons.usonialabs.com/",
    //   // url: "http://localhost:1337/",
    //   contexts: [
    //     "idf-api",
    //     "idf-pusher",
    //     "idf-document"
    //   ],
    //   size: { width: 200, height: 400 },
    //   isRunning: true,
    //   isActive: false
    // },
    {
      id: 4,
      name: 'IDF Templates',
      usageStatus: 'beta',
      // url: "http://localhost:3000/",
      url: "https://idf-templates.addons.usonialabs.com/",
      contexts: [
        "idf-api",
      ],
      size: { width: 500, height: 500 },
      isRunning: true,
      isActive: false
    },




    {
      id: 5,
      name: 'IBM Chart Editor',
      usageStatus: 'beta',
      // url: "http://localhost:3002/",
      url: "https://ibm-charts.addons.usonialabs.com/",
      contexts: [
        "idf-api",
        "simulation",
        "chart",
      ],
      size: { width: 500, height: 500 },
      isRunning: true,
      isActive: false
    },



    // http://localhost:3002/
  ];
}
