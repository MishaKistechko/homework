const Statistic = function (parentElementId) {

  const statisticList = JSON.parse(window.localStorage.getItem("statistic")) ||
  [
    {
      "quantity": 127500,
      "name": "LIQUIDATED PERSONAL",
      "add": 0
    },
    {
      "quantity": 3201,
      "name": "TANKS",
      "add": 0
    },
    {
      "quantity": 6378,
      "name": "ARMOURED PERSONNEL VEHICLE",
      "add": 0
    }
  ];
  this.tableBody = document.querySelector(`#${parentElementId} > tbody`);
  this.statisticList = statisticList;

  const renderBody = () => {
    html = [];
    statisticList.forEach((element) => {
    element["add"] != 0 ?
    html.push(`
        <tr>
          <th scope="row">(${element["add"]}) ${element["quantity"]}</th>
          <th scope="row">${element["name"]}</th>
        </tr>
      `) :
      html.push(`
        <tr>
          <th scope="row">${element["quantity"]}</th>
          <th scope="row">${element["name"]}</th>
        </tr>
      `)
    });
    this.tableBody.innerHTML =  html.join("");
  }

  const addStatistic = () => {
    const LIQUIDATED_PERSONAL = document.getElementById("LIQUIDATED_PERSONAL").value;
    statisticList[0]["quantity"] += parseInt(LIQUIDATED_PERSONAL);
    statisticList[0]["add"] = `+${LIQUIDATED_PERSONAL}`;

    const TANKS = document.getElementById("TANKS").value;
    statisticList[1]["quantity"] += parseInt(TANKS);
    statisticList[1]["add"] = `+${TANKS}`;

    const ARMOURED_PERSONNEL_VEHICLE = document.getElementById("ARMOURED_PERSONNEL_VEHICLE").value;
    statisticList[2]["quantity"] += parseInt(ARMOURED_PERSONNEL_VEHICLE);
    statisticList[2]["add"] = `+${ARMOURED_PERSONNEL_VEHICLE}`;

  }

  this.setData = () => {
    addStatistic();
     window.localStorage.setItem("statistic", JSON.stringify(statisticList));
    renderBody();
  };
  renderBody();
}