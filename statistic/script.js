const dataModule = (function () {
  const data = JSON.parse(window.localStorage.getItem("statByDay")) || [];
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
    return Object.values(totalMonth);
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
    return [total];
  }

  const addStatByDay = (statByDay) => {
    const newData = new Date();
    const addDate = `${newData.getFullYear()}-0${newData.getMonth() + 1}-${newData.getDate()}`;
    const auditDate = (data.map(element => element["Date"])).find(date => date === statByDay["Date"]);
    const filterValue = Object.values(statByDay).filter(key => key != addDate);
    if ((statByDay["Date"] != addDate) || (auditDate != undefined) || (filterValue.length != key.length)) {
        throw {message: "Date Already exists"}
    }
  filterValue.forEach(value => {
      if ((value === NaN) || (value < 0) || (value != parseInt(value))) {
          throw {message: "Date Already exists"}
      }
    })
    data.push(statByDay);
    window.localStorage.setItem("statByDay", JSON.stringify(data));
  }

  return {
    addStatByDay,
    calculateMonthsStat,
    calculateTotalStat,
  };
})();






