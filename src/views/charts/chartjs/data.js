const line = {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
        datasets: [
            {
                label: "Sales Analytics",
                fill: true,
                lineTension: 0.5,
                backgroundColor: "rgba(64,81,137, 0.2)",
                borderColor: "#25a0e2",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#25a0e2",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#25a0e2",
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
            },
            {
                label: "Monthly Earnings",
                fill: true,
                lineTension: 0.5,
                backgroundColor: "rgba(64,81,137, 0.2)",
                borderColor: "#7CDEFF",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#00bd9d",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#00bd9d",
                pointHoverBorderColor: "#eef0f2",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36]
            }
    ],
  },
  options: {
    x: {
      ticks: {
        font: {
          family: 'Poppins',
        },
      },
    },
    y: {
      ticks: {
        font: {
          family: 'Poppins',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            family: 'Poppins',
          }
        }
      },
    },
  },

};

const pie = {
  type: "pie",
  data: {
    labels: ["Desktops", "Tablets"],
    datasets: [{
      data: [300, 180],
      backgroundColor: ["#25A0E2", "#F3F6F9"],
      hoverBackgroundColor: ["#0AB39C", "#ebeff2"],
      hoverBorderColor: "#fff",
    }, ],
  },
  options: {
    maintainAspectRatio: true,
    responsive: true,
  },
};

const Doughnut = {
  type: "doughnut",
  data: {
    labels: ["Desktops", "Tablets"],
    datasets: [{
      data: [300, 210],
      backgroundColor: ["#25a0e2","#f3f6f9"],
                hoverBackgroundColor: ["#25a0e2","#f3f6f9"],
                hoverBorderColor: "#fff",
      borderWidth: 0,
      radius: "90%",
      innerRadius: "75%",
    }, ],
  },
  options: {
    maintainAspectRatio: true,
  },
};

const radar = {
  type: 'radar',
  data: {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running',
    ],
    datasets: [{
        label: 'Desktops',
        backgroundColor: "rgba(50,204,255, 0.2)",
                borderColor: "#32ccff", //"#32ccff",
                pointBackgroundColor: "#32ccff", //"#32ccff",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#32ccff", //"#32ccff",
        data: [65, 59, 90, 81, 56, 55, 40],
      },
      {
        label: 'Tablets',
        backgroundColor: "rgba(81, 86, 190, 0.2)", //"rgba(81, 86, 190, 0.2)",
                borderColor: "#25a0e2", //"#25a0e2",
                pointBackgroundColor: "#25a0e2", //"#25a0e2",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#25a0e2", //"#25a0e2",
        data: [28, 48, 40, 19, 96, 27, 100],
      },
    ],
  },
  options: {
    maintainAspectRatio: true,
    legend: {
      position: 'top',
    },
  }
}

const bar = {
  type: "bar",
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ],
    datasets: [{
      barPercentage: 0.4,
      label: "Sales Analytics",
      backgroundColor: "#25A0E2",
      borderColor: "rgba(52, 195, 143, 0.8)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
      hoverBorderColor: "rgba(52, 195, 143, 0.9)",
      data: [65, 59, 81, 45, 56, 80, 50, 20],
    }, ],
  },
  options: {
    x: {
      ticks: {
        font: {
          family: 'Poppins',
        },
      },
    },
    y: {
      ticks: {
        font: {
          family: 'Poppins',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Poppins',
          }
        }
      },
    }
  }
};

const PolarArea = {
  type: "polarArea",
  data: {
    labels: ["Series 1", "Series 2", "Series 3", "Series 4"],
    datasets: [{
      data: [11, 16, 7, 18],
      backgroundColor: ["#25A0E2", "#00AA8E", "#f1b44c", "#25A0E2"],
      label: "My dataset", // for legend
      hoverBorderColor: "#fff",
    }, ],
  },
  options: {
    maintainAspectRatio: true,
    legend: {
      position: "top",
    },
  },
};

export {
  line,
  pie,
  Doughnut,
  radar,
  bar,
  PolarArea
};