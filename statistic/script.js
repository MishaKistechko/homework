const Statistic = function () {
  var startStatistic = [0, 0, 0, 0, 0, 0, 0];

  const statisticList = JSON.parse(window.localStorage.getItem("statistic")) || [...startStatistic];
  var statisticForDay = [...startStatistic];
  var data = 0;
  statisticForDay.push(`${data}.02.23`);
  const tableStatistic = JSON.parse(window.localStorage.getItem("statisticForDay")) || [];

  this.statisticList = statisticList;
  this.statisticForDay = statisticForDay;

  const renderBody = (list, parentElementId) => {
    this.tableBody = document.querySelector(`#${parentElementId} > tbody`);
    html = [];
    list.forEach((element) => {
      html.push(`
          <td scope="row">${element}</td>
      `)
    });
    list === statisticList ? this.tableBody.innerHTML =  html.join("") : this.tableBody.innerHTML +=  html.join("");
  }

  const addStatistic = () => {
    const KIA = document.getElementById("KIA").value;
    statisticList[0] += parseInt(KIA) || 0;
    statisticForDay[0] = parseInt(KIA) || 0;
    document.getElementById("KIA").value = ``;

    const Tanks = document.getElementById("Tanks").value;
    statisticList[1] += parseInt(Tanks) || 0;
    statisticForDay[1] = parseInt(Tanks) || 0;
    document.getElementById("Tanks").value = ``;

    const airplanes = document.getElementById("airplanes").value;
    statisticList[2] += parseInt(airplanes) || 0;
    statisticForDay[2] = parseInt(airplanes) || 0;
    document.getElementById("airplanes").value = ``;


    const Helicopters = document.getElementById("Helicopters").value;
    statisticList[3] += parseInt(Helicopters) || 0;
    statisticForDay[3] = parseInt(Helicopters) || 0;
    document.getElementById("Helicopters").value = ``;


    const Guns = document.getElementById("Guns").value;
    statisticList[4] += parseInt(Guns) || 0;
    statisticForDay[4] = parseInt(Guns) || 0;
    document.getElementById("Guns").value = ``;


    const MLRS = document.getElementById("MLRS").value;
    statisticList[5] += parseInt(MLRS) || 0;
    statisticForDay[5] = parseInt(MLRS) || 0;
    document.getElementById("MLRS").value = ``;


    const Ships = document.getElementById("Ships").value;
    statisticList[6] += parseInt(Ships) || 0;
    statisticForDay[6] = parseInt(Ships) || 0;
    document.getElementById("Ships").value = ``;

    statisticForDay[7] = `${++data}.02.23`


    tableStatistic.push([...statisticForDay]);



  }

  this.setData = () => {
    addStatistic();
     window.localStorage.setItem("statistic", JSON.stringify(statisticList));
     window.localStorage.setItem("statisticForDay", JSON.stringify(tableStatistic));

     renderBody(statisticList, "statistic");

     renderBody(statisticForDay, "statisticForDay");

  };

  renderBody(statisticList, "statistic");
  tableStatistic.forEach((element) => renderBody(element, "statisticForDay"));
}