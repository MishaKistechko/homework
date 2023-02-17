const dataModule = (function () {
  const data = JSON.parse(window.localStorage.getItem("statByDay")) || staticByDay;
  const key = Object.keys(data[0]).filter(keys => keys !== "Date");
  const keysNull = key.reduce((accum, element) => {
    accum[element] = 0;
    return accum
  },{})
  const avgKey = key.map((element) => (`${element}_avg`));
  const avgNull = avgKey.reduce((accum, element) => {
    accum[element] = 0;
    return accum
  }, {})
  const totKeys = ["days", ...key, ...avgKey];

  const calculateMonthsStat = () => {
    const addDate = data.map(element => ({...element, "Date": new Date(element["Date"])}));
    const sortMonthly = addDate.reduce((accum, element) => {
    const monthData = `${element.Date.getMonth() + 1}.${element.Date.getFullYear()}`;
      if (!accum[monthData]) {
        accum[monthData] = [];
      }
      accum[monthData].push(element)
      return accum
    }, {})
    const months = Object.keys(sortMonthly);
    const totalMonth = months.reduce((accum, month) => {
      if(!accum[month]) {
        var days = sortMonthly[month].length;
        accum[month] = {"Month": month,"days": days, ...keysNull, ...avgNull};
      }
      sortMonthly[month].forEach(day => {
        key.forEach(key => {
            accum[month][key] += day[key];
            accum[month][`${key}_avg`] = Number(((accum[month][key]) / days).toFixed(2));
        })
      })
      return accum
    }, {})
    const tableMonths = Object.values(totalMonth);
    return tableMonths
  }


  const calculateTotalStat = () => {
    const total = {"days": 0,...keysNull, ...avgNull,};
    const q = {...total};
    calculateMonthsStat().forEach(element => {
      totKeys.forEach(item => {
        q[item] += element[item];
        total[item] = Number(q[item].toFixed(2));
      })
    })
    return a = [total];
  }

  const addStatByDay = () => {
    const startSTat = Object.keys(data[0]).reduce((accum, icon) => {
    (icon === "Date") ? accum[icon] = document.getElementById(icon).value : accum[icon] = parseInt(document.getElementById(icon).value);
      return accum
    }, {})
    const statByDay = {...startSTat};
    const getData = data.map(date => date["Date"]);
    const auditData = getData.find(function(e){return e == statByDay["Date"]});
    auditData === statByDay["Date"] ? console.log("eror") : data.push(statByDay);
    window.localStorage.setItem("statByDay", JSON.stringify(data));
    const monthsNew = new RenderTable(dataModule.calculateMonthsStat(), "monthsStat");
    const totalNew = new RenderTable(dataModule.calculateTotalStat(), "totalStat");
  }
  return {
    addStatByDay,
    calculateMonthsStat,
    calculateTotalStat,
  };
})();






