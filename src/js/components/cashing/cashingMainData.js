export function cashingIdMainData(pageType) {
  if (localStorage.getItem('idMainData')) {

    const obj = JSON.parse(localStorage.getItem('idMainData'));

    return obj[pageType];
  } else {
    let obj = {
      shop: {
        title: '',
        id: '',
      },
      category: {
        title: '',
        breadcrumbs: '',
        id: '',
      },
      product: {
        title: '',
        id: '',
      },
    }

    obj = JSON.stringify(obj);

    localStorage.setItem('idMainData', obj);
  }
}

export function updateCashingIdMainData(id, pageType, title, breadcrumbs) {
  const obj = JSON.parse(localStorage.getItem('idMainData'));


  obj[pageType].title = title;
  obj[pageType].id = id;
  obj[pageType].breadcrumbs = breadcrumbs;

  console.log(title);

  JSON.stringify(localStorage.setItem('idMainData', JSON.stringify(obj)));
}
