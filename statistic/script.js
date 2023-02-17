const UpDate = function(data) {
  this.data = JSON.parse(window.localStorage.getItem("statByDay")) || data;
  this.key = Object.keys(data[0]).filter(keys => keys !== "Date");
  this.keysNull = this.key.reduce((accum, element) => {
    accum[element] = 0;
    return accum
  },{})
  this.avgKey = this.key.map((element) => (`${element}_avg`));
  this.avgNull = this.avgKey.reduce((accum, element) => {
    accum[element] = 0;
    return accum
  }, {})
  this.totKeys = ["days", ...this.key, ...this.avgKey];
  this.monthsKeys = ["Month", this.totKeys];
  this.addDate = this.data.map(element => ({...element, "Date": new Date(element["Date"])}));

  const calculateMonthsStat = () => {
    const sortMonthly = this.addDate.reduce((accum, element) => {
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
        accum[month] = {"Month": month,"days": days, ...this.keysNull, ...this.avgNull};
      }
      sortMonthly[month].forEach(day => {
        this.key.forEach(key => {
            accum[month][key] += day[key];
            accum[month][`${key}_avg`] = Number(((accum[month][key]) / days).toFixed(2));
        })
      })
      return accum
    }, {})
    const tableMonths = Object.values(totalMonth);
    return tableMonths
  }
  this.calculateMonthsStat = calculateMonthsStat();


  const calculateTotalStat = () => {
    const total = {"days": 0,...this.keysNull, ...this.avgNull,};
    const q = {...total};
    this.calculateMonthsStat.forEach(element => {
      this.totKeys.forEach(item => {
        q[item] += element[item];
        total[item] = Number(q[item].toFixed(2));
      })
    })
    return a = [total];
  }
  this.calculateTotalStat = calculateTotalStat();
}






