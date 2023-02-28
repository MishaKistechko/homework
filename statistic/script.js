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
  const fields = [...key, ...avgKey];

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

  const auditValue = (statByDay) => {
    const wrong = [];
    const newData = new Date();
    const addDate = `${newData.getFullYear()}-0${newData.getMonth() + 1}-${newData.getDate()}`;
    const auditDate = data.find(row => row["Date"] === statByDay["Date"])
    if (auditDate) {
      wrong.push({message: "Date Already exists", field: "Date-input"});
    }
    if (addDate < statByDay["Date"]) {
      wrong.push({message: "Date is in the future", field: "Date-input"});
    }
    if (!statByDay["Date"]) {
      wrong.push({message: "Data is not filled", field: "Date-input"});
    }
    key.forEach(field => {
      if (statByDay[field] !== statByDay["Date"]) {
        if (statByDay[field] < 0) {
          wrong.push({message: "Data is negative", field: `${field}-input`});
        }
        if (statByDay[field] !== parseInt(statByDay[field])) {
          wrong.push({message: "Data is not parseInt", field: `${field}-input`});
        }
        if (statByDay[field] === undefined) {
          wrong.push({message: "Data is not filled", field: `${field}-input`});
        }
      }
    })
    return wrong
  }

  const addStatByDay = statByDay => {
    if (auditValue(statByDay).length !== 0) {
      throw auditValue(statByDay);
    }
    data.push(statByDay);
    window.localStorage.setItem("statByDay", JSON.stringify(data));
  }

  const createDataForGraph = () => {
    const labels = [];
    calculateMonthsStat().forEach(month => {labels.push(month["Month"]);})

    const dataChart = fields.reduce((accum, field) => {
      accum[field] = [];
      calculateMonthsStat().forEach (month => {
        accum[field].push(month[field]);
      })
      return accum
    },[])

    const dataSet = [];
    fields.forEach(field => {
      dataSet.push({
        label: field,
        data: dataChart[field],
        borderWidth: 1
      })
    });

    const dataForGraph = {
      labels: labels,
      datasets: dataSet
    };

  return dataForGraph
  }

    return {
      addStatByDay,
      calculateMonthsStat,
      calculateTotalStat,
      createDataForGraph,
    };
})();






