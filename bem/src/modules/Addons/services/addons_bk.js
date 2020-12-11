import faker from 'faker';
import _ from 'lodash';

export async function fetchAvailableAddons() {
  return generateFakeAddons(300);
}

function generateFakeAddons(number) {
  return _.range(number).map(number => {
    const categoryId = faker.random.number(19);
    return {
      id: number,
      name: faker.commerce.productName(),
      categoryId,
      description: 'Just a simple addon that will do anything to you.',
      releasedAt: faker.date.recent(100),
      shortDescription: 'Grid & Shading Generator',
      author: 'David Tran',
      language: 'English',
      website: 'https://usonia.com',
      support: 'https://support.usonia.com',
      tags: ['external shading', 'shading', 'EMS'],
      contexts: ['3d-editor', 'idf-editor'],
      isOwner: faker.random.number(10) >= 8,
      installed: faker.random.number(10) >= 8,
      image: faker.image.abstract(50, 50),
    };
  });
}

export async function fetchCategories() {
  return _.range(10).map(number => ({
    id: number,
    name: faker.commerce.department(),
  }));
}

export async function fetchAddonTree() {
  const pms = [
    fetchAvailableAddons(),
    fetchCategories()
  ];
  const promiseResults = await Promise.all(pms);
  const addons = promiseResults[0];
  const categories = promiseResults[1];
  const installedAddons = addons.filter(item => item.installed);
  const myAddons = addons.filter(item => item.isOwner);
  const addonsObject = {};
  addons.forEach(addon => addonsObject[addon.id] = addon);

  const categoryTree = [
    {
      id: 'installedAddons',
      name: 'Installed',
      type: 'container',
      items: mergeAddonsToCategories(installedAddons, categories),
      count: installedAddons.length,
      root: true,
    },
    {
      id: 'myAddons',
      name: 'My add-ons',
      type: 'container',
      items: mergeAddonsToCategories(myAddons, categories),
      count: myAddons.length,
      root: true,
    },
    {
      id: 'all',
      name: 'All',
      type: 'container',
      items: mergeAddonsToCategories(addons, categories),
      count: addons.length,
      root: true,
    }
  ];

  return {
    categoryTree,
    addons: addonsObject,
  }
}

function mergeAddonsToCategories(addons, categories) {
  return categories.map(category => {
    const addonIds = addons.filter(addon => addon.categoryId === category.id).map(addon => addon.id);
    return {
      id: category.id,
      key: category.key,
      name: category.name,
      itemIds: addonIds,
      count: addonIds.length,
      type: 'group',
    };
  });
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
      url: "https://thermal.usonialabs.com/",
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
      url: "https://idf-simulations.usonialabs.com/",
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
    {
      id: 3,
      name: 'Optimizer',
      usageStatus: 'beta',
      url: "https://idf-simulations.usonialabs.com/",
      // url: "http://localhost:1337/",
      contexts: [
        "idf-api",
        "idf-pusher",
        "idf-document"
      ],
      size: { width: 200, height: 400 },
      isRunning: true,
      isActive: false
    }
  ];
}
