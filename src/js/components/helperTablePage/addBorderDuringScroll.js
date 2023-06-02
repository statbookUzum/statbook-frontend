import SimpleBar from "simplebar";

const tableWrapperList = document.querySelectorAll('.table-wrapper');

tableWrapperList.forEach(tableWrapper => {
  const simpleBar = new SimpleBar(tableWrapper);

  simpleBar.getScrollElement().addEventListener('scroll', () => {
    const scrollDistance = simpleBar.getScrollElement().scrollLeft;

    if (scrollDistance >= 20 && !(tableWrapper.matches('.scrolling'))) {
      tableWrapper.classList.add('scrolling');
    }

    if (scrollDistance < 20 && tableWrapper.matches('.scrolling')) {
      tableWrapper.classList.remove('scrolling');
    }
  });
});


