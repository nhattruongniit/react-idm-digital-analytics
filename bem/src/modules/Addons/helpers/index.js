const mapCategoriesToAddons = (data, type) => {
  const visibleAddons = {};

  for (let item of data) {
    item.addOns[0].data.categories.map(category => {
      if(!visibleAddons[category]) {
        visibleAddons[category] = [];
      }
      visibleAddons[category].push(item);
      return null;
    })
  }

  const categories = Object.keys(visibleAddons).map((cate, idx) => {
    return {
      id: idx,
      name: cate,
      count: visibleAddons[cate].length,
      type
    }
  });

  return {
    categories,
    visibleAddons
  }

}

export const filterAllAddons = (data, type) => {
  const  { categories, visibleAddons } = mapCategoriesToAddons(data, type);

  return {
    categoriesAllAddons: categories,
    visibleAllAddons: visibleAddons
  }
}

export const filterAddonsInstalled = (data, type) => {
  const visibleAddons = {};
  for (let item of data) {
    item.current.data.categories.map(category => {
      if(!visibleAddons[category]) {
        visibleAddons[category] = [];
      }
      visibleAddons[category].push(item);
      return null;
    })
  }
  const categories = Object.keys(visibleAddons).map((cate, idx) => {
    return {
      id: idx,
      name: cate,
      count: visibleAddons[cate].length,
      type
    }
  });

  return {
    categoriesAddonsInstalled: categories,
    visibleAddonsInstalled: visibleAddons
  }
}

export const filterMyAddons = (data, type) => {
  const  { categories, visibleAddons } = mapCategoriesToAddons(data, type);

  return {
    categoriesMyAddons: categories,
    visibleMyAddons: visibleAddons
  }
}
